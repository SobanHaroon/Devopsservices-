import {chromium} from '@playwright/test';
const b=await chromium.launch({channel:'chrome',headless:true,args:['--no-proxy-server']});
const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
await p.locator('.scene-ready').waitFor({state:'attached'});
for(const phase of [0,.3,.6,.9]){
await p.evaluate(t=>{const s=document.getElementById('digital-engine');window.scrollTo({top:s.offsetTop+(s.offsetHeight-innerHeight)*t,behavior:'instant'});},phase);
await p.waitForTimeout(400);
await p.screenshot({path:'artifacts/qa/engine-mobile-'+phase+'.png'});
console.log(await p.evaluate(()=>({chapterTop:document.querySelector('.chapter-content').getBoundingClientRect().top,active:document.querySelector('.scene-shell').classList.contains('engine-active'),overflow:document.documentElement.scrollWidth>innerWidth})));
}
await b.close();