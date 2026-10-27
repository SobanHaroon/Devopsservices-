import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "../../data/caseStudiesData";
import { useLanguage } from "../../context/LanguageContext";
import { REDESIGN_COPY } from "../../data/redesignCopy";
export default function WorkCard({
  project,
  onNavigate,
}: {
  project: CaseStudy;
  onNavigate: (path: string) => void;
}) {
  const { language } = useLanguage();
  const c = REDESIGN_COPY[language];
  const href = "/case-studies/" + project.slug;
  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      onNavigate(href);
    }
  };
  return (
    <article className="work-card" data-reveal>
      <a
        className={"work-image work-" + project.id}
        href={href}
        onClick={go}
        aria-label={c.viewCase + ": " + project.title}
      >
        <img
          src={project.featuredImage}
          alt={
            project.id === "msoban-portfolio"
              ? "Illustrative programming workspace"
              : project.title + " website"
          }
          width="1200"
          height="750"
          loading="lazy"
        />
        <span className="work-open" aria-hidden="true">
          <ArrowUpRight size={24} />
        </span>
      </a>
      <div className="work-info">
        <h3>
          <a href={href} onClick={go}>
            {project.title}
          </a>
        </h3>
        <span>
          {project.category
            .replace(" Development", "")
            .replace(" / Developer Website", "")
            .replace("Personal Portfolio", "Portfolio")}
        </span>
        <p>{project.shortDescription}</p>
        <a className="text-link" href={href} onClick={go}>
          {c.viewCase}
          <ArrowUpRight size={18} />
        </a>
      </div>
    </article>
  );
}
