import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CASE_STUDIES } from "../data/caseStudiesData";
import { useLanguage } from "../context/LanguageContext";
import { REDESIGN_COPY } from "../data/redesignCopy";
import { updateCaseStudyMetaTags } from "../lib/seo";
import WorkCard from "./studio/WorkCard";
export default function CaseStudiesList({
  onSelectCaseStudy,
  onBackToHome,
  onContactClick,
}: {
  onSelectCaseStudy: (slug: string) => void;
  onBackToHome: () => void;
  onContactClick: () => void;
}) {
  const [filter, setFilter] = useState("all");
  const { language } = useLanguage(),
    c = REDESIGN_COPY[language];
  useEffect(() => {
    updateCaseStudyMetaTags(
      "Case Studies | DevOps Services",
      "Websites and digital experiences designed and built by DevOps Services.",
      undefined,
      undefined,
      "/case-studies",
    );
  }, []);
  const projects = CASE_STUDIES.filter(
    (p) =>
      filter === "all" ||
      (filter === "commerce"
        ? p.category.includes("Commerce")
        : filter === "personal"
          ? p.id === "msoban-portfolio"
          : !p.category.includes("Commerce") && p.id !== "msoban-portfolio"),
  );
  return (
    <div className="case-list container section-space">
      <a
        className="text-link back-link"
        href="/"
        onClick={(e) => {
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            onBackToHome();
          }
        }}
      >
        <ArrowLeft size={18} />
        {c.home}
      </a>
      <header className="case-page-heading">
        <h1>{c.caseTitle}</h1>
        <p>{c.caseIntro}</p>
      </header>
      <div className="case-filters" aria-label="Project categories">
        {[
          ["all", c.all],
          ["commerce", c.commerce],
          ["business", c.business],
          ["personal", c.personal],
        ].map(([value, label]) => (
          <button
            key={value}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {projects.length} projects
      </p>
      <div className="work-grid case-grid">
        {projects.map((project) => (
          <WorkCard
            key={project.id}
            project={project}
            onNavigate={(path) =>
              onSelectCaseStudy(path.replace("/case-studies/", ""))
            }
          />
        ))}
      </div>
      <div className="case-cta">
        <h2>{c.contactTitle}</h2>
        <button className="button button-accent" onClick={onContactClick}>
          {c.start}
          <ArrowUpRight size={20} />
        </button>
      </div>
    </div>
  );
}
