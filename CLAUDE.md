# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # next dev — http://localhost:3000
npm run build    # next build
npm run start    # serve the production build
npm run lint     # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

There is no test framework in this project. `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass — keep them that way.

React 19's `react-hooks` rules are enforced as errors here and catch two things repeatedly:

- **`purity`** — no `Math.random()` (or other impure calls) during render. The starfield uses the seeded PRNG in [src/lib/rng.ts](src/lib/rng.ts) for exactly this reason.
- **`set-state-in-effect`** — no `setState` in an effect body. [Preloader.tsx](src/components/layout/Preloader.tsx) flips `ready` from anime.js's `onComplete` callback instead, and runs a ~zero-duration timeline when the intro is skipped so that path goes through the same callback.
- **`immutability`** — don't mutate a hook's return value. [CameraRig.tsx](src/components/3d/CameraRig.tsx) takes `camera` off the `useFrame` state rather than `useThree()`.

## What this is

A single-page portfolio for GC Likith Chowdary. Next.js 16 App Router + React 19, Tailwind v4, a fullscreen react-three-fiber backdrop, and four animation libraries that each do one job. No backend, no API routes, no database.

## Architecture

**Content is data, not markup.** All copy lives in [src/content/site.ts](src/content/site.ts) — profile, about, education, projects, stack, marquee. Sections import from it and render. Editing the portfolio's text should never mean touching layout or motion code.

Everything in that file is sourced from the résumé in `public/` and the project READMEs in [content/projects.md](content/projects.md). **Do not add technologies that do not appear in one of those two places** — the owner has explicitly asked for this. Note the projects are deliberately *not* described uniformly: Bynaptic Connections is `Ongoing`, FER Local is a `Prototype`, and the Work heading avoids claiming both are shipped.

**Page composition.** [page.tsx](src/app/page.tsx) is a thin shell: `<Scene />` plus six sections from [src/components/sections/](src/components/sections/). Section indices (`01`–`05`) and the [Nav](src/components/layout/Nav.tsx) link list are maintained by hand — adding a section means renumbering both.

**The 3D canvas is a fixed backdrop, not a section.** [Scene.tsx](src/components/3d/Scene.tsx) renders into a `fixed inset-0 z-0 pointer-events-none` container, dynamically imported with `ssr: false` (r3f cannot server-render). Consequences:

- Every DOM section needs `relative z-10`, or it renders behind the canvas.
- The environment is hand-built from `Lightformer`s rather than an HDRI preset — a preset drags coloured reflections onto the chrome, which the design brief rules out.
- Scroll reaches the canvas through [useScrollProgress](src/components/3d/useScrollProgress.tsx), a ref updated by a scroll listener and read inside `useFrame` — never through React state, which would re-render every frame.

**Four animation libraries, deliberately divided.** Don't reach for a new one, and don't reimplement a job in a different one:

| Library | Owns |
|---|---|
| Lenis | Global smooth scrolling. It owns the scroll position, so anchor navigation must go through [`scrollToSection`](src/lib/lenis.ts) — a native `scrollIntoView` fights the inertia loop. |
| anime.js | The intro curtain and the hero's staggered character reveal. |
| framer-motion | Section reveals, layout transitions, pointer-driven springs. |
| GSAP | Installed, currently unused. |

The hero reveal splits characters in React, not with anime's `text.split`: that helper re-measures and rewrites the DOM to detect line breaks, which double-renders inside a `clamp()`-sized heading.

**Never gate content visibility on an animation.** [`useReveal`](src/lib/reveal.ts) is the single source for scroll reveals and returns *no props at all* under `prefers-reduced-motion`, so the element renders plainly visible. A reveal built on `initial={{ opacity: 0 }}` hides its content until an IntersectionObserver fires — if that observer never runs, the section is simply blank. This was a real bug: 25 elements sat at `opacity: 0` after load until the hook centralised it.

Reduced motion is honoured in four places, and new motion should follow suit: `useReveal` (no-op), `MotionConfig reducedMotion="user"` in [AppShell](src/components/layout/AppShell.tsx), `frameloop="demand"` in `Scene` (one frame, then still), and the CSS block at the end of [globals.css](src/app/globals.css).

**Tailwind v4, CSS-first.** No `tailwind.config.*`; theme tokens live in the `@theme` block of [globals.css](src/app/globals.css). Three fonts, three roles: `font-display` (Space Grotesk) for eyebrows, labels and nav; `font-serif` (Playfair Display) for display lines; `font-sans` (Inter) for body. The `chrome-*` colour ramp is the only accent family.

`.text-chrome` / `.chrome-split` clip a gradient to glyphs. Two traps, both hit for real while building the hero:

- **`background-clip: text` cannot paint through a descendant that has its own compositing layer.** Split characters therefore carry the gradient themselves rather than inheriting it from the heading. Getting this wrong renders the wordmark invisible.
- **The gradient only paints inside the element's own box.** A descender hanging below it renders transparent — Playfair's `y` lost its tail. Hence the `padding-bottom` / negative `margin-bottom` pair on `.chrome-split [data-unit]`; don't remove one without the other.

Path alias: `@/*` → `./src/*`.

**Branding assets** all derive from one Silver Surfer image (the brief's own reference point). `public/silver-surfer.webp` is the nav mark; `src/app/{favicon.ico,icon.png,apple-icon.png}` are the browser icons. Two things to preserve if you regenerate them: Next's icon file convention accepts `.ico/.jpg/.jpeg/.png/.svg` but **not** webp, and the source art is a small figure on a wide starfield — it is cropped tight to the figure, without which it is an unreadable dark square at 16px.

## Design constraints

[design/](design/) is a written brief that governs visual work; read it before changing anything visual. Hard rules: pure black background, silver/chrome/white with occasional blue reflections, tiny white stars only (no nebula, galaxy, or coloured planets), slow elegant motion — nothing bouncy. Ruled out: bright gradients, neon/cyberpunk, glass everywhere, heavy blur.

The brief lists Space Grotesk / Inter / Satoshi; the build pairs Space Grotesk and Inter with Playfair Display for display type, which the owner chose deliberately.

## Root-level directories that are not code

- [content/projects.md](content/projects.md) — full READMEs of the real projects. Source material for `site.ts`.
- [components/existing-components.md](components/existing-components.md) — a React Bits "Galaxy" component pasted in as reference. It needs `ogl`, which is **not** installed; the starfield is a custom `points` mesh in [Stars.tsx](src/components/3d/Stars.tsx) instead.
- `assets/` — empty.

## Known gaps

- [ContactForm.tsx](src/components/ui/ContactForm.tsx) posts to Netlify Forms. Netlify parses *static* HTML at deploy time to find forms, which never sees a React client component — so `public/__forms.html` declares the form and the component POSTs urlencoded data to `/__forms.html`. Field names must match across the two files. Submission fails under `npm run dev` (no Netlify runtime); the error state falls back to the email address, as does the Contact section itself.
- `package.json` still carries the scaffold name `temp-app`.
- GSAP is a dependency but nothing imports it.

## Verifying visually

Headless Chrome renders this page's WebGL through swiftshader, which takes ~2 minutes per screenshot. Two things make it practical:

- `--force-prefers-reduced-motion` — `Scene` switches to `frameloop="demand"`, so the canvas paints once and the capture takes seconds.
- `--print-to-pdf` — captures every section in one pass. Fragment URLs (`/#work`) do **not** work: the preloader's scroll lock and Lenis both reset the position, and you get a black frame.
