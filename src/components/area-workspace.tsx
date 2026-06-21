"use client";

import { ArrowLeft, CircleDot, DatabaseZap, MapPinned, School, Train } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { css } from "styled-system/css";
import type { AreaOpportunity, AreaProfile, StrategyLens } from "@/lib/areas";
import { useI18n } from "@/components/i18n-provider";
import { LanguageToggle } from "@/components/language-toggle";
import { OpportunityList } from "@/components/opportunity-list";
import { MarketSignalsPreview } from "@/components/market-signals-preview";
import { SourceStatusPill } from "@/components/source-status-pill";
import { StrategyLensTabs } from "@/components/strategy-lens-tabs";

type AreaWorkspaceProps = {
  area: AreaProfile;
};

export function AreaWorkspace({ area }: AreaWorkspaceProps) {
  const { t } = useI18n();
  const [selectedLens, setSelectedLens] = useState<StrategyLens>("live");
  const visibleOpportunities = useMemo(() => {
    if (selectedLens === "build") {
      // Build mode surfaces land first, then house-and-land packages, while
      // keeping normal house benchmarks available for total-cost comparison.
      const buildPriority = (type: AreaOpportunity["type"]) =>
        type === "Land" ? 0 : type === "House & Land" ? 1 : 2;

      return [...area.opportunities].sort(
        (left, right) => buildPriority(left.type) - buildPriority(right.type)
      );
    }

    return area.opportunities;
  }, [area.opportunities, selectedLens]);

  return (
    <main
      className={css({
        minH: "100vh",
        px: { base: "18px", md: "36px" },
        py: { base: "18px", md: "30px" }
      })}
    >
      <div className={css({ mx: "auto", maxW: "1180px" })}>
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            mb: "18px",
            flexWrap: "wrap"
          })}
        >
          <Link
            className={css({
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              color: "muted",
              fontSize: "13px",
              fontWeight: 750,
              textDecoration: "none",
              _hover: { color: "ink" },
              _focusVisible: {
                outline: "3px solid rgba(17, 97, 76, 0.18)",
                outlineOffset: "3px"
              }
            })}
            href="/"
          >
            <ArrowLeft size={15} />
            {t("common.backToAreas")}
          </Link>
          <LanguageToggle />
        </div>

        <section
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", lg: "1.24fr 0.76fr" },
            gap: "18px",
            alignItems: "stretch",
            mb: "18px"
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
                justifyContent: "space-between",
                gap: "14px",
                mb: "22px",
                flexWrap: "wrap"
              })}
            >
              <div
                className={css({
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "eucalyptus",
                  fontSize: "13px",
                  fontWeight: 850
                })}
              >
                <MapPinned size={16} />
                {t("workspace.kicker")}
              </div>
              <SourceStatusPill
                status={
                  area.identity.mappingStatus === "manually_verified" ? "validated" : "sample"
                }
              />
            </div>

            <h1
              className={css({
                m: 0,
                maxW: "780px",
                fontSize: { base: "34px", md: "54px" },
                lineHeight: 1.01,
                letterSpacing: "0"
              })}
            >
              {area.identity.displayName}, WA
            </h1>
            <p
              className={css({
                m: 0,
                mt: "14px",
                maxW: "760px",
                color: "ink",
                fontSize: { base: "17px", md: "20px" },
                lineHeight: 1.45,
                fontWeight: 650
              })}
            >
              {area.headline}
            </p>
            <p
              className={css({
                m: 0,
                mt: "12px",
                maxW: "760px",
                color: "muted",
                fontSize: "15px",
                lineHeight: 1.65
              })}
            >
              {area.summary}
            </p>

            <div
              className={css({
                mt: "24px",
                display: "grid",
                gridTemplateColumns: { base: "1fr", md: "repeat(3, minmax(0, 1fr))" },
                gap: "10px"
              })}
            >
              <AreaFact
                icon="pin"
                label={t("workspace.postcode")}
                value={area.identity.primaryPostcode}
              />
              <AreaFact
                icon="data"
                label={t("workspace.areaType")}
                value={area.identity.areaType}
              />
              <AreaFact
                icon="status"
                label={t("workspace.mapping")}
                value={area.identity.mappingStatus}
              />
            </div>
          </div>

          <aside
            className={css({
              bg: "panel",
              border: "1px solid token(colors.line)",
              rounded: "panel",
              shadow: "soft",
              p: { base: "18px", md: "22px" }
            })}
            aria-label={t("workspace.strategyLens")}
          >
            <h2
              className={css({
                m: 0,
                fontSize: "20px",
                lineHeight: 1.2,
                letterSpacing: "0"
              })}
            >
              {t("workspace.strategyLens")}
            </h2>
            <p
              className={css({
                m: 0,
                mt: "7px",
                mb: "16px",
                color: "muted",
                fontSize: "14px",
                lineHeight: 1.55
              })}
            >
              {t("workspace.strategyDescription")}
            </p>

            <StrategyLensTabs selected={selectedLens} onChange={setSelectedLens} />

            <div
              className={css({
                mt: "18px",
                rounded: "control",
                border: "1px solid rgba(17, 97, 76, 0.16)",
                bg: "rgba(17, 97, 76, 0.045)",
                p: "13px"
              })}
            >
              <p
                className={css({
                  m: 0,
                  color: "eucalyptus",
                  fontSize: "12px",
                  fontWeight: 850,
                  textTransform: "uppercase"
                })}
              >
                {t("common.currentRead")}
              </p>
              <p
                className={css({
                  m: 0,
                  mt: "7px",
                  color: "ink",
                  fontSize: "14px",
                  lineHeight: 1.55
                })}
              >
                {area.lensNotes[selectedLens]}
              </p>
            </div>
          </aside>
        </section>

        <section
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", md: "repeat(4, minmax(0, 1fr))" },
            gap: "10px",
            mb: "18px"
          })}
          aria-label={t("workspace.metrics")}
        >
          {area.metrics.map((metric) => (
            <article
              className={css({
                bg: "rgba(255,255,255,0.74)",
                border: "1px solid token(colors.line)",
                rounded: "panel",
                p: "16px",
                minH: "148px"
              })}
              key={metric.label}
            >
              <div
                className={css({
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "10px",
                  mb: "14px"
                })}
              >
                <h3
                  className={css({
                    m: 0,
                    fontSize: "13px",
                    color: "muted",
                    fontWeight: 850,
                    textTransform: "uppercase"
                  })}
                >
                  {metric.label}
                </h3>
                <SourceStatusPill status={metric.status} />
              </div>
              <p
                className={css({
                  m: 0,
                  fontSize: "20px",
                  lineHeight: 1.15,
                  fontWeight: 820
                })}
              >
                {metric.value}
              </p>
              <p
                className={css({
                  m: 0,
                  mt: "8px",
                  color: "muted",
                  fontSize: "13px",
                  lineHeight: 1.5
                })}
              >
                {metric.detail}
              </p>
            </article>
          ))}
        </section>

        <section
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", lg: "1fr 0.72fr" },
            gap: "18px",
            alignItems: "start"
          })}
        >
          <MarketSignalsPreview signals={area.signals} />

          <div
            className={css({
              display: "grid",
              gap: "18px"
            })}
          >
            <PlanningPanel area={area} />
            <OpportunityList
              areaSlug={area.identity.slug}
              lens={selectedLens}
              opportunities={visibleOpportunities}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function AreaFact({
  icon,
  label,
  value
}: {
  icon: "data" | "pin" | "status";
  label: string;
  value: string;
}) {
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "10px",
        rounded: "control",
        border: "1px solid token(colors.line)",
        bg: "rgba(245,246,243,0.72)",
        px: "12px",
        py: "11px"
      })}
    >
      <div
        className={css({
          display: "grid",
          placeItems: "center",
          w: "30px",
          h: "30px",
          rounded: "control",
          bg: "panel",
          color: "eucalyptus",
          border: "1px solid token(colors.line)",
          flex: "0 0 auto"
        })}
      >
        {icon === "pin" ? <MapPinned size={15} /> : null}
        {icon === "data" ? <DatabaseZap size={15} /> : null}
        {icon === "status" ? <CircleDot size={15} /> : null}
      </div>
      <div className={css({ minW: 0 })}>
        <p
          className={css({
            m: 0,
            color: "muted",
            fontSize: "12px",
            fontWeight: 750
          })}
        >
          {label}
        </p>
        <p
          className={css({
            m: 0,
            mt: "2px",
            color: "ink",
            fontSize: "14px",
            fontWeight: 800,
            textTransform: value.includes("_") || value === "suburb" ? "capitalize" : "none"
          })}
        >
          {value.replace("_", " ")}
        </p>
      </div>
    </div>
  );
}

