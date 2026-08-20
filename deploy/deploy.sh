#!/usr/bin/env bash
# Build locally (or in CI) and publish to the Nginx web root on the server.
#
#   ./deploy/deploy.sh user@server.example.com
#
# Releases are timestamped and "current" is an atomically swapped symlink, so a
# bad deploy is one `ln -sfn` away from a rollback.
set -euo pipefail

TARGET="${1:?usage: deploy.sh user@host}"
REMOTE_BASE="${REMOTE_BASE:-/var/www/vgmgroup}"
RELEASE="$(date +%Y%m%d%H%M%S)"

echo "==> Building"
npm ci
npm run build

echo "==> Uploading release $RELEASE to $TARGET"
ssh "$TARGET" "mkdir -p '$REMOTE_BASE/releases/$RELEASE'"
rsync -az --delete dist/ "$TARGET:$REMOTE_BASE/releases/$RELEASE/"

echo "==> Activating"
ssh "$TARGET" "
  set -e
  ln -sfn '$REMOTE_BASE/releases/$RELEASE' '$REMOTE_BASE/current.tmp'
  mv -T '$REMOTE_BASE/current.tmp' '$REMOTE_BASE/current'
  # Keep the five most recent releases.
  ls -1dt '$REMOTE_BASE'/releases/*/ | tail -n +6 | xargs -r rm -rf
  sudo nginx -t && sudo systemctl reload nginx
"

echo "==> Deployed release $RELEASE"
