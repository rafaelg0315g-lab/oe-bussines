"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ChapterGhost — a monumental hollow numeral anchored to a chapter,
 * drifting slowly against the scroll. Pure editorial texture.
 */
export function ChapterGhost({
  numeral,
  className = "",
}: {
  numeral: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["16%", "-16%"]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute select-none overflow-visible ${className}`}
    >
      <motion.p
        style={{ y }}
        className="text-outline-faint font-display text-[clamp(11rem,30vw,26rem)] font-semibold leading-none tracking-[-0.04em]"
      >
        {numeral}
      </motion.p>
    </div>
  );
}
