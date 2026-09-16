import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export default function CinematicScene({paused}:{paused:boolean}) {
 const host=useRef<HTMLDivElement>(null),isPaused=useRef(paused),requestRender=useRef<()=>void>(()=>{});
 const [ready,setReady]=useState(false);
 useEffect(()=>{isPaused.current=paused;requestRender.current();},[paused]);
 useEffect(()=>{
  const element=host.current;if(!element)return;
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:"low-power"});}
  catch{return;}
  renderer.setClearColor(0x080e16,0);renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.6));
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
  element.appendChild(renderer.domElement);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(37,1,.1,100);
  const generator=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();
  const env=generator.fromScene(room,.04);scene.environment=env.texture;
  scene.add(new THREE.HemisphereLight(0xe4f5ff,0x142539,1.4));
  const key=new THREE.DirectionalLight(0xd9f7ff,4);key.position.set(3,5,8);scene.add(key);
  const rim=new THREE.PointLight(0x306bff,30,20);rim.position.set(-3,1,2);scene.add(rim);
  const fill=new THREE.DirectionalLight(0x38e8ec,2);fill.position.set(-5,3,-3);scene.add(fill);
  const rig=new THREE.Group();scene.add(rig);
  let model:THREE.Object3D|undefined,disposed=false,frame=0,last=0,clock=0,scroll=0,dirty=true;
  let mobile=window.innerWidth<760,visible=true,progress=0,inEngine=false;
  const pointer={x:0,y:0};
  const stations:THREE.Object3D[]=[];
  const stationPositions=new Map<THREE.Object3D,number>();
  const disposeObject=(object:THREE.Object3D)=>{
   object.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>{for(const v of Object.values(m))if(v instanceof THREE.Texture)v.dispose();m.dispose();});}});
  };
  new GLTFLoader().load("/models/digital-engine.glb",gltf=>{
   if(disposed){disposeObject(gltf.scene);return;}
   model=gltf.scene;
   model.traverse(o=>{
    if(o instanceof THREE.Mesh){
     const materials=Array.isArray(o.material)?o.material:[o.material];
     materials.forEach(m=>{
      if(m instanceof THREE.MeshStandardMaterial){
       m.envMapIntensity=.7;
       if(m.name==="Signal orange"){m.color.set("#38e8ec");m.emissive.set("#12c9eb");m.emissiveIntensity=.22;m.metalness=.35;}
       if(m.name==="Display glass"){m.metalness=0;m.roughness=.8;}
      }
     });
    }
   });
   const remove:THREE.Object3D[]=[];model.traverse(o=>{if(o instanceof THREE.Light||o instanceof THREE.Camera)remove.push(o);});
   remove.forEach(o=>o.removeFromParent());
   model.traverse(o=>{if(["CodeStation","SearchStation","APIStation","MarketingStation","NFCStation"].includes(o.name)){stations.push(o);stationPositions.set(o,o.position.y);}});
   rig.add(model);dirty=true;render();setReady(true);
  },undefined,()=>{if(!disposed)setReady(false);});
  const cameraPoints=[new THREE.Vector3(5,3.5,12),new THREE.Vector3(3,2.6,10.5),new THREE.Vector3(-1,3.6,10.5),new THREE.Vector3(-4,1.7,11),new THREE.Vector3(4,2,11)];
  const target=new THREE.Vector3(),desired=new THREE.Vector3();
  function render(){
   const p=isPaused.current?0:progress;
   const phase=Math.min(p*4,3.999),index=Math.floor(phase);
   desired.copy(cameraPoints[index]).lerp(cameraPoints[index+1],phase-index);
   camera.position.copy(desired);
   target.set(inEngine&&window.innerWidth<=1100?.6:-2.1,.4,0);
   camera.lookAt(target);
   rig.position.set(.6,0,0);
   rig.rotation.y=isPaused.current?0:pointer.x*.075+Math.sin(clock*.15)*.035;
   rig.rotation.x=isPaused.current?0:pointer.y*.025;
   if(!isPaused.current)stations.forEach((s,i)=>{s.position.y=(stationPositions.get(s)||0)+Math.sin(clock*.6+i*1.5)*.09;});
   renderer.render(scene,camera);dirty=false;
  }
  function animate(time:number){
   frame=requestAnimationFrame(animate);
   if(document.hidden||!visible)return;
   if(isPaused.current&&!dirty)return;
   const delta=Math.min((time-last)/1000,.05);
   if(time-last<(mobile?32:16))return;
   last=time;if(!isPaused.current)clock+=delta;render();
  }
  const resize=()=>{mobile=window.innerWidth<760;rig.scale.setScalar(window.innerWidth<=760?.4:window.innerWidth<=1100?.65:1);renderer.setSize(element.clientWidth,element.clientHeight);camera.aspect=element.clientWidth/Math.max(1,element.clientHeight);camera.updateProjectionMatrix();dirty=true;};
  const updateScroll=()=>{
   scroll=window.scrollY;
   const story=document.getElementById("digital-engine");
   if(story){const start=story.offsetTop;const distance=story.offsetHeight-window.innerHeight;progress=THREE.MathUtils.clamp((scroll-start)/Math.max(1,distance),0,1);visible=scroll<start+story.offsetHeight+window.innerHeight;inEngine=scroll>=start-window.innerHeight*.35&&scroll<start+story.offsetHeight; }
   element.closest(".scene-shell")?.classList.toggle("engine-active",inEngine);
   element.style.opacity=visible?"1":"0";dirty=true;
  };
  const move=(event:PointerEvent)=>{pointer.x=event.clientX/window.innerWidth-.5;pointer.y=event.clientY/window.innerHeight-.5;};
  const loss=(event:Event)=>{event.preventDefault();setReady(false);visible=false;};
  const observer=new ResizeObserver(resize);observer.observe(element);
  window.addEventListener("scroll",updateScroll,{passive:true});window.addEventListener("pointermove",move,{passive:true});renderer.domElement.addEventListener("webglcontextlost",loss);
  requestRender.current=()=>{dirty=true;};
  resize();updateScroll();frame=requestAnimationFrame(animate);
  return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener("scroll",updateScroll);window.removeEventListener("pointermove",move);renderer.domElement.removeEventListener("webglcontextlost",loss);requestRender.current=()=>{};if(model)disposeObject(model);env.dispose();room.dispose();generator.dispose();renderer.dispose();renderer.domElement.remove();element.closest(".scene-shell")?.classList.remove("engine-active");};
 },[]);
 return <div className="cinematic-stage"><img className={"scene-fallback "+(ready?"scene-ready":"")} src="/media/digital-engine-preview.png" alt="" width={1000} height={900}/><div ref={host} className="webgl-stage"/></div>;
}
