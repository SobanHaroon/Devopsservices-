import { ArrowUpRight, ArrowUp } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { REDESIGN_COPY } from "../../data/redesignCopy";
import { EDITORIAL_COPY } from "../../data/editorialCopy";
export default function StudioFooter({
  onNavigate,
}: {
  onNavigate: (to: string) => void;
}) {
  const { language } = useLanguage(),
    c = REDESIGN_COPY[language],
    e = EDITORIAL_COPY[language];
  const links = [
    ["/#case-studies", c.projects],
    ["/#services", c.services],
    ["/digital-marketing", e.marketing],
    ["/#partnerships", c.partnership],
    ["/#contact", c.start],
  ];
  const go = (ev: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return;
    ev.preventDefault();
    onNavigate(to);
  };
  return (
    <footer className="ed-footer">
      <div className="ed-container">
        <div className="ed-footer-top">
          <div>
            <a className="ed-wordmark" href="/" onClick={(ev) => go(ev, "/")}>
              devops <em>services</em>
            </a>
            <p>{e.footer}</p>
            <a className="ed-link" href="mailto:devopsservicesltd@gmail.com">
              devopsservicesltd@gmail.com
              <ArrowUpRight size={16} />
            </a>
          </div>
          <nav aria-label="Footer navigation">
            <span>{e.explore}</span>
            {links.map(([href, label]) => (
              <a key={href} href={href} onClick={(ev) => go(ev, href)}>
                {label}
              </a>
            ))}
          </nav>
          <div>
            <span className="ed-footer-label">{e.based}</span>
            <p className="ed-footer-location">
              {e.location}
              <br />
              {c.note}
            </p>
          </div>
        </div>
        <div className="ed-footer-wordmark" aria-hidden="true">
          DEVOPS
        </div>
        <div className="ed-footer-bottom">
          <span>© {new Date().getFullYear()} DevOps Services</span>
          <span>{e.discipline}</span>
          <button
            aria-label="Back to top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
