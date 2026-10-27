import { spawn } from "node:child_process";
import { serve } from "./local-server.mjs";
const before = process.argv.includes("--before");
const team = process.argv.includes("--team");
const server = await serve(before ? "../devops-before/dist" : "dist", 4174);
const script = process.env.TASTE_SKILL_ROOT + "/scripts/inspect.mjs";
const args = [
  script,
  `http://127.0.0.1:4174${team ? "/team" : ""}`,
  "--out",
  before
    ? ".taste-skill/before"
    : team
      ? ".taste-skill/team/after"
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
