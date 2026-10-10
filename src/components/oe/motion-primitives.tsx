"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Shared motion language — soft cinematic ease used across the whole site. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  amount?: number;
  once?: boolean;
  duration?: number;
}

/**
 * Scroll-triggered reveal. Re-arms when scrolled away so returning
 * through the page keeps the rhythm alive (smooth, no flicker).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  amount = 0.3,
  once = false,
  duration = 0.9,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  kicker: string;
  title: ReactNode;
  className?: string;
  titleClassName?: string;
  /** Optional size override (full Tailwind text-size utility). */
  titleSize?: string;
}

/** Shared chapter heading: mono kicker + large display title. */
export function SectionHeading({
  kicker,
  title,
  className = "",
  titleClassName = "",
  titleSize = "text-[clamp(2rem,4.6vw,3.75rem)]",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <Reveal y={16}>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-mute">
          <span
            aria-hidden
            className="mr-3 inline-block h-px w-6 translate-y-[-3px] bg-titanium/40"
          />
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-6 max-w-3xl font-display ${titleSize} font-semibold leading-[1.04] tracking-[-0.02em] text-ice ${titleClassName}`}
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
