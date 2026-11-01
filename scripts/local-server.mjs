import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
export async function serve(root = "dist", port = 4173) {
  const base = resolve(root);
  const types = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".glb": "model/gltf-binary",
    ".woff2": "font/woff2",
    ".webp": "image/webp",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
  };
  const server = createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      let file = resolve(base, "." + pathname);
      if (!file.startsWith(base + sep) && file !== base) {
        res.writeHead(403).end();
        return;
      }
      try {
        if ((await stat(file)).isDirectory())
          file = resolve(file, "index.html");
      } catch {
        if (extname(pathname)) {
          res.writeHead(404).end();
          return;
        }
        file = resolve(base, "index.html");
      }
      const body = await readFile(file);
      const range = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range || "");
      if (range) {
        const start = Number(range[1]);
        const end = Math.min(
          Number(range[2] || body.length - 1),
          body.length - 1,
        );
        if (start > end || start >= body.length) {
          res
            .writeHead(416, { "Content-Range": `bytes */${body.length}` })
            .end();
          return;
        }
        res.writeHead(206, {
          "Content-Type": types[extname(file)] || "application/octet-stream",
          "Content-Length": end - start + 1,
          "Accept-Ranges": "bytes",
          "Content-Range": `bytes ${start}-${end}/${body.length}`,
        });
        res.end(body.subarray(start, end + 1));
        return;
      }
      res.writeHead(200, {
        "Content-Type": types[extname(file)] || "application/octet-stream",
        "Content-Length": body.length,
        "Accept-Ranges": "bytes",
      });
      res.end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((r) => server.listen(port, "127.0.0.1", r));
  return server;
}
