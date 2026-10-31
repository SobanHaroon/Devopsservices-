import { existsSync } from "node:fs";
import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { serve } from "./local-server.mjs";
import assert from "node:assert/strict";
import AxeBuilder from "@axe-core/playwright";
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
const errors = [],
  results = [];
await mkdir("artifacts/qa", { recursive: true });
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const modelRequests = [];
  page.on("request", (request) => {
    if (/\/models\/|CharacterScene-/.test(request.url()))
      modelRequests.push(request.url());
  });
  page.on("pageerror", (e) => errors.push(e.message));
  let requestBody = "",
    requests = 0,
    responseCode = 503;
  await page.route("https://ntfy.sh/contact-devops", async (route) => {
    requestBody = route.request().postData() || "";
    requests++;
    await route.fulfill({
      status: responseCode,
      contentType: "application/json",
      body: responseCode === 200 ? "{}" : '{"error":"mocked failure"}',
    });
  });
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    "Built with character.",
  );
  await expect(page.locator("#team, .crew-card")).toHaveCount(0);
  assert.equal(
    modelRequests.length,
    0,
    "Homepage must not fetch legacy character models",
  );
  results.push(
    "Editorial homepage has no team section or legacy model downloads",
  );
  await page.goto("http://127.0.0.1:4173/team#kai");
  await expect(page.locator("h1")).toHaveText("Meet our team.");
  await expect(page.locator("#kai")).toBeInViewport();
  await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
    "href",
    "http://127.0.0.1:4173/team",
  );
  await expect(page.locator("#kael")).toContainText("Muhammad Soban");
  await expect(page.locator("#kael")).toContainText("CEO & Founder");
  await expect(page.locator(".team-cast-note")).toContainText(
    "studio characters",
  );
  await expect(page.locator(".team-chapter")).toHaveCount(3);
  for (const name of ["kael", "kai", "milo"]) {
    const art = page.locator(`#${name} .character-art`);
    await art.scrollIntoViewIfNeeded();
    const scene = art.locator(".character-webgl");
    await expect(scene).toHaveAttribute("data-loaded", "true");
    await expect(art.getByRole("button")).toHaveCount(0);
    await art.hover();
    await expect(scene).toHaveAttribute("data-interacting", "true");
    await expect(page.locator(".motion-control")).toHaveCount(0);
    await expect(scene).toHaveAttribute("data-animating", "true");
    const beforePose = await scene.getAttribute("data-pose");
    await page.evaluate(() => scrollBy({ top: 100, behavior: "instant" }));
    await expect
      .poll(() => scene.getAttribute("data-pose"))
      .not.toBe(beforePose);
  }
  await page.reload();
  await expect(page.locator("#kai")).toBeInViewport();
  await page.getByRole("link", { name: "Back to home", exact: true }).click();
  await expect(page.locator("h1")).toHaveAccessibleName(
    "Built with character.",
  );
  await page.goBack();
  await expect(page.locator("h1")).toHaveText("Meet our team.");
  await page.goForward();
  await expect(page.locator("h1")).toHaveAccessibleName(
    "Built with character.",
  );
  results.push(
    "Team direct/hash routes, three profiles, scroll/hover poses, continuous motion, refresh and Back/Forward",
  );
  const card = page.getByRole("link", {
    name: "View case study: Atelier Noir",
    exact: true,
  });
  await card.scrollIntoViewIfNeeded();
  const beforeY = await page.evaluate(() => scrollY);
  for (let i = 0; i < 3; i++) {
    await card.click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Atelier Noir",
    );
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
      "href",
      "http://127.0.0.1:4173/case-studies/atelier-noir",
    );
    await page.goBack();
    await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
      "Built with character.",
    );
    await expect
      .poll(() => page.evaluate(() => scrollY))
      .toBeGreaterThan(beforeY - 200);
    await page.goForward();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Atelier Noir",
    );
    await page
      .getByRole("link", { name: "Back to all work", exact: true })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "The work, up close.",
    );
    await page.getByRole("link", { name: "Back to home", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
      "Built with character.",
    );
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
      "href",
      "http://127.0.0.1:4173/",
    );
    await expect(page.locator("#case-study-jsonld")).toHaveCount(0);
  }
  results.push(
    "Repeated case-study Back/Forward, list return, home return and metadata reset",
  );
  await page.goto("http://127.0.0.1:4173/case-studies/atelier-noir");
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Atelier Noir",
  );
  await page
    .getByRole("link", { name: "Start a project", exact: true })
    .click();
  await expect(page.locator("#contact")).toBeInViewport();
  await page.goto("http://127.0.0.1:4173/case-studies/missing-project");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Project not found.",
  );
  await page.getByRole("link", { name: "Back to all work" }).click();
  await page.getByRole("button", { name: "E-commerce", exact: true }).click();
  await expect(page.locator(".work-card")).toHaveCount(2);
  results.push(
    "Direct routes, refresh, missing-project recovery, contact hash navigation and category filter",
  );
  await page.goto("http://127.0.0.1:4173/");
  await page
    .locator(".contract-card")
    .filter({ has: page.getByRole("heading", { name: "Weekly", exact: true }) })
    .getByRole("button")
    .click();
  await expect(
    page.locator('input[value="white-label-partnership"]'),
  ).toBeChecked();
  await expect(page.locator("select[name=contractBasis]")).toHaveValue(
    "weekly",
  );
  await expect(page.locator("select[name=budget]")).toHaveCount(0);
  await page.getByLabel("Full Name", { exact: false }).fill("QA Test");
  await page
    .getByLabel("Email Address", { exact: false })
    .fill("qa@example.com");
  await page.getByLabel("Company Name", { exact: false }).fill("Test agency");
  await page.locator("select[name=country]").selectOption("Pakistan");
  await page.locator("select[name=industry]").selectOption({ index: 1 });
  await page
    .locator("textarea[name=description]")
    .fill("Automated test. No live message should be sent.");
  await page
    .getByRole("button", { name: "Send project brief", exact: true })
    .click();
  await expect(page.getByRole("alert")).toBeVisible();
  await expect(page.getByLabel("Full Name", { exact: false })).toHaveValue(
    "QA Test",
  );
  responseCode = 200;
  await page
    .getByRole("button", { name: "Send project brief", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Your brief is on its way." }),
  ).toBeVisible();
  assert.match(requestBody, /Pricing: Contract based/);
  assert.match(requestBody, /Contract basis: Weekly/);
  assert.match(requestBody, /White-label partnership/);
  assert.equal(requests, 2);
  await page.getByRole("button", { name: "Start another brief" }).click();
  await expect(page.getByLabel("Full Name", { exact: false })).toHaveValue("");
  await page.locator("input[value=web-development]").check();
  await page.locator("input[value=PKR]").check();
  await page.locator("select[name=budget]").selectOption("0");
  await expect(page.locator("select[name=budget] option:checked")).toHaveText(
    "Rs. 35,000 - 50,000",
  );
  results.push(
    "White-label selection, weekly contract payload, failure recovery, successful mocked delivery, reset and PKR budget",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://127.0.0.1:4173/");
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    );
    assert.equal(overflow, false, "Overflow at " + width);
    const broken = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => i.getAttribute("src")),
      );
    assert.deepEqual(broken, []);
    for (const lang of ["JP", "FR", "DE", "EN"]) {
      await page
        .getByRole("combobox", { name: "Language", exact: true })
        .selectOption(lang);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        ),
        false,
        lang + " overflow at " + width,
      );
      const lineOverflow = await page
        .locator(".ed-hero-copy h1")
        .evaluate((el) => el.scrollWidth > el.clientWidth + 1);
      assert.equal(
        lineOverflow,
        false,
        lang + " headline overflow at " + width,
      );
    }
  }
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://127.0.0.1:4173/team");
    for (const lang of ["JP", "FR", "DE", "EN"]) {
      await page
        .getByRole("combobox", { name: "Language", exact: true })
        .selectOption(lang);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        ),
        false,
        `Team ${lang} overflow at ${width}`,
      );
      assert.equal(
        await page
          .locator("h1")
          .evaluate((el) => el.scrollWidth > el.clientWidth + 1),
        false,
        `Team ${lang} heading overflow at ${width}`,
      );
    }
  }
  await page.goto("http://127.0.0.1:4173/");
  results.push(
    "320 / 390 / 768 / 1024 / 1440 responsive widths and EN / JP / FR / DE headline layouts",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: /Open navigation/ }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: /Open navigation/ }),
  ).toBeFocused();
  await page.getByRole("button", { name: /Open navigation/ }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page.locator("#case-studies")).toBeInViewport();
  assert.notEqual(
    await page.evaluate(() => document.body.style.overflow),
    "hidden",
  );
  results.push(
    "Mobile menu focus, Escape, anchor navigation and scroll unlock",
  );
  const reduced = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  await reduced.goto("http://127.0.0.1:4173/team", {
    waitUntil: "domcontentloaded",
  });
  await expect(reduced.locator(".motion-control")).toHaveCount(0);
  await expect(reduced.locator(".character-poster")).toHaveCount(3);
  assert.equal(
    await reduced
      .locator(".character-kael .character-poster")
      .evaluate((el) => el.complete && el.naturalWidth > 0),
    true,
  );
  await expect
    .poll(() =>
      reduced
        .locator(".team-film video")
        .evaluateAll(
          (items) =>
            items.length === 3 &&
            items.every((v) => !v.paused && v.currentTime > 0),
        ),
    )
    .toBe(true);
  await reduced.screenshot({ path: "artifacts/qa/reduced-motion.png" });
  await reduced.close();
  const noWebgl = await browser.newPage({
    viewport: { width: 390, height: 844 },
  });
  await noWebgl.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (
        type === "webgl" ||
        type === "webgl2" ||
        type === "experimental-webgl"
      )
        return null;
      return original.call(this, type, ...args);
    };
  });
  await noWebgl.goto("http://127.0.0.1:4173/team#kael", {
    waitUntil: "domcontentloaded",
  });
  await expect(
    noWebgl.locator(".character-kael .character-poster"),
  ).toBeVisible();
  assert.equal(
    await noWebgl
      .locator(".character-kael .character-poster")
      .evaluate(
        (el) => el.naturalWidth > 0 && getComputedStyle(el).opacity === "1",
      ),
    true,
  );
  await noWebgl.close();
  results.push(
    "Reduced-motion interface preferences, ambient autoplay and unavailable-WebGL fallbacks",
  );
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "/",
      "/team",
      "/case-studies",
      "/case-studies/atelier-noir",
      "/digital-marketing",
    ]) {
      await page.goto("http://127.0.0.1:4173" + route, {
        waitUntil: "domcontentloaded",
      });
      for (
        let y = 0;
        y < (await page.evaluate(() => document.body.scrollHeight));
        y += 800
      ) {
        await page.evaluate(
          (y) => window.scrollTo({ top: y, behavior: "instant" }),
          y,
        );
        await page.waitForTimeout(80);
      }
      await page.waitForTimeout(700);
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const issues = audit.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      }));
      await writeFile(
        "artifacts/qa/axe-" +
          width +
          "-" +
          (route.replaceAll("/", "_") || "home") +
          ".json",
        JSON.stringify(issues, null, 2),
      );
      assert.deepEqual(issues, [], "Accessibility " + width + " " + route);
    }
  }
  results.push(
    "WCAG A/AA automated accessibility: home, legacy team, directory, Atelier Noir and digital marketing at desktop/mobile widths",
  );
  assert.deepEqual(errors, []);
  console.log(
    JSON.stringify({ passed: results, errors, liveMessagesSent: 0 }, null, 2),
  );
  await writeFile(
    "artifacts/qa/results.json",
    JSON.stringify({ passed: results, errors, liveMessagesSent: 0 }, null, 2),
  );
} finally {
  await browser.close();
  server.close();
}
