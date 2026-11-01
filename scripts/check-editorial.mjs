import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import assert from "node:assert/strict";
import AxeBuilder from "@axe-core/playwright";
import { serve } from "./local-server.mjs";
const server = await serve();
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROME ||
    (existsSync("/tmp/codex-playwright-chromium/chromium")
      ? "/tmp/codex-playwright-chromium/chromium"
      : undefined),
  headless: true,
  args: ["--no-sandbox", "--enable-unsafe-swiftshader"],
});
const results = [],
  errors = [],
  missing = [],
  axeResults = [];
const base = "http://127.0.0.1:4173";
const record = results.push.bind(results);
results.push = (...items) => {
  console.log(...items);
  return record(...items);
};
await mkdir("artifacts/editorial", { recursive: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
page.on("pageerror", (e) => errors.push(e.message));
page.on("response", (r) => {
  if (r.status() === 404) missing.push(r.url());
});
async function capture(name) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForFunction(() =>
    [
      ...document.querySelectorAll(
        "[data-reveal], .heading-clip>span, .word-reveal>span",
      ),
    ]
      .filter((e) => {
        const r = e.getBoundingClientRect();
        return r.top < innerHeight * 0.9 && r.bottom > 0;
      })
      .every((e) => parseFloat(getComputedStyle(e).opacity) > 0.99),
  );
  await page.screenshot({ path: `artifacts/editorial/${name}.png` });
}
async function noOverflow() {
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
    "Page has horizontal overflow",
  );
}
try {
  await page.goto(base, { waitUntil: "networkidle" });
  await expect(page.locator("h1")).toContainText("Distinct by");
  await expect(page.locator("#team")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /pause|play|say hello/i }),
  ).toHaveCount(0);
  const storm = page.frames().find((f) => f.url().includes("/scenes/storm/"));
  assert.ok(storm);
  await storm.waitForFunction(() => window.stormState?.().count === 50000);
  const rotation = await storm.evaluate(() => window.stormState().rotation);
  await storm.waitForFunction(
    (old) => window.stormState().rotation !== old,
    rotation,
  );
  await page.mouse.move(900, 400);
  await storm.waitForFunction(() => window.stormState().activity > 0.1);
  await page.evaluate(() => scrollTo(0, 800));
  await storm.waitForFunction(() => window.stormState().cameraZ < 6.7);
  await page.evaluate(() => scrollTo(0, 0));
  await storm.waitForFunction(() => window.stormState().cameraZ > 6.9);
  await capture("home-desktop");
  results.push(
    "Storm renders 50,000 points, rotates, repels the pointer and dives on scroll.",
  );
  const openMenu = page.getByRole("button", { name: "Menu", exact: true });
  await openMenu.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("html")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(openMenu).toBeFocused();
  await openMenu.click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "02 Digital marketing" })
    .click();
  await expect(page).toHaveURL(base + "/digital-marketing");
  await expect(page.locator("h1")).toContainText("Worth");
  results.push(
    "Menu keyboard dismissal, focus restoration and page navigation.",
  );
  await expect(page.locator("video")).toHaveCount(8);
  await page.waitForFunction(
    () =>
      [...document.querySelectorAll("video")].every(
        (v) => v.readyState >= 2 && !v.paused && v.currentTime > 0,
      ),
    null,
    { timeout: 45000 },
  );
  assert.ok(
    await page
      .locator("video")
      .evaluateAll((vs) =>
        vs.every(
          (v) =>
            v.autoplay &&
            v.loop &&
            v.muted &&
            v.playsInline &&
            !v.controls &&
            v.disablePictureInPicture,
        ),
      ),
  );
  const times = await page
    .locator("video")
    .evaluateAll((vs) => vs.map((v) => v.currentTime));
  await page.waitForFunction(
    (prev) =>
      [...document.querySelectorAll("video")].every(
        (v, i) => v.currentTime !== prev[i],
      ),
    times,
  );
  // Verify each real media file loops at its end rather than stopping.
  await page.locator("video").evaluateAll((vs) =>
    vs.forEach((v) => {
      v.currentTime = v.duration - 0.2;
    }),
  );
  await page.waitForFunction(
    () =>
      [...document.querySelectorAll("video")].every(
        (v) => v.currentTime < 3 && !v.paused,
      ),
    null,
    { timeout: 20000 },
  );
  results.push(
    "All 8 original reels decode, autoplay muted, advance offscreen and loop at their ends with no playback UI.",
  );
  await capture("marketing-desktop");
  await page.getByRole("link", { name: /02 Cielo Noir/ }).click();
  await expect(page.locator("#cielo-noir")).toBeInViewport();
  await capture("cielo-campaign-desktop");
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.locator("#cielo-noir")).toBeInViewport();
  await noOverflow();
  await page.goto(base + "/case-studies", { waitUntil: "networkidle" });
  await expect(page.locator(".work-card")).toHaveCount(5);
  await page.getByRole("button", { name: "E-commerce", exact: true }).click();
  await expect(page.locator(".work-card")).toHaveCount(2);
  await page
    .locator(".work-card")
    .first()
    .getByRole("link", { name: /View case study/ })
    .first()
    .click();
  await expect(page).toHaveURL(/case-studies\/atelier-noir/);
  await expect(page.locator("h1")).toHaveText("Atelier Noir");
  await page.goBack();
  await expect(page.locator("h1")).toBeVisible();
  results.push("Case filtering, detail navigation and browser Back.");
  for (const slug of [
    "atelier-noir",
    "babey-dee-atta-chakki",
    "devops-services",
    "outsource-one",
    "msoban-portfolio",
  ]) {
    await page.goto(base + "/case-studies/" + slug, {
      waitUntil: "networkidle",
    });
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".case-story").first()).toBeVisible();
    await noOverflow();
    await page
      .locator("img")
      .evaluateAll((imgs) => imgs.forEach((i) => (i.loading = "eager")));
    await page.waitForFunction(() =>
      [...document.images].every((i) => i.complete && i.naturalWidth > 0),
    );
  }
  await page.goto(base + "/case-studies/missing");
  await expect(page.locator("h1")).toContainText(/not found/i);
  await page.goto(base + "/team");
  await expect(page).toHaveURL(base + "/#about");
  await expect(page.locator("#about")).toBeInViewport();
  results.push(
    "All five direct project URLs load; missing projects recover and retired team URL redirects to the studio.",
  );
  await page.goto(base + "/#contact", { waitUntil: "networkidle" });
  let body = "",
    count = 0,
    status = 503;
  await page.route("https://ntfy.sh/contact-devops", async (r) => {
    body = r.request().postData() || "";
    count++;
    await r.fulfill({
      status,
      contentType: "application/json",
      body: status === 200 ? "{}" : '{"error":"test failure"}',
    });
  });
  await page.locator("[name=fullName]").fill("Browser QA");
  await page.locator("[name=email]").fill("qa@example.com");
  await page.locator("[name=country]").selectOption("Pakistan");
  await page.locator("[name=industry]").selectOption({ index: 1 });
  await page.locator("[name=budget]").selectOption({ index: 1 });
  await page
    .locator("textarea[name=description]")
    .fill("Local test. No message is sent.");
  await page.locator("button[type=submit]").click();
  await expect(page.locator("#service-error")).toBeVisible();
  assert.equal(count, 0);
  await page.locator('input[value="white-label-partnership"]').check();
  await page.locator("[name=contractBasis]").selectOption("monthly");
  await expect(page.locator("[name=budget]")).toHaveCount(0);
  await page.locator("button[type=submit]").click();
  await expect(page.locator(".form-error[role=alert]")).toBeVisible();
  assert.equal(count, 1);
  status = 200;
  await page.locator("button[type=submit]").click();
  await expect(page.locator(".brief-success")).toBeVisible();
  assert.equal(count, 2);
  assert.match(body, /Contract basis: Monthly/);
  assert.match(body, /Pricing: Contract based/);
  results.push(
    "Form validates services, preserves monthly white-label pricing, handles failed delivery and retries successfully using intercepted requests only.",
  );
  for (const width of [320, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto(base, { waitUntil: "networkidle" });
    await noOverflow();
    await capture("home-" + width);
    await page.goto(base + "/digital-marketing", { waitUntil: "networkidle" });
    await noOverflow();
    await capture("marketing-" + width);
    await page.locator("#babay-dee").scrollIntoViewIfNeeded();
    await expect(page.locator("#babay-dee .campaign-reels")).toBeVisible();
    await capture("reels-" + width);
  }
  results.push(
    "Home and marketing pages fit 320, 390, 768, 1440 and 1920 pixel viewports.",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await capture("mobile-menu");
  await page.getByRole("button", { name: "Close menu" }).click();
  await page.locator(".faq-list summary").first().click();
  await expect(page.locator(".faq-list details").first()).toHaveAttribute(
    "open",
    "",
  );
  await page.locator(".faq-list summary").nth(1).click();
  await expect(page.locator(".faq-list details[open]")).toHaveCount(2);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "networkidle" });
  assert.ok(
    await page
      .locator("[data-reveal]")
      .evaluateAll((es) =>
        es.every((e) => getComputedStyle(e).opacity === "1"),
      ),
  );
  await page.goto(base + "/digital-marketing", { waitUntil: "networkidle" });
  await page.waitForFunction(() =>
    [...document.querySelectorAll("video")].every(
      (v) => !v.paused && v.currentTime > 0,
    ),
  );
  results.push(
    "FAQ opens independently; reduced-motion removes entrance transforms while continuous reels remain enabled as requested.",
  );
  // Full-page accessibility audit. The requested always-moving media has no pause controls.
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const path of [
    "/",
    "/digital-marketing",
    "/case-studies/atelier-noir",
  ]) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    axeResults.push({
      path,
      violations: audit.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
  }
  assert.deepEqual(errors, [], "Browser runtime errors");
  assert.deepEqual(missing, [], "Missing local resources");
  await writeFile(
    "artifacts/editorial/results.json",
    JSON.stringify({ results, errors, missing, axeResults }, null, 2),
  );
  console.log(
    JSON.stringify({ results, errors, missing, axeResults }, null, 2),
  );
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
