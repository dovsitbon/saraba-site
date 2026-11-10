import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import avis from "@/data/avis.json";
import carte from "@/data/carte.json";
import actualites from "@/data/actualites.json";
import { altOf, fill, getDict, isLocale, type Dict, type Locale } from "@/lib/i18n";
import { formatDay } from "@/lib/format";
import { img } from "@/lib/media";
import { pagePath } from "@/lib/pages";
import { homeJsonLd } from "@/lib/jsonld";
import { Reveal } from "@/components/Reveal";
import { Rating, num } from "@/components/Rating";
import { OpenStatus } from "@/components/OpenStatus";
import { Menu } from "@/components/Menu";
import { BookingForm } from "@/components/BookingForm";
import { WaxBand } from "@/components/WaxBand";
import { HoursTable } from "@/components/HoursTable";
import { Illustration, type IllusId } from "@/components/Illustration";
import { ArrowIcon, BagIcon, CalendarIcon, GroupIcon, MoonIcon, PhoneIcon, PinIcon, StarIcon, WheelchairIcon } from "@/components/icons";

function SectionHead({ eyebrow, title, lead, center = false, id }: { eyebrow: string; title: string; lead?: string; center?: boolean; id?: string }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="display mt-3 text-[2.25rem] md:text-[3rem]">
        {title}
      </h2>
      {lead && <p className="lead mt-4">{lead}</p>}
    </div>
  );
}

