import { existsSync } from "node:fs";
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { serve } from "./local-server.mjs";
const server = await serve();
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROME ||
    (existsSync("/tmp/codex-playwright-chromium/chromium")
      ? "/tmp/codex-playwright-chromium/chromium"
      : undefined),
  headless: true,
  args: ["--no-sandbox", "--no-proxy-server", "--enable-unsafe-swiftshader"],
});
await mkdir("artifacts/redesign", { recursive: true });
const errors = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(
    "http://127.0.0.1:4173/" +
      (process.argv.includes("--poster") ? "team#kael" : ""),
    { waitUntil: "networkidle" },
  );
  await page.evaluate(() => document.fonts.ready);
  if (process.argv.includes("--poster")) {
    await page.addStyleTag({
      content:
        "body,body * {background:transparent!important;visibility:hidden!important;} .character-art {height:900px!important;width:800px!important;position:relative!important;} .character-stage {inset:0!important;transform:none!important;} .character-webgl,.character-webgl canvas {visibility:visible!important;}",
    });
    for (const name of ["kael", "kai", "milo"]) {
      const art = page.locator(`.character-${name}`);
      await art.scrollIntoViewIfNeeded();
      await art.locator("[data-loaded=true]").waitFor({ timeout: 30000 });
      if (
        (await page.locator(".motion-control").getAttribute("aria-pressed")) ===
        "false"
      )
        await page.locator(".motion-control").dispatchEvent("click");
      await page.waitForTimeout(150);
      await art.locator(".character-webgl").screenshot({
        path: `artifacts/redesign/${name}.png`,
        omitBackground: true,
      });
    }
    console.log("Three character posters captured.");
    process.exitCode = 0;
  } else {
    await page.screenshot({ path: "artifacts/redesign/desktop.png" });
    for (
      let y = 0;
      y < (await page.evaluate(() => document.body.scrollHeight));
      y += 650
    ) {
      await page.evaluate(
        (y) => window.scrollTo({ top: y, behavior: "instant" }),
        y,
      );
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(750);
    await page.screenshot({
      path: "artifacts/redesign/desktop-full.png",
      fullPage: true,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(500);
    await page.screenshot({ path: "artifacts/redesign/mobile.png" });
    for (
      let y = 0;
      y < (await page.evaluate(() => document.body.scrollHeight));
      y += 600
    ) {
      await page.evaluate(
        (y) => window.scrollTo({ top: y, behavior: "instant" }),
        y,
      );
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(700);
    await page.screenshot({
      path: "artifacts/redesign/mobile-full.png",
      fullPage: true,
    });
    await writeFile(
      "artifacts/redesign/console.json",
      JSON.stringify(errors, null, 2),
    );
    console.log(
      JSON.stringify({ errors, files: "artifacts/redesign" }, null, 2),
    );
  }
} finally {
  await browser.close();
  server.close();
}
