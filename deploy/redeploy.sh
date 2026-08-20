#!/usr/bin/env bash
#
# VGM Group website — on-server redeployment.
#
# Run this ON the web server. deploy.sh (next to this file) is the other half
# of the story: it builds on a workstation and rsyncs the bundle over SSH. Where
# the repo is checked out on the server itself, that indirection buys nothing,
# so this script does the same job locally: pull, build, publish a new
# timestamped release, then atomically swap the `current` symlink nginx serves.
#
# Layout:  repo -> dist/  copied to  /var/www/vgmgroup/releases/<ts>/
#          /var/www/vgmgroup/current -> releases/<ts>   (nginx root)
#          nginx site: /etc/nginx/sites-available/vgmgroup  (vgmgroup.in HTTPS)
#
# Usage (from the repo root):
#   ./deploy/redeploy.sh                 # pull latest origin/main and rebuild
#   ./deploy/redeploy.sh --no-pull       # rebuild from the working tree as-is
#   ./deploy/redeploy.sh --branch <name> # deploy a branch other than main
#   ./deploy/redeploy.sh --rollback      # re-point current at the previous release
#
# This deploys the app only; it deliberately never installs nginx.conf. The
# served config can legitimately be ahead of the branch being deployed, and
# copying an older nginx.conf over it during a routine app deploy would take
# the site down. Install nginx config by hand, per the header in nginx.conf.
#
# Git auth (Azure DevOps). Pull uses stored credentials; to supply a PAT for
# this run only (never persisted to the remote URL):
#   VGM_GIT_PAT=<pat> ./deploy/redeploy.sh
#
set -Eeuo pipefail

# Derived from this script's own location, so the checkout can move or be
# cloned elsewhere without editing the script.
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_BASE="/var/www/vgmgroup"
BRANCH="main"
WEB_HEALTH="https://vgmgroup.in/"
KEEP_RELEASES=5

DO_PULL=true
DO_ROLLBACK=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --no-pull)  DO_PULL=false ;;
    --rollback) DO_ROLLBACK=true ;;
    --branch)   BRANCH="${2:?--branch needs a value}"; shift ;;
    -h|--help)  awk 'NR>1 && !/^#/{exit} NR>1{sub(/^# ?/,"");print}' "$0"; exit 0 ;;
    *) echo "Unknown option: $1" >&2; exit 2 ;;
  esac
  shift
done

ts()   { date '+%Y-%m-%d %H:%M:%S'; }
log()  { echo -e "\033[1;34m[$(ts)]\033[0m $*"; }
ok()   { echo -e "\033[1;32m[$(ts)] ✓ $*\033[0m"; }
warn() { echo -e "\033[1;33m[$(ts)] ! $*\033[0m"; }
die()  { echo -e "\033[1;31m[$(ts)] ✗ $*\033[0m" >&2; exit 1; }

# Point `current` at a release directory without ever leaving it dangling.
activate() {
  ln -sfn "$1" "$WEB_BASE/current.tmp"
  mv -T "$WEB_BASE/current.tmp" "$WEB_BASE/current"
}

health_check() {
  local code
  for _ in $(seq 1 15); do
    code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 8 "$WEB_HEALTH" || echo 000)
    [[ "$code" == "200" ]] && { ok "Site healthy (HTTP $code)"; return 0; }
    sleep 2
  done
  warn "Site UNHEALTHY (last HTTP $code) at $WEB_HEALTH"
  return 1
}

