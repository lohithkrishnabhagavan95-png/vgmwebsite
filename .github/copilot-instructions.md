# Copilot instructions for VGM Group Website

- This repo is a static marketing SPA for VGM Group: Vite + React 19 + TypeScript + Tailwind v4 + TanStack Router.
- There is no backend, database, or SSR. The built output is a static `dist/` folder served by Nginx.
- Route structure is file-based under `src/routes/`; each route file exports a `Route` with `createFileRoute(...)` and often a `head()` metadata block. Do not edit `src/routeTree.gen.ts` by hand.
- App shell is in `src/routes/__root.tsx`: it renders `Header`, `Footer`, `WhatsAppFloat`, and the `Outlet` for child routes. Keep that layout intact when changing page structure.
- Shared page chrome and reusable sections live in `src/components/site-chrome.tsx` (`Header`, `Footer`, `PageHero`, `WhatsAppFloat`). Reuse those instead of duplicating layout markup.
- Styling is centralized in `src/styles.css`: custom theme tokens, Tailwind `@theme`, and utility classes like `card-lux`, `text-gilded`, `rule-gold` are intentionally reused.
- Content that must stay consistent across pages is centralized in `src/lib/contact.ts` and `src/lib/assets.ts`; update those instead of inlining values in pages or components.
- Static media is intentionally not bundled. Put large files in `public/assets/` and reference them via `"/assets/..."` from `src/lib/assets.ts`.
- Most business logic is UI-only and “mail-client based”: the careers and consultation forms open a `mailto:` draft instead of posting to a backend. Preserve this pattern unless the requirement explicitly adds a backend service.
- Use path aliases from `tsconfig.json` (`@/*` -> `src/*`) and keep imports consistent with the existing route/component conventions.
- Keep SEO/meta details near each route. Example: `src/routes/index.tsx`, `src/routes/about.tsx`, `src/routes/infra.tsx`, `src/routes/it-hub.tsx` define `head()` metadata for page titles and descriptions.

## Development workflow

- Install dependencies: `npm install`
- Run locally: `npm run dev` (Vite on `http://localhost:5173`)
- Validate build: `npm run build` (`tsc --noEmit` + Vite build)
- Preview production output: `npm run preview` (port `4173`)
- Lint: `npm run lint`
- Format: `npm run format`
- Deployment script: `./deploy/deploy.sh user@host` builds, uploads `dist/`, swaps a release symlink, and reloads Nginx.

## Project-specific patterns

- Prefer route-level components over new app-wide state or custom hooks unless the logic is genuinely shared.
- Keep copy and brand positioning consistent with the VGM Group narrative: “two verticals, one standard of craft.”
- When adding new pages, follow the same structure as existing routes and keep the page hero pattern aligned with `PageHero`.
- When adding new contact info or WhatsApp details, update the single source of truth in `src/lib/contact.ts` so the header, footer, and forms stay synchronized.
- When changing asset references, update both the asset file and the constant in `src/lib/assets.ts` (do not hardcode public paths inside pages).
- Keep generated TanStack router files untouched; the generated route tree is maintained by Vite/TanStack plugin.
