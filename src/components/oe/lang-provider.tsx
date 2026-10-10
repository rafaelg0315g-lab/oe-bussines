"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";
import {
  dictionaries,
  LANG_KEY,
  type Dictionary,
  type Lang,
} from "@/lib/i18n/dictionary";

/* ── tiny external store for the UI language ─────────────────────── */

let currentLang: Lang | null = null;
const listeners = new Set<() => void>();

function readLang(): Lang {
  if (currentLang) return currentLang;
  try {
    const saved = window.localStorage.getItem(LANG_KEY);
    currentLang = saved === "en" ? "en" : "es";
  } catch {
    currentLang = "es";
  }
  return currentLang;
}

function subscribeLang(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function writeLang(next: Lang) {
  currentLang = next;
  try {
    window.localStorage.setItem(LANG_KEY, next);
  } catch {
    /* storage unavailable */
  }
  document.documentElement.lang = next;
  listeners.forEach((fn) => fn());
}

/* ── context ──────────────────────────────────────────────────────── */

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  // Server snapshot is "es"; after hydration React adopts the stored value.
  const lang = useSyncExternalStore(subscribeLang, readLang, () => "es" as Lang);

  // Keep <html lang> in sync with the active language (external system).
  useEffect(() => {
    document.documentElement.lang = readLang();
  }, [lang]);

  const setLang = useCallback((next: Lang) => writeLang(next), []);

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, t: dictionaries[lang] }),
    [lang, setLang],
  );

  return (
    <LangContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within <LangProvider>");
  return ctx;
}
