# DevOps Services

A responsive website for Muhammad Soban’s independent web studio. The design combines Japanese animation references with a practical technology studio: logo-led colors, reference-based interactive 3D anime characters, a dedicated team page, clear services, and real project case studies.

[Live website](https://devopsservices-seven.vercel.app/) · [Meet our team](https://devopsservices-seven.vercel.app/team) · [Figma design board](https://www.figma.com/design/FxPK4yixUh7uNaumIQMnNw) · [Design notes](docs/design-notes.md)

![DevOps Services homepage](docs/homepage.webp)

## What changed in version 4

- Replaced the previous character models with **Kael Astra, Kai Ren and Milo**, reconstructed as real textured 3D meshes from the supplied character designs. Kael appears in the hero, Kai in services, and Milo in partnerships.
- Added a homepage **Meet our team** introduction and a dedicated **`/team`** page with direct profile links: `/team#kael`, `/team#kai` and `/team#milo`. The CEO biography and external profile links now live in Kael’s section.
- **Kael Astra (Muhammad Soban)** is the CEO and founder. **Kai Ren**, coder and sulking master, represents engineering. **Milo**, operations manager and resource handler, represents delivery and organization. The page explicitly identifies Kai and Milo as studio characters; client work is led and delivered by Soban.
- Scroll progress changes each model’s body angle, head, shoulders and legs. Mouse movement adds gaze and posture changes. A keyboard- and touch-operable **Say hello** button adds a short greeting. Team portraits drift with scroll, and cards and controls have restrained hover/focus feedback.
- Kept native scrolling, reduced-motion posters, motion pause controls, local assets, lazy loading and disposal on route changes. Source GLBs, optimization/rig preparation and asset provenance are included.
- Extended browser coverage to team routes, profile anchors, refresh, Back/Forward, scroll poses, greetings, responsive layouts, and automated accessibility.

The logo-led navy/cyan/ice/gold palette, Sora/Manrope typography, Atelier Noir case study, repaired case-study navigation, responsive card grids and multilingual interface remain. White-label inquiries offer **Project based**, **Monthly** and **Weekly** engagements with **Contract based** pricing. Ordinary inquiries retain USD/PKR budgets and retryable delivery states.

## Development

Use Node.js 22 LTS or a compatible version >=20.19, and npm.

```bash
git clone https://github.com/SobanHaroon/Devopsservices-.git
cd Devopsservices-
npm ci
npm run dev
```

The development server runs at `http://localhost:3000`. No environment variables are required for the current frontend.

| Command                | Purpose                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| `npm run lint`         | TypeScript validation                                            |
| `npm run build`        | Production build in `dist/`                                      |
| `npm run preview`      | Preview the production build                                     |
| `npm test`             | Build and run Playwright regression and axe accessibility checks |
| `npm run test:browser` | Run the checks against an existing build                         |
| `npm run screenshots`  | Build and capture desktop/mobile screenshots                     |
| `npm run model:build`  | Optimize and rig the three included source GLBs                  |
| `npm run format`       | Format source, scripts, and documentation                        |

Before browser tests, install Chromium:

```bash
npx playwright install chromium
npm test
```

For a managed browser installation, set `PLAYWRIGHT_CHROME` to its executable path. Test scripts start and close their own local static server. Results and screenshots are written to the gitignored `artifacts/` directory. All form submissions in the test suite are intercepted; tests do not send live inquiries.

## Architecture

| Area                                               | Location                                                                                |
| -------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Route handling, error recovery, scroll restoration | `src/App.tsx`                                                                           |
| Homepage and shared studio components              | `src/components/studio/`                                                                |
| Project directory and case detail                  | `src/components/CaseStudiesList.tsx`, `src/components/CaseStudyDetail.tsx`              |
| Project content                                    | `src/data/caseStudiesData.ts`                                                           |
| Homepage and form translations                     | `src/data/redesignCopy.ts`, `src/data/studioCopy.ts`, `src/data/contactTranslations.ts` |
| Inquiry payload and contract types                 | `src/lib/projectBrief.ts`                                                               |
| Layout and design tokens                           | `src/studio.css`, `src/index.css`                                                       |
| Team page, descriptions and translations           | `src/components/studio/TeamPage.tsx`, `src/data/team.ts`                                |
| 3D renderer and surface detail                     | `src/components/studio/CharacterScene.tsx`, `src/lib/characterSurface.ts`               |
| Model source and preparation                       | `assets/characters/original/`, `scripts/prepare-characters.py`                          |
| Fonts, images, model, and studio video             | `public/`                                                                               |
| Regression tests                                   | `scripts/check-redesign.mjs`                                                            |

The stack is React 19, TypeScript, Vite, CSS/Tailwind, Motion, GSAP, and Three.js. Case pages, the team page and the 3D renderer are loaded separately. Vite builds the static site; there is no application server or CMS.

## Motion and performance

Each character initializes near the viewport. Its renderer caps pixel density at 1.5 (1.25 on phones) and targets roughly 30 frames per second. Animation loops stop when their scene is offscreen, the tab is hidden, or motion is paused. Reduced-motion users receive static posters without loading the 3D renderer. Each generated mesh has a lightweight seven-bone rig. Model, skeleton, texture and renderer resources are disposed when leaving either page. Fine-pointer hover never blocks touch scrolling.

Images use local WebP files and explicit dimensions. Gallery images load lazily; the studio video only loads when requested. Sora, Manrope, and Noto Sans JP are self-hosted. Japanese font subsets contain only characters used in the source.

After editing Japanese copy, regenerate the subsets:

```bash
python -m pip install 'fonttools[woff]'
python scripts/subset-japanese.py
```

The Three.js chunk is intentionally lazy and may trigger Vite’s 500 kB chunk-size advisory. Runtime checks are described in [QA notes](docs/qa.md); they are local tests, not a field Core Web Vitals claim.

### Preparing the character assets

The original image-generated GLBs are checked in under `assets/characters/original/`. The shipped files are approximately 0.91 MB (Kael), 1.12 MB (Kai) and 1.37 MB (Milo), with embedded WebP textures and seven joints. These are stylized image reconstructions, with gentle pose animation rather than a full production animation rig. A mesh-attached reference projection preserves the front facial detail; sides and backs use the reconstructed textures.

To rebuild the optimized GLBs, install Python 3, NumPy and FFmpeg, then run:

```bash
python -m pip install numpy
npm run model:build
npm run build
node scripts/capture-redesign.mjs --poster
```

Convert the transparent PNGs in `artifacts/redesign/` to `public/media/characters/{kael,kai,milo}.webp` with FFmpeg, then rebuild. The generated portrait references and the supplied Kael studio artwork are in `public/media/characters/`. No third-party model service is contacted at runtime. See [character provenance](assets/characters/README.md).

## Contact delivery

The existing form posts its plain-text inquiry to `https://ntfy.sh/contact-devops`. It has a 15-second timeout, duplicate-submit protection, a success receipt, and retry/error states. White-label inquiries include the selected engagement basis and `Pricing: Contract based` instead of a fixed budget.

This is a public notification topic, not a private CRM or durable submission database. Do not use it to collect sensitive information. Replace the transport in `ProjectContact.tsx` with an authenticated server endpoint if private lead storage or delivery guarantees are required.

## Deployment

The existing Vercel project is **devopsservices** in **sobanharoons-projects**, connected to this repository. Push the tested release to its production branch (`main`) to trigger the existing Git deployment. Do not create a second Vercel project.

`vercel.json` specifies the Vite build, `dist` output, SPA fallback for direct team and case-study routes, cache headers for hashed build assets, and basic response headers. After deployment, confirm the READY state and check the homepage, `/team`, `/team#kai` and `/case-studies/atelier-noir` on the production URL. A tested `dist/` build can also be deployed directly to this same project, with per-deployment static build settings. A direct file deployment does not push source changes to GitHub.

## Assets and references

The three character GLBs were generated from owner-supplied character designs through a clean reference-image stage and to3D reconstruction, then locally optimized and rigged. The raw meshes and preparation script are included; image generation itself is not deterministic. The company logo, previous founder avatar and character references are owner-supplied assets; the founder bio uses the supplied CV. The previous avatar is retained in `assets/characters/` for future use. Atelier Noir screenshots come from [SobanHaroon/Atelier-nior](https://github.com/SobanHaroon/Atelier-nior). Existing client screenshots and the studio video are retained from this repository. The personal portfolio’s inherited Unsplash images are explicitly labeled as illustrative photographs, not screenshots. Font license files accompany the assets in `public/fonts/` and the installed font packages.

The design process used Taste, Emil Kowalski design engineering guidance, Lemo-Opuscar visual references, a Figma reference board, and the continuity principles in Onetake. No Onetake implementation code or model assets were copied. Primary motion references and design decisions are documented in [design notes](docs/design-notes.md) and the [team direction](docs/team-direction.md), including the requested GetLayers research and an Awwwards team-page reference.

Built by [Muhammad Soban](https://github.com/SobanHaroon). For project and white-label inquiries, use the [website](https://devopsservices-seven.vercel.app/#contact).
