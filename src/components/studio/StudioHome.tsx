import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Asterisk,
  Check,
  Pause,
  Play,
  Plus,
} from "lucide-react";
import { m } from "motion/react";
import { useMotionPreference } from "../../lib/useMotionPreference";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../context/LanguageContext";
import { STUDIO_COPY } from "../../data/studioCopy";
import { REDESIGN_COPY } from "../../data/redesignCopy";
import { CASE_STUDIES } from "../../data/caseStudiesData";
import ProjectContact from "./ProjectContact";
import WorkCard from "./WorkCard";
import type { ContractBasis } from "../../lib/projectBrief";
import StudioTeam from "./StudioTeam";
import {
  BrandOrbit,
  Foreground,
  ScenePicture,
  useScenicMotion,
} from "./ScenicWorld";
gsap.registerPlugin(ScrollTrigger);
export default function StudioHome({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  const { language } = useLanguage(),
    c = REDESIGN_COPY[language],
    old = STUDIO_COPY[language];
  const reduced = useMotionPreference(),
    root = useRef<HTMLDivElement>(null),
    video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false),
    [selected, setSelected] = useState<string[]>([]),
    [basis, setBasis] = useState<ContractBasis>("project"),
    [playing, setPlaying] = useState(false);
  const off = !!reduced || paused;
  useScenicMotion(root, off, language);
  useEffect(() => {
    if (off) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) =>
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          },
        ),
      );
    }, root);
    return () => ctx.revert();
  }, [off, language]);
  useEffect(() => {
    if (off) {
      video.current?.pause();
      setPlaying(false);
    }
  }, [off]);
  const featured = ["atelier-noir", "babey-dee-atta-chakki", "outsource-one"]
    .map((id) => CASE_STUDIES.find((p) => p.id === id)!)
    .filter(Boolean);
  const chooseContract = (value: string) => {
    setBasis(value as ContractBasis);
    setSelected((items) =>
      items.includes("white-label-partnership")
        ? items
        : [...items, "white-label-partnership"],
    );
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: off ? "instant" : "smooth" });
  };
  return (
    <div
      ref={root}
      className={"studio-home cinematic-home " + (off ? "motion-paused" : "")}
      data-language={language}
    >
      <section
        id="hero"
        className={`studio-hero city-journey scene ${off ? "is-rest" : "is-live"}`}
        data-scene="city-journey"
      >
        <div className="scene-stage">
          <div className="scene-art" aria-hidden="true">
            <ScenePicture scene="city" priority />
            <Foreground />
          </div>
          <div className="hero-main container">
            <div className="hero-copy">
              <m.h1
                initial={{
                  opacity: 0,
                  transform: reduced ? "none" : "translateY(12px)",
                }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.5 }}
              >
                {c.hero.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </m.h1>
              <div className="hero-summary">
                <p>{c.intro}</p>
                <div className="hero-actions">
                  <a href="#contact" className="button button-accent">
                    {c.start}
                    <ArrowUpRight size={20} />
                  </a>
                  <a href="#case-studies" className="text-link">
                    {c.work}
                    <ArrowDown size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="journey-caption container" aria-hidden="true">
            <p>{c.caption}</p>
            <BrandOrbit />
          </div>
          <div className="hero-bottom container">
            <span>{c.note}</span>
            <button
              className="motion-control"
              aria-pressed={off}
              disabled={!!reduced}
              onClick={() => setPaused((v) => !v)}
            >
              {off ? <Play size={15} /> : <Pause size={15} />}{" "}
              {reduced ? old.noMotion : paused ? old.resume : old.motion}
            </button>
          </div>
        </div>
      </section>
      <div className="capability-strip" aria-hidden="true">
        {c.capabilities.map((item) => (
          <span key={item}>
            {item}
            <Asterisk className="small-cross" size={24} />
          </span>
        ))}
      </div>
      <section id="services" className="services-section section-space inverse">
        <div className="container services-stage-layout">
          <div className="service-world scenic-frame">
            <ScenePicture scene="studio" />
            <div className="service-world-copy">
              <h2 data-reveal>{c.servicesTitle}</h2>
              <p data-reveal>{c.servicesIntro}</p>
            </div>
          </div>
          <div className="services-layout">
            <div className="services-grid">
              {c.serviceGroups.map((service) => {
                const active = service.ids.every((id) => selected.includes(id));
                return (
                  <article
                    className="service-card"
                    key={service.title}
                    data-reveal
                  >
                    <span
                      className="service-kanji"
                      aria-hidden="true"
                      lang="ja"
                    >
                      {service.mark}
                    </span>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <ul>
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <button
                      className="text-link"
                      aria-pressed={active}
                      onClick={() =>
                        setSelected((items) =>
                          active
                            ? items.filter((id) => !service.ids.includes(id))
                            : [...new Set([...items, ...service.ids])],
                        )
                      }
                    >
                      {active ? c.added : c.add}
                      {active ? <Check size={18} /> : <Plus size={18} />}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section id="case-studies" className="work-section gallery-section">
        <div
          className={`gallery-journey scene ${off ? "is-rest" : "is-live"}`}
          data-scene="project-gallery"
        >
          <div className="scene-stage">
            <div className="scene-art" aria-hidden="true">
              <ScenePicture scene="gallery" />
            </div>
            <div className="gallery-content container">
              <div className="section-heading">
                <div>
                  <h2 data-reveal>{c.workTitle}</h2>
                  <p data-reveal>{c.workIntro}</p>
                </div>
                <a
                  className="text-link"
                  href="/case-studies"
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey) {
                      e.preventDefault();
                      onNavigate("/case-studies");
                    }
                  }}
                >
                  {c.allWork}
                  <ArrowUpRight size={20} />
                </a>
              </div>
              <a
                className="gallery-window"
                href="/case-studies/atelier-noir"
                aria-label={`${c.gallery}: Atelier Noir`}
                onClick={(e) => {
                  if (
                    !e.metaKey &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    e.button === 0
                  ) {
                    e.preventDefault();
                    onNavigate("/case-studies/atelier-noir");
                  }
                }}
              >
                <img
                  src={featured[0].featuredImage}
                  alt="Atelier Noir fashion website"
                  width="1200"
                  height="750"
                  loading="lazy"
                />
                <span>
                  Atelier Noir <ArrowUpRight size={22} />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="project-grid-wrap container">
          <div className="work-grid">
            {featured.map((project) => (
              <WorkCard
                key={project.id}
                project={project}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>
      <section id="partnerships" className="partner-section section-space">
        <div className="partner-landscape scenic-frame">
          <ScenePicture scene="harbor" />
          <div className="container partner-landscape-copy">
            <h2 data-reveal>{c.partnerTitle}</h2>
            <p data-reveal>{c.partnerIntro}</p>
          </div>
        </div>
        <div className="container">
          <div className="contract-grid">
            {c.plans.map((plan) => (
              <article className="contract-card" key={plan.basis} data-reveal>
                <h3>{plan.name}</h3>
                <p>{plan.text}</p>
                <div className="contract-price">{c.price}</div>
                <button
                  className="text-link"
                  onClick={() => chooseContract(plan.basis)}
                >
                  {c.choose}
                  <ArrowUpRight size={20} />
                </button>
              </article>
            ))}
          </div>
          <p className="contract-note">{c.priceNote}</p>
        </div>
      </section>
      <StudioTeam onNavigate={onNavigate} paused={off} />
      <section id="about" className="about-section container section-space">
        <div className="about-copy">
          <h2 data-reveal>{c.aboutTitle}</h2>
          <p data-reveal>{c.aboutText}</p>
          <ol className="process-list">
            {c.process.map((step) => (
              <li key={step} data-reveal>
                <span>{step}</span>
                <ArrowUpRight size={18} />
              </li>
            ))}
          </ol>
        </div>
        <div className="studio-film" data-reveal>
          <video
            ref={video}
            src="/media/studio-process.mp4"
            poster="/media/studio-poster.jpg"
            muted
            loop
            playsInline
            preload="none"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          <div className="film-caption">
            <span>{old.videoLabel}</span>
            <button
              className="icon-button"
              aria-label={playing ? old.pauseVideo : old.play}
              onClick={async () => {
                if (!video.current) return;
                if (playing) video.current.pause();
                else
                  try {
                    await video.current.play();
                  } catch {
                    setPlaying(false);
                  }
              }}
            >
              {playing ? <Pause size={22} /> : <Play size={22} />}
            </button>
          </div>
        </div>
      </section>
      <section id="faq" className="faq-section container section-space">
        <h2 data-reveal>{c.faqTitle}</h2>
        <div className="faq-list">
          {c.faq.map(([q, a]) => (
            <details key={q} data-reveal>
              <summary>
                {q}
                <Plus size={20} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <ProjectContact
        selected={selected}
        setSelected={setSelected}
        basis={basis}
        setBasis={setBasis}
      />
    </div>
  );
}
