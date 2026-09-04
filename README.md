# Arthi A — Portfolio

A personal developer portfolio built as an interactive product rather than a résumé
page. Angular 22, standalone components, signals, GSAP + ScrollTrigger, a six-theme
engine, and prerendered routes for SEO.

**Live:** https://arthi-ananth.github.io/Portfolio/

---

## Stack

| | |
|---|---|
| Framework | Angular 22 (standalone, signals, zoneless, `@angular/build`) |
| Rendering | Static prerender (`outputMode: static`) — `/` + one page per case study |
| Animation | GSAP 3 + ScrollTrigger (lazy-loaded, browser only), Lenis smooth scroll |
| Styling | Hand-written SCSS with CSS custom-property design tokens — no UI framework |
| Contact | EmailJS (`@emailjs/browser`), with a `mailto:` fallback |
| Icons | Inline SVG sprite (`shared/icon-sprite.component.ts`) |
| Deploy | GitHub Pages, base-href `/Portfolio/` |

## Run locally

```bash
npm install --legacy-peer-deps      # Angular 22 peer graph needs the flag
npm start                           # http://localhost:4200
```

## Build

```bash
npm run build                       # -> dist/portfolio/browser (prerendered)
npm run build:pages                 # build + write 404.html + .nojekyll for Pages
```

## Deploy to GitHub Pages

```bash
npm run deploy                      # build:pages + push dist to the gh-pages branch
```

Then in the repo settings enable **Pages → Deploy from branch → `gh-pages` / root**.
The `prepare-pages` script copies the CSR shell to `404.html` so deep links to any
route boot the SPA; real routes (`/`, `/work/*`) are prerendered to their own HTML.

## Contact form / EmailJS

Credentials are read from `src/environments/environment*.ts` and are **never**
placed in a component. They ship blank in source. When any value is blank the form
degrades to a `mailto:` link — nothing breaks.

To enable real sending, set the three values (locally, or in CI before `ng build`):

```ts
// src/environments/environment.ts  (and environment.prod.ts)
emailjs: {
  serviceId: 'service_xxx',
  templateId: 'template_xxx',
  publicKey: 'xxxxxxxxxxxxx',
}
```

The EmailJS *public key* is designed to be exposed client-side; it is still kept
out of component code. The template is expected to accept `from_name`, `reply_to`
and `message`.

## Theme engine

Six environments — Midnight (default), Light, Aurora, Ocean, Sunset, Mono — defined
as token sets in `src/styles/_themes.scss` and switched via a `data-theme` attribute.
A small inline script in `index.html` applies the stored / preferred theme before
first paint to avoid a flash. Choice persists in `localStorage`.

## Project structure

```
src/app/
  core/        theme · scroll · motion · seo · gsap · contact services + platform helpers
  shared/      directives (reveal, magnetic, tilt) + components (icon, frame,
               schematic, project-window, theme-switcher, custom-cursor, companion…)
  layout/      header-dock · scroll-progress · site-footer
  features/
    home/      home.page + 9 section components (hero → contact)
    work/      work-detail.page  (route /work/:slug)
  data/        projects · skills · services · journey · profile · themes · site  (typed)
  models/      interfaces for the above
```

All portfolio content lives in `src/app/data/*.ts`. Every project fact is taken from
public GitHub repositories and the résumé — no invented live URLs or features.

## Accessibility & performance

- Content is visible without JS (prerendered); scroll-reveal only *hides* elements
  once JS confirms motion is allowed.
- `prefers-reduced-motion` disables GSAP travel, parallax, the custom cursor and the
  companion; counters snap to their final value.
- Custom cursor and companion are desktop-only (`pointer: fine`).
- Semantic landmarks, one `h1` per route, visible focus rings, skip link, labelled
  theme control and form.
- Initial JS payload ~96 kB gzipped; GSAP/ScrollTrigger and Lenis are lazy chunks.
