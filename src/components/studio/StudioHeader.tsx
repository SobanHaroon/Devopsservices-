import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLanguage, type LanguageType } from "../../context/LanguageContext";
import { REDESIGN_COPY } from "../../data/redesignCopy";
import { STUDIO_COPY } from "../../data/studioCopy";
export default function StudioHeader({
  onNavigate,
  path,
}: {
  onNavigate: (to: string) => void;
  path: string;
}) {
  const { language, setLanguage } = useLanguage(),
    c = REDESIGN_COPY[language],
    t = STUDIO_COPY[language];
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null),
    menu = useRef<HTMLElement>(null);
  const links = [
    ["/#case-studies", c.projects],
    ["/#services", c.services],
    ["/#partnerships", c.partnership],
    [
      "/team",
      language === "JP" ? "チーム" : language === "FR" ? "Équipe" : "Team",
    ],
  ];
  const go = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(false);
    onNavigate(url);
  };
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector("a")?.focus();
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes = [
          toggle.current,
          ...Array.from(
            menu.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const index = nodes.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && index <= 0) {
          e.preventDefault();
          nodes.at(-1)?.focus();
        } else if (!e.shiftKey && index === nodes.length - 1) {
          e.preventDefault();
          nodes[0]?.focus();
        }
      }
    };
    const resize = () => {
      if (window.innerWidth > 980) setOpen(false);
    };
    window.addEventListener("keydown", handle);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", handle);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <>
      <a href="#main-content" className="skip-link">
        {t.skip}
      </a>
      <header className="studio-header">
        <div className="header-inner container">
          <a
            className="wordmark"
            href="/"
            onClick={(e) => go(e, "/")}
            aria-label="DevOps Services — home"
          >
            <span className="brand-emblem" aria-hidden="true">
              <img
                src="/media/devops-logo.svg"
                alt=""
                width="154"
                height="84"
              />
            </span>
            <span className="brand-name">
              DevOps <small>Services</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([url, label]) => (
              <a
                href={url}
                key={url}
                onClick={(e) => go(e, url)}
                aria-current={path === url ? "page" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <label className="language-select">
              <span className="sr-only">{t.language}</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageType)}
                aria-label="Language"
              >
                <option value="EN">EN</option>
                <option value="JP">日本語</option>
                <option value="FR">FR</option>
                <option value="DE">DE</option>
              </select>
            </label>
            <a
              href="/#contact"
              onClick={(e) => go(e, "/#contact")}
              className="header-cta"
            >
              {c.start}
              <ArrowUpRight size={17} />
            </a>
            <button
              className="menu-button"
              ref={toggle}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.close : t.menu}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <nav
          id="mobile-navigation"
          ref={menu}
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {[...links, ["/#contact", c.start]].map(([url, label]) => (
            <a href={url} key={url} onClick={(e) => go(e, url)}>
              {label}
              <ArrowUpRight />
            </a>
          ))}
          <p>{c.note}</p>
        </nav>
      )}
    </>
  );
}
