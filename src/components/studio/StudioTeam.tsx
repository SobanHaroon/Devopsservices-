import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";
import {
  CHARACTER_IDS,
  CHARACTER_NAMES,
  TEAM_COPY,
  type CharacterName,
} from "../../data/team";
export function TeamCard({
  character,
  onNavigate,
  paused = false,
}: {
  character: CharacterName;
  onNavigate: (to: string) => void;
  paused?: boolean;
}) {
  const { language } = useLanguage(),
    c = TEAM_COPY[language];
  const ref = useRef<HTMLAnchorElement>(null),
    reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [12, -12]);
  return (
    <a
      ref={ref}
      className={`crew-card crew-card-${character}`}
      href={`/team#${character}`}
      onClick={(e) => {
        if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
          e.preventDefault();
          onNavigate(`/team#${character}`);
        }
      }}
    >
      <div className="crew-card-art">
        <m.img
          src={`/media/characters/${character}-team.webp`}
          width="1200"
          height={character === "milo" ? "1200" : "1600"}
          alt={`${CHARACTER_NAMES[character]} character portrait`}
          loading="lazy"
          style={{ y: reduced || paused ? 0 : y }}
        />
      </div>
      <div className="crew-card-copy">
        <h3>{CHARACTER_NAMES[character]}</h3>
        <p>{c.profiles[character].role}</p>
        <ArrowUpRight size={22} aria-hidden="true" />
      </div>
    </a>
  );
}
export default function StudioTeam({
  onNavigate,
  paused,
}: {
  onNavigate: (to: string) => void;
  paused: boolean;
}) {
  const { language } = useLanguage(),
    c = TEAM_COPY[language];
  return (
    <section id="team" className="crew-intro section-space container">
      <div className="section-heading">
        <div>
          <h2 data-reveal>{c.title}</h2>
          <p data-reveal>{c.teaser}</p>
        </div>
        <a
          className="text-link"
          href="/team"
          onClick={(e) => {
            if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
              e.preventDefault();
              onNavigate("/team");
            }
          }}
        >
          {c.visit}
          <ArrowUpRight size={20} />
        </a>
      </div>
      <div className="crew-grid">
        {CHARACTER_IDS.map((character) => (
          <TeamCard
            key={character}
            character={character}
            onNavigate={onNavigate}
            paused={paused}
          />
        ))}
      </div>
    </section>
  );
}
