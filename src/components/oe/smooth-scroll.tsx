"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useIntroStore } from "./intro-store";

/**
 * Lenis smooth scrolling — the buttery inertia that makes the whole
 * experience feel machined. Anchor navigation is intercepted so jumps
 * become long, eased camera moves. Disabled under reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    /* hold the scroll while the intro gate is on stage */
    const phase = useIntroStore.getState().phase;
    if (phase !== "done") lenis.stop();
    const unsubPhase = useIntroStore.subscribe((state) => {
      if (state.phase === "done") lenis.start();
      else lenis.stop();
    });

    /* long eased camera moves for anchor navigation */
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, {
        offset: -72,
        duration: 1.5,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
    };
    document.addEventListener("click", onClick);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      unsubPhase();
      lenis.destroy();
    };
  }, []);

  return null;
}
