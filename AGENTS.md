# VGM Group Website

Static React SPA (Vite + TanStack Router + Tailwind v4), built to `dist/` and
served by Nginx. There is no backend and no server-side rendering.

## Commands

- `npm run dev` — dev server on :5173
- `npm run build` — typecheck then emit static `dist/`
- `npm run preview` — serve the built output locally
- `npm run lint` / `npm run format`

## Conventions

- Routes are file-based under `src/routes/` (`routeTree.gen.ts` is generated —
  never edit it by hand).
- Shared contact details live in `src/lib/contact.ts`; static media paths in
  `src/lib/assets.ts`. Change them there, not inline in components.
- Large media (logo, brand video, photos) lives in `public/assets/` and is
  referenced by absolute URL so Nginx serves it directly.
