# Design QA

final result: passed

## Findings and resolved iterations

- [Resolved P2] Mobile country and industry options were truncated at a 390px viewport. Both controls now span the full form width. Verified in artifacts/qa/mobile-contact.png.
- [Resolved P2] The initial WebGL lighting washed the orange material toward yellow. Reduced exposure/environment intensity and assigned a consistent orange material. Verified in artifacts/qa/desktop-hero.png and desktop-scene-scroll.png.
- [Resolved P2] The static scene poster initially lived inside the lazy scene component, leaving the scene blank until the JavaScript chunk arrived. The Suspense loading state now renders the poster immediately. The final asset check passed with the GLB request blocked.
- No remaining actionable P0/P1/P2 findings in the checked flows.

## Source truth and comparison evidence

The supplied video is a 13.73-second recording of a dark coding workspace, not a website mockup. It provides atmosphere and subject matter, but no matching display typography or scroll sequence. The implementation intentionally interprets that atmosphere as a digital-studio experience rather than claiming a pixel-identical clone.

- Source footage: C:/Users/karpe/Downloads/2e4bc2c07a8d04279c92a12ef55f541a.mp4.
- Extracted frame: public/media/studio-poster.jpg.
- Full-view combined source/implementation comparison: artifacts/qa/reference-comparison.jpg.
- Implementation: artifacts/qa/desktop-hero.png, 1440 × 1000 CSS pixels, device scale factor 1.
- Mobile: artifacts/qa/mobile-hero.png and mobile-contact.png, 390 × 844 CSS pixels, device scale factor 1.
- Focused image comparison: artifacts/qa/babay-comparison.jpg. Original source src/assets/User attachment 5.png is 1349 × 601 pixels. It was normalized to the exact rendered 630 × 281 pixel image for comparison with artifacts/qa/babay-home-rendered.png. The same homepage image, copy, logo, colors and subject are preserved.
- All five supplied PNGs are referenced by the Babay Dee gallery. Case detail rendered in artifacts/qa/case-study.png.
- Scrolled scene: artifacts/qa/desktop-scene-scroll.png, API chapter, desktop viewport.
- Currency state: artifacts/qa/desktop-contact-pkr.png.

## Required fidelity surfaces

- Typography: Barlow Condensed provides the large display hierarchy; Manrope handles readable body/UI text and IBM Plex Mono handles labels. The video has no display-font reference to reproduce. Responsive line wrapping was checked, including four languages and mobile overflow.
- Layout rhythm: roomy editorial desktop layout, asymmetric work grid, clear service grid, single-column mobile flow. The mobile dropdown-width issue is resolved. All tested languages remain within the viewport.
- Colors/tokens: charcoal backdrop echoes the supplied video's dark environment. Ivory surfaces and orange accents are intentional additions for hierarchy and conversion. Orange meshes now match the site direction more closely.
- Image/asset quality: exact supplied Babay Dee assets are displayed with their aspect ratio retained on the homepage. The 3D model is an actual locally served GLB generated through Higgsfield, with modeled code, SEO, API, marketing and NFC elements. No screenshot was recreated with approximated artwork.
- Copy/content: customer-facing copy replaces the earlier telemetry-heavy homepage language. New copy is localized in English, French, German and Japanese. Original USD ranges are preserved and PKR starts at Rs. 35,000. No new quantified business performance claims were added.

## Interaction and technical evidence

- npm run lint: passed.
- npm run build: passed.
- scripts/interaction-check.mjs: passed. Multi-service selection, NFC, currency budget reset, original USD ranges, PKR bands, language persistence, form validation, mocked delivery failure and retry, case study routing, mobile menu and four-language document overflow.
- scripts/final-visual-check.mjs: passed. Desktop/mobile WebGL, scroll chapter transition, country/industry stability across languages, PKR/NFC presentation and screenshots.
- scripts/asset-check.mjs: passed after the loading-state fix. Reduced-motion control and blocked-model fallback.
- Browser JavaScript errors: none in the completed checks.
- Inquiry delivery was intercepted locally during tests; no live inquiry was sent.
- Built and inspected with installed headless Chrome. The in-app browser runtime was unavailable.

## Accepted constraints and follow-up polish

- The interactive Three.js code is lazy-loaded. Vite reports its 626 kB raw chunk as large; gzip is approximately 160 kB. A static poster is visible during loading. This is not a measured FPS or Core Web Vitals certification.
- The contact form retains the site's existing ntfy transport; real delivery was not exercised.
- The reference does not establish an exact typography or motion-design specification. Camera movement and typography are intentional design interpretations.
- Optional future polish: further bespoke material/model refinement, and performance measurements on physical low-end mobile hardware.
- Plugin availability and asset provenance are recorded in REDESIGN.md.

## Implementation checklist

- [x] Cinematic 3D homepage and scroll chapters.
- [x] Five exact Babay Dee screenshots.
- [x] NFC and multiple service selection.
- [x] PKR/USD budget behavior.
- [x] Persistent language selector.
- [x] Responsive visual inspection and form tests.
- [x] Reduced-motion and loading fallback.
