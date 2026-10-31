import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { chromium, expect } from "@playwright/test";
import { serve } from "./local-server.mjs";
const server = await serve("dist", 4176);
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROME ||
    (existsSync("/tmp/codex-playwright-chromium/chromium")
      ? "/tmp/codex-playwright-chromium/chromium"
      : undefined),
  headless: true,
  args: ["--no-sandbox", "--no-proxy-server", "--enable-unsafe-swiftshader"],
});
const errors = [],
  passed = [];
await mkdir("artifacts/qa", { recursive: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:4176/digital-marketing", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.locator("h1")).toHaveAccessibleName("Stories, in motion.");
  await expect(page.locator(".marketing-film")).toHaveCount(10);
  await expect
    .poll(
      () =>
        page
          .locator(".marketing-film video")
          .evaluateAll((videos) =>
            videos.every(
              (v) => v.currentTime > 0 && !v.paused && v.videoWidth > 0,
            ),
          ),
      { timeout: 30000 },
    )
    .toBe(true);
  await expect(
    page.locator(".reel-play, .motion-control, video[controls]"),
  ).toHaveCount(0);
  const filters = page.locator(".marketing-filters button");
  await filters.nth(1).click();
  await expect(page.locator(".marketing-film")).toHaveCount(7);
  await filters.nth(2).click();
  await expect(page.locator(".marketing-film")).toHaveCount(3);
  await filters.nth(0).click();
  await expect(page.locator(".marketing-film")).toHaveCount(10);
  passed.push(
    "Ten unique films autoplay without interaction; client/studio filters work",
  );
  const videos = page.locator(".marketing-film video");
  await expect
    .poll(
      () =>
        videos.evaluateAll((items) =>
          items.every(
            (v) => !v.paused && v.currentTime > 0 && v.videoWidth > 0,
          ),
        ),
      { timeout: 30000 },
    )
    .toBe(true);
  const sources = await videos.evaluateAll((items) =>
    items.map((v) => v.currentSrc),
  );
  assert.equal(new Set(sources).size, 10);
  assert.equal(
    await videos.evaluateAll((items) =>
      items.every(
        (v) => v.autoplay && v.loop && v.muted && v.playsInline && !v.controls,
      ),
    ),
    true,
  );
  // Exercise the actual end-to-start transition for every film.
  await videos.evaluateAll((items) =>
    items.forEach((v) => {
      v.currentTime = v.duration - 0.25;
    }),
  );
  await expect
    .poll(
      () =>
        videos.evaluateAll((items) =>
          items.every(
            (v) =>
              !v.paused && v.currentTime > 0 && v.currentTime < v.duration - 1,
          ),
        ),
      { timeout: 20000 },
    )
    .toBe(true);
  await page.locator(".ed-menu-button").click();
  assert.equal(
    await videos.evaluateAll((items) => items.every((v) => !v.paused)),
    true,
  );
  await page.keyboard.press("Escape");
  await page.locator(".marketing-assets").scrollIntoViewIfNeeded();
  assert.equal(
    await videos.evaluateAll((items) => items.every((v) => !v.paused)),
    true,
  );
  passed.push(
    "All ten videos decode, loop past their end and keep playing together offscreen and behind the menu",
  );
  for (const width of [320, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const lang of ["EN", "FR", "DE", "JP"]) {
      await page
        .getByRole("combobox", { name: "Language", exact: true })
        .selectOption(lang);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        ),
        false,
        `${lang} overflow at ${width}`,
      );
      assert.equal(
        await page
          .locator("h1")
          .evaluate((el) => el.scrollWidth > el.clientWidth + 1),
        false,
        `${lang} heading overflow at ${width}`,
      );
    }
  }
  passed.push("320–1920px responsive layouts in all four interface languages");
  await page
    .getByRole("combobox", { name: "Language", exact: true })
    .selectOption("EN");
  await page.locator(".marketing-page-intro a").click();
  await expect(page.locator("h1")).toHaveAccessibleName(
    "Built with character.",
  );
  await page.goBack();
  await expect(page.locator(".marketing-film")).toHaveCount(10);
  await page.reload();
  await expect(page.locator(".marketing-film")).toHaveCount(10);
  await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
    "href",
    "http://127.0.0.1:4176/digital-marketing",
  );
  passed.push("Direct route, refresh, Back navigation and route metadata");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: "artifacts/qa/marketing-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "artifacts/qa/marketing-mobile.png" });
  assert.deepEqual(errors, []);
  await writeFile(
    "artifacts/qa/marketing-results.json",
    JSON.stringify({ passed, errors }, null, 2),
  );
  console.log(JSON.stringify({ passed, errors }, null, 2));
} finally {
  await browser.close();
  server.close();
}
