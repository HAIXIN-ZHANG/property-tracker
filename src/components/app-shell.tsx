import { BarChart3, DatabaseZap, MapPinned, Search, ShieldCheck } from "lucide-react";
import { css } from "styled-system/css";
import { sampleAreas, sourceCards } from "@/lib/sample-data";
import { getSourceStatusMeta } from "@/lib/source-status";
import { MarketBrief } from "@/components/market-brief";
import { SourceStatusPill } from "@/components/source-status-pill";

export function AppShell() {
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
              Perth / WA first MVP
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
              property-tracker
            </h1>
          </div>

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
            Source-backed
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
              Area workspace foundation
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
              Research a suburb before you chase a listing.
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
              The first version starts with validated public data, manual opportunity tracking, and
              AI that explains sources instead of inventing facts.
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
                  Sample area
                </span>
                <input
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
                  defaultValue="Ellenbrook, WA"
                  aria-label="Sample area"
                />
              </label>

              <button
                className={css({
                  alignSelf: "end",
                  h: "44px",
                  rounded: "control",
                  border: "1px solid token(colors.eucalyptus)",
                  bg: "eucalyptus",
                  color: "white",
                  px: "18px",
                  fontWeight: 750,
                  cursor: "pointer",
                  _hover: { bg: "#0d523f" }
                })}
                type="button"
              >
                Open workspace
              </button>
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
          aria-label="First sample areas"
        >
          {sampleAreas.map((area) => (
            <div
              className={css({
                bg: "rgba(255,255,255,0.7)",
                border: "1px solid token(colors.line)",
                rounded: "control",
                px: "12px",
                py: "10px"
              })}
              key={area}
            >
              <span className={css({ fontSize: "14px", fontWeight: 700 })}>{area}</span>
            </div>
          ))}
        </section>

        <MarketBrief />
      </div>
    </main>
  );
}
