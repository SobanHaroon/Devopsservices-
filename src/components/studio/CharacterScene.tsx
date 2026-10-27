import { useEffect, useRef } from "react";
import type { MotionValue } from "motion/react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import type { CharacterName } from "../../data/team";
import { applyCharacterSurface } from "../../lib/characterSurface";
export type { CharacterName } from "../../data/team";
export default function CharacterScene({
  character,
  paused,
  progress,
}: {
  character: CharacterName;
  paused: boolean;
  progress: MotionValue<number>;
}) {
  const host = useRef<HTMLDivElement>(null),
    pause = useRef(paused),
    invalidate = useRef<() => void>(() => {});
  useEffect(() => {
    pause.current = paused;
    invalidate.current();
  }, [paused]);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      el.dataset.failed = "true";
      return;
    }
    renderer.setPixelRatio(
      Math.min(devicePixelRatio, innerWidth < 700 ? 1.25 : 1.5),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(31, 1, 0.1, 30);
    camera.position.set(0, 2.3, 8.9);
    camera.lookAt(0, 1.98, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8095a2, 2.3));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(-3, 5, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xbceefa, 0.8);
    fill.position.set(4, 3, 2);
    scene.add(fill);
    const rig = new THREE.Group();
    scene.add(rig);
    let disposed = false,
      visible = false,
      contextLost = false,
      frame = 0,
      last = 0,
      clock = 0,
      model: THREE.Object3D | undefined;
    const reference = new THREE.TextureLoader().load(
      `/media/characters/${character === "kai" ? "kai-clean" : character}-source.webp`,
      () => {
        if (!disposed) start();
      },
    );
    reference.colorSpace = THREE.SRGBColorSpace;
    const bones: Record<string, THREE.Object3D | undefined> = {};
    const pointer = { x: 0, y: 0, hover: 0 };
    const disposeModel = (obj: THREE.Object3D) => {
      const geometries = new Set<THREE.BufferGeometry>(),
        materials = new Set<THREE.Material>(),
        textures = new Set<THREE.Texture>(),
        skeletons = new Set<THREE.Skeleton>();
      obj.traverse((c) => {
        if (c instanceof THREE.Mesh) {
          geometries.add(c.geometry);
          (Array.isArray(c.material) ? c.material : [c.material]).forEach(
            (m) => {
              materials.add(m);
              Object.values(m).forEach((v) => {
                if (v instanceof THREE.Texture) textures.add(v);
              });
            },
          );
        }
        if (c instanceof THREE.SkinnedMesh) skeletons.add(c.skeleton);
      });
      geometries.forEach((g) => g.dispose());
      textures.forEach((t) => t.dispose());
      materials.forEach((m) => m.dispose());
      skeletons.forEach((s) => s.dispose());
    };
    function render() {
      if (disposed || contextLost) return;
      if (!pause.current) {
        const p = THREE.MathUtils.clamp(progress.get(), 0, 1),
          wave = Math.sin(p * Math.PI * 4),
          active = pointer.hover * 0.5;
        const range = character === "milo" ? 1.4 : 1.05;
        rig.rotation.y = THREE.MathUtils.lerp(
          rig.rotation.y,
          (p - 0.5) * range + pointer.x * 0.55,
          0.14,
        );
        rig.position.y =
          Math.sin(clock * 1.15) * 0.012 +
          (character === "milo" ? Math.sin(p * Math.PI * 2) * 0.035 : 0);
        rig.rotation.z = THREE.MathUtils.lerp(
          rig.rotation.z,
          (p - 0.5) * (character === "milo" ? 0.06 : 0.025),
          0.12,
        );
        const head = bones.Head,
          torso = bones.Torso,
          left = bones.ArmLeft,
          right = bones.ArmRight;
        if (head) {
          head.rotation.y = THREE.MathUtils.lerp(
            head.rotation.y,
            pointer.x * 0.34 + (p - 0.5) * 0.14,
            0.12,
          );
          head.rotation.x = THREE.MathUtils.lerp(
            head.rotation.x,
            pointer.y * 0.15 +
              Math.sin(clock * 0.8) * 0.012 +
              (character === "kai" ? 0.04 : 0) +
              active * Math.sin(clock * 3) * 0.055,
            0.12,
          );
          head.rotation.z = THREE.MathUtils.lerp(
            head.rotation.z,
            character === "milo" ? wave * 0.035 : wave * 0.012,
            0.12,
          );
        }
        if (torso) {
          torso.rotation.z = Math.sin(p * Math.PI * 2) * 0.025;
          torso.rotation.x = Math.sin(clock * 1.15) * 0.008;
        }
        if (left)
          left.rotation.x =
            wave * 0.08 +
            (character === "kai" ? active * Math.sin(clock * 5) * 0.07 : 0);
        if (right) {
          right.rotation.z = THREE.MathUtils.lerp(
            right.rotation.z,
            active * (-0.18 + Math.sin(clock * 5) * 0.08),
            0.1,
          );
          right.rotation.x = -wave * 0.08;
        }
        if (bones.LegLeft) bones.LegLeft.rotation.x = wave * 0.075;
        if (bones.LegRight) bones.LegRight.rotation.x = -wave * 0.075;
        el!.dataset.pose = p.toFixed(3);
        el!.dataset.rotation = rig.rotation.y.toFixed(3);
        el!.dataset.interacting = String(active > 0);
      }
      renderer.render(scene, camera);
    }
    function loop(time: number) {
      frame = 0;
      if (
        disposed ||
        !visible ||
        document.hidden ||
        pause.current ||
        contextLost
      )
        return;
      if (time - last > 32) {
        clock += Math.min((time - last) / 1000, 0.05);
        last = time;
        render();
      }
      frame = requestAnimationFrame(loop);
    }
    function start() {
      cancelAnimationFrame(frame);
      frame = 0;
      el!.dataset.animating = String(
        visible && !document.hidden && !pause.current && !contextLost,
      );
      if (visible && !document.hidden && !contextLost) {
        render();
        if (!pause.current) frame = requestAnimationFrame(loop);
      }
    }
    const resize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      start();
    };
    new GLTFLoader().load(
      `/models/${character}.glb`,
      (gltf) => {
        if (disposed) {
          disposeModel(gltf.scene);
          return;
        }
        model = gltf.scene;
        applyCharacterSurface(model, character, reference);
        const box = new THREE.Box3().setFromObject(model),
          size = box.getSize(new THREE.Vector3()),
          center = box.getCenter(new THREE.Vector3()),
          scale = 3.9 / size.y;
        model.scale.setScalar(scale);
        model.position.set(
          -center.x * scale,
          -box.min.y * scale,
          -center.z * scale,
        );
        model.traverse((c) => {
          if (c instanceof THREE.Mesh) {
            c.frustumCulled = false;
            if (!c.geometry.attributes.normal)
              c.geometry.computeVertexNormals();
            (Array.isArray(c.material) ? c.material : [c.material]).forEach(
              (mat) => {
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.metalness = 0;
                  mat.roughness = 1;
                }
              },
            );
          }
        });
        rig.add(model);
        for (const name of [
          "Root",
          "Torso",
          "Head",
          "ArmLeft",
          "ArmRight",
          "LegLeft",
          "LegRight",
        ])
          bones[name] = model.getObjectByName(name);
        el.dataset.loaded = "true";
        el.closest(".character-art")?.classList.add("model-ready");
        start();
      },
      undefined,
      () => {
        el.dataset.failed = "true";
      },
    );
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        start();
      },
      { threshold: 0.01 },
    );
    io.observe(el);
    const move = (e: PointerEvent) => {
      if (
        e.pointerType !== "mouse" ||
        !matchMedia("(hover: hover) and (pointer: fine)").matches
      )
        return;
      const r = el.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width - 0.5;
      pointer.y = (e.clientY - r.top) / r.height - 0.5;
      pointer.hover = 1;
    };
    const leave = () => {
      pointer.x = pointer.y = pointer.hover = 0;
    };
    const loss = (e: Event) => {
      e.preventDefault();
      contextLost = true;
      el.closest(".character-art")?.classList.remove("model-ready");
      start();
    };
    const restore = () => {
      contextLost = false;
      if (model) el.closest(".character-art")?.classList.add("model-ready");
      resize();
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", start);
    renderer.domElement.addEventListener("webglcontextlost", loss);
    renderer.domElement.addEventListener("webglcontextrestored", restore);
    invalidate.current = start;
    resize();
    return () => {
      disposed = true;
      invalidate.current = () => {};
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", start);
      renderer.domElement.removeEventListener("webglcontextlost", loss);
      renderer.domElement.removeEventListener("webglcontextrestored", restore);
      if (model) disposeModel(model);
      reference.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el)
        el.removeChild(renderer.domElement);
    };
  }, [character, progress]);
  return (
    <div
      ref={host}
      className="character-webgl"
      data-character={character}
      aria-hidden="true"
    />
  );
}