type News = { id: string; date: string; active?: boolean; kind: Record<Locale, string>; title: Record<Locale, string>; text: Record<Locale, string>; image: string | null };

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang: l } = await params;
  if (!isLocale(l)) notFound();
  const lang: Locale = l;
  const d = getDict(lang);
  const carteHref = pagePath("carte", lang);

  const hero = img("/media/hero/salle-ardoise-nuit.jpg");
  const ardoise = img("/media/plats/ardoise-plats.jpg");
  const chevalet = img("/media/facade/chevalet-rue.jpg");
  const masques = img("/media/salle/salle-masques-bambou.jpg");

  const tiles: { id: "entrees" | "plats" | "poissons" | "desserts" | "boissons"; illus: IllusId }[] = [
    { id: "entrees", illus: "beignets" },
    { id: "plats", illus: "marmite" },
    { id: "poissons", illus: "poisson" },
    { id: "desserts", illus: "fondant" },
    { id: "boissons", illus: "verre" },
  ];
  const services = [
    { k: "soir", Icon: MoonIcon },
    { k: "reservation", Icon: CalendarIcon },
    { k: "groupes", Icon: GroupIcon },
    { k: "emporter", Icon: BagIcon },
  ] as const;
  const quotes = avis.items as { name: string; date: string; text: Record<Locale, string> }[];
  const news = (actualites.items as News[]).filter((n) => n.active !== false).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(lang)) }} />

      {/* Hero : la salle le soir, texte sur crème */}
      <section className="grid md:min-h-[calc(100svh-6.5rem)] md:grid-cols-[6fr_5fr]">
        <div className="relative order-2 flex flex-col justify-center px-6 pt-9 pb-14 md:order-1 md:px-12 md:py-16 lg:px-20">
          <WaxBand className="mb-7" count={10} />
          <p className="caps text-terracotta-ink">{d.hero.eyebrow}</p>
          <h1 className="display mt-5 max-w-[12ch] text-[3rem] md:text-[4.25rem] xl:text-[5.25rem]">{d.hero.title}</h1>
          <p className="lead mt-6 max-w-md">{d.hero.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`/${lang}#reserver`} className="btn">
              {d.hero.ctaBook}
            </Link>
            <Link href={carteHref} className="btn-line">
              {d.hero.ctaMenu}
            </Link>
          </div>
          <div className="mt-7 flex flex-col gap-1.5 text-[0.9375rem] text-muted">
            <Rating d={d} lang={lang} />
            <OpenStatus />
          </div>
        </div>
        <div className="relative order-1 h-[52svh] min-h-72 bg-nuit md:order-2 md:h-auto">
          <Image src={hero.src} alt={d.hero.imageAlt} fill priority sizes="(min-width: 768px) 46vw, 100vw" quality={80} className="object-cover object-[50%_35%]" />
        </div>
      </section>

      {/* Tuiles de catégories */}
      <section aria-labelledby="tuiles" className="px-6 pt-20 md:px-10 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <h2 id="tuiles" className="display text-[1.75rem] md:text-[2.25rem]">
            {d.tiles.title}
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {tiles.map((t, i) => (
              <Reveal as="li" key={t.id} delay={i * 0.05}>
                <Link href={`${carteHref}#${t.id}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden rounded-[1.25rem] transition-transform duration-700 ease-[var(--ease-soft)] group-hover:-translate-y-1">
                    <Illustration id={t.illus} className="h-full w-full" />
                  </div>
                  <p className="display mt-3 flex items-center gap-2 text-[1.25rem] transition-colors group-hover:text-terracotta-ink">
                    {d.tiles[t.id]}
                    <ArrowIcon className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </p>
                  <p className="mt-0.5 text-[0.875rem] text-muted">{d.tiles[`${t.id}Sub`]}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Bande de services en 4 pictos */}
      <section aria-label={d.services.title} className="px-6 pt-16 md:px-10 md:pt-20">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {services.map(({ k, Icon }) => (
            <li key={k} className="flex flex-col items-start gap-3 bg-cream p-6 md:p-8">
              <Icon className="h-8 w-8 text-terracotta-ink" />
              <p className="display text-[1.25rem]">{d.services[k].title}</p>
              <p className="text-[0.9375rem] text-muted">{d.services[k].text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* La carte, en onglets */}
      <section id="carte" className="scroll-mt-24 px-6 pt-24 md:px-10 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow={d.carte.eyebrow} title={d.carte.title} lead={d.carte.lead} />
          <div className="mt-10">
            <Menu />
          </div>
          <p className="mt-8 flex items-start gap-3 rounded-2xl bg-ocre-soft/70 px-5 py-4 text-[0.9375rem]">
            <BagIcon className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-ink" />
            {d.carte.takeawayNote}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <Link href={carteHref} className="link-line text-[0.9375rem]">
              {d.carte.seeAll}
            </Link>
            <p className="text-[0.8125rem] text-muted">{fill(d.carte.checked, { date: formatDay(carte.checked, lang, { day: "numeric", month: "long", year: "numeric" }) })}</p>
          </div>
        </div>
      </section>

      {/* Trois blocs alternés : photo + texte court + un seul bouton */}
      <div className="space-y-24 px-6 pt-24 md:space-y-32 md:px-10 md:pt-32">
        <section className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-20">
          <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-nuit">
            <Image src={ardoise.src} alt={d.blocks.specialites.imageAlt} width={ardoise.width} height={ardoise.height} sizes="(min-width: 768px) 28rem, 100vw" quality={80} className="h-full w-full object-cover" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">{d.blocks.specialites.eyebrow}</p>
            <h2 className="display mt-3 text-[2.25rem] md:text-[3rem]">{d.blocks.specialites.title}</h2>
            <p className="lead mt-5 max-w-md">{d.blocks.specialites.text}</p>
            <Link href={carteHref} className="btn-line mt-8">
              {d.blocks.specialites.cta}
            </Link>
          </Reveal>
        </section>

        <section id="groupes" className="mx-auto grid max-w-6xl scroll-mt-24 items-center gap-10 md:grid-cols-2 md:gap-20">
          <Reveal className="md:order-2">
            <div className="wax-light relative mx-auto flex aspect-[4/5] w-full max-w-md flex-col justify-end overflow-hidden rounded-3xl bg-terracotta p-8 text-cream md:p-10">
              <WaxBand className="mb-auto" count={8} color="#F7EFE2" dot="#D9A441" />
              <p className="display text-[4.5rem] leading-none md:text-[5.5rem]">{d.blocks.groupes.panelBig}</p>
              <p className="mt-3 text-[1.0625rem] text-cream/90">{d.blocks.groupes.panelSmall}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:order-1">
            <p className="eyebrow">{d.blocks.groupes.eyebrow}</p>
            <h2 className="display mt-3 text-[2.25rem] md:text-[3rem]">{d.blocks.groupes.title}</h2>
            <p className="lead mt-5 max-w-md">{d.blocks.groupes.text}</p>
            <Link href={`/${lang}#reserver`} className="btn-line mt-8">
              {d.blocks.groupes.cta}
            </Link>
          </Reveal>
        </section>

        <section className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-20">
          <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-cream-deep">
            <Image src={chevalet.src} alt={d.blocks.histoire.imageAlt} width={chevalet.width} height={chevalet.height} sizes="(min-width: 768px) 28rem, 100vw" quality={75} className="h-full w-full object-cover object-[50%_60%]" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">{d.blocks.histoire.eyebrow}</p>
            <h2 className="display mt-3 text-[2.25rem] md:text-[3rem]">{d.blocks.histoire.title}</h2>
            {/* À COMPLÉTER : l'histoire du restaurant, le prénom du chef, le pays d'origine de la cuisine */}
            <p className="lead mt-5 max-w-md">{d.blocks.histoire.text}</p>
            <Link href={`/${lang}#infos`} className="btn-line mt-8">
              {d.blocks.histoire.cta}
            </Link>
          </Reveal>
        </section>
      </div>

      {/* En ce moment : 3 cartes (data/actualites.json) */}
      <section aria-labelledby="actus" className="px-6 pt-24 md:px-10 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow={d.news.eyebrow} title={d.news.title} id="actus" />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {news.map((n, i) => {
              const p = n.image ? img(n.image) : null;
              return (
                <Reveal as="li" key={n.id} delay={i * 0.06} className="flex flex-col overflow-hidden rounded-3xl border border-line bg-paper">
                  <div className="relative aspect-[16/9]">
                    {p ? (
                      <Image src={p.src} alt={altOf(d, p.src)} fill sizes="(min-width: 768px) 30vw, 100vw" quality={70} className="object-cover" />
                    ) : (
                      <Illustration id={(["poisson", "marmite", "assiette"] as IllusId[])[i % 3]} className="h-full w-full" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center justify-between gap-3 text-[0.8125rem] text-muted">
                      <span className="text-terracotta-ink">{n.kind[lang]}</span>
                      <time dateTime={n.date}>{formatDay(n.date, lang, { day: "numeric", month: "long" })}</time>
                    </p>
                    <h3 className="display mt-3 text-[1.5rem]">{n.title[lang]}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{n.text[lang]}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Réserver une table */}
      <section id="reserver" className="scroll-mt-20 px-6 pt-24 md:px-10 md:pt-32">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[2fr_3fr] md:gap-16">
          <div>
            <SectionHead eyebrow={d.book.eyebrow} title={d.book.title} lead={d.book.lead} />
            <div className="mt-8 space-y-2 text-[0.9375rem] text-muted">
              <Rating d={d} lang={lang} />
              <OpenStatus />
            </div>
            <a href={`tel:${site.phoneIntl}`} className="btn-line mt-8">
              <PhoneIcon />
              {d.nav.call} · {site.phone}
            </a>
          </div>
          <BookingForm />
        </div>
      </section>

      {/* Vos avis : la note Google, les thèmes qui reviennent ; aucun avis inventé */}
      <section aria-labelledby="avis" className="px-6 pt-24 md:px-10 md:pt-32">
        <div className="wax mx-auto max-w-7xl rounded-3xl bg-cream-deep px-6 py-14 text-center md:py-20">
          <p className="eyebrow">{d.reviews.eyebrow}</p>
          <h2 id="avis" className="display mx-auto mt-3 max-w-xl text-[2.25rem] md:text-[3rem]">
            {d.reviews.title}
          </h2>
          <p className="display mt-8 text-[4.5rem] leading-none text-terracotta-ink md:text-[6rem]">
            {num(site.rating.value, lang)}
            <span className="text-[0.4em] text-muted">/5</span>
          </p>
          <span className="mt-4 flex justify-center text-ocre" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} className="h-5 w-5" />
            ))}
          </span>
          <p className="mt-4 text-[1.0625rem]">{fill(d.reviews.count, { count: site.rating.count })}</p>
          <p className="mt-1 text-[0.8125rem] text-muted">{fill(d.reviews.checked, { date: formatDay(site.rating.checked, lang, { day: "numeric", month: "long", year: "numeric" }) })}</p>
          <p className="mt-10 text-[0.9375rem] text-muted">{d.reviews.themesLead}</p>
          <ul className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2">
            {d.reviews.themes.map((t) => (
              <li key={t} className="rounded-full border border-terracotta/35 bg-cream px-4 py-2 text-[0.9375rem]">
                {t}
              </li>
            ))}
          </ul>
          {/* À REMPLIR avec de vrais avis clients (data/avis.json), jamais inventés */}
          {quotes.length > 0 ? (
            <ul className="mx-auto mt-12 grid max-w-5xl gap-4 text-start md:grid-cols-3">
              {quotes.slice(0, 3).map((q) => (
                <li key={q.name + q.date} className="rounded-2xl bg-cream p-6">
                  <blockquote className="leading-relaxed">« {q.text[lang]} »</blockquote>
                  <p className="mt-4 text-[0.875rem] text-muted">{q.name}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-[0.875rem] text-muted italic">{d.reviews.empty}</p>
          )}
          <a href={site.reviewsUrl} target="_blank" rel="noopener noreferrer" className="btn-line mt-8">
            {d.reviews.cta}
          </a>
        </div>
      </section>

      {/* Infos pratiques */}
      <section id="infos" className="scroll-mt-20 px-6 pt-24 md:px-10 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow={d.infos.eyebrow} title={d.infos.title} />
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr]">
            <dl className="space-y-6 text-[1rem]">
              <div>
                <dt className="flex items-center gap-2 text-terracotta-ink">
                  <PinIcon />
                  {d.infos.address}
                </dt>
                <dd className="mt-1.5 text-[1.125rem]">
                  {site.address.street}, {site.address.postalCode} {site.address.city}
                </dd>
                <dd>
                  <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-line mt-2 inline-block text-[0.9375rem]">
                    {d.infos.directions}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-terracotta-ink">
                  <PhoneIcon />
                  {d.infos.phone}
                </dt>
                <dd className="mt-1.5 text-[1.125rem]">
                  <a href={`tel:${site.phoneIntl}`} className="link-line">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-terracotta-ink">{d.infos.access}</dt>
                <dd className="mt-1.5 text-muted">{d.infos.accessText}</dd>
              </div>
              <div>
                <dt className="text-terracotta-ink">{d.infos.parking}</dt>
                <dd className="mt-1.5 text-muted">{d.infos.parkingText}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-terracotta-ink">
                  <WheelchairIcon />
                  {d.infos.accessibility}
                </dt>
                <dd className="mt-1.5 text-muted">{d.infos.accessibilityText}</dd>
              </div>
              <div>
                <dt className="text-terracotta-ink">{d.infos.payment}</dt>
                <dd className="mt-1.5 text-muted">{d.infos.paymentText}</dd>
              </div>
            </dl>
            <div>
              <p className="text-terracotta-ink">{d.infos.hours}</p>
              <OpenStatus className="mt-2 text-[0.9375rem] text-muted" />
              <HoursTable lang={lang} d={d} className="mt-3" />
              <p className="mt-4 text-[0.8125rem] text-muted">{d.infos.hoursNote}</p>
              <div className="relative mt-8 hidden aspect-[4/5] max-w-xs overflow-hidden rounded-3xl bg-nuit md:block">
                <Image src={masques.src} alt={altOf(d, masques.src)} width={masques.width} height={masques.height} sizes="20rem" quality={70} className="h-full w-full object-cover" />
              </div>
            </div>
            <iframe title={d.infos.mapTitle} src={site.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="aspect-[4/5] w-full rounded-3xl border-0 bg-cream-deep md:col-span-2 md:aspect-[16/9] lg:col-span-1 lg:aspect-auto lg:min-h-[32rem]" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq" className="px-6 pt-24 pb-24 md:px-10 md:pt-32 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">{d.faq.eyebrow}</p>
            <h2 id="faq" className="display mt-3 text-[2.25rem] md:text-[3rem]">
              {d.faq.title}
            </h2>
            <WaxBand className="mt-6" count={7} />
          </div>
          <div className="border-t border-line">
            {d.faq.items.map((f) => (
              <details key={f.q} className="border-b border-line">
                <summary className="flex min-h-16 items-center justify-between gap-6 py-4 text-[1.0625rem]">
                  {f.q}
                  <span className="faq-plus shrink-0 text-[1.5rem] leading-none font-light text-terracotta-ink" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
