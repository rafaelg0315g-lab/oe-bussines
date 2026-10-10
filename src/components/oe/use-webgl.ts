"use client";

import { useSyncExternalStore } from "react";

/**
 * Progressive-enhancement hook: null while SSR/hydration,
 * then true/false once WebGL support is known (cached per session).
 */
const noopSubscribe = () => () => {};

let cachedSupport: boolean | null = null;

function computeWebGLSupport(): boolean {
  if (cachedSupport !== null) return cachedSupport;
  try {
    const canvas = document.createElement("canvas");
    cachedSupport = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    cachedSupport = false;
  }
  return cachedSupport;
}

export function useWebGLAvailable(): boolean | null {
  return useSyncExternalStore(
    noopSubscribe,
    computeWebGLSupport,
    () => null,
  );
}

/** Respect OS-level motion preference inside R3F scenes. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
