import { useEffect, useRef, useState } from "react";
import { Link, type Navigate } from "../editorial/Primitives";
const navigation = [
  ["Selected work", "/case-studies"],
  ["Digital marketing", "/digital-marketing"],
  ["The studio", "/#about"],
  ["Our process", "/#process"],
  ["Start a project", "/#contact"],
];
export default function StudioHeader({
  path,
  onNavigate,
}: {
  path: string;
  onNavigate: Navigate;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    window.dispatchEvent(new CustomEvent("studio:menu", { detail: open }));
    return () => {
      document.documentElement.style.overflow = "";
      window.dispatchEvent(new CustomEvent("studio:menu", { detail: false }));
    };
  }, [open]);
  const close = () => {
    dialog.current?.close();
    setOpen(false);
  };
  const go = (to: string) => {
    close();
    onNavigate(to);
  };
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="studio-header">
        <div className="header-inner">
          <div className="header-caption">
            <p>Independent digital studio</p>
            <span>Web · Motion · Growth</span>
          </div>
          <Link
            to="/"
            onNavigate={onNavigate}
            className="brand"
            aria-label="DevOps Services home"
          >
            <span className="brand-mark" aria-hidden="true" />
            <span>devops services</span>
          </Link>
          <div className="header-right">
            <nav aria-label="Primary">
              <Link
                to="/case-studies"
                onNavigate={onNavigate}
                aria-current={
                  path.startsWith("/case-studies") ? "page" : undefined
                }
              >
                Work
              </Link>
              <Link
                to="/digital-marketing"
                onNavigate={onNavigate}
                aria-current={
                  path === "/digital-marketing" ? "page" : undefined
                }
              >
                Growth
              </Link>
            </nav>
            <button
              className="menu-button"
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="studio-menu"
              onClick={() => {
                dialog.current?.showModal();
                setOpen(true);
              }}
            >
              <span>Menu</span>
              <i aria-hidden="true">
                <b />
                <b />
              </i>
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="studio-menu"
        className="menu-dialog"
        aria-label="Site navigation"
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <div className="menu-top">
          <span>Explore the studio</span>
          <button onClick={close} aria-label="Close menu">
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav aria-label="All pages">
          {navigation.map(([label, to], i) => (
            <Link
              key={to}
              to={to}
              onNavigate={go}
              style={{ "--delay": `${180 + i * 70}ms` }}
            >
              <span>0{i + 1}</span>
              <strong>{label}</strong>
              <em aria-hidden="true">↗</em>
            </Link>
          ))}
        </nav>
        <div className="menu-bottom">
          <div>
            <a href="mailto:devopsservicesltd@gmail.com">
              devopsservicesltd@gmail.com
            </a>
            <p>Rawalpindi, Pakistan · Working worldwide</p>
          </div>
          <a
            href="https://www.instagram.com/devopsservicesltd/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram ↗
          </a>
        </div>
      </dialog>
    </>
  );
}
