"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultLocale, translate, type AppLocale, type UiCopyKey } from "@/lib/i18n";

type I18nContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  t: (key: UiCopyKey) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>(defaultLocale);

  useEffect(() => {
    // localStorage is read after mount to avoid coupling server-rendered markup
    // to a browser-only preference.
    const storedLocale = window.localStorage.getItem("areascope-locale");
    if (storedLocale === "en" || storedLocale === "zh") {
      setLocaleState(storedLocale);
    }
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    return {
      locale,
      setLocale: (nextLocale) => {
        setLocaleState(nextLocale);
        // Persist only the UI language; source/sample content stays as stored.
        window.localStorage.setItem("areascope-locale", nextLocale);
      },
      t: (key) => translate(locale, key)
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return value;
}
