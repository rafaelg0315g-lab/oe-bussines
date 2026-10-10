"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "./lang-provider";
import { Reveal, SectionHeading } from "./motion-primitives";

/* Immersive horizon scene — mounted only when the chapter approaches. */
const VisionScene = dynamic(() => import("./vision-scene"), { ssr: false });

/**
 * Vision — the spatial chapter. A monumental ring-horizon holds the
 * composition while oversized editorial text drifts on scroll.
 */
export function Vision() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const sceneY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section
      id="vision"
      ref={ref}
      aria-label={t.vision.kicker}
      className="relative scroll-mt-24 overflow-hidden px-6 py-32 md:px-10 md:py-52"
    >
      {/* 3D horizon with gentle parallax */}
      <motion.div style={{ y: sceneY }} className="absolute inset-0">
        <VisionScene />
      </motion.div>

      {/* readability veils */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-obsidian to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-obsidian to-transparent"
      />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto w-full max-w-[1320px]"
      >
        <SectionHeading
          kicker={t.vision.kicker}
          title={t.vision.title}
          titleSize="text-[clamp(2.3rem,5.6vw,4.9rem)]"
          titleClassName="max-w-4xl"
        />

        <div className="mt-24 grid gap-12 md:mt-36 md:grid-cols-12">
          <Reveal className="md:col-span-4 md:col-start-2">
            <p className="text-base leading-[1.95] text-titanium md:text-lg">
              {t.vision.p1}
            </p>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-4 md:col-start-7 md:mt-20">
            <p className="text-base leading-[1.95] text-titanium md:text-lg">
              {t.vision.p2}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-28 font-mono text-[10px] uppercase tracking-[0.42em] text-mute md:mt-40">
            {t.vision.fig}
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
}
