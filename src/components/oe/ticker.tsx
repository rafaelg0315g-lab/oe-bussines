"use client";

import { useLang } from "./lang-provider";

/**
 * THE NEXT FORM ticker — a slow editorial marquee that carries the
 * brand values between chapters. Pure CSS, duplicated track, pauses
 * on hover, collapses under reduced motion.
 */
export function Ticker() {
  const { t } = useLang();
  const words = t.ticker.words;
  const track = (
    <>
      {words.map((word, i) => (
        <span key={i} className="flex shrink-0 items-center gap-8 md:gap-12">
          <span className="font-mono text-[12px] uppercase tracking-[0.42em] text-titanium/70 md:text-[13px]">
            {word}
          </span>
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rotate-45 border border-titanium/40"
          />
        </span>
      ))}
    </>
  );

  return (
    <div
      aria-hidden
      className="group relative overflow-hidden border-y border-white/[0.05] py-5 md:py-6"
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-obsidian to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-obsidian to-transparent" />

      <div className="flex w-max animate-[marquee_36s_linear_infinite] group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">
          {track}
        </div>
        <div className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">
          {track}
        </div>
      </div>
    </div>
  );
}
