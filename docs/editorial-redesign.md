# Editorial redesign

## Direction

The supplied Kai Nomura reference determines the Playfair Display / Satoshi pairing, white and charcoal surfaces, dashed rules, large margins, asymmetric work spreads and full-screen menu. The reference’s fictional artist copy, sales claims and testimonials are not part of this site.

The Storm specification supplies the procedural colour moment in the opening spread. The uploaded desert film becomes a full-width transition from selected work to services. The homepage then introduces the real campaign footage, with a dedicated marketing page giving each brand a section of its own.

These explicit reference decisions take precedence over generic design-skill defaults that disallow eyebrows, index numbers, italic accents, hairlines or coloured scenes.

## Content and assets

- Existing case-study imagery and project copy are retained and presented in an editorial layout.
- DevOps Services’ case study describes the current website and campaign library.
- Babay Dee Atta Chakki has its product film and website launch reel.
- Cielo Noir has its bomber spotlight, collection launch and graphic motion reel.
- DevOps Services has its studio launch and website teaser.
- Muhammad Soban has its portfolio launch reel.
- Relevant campaign films also appear on individual project case studies.
- The old team UI is removed. Source media is retained in the repository.
- The About copy identifies the studio as Muhammad Soban’s independent practice.

No invented clients, testimonials, awards or performance metrics have been introduced.

## Motion and playback

Lenis 1.3.19 provides wheel smoothing. Entrances use the supplied easing family and timings; project images drift through the editorial grid. The modal is a native dialog with keyboard dismissal, focus restoration and scroll locking. FAQs are independent native details elements with height transitions where supported.

All rendered videos use a shared component that requests autoplay, muted inline playback and looping, with no controls, picture-in-picture or remote playback UI. Videos are not intentionally stopped when leaving the viewport. Browser background-tab, battery-saving and autoplay policies remain outside application control.

The Storm is isolated in a standalone HTML iframe to preserve Three.js r143, exact shader values and the original module pattern independently of the React toolchain. The embedded copy uses locally vendored r143 modules. Its parent forwards scroll and pointer coordinates through messages validated by origin and source.

## Verification

`npm run lint` validates TypeScript. `npm test` builds and runs the editorial browser suite. The suite exercises actual media playback, loop restarts, anchors, route recovery, browser history, the menu, FAQ, inquiry validation and retry handling. All inquiry requests are mocked during verification.

The suite also saves responsive screenshots at 320, 390, 768, 1440 and 1920 pixels and automated accessibility findings under `artifacts/editorial/`. Browser-specific results are reported in the release notes; a Chromium check is not a claim of testing Safari or physical devices.

## Release verification — 1 November 2026

TypeScript and the production build passed. Chromium verified the Storm's 50,000 points, rotation, pointer interaction and scroll dive; all eight reels decoded, advanced while offscreen and restarted at their ends. Navigation, all five direct case-study URLs, missing-project recovery, the legacy team redirect, independent FAQ rows and the inquiry failure/retry flow passed. No browser runtime errors or missing local assets were recorded.

Responsive screenshots were reviewed at 320, 390, 768, 1440 and 1920 pixels. The tablet layout was changed to a single column, several mobile headings were shortened and the menu received an explicit accessible name. The old layout inspector's reported mobile blank stretch was checked directly: it contains the process steps and their descriptions. The large editorial statement and asymmetric work spacing intentionally follow the supplied reference.

The automated accessibility scan reported only the decorative, `aria-hidden` footer wordmark's low contrast. Its faint treatment is intentional and matches the reference; it is a logotype rather than information or a control. The functional checks are Chromium checks, not a claim of Safari or physical-device testing.
