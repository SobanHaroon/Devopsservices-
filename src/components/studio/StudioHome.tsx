import { useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Plus } from "lucide-react";
import { useMotionPreference } from "../../lib/useMotionPreference";
import { useLanguage } from "../../context/LanguageContext";
import { REDESIGN_COPY } from "../../data/redesignCopy";
import { EDITORIAL_COPY } from "../../data/editorialCopy";
import { CASE_STUDIES } from "../../data/caseStudiesData";
import ProjectContact from "./ProjectContact";
import WorkCard from "./WorkCard";
import type { ContractBasis } from "../../lib/projectBrief";
import { Eyebrow, Heading, Words, useEditorialMotion } from "./EditorialMotion";
import DesertScene from "./DesertScene";
import StormScene from "./StormScene";
import MarketingShowcase from "./MarketingShowcase";
import EditorialFaq from "./EditorialFaq";
export default function StudioHome({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  const { language } = useLanguage(),
    c = REDESIGN_COPY[language],
    e = EDITORIAL_COPY[language],
    reduced = useMotionPreference(),
    root = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string[]>([]),
    [basis, setBasis] = useState<ContractBasis>("project");
  useEditorialMotion(root, reduced, language);
  const featured = ["atelier-noir", "babey-dee-atta-chakki", "outsource-one"]
    .map((id) => CASE_STUDIES.find((p) => p.id === id)!)
    .filter(Boolean);
  const go = (event: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0)
      return;
    event.preventDefault();
    onNavigate(to);
  };
  const chooseContract = (value: string) => {
    setBasis(value as ContractBasis);
    setSelected((items) =>
      items.includes("white-label-partnership")
        ? items
        : [...items, "white-label-partnership"],
    );
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  };
  return (
    <div ref={root} className="editorial-home" data-language={language}>
      <section id="hero" className="ed-hero ed-container">
        <div className="ed-hero-grid">
          <div className="ed-hero-copy">
            <Eyebrow>{e.studio}</Eyebrow>
            <Heading hero text={c.hero.join(" ")} />
            <Words text={c.intro} className="ed-lead" delay={500} />
            <div
              className="ed-actions"
              data-enter="up"
              style={{ transitionDelay: "800ms" }}
            >
              <a className="ed-button" href="#case-studies">
                {c.work}
                <ArrowUpRight size={20} />
              </a>
              <a className="ed-link" href="#contact">
                {c.start}
                <ArrowUpRight size={18} />
              </a>
            </div>
            <dl className="ed-facts" data-enter="fade">
              <div>
                <dt>{e.based}</dt>
                <dd>{e.location}</dd>
              </div>
              <div>
                <dt>{e.working}</dt>
                <dd>{e.world}</dd>
              </div>
              <div>
                <dt>{e.focus}</dt>
                <dd>{e.mediums}</dd>
              </div>
            </dl>
          </div>
          <DesertScene caption={e.desert} />
        </div>
        <div className="ed-hero-bottom">
          <a href="#practice">
            {e.scroll}
            <ArrowDown size={16} />
          </a>
        </div>
      </section>
      <section id="practice" className="ed-statement ed-section">
        <div className="ed-container">
          <Eyebrow>{e.practice}</Eyebrow>
          <Words text={e.statement} />
          <p className="ed-signature" data-enter="fade">
            — Muhammad Soban
          </p>
        </div>
      </section>
      <section id="case-studies" className="ed-section editorial-works">
        <div className="ed-container">
          <div className="ed-section-intro">
            <div>
              <Eyebrow>{e.work}</Eyebrow>
              <Heading text={e.workTitle} />
            </div>
            <a
              className="ed-link"
              href="/case-studies"
              onClick={(ev) => go(ev, "/case-studies")}
            >
              {c.allWork}
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="editorial-work-grid">
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
      <StormScene
        eyebrow={e.storm}
        title={e.stormTitle}
        body={e.stormBody}
        action={c.start}
      />
      <section id="services" className="ed-section ed-services">
        <div className="ed-container">
          <div className="ed-section-intro">
            <div>
              <Eyebrow>{e.capabilities}</Eyebrow>
              <Heading text={c.servicesTitle} />
            </div>
            <Words text={c.servicesIntro} className="ed-lead" />
          </div>
          <div className="ed-service-grid">
            {c.serviceGroups.map((s, i) => {
              const active = s.ids.every((id) => selected.includes(id));
              return (
                <article key={s.title} data-enter="up">
                  <span className="ed-index">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ul>
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <button
                    className="ed-link"
                    aria-pressed={active}
                    onClick={() =>
                      setSelected((items) =>
                        active
                          ? items.filter((id) => !s.ids.includes(id))
                          : [...new Set([...items, ...s.ids])],
                      )
                    }
                  >
                    {active ? c.added : c.add}
                    {active ? <Check size={16} /> : <Plus size={16} />}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <MarketingShowcase onNavigate={onNavigate} />
      <section id="about" className="ed-section ed-about">
        <div className="ed-container ed-split">
          <div>
            <Eyebrow>{e.behind}</Eyebrow>
            <Heading text={c.aboutTitle} />
          </div>
          <div>
            <Words text={c.aboutText} className="ed-lead" />
            <p className="ed-signature">— Muhammad Soban, Founder</p>
            <dl className="ed-facts">
              <div>
                <dt>{e.based}</dt>
                <dd>{e.location}</dd>
              </div>
              <div>
                <dt>{e.focus}</dt>
                <dd>{e.mediums}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <section id="process" className="ed-section">
        <div className="ed-container ed-process">
          <div className="ed-sticky">
            <Eyebrow>{e.process}</Eyebrow>
            <Heading text={e.processTitle} />
          </div>
          <ol>
            {c.process.map((step, i) => (
              <li key={step} data-enter="up">
                <span>0{i + 1}</span>
                <div>
                  <h3>{step}</h3>
                  <p>{e.steps[i]}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section id="partnerships" className="ed-section ed-partnerships">
        <div className="ed-container">
          <div className="ed-section-intro">
            <div>
              <Eyebrow>{c.partnership}</Eyebrow>
              <Heading text={c.partnerTitle} />
            </div>
            <Words text={c.partnerIntro} className="ed-lead" />
          </div>
          <div className="contract-grid">
            {c.plans.map((plan) => (
              <article
                className="contract-card"
                key={plan.basis}
                data-enter="up"
              >
                <h3>{plan.name}</h3>
                <p>{plan.text}</p>
                <div className="contract-price">{c.price}</div>
                <button
                  className="ed-link"
                  onClick={() => chooseContract(plan.basis)}
                >
                  {c.choose}
                  <ArrowUpRight size={18} />
                </button>
              </article>
            ))}
          </div>
          <p className="contract-note">{c.priceNote}</p>
        </div>
      </section>
      <section className="ed-begin ed-section">
        <div className="ed-container">
          <Eyebrow>{e.contact}</Eyebrow>
          <Heading text={e.contactTitle} />
          <Words text={c.contactIntro} className="ed-lead" />
          <a className="ed-button ed-button-light" href="#contact">
            {c.start}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <section id="faq" className="ed-section">
        <div className="ed-container ed-faq-layout">
          <div>
            <Eyebrow>{e.questions}</Eyebrow>
            <Heading text={c.faqTitle} />
          </div>
          <EditorialFaq items={c.faq} />
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