# --- rollback: just re-point the symlink at the previous release -------------
if $DO_ROLLBACK; then
  CURRENT_TARGET="$(readlink -f "$WEB_BASE/current" || true)"
  # Release dirs are timestamp-named, so a reverse sort is newest-first. Step to
  # the entry immediately *older* than current rather than just the newest one
  # that isn't current — otherwise a second rollback jumps forward again and the
  # two most recent releases toggle instead of walking back.
  RELEASES="$(ls -1d "$WEB_BASE"/releases/*/ 2>/dev/null | sed 's#/$##' | sort -r || true)"
  PREV="$(printf '%s\n' "$RELEASES" \
          | awk -v cur="$CURRENT_TARGET" 'found { print; exit } $0 == cur { found = 1 }')"
  # If current isn't itself a release dir (fresh install, dangling symlink),
  # there's nothing to step back from, so fall back to the newest release.
  if [[ -z "$PREV" ]] && ! printf '%s\n' "$RELEASES" | grep -qxF "$CURRENT_TARGET"; then
    PREV="$(printf '%s\n' "$RELEASES" | head -1)"
  fi
  [[ -n "$PREV" ]] || die "No release older than current to roll back to."
  log "Rolling back to $PREV"
  activate "$PREV"
  health_check || warn "Rolled back but health check failed — investigate."
  ok "Rollback complete."
  exit 0
fi

# --- preflight --------------------------------------------------------------
log "VGM deploy starting (branch=$BRANCH pull=$DO_PULL)"
[[ -d "$REPO_DIR/.git" ]] || die "No git repo at $REPO_DIR"
command -v npm >/dev/null || die "npm not found on PATH"
cd "$REPO_DIR"

PREV_RELEASE="$(readlink -f "$WEB_BASE/current" || true)"

# --- pull -------------------------------------------------------------------
if $DO_PULL; then
  log "Current commit: $(git log -1 --oneline)"
  url="$(git remote get-url origin)"
  if [[ -n "${VGM_GIT_PAT:-}" ]]; then
    host_path="${url#https://}"; host_path="${host_path#*@}"
    log "Fetching $BRANCH (HTTPS PAT) ..."
    git fetch --prune "https://pat:${VGM_GIT_PAT}@${host_path}" "$BRANCH" 2>&1 \
      | sed "s#${VGM_GIT_PAT}#***#g" || die "git fetch failed (PAT needs Code:Read)"
  else
    log "Fetching origin/$BRANCH (stored creds) ..."
    GIT_TERMINAL_PROMPT=0 git fetch --prune origin "$BRANCH" \
      || die "git fetch failed — set VGM_GIT_PAT=<pat> or configure ~/.git-credentials"
  fi
  git reset --hard FETCH_HEAD
  ok "Now at $(git log -1 --oneline)"
else
  warn "--no-pull: building working tree at $(git log -1 --oneline)"
fi

# --- build ------------------------------------------------------------------
log "── Build ────────────────────────────────────────────────"
# npm ci needs a lockfile in sync with package.json; fall back when it drifts.
npm ci --no-audit --no-fund \
  || { warn "npm ci failed (lockfile drift); using npm install"; npm install --no-audit --no-fund; }

npm run build || die "Build failed — live site left untouched on $PREV_RELEASE"
[[ -f dist/index.html ]] || die "dist/index.html missing after build — live site untouched"

# --- publish ----------------------------------------------------------------
# The build is only swapped in after it succeeds, so a broken build can never
# take the site down; the previous release stays live.
RELEASE="$WEB_BASE/releases/$(date +%Y%m%d%H%M%S)"
log "Publishing $RELEASE"
mkdir -p "$RELEASE"
cp -a dist/. "$RELEASE"/
activate "$RELEASE"

if ! health_check; then
  if [[ -n "$PREV_RELEASE" && -d "$PREV_RELEASE" ]]; then
    warn "Reverting to $PREV_RELEASE"
    activate "$PREV_RELEASE"
    health_check || warn "Still unhealthy after revert — investigate nginx."
  fi
  die "Deploy failed health check; site restored to previous release."
fi

# Keep the most recent releases, prune the rest.
ls -1dt "$WEB_BASE"/releases/*/ | tail -n +$((KEEP_RELEASES + 1)) | xargs -r rm -rf

log "── Summary ──────────────────────────────────────────────"
echo "    site    : $WEB_HEALTH"
echo "    release : $RELEASE"
echo "    commit  : $(git log -1 --oneline)"
ok "VGM deploy complete."
