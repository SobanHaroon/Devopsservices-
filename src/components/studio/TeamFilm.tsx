import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { CHARACTER_NAMES, type CharacterName } from "../../data/team";

export default function TeamFilm({
  character,
  paused,
}: {
  character: CharacterName;
  paused: boolean;
}) {
  const { language } = useLanguage();
  const [opened, setOpened] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (paused) video.current?.pause();
  }, [paused, opened]);
  const label =
    language === "JP"
      ? "スタジオのひとコマ"
      : language === "FR"
        ? "Un moment au studio"
        : language === "DE"
          ? "Ein Moment im Studio"
          : "A moment in the studio";
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) el.pause();
    });
    const pause = () => {
      if (document.hidden) el.pause();
    };
    observer.observe(el);
    document.addEventListener("visibilitychange", pause);
    return () => {
      el.pause();
      observer.disconnect();
      document.removeEventListener("visibilitychange", pause);
    };
  }, [opened]);
  return (
    <figure className="team-film">
      {opened ? (
        <video
          ref={video}
          src={`/media/characters/${character}-moment.mp4`}
          poster={`/media/characters/${character}-moment.webp`}
          controls
          playsInline
          muted
          autoPlay={!paused}
          preload="metadata"
          aria-label={`${CHARACTER_NAMES[character]} — ${label}`}
        />
      ) : (
        <button
          className="team-film-trigger"
          onClick={() => setOpened(true)}
          aria-label={`${label} 10s: ${CHARACTER_NAMES[character]}`}
        >
          <img
            src={`/media/characters/${character}-moment.webp`}
            alt=""
            width="360"
            height="640"
            loading="lazy"
          />
          <span>
            <Play size={18} aria-hidden="true" />
            {label} <span aria-hidden="true">10s</span>
          </span>
        </button>
      )}
    </figure>
  );
}
