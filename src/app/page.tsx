"use client";

import {
  LangProvider,
  useLang,
} from "@/components/oe/lang-provider";
import { Navbar } from "@/components/oe/navbar";
import { Hero } from "@/components/oe/hero";
import { BrandTransition } from "@/components/oe/brand-transition";
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
        <Navbar />

        <main id="main" className="flex-1">
          <Hero />
          <BrandTransition />
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
