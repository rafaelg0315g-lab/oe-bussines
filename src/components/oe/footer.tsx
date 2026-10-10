"use client";

import { ArrowUpRight } from "lucide-react";
import { OeLockup } from "./logo";
import { useLang } from "./lang-provider";
import {
  CONTACT_EMAIL,
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
} from "@/lib/i18n/dictionary";

/**
 * Footer — brand closure. Sticky to the bottom of the viewport when
 * content is short (mt-auto), monumental wordmark as the final gesture.
 */
export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const links = [
    { id: "identidad", label: t.nav.identity },
    { id: "filosofia", label: t.nav.philosophy },
    { id: "vision", label: t.nav.vision },
    { id: "fundadores", label: t.nav.founders },
    { id: "contacto", label: t.nav.contact },
  ];

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/[0.06] bg-obsidian px-6 pb-8 pt-20 md:px-10 md:pt-28">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <OeLockup />
            <p className="mt-9 max-w-sm text-lg leading-relaxed text-titanium">
              {t.footer.tagline}
            </p>
          </div>

          <nav aria-label={t.footer.navTitle} className="md:col-span-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-mute">
              {t.footer.navTitle}
            </h3>
            <ul className="mt-7 space-y-3.5">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-mute transition-colors duration-300 hover:text-ice"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-mute">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-7 space-y-3.5 text-sm">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-mute transition-colors duration-300 hover:text-ice"
                >
                  {WHATSAPP_DISPLAY}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-mute transition-colors duration-300 hover:text-ice"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/[0.06] pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-mute md:flex-row md:items-center md:justify-between">
          <span>
            © {year} OE BUSINESS — {t.footer.rights}
          </span>
          <span className="text-titanium/70">{t.footer.concept}</span>
        </div>
      </div>

      {/* monumental brand wordmark — the final signature */}
      <div
        aria-hidden
        className="pointer-events-none relative mt-14 select-none overflow-hidden"
      >
        <p className="text-metal whitespace-nowrap text-center font-display text-[clamp(3.2rem,11.6vw,12.5rem)] font-semibold leading-[0.9] tracking-[-0.03em] opacity-90">
          OE BUSINESS
        </p>
        {/* slow metallic light pass over the signature */}
        <div className="absolute inset-y-0 left-0 w-1/4 animate-[sheen-move_12s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      </div>
    </footer>
  );
}
