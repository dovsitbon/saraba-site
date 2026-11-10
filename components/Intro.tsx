"use client";

import { useEffect, useState, type CSSProperties } from "react";

const KEY = "saraba-intro";

// Frise wax : une rangée de losanges imbriqués, dessinée au trait de gauche à droite
const DIAMONDS = [0, 1, 2, 3, 4].map((i) => {
  const cx = 20 + i * 40;
  return { outer: `M${cx} 2 ${cx + 18} 20 ${cx} 38 ${cx - 18} 20Z`, inner: `M${cx} 11 ${cx + 9} 20 ${cx} 29 ${cx - 9} 20Z`, d: i * 0.06 };
});

/**
 * Ouverture (1,2 s, une fois par session), en CSS (globals.css) : fond crème, un motif wax se dessine au trait
 * terracotta, « SARABA » apparaît, puis « RESTAURANT AFRICAIN · AMIENS », fondu sur le hero.
 * Bouton « Passer » ; rien du tout si l'utilisateur préfère réduire les animations.
 */
export function Intro({ skipLabel, line }: { skipLabel: string; line: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      document.documentElement.classList.add("intro-seen");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="intro-curtain flex flex-col items-center justify-center text-ink">
      <svg viewBox="0 0 200 40" className="h-9 w-auto md:h-11" fill="none" stroke="#B5552D" strokeWidth="1.1" strokeLinejoin="round" aria-hidden="true">
        <path pathLength={1} className="intro-line" d="M0 20H200" strokeOpacity="0.35" style={{ "--d": "0s" } as CSSProperties} />
        {DIAMONDS.map((g) => (
          <g key={g.outer}>
            <path pathLength={1} className="intro-line" d={g.outer} style={{ "--d": `${g.d}s` } as CSSProperties} />
            <path pathLength={1} className="intro-line" d={g.inner} style={{ "--d": `${g.d + 0.12}s` } as CSSProperties} />
          </g>
        ))}
      </svg>
      <p className="intro-name mt-7 ps-[0.28em] font-[family-name:var(--font-fraunces)] text-[clamp(2.25rem,9vw,3.5rem)] leading-none text-ink" translate="no" aria-hidden="true">
        SARABA
      </p>
      <p className="intro-sub mt-4 ps-[0.22em] text-[0.75rem] tracking-[0.22em] text-terracotta-ink" aria-hidden="true">
        {line}
      </p>
      <button
        type="button"
        onClick={() => {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          document.documentElement.classList.add("intro-seen");
          setGone(true);
        }}
        className="absolute end-4 bottom-4 min-h-11 px-4 text-[0.9375rem] text-muted transition-colors hover:text-ink"
      >
        {skipLabel}
      </button>
    </div>
  );
}
