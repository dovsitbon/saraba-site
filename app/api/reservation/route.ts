import { Resend } from "resend";
import { bookingText, parseBooking } from "@/lib/reservation";
import { fill, getDict, isLocale, type Locale } from "@/lib/i18n";

// Demande de réservation. Le restaurant n'a qu'une ligne fixe : la demande part par e-mail (Resend).
//  1. notification au restaurant (en français, avec la langue du client) ;
//  2. confirmation de réception au client, dans sa langue.
// Variables Vercel : RESEND_API_KEY, BOOKING_NOTIFY_EMAIL (adresse du restaurant), RESEND_FROM (domaine vérifié dans Resend,
// ex. « Saraba <reservation@mondomaine.fr> » ; sans domaine vérifié, Resend n'envoie qu'à l'adresse du compte).
// Sans ces variables, la route répond { notified: false } et le site invite le client à appeler pour confirmer.

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function html(title: string, text: string) {
  const body = escapeHtml(text)
    .split("\n\n")
    .map((p) => `<p style="margin:0 0 18px">${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
  return `<div style="background:#F7EFE2;padding:32px 16px"><div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #E2D1B6;border-top:4px solid #B5552D;border-radius:12px;padding:32px 28px;font-family:Georgia,serif;color:#2A1B14;font-size:15px;line-height:1.7">
<p style="margin:0 0 4px;font-size:12px;letter-spacing:3px;color:#96431F">SARABA · RESTAURANT AFRICAIN</p>
<h1 style="margin:0 0 24px;font-weight:normal;font-size:24px">${escapeHtml(title)}</h1>${body}</div></div>`;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const lang: Locale = typeof body.lang === "string" && isLocale(body.lang) ? body.lang : "fr";
  const b = parseBooking(body.booking);
  if (!b) return Response.json({ ok: false }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_NOTIFY_EMAIL;
  if (!key || !to) return Response.json({ ok: true, notified: false, confirmed: false });

  const resend = new Resend(key);
  const from = process.env.RESEND_FROM ?? "Saraba <onboarding@resend.dev>";
  const fr = getDict("fr");
  const d = getDict(lang);
  const frText = bookingText(b, "fr", fr);
  const text = lang === "fr" ? frText : `${frText}\n\n${fr.book.mail.lang} : ${lang.toUpperCase()}`;
  const subject = `${b.guests >= 8 ? "[Groupe] " : ""}${fr.book.mail.subject} · ${b.name} · ${b.date} ${b.time} · ${b.guests} pers.`;

  let notified = false;
  let confirmed = false;
  try {
    const r = await resend.emails.send({ from, to, replyTo: b.email, subject, html: html(fr.book.mail.title, text), text });
    notified = !r.error;
  } catch {}

  if (notified) {
    const m = d.book.mail;
    const msg = `${fill(m.confirmIntro, { name: b.name })}\n\n${bookingText(b, lang, d, false)}\n\n${m.confirmOutro}`;
    try {
      const r = await resend.emails.send({ from, to: b.email, replyTo: to, subject: m.confirmSubject, html: html(m.confirmSubject, msg), text: msg });
      confirmed = !r.error;
    } catch {}
  }
  return Response.json({ ok: true, notified, confirmed });
}
