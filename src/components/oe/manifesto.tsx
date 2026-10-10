"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useLang } from "./lang-provider";
import { OeMark } from "./logo";

/**
 * Manifesto — the climactic moment. Deep black, monumental typography,
 * phrases that surface from blur and dissolve back with scroll.
 * Sticky but never scroll-blocked: the user always keeps free control.
 */
export function Manifesto() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const total = t.manifesto.lines.length + 1;
  const items = [
    ...t.manifesto.lines.map((text, i) => ({ text, i, brand: false })),
    { text: t.manifesto.brand, i: t.manifesto.lines.length, brand: true },
  ];

  /* glow intensifies as the final brand line approaches */
  const glowOpacity = useTransform(scrollYProgress, [0.68, 0.92], [0.16, 0.5]);

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
        {/* deep radial glow — rises with the final line */}
        <motion.div
          aria-hidden
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_42%_at_50%_50%,rgba(185,192,201,0.14),transparent_70%)]"
        />

        {/* chapter label */}
        <motion.p
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1 }}
          className="absolute top-20 font-mono text-[10px] uppercase tracking-[0.5em] text-mute/70 md:top-24"
        >
          {t.manifesto.label}
        </motion.p>

        {items.map((item) => (
          <ManifestoLine
            key={item.i}
            index={item.i}
            total={total}
            text={item.text}
            brand={item.brand}
            progress={scrollYProgress}
          />
        ))}

        {/* live line counter — 01 / 06 */}
        <LineCounter progress={scrollYProgress} total={total} />

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
  const y = useTransform(progress, [start, start + seg * 0.3], [52, 0]);
  const exitY = useTransform(
    progress,
    [start + seg * 0.72, start + seg * 0.95],
    [0, -36],
  );
  const scale = useTransform(progress, [start, start + seg * 0.3], [0.965, 1]);
  /* surface from blur, dissolve back into it */
  const filter = useTransform(
    progress,
    isLast
      ? [start, start + seg * 0.35, 1]
      : [start, start + seg * 0.3, start + seg * 0.72, start + seg * 0.95],
    isLast
      ? ["blur(12px)", "blur(0px)", "blur(0px)"]
      : ["blur(12px)", "blur(0px)", "blur(0px)", "blur(8px)"],
  );

  return (
    <motion.div
      style={{ opacity, y, scale, filter }}
      className="absolute inset-0 flex items-center justify-center px-4 text-center"
    >
      <motion.div style={isLast ? undefined : { y: exitY }}>
        {brand ? (
          <div className="flex flex-col items-center gap-9">
            <OeMark className="h-11 w-11 text-titanium" />
            <p className="text-metal font-display text-[clamp(2.2rem,6.4vw,5.2rem)] font-semibold tracking-[0.04em]">
              {text}
            </p>
          </div>
        ) : (
          <p className="font-display text-[clamp(2rem,6vw,4.9rem)] font-medium leading-[1.12] tracking-[-0.015em] text-ice">
            {text}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

/** Rollover counter — reads the current line like an instrument. */
function LineCounter({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  const [current, setCurrent] = useState(1);

  useMotionValueEvent(progress, "change", (v) => {
    const idx = Math.min(Math.floor(v * total) + 1, total);
    setCurrent(idx);
  });

  return (
    <div
      aria-hidden
      className="absolute bottom-10 left-6 flex items-baseline gap-2 font-mono text-[10px] tabular-nums tracking-[0.3em] text-mute md:left-10"
    >
      <span className="relative inline-block h-4 w-6 overflow-hidden">
        <motion.span
          key={current}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 text-titanium"
        >
          {String(current).padStart(2, "0")}
        </motion.span>
      </span>
      <span>/ {String(total).padStart(2, "0")}</span>
    </div>
  );
}
