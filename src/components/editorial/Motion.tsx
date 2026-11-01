import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
export default function Motion({ routeKey }: { routeKey: string }) {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const lenis = new Lenis({ smoothWheel: !media.matches, anchors: false });
    let raf = 0;
    const frame = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const lock = (event: Event) => {
      (event as CustomEvent).detail ? lenis.stop() : lenis.start();
    };
    window.addEventListener("studio:menu", lock);
    const preference = () => {
      lenis.options.smoothWheel = !media.matches;
    };
    media.addEventListener("change", preference);
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            reveal.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -5% 0px" },
    );
    const watch = () =>
      document
        .querySelectorAll("[data-reveal]:not([data-observed])")
        .forEach((e) => {
          e.setAttribute("data-observed", "");
          reveal.observe(e);
        });
    watch();
    const mutation = new MutationObserver(watch);
    mutation.observe(document.getElementById("main-content")!, {
      childList: true,
      subtree: true,
    });
    const parallax = () => {
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((e) => {
        const box = e.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, (innerHeight - box.top) / (innerHeight + box.height)),
        );
        e.style.setProperty(
          "--parallax",
          !media.matches && innerWidth > 768
            ? `${2.5 - progress * 5}rem`
            : "0rem",
        );
      });
    };
    lenis.on("scroll", parallax);
    parallax();
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      reveal.disconnect();
      mutation.disconnect();
      document
        .querySelectorAll("[data-observed]")
        .forEach((e) => e.removeAttribute("data-observed"));
      window.removeEventListener("studio:menu", lock);
      media.removeEventListener("change", preference);
    };
  }, [routeKey]);
  return null;
}
