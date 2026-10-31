import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { EDITORIAL_COPY } from "../../data/editorialCopy";
import { CAMPAIGN_FILMS, type CampaignFilm } from "../../data/marketing";
import { Eyebrow, Heading, Words } from "./EditorialMotion";
import LoopingVideo from "./LoopingVideo";
export function Film({ film }: { film: CampaignFilm }) {
  const [error, setError] = useState(false);
  return (
    <article className="marketing-film" data-enter="plate">
      <div className="reel-screen" style={{ aspectRatio: film.ratio }}>
        <LoopingVideo
          src={"/media/marketing/" + film.id + ".mp4"}
          poster={"/media/marketing/" + film.id + "-poster.webp"}
          aria-label={film.brand + ": " + film.title}
          onPlaying={() => setError(false)}
          onError={() => setError(true)}
        />
      </div>
      <div className="reel-caption">
        <span>
          {film.format} · {film.duration}s
        </span>
        <h3>{film.title}</h3>
        <p>{film.brand}</p>
      </div>
      {error && (
        <p role="status">
          <a href={"/media/marketing/" + film.id + ".mp4"}>
            Open video file <ArrowUpRight size={14} />
          </a>
        </p>
      )}
    </article>
  );
}
export function CampaignAssets() {
  const { language } = useLanguage(),
    c = EDITORIAL_COPY[language];
  return (
    <div className="campaign-artworks">
      {[
        [
          "launch-artwork",
          c.artwork,
          "Babay Dee website launch campaign: From our chakki, to your home",
        ],
        [
          "storyboard",
          c.storyboard,
          "Babay Dee family advertisement storyboard with four scenes",
        ],
      ].map(([id, label, alt]) => (
        <figure key={id} data-enter="plate">
          <a
            href={"/media/marketing/" + id + ".webp"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={"/media/marketing/" + id + ".webp"}
              alt={alt}
              width="1600"
              height={id === "storyboard" ? "1067" : "900"}
              loading="lazy"
            />
          </a>
          <figcaption>{label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
export default function MarketingShowcase({
  onNavigate,
  compact = false,
}: {
  onNavigate: (to: string) => void;
  compact?: boolean;
}) {
  const { language } = useLanguage(),
    c = EDITORIAL_COPY[language];
  return (
    <section
      id="digital-marketing"
      className={
        "ed-marketing ed-section " + (compact ? "marketing-compact" : "")
      }
    >
      <div className="ed-container">
        <div className="ed-section-intro">
          <div>
            <Eyebrow>{c.marketing}</Eyebrow>
            <Heading text={c.marketingTitle} />
          </div>
          <Words
            text={compact ? c.marketingIntro : c.marketingPageIntro}
            className="ed-lead"
          />
        </div>
        <div className="reel-grid">
          {(compact
            ? CAMPAIGN_FILMS.filter((f) =>
                ["launch", "farm", "family"].includes(f.id),
              )
            : CAMPAIGN_FILMS.slice(0, 3)
          ).map((film) => (
            <Film key={film.id} film={film} />
          ))}
        </div>
        <CampaignAssets />
        {!compact && (
          <a
            className="ed-link"
            href="/digital-marketing"
            onClick={(ev) => {
              if (ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
              ev.preventDefault();
              onNavigate("/digital-marketing");
            }}
          >
            {c.allCampaigns}
            <ArrowUpRight size={18} />
          </a>
        )}
      </div>
    </section>
  );
}
