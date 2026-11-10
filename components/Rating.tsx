import site from "@/data/site.json";
import { StarIcon } from "@/components/icons";
import { fill, type Dict, type Locale } from "@/lib/i18n";

export const num = (n: number, lang: Locale) => n.toLocaleString(lang === "fr" ? "fr-FR" : "en-GB");

/** Note Google (4,7/5 · 148 avis), toujours près des boutons. Relevée à la main : data/site.json → rating. */
export function Rating({ d, lang, className = "" }: { d: Dict; lang: Locale; className?: string }) {
  return (
    <a href={site.reviewsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-6 items-center gap-2 hover:text-ink ${className}`}>
      <span className="flex text-ocre" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} />
        ))}
      </span>
      <span>
        {fill(d.hero.rating, { value: num(site.rating.value, lang) })} · {fill(d.hero.ratingCount, { count: site.rating.count })}
      </span>
    </a>
  );
}

