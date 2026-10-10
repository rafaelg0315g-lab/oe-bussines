"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useLang } from "./lang-provider";
import { OeMark } from "./logo";

/**
 * Manifesto — the climactic moment. Deep black, oversized typography,
 * phrases that surface and dissolve with scroll. Sticky but never
 * scroll-blocked: the user always keeps free control.
 */
export function Manifesto() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const items = [
    ...t.manifesto.lines.map((text, i) => ({ text, i, brand: false })),
    { text: t.manifesto.brand, i: t.manifesto.lines.length, brand: true },
  ];

  /* Accessible static version when the user prefers reduced motion */
  if (reduced) {
    return (
      <section
        id="manifiesto"
        aria-label="Manifiesto"
        className="scroll-mt-24 px-6 py-32 md:py-44"
      >
        <div className="mx-auto max-w-3xl space-y-10 text-center">
          {t.manifesto.lines.map((line) => (
            <p
              key={line}
              className="font-display text-[clamp(1.6rem,3.6vw,2.6rem)] font-medium leading-snug text-ice"
            >
              {line}
            </p>
          ))}
          <div className="flex flex-col items-center gap-6 pt-6">
            <OeMark className="h-10 w-10 text-titanium" />
            <p className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold tracking-[0.04em] text-metal">
              {t.manifesto.brand}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="manifiesto"
      ref={ref}
      aria-label="Manifiesto"
      className="relative h-[360vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        {items.map((item) => (
          <ManifestoLine
            key={item.i}
            index={item.i}
            total={items.length}
            text={item.text}
            brand={item.brand}
            progress={scrollYProgress}
          />
        ))}

        {/* progress hairline */}
        <motion.div
          aria-hidden
          className="absolute bottom-10 left-1/2 h-px w-24 -translate-x-1/2 bg-white/10"
        >
          <motion.span
            className="block h-px origin-left bg-titanium/70"
            style={{ scaleX: scrollYProgress }}
          />
        </motion.div>
      </div>
    </section>
  );
}

interface ManifestoLineProps {
  index: number;
  total: number;
  text: string;
  brand: boolean;
  progress: MotionValue<number>;
}

function ManifestoLine({ index, total, text, brand, progress }: ManifestoLineProps) {
  const seg = 1 / total;
  const start = index * seg;
  const isLast = index === total - 1;

  const opacity = useTransform(
    progress,
    isLast
      ? [start, start + seg * 0.35, 1]
      : [start, start + seg * 0.3, start + seg * 0.72, start + seg * 0.95],
    isLast ? [0, 1, 1] : [0, 1, 0.85, 0],
  );
  const y = useTransform(
    progress,
    [start, start + seg * 0.3],
    [42, 0],
  );
  const exitY = useTransform(
    progress,
    [start + seg * 0.72, start + seg * 0.95],
    [0, -30],
  );
  const scale = useTransform(progress, [start, start + seg * 0.3], [0.97, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex items-center justify-center px-4 text-center"
    >
      <motion.div style={isLast ? undefined : { y: exitY }}>
        {brand ? (
          <div className="flex flex-col items-center gap-8">
            <OeMark className="h-11 w-11 text-titanium" />
            <p className="font-display text-[clamp(2rem,5.4vw,4.4rem)] font-semibold tracking-[0.04em] text-metal">
              {text}
            </p>
          </div>
        ) : (
          <p className="font-display text-[clamp(1.8rem,5vw,4.1rem)] font-medium leading-[1.15] tracking-[-0.01em] text-ice">
            {text}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
