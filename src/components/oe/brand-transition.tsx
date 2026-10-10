"use client";

import { motion } from "framer-motion";
import { useLang } from "./lang-provider";
import { EASE } from "./motion-primitives";

/**
 * Brand transition — a thin line composition carrying the bridge quote.
 * Words surface progressively as the section enters the viewport
 * (works in both scroll directions, no jarring repeats).
 */
export function BrandTransition() {
  const { t } = useLang();
  const words = t.transition.text.split(" ");

  return (
    <section
      aria-label={t.transition.text}
      className="relative flex min-h-[64vh] flex-col items-center justify-center px-6 py-28"
    >
      <motion.span
        aria-hidden
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: false, amount: 0.9 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="hairline-v h-16 origin-top md:h-20"
      />

      <p className="mx-auto mt-12 max-w-3xl text-center font-display text-[clamp(1.55rem,3.4vw,2.8rem)] font-medium leading-[1.35] tracking-[-0.01em] text-ice">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            initial={{ opacity: 0.1, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.85 }}
            transition={{ duration: 0.7, delay: i * 0.075, ease: EASE }}
            className="inline-block"
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </p>

      <motion.span
        aria-hidden
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: false, amount: 0.9 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="hairline-v mt-12 h-16 origin-bottom md:h-20"
      />
    </section>
  );
}
