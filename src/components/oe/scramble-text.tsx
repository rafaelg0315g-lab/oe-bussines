"use client";

import { useEffect, useRef, useState } from "react";

const POOL = "!<>-_\\/[]{}—=+*^?#·—";

/**
 * ScrambleText — the "decode" effect: characters resolve left-to-right
 * out of a pool of technical glyphs. Plays once when `play` turns true.
 * While idle it renders the plain text. Keep an aria-label on the
 * parent element for assistive technology.
 */
export function ScrambleText({
  text,
  play,
  delay = 0,
}: {
  text: string;
  play: boolean;
  delay?: number;
}) {
  /* state only carries the scrambling output; idle rendering is derived */
  const [output, setOutput] = useState<string | null>(null);
  const frame = useRef(0);

  useEffect(() => {
    if (!play) return;

    let timeout = 0;
    const DURATION = 900;
    const STEP = 38;

    const tick = (start: number) => {
      const p = Math.min((performance.now() - start) / DURATION, 1);
      const resolved = Math.floor(p * text.length);

      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (i < resolved || char === " " || char === "/") return char;
            return POOL[Math.floor(Math.random() * POOL.length)];
          })
          .join(""),
      );

      if (p < 1) {
        frame.current = window.setTimeout(() => tick(start), STEP);
      } else {
        setOutput(null); /* resolved — render the real text again */
      }
    };

    timeout = window.setTimeout(() => {
      frame.current = window.setTimeout(() => tick(performance.now()), 0);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(frame.current);
    };
  }, [play, text, delay]);

  return <span className="tabular-nums">{output ?? text}</span>;
}
