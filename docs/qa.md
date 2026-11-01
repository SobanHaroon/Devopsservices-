# Editorial release QA

Run `npm run lint` and `npm test`. The browser script starts and stops its own static server; all form submissions are intercepted locally.

Verified for the editorial release:

- Storm: WebGL rendering, 50,000 particles, continuous rotation, pointer repulsion and scroll dive.
- Media: all eight attached reels load, play muted inline, advance offscreen and loop at their ends without playback controls.
- Navigation: modal opening, Escape dismissal, focus restoration, campaign anchors, browser Back and direct case-study URLs.
- Retired team URL redirects to the About section.
- Form: required service selection, contract-based monthly white-label inquiries, failure feedback and successful retry.
- Responsive layouts: no horizontal overflow at 320, 390, 768, 1440 and 1920 pixels.
- FAQ rows work independently. Reduced-motion suppresses interface entrances while the requested continuous media remains active.
- No browser runtime errors or missing resources in the production-build checks.

Screenshots and detailed results are generated under `artifacts/editorial/` and are intentionally untracked. The accessibility scan notes the intentionally faint decorative footer logotype; no other violations were reported in the scanned pages.
