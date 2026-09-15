import { chromium, expect } from "@playwright/test";
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-proxy-server"]});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:"reduce"});
 await page.route("**/digital-engine.glb",route=>route.abort());
 await page.goto("http://127.0.0.1:4173",{waitUntil:"domcontentloaded"});
 await expect(page.getByRole("button",{name:"Motion off",exact:true})).toBeDisabled();
 await expect(page.locator(".scene-fallback")).toBeVisible({timeout:25000});
 await expect(page.locator(".scene-fallback")).not.toHaveClass(/scene-ready/);
 await page.locator("#case-studies").scrollIntoViewIfNeeded();
 await expect(page.locator("#case-studies .section-heading")).toHaveCSS("opacity","1");
 await page.locator(".work-image-0 img").screenshot({path:"artifacts/qa/babay-home-rendered.png"});
 console.log("Reduced-motion control and missing-model fallback passed. Captured exact rendered case-study image.");
}finally{await browser.close();}
