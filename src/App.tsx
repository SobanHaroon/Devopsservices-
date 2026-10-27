import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import { LanguageProvider } from "./context/LanguageContext";
import StudioHeader from "./components/studio/StudioHeader";
import StudioHome from "./components/studio/StudioHome";
import StudioFooter from "./components/studio/StudioFooter";
import { updateCaseStudyMetaTags } from "./lib/seo";
import "./studio.css";
const CaseStudiesList = lazy(() => import("./components/CaseStudiesList"));
const CaseStudyDetail = lazy(() => import("./components/CaseStudyDetail"));
const TeamPage = lazy(() => import("./components/studio/TeamPage"));
type Route = { path: string; hash: string; key: string; restore: boolean };
const readRoute = (restore = false): Route => ({
  path: window.location.pathname.replace(/\/$/, "") || "/",
  hash: window.location.hash,
  key: window.history.state?.devopsKey || "initial",
  restore,
});
class RouteBoundary extends Component<
  { children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <div className="route-loading">
        <h1>Let’s get you back.</h1>
        <p>This view could not load. Refresh to try again.</p>
        <a className="button button-accent" href="/">
          Return home
        </a>
      </div>
    ) : (
      this.props.children
    );
  }
}
// This effect commits only after the lazy route has mounted; no delayed callbacks
// can scroll a route that has already been left.
function RouteContent({
  route,
  positions,
  onNavigate,
}: {
  route: Route;
  positions: Map<string, number>;
  onNavigate: (to: string) => void;
}) {
  useLayoutEffect(() => {
    if (route.path === "/")
      updateCaseStudyMetaTags(
        "DevOps Services | Thoughtful Websites & White-label Development",
        "Web design, development, SEO, digital marketing and white-label partnerships. An independent studio in Pakistan working worldwide.",
        undefined,
        undefined,
        "/",
      );
    let hash = route.hash.slice(1);
    try {
      hash = decodeURIComponent(hash);
    } catch {
      /* Preserve malformed URL fragments without crashing navigation. */
    }
    const target = hash ? document.getElementById(hash) : null;
    if (target) target.scrollIntoView({ behavior: "instant" });
    else
      window.scrollTo({
        top: route.restore ? positions.get(route.key) || 0 : 0,
        behavior: "instant",
      });
    if (!route.restore)
      document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [route, positions]);
  if (route.path === "/case-studies")
    return (
      <CaseStudiesList
        onSelectCaseStudy={(slug) => onNavigate("/case-studies/" + slug)}
        onBackToHome={() => onNavigate("/")}
        onContactClick={() => onNavigate("/#contact")}
      />
    );
  if (route.path.startsWith("/case-studies/"))
    return (
      <CaseStudyDetail
        key={route.path}
        slug={route.path.slice("/case-studies/".length)}
        onBackToCaseStudies={() => onNavigate("/case-studies")}
        onBackToHome={() => onNavigate("/")}
        onContactClick={() => onNavigate("/#contact")}
        onSelectCaseStudy={(slug) => onNavigate("/case-studies/" + slug)}
      />
    );
  if (route.path === "/") return <StudioHome onNavigate={onNavigate} />;
  if (route.path === "/team") return <TeamPage onNavigate={onNavigate} />;
  return (
    <div className="route-loading">
      <h1>Page not found.</h1>
      <p>Let’s find the right place.</p>
      <a
        className="button button-accent"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          onNavigate("/");
        }}
      >
        Return home
      </a>
    </div>
  );
}
export default function App() {
  const [route, setRoute] = useState(() => readRoute());
  const positions = useRef(new Map<string, number>()),
    activeKey = useRef(route.key);
  useEffect(() => {
    const old = history.scrollRestoration;
    history.scrollRestoration = "manual";
    if (!history.state?.devopsKey)
      history.replaceState({ ...history.state, devopsKey: "initial" }, "");
    const pop = () => {
      const next = readRoute(true);
      activeKey.current = next.key;
      setRoute(next);
    };
    const scroll = () =>
      positions.current.set(activeKey.current, window.scrollY);
    window.addEventListener("popstate", pop);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      history.scrollRestoration = old;
      window.removeEventListener("popstate", pop);
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  const navigate = useCallback((to: string) => {
    positions.current.set(activeKey.current, window.scrollY);
    const url = new URL(to, window.location.origin);
    if (url.origin !== window.location.origin) return;
    const key = crypto.randomUUID();
    history.pushState({ devopsKey: key }, "", url.pathname + url.hash);
    activeKey.current = key;
    setRoute(readRoute());
  }, []);
  return (
    <LanguageProvider>
      <LazyMotion features={domAnimation}>
        <MotionConfig
          reducedMotion="user"
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="studio-site">
            <StudioHeader path={route.path} onNavigate={navigate} />
            <main id="main-content" tabIndex={-1}>
              <RouteBoundary key={route.path}>
                <Suspense
                  fallback={
                    <div className="route-loading" role="status">
                      Loading page…
                    </div>
                  }
                >
                  <RouteContent
                    route={route}
                    positions={positions.current}
                    onNavigate={navigate}
                  />
                </Suspense>
              </RouteBoundary>
            </main>
            <StudioFooter onNavigate={navigate} />
          </div>
        </MotionConfig>
      </LazyMotion>
    </LanguageProvider>
  );
}
