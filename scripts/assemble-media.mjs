import { createHash } from "node:crypto";
import { readFile, mkdir, writeFile, rename } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const manifest = JSON.parse(
  await readFile(resolve(root, "media-source/manifest.json"), "utf8"),
);

for (const film of manifest) {
  const parts = await Promise.all(
    film.parts.map((part) => readFile(resolve(root, part))),
  );
  const bytes = Buffer.concat(parts);
  const hash = createHash("sha256").update(bytes).digest("hex");
  if (bytes.length !== film.bytes || hash !== film.sha256) {
    throw new Error(
      `Campaign film failed integrity verification: ${film.target}`,
    );
  }
  const target = resolve(root, film.target);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target + ".tmp", bytes);
  await rename(target + ".tmp", target);
  console.log(`Assembled and verified ${film.target} (${bytes.length} bytes)`);
}
