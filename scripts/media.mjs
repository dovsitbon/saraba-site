// Classe les photos (assets/raw/) dans assets/<catégorie>/ avec des noms lisibles,
// puis les prépare pour le web dans public/media/<catégorie>/ (next/image sert ensuite AVIF/WebP à la bonne taille).
//   npm run media
//
// Photos disponibles au 10 novembre 2026 : deux photos publiques du lieu (fiche Google), aucune photo de plat.
// Pour ajouter vos photos prises sur place : déposez le fichier dans assets/raw/ (saraba_<nom>.jpg), ajoutez une ligne
// dans PICKS (source, catégorie, nom), relancez npm run media, puis indiquez le chemin /media/<catégorie>/<nom>.jpg
// dans data/carte.json (plats) ou dans app/[lang]/page.tsx (hero, blocs).
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");

// [source (dans assets/), catégorie, nom, recadrage éventuel { left, top, width, height }]
const PICKS = [
  ["raw/saraba_ardoise-salle-nuit.jpg", "hero", "salle-ardoise-nuit"],
  ["raw/saraba_ardoise-salle-nuit.jpg", "plats", "ardoise-plats", { left: 196, top: 520, width: 400, height: 500 }],
  ["raw/saraba_ardoise-salle-nuit.jpg", "salle", "salle-masques-bambou", { left: 560, top: 300, width: 440, height: 560 }],
  ["raw/saraba_chevalet-rue.jpg", "facade", "chevalet-rue"],
];

const sizes = {};
for (const [src, cat, name, crop] of PICKS) {
  const file = path.join(ROOT, "assets", src);
  await mkdir(path.join(ROOT, "assets", cat), { recursive: true });
  await mkdir(path.join(ROOT, "public/media", cat), { recursive: true });
  let pipe = sharp(file).rotate();
  if (crop) pipe = pipe.extract(crop);
  const buf = await pipe.toBuffer();
  await sharp(buf).jpeg({ quality: 92 }).toFile(path.join(ROOT, "assets", cat, `${name}.jpg`));
  const info = await sharp(buf)
    .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(ROOT, "public/media", cat, `${name}.jpg`));
  sizes[`/media/${cat}/${name}.jpg`] = [info.width, info.height];
}
// Emplacements prévus pour les photos à prendre sur place
for (const dir of ["a-photographier/plats", "a-photographier/salle", "a-photographier/facade", "a-photographier/hero"]) await mkdir(path.join(ROOT, "assets", dir), { recursive: true });

// Image de partage (Open Graph) 1200 × 630 : texte sur crème, la salle le soir à droite
const room = await sharp(path.join(ROOT, "assets/raw/saraba_ardoise-salle-nuit.jpg")).rotate().resize(520, 630, { fit: "cover", position: "top" }).toBuffer();
const wax = Array.from({ length: 14 }, (_, i) => `<path d="M${64 + i * 26} 150l13-13 13 13" fill="none" stroke="#B5552D" stroke-width="1.6"/>`).join("");
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="680" height="630">
  ${wax}
  <text x="64" y="218" font-family="Georgia, serif" font-size="22" letter-spacing="5" fill="#9A4523">RESTAURANT AFRICAIN · AMIENS</text>
  <text x="64" y="320" font-family="Georgia, serif" font-size="96" letter-spacing="10" fill="#2A1B14">SARABA</text>
  <text x="64" y="392" font-family="Georgia, serif" font-size="40" fill="#2A1B14">Un voyage dans l'assiette</text>
  <text x="64" y="470" font-family="Arial, sans-serif" font-size="22" fill="#5C463A">Mafé · Yassa · Thiou gombo · Poisson du jour</text>
  <text x="64" y="506" font-family="Arial, sans-serif" font-size="22" fill="#5C463A">13 rue des Majots, Saint-Leu · mar.–sam. dès 19 h</text>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#F7EFE2" } })
  .composite([
    { input: room, left: 680, top: 0 },
    { input: text, left: 0, top: 0 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));

await writeFile(path.join(ROOT, "data/media-sizes.json"), JSON.stringify(sizes, null, 1) + "\n");
console.log(`${PICKS.length} images prêtes`);
