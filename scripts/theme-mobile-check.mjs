import {chromium} from '@playwright/test';
const b=await chromium.launch({channel:'chrome',headless:true,args:['--no-proxy-server']});
const p=await b.newPage();
for(const width of [375,390,518,1440]){
await p.setViewportSize({width,height:width>760?1000:844});
await p.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
await p.locator('.scene-ready').waitFor({state:'attached'});
const result=await p.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,canvasWidth:document.querySelector('.webgl-stage').clientWidth,accent:getComputedStyle(document.documentElement).getPropertyValue('--accent')}));
if(result.scrollWidth>width)throw new Error(JSON.stringify(result));
console.log(result);
await p.screenshot({path:'artifacts/qa/logo-theme-'+width+'.png'});
}
await b.close();
