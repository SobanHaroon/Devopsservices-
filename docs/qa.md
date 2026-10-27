# Release verification — version 4.1

Checks run against the production build with Playwright Chromium. These are local checks, not field Core Web Vitals or a guarantee about every device.

TypeScript and Vite build pass. Nine regression groups pass with zero browser page errors. Eight axe audits return zero violations for the selected WCAG A/AA rules.

## Automated coverage

- No homepage canvas or 3D asset requests. Three distinct character models load on the team page as their sections approach; visible scenes animate, offscreen scenes pause, and the global motion control stops the renderer.
- The homepage introduces three named characters using the original supplied illustrations. The team page identifies Soban’s creative identity, accurate location and profile links; Kai and Milo are explicitly studio characters. Direct profile anchors, refresh, Back/Forward, scroll/hover poses and motion pause pass. No greeting controls remain.
- Repeated case-study open, browser Back/Forward, directory return, and home return, including scroll restoration and metadata cleanup.
- Direct case routes, refresh, missing-project recovery, category filtering, and cross-page contact links.
- White-label selection and weekly preselection; contract-based payload; mocked failure, retry, success, and reset; ordinary PKR budgets.
- Horizontal overflow and headline fit at 320, 390, 768, 1024, and 1440 pixels in EN, JP, FR, and DE.
- Mobile menu focus, Escape dismissal, anchor navigation, and body scroll restoration.
- Reduced-motion and unavailable-WebGL poster fallbacks.
- WCAG A/AA automated axe checks on the homepage, team page, work directory, and Atelier Noir at desktop and mobile widths.

Form requests are intercepted. The test suite sends no live inquiries.

## Visual and performance review

Reviewed desktop, tablet, and phone layouts across the homepage and team page. The homepage and team page each report zero Taste failures. The phone hero’s name-only warning is a heuristic false positive: its visible paragraph explicitly describes websites, development and digital growth for businesses and agencies. The fluid-size warning is documented: display, headings, body, controls and translated variants share the site’s established scale. The team page deliberately uses real-time 3D and the supplied character artwork rather than adding unrelated video; the homepage retains its optional studio film.

The original source meshes have been kept in the repository. Embedded WebP textures reduce the runtime GLBs to approximately 0.91 MB, 1.10 MB and 1.37 MB for Kael, Kai and Milo. Rendered posters are approximately 36–44 kB each. Original team-card illustrations total approximately 0.79 MB. Reconstruction references are separate from these cards. The homepage requests no model or renderer assets; team models load near their profile sections.

Build measurements: CSS approximately 61 kB raw / 15.7 kB gzip; main JavaScript approximately 501.4 kB / 175.6 kB gzip; lazy Three.js renderer approximately 625 kB / 159.7 kB gzip; team route approximately 7 kB / 2.9 kB gzip. These are build sizes, not a Lighthouse score or field performance results.

Each scene targets about 30 fps, caps pixel density at 1.5 (1.25 on phones), and stops while hidden, offscreen, or paused. Reduced-motion mode skips the renderer. Model, skeleton, texture and renderer resources are disposed on route changes. The studio video loads only on request. Japanese subsets total approximately 188 kB, with the browser requesting only needed character ranges.

The character surface review corrected harsh facial shading by applying mesh-attached reference detail and softer face lighting. Profile quotations moved into the biography panels to keep mobile headings clear. The top return link is a labeled navigation region. The final review is in [design-review.md](design-review.md).

## Reproduce

```bash
npm ci
npx playwright install chromium
npm run lint
npm test
npm run screenshots
```

`artifacts/qa/results.json` records regression outcomes; accessibility reports and screenshots sit alongside it. Generated evidence is gitignored. `docs/homepage.webp` is a compact screenshot for the README.


## Version 5 cinematic release

TypeScript and the production build pass. The browser regression suite passes with zero page errors and zero automated WCAG A/AA violations across the homepage, team page, case-study directory and Atelier Noir detail at desktop/mobile widths. Test inquiry submissions remain intercepted.

The scenery suite passes at 320, 390, 768, 1440 and 1920px, including forward/reverse progress, stage placement, responsive image sources, pause/resume, live preference changes and an 844×390 landscape fallback. Character films load on activation, play muted and pause offscreen or through the motion control. The video and 3D model occupy separate columns on desktop.

Visual review covered desktop, tablet and mobile scene captures. The layout inspector reports zero failures, with three documented design warnings in `scenery.md`. Chromium is the browser exercised; no physical-device or Safari/Firefox validation is claimed.
