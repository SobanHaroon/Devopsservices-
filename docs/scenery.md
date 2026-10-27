# Cinematic scenery — version 5

The owner's three motion-reference videos informed the layered depth, native-scroll pacing and illustrated Japanese setting. The four environments are new generated artwork, graded around the supplied logo's navy, cyan, ice and muted gold. Text, links, project screenshots and controls remain HTML above the decorative scenery.

## Scene map

| Scene        | Purpose                                 | Scroll behavior                                                                                                                                          |
| ------------ | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| City         | Introduction and primary inquiry action | A sticky stage with separate city and transparent foreground layers moving at different rates. A vector constellation follows the logo's infinity shape. |
| Studio       | Four service groups                     | The illustrated workspace stays alongside the service list on larger screens; it precedes the list on tablets and phones.                                |
| Cave gallery | Featured Atelier Noir case study        | The linked screenshot moves forward with CSS perspective as the background opens. A normal project grid follows.                                         |
| Harbor       | White-label partnerships                | A restrained background drift leads into project, monthly and weekly contract choices.                                                                   |

All progress follows native scroll and reverses when scrolling upward. There is no wheel interception, artificial scroll velocity or homepage WebGL canvas. The three existing interactive character models remain on `/team`.

## Responsive and motion behavior

- City and studio have separate portrait compositions. Every scene has WebP sources for narrow, medium and wide displays; normal HTML copy never becomes part of a background image.
- The hero is eagerly loaded. Other scenery and posters are lazy loaded. The four 1600px backgrounds total approximately 753 KB; the transparent foreground is 185 KB. Desktop and mobile variants are selected by the browser rather than downloaded together.
- Viewports at or below 700px tall use normal document flow instead of sticky cinematic stages. Tablet services use two columns; narrow screens use one column.
- Pause motion and the operating-system reduced-motion preference remove scenic transforms and pinning. Changes to the system preference are observed while the page is open. The scenery and all content remain available.
- GSAP contexts and media queries are reverted on route, language and preference changes. Native history, hash links, case-study links and inquiry controls remain active.

## Assets

Runtime scenery: `public/media/scenery/`. Implementation: `ScenicWorld.tsx`, `StudioHome.tsx`, `cinematic.css` and `useMotionPreference.ts`.

Production briefs used for image generation:

1. **City:** wide Japanese waterside city at night, layered mountains and crescent moon, a canal leading into depth, cyan reflections and restrained warm architectural lights. Quiet dark upper-left space for text; no typography, people, brand marks or interface.
2. **Studio:** a Japanese design and development workspace overlooking that city, wooden desk, monitor and warm task lamp; navy/cyan night outside and a calm upper-left composition.
3. **Cave gallery:** an empty Japanese stone-cavern gallery opening toward a moonlit coast, central blank stone wall, timber beams and a restrained lantern. No baked-in screens or copy; the actual project screenshot is composed in HTML.
4. **Harbor:** a Japanese coastal landscape, distant mountains, bridge, terraces and warm lights, with open water and a dark upper-left area for partnership copy.
5. **Foreground:** transparent Japanese roof/eave, lower railing and right-side pine branches, with most of the canvas empty for an independent parallax layer.
6. **Portrait adaptations:** city architecture and studio furniture moved into the lower portion of a 2:3 composition, keeping the upper portion quiet for mobile copy.

The generated masters were converted to WebP with FFmpeg. The gallery and harbor retain responsive crops from their wide composition. These are illustrations, not photographs of a physical DevOps Services office.

Owner-supplied assets:

| Input                                       | Use                                                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `1000000020.svg`                            | `public/media/devops-logo.svg`; original colors and paths, with proportional aspect-ratio behavior. |
| `file_000000008a3482118ed11de43e35e56b.svg` | Kael vector source, normalized viewBox and gzip archive.                                            |
| `file_000000008e2c820b985031523ae54445.svg` | Kai vector source, normalized viewBox and gzip archive.                                             |
| `1000001345.svg`                            | Milo vector source, proportional rendering and gzip archive.                                        |
| `247984491_1793097893842998.mp4`            | Kael's team-profile film.                                                                           |
| `929610437_1793097892101054.mp4`            | Kai's team-profile film.                                                                            |
| `721131830_1793097895563545.mp4`            | Milo's team-profile film.                                                                           |

Character SVG archives are in `assets/source-vectors/`; decompress with `gzip -dk filename.svg.gz`. Their thousands of paths are retained as source assets rather than adding them to the page. Existing original-illustration WebPs remain the displayed team portraits. The three supplied films were encoded as H.264/MP4 with fast-start metadata, no audio track and WebP posters. Each film downloads after the visitor activates it and pauses offscreen, in a hidden tab, or when motion is paused.

## Design review

The Taste pinned-poster direction supplied the shared-stage idea. The requested scenic reference treatment takes precedence over its generic section recipes: real linked project screenshots, contract choices and the existing inquiry form are retained. Emil's interaction guidance informs restrained response and reduced-motion behavior. No Onetake implementation code was used.

The first screenshot review exposed a tablet CTA offset, an oversized Japanese headline and pinning that was inappropriate for short viewports; all three were corrected. The reviewed 1440px, 768px and 390px pages have a consistent night palette, distinct section compositions, visible services and clear actions. Visual assessment: design 8/10, usability 8/10, creativity 8/10. The scenery carries the requested atmosphere, while the project grid, team and form provide quieter sections.

The layout inspector reports zero failures. Its remaining warnings are deliberate: the pinned service heading belongs to its illustrated scene and has a dark backing; fluid type and large decorative footer lettering produce more measured sizes than a five-size template; the mobile introductory paragraph is 16px and explicitly names websites for businesses and agencies, despite the inspector's 18px identification heuristic.

## Validation

`npm test` runs the existing route, form, model, language and accessibility coverage, then the scenery-specific suite. `npm run test:scenery` checks responsive sources, scroll progress in both directions, sticky-stage position, resizing, short-screen flow, live reduced-motion preference changes, lazy video activation and offscreen/pause behavior. Browser artifacts stay in `artifacts/`.

Testing covers Chromium at 320, 390, 768, 1024, 1440 and 1920px, plus an 844×390 landscape viewport. This is representative responsive coverage, not a claim of testing every device or browser.
