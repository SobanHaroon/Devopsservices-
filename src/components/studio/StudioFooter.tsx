import { Link, type Navigate } from "../editorial/Primitives";
export default function StudioFooter({ onNavigate }: { onNavigate: Navigate }) {
  return (
    <footer className="studio-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link to="/" onNavigate={onNavigate} className="brand">
              <span className="brand-mark" aria-hidden="true" />
              devops services
            </Link>
            <p className="footer-tagline">
              Good work leaves
              <br />
              an impression.
            </p>
            <a
              className="footer-email"
              href="mailto:devopsservicesltd@gmail.com"
            >
              devopsservicesltd@gmail.com ↗
            </a>
          </div>
          <div>
            <p className="footer-label">Explore</p>
            <Link to="/case-studies" onNavigate={onNavigate}>
              Selected work
            </Link>
            <Link to="/digital-marketing" onNavigate={onNavigate}>
              Digital marketing
            </Link>
            <Link to="/#about" onNavigate={onNavigate}>
              The studio
            </Link>
          </div>
          <div>
            <p className="footer-label">Work together</p>
            <Link to="/#contact" onNavigate={onNavigate}>
              Start a project
            </Link>
            <Link to="/#services" onNavigate={onNavigate}>
              Our services
            </Link>
            <Link to="/#process" onNavigate={onNavigate}>
              Our process
            </Link>
          </div>
          <div>
            <p className="footer-label">Elsewhere</p>
            <a
              href="https://www.instagram.com/devopsservicesltd/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram ↗
            </a>
            <a
              href="https://github.com/SobanHaroon"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href="https://muhammadsoban.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              Soban’s portfolio ↗
            </a>
          </div>
        </div>
        <p className="giant-wordmark" aria-hidden="true">
          DEVOPS
        </p>
        <div className="footer-legal">
          <p>
            © {new Date().getFullYear()} DevOps Services. All rights reserved.
          </p>
          <span>Independent by design. Personal by nature.</span>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
