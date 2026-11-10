// Génère CONTENU.md : tous les textes du site (fr, en) et la carte avec les prix, pour validation.
//   npm run contenu
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const load = async (f) => JSON.parse(await readFile(path.join(ROOT, f), "utf8"));
const L = { fr: await load("locales/fr.json"), en: await load("locales/en.json") };
const carte = await load("data/carte.json");
const site = await load("data/site.json");
const horaires = await load("data/horaires.json");
const annonces = await load("data/annonces.json");

const out = [];
const p = (s = "") => out.push(s);
const eur = (n) => (n === null || n === undefined ? "prix en salle (à remplir)" : `${Number.isInteger(n) ? n : n.toFixed(2).replace(".", ",")} €`);

p("# Saraba Restaurant Africain : contenu du site, pour validation");
p();
p("Tous les textes en français et en anglais, et la carte avec les prix. Les points **À VALIDER** sont à confirmer avec le restaurant.");
p("Fichier généré par `npm run contenu` à partir de `locales/*.json` et `data/*.json` : modifiez ces fichiers, pas celui-ci.");
p();
p("## Titre du hero : 3 propositions");
p();
p("1. **Un voyage dans l'assiette** (retenu sur le site : la formule revient dans les avis Google)");
p("2. **Le goût du Sénégal, rue des Majots**");
p("3. **Mafé, yassa et sourires**");
p();
p("Pour changer : `locales/fr.json` → `hero.title` (et `locales/en.json`).");
p();
p("## À valider en priorité");
p();
p(`- **Téléphone** : le site affiche ${site.phone} (numéro du brief). Une ancienne page du restaurant (eatbu) indique 03 22 85 17 69 : lequel est le bon ?`);
p("- **Prix** : relevés sur l'ardoise visible sur une photo publique (Google). Ils ont pu changer.");
p("- **« Bourekhé »** (poisson, 18 €) : intitulé mal lisible sur l'ardoise, à confirmer.");
p("- **Boissons** : jus maison (bissap, gingembre ?), sodas, eaux, boissons chaudes : liste et prix à remplir.");
p("- **Horaires** : du mardi au samedi, 19 h – minuit (brief). Fermetures du 25 décembre et du 1er janvier supposées.");
p("- **Mentions légales** : Le Saraba, RCS Amiens 823 315 643, M. Matar Diallo : relevés sur l'ancienne page eatbu, à confirmer ; SIRET à fournir.");
p("- **Avis clients** : aucun avis n'a été inventé. La section affiche la note Google et un lien ; à remplir avec de vrais avis (`data/avis.json`) si le restaurant le souhaite.");
p("- **Réservation en ligne** : le formulaire envoie un e-mail via Resend. Clés à configurer sur Vercel (`RESEND_API_KEY`, `BOOKING_NOTIFY_EMAIL`, `RESEND_FROM`). En attendant, il invite à appeler.");
p();

p("## Carte et prix");
p();
for (const c of carte.categories) {
  p(`### ${L.fr.carte.categories[c.id]} · ${L.en.carte.categories[c.id]}`);
  p();
  p(`_${L.fr.carte.intro[c.id]}_`);
  p();
  p("| Plat (fr) | Description | Prix sur place | À emporter | English |");
  p("|---|---|---|---|---|");
  for (const id of c.items) {
    const it = carte.items[id];
    const t = (l) => L[l].carte.items[id];
    const price = (it.from && it.price != null ? "à partir de " : "") + eur(it.price);
    p(`| ${t("fr").name}${it.confirm ? " **À VALIDER**" : ""} | ${t("fr").desc} | ${price} | ${it.takeaway ? eur(it.takeaway) : ""} | ${t("en").name} |`);
  }
  p();
}

p("## Horaires (data/horaires.json)");
p();
const days = L.fr.infos.days;
for (let i = 1; i <= 7; i++) {
  const s = horaires.week[String(i)] ?? [];
  p(`- ${days[i - 1]} : ${s.length ? s.map(([a, b]) => `${a} – ${b === "24:00" ? "minuit" : b}`).join(", ") : "fermé"}`);
}
for (const e of horaires.exceptions ?? []) p(`- Exception ${e.date} : ${e.closed ? "fermé" : JSON.stringify(e)}`);
p();
p("## Bandeau d'annonces (data/annonces.json)");
p();
for (const a of [...annonces.items, annonces.default]) {
  p(`- **${a.id ?? "défaut"}**${a.from ? ` (${a.from} → ${a.to})` : " (par défaut)"}${a.active === false ? " · désactivée" : ""}`);
  p(`  - fr : ${a.fr}`);
  p(`  - en : ${a.en}`);
}
p();

const SKIP = new Set(["carte.items", "alt"]);
const get = (o, key) => key.split(".").reduce((x, k) => (x == null ? "" : x[k]), o) ?? "";
function walk(obj, key) {
  if (SKIP.has(key)) return;
  if (typeof obj === "string") {
    p(`- \`${key}\``);
    for (const l of ["fr", "en"]) p(`  - ${l} : ${String(get(L[l], key)).replace(/\n/g, " ⏎ ")}`);
    return;
  }
  if (Array.isArray(obj)) return obj.forEach((v, i) => walk(v, `${key}.${i}`));
  if (obj && typeof obj === "object") for (const k of Object.keys(obj)) walk(obj[k], key ? `${key}.${k}` : k);
}
p("## Tous les textes du site");
for (const section of Object.keys(L.fr)) {
  p();
  p(`### ${section}`);
  p();
  walk(L.fr[section], section);
}
p();
p("## Textes alternatifs des photos");
p();
for (const k of Object.keys(L.fr.alt)) p(`- \`${k}\` · fr : ${L.fr.alt[k]} · en : ${L.en.alt[k]}`);

await writeFile(path.join(ROOT, "CONTENU.md"), out.join("\n") + "\n");
console.log("CONTENU.md :", out.length, "lignes");
