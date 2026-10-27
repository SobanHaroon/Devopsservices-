# Version 4 visual review

Internal review of the team redesign, not an external award or certification. All seventeen final inspection images for the homepage and team page were opened: desktop, tablet and phone first screens and the full-page inspection sheets. Both production-build inspections report zero failures.

ROUND 3

Seen in one second: a navy title tile beside Kael, Kai and Milo in their own colored portrait tiles.

Idea (one sentence): Soban’s supplied character cast becomes a studio board that connects the founder’s identity with the personalities behind development and operations.

Live thing: real skinned 3D characters turn and change their poses with native scrolling, follow a fine pointer and respond to an accessible greeting control.

Layout words by section: team-introduction=character-board / profiles=sticky-model-and-biography / contact=studio-art-and-invitation / footer=wordmark.

Scores for the team page: design 7.5 · usability 8 · creativity 7.5 · content 8 → overall 7.7.

Caps applied: no award-level fidelity is claimed for the image-reconstructed meshes. Clothing and back surfaces retain a visibly stylized reconstruction finish. The rigs support restrained posing rather than complex character acting. The existing homepage retains its logo-colored headline treatment.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Faces in the initial `profile-kael.png` and `profile-kai.png` had harsh bands from reconstructed geometry and texture detail. Added mesh-attached reference UVs and softened face lighting. Final `desktop-page-01.jpg` shows readable faces while the figures retain real 3D volume and skeletal poses.
2. On the initial mobile profile sheets, short character captions sat immediately before the biography headings. Moved these quotations into the biography panels and retained the greeting beside each model. The final `mobile-page-01.jpg` keeps the profile title and role clear.
3. The first team layout relied on desktop portrait columns. Added a single-column phone composition with horizontal portrait/name tiles and a stacked model/profile layout. The final `mobile-fold.jpg` preserves the primary project action and legible character identity.

| Before                                               | After                                                                                 |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Generic procedural character cast                    | Kael’s hood, Kai’s blue eyes and technical clothing, Milo’s silver hair and toolkit   |
| A single founder block on the homepage               | Linked team introduction plus a dedicated page with three profile anchors             |
| Body turns with simple prop movement                 | Seven-bone poses, pointer gaze, touch/keyboard greeting and pause/offscreen lifecycle |
| Hard facial shading in the first reconstruction pass | Mesh-attached front reference detail and softer face lighting                         |

The remaining size-count warning comes from fluid display type, the shared footer wordmark and multilingual variants; body copy remains consistent and readable. No unrelated video was added to the team page: its subject is already represented by three moving 3D figures and the supplied studio illustration. The homepage retains the original optional studio film.

The direction is **The well-kept board**, seed **1792908015**. The geographical mosaic and dated-agenda slots were redrawn to team tiles and sticky profile chapters because the content contains three character biographies, not geographic facts or scheduled sessions. The exact reference list and copy deck are in [team-direction.md](team-direction.md). No premium GetLayers source, third-party character models, invented employees or fabricated client results are included.
