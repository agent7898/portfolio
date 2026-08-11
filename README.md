# Portfolio — GC Likith Chowdary

A single-page portfolio built around a cosmic/chrome design brief: pure black background, silver and chrome type, a fullscreen WebGL starfield, and slow, deliberate motion.

**Live:** deployed on [Netlify](https://www.netlify.com) — see [Deployment](#deployment).

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Styling | Tailwind CSS v4 (CSS-first, no `tailwind.config.*`) |
| 3D | react-three-fiber + drei + three |
| Motion | Lenis (smooth scroll), anime.js (intro + hero reveal), framer-motion (section reveals) |
| Language | TypeScript |

No backend, no API routes, no database — the site is entirely static-rendered with a client-side canvas.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev      # next dev
npm run build    # production build
npm run start    # serve the production build locally
npm run lint     # eslint (flat config: next/core-web-vitals + typescript)
```

There is no test framework. `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass — keep them that way.

## Project structure

```
src/
  app/            layout, page shell, globals.css, icons
  components/
    3d/           Scene, Stars, ChromeKnot, CameraRig  — fixed z-0 backdrop
    layout/       AppShell, Nav, Preloader, Cursor, Grain, ScrollProgress
    sections/     Hero, About, Work, Education, Stack, Contact, Footer
    ui/           SplitText, Marquee, SpotlightCard, MagneticButton, ContactForm
  content/site.ts all page copy
  lib/            lenis, reveal, rng, cn, timing helpers
content/          source READMEs for the real projects
design/           the written visual brief
public/           résumé PDF, nav mark
```

Path alias: `@/*` → `./src/*`.

## Editing content

All copy — profile, about, education, projects, stack, marquee — lives in [src/content/site.ts](src/content/site.ts). Sections import from it and render, so changing the site's text never means touching layout or motion code.

Everything in that file is sourced from the résumé in `public/` and the project READMEs in [content/projects.md](content/projects.md). Don't add technologies that appear in neither.

## Deployment

The site is deployed on **Netlify**. All build settings are committed in [netlify.toml](netlify.toml), so there is nothing to fill in by hand:

| Setting | Value | Set by |
|---|---|---|
| Build command | `npm run build` | `netlify.toml` |
| Publish directory | `.next` | `netlify.toml` |
| Node version | 22 | `netlify.toml` |
| Build plugin | `@netlify/plugin-nextjs` | `netlify.toml` |

There are no environment variables and no secrets — nothing else needs configuring.

### Host it from the Netlify dashboard (recommended)

1. Push this repo to GitHub.
2. Sign in at [app.netlify.com](https://app.netlify.com) and choose **Add new site → Import an existing project**.
3. Pick **GitHub**, authorise Netlify if prompted, and select the repo.
4. Leave the branch as `main`. The build command, publish directory and plugin are read from `netlify.toml` — the fields should already be filled in. **Don't override them.**
5. Click **Deploy**. The first build takes a few minutes (it installs dependencies and the Next.js Runtime).
6. Rename the site under **Site configuration → Site details → Change site name** to get `your-name.netlify.app`.

From then on: every push to `main` deploys to production, and every pull request gets its own deploy preview URL.

### Host it from the CLI

```bash
npm i -g netlify-cli
netlify login

netlify init                  # create + link a new site (or `netlify link` for an existing one)
netlify deploy --build        # draft deploy, returns a preview URL to check
netlify deploy --build --prod # promote to production
```

`netlify init` will offer to wire up continuous deployment from GitHub; accept it and pushes deploy automatically from then on.

### Custom domain

**Site configuration → Domain management → Add a domain**. Netlify provisions the Let's Encrypt certificate automatically once DNS resolves — either point your registrar's nameservers at Netlify DNS, or add the `CNAME`/`A` records Netlify shows you.

### Troubleshooting

- **Build fails on Node version** — `netlify.toml` pins Node 22. If you changed it in the dashboard, the UI value wins; clear it under **Site configuration → Environment variables → `NODE_VERSION`**.
- **Blank page, no styles** — the publish directory was overridden to `out/`. This site is not a static export; it must stay `.next`.
- **Reproduce the build locally** — `netlify build` runs the same pipeline the CDN does, plugin included.

### Notes

- The 3D canvas is dynamically imported with `ssr: false`, so it renders only in the browser — nothing about the WebGL scene affects the build.
- Fonts come from `next/font/google` and are self-hosted at build time; no runtime font requests.

## Accessibility & motion

`prefers-reduced-motion` is honoured in four places: [`useReveal`](src/lib/reveal.ts) returns no props at all (content renders plainly visible), `MotionConfig reducedMotion="user"` in [AppShell](src/components/layout/AppShell.tsx), `frameloop="demand"` in [Scene](src/components/3d/Scene.tsx), and a CSS block at the end of [globals.css](src/app/globals.css). Content visibility is never gated on an animation firing.

## Known gaps

- [ContactForm.tsx](src/components/ui/ContactForm.tsx) fakes submission with a `setTimeout` — there is no backend. Fields are controlled and named so an endpoint (e.g. Netlify Forms or a function) drops in easily. The Contact section shows the email address directly, so there is always a working path.
- `package.json` still carries the scaffold name `temp-app`.
- GSAP is a dependency but nothing imports it.

## Design

[design/](design/) is a written brief that governs visual work — read it before changing anything visual. Hard rules: pure black background; silver/chrome/white with occasional blue reflections; tiny white stars only (no nebula, galaxy, or coloured planets); slow, elegant motion. Ruled out: bright gradients, neon/cyberpunk, glass everywhere, heavy blur.
