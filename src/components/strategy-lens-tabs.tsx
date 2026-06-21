import { css } from "styled-system/css";
import type { StrategyLens } from "@/lib/areas";
import { useI18n } from "@/components/i18n-provider";

type StrategyLensTabsProps = {
  selected: StrategyLens;
  onChange: (lens: StrategyLens) => void;
};

const lenses: StrategyLens[] = ["live", "invest", "build"];

export function StrategyLensTabs({ selected, onChange }: StrategyLensTabsProps) {
  const { t } = useI18n();

  return (
    <div
      className={css({
        display: "grid",
        gap: "10px"
      })}
    >
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "4px",
          rounded: "control",
          border: "1px solid token(colors.line)",
          bg: "rgba(245,246,243,0.72)",
          p: "4px"
        })}
        role="tablist"
        aria-label={t("workspace.strategyLens")}
      >
        {lenses.map((lens) => {
          const isSelected = selected === lens;
          return (
            <button
              className={css({
                h: "38px",
                rounded: "control",
                border: "1px solid",
                borderColor: isSelected ? "token(colors.line)" : "transparent",
                bg: isSelected ? "panel" : "transparent",
                color: isSelected ? "ink" : "muted",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 800,
                shadow: isSelected ? "0 8px 22px rgba(23, 27, 31, 0.08)" : "none",
                _hover: {
                  color: "ink"
                },
                _focusVisible: {
                  outline: "3px solid rgba(17, 97, 76, 0.18)",
                  outlineOffset: "2px"
                }
              })}
              key={lens}
              onClick={() => onChange(lens)}
              role="tab"
              type="button"
              aria-selected={isSelected}
            >
              {t(`lens.${lens}`)}
            </button>
          );
        })}
      </div>

      <p
        className={css({
          m: 0,
          color: "muted",
          fontSize: "13px",
          lineHeight: 1.55
        })}
      >
        {t(`lens.${selected}Description`)}
      </p>
    </div>
  );
}
