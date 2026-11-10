/**
 * Le détail signature : la frise en chevrons tracée à la craie sous « Le Saraba » sur le chevalet de la rue,
 * redessinée au trait, avec un point ocre une pointe sur deux. Séparateur, à utiliser avec parcimonie.
 */
export function WaxBand({ className = "", count = 12, color = "#B5552D", dot = "#D9A441" }: { className?: string; count?: number; color?: string; dot?: string }) {
  const w = count * 14;
  const d = Array.from({ length: count }, (_, i) => `${i === 0 ? "M" : "L"}${i * 14} 12L${i * 14 + 7} 3`).join("") + `L${w} 12`;
  return (
    <svg viewBox={`-1 0 ${w + 2} 16`} className={`h-3.5 w-auto ${className}`} fill="none" aria-hidden="true">
      <path d={d} stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      {Array.from({ length: Math.ceil(count / 2) }, (_, i) => (
        <circle key={i} cx={i * 28 + 7} cy={14.5} r={1.3} fill={dot} />
      ))}
    </svg>
  );
}
