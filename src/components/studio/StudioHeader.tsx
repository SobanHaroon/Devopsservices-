import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLanguage, type LanguageType } from "../../context/LanguageContext";
import { STUDIO_COPY } from "../../data/studioCopy";

export default function StudioHeader({onNavigate,path}:{onNavigate:(to:string)=>void;path:string}) {
 const {language,setLanguage,dictionary}=useLanguage();
 const c=STUDIO_COPY[language];
 const [open,setOpen]=useState(false);
 const menuRef=useRef<HTMLButtonElement>(null);
 const navRef=useRef<HTMLElement>(null);
 const go=(to:string)=>{setOpen(false);onNavigate(to);};
 useEffect(()=>{setOpen(false);},[path]);
 useEffect(()=>{
  if(!open)return;
  const old=document.body.style.overflow;
  document.body.style.overflow="hidden";
  navRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  const handle=(e:KeyboardEvent)=>{
   if(e.key==="Escape"){setOpen(false);menuRef.current?.focus();}
   if(e.key==="Tab"){
    const nodes=[menuRef.current,...Array.from(navRef.current?.querySelectorAll<HTMLButtonElement>("button")||[])].filter(Boolean) as HTMLButtonElement[];
    const i=nodes.indexOf(document.activeElement as HTMLButtonElement);
    if(e.shiftKey && i<=0){e.preventDefault();nodes.at(-1)?.focus();}
    else if(!e.shiftKey && i===nodes.length-1){e.preventDefault();nodes[0]?.focus();}
   }
  };
  window.addEventListener("keydown",handle);
  return ()=>{document.body.style.overflow=old;window.removeEventListener("keydown",handle);};
 },[open]);
 return <>
  <a href="#main-content" className="skip-link">{c.skip}</a>
  <header className="studio-header">
   <button className="wordmark" onClick={()=>go("/")} aria-label="DevOps Services — home"><span>devops<span className="brand-dot">.</span></span><small>SERVICES / DIGITAL STUDIO</small></button>
   <nav className="desktop-nav" aria-label="Main navigation">
    <button onClick={()=>go("/#services")}>{dictionary.nav.services}</button>
    <button onClick={()=>go("/#case-studies")}>{dictionary.nav.portfolio}</button>
    <button onClick={()=>go("/#about")}>{dictionary.nav.about}</button>
   </nav>
   <div className="header-actions">
    <label className="language-select"><span className="sr-only">{c.language}</span>
     <select value={language} onChange={e=>setLanguage(e.target.value as LanguageType)}>
      <option value="EN">EN</option><option value="FR">FR</option><option value="DE">DE</option><option value="JP">日本語</option>
     </select>
    </label>
    <button className="header-cta" onClick={()=>go("/#contact")}>{dictionary.nav.contact}<ArrowUpRight size={16}/></button>
    <button ref={menuRef} className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?c.close:c.menu}>{open?<X/>:<Menu/>}</button>
   </div>
  </header>
  {open&&<nav ref={navRef} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
   {[["/#services",dictionary.nav.services],["/#case-studies",dictionary.nav.portfolio],["/#about",dictionary.nav.about],["/#faq",dictionary.nav.faq],["/#contact",dictionary.nav.contact]].map(([to,label],i)=><button key={to} onClick={()=>go(to)}><small>0{i+1}</small>{label}<ArrowUpRight/></button>)}
   <p>{c.based}</p>
  </nav>}
 </>;
}
