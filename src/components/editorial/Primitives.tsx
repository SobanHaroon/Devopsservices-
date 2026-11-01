import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
export type Navigate = (path: string) => void;
export function Link({
  to,
  onNavigate,
  children,
  className = "",
  ...rest
}: {
  to: string;
  onNavigate: Navigate;
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <a
      href={to}
      className={className}
      {...rest}
      onClick={(e) => {
        if (
          e.button === 0 &&
          !e.metaKey &&
          !e.ctrlKey &&
          !e.shiftKey &&
          !e.altKey
        ) {
          e.preventDefault();
          onNavigate(to);
        }
      }}
    >
      {children}
    </a>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}
export function Heading({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  const lines: ReactNode[][] = [[]];
  Children.toArray(children).forEach((child) => {
    if (isValidElement(child) && child.type === "br") lines.push([]);
    else lines[lines.length - 1].push(child);
  });
  return (
    <div className="section-heading">
      {label && <Eyebrow>{label}</Eyebrow>}
      <h2 data-reveal className="heading-reveal">
        {lines.map((line, i) => (
          <span className="heading-clip" key={i}>
            <span style={{ "--line-delay": `${i * 90}ms` } as CSSProperties}>
              {line}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}
export function Words({
  text,
  className = "",
  delay = 0,
  stagger = 18,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <p data-reveal className={"word-reveal " + className}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={
            { "--word-delay": `${delay + i * stagger}ms` } as CSSProperties
          }
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
export function Button({
  to,
  onNavigate,
  children,
  ghost = false,
}: {
  to: string;
  onNavigate: Navigate;
  children: ReactNode;
  ghost?: boolean;
}) {
  return (
    <Link
      to={to}
      onNavigate={onNavigate}
      className={"button" + (ghost ? " button-ghost" : "")}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
export function LoopVideo({
  src,
  poster,
  className = "",
  label,
}: {
  src: string;
  poster: string;
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.defaultMuted = true;
    video.muted = true;
    const play = () => {
      if (video.isConnected) void video.play().catch(() => {});
    };
    play();
    video.addEventListener("canplay", play);
    window.addEventListener("pageshow", play);
    document.addEventListener("visibilitychange", play);
    document.addEventListener("pointerdown", play, { passive: true });
    return () => {
      video.removeEventListener("canplay", play);
      window.removeEventListener("pageshow", play);
      document.removeEventListener("visibilitychange", play);
      document.removeEventListener("pointerdown", play);
    };
  }, [src]);
  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      aria-label={label}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
