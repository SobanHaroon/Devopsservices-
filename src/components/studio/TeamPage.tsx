import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowUpRight, Github, MapPin } from "lucide-react";
import { useMotionPreference } from "../../lib/useMotionPreference";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../context/LanguageContext";
import { CHARACTER_IDS, CHARACTER_NAMES, TEAM_COPY } from "../../data/team";
import { updateCaseStudyMetaTags } from "../../lib/seo";
import CharacterArt from "./CharacterArt";
import { TeamCard } from "./StudioTeam";
import TeamFilm from "./TeamFilm";
gsap.registerPlugin(ScrollTrigger);
export default function TeamPage({
  onNavigate,
}: {
  onNavigate: (to: string) => void;
}) {
  const { language } = useLanguage(),
    c = TEAM_COPY[language],
    reduced = useMotionPreference();
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    updateCaseStudyMetaTags(
      `${c.title} | DevOps Services`,
      c.intro + " " + c.note,
      undefined,
      undefined,
      "/team",
    );
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) =>
        gsap.fromTo(
          el,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 96%", once: true },
          },
        ),
      );
    }, root);
    return () => ctx.revert();
  }, [language, reduced, c]);
  const go = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(to);
  };
  return (
    <div ref={root} className="team-page" data-language={language}>
      <section className="team-board container">
        <div className="team-page-tools">
          <nav aria-label="Team page navigation">
            <a href="/" className="text-link" onClick={(e) => go(e, "/")}>
              <ArrowLeft size={17} />
              {c.back}
            </a>
          </nav>
        </div>
        <div className="team-board-grid">
          <div className="team-title-tile">
            <h1>{c.title}</h1>
            <p>{c.intro}</p>
            <a
              href="/#contact"
              className="button button-accent"
              onClick={(e) => go(e, "/#contact")}
            >
              {c.contact}
              <ArrowUpRight size={20} />
            </a>
          </div>
          {CHARACTER_IDS.map((character) => (
            <TeamCard
              key={character}
              character={character}
              paused={false}
              onNavigate={onNavigate}
            />
          ))}
        </div>
        <p className="team-cast-note">{c.note}</p>
      </section>
      <div className="team-chapters container">
        {CHARACTER_IDS.map((character) => {
          const p = c.profiles[character];
          return (
            <section
              key={character}
              id={character}
              className={`team-chapter team-chapter-${character}`}
              aria-labelledby={`${character}-title`}
            >
              <div className="team-model-panel">
                <CharacterArt character={character} caption="" />
              </div>
              <div className="team-profile-copy">
                <h2 id={`${character}-title`} data-reveal>
                  {CHARACTER_NAMES[character]}
                </h2>
                {character === "kael" && (
                  <p className="team-real-name" data-reveal>
                    Muhammad Soban
                  </p>
                )}
                <p className="team-role" data-reveal>
                  {p.role}
                </p>
                <p className="team-lead" data-reveal>
                  {p.line}
                </p>
                <p data-reveal>{p.bio}</p>
                <p data-reveal>{p.detail}</p>
                {character === "kael" && (
                  <div className="team-location" data-reveal>
                    <MapPin size={17} />
                    <span>Rawalpindi, Pakistan</span>
                  </div>
                )}
                <ul className="team-focus" aria-label={c.focus}>
                  {p.focus.map((item) => (
                    <li key={item} data-reveal>
                      {item}
                    </li>
                  ))}
                </ul>
                <blockquote className="team-profile-quote" data-reveal>
                  “{p.quote}”
                </blockquote>
                {character === "kael" && (
                  <nav
                    className="team-links"
                    aria-label="Muhammad Soban’s profiles"
                    data-reveal
                  >
                    <a
                      className="text-link"
                      href="https://muhammadsoban.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {c.portfolio}
                      <ArrowUpRight size={18} />
                    </a>
                    <a
                      className="text-link"
                      href="https://github.com/SobanHaroon"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={17} />
                      GitHub
                      <ArrowUpRight size={18} />
                    </a>
                  </nav>
                )}
                <TeamFilm character={character} />
              </div>
            </section>
          );
        })}
      </div>
      <section className="team-close container">
        <div className="team-close-art">
          <img
            src="/media/characters/kael-story.webp"
            alt="Kael Astra in his studio, ready to build"
            width="640"
            height="640"
            loading="lazy"
          />
        </div>
        <div className="team-close-copy">
          <h2 data-reveal>{c.contactTitle}</h2>
          <p data-reveal>{c.contactText}</p>
          <a
            href="/#contact"
            className="button button-accent"
            onClick={(e) => go(e, "/#contact")}
          >
            {c.contact}
            <ArrowUpRight size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}
