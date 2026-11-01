import { spawn } from "node:child_process";
import { serve } from "./local-server.mjs";
const before = process.argv.includes("--before");
const marketing = process.argv.includes("--marketing");
const server = await serve(before ? "../devops-before/dist" : "dist", 4174);
const script = process.env.TASTE_SKILL_ROOT + "/scripts/inspect.mjs";
const args = [
  script,
  "--allow",
  "eyebrow,numbering,micro-label,hairline,dashed,mixed-font-headline,blend-text,small-text",
  `http://127.0.0.1:4174${marketing ? "/digital-marketing" : ""}`,
  "--out",
  before
    ? ".taste-skill/before"
    : marketing
      ? ".taste-skill/marketing/after"
      : ".taste-skill/after",
];
const child = spawn(process.execPath, args, {
  stdio: "inherit",
  env: {
    ...process.env,
    TASTE_SKILL_NO_SANDBOX: "1",
    CHROME_PATH:
      process.env.PLAYWRIGHT_CHROME ||
      "/tmp/codex-playwright-chromium/chromium",
  },
});
child.on("exit", (code) => {
  server.close();
  process.exitCode = code || 0;
});
