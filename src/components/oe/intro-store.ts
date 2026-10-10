"use client";

import { create } from "zustand";

/**
 * Global intro-gate state.
 * `boot`    — SSR/first paint: the gate is visible (prevents any flash).
 * `playing` — first visit in this session: cinematic counter is running.
 * `done`    — gate has lifted; hero/navbar run their entrance choreography.
 *
 * Sections deeper in the page use whileInView and are unaffected.
 */
export type IntroPhase = "boot" | "playing" | "done";

interface IntroState {
  phase: IntroPhase;
  setPhase: (phase: IntroPhase) => void;
}

export const useIntroStore = create<IntroState>((set) => ({
  phase: "boot",
  setPhase: (phase) => set({ phase }),
}));

export const INTRO_SEEN_KEY = "oe-intro-seen";
