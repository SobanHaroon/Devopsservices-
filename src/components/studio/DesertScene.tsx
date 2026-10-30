import {useEffect,useRef,useState} from "react";
export default function DesertScene({off,caption}:{off:boolean;caption:string}){
 const frame=useRef<HTMLElement>(null),video=useRef<HTMLVideoElement>(null);const[loaded,setLoaded]=useState(false);
 useEffect(()=>{const node=frame.current,player=video.current;if(!node||!player)return;let visible=false,menuOpen=false;
 const sync=()=>{if(!off&&visible&&!document.hidden&&!menuOpen){if(!player.src){player.src="/media/desert/desert-"+(innerWidth<768?"mobile":"desktop")+".mp4";player.load()}player.play().catch(()=>{})}else player.pause()};
 const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()},{threshold:.05});observer.observe(node);
 const menu=(event:Event)=>{menuOpen=(event as CustomEvent<boolean>).detail;sync()};window.addEventListener("devops:menu",menu);document.addEventListener("visibilitychange",sync);sync();
 return()=>{observer.disconnect();window.removeEventListener("devops:menu",menu);document.removeEventListener("visibilitychange",sync);player.pause()}},[off]);
 return <figure className="desert-plate" ref={frame} data-enter="plate"><div className="desert-media"><img src="/media/desert/poster.webp" alt="A quiet purple desert beneath a night sky" width="1600" height="1194" fetchPriority="high"/><video ref={video} poster="/media/desert/poster.webp" className={loaded?"is-playing":""} muted loop playsInline preload="none" onPlaying={()=>setLoaded(true)} aria-hidden="true"/><div className="desert-orbit" aria-hidden="true"><span/><span/><span/></div><span className="desert-coordinate" aria-hidden="true">IMAGINATION, WITHOUT LIMITS.</span></div><figcaption><span>{caption}</span><span>01 / ∞</span></figcaption></figure>
}

