# DevOps Services

**Thoughtful websites. Distinctive experiences. Reliable delivery.**

I built DevOps Services as the home for my independent development and design studio. I’m **Muhammad Soban**, based in Rawalpindi, Pakistan. I work directly with businesses and agencies on websites, digital campaigns and ongoing development.

[Website](https://devopsservices-seven.vercel.app/) · [Case studies](https://devopsservices-seven.vercel.app/case-studies) · [Digital marketing](https://devopsservices-seven.vercel.app/digital-marketing) · [Start a project](https://devopsservices-seven.vercel.app/#contact)

![DevOps Services homepage](docs/homepage.webp)

## Design and experience

The site pairs an editorial layout with cinematic scenery. Playfair Display headlines, Satoshi body text, dashed rules and generous spacing give the content a clear rhythm. Navy, cyan and gold come from my logo; Storm retains its specified crimson, pink and gold palette.

The homepage includes selected work, services, campaign films, my approach, partnership options and a project inquiry form. The previous team section is removed from the homepage and navigation. Its old route remains available so existing links keep working.

- A responsive purple-desert film introduces the studio.
- A 50,000-particle Storm scene responds to scrolling and pointer movement.
- Staggered project plates lead into detailed case studies.
- The digital marketing page presents ten distinct films with client and studio filters, campaign artwork and a storyboard.
- Four interface languages are available: English, French, German and Japanese.
- Films autoplay muted and loop continuously, with no play or pause buttons.
- Device preferences simplify text transitions and scrolling; unavailable WebGL has a static fallback.

The reel collection contains eight supplied launch and product reels alongside the two existing Babay Dee brand films. The Babay Dee launch reel appears once in the catalog.

## Technology

| Area                     | Tools                                                              |
| ------------------------ | ------------------------------------------------------------------ |
| Application              | React 19, TypeScript and Vite                                      |
| Typography               | Self-hosted Satoshi and Playfair Display; existing language fonts  |
| Scrolling                | Lenis with native touch scrolling and browser history restoration  |
| Motion                   | CSS transitions, IntersectionObserver and scroll-driven transforms |
| Storm                    | Three.js r143, custom shaders and three postprocessing composers   |
| Existing character route | Three.js with optimized GLB models                                 |
| Testing                  | Playwright, Chromium and axe accessibility checks                  |
| Hosting                  | Vercel                                                             |

## Local development

I use Node.js 24 and npm to match the deployment environment.

```bash
git clone https://github.com/SobanHaroon/Devopsservices-.git
cd Devopsservices-
npm ci
npm run dev
```

The development server runs at `http://localhost:3000`. No environment variables are required for the current frontend.

```bash
npm run lint
npm run build
npm run preview
```

## Commands

| Command                  | Purpose                                                          |
| ------------------------ | ---------------------------------------------------------------- |
| `npm run dev`            | Start the development server                                     |
| `npm run lint`           | Check TypeScript                                                 |
| `npm run build`          | Create the production build in `dist/`                           |
| `npm run preview`        | Preview the production build                                     |
| `npm test`               | Build and run all three browser suites                           |
| `npm run test:browser`   | Check routes, forms, languages and accessibility                 |
| `npm run test:scenery`   | Check scroll scenes, motion preferences and interactive behavior |
| `npm run test:marketing` | Check all ten films, filters and responsive layouts              |
| `npm run screenshots`    | Capture desktop and mobile views                                 |
| `npm run vendor:storm`   | Refresh the pinned r143 modules used by the embedded scene       |
| `npm run format`         | Format source files and documentation                            |

## Project structure

```text
src/
  components/studio/   Homepage, scenery, navigation and inquiry form
  components/          Case studies and digital marketing page
  data/                Translations, services, case studies and reel catalog
  context/             Language state
  lib/                 Shared utilities, metadata and motion preferences
  App.tsx              Routes and scroll restoration
  editorial.css        Editorial layout and responsive styles
public/
  media/desert/        Responsive scenery film and poster
  media/marketing/     Reels, posters, campaign artwork and storyboard
  fonts/editorial/     Fonts and license notices
  scenes/storm/        Standalone Storm HTML
  vendor/storm/        Pinned Three.js r143 modules
docs/                  Design and implementation notes
scripts/               Browser checks and asset preparation
```

Existing project images, illustrations and model assets remain in their original folders. The three largest campaign films are stored as binary parts in `media-source/` to fit the publishing connection’s upload limit. `predev` and `prebuild` reassemble them byte for byte and verify their size and SHA-256 before writing the playable MP4 files. The delivered films retain their original quality and duration.

## Scenery and media

The standalone scene at `/scenes/storm/index.html` uses the supplied Three.js r143 import map and runs without a build step. The embedded version uses the same shaders and constants with locally served modules. A device pixel ratio cap of two limits the embedded scene’s rendering cost.

The desert uses separate desktop and mobile video files. Reels preserve their original portrait or 4:5 composition. All mounted films autoplay muted, loop continuously and have no native or custom playback controls. The same shared player covers the homepage, digital marketing catalog, Babay Dee case study and retained character route. Scrolling, opening the menu and starting other films do not pause playback. Filters remove excluded films and newly displayed films start automatically.

Storm and loaded character scenes keep animating after leaving the viewport and behind the menu. Heavy 3D assets still load as their sections approach. Navigating away disposes media and rendering resources. A browser or operating system may suspend media in background tabs or power-saving modes; the player retries on return and after interaction when autoplay was blocked.

Reduced-motion preferences simplify text entrances, parallax and smooth scrolling. Ambient films and scenes continue looping. If WebGL is unavailable, the page retains its artwork, heading and contact action.

See [the editorial implementation notes](docs/editorial.md) for the layout and content decisions.

## Testing

Install Chromium before running the suites:

```bash
npx playwright install chromium
npm test
```

Set `PLAYWRIGHT_CHROME` to use an existing Chromium installation.

The checks cover direct routes, refresh, Back/Forward navigation, case-study filtering, menu focus, keyboard dismissal, contact form states, four-language layouts, reel playback, scroll progress, reduced motion and unavailable-WebGL behavior. Responsive checks span 320px to 1920px.

Automated accessibility checks cover the homepage, project directory, a project detail, digital marketing and the retained character route at desktop and mobile widths. These checks use Chromium; they do not replace a manual review on physical devices.

Test artifacts are written to the ignored `artifacts/` folder. Form submissions are intercepted during testing, so the suites never send live inquiries.

## Project inquiries

The form supports standard services with USD or PKR budgets and white-label engagements on a project, monthly or weekly basis. It includes validation, duplicate-submit protection, a timeout, error recovery and a success receipt.

The notification transport is configured in `src/components/studio/ProjectContact.tsx`. Its current topic is public. A confidential lead workflow should use an authenticated server endpoint and durable storage.

## Deployment

The repository is connected to the existing **devopsservices** Vercel project.

1. Install dependencies with `npm ci`.
2. Run `npm run lint` and `npm test`.
3. Push the checked release to `main`.
4. Confirm the production deployment, direct routes and media playback.

`vercel.json` defines the build, SPA fallback, caching and response headers. Direct routes such as `/digital-marketing` and `/case-studies/atelier-noir` must work after refreshing.

## Contact

For a website, digital campaign or development partnership, [send me a project brief](https://devopsservices-seven.vercel.app/#contact).

**Muhammad Soban** · Founder, DevOps Services

[Portfolio](https://muhammadsoban.vercel.app/) · [GitHub](https://github.com/SobanHaroon)
