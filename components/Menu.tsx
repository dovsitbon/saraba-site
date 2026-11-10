"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";
import carte from "@/data/carte.json";
import { Illustration, type IllusId } from "@/components/Illustration";
import { useLocale } from "@/components/providers";
import { altOf, fill, type Dict } from "@/lib/i18n";
import { price } from "@/lib/format";
import { img } from "@/lib/media";

type Item = { price: number | null; image: string | null; illustration?: IllusId; veg?: boolean; signature?: boolean; from?: boolean; takeaway?: number };
type CatId = keyof Dict["carte"]["categories"];
const items = carte.items as Record<string, Item>;
const cats = carte.categories as { id: CatId; items: string[] }[];

/**
 * La carte en onglets (entrées, plats, poissons, desserts, boissons).
 * Tous les panneaux sont dans le HTML (lisibles par Google), seuls les inactifs sont masqués.
 * L'onglet suit l'ancre de l'adresse (#grillades…), pour les tuiles de l'accueil.
 */
export function Menu({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const { lang, d } = useLocale();
  const [active, setActive] = useState<CatId>("entrees");
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Sur mobile, la barre d'onglets défile : on ramène l'onglet actif dans le champ (sans faire défiler la page)
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = tabs.current[cats.findIndex((c) => c.id === active)];
    const box = list.current;
    if (!el || !box || box.scrollWidth <= box.clientWidth) return;
    box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const fromHash = () => {
      const h = decodeURIComponent(location.hash.slice(1)) as CatId;
      if (cats.some((c) => c.id === h)) setActive(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const select = (i: number) => {
    const c = cats[(i + cats.length) % cats.length];
    setActive(c.id);
    tabs.current[(i + cats.length) % cats.length]?.focus();
  };
  const H = headingLevel === 2 ? "h2" : "h3";

  return (
    <div>
      <div ref={list} role="tablist" aria-label={d.carte.tabsLabel} className="no-scrollbar -mx-6 flex gap-1 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0">
        {cats.map((c, i) => {
          const on = c.id === active;
          return (
            <button
              key={c.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${c.id}`}
              aria-selected={on}
              aria-controls={`${uid}-panel-${c.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(c.id)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") select(i + 1);
                if (e.key === "ArrowLeft") select(i - 1);
              }}
              className={`relative min-h-11 shrink-0 rounded-full px-5 text-[0.9375rem] transition-colors ${on ? "text-cream" : "text-ink hover:text-terracotta-ink"}`}
            >
              {on && <motion.span layoutId={`${uid}-pill`} className="absolute inset-0 rounded-full bg-ink" transition={{ type: "tween", duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }} aria-hidden="true" />}
              <span className="relative">{d.carte.categories[c.id]}</span>
            </button>
          );
        })}
      </div>

      {cats.map((c) => (
        <section key={c.id} role="tabpanel" id={`${uid}-panel-${c.id}`} aria-labelledby={`${uid}-tab-${c.id}`} hidden={c.id !== active} className="mt-8">
          <H className="sr-only">{d.carte.categories[c.id]}</H>
          <p className="max-w-2xl text-muted">{d.carte.intro[c.id]}</p>
          <ul className="mt-6 grid gap-x-12 md:grid-cols-2">
            {c.items.map((id) => {
              const it = items[id];
              const t = d.carte.items[id as keyof Dict["carte"]["items"]];
              const photo = it.image ? img(it.image) : null;
              return (
                <li key={id} className="flex items-center gap-4 border-b border-line py-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-ocre-soft md:size-24">
                    {photo ? (
                      <Image src={photo.src} alt={altOf(d, photo.src)} width={photo.width} height={photo.height} sizes="96px" quality={70} className="h-full w-full object-cover" />
                    ) : (
                      <Illustration id={it.illustration ?? "assiette"} className="h-full w-full" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="display text-[1.1875rem] leading-snug">{t.name}</p>
                    {t.desc && <p className="mt-1 text-[0.875rem] leading-snug text-muted">{t.desc}</p>}
                    {(it.signature || it.veg) && (
                      <p className="mt-1.5 flex flex-wrap gap-x-3 text-[0.8125rem]">
                        {it.signature && <span className="text-terracotta-ink">{d.carte.signature}</span>}
                        {it.veg && <span className="text-vert">{d.carte.veg}</span>}
                      </p>
                    )}
                  </div>
                  <p className="shrink-0 text-end tabular-nums">
                    {it.price === null ? (
                      <span className="text-[0.8125rem] text-muted">{d.carte.priceInRoom}</span>
                    ) : (
                      <>
                        {it.from && <span className="block text-[0.75rem] text-muted">{d.carte.from}</span>}
                        <span className="text-[1.0625rem]">{price(it.price, lang)}</span>
                        {it.takeaway && <span className="block text-[0.75rem] text-muted">{fill(d.carte.takeaway, { price: price(it.takeaway, lang) })}</span>}
                      </>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
