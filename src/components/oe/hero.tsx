"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLang } from "./lang-provider";
import { EASE } from "./motion-primitives";

/* 3D layer is client-only and code-split away from the initial JS payload. */
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

/**
 * Cinematic hero — full first screen.
 * Entrance sequence: atmosphere → sculpture → headline → support → actions.
 * Non-blocking: total ≈ 2s, interaction available immediately.
 */
export function Hero() {
  const { t } = useLang();

  return (
    <section
      id="inicio"
      aria-label={t.nav.home}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* volumetric atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-20%] h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(185,192,201,0.07),transparent)]" />
        <div className="absolute bottom-[-30%] right-[-15%] h-[70vh] w-[55vw] rounded-full bg-[radial-gradient(closest-side,rgba(139,174,255,0.05),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-obsidian" />
      </div>

      <HeroScene />

      {/* copy layer — transparent to pointer events so the scene stays alive */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-end px-6 pb-28 pt-36 md:px-10 md:pb-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="mb-8 flex items-center gap-4"
          >
            <span aria-hidden className="h-px w-10 bg-titanium/50" />
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-titanium">
              {t.hero.label}
            </p>
          </motion.div>

          <h1 className="font-display text-[clamp(2.7rem,7.4vw,6.4rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-ice">
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "112%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.45, ease: EASE }}
              >
                {t.hero.title1}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block font-light tracking-[-0.01em] text-titanium"
                initial={{ y: "112%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.58, ease: EASE }}
              >
                {t.hero.title2}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
            className="mt-8 max-w-xl text-balance text-base leading-relaxed text-mute md:text-lg"
          >
            {t.hero.support}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#identidad"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ice px-6 py-3 text-sm font-medium text-obsidian transition-colors duration-300 hover:bg-white"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#vision"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-titanium transition-colors duration-300 hover:border-white/40 hover:text-ice"
            >
              {t.hero.ctaSecondary}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-mute">
          {t.hero.scroll}
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <span className="absolute left-0 top-0 h-2.5 w-px animate-[scroll-dot_2.2s_ease-in-out_infinite] bg-titanium" />
        </span>
      </motion.div>
    </section>
  );
}
