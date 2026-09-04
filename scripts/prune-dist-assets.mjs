import { existsSync, readdirSync, readFileSync, statSync, unlinkSync } from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";

const distRoot = resolve("dist");
const assetsRoot = resolve(distRoot, "_astro");

if (!assetsRoot.startsWith(`${distRoot}${sep}`) || !existsSync(assetsRoot)) {
  throw new Error("No se encontró el directorio de assets generado dentro de dist.");
}

const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? walk(path) : [path];
});

const textExtensions = new Set([".html", ".css", ".js", ".json", ".xml", ".txt"]);
const generatedFiles = walk(distRoot);
const references = generatedFiles
  .filter((path) => textExtensions.has(extname(path).toLowerCase()))
  .map((path) => readFileSync(path, "utf8"))
  .join("\n");

let removedFiles = 0;
let removedBytes = 0;

for (const path of generatedFiles) {
  if (!path.startsWith(`${assetsRoot}${sep}`)) continue;
  if (extname(path).toLowerCase() !== ".png") continue;

  const publicPath = `/${relative(distRoot, path).split(sep).join("/")}`;
  if (references.includes(publicPath)) continue;

  removedBytes += statSync(path).size;
  unlinkSync(path);
  removedFiles += 1;
}

const removedMegabytes = (removedBytes / 1024 / 1024).toFixed(1);
console.log(`Assets: se eliminaron ${removedFiles} PNG sin referencias (${removedMegabytes} MiB).`);
