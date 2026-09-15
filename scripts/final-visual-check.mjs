import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-proxy-server"]});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage();
const errors=[];page.on("pageerror",e=>errors.push(e.message));
await mkdir("artifacts/qa",{recursive:true});
try{
 await page.goto("http://127.0.0.1:4173",{waitUntil:"domcontentloaded"});
 await expect(page.locator("h1")).toBeVisible();
 await page.evaluate(()=>document.fonts.ready);
 await page.locator(".scene-ready").waitFor({state:"attached",timeout:25000});
 await page.screenshot({path:"artifacts/qa/desktop-hero.png"});
 await page.evaluate(()=>{const e=document.getElementById("digital-engine");window.scrollTo({top:e.offsetTop+(e.offsetHeight-innerHeight)*.6,behavior:"instant"});});
 await expect(page.locator(".chapter-content h3")).toHaveText("Everything connected.");
 await page.screenshot({path:"artifacts/qa/desktop-scene-scroll.png"});
 for(const id of ["services","case-studies","about","contact"]){
  await page.locator("#"+id).scrollIntoViewIfNeeded();
  const heading=page.locator("#"+id+" .section-heading");
  if(await heading.count())await expect(heading).toHaveCSS("opacity","1");
  await page.screenshot({path:"artifacts/qa/desktop-"+id+".png"});
 }
 await page.getByRole("radio",{name:"Rs. PKR"}).check();
 await page.locator('select[name="budget"]').selectOption("3");
 await page.getByRole("checkbox",{name:"NFC Card Services",exact:true}).check();
 await page.locator('select[name="country"]').selectOption("Germany");
 await page.locator('select[name="industry"]').selectOption({index:1});
 await page.locator(".language-select select").selectOption("FR");
 await expect(page.locator('select[name="country"]')).toHaveValue("Germany");
 await expect(page.locator('select[name="industry"]')).toHaveValue("Technology & SaaS");
 await page.locator(".language-select select").selectOption("EN");
 await page.locator("#contact").scrollIntoViewIfNeeded();
 await page.screenshot({path:"artifacts/qa/desktop-contact-pkr.png"});
 await page.setViewportSize({width:390,height:844});
 await page.goto("http://127.0.0.1:4173",{waitUntil:"domcontentloaded"});
 await expect(page.locator("h1")).toBeVisible();
 await page.evaluate(()=>document.fonts.ready);
 await page.locator(".scene-ready").waitFor({state:"attached",timeout:25000});
 await page.screenshot({path:"artifacts/qa/mobile-hero.png"});
 await page.locator("#contact").scrollIntoViewIfNeeded();
 await page.screenshot({path:"artifacts/qa/mobile-contact.png"});
 await writeFile("artifacts/qa/final-visual-results.json",JSON.stringify({errors,checks:["Desktop and mobile WebGL loaded","Scroll chapter changes to API","Country and industry survive language switching","PKR and NFC selections displayed"]},null,2));
 console.log(JSON.stringify({passed:errors.length===0,errors}));
}finally{await browser.close();}
