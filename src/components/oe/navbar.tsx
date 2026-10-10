"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { OeLockup } from "./logo";
import { useLang } from "./lang-provider";
import { EASE } from "./motion-primitives";
import { useIntroStore } from "./intro-store";
import type { Lang } from "@/lib/i18n/dictionary";

const SECTION_IDS = [
  "inicio",
  "identidad",
  "filosofia",
  "vision",
  "fundadores",
  "contacto",
] as const;

function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <div
      role="group"
      aria-label={t.a11y.langSwitch}
      className={`flex items-center rounded-full border border-white/10 p-0.5 ${className}`}
    >
      {(["es", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
            lang === l ? "bg-white/10 text-ice" : "text-mute hover:text-titanium"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

/**
 * Premium lightweight navigation:
 * transparent over the hero, obsidian glass once scrolled,
 * scrollspy underline, ES/EN switch, elegant mobile overlay.
 */
export function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("inicio");
  const [open, setOpen] = useState(false);
  const phase = useIntroStore((s) => s.phase);
  const ready = phase === "done";

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scrollspy */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* mobile menu: scroll lock + escape */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = [
    { id: "inicio", label: t.nav.home },
    { id: "identidad", label: t.nav.identity },
    { id: "filosofia", label: t.nav.philosophy },
    { id: "vision", label: t.nav.vision },
    { id: "fundadores", label: t.nav.founders },
    { id: "contacto", label: t.nav.contact },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -70, opacity: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          scrolled
            ? "border-b border-white/[0.06] bg-obsidian/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label={t.a11y.navLabel}
          className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between px-6 md:h-[72px] md:px-10"
        >
          <a
            href="#inicio"
            aria-label="OE BUSINESS — Inicio"
            className="transition-opacity hover:opacity-80"
            onClick={() => setOpen(false)}
          >
            <OeLockup />
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative py-2 text-[13px] transition-colors duration-300 ${
                      isActive ? "text-ice" : "text-mute hover:text-titanium"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-0.5 left-0 h-px bg-titanium transition-all duration-300 ${
                        isActive
                          ? "w-full opacity-70"
                          : "w-0 opacity-0 group-hover:w-full group-hover:opacity-40"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <LangToggle />
            <a
              href="#contacto"
              className="hidden rounded-full border border-white/15 px-4 py-1.5 text-[13px] text-ice transition-colors duration-300 hover:border-white/40 hover:bg-white/5 sm:inline-flex"
            >
              {t.nav.cta}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label={t.a11y.openMenu}
              className="rounded-full border border-white/10 p-2.5 text-titanium transition-colors hover:border-white/30 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* scroll progress hairline — machined read of the journey */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-titanium/60 via-titanium/30 to-oe/40"
          style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label={t.a11y.navLabel}
            className="fixed inset-0 z-[60] flex flex-col bg-obsidian/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6">
              <OeLockup />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.a11y.closeMenu}
                className="rounded-full border border-white/10 p-2.5 text-titanium transition-colors hover:border-white/30"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav
              aria-label={t.a11y.navLabel}
              className="flex flex-1 flex-col justify-center overflow-y-auto px-8 pb-12"
            >
              <ul>
                {links.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.6, ease: EASE }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 border-b border-white/[0.06] py-4"
                    >
                      <span className="font-mono text-[11px] text-mute">
                        0{i + 1}
                      </span>
                      <span className="font-display text-3xl font-medium text-ice transition-colors duration-300 group-hover:text-titanium">
                        {link.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
                className="mt-10 flex items-center gap-3"
              >
                <LangToggle />
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-ice px-5 py-2.5 text-sm font-medium text-obsidian"
                >
                  {t.nav.cta}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
