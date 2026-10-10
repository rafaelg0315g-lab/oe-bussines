"use client";

import {
  LangProvider,
  useLang,
} from "@/components/oe/lang-provider";
import { Navbar } from "@/components/oe/navbar";
import { IntroGate } from "@/components/oe/intro-gate";
import { Cursor } from "@/components/oe/cursor";
import { SmoothScroll } from "@/components/oe/smooth-scroll";
import { Hero } from "@/components/oe/hero";
import { BrandTransition } from "@/components/oe/brand-transition";
import { Ticker } from "@/components/oe/ticker";
import { Identity } from "@/components/oe/identity";
import { Philosophy } from "@/components/oe/philosophy";
import { Vision } from "@/components/oe/vision";
import { Founders } from "@/components/oe/founders";
import { Manifesto } from "@/components/oe/manifesto";
import { Contact } from "@/components/oe/contact";
import { Footer } from "@/components/oe/footer";

/** Keyboard-accessible skip link, localized. */
function SkipLink() {
  const { t } = useLang();
  return (
    <a href="#main" className="skip-link">
      {t.a11y.skipToContent}
    </a>
  );
}

/** Microscopic film grain over the whole experience. */
function Grain() {
  return (
    <div
      aria-hidden
      className="grain-bg pointer-events-none fixed inset-0 z-[70] opacity-[0.05]"
    />
  );
}

export default function Home() {
  return (
    <LangProvider>
      <div className="relative flex min-h-screen flex-col bg-obsidian text-ice">
        <SkipLink />
        <Grain />
        <IntroGate />
        <Cursor />
        <SmoothScroll />
        <Navbar />

        <main id="main" className="flex-1">
          <Hero />
          <BrandTransition />
          <Ticker />
          <Identity />
          <Philosophy />
          <Vision />
          <Founders />
          <Manifesto />
          <Contact />
        </main>

        <Footer />
      </div>
    </LangProvider>
  );
}
