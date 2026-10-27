import { ArrowUpRight, ArrowUp } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { REDESIGN_COPY } from "../../data/redesignCopy";
import { STUDIO_COPY } from "../../data/studioCopy";
export default function StudioFooter({
  onNavigate,
}: {
  onNavigate: (to: string) => void;
}) {
  const { language } = useLanguage(),
    c = REDESIGN_COPY[language],
    t = STUDIO_COPY[language];
  return (
    <footer className="studio-footer">
      <div className="container">
        <div className="footer-top">
          <p>{c.footer}</p>
          <a href="mailto:devopsservicesltd@gmail.com">
            devopsservicesltd@gmail.com
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          devops<span>創</span>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DevOps Services</span>
          <span>{c.note}</span>
          <button
            className="text-link"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            {t.back}
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
