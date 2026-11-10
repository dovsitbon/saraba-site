"use client";

import { useMemo, useState, type FormEvent } from "react";
import site from "@/data/site.json";
import { CheckIcon, PhoneIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { fill } from "@/lib/i18n";
import { formatDay, formatTime } from "@/lib/format";
import { useMounted } from "@/lib/useMounted";
import { bookableDays, isEmail, isPhone, OCCASIONS, timesOn, type Occasion } from "@/lib/reservation";

type Errors = Partial<Record<"date" | "time" | "name" | "phone" | "email", string>>;

/**
 * Demande de réservation : date (seulement les soirs d'ouverture), heure (seulement aux heures d'ouverture),
 * nombre de personnes, occasion (facultatif), nom, téléphone, e-mail, message. Envoi via /api/reservation (Resend) :
 * notification au restaurant et confirmation au client. Sans Resend configuré, le client est invité à appeler :
 * aucune demande ne se perd en silence. Pas de paiement en ligne.
 */
export function BookingForm() {
  const { lang, d } = useLocale();
  const b = d.book;
  const { groupFrom, maxGuests } = site.reservation;
  const mounted = useMounted();
  const now = useMemo(() => (mounted ? new Date() : null), [mounted]);

  const days = useMemo(() => (now ? bookableDays(now) : []), [now]);
  const [date, setDate] = useState("");
  const [rawTime, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState<Occasion>("none");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [done, setDone] = useState<null | { notified: boolean; confirmed: boolean; when: string; name: string }>(null);

  const times = useMemo(() => (date && now ? timesOn(date, now) : []), [date, now]);
  const time = times.includes(rawTime) ? rawTime : "";

  async function submit(e: FormEvent) {
    e.preventDefault();
    const err: Errors = {};
    if (!date) err.date = b.errors.date;
    if (!time) err.time = b.errors.time;
    if (!name.trim()) err.name = b.errors.name;
    if (!isPhone(phone)) err.phone = b.errors.phone;
    if (!isEmail(email)) err.email = b.errors.email;
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`bk-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lang, booking: { date, time, guests, occasion, message, name, phone, email } }),
      });
      const json = (await res.json()) as { ok: boolean; notified?: boolean; confirmed?: boolean };
      if (!res.ok || !json.ok) throw new Error("server");
      setDone({ notified: !!json.notified, confirmed: !!json.confirmed, name: name.trim(), when: `${formatDay(date, lang)}, ${formatTime(time, lang)}` });
      setState("idle");
    } catch {
      setState("error");
    }
  }

  if (done)
    return (
      <div className="fade-in rounded-3xl border border-line bg-paper p-6 md:p-10" role="status" aria-live="polite">
        <span className="flex size-11 items-center justify-center rounded-full bg-vert text-cream">
          <CheckIcon className="h-5 w-5" />
        </span>
        <h3 className="display mt-5 text-[1.75rem]">{b.done.title}</h3>
        <p className="lead mt-3">{fill(b.done.text, { name: done.name, when: done.when })}</p>
        <p className="mt-3 text-muted">{done.notified ? (done.confirmed ? b.done.mail : "") : b.done.notSent}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {!done.notified && (
            <a href={`tel:${site.phoneIntl}`} className="btn">
              <PhoneIcon />
              {site.phone}
            </a>
          )}
          <button type="button" className="btn-line" onClick={() => setDone(null)}>
            {b.done.again}
          </button>
        </div>
      </div>
    );

  const id = (k: string) => `bk-${k}`;
  const fieldErr = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${id(k)}-err`} className="mt-1.5 text-[0.875rem] text-terracotta-ink">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${id(k)}-err` : undefined });

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl border border-line bg-paper p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("date")} className="label">
            {b.date}
          </label>
          <select id={id("date")} className="field" value={date} onChange={(e) => setDate(e.target.value)} {...aria("date")}>
            <option value="">{b.chooseDate}</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {formatDay(day, lang)}
              </option>
            ))}
          </select>
          {fieldErr("date")}
        </div>
        <div>
          <label htmlFor={id("time")} className="label">
            {b.time}
          </label>
          <select id={id("time")} className="field tabular-nums" value={time} onChange={(e) => setTime(e.target.value)} disabled={!date} {...aria("time")}>
            <option value="">{b.chooseTime}</option>
            {times.map((t) => (
              <option key={t} value={t}>
                {formatTime(t, lang)}
              </option>
            ))}
          </select>
          {date && !times.length && <p className="mt-1.5 text-[0.875rem] text-muted">{b.noTimes}</p>}
          {fieldErr("time")}
        </div>
        <div>
          <label htmlFor={id("guests")} className="label">
            {b.guests}
          </label>
          <select id={id("guests")} className="field tabular-nums" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={id("occasion")} className="label">
            {b.occasion}
          </label>
          <select id={id("occasion")} className="field" value={occasion} onChange={(e) => setOccasion(e.target.value as Occasion)}>
            {OCCASIONS.map((o) => (
              <option key={o} value={o}>
                {b.occasions[o]}
              </option>
            ))}
          </select>
        </div>
        {guests >= groupFrom && <p className="text-[0.875rem] text-vert sm:col-span-2">{fill(b.groupHint, { n: groupFrom })}</p>}
        <div className="sm:col-span-2">
          <label htmlFor={id("name")} className="label">
            {b.name}
          </label>
          <input id={id("name")} name="name" className="field" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} {...aria("name")} />
          {fieldErr("name")}
        </div>
        <div>
          <label htmlFor={id("phone")} className="label">
            {b.phone}
          </label>
          <input id={id("phone")} name="tel" className="field" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} {...aria("phone")} />
          {fieldErr("phone")}
        </div>
        <div>
          <label htmlFor={id("email")} className="label">
            {b.email}
          </label>
          <input id={id("email")} name="email" className="field" type="email" inputMode="email" autoComplete="email" spellCheck={false} value={email} onChange={(e) => setEmail(e.target.value)} {...aria("email")} />
          {fieldErr("email")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className="label">
            {b.message}
          </label>
          <textarea id={id("message")} className="field min-h-24" rows={3} placeholder={b.messagePh} value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
        <button type="submit" className="btn" disabled={state === "sending"}>
          {state === "sending" ? b.sending : b.submit}
        </button>
        <span className="text-[0.875rem] text-muted">{b.callInstead}</span>
        <a href={`tel:${site.phoneIntl}`} className="link-line text-[0.9375rem]">
          {site.phone}
        </a>
      </div>
      {state === "error" && (
        <p className="mt-4 text-terracotta-ink" role="alert">
          {b.errors.server}
        </p>
      )}
      <p className="mt-5 text-[0.8125rem] text-muted">{b.privacy}</p>
    </form>
  );
}
