import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { dirname, resolve, relative } from "node:path";
const source = resolve("node_modules/three-storm"),
  destination = resolve("public/vendor/storm"),
  seen = new Set();
async function copy(path) {
  if (seen.has(path)) return;
  seen.add(path);
  const contents = await readFile(path, "utf8"),
    out = resolve(destination, relative(source, path));
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, contents);
  for (const match of contents.matchAll(
    /(?:from\s*|import\s*)['"]([^'"]+)['"]/g,
  )) {
    if (match[1].startsWith(".")) await copy(resolve(dirname(path), match[1]));
  }
}
await copy(resolve(source, "build/three.module.js"));
for (const name of [
  "postprocessing/EffectComposer",
  "postprocessing/RenderPass",
  "postprocessing/UnrealBloomPass",
  "postprocessing/ShaderPass",
  "shaders/GammaCorrectionShader",
  "shaders/CopyShader",
])
  await copy(resolve(source, "examples/jsm/" + name + ".js"));
await copyFile(resolve(source, "LICENSE"), resolve(destination, "LICENSE"));
console.log("Vendored " + seen.size + " r143 modules.");
