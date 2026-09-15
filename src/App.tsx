import { lazy, Suspense, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { LanguageProvider } from "./context/LanguageContext";
import { ToastProvider } from "./components/Toast";
import StudioHeader from "./components/studio/StudioHeader";
import StudioHome from "./components/studio/StudioHome";
import StudioFooter from "./components/studio/StudioFooter";
import { updateSectionMetaTags } from "./lib/seo";
import "./studio.css";

const CaseStudiesList = lazy(() => import("./components/CaseStudiesList"));
const CaseStudyDetail = lazy(() => import("./components/CaseStudyDetail"));

export default function App() {
 const [path, setPath] = useState(window.location.pathname);
 useEffect(() => {
  const handle = () => { setPath(window.location.pathname); };
  window.addEventListener("popstate", handle);
  return () => window.removeEventListener("popstate", handle);
 }, []);
 useEffect(() => {
  if (path === "/") updateSectionMetaTags("hero");
  if (path === "/" && window.location.hash) {
   const timer = window.setTimeout(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView(), 100);
   return () => clearTimeout(timer);
  }
 }, [path]);
 const navigate = (to: string) => {
  const [pathname, hash] = to.split("#");
  const next = pathname || "/";
  window.history.pushState({}, "", to);
  setPath(next);
  if (hash) window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"}), next === path ? 0 : 100);
  else window.scrollTo({top:0, behavior:"instant"});
 };
 const isList = /^\/case-studies\/?$/.test(path);
 const isDetail = !isList && path.startsWith("/case-studies/");
 return <LanguageProvider><ToastProvider><MotionConfig reducedMotion="user">
  <div className="studio-site">
   <StudioHeader onNavigate={navigate} path={path} />
   <main id="main-content" tabIndex={-1}>
    <Suspense fallback={<div className="route-loading" role="status">DevOps Services / Loading project…</div>}>
     {isList ? <CaseStudiesList onSelectCaseStudy={slug=>navigate("/case-studies/"+slug)} onBackToHome={()=>navigate("/")} onContactClick={()=>navigate("/#contact")} /> :
      isDetail ? <CaseStudyDetail slug={path.replace(/^\/case-studies\//,"").replace(/\/$/,"")} onBackToCaseStudies={()=>navigate("/case-studies")} onBackToHome={()=>navigate("/")} onContactClick={()=>navigate("/#contact")} onSelectCaseStudy={slug=>navigate("/case-studies/"+slug)} /> :
      <StudioHome onNavigate={navigate}/>}
    </Suspense>
   </main>
   <StudioFooter onNavigate={navigate}/>
  </div>
 </MotionConfig></ToastProvider></LanguageProvider>;
}
