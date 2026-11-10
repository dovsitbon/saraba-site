import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import carte from "@/data/carte.json";
import { fill, getDict, isLocale, locales, type Dict, type Locale } from "@/lib/i18n";
import { formatDay } from "@/lib/format";
import { img } from "@/lib/media";
import { PAGE_IDS, pageOfSlug, pagePath, SLUGS, type PageId } from "@/lib/pages";
import { pageJsonLd } from "@/lib/jsonld";
import { Menu } from "@/components/Menu";
import { OpenStatus } from "@/components/OpenStatus";
import { Rating } from "@/components/Rating";
import { WaxBand } from "@/components/WaxBand";
import { BagIcon, GiftIcon, PhoneIcon, PinIcon } from "@/components/icons";

export function generateStaticParams() {
  return locales.flatMap((lang) => PAGE_IDS.map((id) => ({ lang, slug: SLUGS[id][lang] })));
}
export const dynamicParams = false;

function resolve(lang: string, slug: string): { lang: Locale; id: PageId } | null {
  if (!isLocale(lang)) return null;
  const id = pageOfSlug(slug, lang);
  return id ? { lang, id } : null;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const r = resolve(l, slug);
  if (!r) return {};
  const d = getDict(r.lang);
  const p = d.pages[r.id];
  const description = "metaDescription" in p ? p.metaDescription : d.meta.description;
  return {
    title: p.metaTitle,
    description,
    alternates: {
      canonical: pagePath(r.id, r.lang),
      languages: { ...Object.fromEntries(locales.map((x) => [x, pagePath(r.id, x)])), "x-default": pagePath(r.id, "fr") },
    },
    openGraph: { title: p.metaTitle, description, url: pagePath(r.id, r.lang), images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
    robots: r.id === "legal" ? { index: false, follow: true } : undefined,
  };
}

function Actions({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href={`/${lang}#reserver`} className="btn">
        {d.nav.bookCta}
      </Link>
      <a href={`tel:${site.phoneIntl}`} className="btn-line">
        <PhoneIcon />
        {d.nav.call}
      </a>
      <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-line">
        <PinIcon />
        {d.nav.directions}
      </a>
    </div>
  );
}

function Carte({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <div className="px-6 pt-14 pb-24 md:px-10 md:pt-20 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">{d.carte.eyebrow}</p>
            <h1 className="display mt-3 text-[2.75rem] md:text-[4rem]">{d.pages.carte.title}</h1>
            <p className="lead mt-4">{d.carte.lead}</p>
            <div className="mt-4 flex flex-col gap-1 text-[0.9375rem] text-muted">
              <Rating d={d} lang={lang} />
              <OpenStatus />
            </div>
          </div>
          <WaxBand count={10} />
        </header>
        <div className="mt-12">
          <Menu headingLevel={2} />
        </div>
        <p className="mt-8 flex items-start gap-3 rounded-2xl bg-ocre-soft/70 px-5 py-4 text-[0.9375rem]">
          <BagIcon className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-ink" />
          {d.carte.takeawayNote}
        </p>
        <p className="mt-6 text-[0.8125rem] text-muted">{fill(d.carte.checked, { date: formatDay(carte.checked, lang, { day: "numeric", month: "long", year: "numeric" }) })}</p>
        <div className="mt-12">
          <Actions lang={lang} d={d} />
        </div>
      </div>
    </div>
  );
}

/** Pages SEO locales : « Restaurant africain à Amiens », « Mafé à Amiens ». */
function Seo({ lang, d, id }: { lang: Locale; d: Dict; id: "africain" | "mafe" }) {
  const p = d.pages[id];
  const photo = img(id === "mafe" ? "/media/plats/ardoise-plats.jpg" : "/media/hero/salle-ardoise-nuit.jpg");
  const alt = id === "mafe" ? d.blocks.specialites.imageAlt : d.hero.imageAlt;
  return (
    <article className="px-6 pt-14 pb-24 md:px-10 md:pt-20 md:pb-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[3fr_2fr] md:gap-20">
        <div>
          <p className="eyebrow">{p.eyebrow}</p>
          <h1 className="display mt-3 text-[2.75rem] md:text-[3.75rem]">{p.title}</h1>
          <p className="lead mt-5">{p.lead}</p>
          <div className="mt-5 flex flex-col gap-1 text-[0.9375rem] text-muted">
            <Rating d={d} lang={lang} />
            <OpenStatus />
          </div>
          {p.sections.map((s) => (
            <section key={s.h} className="mt-12">
              <h2 className="display text-[1.75rem] md:text-[2rem]">{s.h}</h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted">{s.p}</p>
            </section>
          ))}
          <div className="mt-12">
            <Actions lang={lang} d={d} />
          </div>
          <p className="mt-8 text-[0.9375rem]">
            <Link href={pagePath("carte", lang)} className="link-line">
              {d.carte.seeAll}
            </Link>
            <span className="mx-3 text-muted">·</span>
            <Link href={pagePath(id === "mafe" ? "africain" : "mafe", lang)} className="link-line">
              {id === "mafe" ? d.footer.africain : d.footer.mafe}
            </Link>
          </p>
        </div>
        <div className="md:pt-24">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-nuit md:sticky md:top-28">
            <Image src={photo.src} alt={alt} width={photo.width} height={photo.height} sizes="(min-width: 768px) 36vw, 100vw" quality={75} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </article>
  );
}

function Gift({ lang, d }: { lang: Locale; d: Dict }) {
  const p = d.pages.gift;
  return (
    <div className="px-6 pt-14 pb-24 md:px-10 md:pt-20 md:pb-32">
      <div className="mx-auto max-w-5xl">
        <GiftIcon className="h-8 w-8 text-terracotta-ink" />
        <p className="eyebrow mt-6">{p.eyebrow}</p>
        <h1 className="display mt-3 text-[2.75rem] md:text-[4rem]">{p.title}</h1>
        <p className="lead mt-5 max-w-2xl">{p.lead}</p>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {p.steps.map((s, i) => (
            <li key={s.h} className="rounded-3xl border border-line bg-paper p-7">
              <span className="display text-[2.5rem] leading-none text-terracotta">{i + 1}</span>
              <h2 className="display mt-4 text-[1.5rem]">{s.h}</h2>
              <p className="mt-2 text-muted">{s.p}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href={`tel:${site.phoneIntl}`} className="btn">
            <PhoneIcon />
            {d.nav.call} · {site.phone}
          </a>
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-line">
            <PinIcon />
            {d.nav.directions}
          </a>
        </div>
        <p className="mt-6 text-[0.875rem] text-muted">{p.note}</p>
        <WaxBand className="mt-14" count={12} />
        <p className="mt-6">
          <Link href={pagePath("carte", lang)} className="link-line">
            {d.carte.seeAll}
          </Link>
        </p>
      </div>
    </div>
  );
}

function Legal({ d }: { d: Dict }) {
  const p = d.pages.legal;
  const pending = <em className="text-muted not-italic">{p.pending}</em>;
  const blocks: [string, React.ReactNode][] = [
    [p.editor, p.editorText],
    [p.company, site.legal.company || pending],
    [p.rcs, site.legal.rcs || pending],
    [p.siret, site.legal.siret || pending],
    [p.director, site.legal.director || pending],
    [p.host, site.legal.host],
    [p.data, p.dataText],
    [p.cookies, p.cookiesText],
    [p.photos, p.photosText],
  ];
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="display text-[2.75rem] md:text-[3.5rem]">{p.title}</h1>
      {blocks.map(([title, body]) => (
        <section key={title} className="mt-10">
          <h2 className="text-terracotta-ink">{title}</h2>
          <p className="mt-2 leading-relaxed">{body}</p>
        </section>
      ))}
    </div>
  );
}

export default async function Page({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang: l, slug } = await params;
  const r = resolve(l, slug);
  if (!r) notFound();
  const d = getDict(r.lang);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd(r.lang, r.id)) }} />
      {r.id === "carte" && <Carte lang={r.lang} d={d} />}
      {(r.id === "africain" || r.id === "mafe") && <Seo lang={r.lang} d={d} id={r.id} />}
      {r.id === "gift" && <Gift lang={r.lang} d={d} />}
      {r.id === "legal" && <Legal d={d} />}
    </>
  );
}
