import type { Locale } from "@/lib/locales";

// Pages secondaires et leurs adresses dans chaque langue
export const PAGE_IDS = ["carte", "africain", "mafe", "gift", "legal"] as const;
export type PageId = (typeof PAGE_IDS)[number];

export const SLUGS: Record<PageId, Record<Locale, string>> = {
  carte: { fr: "carte", en: "menu" },
  africain: { fr: "restaurant-africain-amiens", en: "african-restaurant-amiens" },
  mafe: { fr: "mafe-amiens", en: "mafe-amiens" },
  gift: { fr: "bon-cadeau", en: "gift-voucher" },
  legal: { fr: "mentions-legales", en: "legal" },
};

export const pagePath = (id: PageId, lang: Locale) => `/${lang}/${SLUGS[id][lang]}`;

export const pageOfSlug = (slug: string, lang: Locale) => PAGE_IDS.find((id) => SLUGS[id][lang] === slug) ?? null;
