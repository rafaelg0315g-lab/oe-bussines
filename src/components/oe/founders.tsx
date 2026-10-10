"use client";

import { motion } from "framer-motion";
import { useLang } from "./lang-provider";
import { Reveal, SectionHeading, EASE } from "./motion-primitives";
import { OeMark } from "./logo";

/**
 * Founders — two complementary editorial panels.
 * Abstract monograms (never photorealistic likenesses):
 * OSCAR = orbital ring, EDUARDO = structural bars.
 */
export function Founders() {
  const { t } = useLang();

  return (
    <section
      id="fundadores"
      aria-label={t.founders.kicker}
      className="relative scroll-mt-24 px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <SectionHeading kicker={t.founders.kicker} title={t.founders.title} />

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-base leading-[1.85] text-mute md:text-lg">
            {t.founders.intro}
          </p>
        </Reveal>

        <div className="mt-16 grid items-start gap-6 md:mt-24 md:grid-cols-2 md:gap-10">
          <FounderPanel
            index={0}
            variant="orbital"
            name={t.founders.people[0].name}
            initial={t.founders.people[0].initial}
          />
          <div className="md:mt-24">
            <FounderPanel
              index={1}
              variant="bars"
              name={t.founders.people[1].name}
              initial={t.founders.people[1].initial}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface FounderPanelProps {
  index: number;
  variant: "orbital" | "bars";
  name: string;
  initial: string;
}

function FounderPanel({ index, variant, name, initial }: FounderPanelProps) {
  const { t } = useLang();

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, x: index === 0 ? -18 : 18 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 1, ease: EASE, delay: 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-carbon via-carbon/60 to-obsidian p-8 transition-colors duration-500 hover:border-titanium/25 md:p-10"
    >
      <header className="flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.3em] text-mute">
          {t.founders.index} — 0{index + 1}
        </span>
        <OeMark className="h-5 w-5 text-titanium/30 transition-colors duration-500 group-hover:text-titanium/60" />
      </header>

      <div className="flex flex-1 items-center justify-center py-8 text-titanium transition-transform duration-700 ease-out group-hover:scale-[1.035]">
        {variant === "orbital" ? (
          <OrbitalMonogram label={initial} />
        ) : (
          <BarsMonogram label={initial} />
        )}
      </div>

      <footer>
        <h3 className="font-display text-4xl font-semibold tracking-[0.06em] text-ice md:text-5xl">
          {name}
        </h3>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.28em] text-mute">
          {t.founders.role}
        </p>
      </footer>

      <span
        aria-hidden
        className="absolute right-0 top-0 h-20 w-px bg-gradient-to-b from-titanium/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.article>
  );
}

/** OSCAR — the O: an orbital ring with a traveling satellite. */
function OrbitalMonogram({ label }: { label: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="h-44 w-44 md:h-52 md:w-52"
      fill="none"
      role="img"
      aria-label={`${label} — cofundador`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
    >
      <defs>
        <linearGradient
          id="oe-oscar"
          x1="0"
          y1="0"
          x2="200"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#e6eaf0" />
          <stop offset="55%" stopColor="#9aa2ad" />
          <stop offset="100%" stopColor="#4c525b" />
        </linearGradient>
      </defs>

      <motion.circle
        cx="100"
        cy="100"
        r="54"
        stroke="url(#oe-oscar)"
        strokeWidth="6"
        variants={{
          hidden: { pathLength: 0 },
          visible: {
            pathLength: 1,
            transition: { duration: 1.4, ease: EASE },
          },
        }}
      />
      <motion.ellipse
        cx="100"
        cy="100"
        rx="86"
        ry="28"
        stroke="#8b93a0"
        strokeOpacity="0.45"
        strokeWidth="1.4"
        transform="rotate(-18 100 100)"
        variants={{
          hidden: { pathLength: 0 },
          visible: {
            pathLength: 1,
            transition: { duration: 1.4, delay: 0.35, ease: EASE },
          },
        }}
      />
      <motion.g
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.6, delay: 1 } },
        }}
      >
        <circle cx="176" cy="66" r="5" fill="#e8ecf1" />
        <circle cx="176" cy="66" r="10" fill="#8bafff" fillOpacity="0.22" />
      </motion.g>
    </motion.svg>
  );
}

/** EDUARDO — the E: structural bars, architectural and precise. */
function BarsMonogram({ label }: { label: string }) {
  const bars = [
    { d: "M64 52v96", delay: 0 },
    { d: "M76 52h64", delay: 0.2 },
    { d: "M76 100h52", delay: 0.4 },
    { d: "M76 148h64", delay: 0.6 },
  ];

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="h-44 w-44 md:h-52 md:w-52"
      fill="none"
      role="img"
      aria-label={`${label} — cofundador`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
    >
      <defs>
        <linearGradient
          id="oe-eduardo"
          x1="0"
          y1="0"
          x2="200"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#e6eaf0" />
          <stop offset="55%" stopColor="#9aa2ad" />
          <stop offset="100%" stopColor="#4c525b" />
        </linearGradient>
      </defs>

      {bars.map((bar) => (
        <motion.path
          key={bar.d}
          d={bar.d}
          stroke="url(#oe-eduardo)"
          strokeWidth="7"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0 },
            visible: {
              pathLength: 1,
              transition: { duration: 0.9, delay: bar.delay, ease: EASE },
            },
          }}
        />
      ))}
    </motion.svg>
  );
}
