/**
 * Dessins au trait (terracotta sur fond ocre clair, motif wax en filigrane) pour les plats qui n'ont pas encore de photo.
 * Remplacés automatiquement dès qu'une image est indiquée dans data/carte.json. Ce ne sont pas de fausses photos.
 */
export type IllusId = "beignets" | "alokos" | "ailes" | "pastels" | "planche" | "marmite" | "assiette" | "poisson" | "fondant" | "glace" | "verre" | "tasse";

const P: Record<IllusId, string[]> = {
  beignets: ["M14 56h52", "M20 50c0-6 4-9 8-9s8 3 8 9-4 6-8 6-8 0-8-6Z", "M38 50c0-6 4-9 8-9s8 3 8 9-4 6-8 6-8 0-8-6Z", "M29 38c0-6 4-9 8-9s8 3 8 9-4 6-8 6-8 0-8-6Z", "M24 47l1-1M43 46l1-1M34 35l1-1"],
  alokos: ["M14 56h52", "M18 50c4-6 10-8 16-6l-2 6c-5-1-9 0-14 0Z", "M34 52c3-7 10-10 17-8l-2 6c-5-1-10 0-15 2Z", "M28 40c4-6 10-8 16-6l-2 6c-5-1-9 0-14 0Z"],
  ailes: ["M14 58h52", "M22 52c-2-8 4-14 12-12l8 3c4 2 4 7 0 9Z", "M42 52l8-12c2-3 6-2 6 1v3", "M28 46l6 2M30 50l8 1"],
  pastels: ["M14 56h52", "M18 50c2-10 10-14 18-14s14 6 14 14Z", "M22 48l2-2M28 48l2-2M34 48l2-2M40 48l2-2", "M52 54c4 0 8-2 10-6"],
  planche: ["M10 54h54l4-6H14Z", "M64 54v4M14 54v4", "M22 46c0-4 3-6 6-6s6 2 6 6", "M38 46c2-5 7-7 11-5", "M52 46c0-3 2-5 5-5s5 2 5 5"],
  marmite: ["M16 34h48", "M20 34v14c0 7 9 12 20 12s20-5 20-12V34", "M16 34c-4 0-6 3-4 6M64 34c4 0 6 3 4 6", "M32 34c0-4 4-6 8-6s8 2 8 6", "M32 22c-2-3 2-5 0-8M40 22c-2-3 2-5 0-8M48 22c-2-3 2-5 0-8"],
  assiette: ["M10 46c0 8 13 14 30 14s30-6 30-14", "M10 46h60", "M18 46c2-8 11-13 22-13s20 5 22 13", "M28 40c3-2 6-2 8 0M40 38c3-2 6-2 8 0", "M30 46c1-3 4-4 6-3"],
  poisson: ["M14 40c8-10 22-12 34-6l10-8v28l-10-8c-12 6-26 4-34-6Z", "M22 38h0.5", "M30 34c2 4 2 8 0 12M36 33c2 5 2 9 0 14", "M10 60h60"],
  fondant: ["M14 58h52", "M24 52V38c0-2 2-3 4-3h24c2 0 4 1 4 3v14", "M24 44c4 2 8-2 12 0s8 2 12 0 6-2 8 0", "M40 30c-2-3 2-5 0-8"],
  glace: ["M28 38h24l-12 24Z", "M32 44l8 6M36 52l6-6", "M28 38c-2-6 2-12 8-12 2-4 8-4 10 0 6 0 10 6 6 12"],
  verre: ["M28 20h24l-3 40H31Z", "M29 32h22", "M46 20l6-8", "M33 44c3 2 9 2 14 0"],
  tasse: ["M22 40h28v6c0 8-6 14-14 14s-14-6-14-14Z", "M50 44c5 0 7 3 6 6-1 2-3 3-6 3", "M18 62h40", "M32 34c-2-3 2-5 0-8M40 34c-2-3 2-5 0-8"],
};

export function Illustration({ id, className = "" }: { id: IllusId; className?: string }) {
  return (
    <div className={`wax flex items-center justify-center bg-ocre-soft ${className}`} aria-hidden="true">
      <svg viewBox="0 0 80 80" className="h-1/2 max-h-32 w-auto" fill="none" stroke="#96431F" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        {P[id].map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </div>
  );
}
