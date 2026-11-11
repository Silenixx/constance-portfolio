// Fabrique les versions web des images de public/ vers public/img/.
// Les originaux ne sont pas modifiés. À relancer après l'ajout d'une image :
//   npm run images
// Écrit aussi src/data/images.json (largeur et hauteur de chaque original).
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const outDir = join(publicDir, "img");
const folders = ["projets", "communication", "logos"];
const singles = ["constance.jpeg"];
const widths = [640, 1600];

async function walk(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(path)));
    else if (/\.(png|jpe?g)$/i.test(entry.name)) found.push(path);
  }
  return found;
}

const sources = [
  ...(await Promise.all(folders.map((folder) => walk(join(publicDir, folder))))).flat(),
  ...singles.map((name) => join(publicDir, name)),
];

const sizes = {};
let made = 0;

for (const source of sources) {
  const key = relative(publicDir, source).split(sep).join("/");
  const base = key.slice(0, -extname(key).length);
  const { width, height } = await sharp(source, { limitInputPixels: false }).metadata();
  sizes[`/${key}`] = { w: width, h: height };

  for (const target of widths) {
    const out = join(outDir, `${base}-${target}.webp`);
    const [from, to] = await Promise.all([stat(source), stat(out).catch(() => null)]);
    if (to && to.mtimeMs >= from.mtimeMs) continue;
    await mkdir(dirname(out), { recursive: true });
    await sharp(source, { limitInputPixels: false })
      .rotate()
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality: target > 1000 ? 80 : 74 })
      .toFile(out);
    made += 1;
  }
}

await writeFile(
  join(root, "src", "data", "images.json"),
  `${JSON.stringify(sizes, null, 2)}\n`
);

console.log(`${sources.length} images lues, ${made} fichiers écrits dans public/img/`);
