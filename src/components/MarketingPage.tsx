import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { updateCaseStudyMetaTags } from "../lib/seo";
import { CAMPAIGN_FILMS } from "../data/marketing";
import { EDITORIAL_COPY } from "../data/editorialCopy";
import { REDESIGN_COPY } from "../data/redesignCopy";
import { Film, CampaignAssets } from "./studio/MarketingShowcase";
import { Eyebrow, Heading } from "./studio/EditorialMotion";
export default function MarketingPage({
  onNavigate,
}: {
  onNavigate: (to: string) => void;
}) {
  const { language } = useLanguage(),
    c = EDITORIAL_COPY[language],
    r = REDESIGN_COPY[language];
  const [filter, setFilter] = useState("all");
  const films = CAMPAIGN_FILMS.filter(
    (f) => filter === "all" || f.category === filter,
  );
  useEffect(
    () =>
      updateCaseStudyMetaTags(
        "Digital Marketing & Reels | DevOps Services",
        "Client campaign films, product motion, website launch reels, and brand assets by DevOps Services.",
        undefined,
        undefined,
        "/digital-marketing",
      ),
    [],
  );
  const go = (ev: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.button !== 0) return;
    ev.preventDefault();
    onNavigate(to);
  };
  return (
    <div className="marketing-page">
      <header className="ed-container marketing-page-intro">
        <a className="ed-link" href="/" onClick={(ev) => go(ev, "/")}>
          <ArrowLeft size={17} />
          {r.home}
        </a>
        <Eyebrow>{c.marketing}</Eyebrow>
        <Heading text={c.marketingPageTitle} hero />
        <p className="ed-lead">{c.marketingPageIntro}</p>
      </header>
      <section className="ed-marketing ed-section marketing-catalog">
        <div className="ed-container">
          <div
            className="marketing-filters"
            role="group"
            aria-label="Film categories"
          >
            {[
              ["all", c.allFilms],
              ["client", c.clientFilms],
              ["studio", c.studioFilms],
            ].map(([id, label]) => (
              <button
                key={id}
                aria-pressed={filter === id}
                onClick={() => setFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="marketing-count" role="status">
            {films.length} / {CAMPAIGN_FILMS.length}
          </p>
          <div className="reel-grid">
            {films.map((film) => (
              <Film key={film.id} film={film} />
            ))}
          </div>
        </div>
      </section>
      <section className="ed-section marketing-assets">
        <div className="ed-container">
          <Eyebrow>{c.artwork}</Eyebrow>
          <Heading text={c.assets} />
          <CampaignAssets />
          <a
            className="ed-link"
            href="/case-studies/babey-dee-atta-chakki"
            onClick={(ev) => go(ev, "/case-studies/babey-dee-atta-chakki")}
          >
            {c.fullCampaign}
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      <section className="ed-begin ed-section">
        <div className="ed-container">
          <Eyebrow>{c.contact}</Eyebrow>
          <Heading text={c.contactTitle} />
          <p className="ed-lead">{r.contactIntro}</p>
          <a
            className="ed-button ed-button-light"
            href="/#contact"
            onClick={(ev) => go(ev, "/#contact")}
          >
            {r.start}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
