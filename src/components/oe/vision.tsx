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
      {/* content-stage scrim — keeps the ecosystem copy readable over the scene */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[24%] bg-gradient-to-b from-transparent via-obsidian/85 to-obsidian"
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

        {/* OE AI — flagship product line of the ecosystem */}
        <div className="mt-28 grid gap-10 md:mt-44 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-titanium/80">
              {t.vision.aiKicker}
            </p>
            <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.01em] text-ice md:text-4xl">
              {t.vision.aiTitle}
            </h3>
            <p className="mt-6 text-[15px] leading-[1.9] text-mute">
              {t.vision.aiText}
            </p>
            <span className="mt-8 inline-block rounded-full border border-titanium/25 px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.28em] text-titanium/80">
              {t.vision.aiStatus}
            </span>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-7 md:col-start-6">
            <ul className="rounded-2xl border border-white/[0.07] bg-obsidian/70 backdrop-blur-md">
              {t.vision.aiItems.map((item, i) => (
                <li
                  key={item.name}
                  className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-6 py-4 ${
                    i > 0 ? "border-t border-white/[0.06]" : ""
                  }`}
                >
                  <span className="font-display text-base font-medium text-ice">
                    {item.name}
                  </span>
                  <span className="text-sm text-mute">{item.detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* OE VIRAL ENGINE — upcoming SEO & growth project */}
        <div className="mt-24 grid gap-10 md:mt-32 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-titanium/80">
              {t.vision.viralKicker}
            </p>
            <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.01em] text-ice md:text-3xl">
              {t.vision.viralTitle}
            </h3>
            <p className="mt-6 text-[15px] leading-[1.9] text-mute">
              {t.vision.viralText}
            </p>
            <span className="mt-8 inline-block rounded-full border border-titanium/25 px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.28em] text-titanium/80">
              {t.vision.aiStatus}
            </span>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-7 md:col-start-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute/70">
              {t.vision.viralCapLabel}
            </p>
            <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
              {t.vision.viralItems.map((cap) => (
                <li
                  key={cap}
                  className="flex items-baseline gap-3 border-t border-white/[0.06] py-3.5 text-sm leading-relaxed text-mute"
                >
                  <span aria-hidden className="text-titanium/60">
                    +
                  </span>
                  {cap}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Roadmap — what comes next for the OE ecosystem */}
        <div className="mt-28 md:mt-44">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-titanium/80">
              {t.vision.roadmapLabel}
            </p>
            <h3 className="mt-5 max-w-3xl font-display text-3xl font-semibold tracking-[-0.015em] text-ice md:text-[2.6rem] md:leading-[1.12]">
              {t.vision.roadmapTitle}
            </h3>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.9] text-mute md:text-base">
              {t.vision.roadmapSubtitle}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {t.vision.roadmap.map((cat, i) => (
              <Reveal key={cat.cat} delay={(i % 3) * 0.08} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-obsidian/85 p-7 backdrop-blur-md transition-colors duration-500 hover:border-white/[0.14]">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.26em] text-ice">
                      {cat.cat}
                    </h4>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.22em] ${
                        cat.tone === "hi"
                          ? "border-titanium/30 text-titanium/90"
                          : "border-white/10 text-mute/80"
                      }`}
                    >
                      {cat.tag}
                    </span>
                  </div>
                  <ul className="mt-6 space-y-2.5">
                    {cat.items.map((product) => (
                      <li
                        key={product}
                        className="font-display text-[15px] font-medium text-titanium"
                      >
                        {product}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-6 text-[13px] leading-[1.75] text-mute">
                    {cat.goal}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-10 font-mono text-[10px] uppercase leading-relaxed tracking-[0.28em] text-mute/60">
              {t.vision.roadmapNote}
            </p>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
