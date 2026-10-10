"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { OeMark } from "./logo";
import { EASE } from "./motion-primitives";
import { INTRO_SEEN_KEY, useIntroStore } from "./intro-store";
import { useLang } from "./lang-provider";

const COUNTER_MS = 1500;
const HOLD_MS = 250;

/**
 * Cinematic intro gate — a single breath before the experience:
 * the monogram draws itself, a precision counter climbs to 100,
 * then the curtain splits and the hero takes the stage.
 * Plays once per session; instant lift for returning visitors.
 */
export function IntroGate() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const setPhase = useIntroStore((s) => s.setPhase);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(true);
  const raf = useRef(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    } catch {
      /* storage unavailable */
    }

    document.documentElement.style.overflow = "hidden";

    if (seen || reduced) {
      /* returning visitor / reduced motion — lift almost immediately */
      setPhase("done");
      const fade = window.setTimeout(() => setOpen(false), 420);
      const release = window.setTimeout(() => {
        document.documentElement.style.overflow = "";
      }, 460);
      return () => {
        window.clearTimeout(fade);
        window.clearTimeout(release);
        window.clearTimeout(release);
        document.documentElement.style.overflow = "";
      };
    }

    setPhase("playing");

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / COUNTER_MS, 1);
      /* ease-out for a decelerating, instrument-like climb */
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        /* hold a beat, then lift the curtain — hero starts as it parts */
        window.setTimeout(() => setPhase("done"), HOLD_MS);
        window.setTimeout(() => setOpen(false), HOLD_MS + 60);
      }
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      document.documentElement.style.overflow = "";
    };
  }, [reduced, setPhase]);

  /* release page scroll once the gate is fully gone */
  useEffect(() => {
    if (!open) {
      document.documentElement.style.overflow = "";
      try {
        window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {
        /* storage unavailable */
      }
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="intro-gate"
          className="fixed inset-0 z-[100]"
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 1, transition: { duration: 0.06 } }}
        >
          {/* split curtain */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-obsidian"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-obsidian"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: EASE }}
          />

          {/* content layer — fades just before the split */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            exit={{ opacity: 0, transition: { duration: 0.28, ease: "easeIn" } }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.82, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <OeMark className="h-12 w-12 text-titanium" />
            </motion.div>

            <div className="mt-10 overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                className="font-display text-6xl font-light tabular-nums tracking-tight text-ice md:text-7xl"
              >
                {String(count).padStart(3, "0")}
              </motion.p>
            </div>

            {/* precision hairline */}
            <div className="mt-8 h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                className="h-px origin-left bg-titanium"
                style={{ scaleX: count / 100 }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-7 font-mono text-[10px] uppercase tracking-[0.5em] text-mute"
            >
              {t.intro.concept}
            </motion.p>
          </motion.div>

          {/* corner registration marks */}
          <motion.div
            className="pointer-events-none absolute inset-x-6 bottom-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.4em] text-mute/70 md:inset-x-10"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <span>{t.intro.cornerBrand}</span>
            <span>{t.intro.cornerVision}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
