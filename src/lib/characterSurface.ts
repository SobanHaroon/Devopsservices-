import * as THREE from "three";
import type { CharacterName } from "../data/team";

// The generator reconstructs the volume; reference projection preserves the
// supplied character's painted facial detail on that volume. UVs stay attached
// to the rest mesh, so they follow skeletal movement instead of the camera.
const references = {
  kael: { size: [1024, 1536], box: [210, 16, 854, 1498] },
  kai: { size: [768, 768], box: [189, 12, 571, 757] },
  milo: { size: [1024, 1536], box: [77, 17, 897, 1516] },
};
export function applyCharacterSurface(
  model: THREE.Object3D,
  character: CharacterName,
  texture: THREE.Texture,
) {
  const bounds = new THREE.Box3().setFromObject(model),
    ref = references[character];
  const [iw, ih] = ref.size,
    [left, top, right, bottom] = ref.box;
  model.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) return;
    const geometry = node.geometry;
    if (!geometry.attributes.normal) geometry.computeVertexNormals();
    const position = geometry.attributes.position;
    const uv = new Float32Array(position.count * 2),
      weight = new Float32Array(position.count);
    for (let i = 0; i < position.count; i++) {
      const x =
        (position.getX(i) - bounds.min.x) / (bounds.max.x - bounds.min.x);
      const y =
        (position.getY(i) - bounds.min.y) / (bounds.max.y - bounds.min.y);
      uv[i * 2] = (left + x * (right - left)) / iw;
      uv[i * 2 + 1] = 1 - (bottom - y * (bottom - top)) / ih;
      weight[i] =
        THREE.MathUtils.smoothstep(position.getZ(i), -0.04, 0.04) *
        THREE.MathUtils.smoothstep(position.getY(i), 0.03, 0.16);
      if (character === "kai") {
        // Preserve the rebuilt coat's real UV texture; only soften the face.
        weight[i] =
          THREE.MathUtils.smoothstep(position.getZ(i), 0.04, 0.1) *
          THREE.MathUtils.smoothstep(position.getY(i), 0.07, 0.13) *
          (1 - THREE.MathUtils.smoothstep(position.getY(i), 0.3, 0.37));
      }
    }
    geometry.setAttribute("referenceUv", new THREE.BufferAttribute(uv, 2));
    geometry.setAttribute(
      "referenceWeight",
      new THREE.BufferAttribute(weight, 1),
    );
    const materials = Array.isArray(node.material)
      ? node.material
      : [node.material];
    materials.forEach((mat) => {
      if (!(mat instanceof THREE.MeshStandardMaterial)) return;
      mat.userData.referenceTexture = texture;
      mat.onBeforeCompile = (shader) => {
        shader.uniforms.referenceMap = { value: texture };
        shader.vertexShader = shader.vertexShader.replace(
          "#include <common>",
          "#include <common>\nattribute vec2 referenceUv;\nattribute float referenceWeight;\nvarying vec2 vReferenceUv;\nvarying float vReferenceWeight;",
        );
        shader.vertexShader = shader.vertexShader.replace(
          "#include <begin_vertex>",
          "#include <begin_vertex>\nvReferenceUv=referenceUv;\nvReferenceWeight=referenceWeight;",
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <common>",
          "#include <common>\nuniform sampler2D referenceMap;\nvarying vec2 vReferenceUv;\nvarying float vReferenceWeight;",
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <map_fragment>",
          "#include <map_fragment>\nvec4 referenceColor=texture2D(referenceMap,vReferenceUv);\ndiffuseColor.rgb=mix(diffuseColor.rgb,referenceColor.rgb,vReferenceWeight*smoothstep(0.65,0.95,referenceColor.a));",
        );
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <opaque_fragment>",
          "outgoingLight=mix(outgoingLight,referenceColor.rgb,vReferenceWeight*smoothstep(0.65,0.95,referenceColor.a)*0.8);\n#include <opaque_fragment>",
        );
      };
      mat.customProgramCacheKey = () => "character-reference-v1";
      mat.needsUpdate = true;
    });
  });
}
