# DevOps Services — logo-led character direction

## Design decision

**Built with character.** A short, large headline introduces a human-led digital studio. The supplied Kael, Kai and Milo character designs connect the idea to leadership, development and operations. The user-supplied company logo sets the palette: midnight navy `#08151e`, cyan `#7ee5ed`, ice `#ecf6f7`, slate, and champagne gold `#dcc99c`. This replaces the earlier shrine and vermilion direction.

The work remains the evidence: project screenshots, direct case-study links, aligned grids, understandable services, and a short contact path. Characters are decorative studio artwork, not invented employees. The team introduction links to a dedicated page identifying Muhammad Soban as the founder and Kai and Milo as studio characters.

## Research and reference decisions

Reviewed October 26, 2026. These are references, not copied page designs, agency claims, or customer results.

| Primary source                                                                                                                                                                                 | Applied decision                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [Sora’s Google Fonts description](https://github.com/google/fonts/blob/main/ofl/sora/DESCRIPTION.en_us.html) and [the typeface designer’s project](https://tarmovannas.com/work/sora-typeface) | Sora headings give the technology studio a distinctive, screen-oriented voice.                                                   |
| [Manrope on Figma](https://www.figma.com/fonts/manrope/)                                                                                                                                       | Manrope supplies readable paragraphs, form labels, and small interface text. Both Latin fonts are self-hosted.                   |
| [Lusion](https://lusion.co/about/)                                                                                                                                                             | Give real-time 3D a clear visual role while retaining readable text and straightforward navigation.                              |
| [Garden Eight](https://garden-eight.com/)                                                                                                                                                      | Use expressive headlines, generous spacing, and a simple project exploration path.                                               |
| [monopo](https://monopo.london/) and [its team page](https://monopo.london/team/)                                                                                                              | Connect Japanese creative references with a personal founder profile and direct contact.                                         |
| [Motion scroll animations](https://motion.dev/docs/react-scroll-animations) and [useScroll](https://motion.dev/docs/react-use-scroll)                                                          | Use native scrolling and viewport progress to drive the character composition. Do not intercept scrolling.                       |
| [Motion UI](https://sites.get.foundation/motion-ui.html)                                                                                                                                       | Reference its enter/exit choreography. No second animation runtime or Sass library is added.                                     |
| [Emil Kowalski’s design engineering guidance](https://emilkowal.ski/skill)                                                                                                                     | Quick, interruptible transform-based feedback; gentle easing; no hover dependency for essential actions; reduced-motion support. |

The editable [Figma direction board](https://www.figma.com/design/FxPK4yixUh7uNaumIQMnNw?node-id=5-16) records the palette variables, Sora/Manrope hierarchy, three character roles, and motion rules. It is a direction board, not a pixel-perfect Figma replica of the implemented website.

Taste informs hierarchy, responsive review, and the final visual critique. Lemo-Opuscar’s character and animation references inform distinct silhouettes, readable poses, and restrained acting. Onetake contributes the conceptual idea of continuity between scenes; no implementation code or assets from its noncommercial-licensed bundle are included.

## Reference-based 3D assets

Version 4 replaces the procedural Builder, Designer and Navigator with Kael Astra, Kai Ren and Milo. The owner supplied character references. Clean full-body portraits were generated from those references, converted into textured GLBs by to3D, then prepared locally with embedded WebP textures and seven-bone rigs. The original meshes live in `assets/characters/original/`; `scripts/prepare-characters.py` reproduces the optimized runtime files.

Scroll changes the body orientation and gentle head, torso, arm and leg poses. Pointer movement changes gaze and posture. A touch/keyboard greeting control supplies the same playful feedback without requiring hover. Mesh-attached reference projection preserves front facial detail without replacing the model with a billboard. The models are stylized reconstructions; their rigs support restrained poses rather than complex character animation.

Each scene initializes near the viewport, renders at about 30 fps only while visible, caps pixel density, and pauses when motion is disabled or the document is hidden. Reduced-motion visitors receive actual rendered WebP posters without the WebGL chunk. Failed WebGL initialization or context loss also retains the poster. Geometry, skeletons, textures and materials are disposed on route departure.

[Team direction](team-direction.md) records the GetLayers/Awwwards references, copy deck, board composition and interaction decisions. The earlier Figma direction board remains the brand reference; it does not claim to mirror the final team layout.

## Content provenance

- Company logo and Muhammad Soban’s anime avatar: supplied by the owner for this redesign; WebP versions retain the original imagery.
- Founder biography: the supplied CV, supported by the repository’s existing founder information. Includes location, frontend stack, design/tool skills, related client-service and marketing experience, portfolio, and GitHub. No additional team members or unsupported awards are invented.
- Atelier Noir screenshots: the owner’s [Atelier-nior repository](https://github.com/SobanHaroon/Atelier-nior).
- Client screenshots and the optional studio video: retained repository assets.
- The portfolio case’s inherited illustrative photos remain labeled as illustrative.
- Fonts: Sora, Manrope, and Noto Sans JP; SIL Open Font License files are retained.

## Interaction decisions

Keep native page scrolling, visible focus, standard links, keyboard-operable controls, and a simple mobile menu. The motion pause control affects all three characters and section animations. Animation never gates content or form submission.

Case-study navigation preserves the repaired route lifecycle, cleanup, direct URLs, and browser Back/Forward restoration. White-label partnerships retain project, monthly, and weekly bases, each labeled **Contract based**. Ordinary inquiries retain USD/PKR budgets. The form keeps input after a failed request and prevents duplicate submissions.
