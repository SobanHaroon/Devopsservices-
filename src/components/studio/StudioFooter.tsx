import { ArrowUpRight, ArrowUp } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { STUDIO_COPY } from "../../data/studioCopy";
export default function StudioFooter({onNavigate}:{onNavigate:(to:string)=>void}) {
 const {language,dictionary}=useLanguage();const c=STUDIO_COPY[language];
 return <footer className="studio-footer">
  <div className="footer-top"><p>{c.footerLine}</p><a href="mailto:devopsservicesltd@gmail.com">devopsservicesltd@gmail.com <ArrowUpRight size={18}/></a></div>
  <div className="footer-wordmark" aria-hidden="true">devops<span>.</span></div>
  <div className="footer-bottom"><span>© {new Date().getFullYear()} DevOps Services Ltd. {c.rights}</span><span>{c.based}</span><button onClick={()=>{window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});}}>{c.back}<ArrowUp size={14}/></button></div>
 </footer>;
}
