import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium, expect } from "@playwright/test";
import { serve } from "./local-server.mjs";
const server = await serve("dist", 4177);
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROME ||
    (existsSync("/tmp/codex-playwright-chromium/chromium")
      ? "/tmp/codex-playwright-chromium/chromium"
      : undefined),
  args: ["--no-sandbox", "--no-proxy-server", "--enable-unsafe-swiftshader"],
});
const failures = [],
  results = [];
await mkdir("artifacts/cinematic", { recursive: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  page.on("pageerror", (e) => failures.push(e.message));
  const media = [];
  page.on("request", (r) => {
    if (/\.mp4|\.glb|CharacterScene-/.test(r.url())) media.push(r.url());
  });
  for (const width of [320, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://127.0.0.1:4177/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `Overflow ${width}`,
    );
    const src = await page
      .locator(".city-journey .scene-picture img")
      .evaluate((el) => el.currentSrc);
    assert.equal(
      src.includes("-mobile.webp"),
      width <= 700,
      `Art direction at ${width}`,
    );
    for (const scene of [".city-journey", ".gallery-journey"]) {
      const el = page.locator(scene);
      for (const progress of [0, 0.5, 1, 0.5, 0]) {
        const y = await el.evaluate(
          (e, p) =>
            e.getBoundingClientRect().top +
            scrollY -
            80 +
            (e.clientHeight - innerHeight + 80) * p,
          progress,
        );
        await page.evaluate(
          (y) => scrollTo({ top: y, behavior: "instant" }),
          y,
        );
        await expect
          .poll(async () =>
            Number((await el.getAttribute("data-progress")) || 0),
          )
          .toBeCloseTo(progress, 1);
        await expect
          .poll(() =>
            el
              .locator(".scene-stage")
              .evaluate((e) => Math.round(e.getBoundingClientRect().top)),
          )
          .toBe(80);
      }
    }
    results.push(
      `${width}px: responsive source, native sticky stages and reversible scroll progress`,
    );
  }
  assert.equal(
    media.some(
      (x) =>
        x.endsWith(".glb") ||
        x.includes("CharacterScene-") ||
        x.includes("-moment.mp4"),
    ),
    false,
    "No homepage character media download",
  );
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:4177/", { waitUntil: "networkidle" });
  await page.locator(".motion-control").dispatchEvent("click");
  await expect(page.locator(".city-journey")).toHaveClass(/is-rest/);
  await expect(page.locator(".scene-stage").first()).toHaveCSS(
    "position",
    "relative",
  );
  await expect(page.locator(".city-journey .scene-picture")).toHaveCSS(
    "transform",
    "none",
  );
  await page.locator(".motion-control").dispatchEvent("click");
  await expect(page.locator(".city-journey")).toHaveClass(/is-live/);
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(page.locator(".scene-stage").first()).toHaveCSS(
    "position",
    "relative",
  );
  await page.locator(".motion-control").scrollIntoViewIfNeeded();
  await expect(page.locator(".motion-control")).toBeInViewport();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".scene-stage").first()).toHaveCSS(
    "position",
    "sticky",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".city-journey")).toHaveClass(/is-rest/);
  await expect(page.locator(".motion-control")).toBeDisabled();
  await expect(page.locator(".scene-stage").first()).toHaveCSS(
    "position",
    "relative",
  );
  await expect(page.locator(".scene-picture").first()).toHaveCSS(
    "transform",
    "none",
  );
  results.push(
    "Pause/resume, live resizing, landscape-phone flow and reduced-motion fallback",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:4177/team#kai", {
    waitUntil: "networkidle",
  });
  await expect(page.locator(".team-film video")).toHaveCount(0);
  await page.locator("#kai .team-film-trigger").click();
  const video = page.locator("#kai .team-film video");
  await expect(video).toHaveAttribute(
    "src",
    "/media/characters/kai-moment.mp4",
  );
  await expect
    .poll(() => video.evaluate((v) => v.readyState))
    .toBeGreaterThan(1);
  assert.equal(await video.evaluate((v) => v.muted), true);
  await expect.poll(() => video.evaluate((v) => v.paused)).toBe(false);
  const separated = await page.locator("#kai").evaluate((el) => {
    const model = el.querySelector(".character-art").getBoundingClientRect();
    const film = el.querySelector(".team-film").getBoundingClientRect();
    return model.right <= film.left || model.bottom <= film.top;
  });
  assert.equal(
    separated,
    true,
    "Video and 3D character must occupy separate space",
  );
  await page.locator(".motion-control").dispatchEvent("click");
  await expect.poll(() => video.evaluate((v) => v.paused)).toBe(true);
  await video.evaluate((v) => v.play());
  await page.evaluate(() =>
    scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "instant",
    }),
  );
  await expect(video).not.toBeInViewport();
  await expect.poll(() => video.evaluate((v) => v.paused)).toBe(true);
  results.push(
    "Character video loads only on request, plays muted, and stops when paused or offscreen",
  );
  assert.deepEqual(failures, []);
  await writeFile(
    "artifacts/cinematic/results.json",
    JSON.stringify({ results, failures }, null, 2),
  );
  console.log(JSON.stringify({ results, failures }, null, 2));
} finally {
  await browser.close();
  server.close();
}
