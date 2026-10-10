"use client";

import { motion } from "framer-motion";
import { useLang } from "./lang-provider";
import { Reveal, SectionHeading, EASE } from "./motion-primitives";

/**
 * Philosophy — three principles, horizontal on desktop / vertical on mobile.
 * Space, hairlines, typography and motion carry the composition (no boxes).
 */
export function Philosophy() {
  const { t } = useLang();

  const graphics = [
    <VisionGraphic key="vision" />,
    <InnovationGraphic key="innovation" />,
    <EvolutionGraphic key="evolution" />,
  ];

  return (
    <section
      id="filosofia"
      aria-label={t.philosophy.kicker}
      className="relative scroll-mt-24 px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading kicker={t.philosophy.kicker} title={t.philosophy.title} />
          <Reveal delay={0.2}>
            <span
              aria-hidden
              className="hairline hidden w-40 md:block"
            />
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 md:mt-28 md:grid-cols-3 md:gap-0">
          {t.philosophy.items.map((item, i) => (
            <Reveal
              key={item.n}
              delay={i * 0.12}
              className={`group relative border-t border-white/[0.06] py-12 transition-colors duration-500 first:border-t-0 md:border-l md:border-t-0 md:py-2 md:pl-10 md:pr-10 md:first:border-l-0 md:first:pl-0 md:last:pr-0 ${
                i > 0 ? "md:pl-10" : ""
              }`}
            >
              {/* index + rule */}
              <div className="flex items-center gap-6">
                <span className="font-mono text-[11px] tracking-[0.3em] text-mute">
                  {item.n}
                </span>
                <span
                  aria-hidden
                  className="h-px flex-1 bg-white/[0.07] transition-colors duration-500 group-hover:bg-titanium/30"
                />
              </div>

              {/* principle graphic */}
              <div className="mt-10 text-titanium/60 transition-colors duration-500 group-hover:text-titanium">
                {graphics[i]}
              </div>

              <h3 className="mt-10 font-display text-xl font-semibold tracking-[0.1em] text-ice">
                {item.title}
              </h3>
              <p className="mt-4 max-w-xs text-[15px] leading-[1.8] text-mute">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Principle graphics ────────────────────────────────────────────── */

/** 01 VISIÓN — abstract horizon with converging sight lines. */
function VisionGraphic() {
  return (
    <svg
      viewBox="0 0 220 150"
      className="h-36 w-full"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <motion.line
        x1="10"
        y1="75"
        x2="210"
        y2="75"
        strokeOpacity="0.55"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      {[
        [15, 140],
        [72, 140],
        [110, 140],
        [148, 140],
        [205, 140],
      ].map(([x, y], i) => (
        <motion.line
          key={i}
          x1={x}
          y1={y}
          x2="110"
          y2="75"
          strokeOpacity="0.28"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 1.1, delay: 0.15 + i * 0.08, ease: EASE }}
        />
      ))}
      <motion.circle
        cx="152"
        cy="44"
        r="12"
        strokeOpacity="0.6"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
      />
    </svg>
  );
}

/** 02 INNOVACIÓN — fragmented geometry that reorganizes on hover. */
function InnovationGraphic() {
  const seg =
    "stroke-current transition-transform duration-700 ease-out [stroke-opacity:0.35] group-hover:[stroke-opacity:0.6]";
  return (
    <svg
      viewBox="0 0 220 150"
      className="h-36 w-full"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <g strokeWidth="1.6" strokeLinecap="round">
        {/* square outline, broken into drifting segments */}
        <path d="M70 45h34" className={`${seg} -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0`} />
        <path d="M116 45h34" className={`${seg} translate-x-2 -translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0`} />
        <path d="M150 57v34" className={`${seg} translate-x-2.5 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0`} />
        <path d="M150 103v34" className={`${seg} translate-x-3 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0`} />
        <path d="M138 137h-34" className={`${seg} translate-x-1.5 translate-y-2.5 group-hover:translate-x-0 group-hover:translate-y-0`} />
        <path d="M92 137h-34" className={`${seg} -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0`} />
        <path d="M70 125v-34" className={`${seg} -translate-x-2.5 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0`} />
        <path d="M70 79V57" className={`${seg} -translate-x-1.5 -translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0`} />
      </g>
      {/* reorganizing shards */}
      <g fill="currentColor" className="transition-opacity duration-700 [fill-opacity:0.25] group-hover:[fill-opacity:0.7]">
        <rect x="42" y="30" width="7" height="7" className="transition-transform duration-700 [transform:rotate(12deg)] group-hover:[transform:rotate(0deg)]" />
        <rect x="168" y="98" width="6" height="6" className="transition-transform duration-700 [transform:rotate(-18deg)] group-hover:[transform:rotate(0deg)]" />
        <rect x="160" y="30" width="5" height="5" className="transition-transform duration-700 [transform:rotate(24deg)] group-hover:[transform:rotate(0deg)]" />
      </g>
    </svg>
  );
}

/** 03 EVOLUCIÓN — nested structures slowly changing orientation. */
function EvolutionGraphic() {
  const spin = (dur: number, rev = false) => ({
    className: `animate-[${rev ? "spin-slower-rev" : "spin-slower"}_${dur}s_linear_infinite]`,
    style: { transformOrigin: "110px 75px", transformBox: "view-box" as const },
  });
  return (
    <svg
      viewBox="0 0 220 150"
      className="h-36 w-full"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <g strokeWidth="1.5">
        <polygon
          points="110,45 136,90 84,90"
          strokeOpacity="0.55"
          {...spin(50)}
        />
        <polygon
          points="110,30 155,75 110,120 65,75"
          strokeOpacity="0.38"
          {...spin(70, true)}
        />
        <polygon
          points="110,15 167,56 145,124 75,124 53,56"
          strokeOpacity="0.24"
          {...spin(90)}
        />
      </g>
      <circle cx="110" cy="75" r="2.6" fill="#8bafff" stroke="none" fillOpacity="0.8" />
    </svg>
  );
}
