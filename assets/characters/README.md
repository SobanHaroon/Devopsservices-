# Character asset provenance

The owner supplied the designs for Kael Astra, Kai Ren and Milo for use on the DevOps Services website. Their characteristic clothing, hair, eyes and props informed the generated full-body reference portraits.

| Character  | Design details                                                         | Reconstruction job                     |
| ---------- | ---------------------------------------------------------------------- | -------------------------------------- |
| Kael Astra | Dark hair, white hood, black blazer, cargo trousers and white sneakers | `153c29d1-9a38-42c8-b9f9-700b99117af5` |
| Kai Ren    | Dark hair, blue eyes, technical black clothing, buckles and boots      | `44274e83-b071-4648-bb48-1ce0d52dd8f1` |
| Milo       | Silver hair, white utility jacket, tablet and packed toolkit backpack  | `8f4d4d1d-c594-4332-a449-465dcccfd6aa` |

Reference portraits were generated using the supplied images, then submitted as PNG to to3D on October 26, 2026. `original/` contains the returned textured GLBs. The models are stylized image reconstructions, not hand-sculpted replicas. No existing commercial anime character models were downloaded.

`scripts/prepare-characters.py` converts embedded textures to WebP and adds a seven-bone rig with a small embedded breathing clip. The website drives the bones directly from scroll, pointer position and a greeting control. The preparation step is repeatable from the checked-in originals; the preceding image and mesh generation is not deterministic.

The runtime uses three genuine skinned 3D meshes. `src/lib/characterSurface.ts` projects the generated front reference detail onto mesh-attached UVs, preserving the facial expression as the geometry moves. Side and back surfaces retain the reconstructed texture.

The generated reference portraits, rendered model posters and supplied Kael studio illustration are hosted under `public/media/characters/`. The previous owner-supplied founder avatar is retained here as `muhammad-soban-avatar.webp` and is not loaded by the site.

Kael Astra represents Muhammad Soban. Kai Ren and Milo are identified as studio characters, not additional employees. The biographies make no unsupported credentials or client-result claims.
