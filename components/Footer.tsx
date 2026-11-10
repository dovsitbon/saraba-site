import Link from "next/link";
import site from "@/data/site.json";
import { Logo } from "@/components/Logo";
import { WaxBand } from "@/components/WaxBand";
import { HoursTable } from "@/components/HoursTable";
import { FacebookIcon } from "@/components/icons";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { pagePath } from "@/lib/pages";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const linkCls = "inline-flex min-h-9 items-center transition-colors hover:text-ocre";
  return (
    <footer className="wax-light bg-nuit pb-24 text-cream md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <Logo sub className="h-24 w-auto text-cream" mark="#D9A441" />
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-cream/80">{d.footer.tagline}</p>
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="mt-4 -ms-1 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] transition-opacity hover:opacity-70">
            <FacebookIcon />
            <span>{d.nav.facebook}</span>
          </a>
        </div>
        <div className="text-[0.9375rem] leading-relaxed">
          <p className="mb-3 text-ocre">{d.infos.address}</p>
          <address className="not-italic">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-line mt-2 inline-block text-cream/80">
            {d.infos.directions}
          </a>
          <p className="mt-6 mb-2 text-ocre">{d.infos.phone}</p>
          <a href={`tel:${site.phoneIntl}`} className="link-line">
            {site.phone}
          </a>
        </div>
        <div>
          <p className="mb-3 text-[0.9375rem] text-ocre">{d.infos.hours}</p>
          <HoursTable lang={lang} d={d} />
        </div>
        <div className="text-[0.9375rem]">
          <p className="mb-2 text-ocre">{d.footer.pages}</p>
          <ul className="text-cream/85">
            <li>
              <Link href={pagePath("carte", lang)} className={linkCls}>
                {d.footer.menu}
              </Link>
            </li>
            <li>
              <Link href={pagePath("gift", lang)} className={linkCls}>
                {d.footer.gift}
              </Link>
            </li>
            <li>
              <Link href={pagePath("africain", lang)} className={linkCls}>
                {d.footer.africain}
              </Link>
            </li>
            <li>
              <Link href={pagePath("mafe", lang)} className={linkCls}>
                {d.footer.mafe}
              </Link>
            </li>
            <li>
              <Link href={pagePath("legal", lang)} className={linkCls}>
                {d.footer.legal}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 border-t border-cream/10 px-6 py-6">
        <WaxBand count={9} color="#D9A441" dot="#B5552D" />
        <p className="text-[0.8125rem] text-cream/70">{fill(d.footer.rights, { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
