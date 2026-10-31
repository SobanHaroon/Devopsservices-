import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CASE_STUDIES, getCaseStudyBySlug } from "../data/caseStudiesData";
import { updateCaseStudyMetaTags } from "../lib/seo";
import { useLanguage } from "../context/LanguageContext";
import { REDESIGN_COPY } from "../data/redesignCopy";
import WorkCard from "./studio/WorkCard";
import MarketingShowcase from "./studio/MarketingShowcase";
import { useMotionPreference } from "../lib/useMotionPreference";
interface Props {
  slug: string;
  onBackToCaseStudies: () => void;
  onBackToHome: () => void;
  onContactClick: () => void;
  onSelectCaseStudy?: (slug: string) => void;
}
export default function CaseStudyDetail({
  slug,
  onBackToCaseStudies,
  onContactClick,
  onSelectCaseStudy,
}: Props) {
  const project = getCaseStudyBySlug(slug),
    { language } = useLanguage(),
    c = REDESIGN_COPY[language],
    reduced = useMotionPreference();
  useEffect(() => {
    if (project)
      updateCaseStudyMetaTags(
        project.seo.title,
        project.seo.metaDescription,
        project.seo.ogTitle,
        project.seo.ogDescription,
        "/case-studies/" + project.slug,
        {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.shortDescription,
          url: location.origin + "/case-studies/" + project.slug,
          creator: { "@type": "Organization", name: "DevOps Services" },
        },
      );
    else
      updateCaseStudyMetaTags(
        "Project not found | DevOps Services",
        "Explore our website case studies.",
        undefined,
        undefined,
        "/case-studies",
      );
  }, [project]);
  const back = (
    <a
      className="text-link back-link"
      href="/case-studies"
      onClick={(e) => {
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          onBackToCaseStudies();
        }
      }}
    >
      <ArrowLeft size={18} />
      {c.backWork}
    </a>
  );
  if (!project)
    return (
      <div className="route-loading">
        <h1>{c.notFound}</h1>
        <p>{c.notFoundText}</p>
        {back}
      </div>
    );
  return (
    <article className="case-detail container section-space">
      {back}
      <header className="case-page-heading">
        <h1>{project.title}</h1>
        <p>{project.shortDescription}</p>
        <a
          className="button button-accent"
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {c.live}
          <ArrowUpRight size={19} />
        </a>
      </header>
      <nav className="case-index" aria-label="Case study sections">
        <a href="#brief">01 / The brief</a>
        <a href="#approach">02 / Our approach</a>
        <a href="#gallery">03 / A closer look</a>
        <a href="#delivery">04 / What we delivered</a>
      </nav>
      <img
        className="case-hero-image"
        src={project.featuredImage}
        alt={
          project.id === "msoban-portfolio"
            ? "Illustrative programming workspace"
            : project.title + " homepage"
        }
        width="1440"
        height="900"
        fetchPriority="high"
      />
      <div className="case-meta">
        <div>
          <span>Client</span>
          <p>{project.client}</p>
        </div>
        <div>
          <span>Focus</span>
          <p>{project.category}</p>
        </div>
        <div>
          <span>Technology</span>
          <p>{project.technologies.join(" · ")}</p>
        </div>
      </div>
      <section id="brief" className="case-story">
        <h2>{c.overview}</h2>
        <div>
          <p>{project.overview.whatItIs}</p>
          <p>{project.overview.ourContribution}</p>
          <p>{project.overview.businessPurpose}</p>
        </div>
      </section>
      <section className="case-story">
        <h2>{c.challenge}</h2>
        <p>{project.challenge}</p>
      </section>
      <section id="approach" className="case-story">
        <h2>{c.solution}</h2>
        <p>{project.solution}</p>
      </section>
      <section className="case-features">
        <h2>{c.features}</h2>
        <div>
          {project.keyFeatures.map((feature) => (
            <article key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="case-features">
        <h2>Design decisions</h2>
        <div className="case-design-grid">
          {Object.entries(project.designApproach).map(([key, text]) => (
            <article key={key}>
              <h3>
                {
                  (
                    {
                      responsive: "Across every screen",
                      userExperience: "A clear next step",
                      visualHierarchy: "A considered hierarchy",
                      navigation: "Easy to explore",
                      animations: "Motion with purpose",
                    } as Record<string, string>
                  )[key]
                }
              </h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="gallery" className="case-gallery">
        <h2>{c.gallery}</h2>
        <div>
          {project.galleryImages.map((image, i) => (
            <figure key={image.url + "-" + i}>
              <a
                href={image.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={"Open image: " + image.caption}
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  loading="lazy"
                  width="1200"
                  height="750"
                />
              </a>
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section id="delivery" className="case-story">
        <h2>{c.results}</h2>
        <ul className="delivery-list">
          {project.results.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      </section>
      {project.id === "babey-dee-atta-chakki" && (
        <MarketingShowcase compact onNavigate={() => {}} />
      )}
      <section className="related-work">
        <h2>{c.next}</h2>
        <div className="work-grid related-grid">
          {CASE_STUDIES.filter((p) => p.slug !== slug)
            .slice(0, 2)
            .map((p) => (
              <WorkCard
                key={p.id}
                project={p}
                onNavigate={(path) =>
                  onSelectCaseStudy?.(path.replace("/case-studies/", ""))
                }
              />
            ))}
        </div>
      </section>
      <div className="case-cta">
        <h2>{c.contactTitle}</h2>
        <button className="button button-accent" onClick={onContactClick}>
          {c.start}
          <ArrowUpRight size={20} />
        </button>
      </div>
    </article>
  );
}
