"use client";

import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLang } from "./lang-provider";
import { EASE } from "./motion-primitives";
import { useIntroStore } from "./intro-store";
import { ScrambleText } from "./scramble-text";

/* 3D layer is client-only and code-split away from the initial JS payload. */
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

/**
 * Cinematic hero — full first screen.
 * Entrance choreography starts the moment the intro gate lifts:
 * atmosphere → sculpture → decode label → headline → support → actions.
 * Non-blocking: interaction is available immediately.
 */
export function Hero() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const phase = useIntroStore((s) => s.phase);
  const ready = phase === "done";

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      aria-label={t.nav.home}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* volumetric atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-20%] h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(185,192,201,0.07),transparent)]" />
        <div className="absolute bottom-[-30%] right-[-15%] h-[70vh] w-[55vw] rounded-full bg-[radial-gradient(closest-side,rgba(139,174,255,0.05),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-obsidian" />
      </div>

      {/* monumental ghost monogram — hollow, drifting against the scroll */}
      <motion.div
        aria-hidden
        style={{ y: reduced ? 0 : ghostY }}
        className="pointer-events-none absolute inset-y-0 right-[-4vw] z-0 hidden select-none items-center md:flex"
      >
        <p className="text-outline-faint font-display text-[42vw] font-semibold leading-none tracking-[-0.06em]">
          OE
        </p>
      </motion.div>

      <HeroScene />

      {/* copy layer — transparent to pointer events so the scene stays alive */}
      <motion.div
        style={reduced ? undefined : { y: copyY, opacity: fade }}
        className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-end px-6 pb-28 pt-36 md:px-10 md:pb-32"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="mb-8 flex items-center gap-4"
          >
            <span aria-hidden className="h-px w-10 bg-titanium/50" />
            <p
              className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-titanium"
              aria-label={t.hero.label}
            >
              <span aria-hidden>
                <ScrambleText text={t.hero.label} play={ready} delay={350} />
              </span>
            </p>
          </motion.div>

          <h1 className="font-display text-[clamp(2.7rem,7.4vw,6.4rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-ice">
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "112%" }}
                animate={ready ? { y: "0%" } : { y: "112%" }}
                transition={{ duration: 1, delay: 0.4, ease: EASE }}
              >
                {t.hero.title1}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block font-light tracking-[-0.01em] text-titanium"
                initial={{ y: "112%" }}
                animate={ready ? { y: "0%" } : { y: "112%" }}
                transition={{ duration: 1, delay: 0.53, ease: EASE }}
              >
                {t.hero.title2}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            className="mt-8 max-w-xl text-balance text-base leading-relaxed text-mute md:text-lg"
          >
            {t.hero.support}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#identidad"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ice px-6 py-3 text-sm font-medium text-obsidian transition-colors duration-300 hover:bg-white"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <a
              href="#vision"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-titanium transition-colors duration-300 hover:border-white/40 hover:text-ice"
            >
              {t.hero.ctaSecondary}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* living HUD — bottom right, desktop only */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-7 right-10 z-10 hidden flex-col items-end gap-1.5 lg:flex"
      >
        <LiveClock />
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-mute/80">
          {t.hero.hud}
        </span>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.55, duration: 1 }}
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

/** Magnetic hover — the primary action leans toward the cursor. */
function Magnetic({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  if (reduced) return <>{children}</>;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-9, Math.min(9, dx * 0.22)));
    y.set(Math.max(-7, Math.min(7, dy * 0.22)));
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/** Precision HUD clock — the system is alive. */
function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    /* async so the initial paint doesn't cascade */
    const raf = requestAnimationFrame(() => setTime(format()));
    const id = window.setInterval(() => setTime(format()), 1000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, []);

  return (
    <span className="font-mono text-[9px] tabular-nums tracking-[0.4em] text-mute/80">
      {time}
    </span>
  );
}
