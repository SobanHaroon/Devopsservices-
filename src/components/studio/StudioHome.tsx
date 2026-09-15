import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, ArrowRight, Code2, Settings, Layers, TrendingUp, Megaphone, Compass, Cpu, Nfc, Plus, Minus, Play, Pause, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";
import { STUDIO_COPY } from "../../data/studioCopy";
import { CASE_STUDIES } from "../../data/caseStudiesData";
import { toggleService } from "../../lib/projectBrief";
import ProjectContact from "./ProjectContact";
const CinematicScene=lazy(()=>import("./CinematicScene"));
const icons=[Code2,Settings,Layers,TrendingUp,Megaphone,Compass,Cpu,Nfc];
const reveal={initial:{opacity:0,y:28},whileInView:{opacity:1,y:0},viewport:{once:true,margin:"-30px"},transition:{duration:.7}};
export default function StudioHome({onNavigate}:{onNavigate:(path:string)=>void}) {
 const {language,dictionary}=useLanguage();const c=STUDIO_COPY[language];
 const reduced=useReducedMotion();
 const [paused,setPaused]=useState(false),[selected,setSelected]=useState<string[]>([]),[chapter,setChapter]=useState(0),[faq,setFaq]=useState<number|null>(0),[playing,setPlaying]=useState(false);
 const video=useRef<HTMLVideoElement>(null),story=useRef<HTMLDivElement>(null);
 const motionOff=!!reduced||paused;
 useEffect(()=>{
  const update=()=>{if(!story.current)return;const rect=story.current.getBoundingClientRect();const progress=Math.max(0,Math.min(.999,-rect.top/Math.max(1,rect.height-window.innerHeight)));setChapter(Math.floor(progress*4));};
  window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);update();
  return()=>{window.removeEventListener("scroll",update);window.removeEventListener("resize",update);};
 },[]);
 useEffect(()=>{if(motionOff){video.current?.pause();setPlaying(false);}},[motionOff]);
 const services=[...dictionary.services.items,{id:"nfc-cards",title:c.nfc,description:c.nfcDesc,details:c.nfcDetails,tag:"NFC / CONNECT",iconName:"Nfc"}];
 const featured=[CASE_STUDIES[0],CASE_STUDIES.find(p=>p.id==="outsource-one")!];
 const toggleVideo=async()=>{if(!video.current)return;if(playing){video.current.pause();setPlaying(false);}else{try{await video.current.play();setPlaying(true);}catch{setPlaying(false);}}};
 return <div className={"studio-home "+(motionOff?"motion-paused":"")} data-language={language}>
  <div className="scene-shell" aria-hidden="true"><Suspense fallback={<img className="scene-fallback" src="/media/digital-engine-preview.png" alt="" width={1000} height={900}/>}><CinematicScene paused={motionOff}/></Suspense></div>
  <section id="hero" className="studio-hero">
   <div className="hero-topline"><span className="eyebrow"><i/>{c.studio}</span><span className="hero-availability"><i/>{c.available}</span></div>
   <div className="hero-content">
    <motion.h1 initial={{opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{duration:1,ease:[.16,1,.3,1]}}><span className="hero-first">{c.heroTop}</span><span>{c.heroMid}</span><span className="hero-accent">{c.heroEnd}</span></motion.h1>
    <motion.div className="hero-bottom-copy" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.25,duration:.8}}><p>{c.heroDesc}</p><div className="hero-ctas"><a href="#contact" className="button button-accent">{c.start}<ArrowUpRight size={20}/></a><a href="#case-studies" className="text-link">{c.work}<ArrowUpRight size={17}/></a></div></motion.div>
   </div>
   <div className="hero-foot"><a href="#digital-engine"><span className="scroll-icon"><ArrowDown size={16}/></span>{c.scroll}</a><span className="coordinate">33.5651° N / 73.0169° E</span><button onClick={()=>setPaused(!paused)} disabled={!!reduced} aria-pressed={motionOff}>{motionOff?<Play size={13}/>:<Pause size={13}/>} {reduced?c.noMotion:paused?c.resume:c.motion}</button></div>
   <div className="hero-scene-caption" aria-hidden="true"><span className="eyebrow">THE DIGITAL ENGINE</span><span>DESIGN × TECHNOLOGY × GROWTH</span></div>
  </section>
  <div className="capability-strip" aria-hidden="true"><span>WEB EXPERIENCES</span><i/><span>SEARCH & GROWTH</span><i/><span>API & AUTOMATION</span><i/><span>NFC CONNECTIONS</span><i/></div>
  <section id="digital-engine" ref={story} className={"engine-story "+(reduced?"reduced-story":"")}>
   <div className="engine-sticky">
    <div className="engine-intro"><p className="eyebrow">{c.engineTag}</p><h2>{c.engineTitle}</h2><p>{c.engineDesc}</p></div>
    <div className="chapter-content"><span className="chapter-count">0{chapter+1}<small>/ 04</small></span><p className="eyebrow accent-text">{c.chapters[chapter].label}</p><h3>{c.chapters[chapter].title}</h3><p>{c.chapters[chapter].text}</p>
     <div className="chapter-progress">{c.chapters.map((item,i)=><button key={item.label} aria-label={item.title} aria-current={chapter===i?"step":undefined} onClick={()=>{if(!story.current)return;const distance=story.current.offsetHeight-window.innerHeight;window.scrollTo({top:story.current.offsetTop+(i+.15)*distance/4,behavior:motionOff?"instant":"smooth"});}}><span style={{transform:chapter>=i?"scaleX(1)":"scaleX(0)"}}/></button>)}</div>
    </div>
   </div>
  </section>
  <section id="services" className="services-section section-pad surface-dark">
   <motion.div {...reveal} className="section-heading"><div><p className="eyebrow">{c.servicesTag}</p><h2 className="section-title">{c.servicesTitle}</h2></div><p className="section-desc">{c.servicesDesc}</p></motion.div>
   <div className="services-grid">{services.map((s,i)=>{const Icon=icons[i]||Code2;const active=selected.includes(s.id);return <motion.article {...reveal} key={s.id} className={"studio-service "+(active?"service-selected":"")}><div className="service-top"><span className="service-number">0{i+1}</span><Icon size={25} strokeWidth={1.3}/></div><h3>{s.title}</h3><p>{s.description}</p><ul>{s.details.slice(0,3).map(detail=><li key={detail}>{detail}</li>)}</ul><button aria-pressed={active} onClick={()=>setSelected(toggleService(selected,s.id))}>{active?c.included:c.include}{active?<Check size={17}/>:<Plus size={17}/>}</button></motion.article>;})}</div>
   {selected.length>0&&<div className="selected-summary" role="status"><span>{selected.length} {c.selected}</span><a href="#contact">{c.start}<ArrowRight size={16}/></a></div>}
  </section>
  <section id="case-studies" className="work-section section-pad surface-ivory">
   <motion.div {...reveal} className="section-heading"><div><p className="eyebrow">{c.workTag}</p><h2 className="section-title">{c.workTitle}</h2></div><button className="text-link" onClick={()=>onNavigate("/case-studies")}>{c.allWork}<ArrowUpRight size={18}/></button></motion.div>
   <div className="work-grid">{featured.map((project,i)=><motion.article {...reveal} key={project.id} className="work-card"><button className={"work-image work-image-"+i} onClick={()=>onNavigate("/case-studies/"+project.slug)} aria-label={c.caseStudy+": "+project.title}><div className="browser-chrome"><span/><span/><span/><small>{new URL(project.liveUrl).hostname}</small></div><img src={project.featuredImage} alt={project.title+" website homepage"} loading="lazy" width={1350} height={601}/><span className="work-open"><ArrowUpRight size={25}/></span></button><div className="work-info"><div><p className="eyebrow">0{i+1} / {project.category}</p><h3>{project.title}</h3></div><button aria-label={c.caseStudy+": "+project.title} onClick={()=>onNavigate("/case-studies/"+project.slug)}><ArrowUpRight size={25}/></button></div></motion.article>)}</div>
  </section>
  <section id="about" className="about-section section-pad surface-dark">
   <motion.div {...reveal} className="about-copy"><p className="eyebrow">{c.aboutTag}</p><h2 className="section-title">{c.aboutTitle}</h2><p className="section-desc">{c.aboutDesc}</p><ol className="process-list">{c.steps.map((step,i)=><li key={step}><span>0{i+1}</span>{step}<ArrowUpRight size={16}/></li>)}</ol></motion.div>
   <div className="studio-film"><video ref={video} src="/media/studio-process.mp4" poster="/media/studio-poster.jpg" muted loop playsInline preload="none" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}/><div className="film-caption"><span>{c.videoLabel}<small>DEVOPS SERVICES / RAW FOOTAGE</small></span><button onClick={toggleVideo} aria-label={playing?c.pauseVideo:c.play}>{playing?<Pause/>:<Play/>}</button></div></div>
  </section>
  <section id="faq" className="faq-section section-pad surface-dark"><div><p className="eyebrow">{c.faqTag}</p><h2 className="section-title">{c.faqTitle}</h2></div><div className="faq-list">{c.faq.map(([q,a],i)=><div className="faq-item" key={i}><h3><button aria-expanded={faq===i} aria-controls={"faq-answer-"+i} onClick={()=>setFaq(faq===i?null:i)}>{q}{faq===i?<Minus size={19}/>:<Plus size={19}/>}</button></h3><div id={"faq-answer-"+i} hidden={faq!==i}><p>{a}</p></div></div>)}</div></section>
  <ProjectContact selected={selected} setSelected={setSelected}/>
 </div>;
}
