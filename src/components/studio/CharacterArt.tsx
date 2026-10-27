import { lazy, Suspense, useRef, useState } from "react";
import {
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Hand } from "lucide-react";
import {
  CHARACTER_NAMES,
  TEAM_COPY,
  type CharacterName,
} from "../../data/team";
import { useLanguage } from "../../context/LanguageContext";
const CharacterScene = lazy(() => import("./CharacterScene"));
const descriptions = {
  kael: "Kael Astra, a 3D anime character in a white hood, black blazer and white sneakers",
  kai: "Kai Ren, a 3D anime coder with black hair, blue eyes, a technical jacket and buckled boots",
  milo: "Milo, a 3D anime operations character with white hair, a tablet and a backpack full of supplies",
};
export default function CharacterArt({
  character,
  paused,
  caption,
  interactive = true,
}: {
  character: CharacterName;
  paused: boolean;
  caption: string;
  interactive?: boolean;
}) {
  const host = useRef<HTMLElement>(null),
    reduced = useReducedMotion();
  const { language } = useLanguage(),
    c = TEAM_COPY[language];
  const near = useInView(host, { margin: "200px", once: true });
  const [greeting, setGreeting] = useState(0);
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [16, -16]);
  return (
    <figure ref={host} className={`character-art character-${character}`}>
      <div className="character-orbit" aria-hidden="true" />
      <div className="character-grid" aria-hidden="true" />
      <m.div
        className="character-stage"
        style={{ y: reduced || paused ? 0 : y }}
        role="img"
        aria-label={descriptions[character]}
      >
        <img
          className="character-poster"
          src={`/media/characters/${character}.webp`}
          width="800"
          height="900"
          alt=""
          loading={character === "kael" ? "eager" : "lazy"}
          fetchPriority={character === "kael" ? "high" : "auto"}
        />
        {near && !reduced && (
          <Suspense fallback={null}>
            <CharacterScene
              character={character}
              paused={paused}
              progress={scrollYProgress}
              greeting={greeting}
            />
          </Suspense>
        )}
      </m.div>
      {caption && <figcaption className="character-caption">{caption}</figcaption>}
      {interactive && !reduced && (
        <button
          className="character-greet"
          aria-label={`${c.greet} — ${CHARACTER_NAMES[character]}`}
          disabled={paused}
          onClick={() => setGreeting((v) => v + 1)}
        >
          <Hand size={17} />
          <span>{c.greet}</span>
        </button>
      )}
    </figure>
  );
}
