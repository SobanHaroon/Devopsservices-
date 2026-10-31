import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { chromium, expect } from "@playwright/test";
import { serve } from "./local-server.mjs";
const server = await serve("dist", 4175);
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
    viewport: { width: 1200, height: 800 },
  });
  page.on("pageerror", (e) => errors.push(e.message));
  const requests = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("http://127.0.0.1:4175/", { waitUntil: "domcontentloaded" });
  const desert = page.locator(".desert-media video");
  await expect
    .poll(() => desert.evaluate((v) => !v.paused && v.currentTime > 0))
    .toBe(true);
  assert.equal(
    requests.some((u) => /vendor\/storm|scenes\/storm/.test(u)),
    false,
    "Heavy Storm scene loads near its section",
  );
  await expect(
    page.locator(".motion-control, .reel-play, video[controls]"),
  ).toHaveCount(0);
  await page.locator(".ed-menu-button").click();
  await expect.poll(() => desert.evaluate((v) => !v.paused)).toBe(true);
  await page.keyboard.press("Escape");
  await desert.evaluate((v) => {
    v.currentTime = v.duration - 0.25;
  });
  await expect
    .poll(() =>
      desert.evaluate((v) => !v.paused && v.currentTime < v.duration - 1),
    )
    .toBe(true);
  passed.push(
    "Desert autoplays, loops and continues behind the menu without playback controls",
  );
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(1000);
  const jump = await page.evaluate(() => {
    const y = document.querySelector("#case-studies").offsetTop + 300;
    scrollTo({ top: y, behavior: "instant" });
    return y;
  });
  await page.mouse.wheel(0, 2);
  await page.waitForTimeout(1300);
  assert.ok(
    Math.abs((await page.evaluate(() => scrollY)) - jump) < 20,
    "Wheel after native jump must not snap back",
  );
  passed.push("Lenis stays synchronized after native scroll jumps");
  const chapter = page.locator(".storm-chapter");
  await chapter.scrollIntoViewIfNeeded();
  await expect(chapter).toHaveAttribute("data-ready", "true", {
    timeout: 30000,
  });
  const frame = page.frameLocator(".storm-frame"),
    body = frame.locator("body");
  await expect(body).toHaveAttribute("data-points", "50000");
  for (const progress of [0, 0.5, 1, 0.5, 0]) {
    await chapter.evaluate(
      (el, p) =>
        scrollTo({
          top: el.offsetTop + (el.offsetHeight - innerHeight) * p,
          behavior: "instant",
        }),
      progress,
    );
    await expect
      .poll(
        async () =>
          Math.abs(Number(await body.getAttribute("data-progress")) - progress),
        { timeout: 30000 },
      )
      .toBeLessThan(0.035);
  }
  await page.mouse.move(650, 380);
  await expect
    .poll(async () => Number(await body.getAttribute("data-activity")), {
      timeout: 15000,
    })
    .toBeGreaterThan(0.3);
  await page.screenshot({ path: "artifacts/qa/storm-desktop.png" });
  await page.locator(".ed-menu-button").click();
  await expect(body).toHaveAttribute("data-running", "true");
  await page.keyboard.press("Escape");
  await expect(body).toHaveAttribute("data-running", "true");
  await page
    .locator("#services")
    .evaluate((el) =>
      scrollTo({ top: el.offsetTop + 120, behavior: "instant" }),
    );
  await expect(body).toHaveAttribute("data-running", "true");
  passed.push(
    "50,000-point Storm, reversible scroll progress and continuous rendering offscreen and behind the menu",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".storm-frame")).toHaveCount(1);
  await expect(page.locator(".editorial-home")).not.toHaveClass(/motion-ready/);
  const films = page.locator("#digital-marketing .marketing-film video");
  await expect
    .poll(() =>
      films.evaluateAll((items) =>
        items.every((v) => !v.paused && v.currentTime > 0),
      ),
    )
    .toBe(true);
  await page.locator(".ed-menu-button").click();
  assert.equal(
    await films.evaluateAll((items) => items.every((v) => !v.paused)),
    true,
  );
  await page.keyboard.press("Escape");
  await page.locator("#faq").scrollIntoViewIfNeeded();
  assert.equal(
    await films.evaluateAll((items) => items.every((v) => !v.paused)),
    true,
  );
  assert.equal(await desert.evaluate((v) => !v.paused), true);
  passed.push(
    "Homepage reels play simultaneously offscreen and behind the menu; reduced-motion still simplifies text entrances",
  );
  const rows = page.locator(".ed-faq-row");
  await rows.nth(0).getByRole("button").click();
  await rows.nth(1).getByRole("button").click();
  await expect(rows.nth(0).getByRole("button")).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(rows.nth(1).getByRole("button")).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expect
    .poll(() =>
      rows
        .nth(0)
        .locator(".ed-faq-panel")
        .evaluate((el) =>
          Math.abs(el.clientHeight - el.firstElementChild.scrollHeight),
        ),
    )
    .toBeLessThan(2);
  await rows.nth(0).getByRole("button").click();
  await expect
    .poll(() =>
      rows
        .nth(0)
        .locator(".ed-faq-panel")
        .evaluate((el) => el.clientHeight),
    )
    .toBeLessThan(2);
  passed.push("Independent FAQ panels and content height updates after resize");
  for (const [width, height] of [
    [320, 700],
    [390, 844],
    [768, 1024],
    [1024, 768],
    [1440, 900],
    [1920, 1080],
    [844, 390],
  ]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => scrollTo(0, 0));
    await page.evaluate(() => document.fonts.ready);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      ),
      false,
      `Overflow ${width}x${height}`,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "artifacts/qa/editorial-mobile.png" });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".editorial-home")).toHaveClass(/motion-ready/);
  passed.push(
    "Responsive widths, landscape-phone layout and live motion preference changes",
  );
  const fallback = await browser.newPage({
    viewport: { width: 390, height: 844 },
  });
  await fallback.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type === "webgl" ||
        type === "webgl2" ||
        type === "experimental-webgl"
        ? null
        : original.call(this, type, ...args);
    };
  });
  await fallback.goto("http://127.0.0.1:4175/");
  await fallback.locator(".storm-chapter").scrollIntoViewIfNeeded();
  await expect(fallback.locator(".storm-chapter")).toHaveAttribute(
    "data-fallback",
    "true",
  );
  await expect(fallback.locator(".storm-copy a")).toBeVisible();
  await fallback.close();
  passed.push(
    "Unavailable-WebGL fallback preserves content and contact action",
  );
  assert.deepEqual(errors, []);
  await writeFile(
    "artifacts/qa/scenery-results.json",
    JSON.stringify({ passed, errors }, null, 2),
  );
  console.log(JSON.stringify({ passed, errors }, null, 2));
} finally {
  await browser.close();
  server.close();
}
