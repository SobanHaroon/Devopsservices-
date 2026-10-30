import {useEffect,type CSSProperties,type ReactNode,type RefObject} from "react";
import Lenis from "lenis";
import {useMotionPreference} from "../../lib/useMotionPreference";
export function SmoothScroll({route}:{route:string}){
 const reduced=useMotionPreference();
 useEffect(()=>{if(reduced)return;const lenis=new Lenis({smoothWheel:true,syncTouch:false,duration:1.05});let frame=0;
 const tick=(time:number)=>{if(!lenis.isStopped&&Math.abs(lenis.actualScroll-lenis.animatedScroll)>2)lenis.scrollTo(lenis.actualScroll,{immediate:true});lenis.raf(time);frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick);
 const menu=(e:Event)=>(e as CustomEvent<boolean>).detail?lenis.stop():lenis.start();window.addEventListener("devops:menu",menu);
 return()=>{cancelAnimationFrame(frame);window.removeEventListener("devops:menu",menu);lenis.destroy()};},[reduced,route]);return null;
}
export function Eyebrow({children}:{children:ReactNode}){return <p className="ed-eyebrow" data-enter="fade">{children}</p>}
export function Heading({text,hero=false,className=""}:{text:string;hero?:boolean;className?:string}){const Tag=hero?"h1":"h2";const words=text.split(" ");return <Tag className={"ed-heading "+className} data-enter="lines" aria-label={text}>{words.map((word,i)=><span className="line-mask" aria-hidden="true" key={i}><span className="line-word">{i===words.length-1?<em>{word}</em>:word}</span>{i<words.length-1?"\u00a0":""}</span>)}</Tag>}
export function Words({text,className="",delay=0}:{text:string;className?:string;delay?:number}){return <p className={className} data-enter="words" style={{"--delay":delay+"ms"} as CSSProperties}><span className="sr-only">{text}</span>{text.split(" ").map((word,i)=><span className="ed-word" aria-hidden="true" key={i} style={{"--word-delay":i*16+"ms"} as CSSProperties}>{word}{" "}</span>)}</p>}
export function useEditorialMotion(root:RefObject<HTMLDivElement|null>,off:boolean,language:string){useEffect(()=>{const el=root.current;if(!el||off)return;let disposed=false,frame=0;const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("has-entered");observer.unobserve(entry.target)}}),{rootMargin:"0px 0px -4% 0px"});
 const lines=()=>el.querySelectorAll<HTMLElement>('[data-enter="lines"]').forEach(heading=>{let previous=-1,line=-1;heading.querySelectorAll<HTMLElement>(".line-mask").forEach(word=>{if(word.offsetTop!==previous){line++;previous=word.offsetTop}word.style.setProperty("--line-delay",line*(heading.tagName==="H1"?140:90)+"ms")})});
 lines();document.fonts.ready.then(()=>{if(!disposed)lines()});el.classList.add("motion-ready");el.querySelectorAll("[data-enter], [data-reveal]").forEach(node=>observer.observe(node));
 const plates=[...el.querySelectorAll<HTMLElement>(".editorial-works .work-image")];
 const move=()=>{frame=0;plates.forEach(plate=>{const r=plate.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight-r.top)/(innerHeight+r.height)));plate.style.setProperty("--drift",innerWidth>768?40-p*80+"px":"0px")})};
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(move)};const resize=()=>{lines();schedule()};window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",resize);move();
 return()=>{disposed=true;observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",resize);el.classList.remove("motion-ready");plates.forEach(p=>p.style.removeProperty("--drift"))};},[root,off,language])}

