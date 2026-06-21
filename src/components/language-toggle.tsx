"use client";

import { css } from "styled-system/css";
import { localeLabels, type AppLocale } from "@/lib/i18n";
import { useI18n } from "@/components/i18n-provider";

const locales: AppLocale[] = ["en", "zh"];

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={css({
        display: "inline-grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "3px",
        rounded: "999px",
        border: "1px solid token(colors.line)",
        bg: "panel",
        p: "3px"
      })}
      aria-label="Language"
    >
      {locales.map((item) => {
        const isSelected = item === locale;
        return (
          <button
            className={css({
              minW: "34px",
              h: "28px",
              rounded: "999px",
              border: "none",
              bg: isSelected ? "eucalyptus" : "transparent",
              color: isSelected ? "white" : "muted",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 850,
              _hover: {
                color: isSelected ? "white" : "ink"
              },
              _focusVisible: {
                outline: "3px solid rgba(17, 97, 76, 0.18)",
                outlineOffset: "2px"
              }
            })}
            key={item}
            onClick={() => setLocale(item)}
            type="button"
            aria-pressed={isSelected}
          >
            {localeLabels[item]}
          </button>
        );
      })}
    </div>
  );
}
