import { useState } from "react";
import { CASE_STUDIES } from "../../data/caseStudiesData";
import { CAMPAIGNS } from "../../data/marketing";
import {
  Button,
  Eyebrow,
  Heading,
  Link,
  LoopVideo,
  Words,
  type Navigate,
} from "../editorial/Primitives";
import Storm from "../editorial/Storm";
import ProjectContact from "./ProjectContact";
import type { ContractBasis } from "../../lib/projectBrief";
const services = [
  [
    "01",
    "Websites & commerce",
    "A clear path from first impression to checkout. Custom websites, online stores and interfaces that make your business easier to use.",
    "Design · Development · E-commerce",
  ],
  [
    "02",
    "Digital marketing",
    "Give people a reason to notice. Reels, product stories, launch campaigns and social assets with a recognisable point of view.",
    "Reels · Campaigns · Brand content",
  ],
  [
    "03",
    "Ongoing development",
    "Keep moving after launch. Website care, SEO, integrations and white-label development for agencies that need a dependable partner.",
    "Management · SEO · Agency partnerships",
  ],
];
const steps = [
  [
    "01",
    "Understand",
    "We start with your business, your audience and the problem worth solving. Together, we agree on a clear scope and direction.",
  ],
  [
    "02",
    "Shape",
    "Structure, visual direction and early prototypes make the idea tangible. You see how it works before the full build begins.",
  ],
  [
    "03",
    "Make",
    "Design becomes a working website or a finished campaign. We build, refine and check the details across screens.",
  ],
  [
    "04",
    "Launch & grow",
    "We publish the work, hand it over clearly and agree on the support, content or improvements that come next.",
  ],
];
const faqs = [
  [
    "What can we build together?",
    "Websites, online stores, campaign landing pages, launch films and social content. You can start with one deliverable or connect the website and marketing work in one scope.",
  ],
  [
    "Can you work with my agency?",
    "Yes. White-label partnerships can be project based, weekly or monthly. We agree on deliverables, communication and pricing before work starts.",
  ],
  [
    "Do you work internationally?",
    "Yes. DevOps Services is based in Rawalpindi, Pakistan and works remotely with businesses and agencies worldwide.",
  ],
  [
    "What happens after launch?",
    "Ongoing website management, content production, SEO and development can be arranged separately. Your handover includes the information you need to run the finished work.",
  ],
];
export default function StudioHome({ onNavigate }: { onNavigate: Navigate }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [basis, setBasis] = useState<ContractBasis>("project");
  const projects = [
    "babey-dee-atta-chakki",
    "atelier-noir",
    "outsource-one",
    "msoban-portfolio",
    "devops-services",
  ].map((id) => CASE_STUDIES.find((p) => p.id === id)!);
  return (
    <>
      <section className="hero container" id="top">
        <div className="hero-copy">
          <Eyebrow>Web design & creative development</Eyebrow>
          <h1>
            <span className="line">
              <span>Distinct by</span>
            </span>
            <span className="line">
              <span>
                <em>design.</em>
              </span>
            </span>
          </h1>
          <Words
            className="hero-lead"
            text="Websites, motion and digital marketing for brands ready to be seen."
            delay={500}
          />
          <div className="hero-actions">
            <Button to="/case-studies" onNavigate={onNavigate}>
              Explore our work
            </Button>
            <Link to="/#contact" onNavigate={onNavigate} className="text-link">
              Start a project <span>↗</span>
            </Link>
          </div>
          <dl className="hero-facts">
            <div>
              <dt>The studio</dt>
              <dd>Independent & hands-on</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>Pakistan · Worldwide</dd>
            </div>
            <div>
              <dt>The approach</dt>
              <dd>Ideas into experiences</dd>
            </div>
          </dl>
        </div>
        <div className="hero-art">
          <Storm />
        </div>
        <div className="hero-bottom">
          <span>Design that feels different. Development that works.</span>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/#work");
            }}
          >
            Scroll to discover ↓
          </a>
        </div>
      </section>
      <section className="statement section-space">
        <div className="container statement-grid">
          <Eyebrow>The way we see it</Eyebrow>
          <div>
            <p data-reveal>
              Your brand deserves more than a place on the internet. It deserves
              a world people want to <em>step into.</em>
            </p>
            <span className="signature">— DevOps Services</span>
          </div>
        </div>
      </section>
      <section className="selected-work section-space container" id="work">
        <div className="section-top">
          <Heading label="Selected work">
            Made with
            <br />
            <em>intent.</em>
          </Heading>
          <p>
            From everyday essentials to expressive fashion. A selection of
            websites with a purpose of their own.
          </p>
        </div>
        <div className="editorial-work-grid">
          {projects.map((p, i) => (
            <article
              className={"project-plate project-" + p.id}
              key={p.id}
              data-reveal
            >
              <Link
                to={"/case-studies/" + p.slug}
                onNavigate={onNavigate}
                className="project-image"
                aria-label={"View " + p.title + " case study"}
              >
                <div data-parallax>
                  <img
                    src={p.featuredImage}
                    alt={
                      p.id === "msoban-portfolio"
                        ? "Muhammad Soban portfolio workspace illustration"
                        : p.title + " website"
                    }
                    loading="lazy"
                    width="1200"
                    height="800"
                  />
                </div>
                <span className="project-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
              <div className="project-caption">
                <div>
                  <span className="project-index">
                    0{i + 1} /{" "}
                    {p.category
                      .replace(" Development", "")
                      .replace(" / Developer Website", "")}
                  </span>
                  <h3>
                    <Link
                      to={"/case-studies/" + p.slug}
                      onNavigate={onNavigate}
                    >
                      {p.title}
                    </Link>
                  </h3>
                </div>
                <span>2026</span>
              </div>
              <p className="project-description">{p.shortDescription}</p>
            </article>
          ))}
        </div>
        <div className="end-link">
          <Button to="/case-studies" onNavigate={onNavigate} ghost>
            All case studies
          </Button>
        </div>
      </section>
      <section className="desert-section">
        <LoopVideo
          src="/media/desert/purple-desert.mp4"
          poster="/media/desert/purple-desert.webp"
          label="Purple desert, a continuous moving landscape"
        />
        <div className="desert-scrim" />
        <div className="container desert-copy">
          <Eyebrow>A different perspective</Eyebrow>
          <h2 data-reveal>
            A little less
            <br />
            <em>ordinary.</em>
          </h2>
          <p>
            A distinctive idea is only the beginning.
            <br />
            We turn it into something people can experience.
          </p>
          <Button to="/#contact" onNavigate={onNavigate}>
            Bring us your idea
          </Button>
        </div>
        <div className="desert-caption">
          <span>IMAGINATION → REALITY</span>
          <span>DevOps Services / Creative development</span>
        </div>
      </section>
      <section className="services-section section-space" id="services">
        <div className="container">
          <Heading label="What we do">
            From idea
            <br />
            <em>to launch.</em>
          </Heading>
          <div className="service-list">
            {services.map(([number, title, body, tags]) => (
              <article key={title} data-reveal>
                <span className="service-number">{number}</span>
                <h3>{title}</h3>
                <div>
                  <p>{body}</p>
                  <span className="service-tags">{tags}</span>
                </div>
                {number === "02" ? (
                  <Link
                    to="/digital-marketing"
                    onNavigate={onNavigate}
                    className="service-arrow"
                    aria-label="Explore digital marketing"
                  >
                    ↗
                  </Link>
                ) : (
                  <Link
                    to="/#contact"
                    onNavigate={onNavigate}
                    className="service-arrow"
                    aria-label={"Enquire about " + title}
                  >
                    ↗
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="growth-preview section-space">
        <div className="container">
          <div className="section-top">
            <Heading label="Beyond the website">
              A brand that
              <br />
              <em>keeps moving.</em>
            </Heading>
            <div>
              <p>
                Product stories, launch films and content made to carry your
                brand into the feed.
              </p>
              <Link
                to="/digital-marketing"
                onNavigate={onNavigate}
                className="text-link"
              >
                Explore digital marketing ↗
              </Link>
            </div>
          </div>
          <div className="preview-reels">
            {[
              CAMPAIGNS[0].reels[1],
              CAMPAIGNS[1].reels[1],
              CAMPAIGNS[2].reels[0],
            ].map((reel, i) => (
              <figure key={reel.slug} data-reveal>
                <LoopVideo
                  src={"/media/reels/" + reel.slug + ".mp4"}
                  poster={"/media/reels/" + reel.slug + ".webp"}
                  label={reel.title}
                />
                <figcaption>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{CAMPAIGNS[i].name}</h3>
                    <p>{reel.format}</p>
                  </div>
                  <Link
                    to={"/digital-marketing#" + CAMPAIGNS[i].id}
                    onNavigate={onNavigate}
                    aria-label={"Explore " + CAMPAIGNS[i].name + " campaign"}
                  >
                    ↗
                  </Link>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="about-section section-space container" id="about">
        <div className="about-grid">
          <Heading label="The studio">
            Independent.
            <br />
            <em>By design.</em>
          </Heading>
          <div>
            <p>
              DevOps Services is the independent practice of Muhammad Soban, a
              developer and designer based in Rawalpindi, Pakistan.
            </p>
            <p>
              I work directly with businesses and agencies on websites, digital
              experiences and brand content. From the first conversation to the
              final handover, you work with the person making it.
            </p>
            <p>
              The aim is straightforward: make the business clear, make the
              experience memorable, and make the details work.
            </p>
            <span className="signature">— Muhammad Soban</span>
          </div>
        </div>
        <dl className="studio-facts">
          <div>
            <dt>Based in</dt>
            <dd>Rawalpindi, Pakistan</dd>
          </div>
          <div>
            <dt>Working with</dt>
            <dd>Businesses & agencies</dd>
          </div>
          <div>
            <dt>Practice</dt>
            <dd>Web, motion & marketing</dd>
          </div>
          <div>
            <dt>Reach</dt>
            <dd>Worldwide</dd>
          </div>
        </dl>
      </section>
      <section className="process-section section-space" id="process">
        <div className="container process-grid">
          <div className="sticky-heading">
            <Heading label="How we work">
              A clear
              <br />
              <em>process.</em>
            </Heading>
          </div>
          <ol>
            {steps.map(([number, title, body]) => (
              <li key={number} data-reveal>
                <span className="step-number">{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="faq-section section-space container">
        <Heading label="A few answers">
          Before we
          <br />
          <em>begin.</em>
        </Heading>
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <details key={q}>
              <summary>
                <h3>{q}</h3>
                <span aria-hidden="true">+</span>
              </summary>
              <div className="faq-answer" id={"answer-" + i}>
                <p>{a}</p>
              </div>
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
    </>
  );
}
