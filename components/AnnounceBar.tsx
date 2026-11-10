"use client";

import { useState } from "react";
import { useMounted } from "@/lib/useMounted";
import annonces from "@/data/annonces.json";
import { CloseIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { isoDay } from "@/lib/format";

type Item = { id: string; active?: boolean; from?: string; to?: string; fr: string; en: string };

/** Message du moment (data/annonces.json) choisi d'après la date du jour ; refermable, mémorisé pour la session. */
function current(today: string): Item {
  const items = annonces.items as Item[];
  return items.find((a) => a.active !== false && (!a.from || a.from <= today) && (!a.to || today <= a.to)) ?? (annonces.default as Item);
}

export function AnnounceBar({ buildDay }: { buildDay: string }) {
  const { lang, d } = useLocale();
  const mounted = useMounted();
  const [closed, setClosed] = useState(false);
  const item = current(mounted ? isoDay(new Date()) : buildDay);
  let stored = false;
  if (mounted)
    try {
      stored = sessionStorage.getItem(`saraba-bar-${item.id}`) === "1";
    } catch {}

  if (closed || stored) return null;
  return (
    <div className="relative z-[51] flex min-h-10 items-center justify-center bg-nuit px-12 py-2 text-center text-[0.875rem] leading-snug text-cream">
      <p>{item[lang]}</p>
      <button
        type="button"
        onClick={() => {
          setClosed(true);
          try {
            sessionStorage.setItem(`saraba-bar-${item.id}`, "1");
          } catch {}
        }}
        className="absolute end-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center opacity-70 transition-opacity hover:opacity-100"
        aria-label={d.announce.close}
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
