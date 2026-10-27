import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type Scenery = "city" | "studio" | "gallery" | "harbor";

/** Art stays independent of copy, so narrow screens can recompose the scene. */
export function ScenePicture({
  scene,
  priority = false,
  className = "",
}: {
  scene: Scenery;
  priority?: boolean;
  className?: string;
}) {
  return (
    <picture className={`scene-picture ${className}`}>
      <source
        media="(max-width: 700px)"
        srcSet={`/media/scenery/${scene}-mobile.webp`}
        width="840"
        height={scene === "city" || scene === "studio" ? "1260" : "472"}
      />
      <img
        src={`/media/scenery/${scene}-1600.webp`}
        srcSet={`/media/scenery/${scene}-960.webp 960w, /media/scenery/${scene}-1600.webp 1600w`}
        sizes="100vw"
        width="1600"
        height="900"
        alt=""
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}

export function Foreground({ className = "" }: { className?: string }) {
  return (
    <img
      className={`scene-foreground ${className}`}
      src="/media/scenery/foreground.webp"
      width="1672"
      height="941"
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  );
}

/** React adaptation of Taste's shared stage: native sticky layout, reversible
 * scroll progress, breakpoint-specific movement, and full GSAP cleanup. */
export function useScenicMotion(
  root: RefObject<HTMLDivElement | null>,
  off: boolean,
  language: string,
) {
  useEffect(() => {
    if (off || !root.current) return;
    const mm = gsap.matchMedia();
    const scope = root.current;
    mm.add(
      {
        desktop: "(min-width: 701px)",
        mobile: "(max-width: 700px)",
        short: "(max-height: 700px)",
      },
      (context) => {
        if (context.conditions?.short) return;
        const mobile = !!context.conditions?.mobile;
        const scenes = gsap.context(() => {
          const hero = scope.querySelector<HTMLElement>(".city-journey");
          if (hero) {
            const timeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: hero,
                start: "top top+=80",
                end: "bottom bottom",
                scrub: 0.45,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  hero.dataset.progress = self.progress.toFixed(3);
                },
              },
            });
            timeline
              .fromTo(
                hero.querySelector(".scene-picture"),
                { scale: 1.02, yPercent: 0 },
                {
                  scale: mobile ? 1.13 : 1.24,
                  yPercent: mobile ? -3 : -6,
                  duration: 1,
                },
                0,
              )
              .fromTo(
                hero.querySelector(".scene-foreground"),
                { scale: 1.04, yPercent: 9 },
                { scale: mobile ? 1.2 : 1.44, yPercent: -14, duration: 1 },
                0,
              )
              .to(
                hero.querySelector(".hero-copy"),
                { y: mobile ? -20 : -52, duration: 1 },
                0,
              )
              .fromTo(
                hero.querySelector(".journey-caption"),
                { y: 16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.35 },
                0.35,
              )
              .fromTo(
                hero.querySelector(".brand-orbit"),
                { rotateY: -20, rotateX: 8, rotateZ: -8, scale: 0.85 },
                {
                  rotateY: 25,
                  rotateX: -10,
                  rotateZ: 12,
                  scale: 1.15,
                  duration: 1,
                },
                0,
              );
          }

          // The gallery opens as the visitor reaches it, then releases to a real
          // responsive project grid. Links remain clickable throughout.
          const gallery = scope.querySelector<HTMLElement>(".gallery-journey");
          if (gallery) {
            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: gallery,
                start: "top top+=80",
                end: "bottom bottom",
                scrub: 0.5,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  gallery.dataset.progress = self.progress.toFixed(3);
                },
              },
            });
            tl.fromTo(
              gallery.querySelector(".scene-picture"),
              { scale: 1.15, yPercent: 3 },
              { scale: 1.03, yPercent: -3, duration: 1 },
              0,
            )
              .fromTo(
                gallery.querySelector(".gallery-window"),
                { scale: mobile ? 0.92 : 0.78, rotateX: mobile ? 0 : 8 },
                { scale: 1, rotateX: 0, duration: 0.75 },
                0,
              )
              .fromTo(
                gallery.querySelector(".gallery-window img"),
                { yPercent: 0 },
                { yPercent: mobile ? -5 : -9, duration: 0.6 },
                0.4,
              );
          }

          scope
            .querySelectorAll<HTMLElement>(".scenic-frame")
            .forEach((frame) => {
              const picture = frame.querySelector(".scene-picture");
              gsap.fromTo(
                picture,
                { yPercent: 3, scale: 1.06 },
                {
                  yPercent: -3,
                  scale: 1.12,
                  ease: "none",
                  scrollTrigger: {
                    trigger: frame,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.6,
                  },
                },
              );
            });
        }, scope);
        return () => scenes.revert();
      },
    );
    let active = true;
    document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });
    return () => {
      active = false;
      mm.revert();
      scope
        .querySelectorAll<HTMLElement>("[data-progress]")
        .forEach((el) => delete el.dataset.progress);
    };
  }, [root, off, language]);
}

/** A small vector constellation follows the shape of the owner's infinity mark.
 * It does not create another WebGL renderer on the homepage. */
export function BrandOrbit() {
  const points = Array.from({ length: 64 }, (_, i) => {
    const t = (i / 64) * Math.PI * 2;
    const denominator = 1 + Math.cos(t) ** 2;
    return {
      x: 150 + (128 * Math.sin(t)) / denominator,
      y: 100 + (100 * Math.sin(t) * Math.cos(t)) / denominator,
    };
  });
  return (
    <svg className="brand-orbit" viewBox="0 0 300 200" aria-hidden="true">
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i % 4 === 0 ? 2.3 : 1.25}
          fill={i % 7 === 0 ? "#dcc99c" : "#7ee5ed"}
          opacity={i % 3 === 0 ? 0.85 : 0.38}
        />
      ))}
    </svg>
  );
}
