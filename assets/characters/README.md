# Character asset provenance

The owner supplied the designs for Kael Astra, Kai Ren and Milo for use on the DevOps Services website. Their characteristic clothing, hair, eyes and props informed the generated full-body reference portraits.

| Character  | Design details                                                         | Reconstruction job                     |
| ---------- | ---------------------------------------------------------------------- | -------------------------------------- |
| Kael Astra | Dark hair, white hood, black blazer, cargo trousers and white sneakers | `153c29d1-9a38-42c8-b9f9-700b99117af5` |
| Kai Ren    | Dark hair, blue eyes, technical black clothing, buckles and boots      | `3b4f9531-c500-4ba6-99c5-15d62cbda358` |
| Milo       | Silver hair, white utility jacket, tablet and packed toolkit backpack  | `8f4d4d1d-c594-4332-a449-465dcccfd6aa` |

Reference portraits were generated using the supplied images, then submitted as PNG to to3D on October 26, 2026. `original/` contains the returned textured GLBs. The models are stylized image reconstructions, not hand-sculpted replicas. No existing commercial anime character models were downloaded.

`scripts/prepare-characters.py` converts embedded textures to WebP and adds a seven-bone rig with a small embedded breathing clip. The team page drives the bones directly from scroll and pointer position. Greeting controls have been removed. The preparation step is repeatable from the checked-in originals; the preceding image and mesh generation is not deterministic.

The team page uses three genuine skinned 3D meshes; no 3D scenes load on the homepage. `src/lib/characterSurface.ts` projects the generated front reference detail onto mesh-attached UVs, preserving the facial expression as the geometry moves. Side and back surfaces retain the reconstructed texture. Kai’s replacement retains its own clothing UV texture; a soft face-only reference blend restores readable facial detail without projecting artwork over the coat.

The generated reference portraits, rendered model posters and supplied Kael studio illustration are hosted under `public/media/characters/`. The previous owner-supplied founder avatar is retained here as `muhammad-soban-avatar.webp` and is not loaded by the site.

Kael Astra represents Muhammad Soban. Kai Ren and Milo are identified as studio characters, not additional employees. The biographies make no unsupported credentials or client-result claims.

## Kai cleanup — October 27, 2026

The built-in image generator produced a clean standing 3D reference from the owner’s original Kai illustration. Prompt direction: preserve black hair, bright blue eyes, sulking expression and dark techwear; simplify chains and buckles, use smooth sculpted forms and evenly lit satin materials, neutral front A-pose, transparent background. The reference is `public/media/characters/kai-clean-source.webp`. to3D job `3b4f9531-c500-4ba6-99c5-15d62cbda358` replaces the first Kai reconstruction. The original supplied illustrations are stored as `public/media/characters/{kael,kai,milo}-team.webp` and used directly by the team cards.