function PlanningPanel({ area }: { area: AreaProfile }) {
  const { t } = useI18n();

  return (
    <section
      className={css({
        bg: "panel",
        border: "1px solid token(colors.line)",
        rounded: "panel",
        shadow: "soft",
        overflow: "hidden"
      })}
      aria-labelledby="planning-title"
    >
      <div
        className={css({
          p: { base: "18px", md: "20px" },
          borderBottom: "1px solid token(colors.line)"
        })}
      >
        <h2
          className={css({
            m: 0,
            fontSize: "20px",
            lineHeight: 1.2,
            letterSpacing: "0"
          })}
          id="planning-title"
        >
          {t("workspace.planningTitle")}
        </h2>
        <p
          className={css({
            m: 0,
            mt: "6px",
            color: "muted",
            fontSize: "14px",
            lineHeight: 1.55
          })}
        >
          {t("workspace.planningDescription")}
        </p>
      </div>

      <div className={css({ display: "grid" })}>
        {area.planningNotes.map((note, index) => (
          <article
            className={css({
              display: "grid",
              gap: "9px",
              p: { base: "16px", md: "18px" },
              borderBottom:
                index === area.planningNotes.length - 1 ? "none" : "1px solid token(colors.line)"
            })}
            key={note.title}
          >
            <div
              className={css({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px"
              })}
            >
              <div
                className={css({
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "eucalyptus",
                  fontSize: "14px",
                  fontWeight: 850
                })}
              >
                {index === 0 ? <Train size={15} /> : <School size={15} />}
                {note.title}
              </div>
              <SourceStatusPill status={note.status} />
            </div>
            <p
              className={css({
                m: 0,
                color: "muted",
                fontSize: "14px",
                lineHeight: 1.55
              })}
            >
              {note.detail}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
