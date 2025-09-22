import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDirectory = path.resolve(__dirname, "dist");
const port = Number(process.env.PORT ?? 4173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json; charset=utf-8",
};

async function ensureDistFolder() {
  try {
    const stats = await fs.stat(distDirectory);
    return stats.isDirectory();
  } catch (error) {
    console.warn(
      "⚠️  A pasta 'dist' não foi encontrada. Execute 'npm run build' antes de iniciar o servidor."
    );
    return false;
  }
}

function sanitizeRequestUrl(requestUrl) {
  const [urlPath] = requestUrl.split("?");
  const decodedPath = decodeURIComponent(urlPath);
  const normalizedPath = path.posix
    .normalize(decodedPath)
    .replace(/^\/+/, "");

  if (normalizedPath === "" || normalizedPath === ".") {
    return "index.html";
  }

  if (normalizedPath.includes("..")) {
    return "index.html";
  }

  return normalizedPath;
}

async function readFileSafe(filePath) {
  try {
    return await fs.readFile(filePath);
  } catch (error) {
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Requisição inválida");
    return;
  }

  const sanitizedPath = sanitizeRequestUrl(req.url);
  let absolutePath = path.join(distDirectory, sanitizedPath);
  let fileBuffer = await readFileSafe(absolutePath);

  if (!fileBuffer) {
    absolutePath = path.join(distDirectory, "index.html");
    fileBuffer = await readFileSafe(absolutePath);
  }

  if (!fileBuffer) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Arquivo não encontrado. Certifique-se de executar 'npm run build'.");
    return;
  }

  const extension = path.extname(absolutePath).toLowerCase();
  const contentType = mimeTypes[extension] ?? "application/octet-stream";

  res.writeHead(200, { "Content-Type": contentType });
  res.end(fileBuffer);
});

ensureDistFolder().then(() => {
  server.listen(port, () => {
    console.log(`🚀 Servidor estático disponível em http://localhost:${port}`);
    console.log("Pressione CTRL+C para encerrar o servidor.");
  });
});
