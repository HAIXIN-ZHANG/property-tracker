"use client";

import { BarChart3, DatabaseZap, MapPinned, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { css } from "styled-system/css";
import { sampleAreas, sourceCards } from "@/lib/sample-data";
import { getSourceStatusMeta } from "@/lib/source-status";
import { LanguageToggle } from "@/components/language-toggle";
import { MarketBrief } from "@/components/market-brief";
import { SourceStatusPill } from "@/components/source-status-pill";
import { useI18n } from "@/components/i18n-provider";

export function AppShell() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const matchingAreas = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return sampleAreas;
    }

    return sampleAreas.filter((area) =>
      `${area.name} ${area.postcode}`.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);
  // The primary CTA follows the first filtered sample area. If there is no
  // match, it stays disabled instead of silently opening an unrelated suburb.
  const primaryArea = matchingAreas[0];

  return (
    <main
      className={css({
        minHeight: "100vh",
        px: { base: "20px", md: "40px" },
        py: { base: "20px", md: "32px" }
      })}
    >
      <div
        className={css({
          mx: "auto",
          maxW: "1180px"
        })}
      >
        <header
          className={css({
            display: "flex",
            flexDirection: { base: "column", md: "row" },
            alignItems: { base: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: "16px",
            mb: { base: "28px", md: "40px" }
          })}
        >
          <div>
            <p
              className={css({
                m: 0,
                color: "muted",
                fontSize: "13px",
                fontWeight: 600
              })}
            >
              {t("app.kicker")}
            </p>
            <h1
              className={css({
                m: 0,
                mt: "4px",
                fontSize: { base: "28px", md: "38px" },
                lineHeight: 1.05,
                letterSpacing: "0"
              })}
            >
              {t("app.title")}
            </h1>
          </div>

          <div
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap"
            })}
          >
            <LanguageToggle />
            <div
              className={css({
                display: "flex",
                alignItems: "center",
                alignSelf: { base: "flex-start", md: "center" },
                gap: "8px",
                rounded: "control",
                border: "1px solid token(colors.line)",
                bg: "panel",
                px: "10px",
                py: "8px",
                color: "muted",
                fontSize: "13px",
                fontWeight: 600,
                whiteSpace: "nowrap"
              })}
            >
              <ShieldCheck size={16} />
              {t("app.sourceBacked")}
            </div>
          </div>
        </header>

        <section
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", lg: "1.05fr 0.95fr" },
            gap: "18px",
            alignItems: "stretch"
          })}
        >
          <div
            className={css({
              bg: "panel",
              border: "1px solid token(colors.line)",
              rounded: "panel",
              shadow: "soft",
              p: { base: "22px", md: "28px" }
            })}
          >
            <div
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "eucalyptus",
                fontWeight: 700,
                mb: "18px"
              })}
            >
              <Search size={18} />
              {t("home.foundation")}
            </div>

            <h2
              className={css({
                m: 0,
                maxW: "680px",
                fontSize: { base: "32px", md: "48px" },
                lineHeight: 1.02,
                letterSpacing: "0"
              })}
            >
              {t("home.heading")}
            </h2>

            <p
              className={css({
                mt: "16px",
                mb: 0,
                maxW: "660px",
                color: "muted",
                fontSize: { base: "16px", md: "18px" },
                lineHeight: 1.65
              })}
            >
              {t("home.description")}
            </p>

            <div
              className={css({
                mt: "26px",
                display: "grid",
                gridTemplateColumns: { base: "1fr", sm: "1fr auto" },
                gap: "10px"
              })}
            >
              <label className={css({ display: "grid", gap: "7px" })}>
                <span className={css({ color: "muted", fontSize: "13px", fontWeight: 650 })}>
                  {t("home.sampleArea")}
                </span>
                <input
                  type="search"
                  className={css({
                    h: "44px",
                    rounded: "control",
                    border: "1px solid token(colors.line)",
                    px: "13px",
                    outline: "none",
                    bg: "canvas",
                    color: "ink",
                    _focus: {
                      borderColor: "eucalyptus",
                      boxShadow: "0 0 0 3px rgba(17, 97, 76, 0.14)"
                    }
                  })}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("home.searchPlaceholder")}
                  aria-label={t("home.searchPlaceholder")}
                />
              </label>

              {primaryArea ? (
                <Link
                  className={css({
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "end",
                    h: "44px",
                    rounded: "control",
                    border: "1px solid token(colors.eucalyptus)",
                    bg: "eucalyptus",
                    color: "#fff",
                    px: "18px",
                    fontWeight: 750,
                    cursor: "pointer",
                    _hover: { bg: "#0d523f" }
                  })}
                  href={`/areas/${primaryArea.slug}`}
                  style={{ color: "#fff" }}
                >
                  {t("home.openWorkspace")}
                </Link>
              ) : (
                <button
                  className={css({
                    alignSelf: "end",
                    h: "44px",
                    rounded: "control",
                    border: "1px solid token(colors.line)",
                    bg: "rgba(102, 115, 109, 0.08)",
                    color: "muted",
                    px: "18px",
                    fontWeight: 750,
                    cursor: "not-allowed"
                  })}
                  disabled
                  type="button"
                >
                  {t("home.noAreaToOpen")}
                </button>
              )}
            </div>
          </div>

          <div
            className={css({
              display: "grid",
              gap: "12px"
            })}
          >
            {sourceCards.map((card) => {
              const meta = getSourceStatusMeta(card.status);
              return (
                <article
                  className={css({
                    bg: "panel",
                    border: "1px solid token(colors.line)",
                    rounded: "panel",
                    p: "18px"
                  })}
                  key={card.title}
                >
                  <div
                    className={css({
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      alignItems: "flex-start"
                    })}
                  >
                    <div>
                      <div
                        className={css({
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          mb: "7px",
                          color: meta.color
                        })}
                      >
                        {card.icon === "data" ? <DatabaseZap size={17} /> : null}
                        {card.icon === "map" ? <MapPinned size={17} /> : null}
                        {card.icon === "chart" ? <BarChart3 size={17} /> : null}
                        <h3 className={css({ m: 0, fontSize: "16px" })}>{card.title}</h3>
                      </div>
                      <p
                        className={css({
                          m: 0,
                          color: "muted",
                          fontSize: "14px",
                          lineHeight: 1.55
                        })}
                      >
                        {card.description}
                      </p>
                    </div>
                    <SourceStatusPill status={card.status} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          className={css({
            mt: "18px",
            display: "grid",
            gridTemplateColumns: { base: "1fr", md: "repeat(5, 1fr)" },
            gap: "10px"
          })}
          aria-label={t("home.firstAreas")}
        >
          {matchingAreas.map((area) => (
            <Link
              className={css({
                bg: "rgba(255,255,255,0.7)",
                border: "1px solid token(colors.line)",
                rounded: "control",
                px: "12px",
                py: "10px",
                color: "ink",
                textDecoration: "none",
                _hover: {
                  borderColor: "rgba(17, 97, 76, 0.32)",
                  bg: "panel"
                },
                _focusVisible: {
                  outline: "3px solid rgba(17, 97, 76, 0.18)",
                  outlineOffset: "2px"
                }
              })}
              href={`/areas/${area.slug}`}
              key={area.slug}
            >
              <span className={css({ fontSize: "14px", fontWeight: 700 })}>{area.name}</span>
              <span
                className={css({
                  ml: "6px",
                  color: "muted",
                  fontSize: "12px",
                  fontWeight: 700
                })}
              >
                {area.postcode}
              </span>
            </Link>
          ))}
          {matchingAreas.length === 0 ? (
            <div
              className={css({
                gridColumn: { md: "1 / -1" },
                rounded: "control",
                border: "1px dashed token(colors.line)",
                px: "12px",
                py: "10px",
                color: "muted",
                fontSize: "14px",
                fontWeight: 700
              })}
            >
              {t("home.noMatch")}
            </div>
          ) : null}
        </section>

        <MarketBrief />
      </div>
    </main>
  );
}
