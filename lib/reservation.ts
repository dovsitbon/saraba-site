import site from "@/data/site.json";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { formatDay, formatTime, isoDay } from "@/lib/format";
import { addDays, isOpenDay, parisTime, slotsOn } from "@/lib/hours";

export const OCCASIONS = ["none", "birthday", "family", "company", "other"] as const;
export type Occasion = (typeof OCCASIONS)[number];

export type Booking = {
  date: string;
  time: string;
  guests: number;
  occasion: Occasion;
  message: string;
  name: string;
  phone: string;
  email: string;
};

export const isPhone = (v: string) => /^[+\d][\d\s\-().]{7,19}$/.test(v.trim());
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

/**
 * Heures d'arrivée proposées pour un jour : toutes les 15 min dans les créneaux d'ouverture,
 * jusqu'à 1 h 30 avant la fermeture (data/site.json → reservation). Le jour même : rien avant maintenant + 30 min.
 */
export function timesOn(iso: string, now?: Date): string[] {
  const { stepMinutes: step, lastSeatingMinutes: last } = site.reservation;
  const floor = now && iso === isoDay(now) ? toMin(parisTime(now)) + 30 : -1;
  return slotsOn(iso).flatMap(([a, b]) => {
    const out: string[] = [];
    for (let t = toMin(a); t <= toMin(b) - last; t += step) if (t >= floor) out.push(toHhmm(t));
    return out;
  });
}

/** Prochains jours ouverts où il reste une heure d'arrivée possible. */
export function bookableDays(now: Date, count = 60) {
  const out: string[] = [];
  let day = isoDay(now);
  for (let i = 0; i < 120 && out.length < count; i++, day = addDays(day, 1)) if (isOpenDay(day) && timesOn(day, now).length) out.push(day);
  return out;
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Nettoie une demande reçue côté serveur : null si elle est incomplète ou hors des heures d'ouverture. */
export function parseBooking(v: unknown): Booking | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const guests = Math.round(Number(o.guests));
  const b: Booking = {
    date: ISO.test(str(o.date, 10)) ? str(o.date, 10) : "",
    time: str(o.time, 5),
    guests: Number.isFinite(guests) ? Math.min(Math.max(guests, 1), site.reservation.maxGuests) : 0,
    occasion: (OCCASIONS as readonly string[]).includes(o.occasion as string) ? (o.occasion as Occasion) : "none",
    message: str(o.message, 1500),
    name: str(o.name, 120),
    phone: str(o.phone, 30),
    email: str(o.email, 160),
  };
  if (!b.date || !b.guests || !b.name || !isPhone(b.phone) || !isEmail(b.email)) return null;
  if (!timesOn(b.date).includes(b.time)) return null;
  return b;
}

/** Récapitulatif texte de la demande (e-mails). */
export function bookingText(b: Booking, lang: Locale, d: Dict, withContact = true) {
  const m = d.book.mail;
  const c = lang === "fr" ? " :" : ":";
  const when = `${formatDay(b.date, lang, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}, ${formatTime(b.time, lang)}`;
  const blocks = [
    `${m.when}${c} ${when}`,
    `${m.guests}${c} ${b.guests}`,
    b.occasion !== "none" ? `${m.occasion}${c} ${d.book.occasions[b.occasion]}` : "",
    withContact ? [`${m.name}${c} ${b.name}`, `${m.phone}${c} ${b.phone}`, `${m.email}${c} ${b.email}`].join("\n") : "",
    b.message ? `${m.message}${c}\n${b.message}` : "",
  ];
  return blocks.filter(Boolean).join("\n\n");
}

/** Lien WhatsApp (vide tant que le restaurant n'a pas donné de portable : data/site.json → whatsapp). */
export const waLink = (text: string) => (site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : "");
