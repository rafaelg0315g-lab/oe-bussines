"use client";

import { useLang } from "./lang-provider";
import { Reveal, SectionHeading } from "./motion-primitives";

/**
 * Identity — editorial asymmetric composition:
 * large title left, copy right, brushed-metal panel as counterpoint.
 */
export function Identity() {
  const { t } = useLang();

  return (
    <section
      id="identidad"
      aria-label={t.identity.kicker}
      className="relative scroll-mt-24 px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
        {/* left: title + metallic surface */}
        <div className="md:col-span-6">
          <SectionHeading
            kicker={t.identity.kicker}
            title={t.identity.title}
            titleClassName="max-w-xl"
          />

          <Reveal delay={0.18} className="mt-14 max-w-xl">
            <MetalPanel label={t.identity.panelLabel} />
          </Reveal>
        </div>

        {/* right: editorial copy, offset down */}
        <div className="md:col-span-5 md:col-start-8 md:mt-28">
          <div className="space-y-9">
            {[t.identity.p1, t.identity.p2, t.identity.p3].map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex gap-6">
                  <span
                    aria-hidden
                    className="mt-[13px] h-px w-8 shrink-0 bg-titanium/30"
                  />
                  <p className="text-[15px] leading-[1.9] text-mute md:text-base">
                    {paragraph}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.32em] text-titanium/70">
              {t.identity.panelLabel}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Brushed dark-metal surface with the engraved OE monogram and a slow sheen. */
function MetalPanel({ label }: { label: string }) {
  return (
    <figure
      aria-hidden
      className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-graphite via-carbon to-obsidian"
    >
      <svg viewBox="0 0 480 320" className="block h-auto w-full">
        <defs>
          <linearGradient id="oe-brush" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22262c" />
            <stop offset="50%" stopColor="#101215" />
            <stop offset="100%" stopColor="#0a0b0d" />
          </linearGradient>
          <linearGradient id="oe-engrave" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d7dce2" />
            <stop offset="55%" stopColor="#8a919c" />
            <stop offset="100%" stopColor="#4c525b" />
          </linearGradient>
        </defs>

        <rect width="480" height="320" fill="url(#oe-brush)" />

        {/* microscopic brushed texture */}
        <g stroke="#ffffff" strokeOpacity="0.022">
          {Array.from({ length: 40 }, (_, i) => (
            <line key={i} x1="0" y1={i * 8} x2="480" y2={i * 8} />
          ))}
        </g>

        {/* engraved monogram: dark cut + light edge */}
        <g transform="translate(240 164)">
          <g
            stroke="#000000"
            strokeOpacity="0.55"
            strokeWidth="3"
            fill="none"
            transform="translate(1.6 1.6)"
          >
            <circle cx="-14" r="44" />
            <path d="M24 -28h40M24 0h28M24 28h40" strokeLinecap="round" />
          </g>
          <g stroke="url(#oe-engrave)" strokeWidth="3" fill="none">
            <circle cx="-14" r="44" />
            <path d="M24 -28h40M24 0h28M24 28h40" strokeLinecap="round" />
          </g>
        </g>

        {/* corner registration marks */}
        <g stroke="#858b95" strokeOpacity="0.35">
          <path d="M18 14v10M18 14h10M462 306v-10M462 306h-10" />
        </g>
      </svg>

      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1/3 animate-[sheen-move_10s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.045] to-transparent"
      />

      <figcaption className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.3em] text-mute">
        {label}
      </figcaption>
    </figure>
  );
}
