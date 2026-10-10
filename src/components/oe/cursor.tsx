"use client";

import { useEffect, useRef } from "react";

/**
 * Studio cursor — a precise dot with a lagging ring that expands over
 * interactive elements. Only activates on fine pointers (mouse/trackpad)
 * with motion allowed; never on touch devices.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let visible = false;
    let hovering = false;
    let pressed = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        rx = x;
        ry = y;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      const target = e.target as Element | null;
      hovering = !!target?.closest?.(
        'a, button, [role="button"], [data-cursor="hover"]',
      );
    };

    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const loop = () => {
      /* ring chases the dot with soft inertia */
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;

      const ringScale = (hovering ? 1.9 : 1) * (pressed ? 0.82 : 1);
      const ringOpacity = hovering ? 0.9 : 0.5;

      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${pressed ? 0.6 : 1})`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      ring.style.opacity = String(ringOpacity);

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      {/* precise dot — stays invisible until the first mouse move */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] h-1.5 w-1.5 rounded-full bg-ice opacity-0 transition-opacity duration-300"
      />
      {/* lagging ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] h-8 w-8 rounded-full border border-titanium/60 opacity-0 transition-opacity duration-300"
      />
    </>
  );
}
