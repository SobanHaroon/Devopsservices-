import { useEffect, useRef } from "react";
export default function Storm() {
  const ref = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const send = () =>
      ref.current?.contentWindow?.postMessage(
        {
          type: "storm-scroll",
          progress: Math.min(1, window.scrollY / Math.max(1, innerHeight * 2)),
        },
        location.origin,
      );
    const move = (e: PointerEvent) =>
      ref.current?.contentWindow?.postMessage(
        {
          type: "storm-pointer",
          x: (e.clientX / innerWidth) * 2 - 1,
          y: -((e.clientY / innerHeight) * 2 - 1),
        },
        location.origin,
      );
    const frame = ref.current;
    frame?.addEventListener("load", send);
    window.addEventListener("scroll", send, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      frame?.removeEventListener("load", send);
      window.removeEventListener("scroll", send);
      window.removeEventListener("pointermove", move);
    };
  }, []);
  return (
    <div className="storm-plate" data-reveal>
      <iframe
        ref={ref}
        src="/scenes/storm/index.html?embedded=1&local=1"
        title="Storm — an interactive field of light"
        tabIndex={-1}
        loading="eager"
      />
      <div className="art-label">
        <span>STORM / CREATIVE DEVELOPMENT</span>
        <span>Move to explore ↗</span>
      </div>
    </div>
  );
}
