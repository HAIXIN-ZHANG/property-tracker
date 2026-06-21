"use client";

import { BarChart3, ExternalLink, Landmark, Newspaper, Route, TrendingUp } from "lucide-react";
import { css } from "styled-system/css";
import type { MarketBriefCategory } from "@/lib/market-brief";
import { marketBriefItems } from "@/lib/market-brief";
import { useI18n } from "@/components/i18n-provider";

const categoryIcons: Record<MarketBriefCategory, typeof BarChart3> = {
  data: BarChart3,
  market: TrendingUp,
  planning: Route,
  policy: Landmark
};

export function MarketBrief() {
  const { t } = useI18n();

  return (
    <section
      className={css({
        mt: "18px",
        bg: "panel",
        border: "1px solid token(colors.line)",
        rounded: "panel",
        shadow: "soft",
        overflow: "hidden"
      })}
      aria-labelledby="market-brief-title"
    >
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: { base: "1fr", lg: "0.62fr 1.38fr" },
          minH: { lg: "306px" }
        })}
      >
        <div
          className={css({
            p: { base: "20px", md: "24px" },
            borderBottom: { base: "1px solid token(colors.line)", lg: "none" },
            borderRight: { lg: "1px solid token(colors.line)" },
            bg: "rgba(245,246,243,0.72)"
          })}
        >
          <div
            className={css({
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "eucalyptus",
              fontSize: "13px",
              fontWeight: 750
            })}
          >
            <Newspaper size={16} />
            {t("brief.eyebrow")}
          </div>
          <h2
            className={css({
              m: 0,
              mt: "14px",
              fontSize: { base: "24px", md: "30px" },
              lineHeight: 1.12,
              letterSpacing: "0"
            })}
            id="market-brief-title"
          >
            {t("brief.title")}
          </h2>
          <p
            className={css({
              m: 0,
              mt: "12px",
              color: "muted",
              fontSize: "15px",
              lineHeight: 1.65
            })}
          >
            {t("brief.description")}
          </p>
        </div>

        <div
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", md: "repeat(2, minmax(0, 1fr))" }
          })}
        >
          {marketBriefItems.map((item, index) => {
            const Icon = categoryIcons[item.category];
            const isOddLastItem =
              marketBriefItems.length % 2 === 1 && index === marketBriefItems.length - 1;
            return (
              <a
                className={css({
                  display: "grid",
                  gap: "10px",
                  gridColumn: { md: isOddLastItem ? "1 / -1" : "auto" },
                  p: { base: "16px", md: "18px" },
                  minH: "132px",
                  color: "ink",
                  textDecoration: "none",
                  borderBottom: {
                    base:
                      index === marketBriefItems.length - 1
                        ? "none"
                        : "1px solid token(colors.line)",
                    md:
                      index >= marketBriefItems.length - 2 ? "none" : "1px solid token(colors.line)"
                  },
                  borderRight: {
                    md: !isOddLastItem && index % 2 === 0 ? "1px solid token(colors.line)" : "none"
                  },
                  _hover: {
                    bg: "rgba(17, 97, 76, 0.045)"
                  },
                  _focusVisible: {
                    outline: "3px solid rgba(17, 97, 76, 0.18)",
                    outlineOffset: "-3px"
                  }
                })}
                href={item.href}
                key={`${item.sourceName}-${item.title}`}
                rel="noreferrer"
                target="_blank"
              >
                <div
                  className={css({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px"
                  })}
                >
                  <div
                    className={css({
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      color: item.priority === "primary" ? "eucalyptus" : "muted",
                      fontSize: "12px",
                      fontWeight: 750,
                      textTransform: "uppercase"
                    })}
                  >
                    <Icon size={15} />
                    {item.cadence}
                  </div>
                  <ExternalLink className={css({ flex: "0 0 auto", color: "muted" })} size={15} />
                </div>

                <div>
                  <h3
                    className={css({
                      m: 0,
                      fontSize: "16px",
                      lineHeight: 1.25
                    })}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={css({
                      m: 0,
                      mt: "3px",
                      color: "muted",
                      fontSize: "13px",
                      fontWeight: 650
                    })}
                  >
                    {item.sourceName}
                  </p>
                </div>

                <p
                  className={css({
                    m: 0,
                    color: "muted",
                    fontSize: "13px",
                    lineHeight: 1.5
                  })}
                >
                  {item.relevance}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
