# VGM Group Website

Marketing site for VGM Group — VGM IT Hub Technologies and VGM Hub Infra.

Static React SPA: **Vite + TanStack Router + Tailwind v4 + shadcn/ui**. The build
emits plain HTML/CSS/JS to `dist/`, which Nginx serves directly. There is no
backend, no database, and no Node process in production.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script            | Purpose                                        |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Dev server with HMR                            |
| `npm run build`   | Typecheck, then build static output to `dist/` |
| `npm run preview` | Serve the built `dist/` locally on :4173       |
| `npm run lint`    | ESLint + Prettier check                        |
| `npm run format`  | Rewrite files with Prettier                    |

## Project layout

```
src/
  routes/        file-based routes (routeTree.gen.ts is generated — don't edit)
  components/    site-chrome.tsx (header/footer/WhatsApp) + ui/ (shadcn)
  lib/
    contact.ts   phone, email, WhatsApp number — single source of truth
    assets.ts    URLs for media served from public/
public/assets/   logo, brand video, leadership photos
deploy/          nginx.conf + deploy.sh
```

### Editing contact details

Phone, email, careers email and the WhatsApp number live in `src/lib/contact.ts`.
Change them there — the footer links, the floating WhatsApp button and the
careers application form all read from it.

### The careers form

There is no backend, so the application form composes a **prefilled email** to
`careersEmail` via `mailto:` rather than posting anywhere. The applicant attaches
their own resume and sends it. If you later want resumes captured automatically,
that needs a form service (Formspree, Web3Forms) or a small backend.

### Media

Large media is **not** bundled; it sits in `public/assets/` and is referenced by
absolute URL so Nginx can serve and cache it directly.

Currently expected:

- `public/assets/vgm-logo-maroon.png` ✅
- `public/assets/vgm-brand-reveal.mp4` ✅
- `public/assets/chairman-kiran-vandana.jpg` ⚠️ **not yet added** — drop the
  chairman's photo at this exact path (square crop works best).

## Deploying to a Linux server

### One-time server setup

```bash
sudo apt update && sudo apt install -y nginx
sudo mkdir -p /var/www/vgmgroup/releases /var/www/certbot
sudo chown -R "$USER" /var/www/vgmgroup

sudo cp deploy/nginx.conf /etc/nginx/sites-available/vgmgroup
sudo ln -s /etc/nginx/sites-available/vgmgroup /etc/nginx/sites-enabled/vgmgroup
sudo rm -f /etc/nginx/sites-enabled/default
```

Edit `server_name` in the config to your domain, then issue a certificate:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d vgmgroup.in -d www.vgmgroup.in
sudo nginx -t && sudo systemctl reload nginx
```

> If you haven't pointed DNS at the server yet, comment out the `443` block and
> the HTTPS redirect first so Nginx can start on port 80 alone.

### Each release

```bash
./deploy/deploy.sh user@your-server
```

This builds, rsyncs to a timestamped directory under
`/var/www/vgmgroup/releases/`, atomically swaps the `current` symlink, prunes
old releases, and reloads Nginx. To roll back, repoint the symlink:

```bash
ln -sfn /var/www/vgmgroup/releases/<older> /var/www/vgmgroup/current
sudo systemctl reload nginx
```

### Manual alternative

```bash
npm ci && npm run build
rsync -az --delete dist/ user@server:/var/www/vgmgroup/current/
```

Because this is a client-routed SPA, the Nginx config's
`try_files $uri $uri/ /index.html;` is required — without it, deep links like
`/team` return 404 on refresh.
