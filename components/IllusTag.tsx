/** Petite mention sur les photos libres de droits (/media/illustrations/) : elles ne montrent pas le restaurant. */
export function IllusTag({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  if (!src.includes("/illustrations/")) return null;
  return <span className={`pointer-events-none absolute bottom-1.5 start-1.5 rounded-full bg-nuit/75 px-1.5 py-px text-[0.625rem] leading-tight text-cream ${className}`}>{label}</span>;
}
