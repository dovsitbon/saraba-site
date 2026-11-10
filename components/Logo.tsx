/**
 * Logo typographique provisoire (aucun logo n'apparaît sur l'enseigne ni sur les photos) :
 * « SARABA » en capitales Fraunces et une marque wax au trait terracotta (losanges imbriqués).
 * Facile à remplacer : il suffit de changer ce composant, public/logo.svg et app/icon.svg.
 */
function MarkPaths({ color }: { color: string }) {
  return (
    <g fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round">
      <path d="M20 2.5 37.5 20 20 37.5 2.5 20Z" />
      <path d="M20 10.5 29.5 20 20 29.5 10.5 20Z" />
      <path d="M20 2.5v4M37.5 20h-4M20 37.5v-4M2.5 20h4" />
      <circle cx="20" cy="20" r="2.2" fill={color} stroke="none" />
    </g>
  );
}

export function Mark({ className = "h-9 w-9", color = "#B5552D" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <MarkPaths color={color} />
    </svg>
  );
}

export function Logo({ className = "h-10 w-auto", mark = "#B5552D", sub = false, label = "Saraba, restaurant africain" }: { className?: string; mark?: string; sub?: boolean; label?: string }) {
  if (sub)
    return (
      <svg viewBox="0 0 240 118" className={className} role="img" aria-label={label}>
        <g transform="translate(100 0)">
          <MarkPaths color={mark} />
        </g>
        <text x="120" y="84" textAnchor="middle" textLength="214" lengthAdjust="spacing" fill="currentColor" style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: 38 }}>
          SARABA
        </text>
        <text x="120" y="111" textAnchor="middle" textLength="196" lengthAdjust="spacing" fill="currentColor" opacity="0.75" style={{ fontFamily: "var(--font-jost), Arial, sans-serif", fontSize: 10.5 }}>
          RESTAURANT AFRICAIN · AMIENS
        </text>
      </svg>
    );
  return (
    <svg viewBox="0 0 196 40" className={className} role="img" aria-label={label}>
      <MarkPaths color={mark} />
      <text x="52" y="30" textLength="142" lengthAdjust="spacing" fill="currentColor" style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: 27 }}>
        SARABA
      </text>
    </svg>
  );
}
