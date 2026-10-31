import { useEffect, useRef, type VideoHTMLAttributes } from "react";

/** Shared ambient playback: no controls or application-driven pauses. */
export default function LoopingVideo({
  src,
  style,
  ...props
}: VideoHTMLAttributes<HTMLVideoElement>) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    let disposed = false;
    let blocked = false;
    const play = () => {
      if (disposed || !player.paused) return;
      player.muted = true;
      player.defaultMuted = true;
      void player.play().then(
        () => {
          blocked = false;
        },
        (error: unknown) => {
          blocked =
            error instanceof DOMException && error.name === "NotAllowedError";
        },
      );
    };
    const resume = () => {
      if (!document.hidden) play();
    };
    const retry = () => {
      if (blocked) play();
    };
    // Some browsers suspend video in background tabs or outside the viewport.
    // Retry when it returns without ever pausing it when it leaves.
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) play();
    });
    observer.observe(player);
    player.addEventListener("loadeddata", play);
    player.addEventListener("canplay", play);
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("pageshow", resume);
    window.addEventListener("pointerdown", retry, { passive: true });
    window.addEventListener("keydown", retry);
    play();
    return () => {
      disposed = true;
      observer.disconnect();
      player.removeEventListener("loadeddata", play);
      player.removeEventListener("canplay", play);
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("pageshow", resume);
      window.removeEventListener("pointerdown", retry);
      window.removeEventListener("keydown", retry);
      // Release the detached player when navigation removes its page.
      player.pause();
    };
  }, [src]);

  return (
    <video
      {...props}
      ref={video}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      preload="auto"
      tabIndex={-1}
      style={{ ...style, pointerEvents: "none" }}
    />
  );
}
