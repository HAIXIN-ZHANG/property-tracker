"use client";

import { ArrowLeft, Bot, CheckCircle2, CircleDollarSign, ClipboardList } from "lucide-react";
import Link from "next/link";
import { css } from "styled-system/css";
import type { AreaOpportunity, AreaProfile, SourceRecord } from "@/lib/areas";
import { getOpportunityAssumptions, getOpportunityChecklist } from "@/lib/areas";
import type { RuntimeDataState } from "@/lib/data-contracts";
import { SourceProvenancePanel } from "@/components/source-provenance-panel";
import { DataAvailabilityPill } from "@/components/data-availability-pill";
import { useI18n } from "@/components/i18n-provider";
import { LanguageToggle } from "@/components/language-toggle";

type OpportunityDetailProps = {
  area: AreaProfile;
  opportunity: AreaOpportunity;
  opportunityProviderState: RuntimeDataState;
  sourceRecords: SourceRecord[];
  sourceRecordsState: RuntimeDataState;
};

export function OpportunityDetail({
  area,
  opportunity,
  opportunityProviderState,
  sourceRecords,
  sourceRecordsState
}: OpportunityDetailProps) {
  const { t } = useI18n();
  const assumptions = getOpportunityAssumptions(opportunity);
  const checklist = getOpportunityChecklist(opportunity);

  return (
    <main
      className={css({
        minH: "100vh",
        px: { base: "18px", md: "36px" },
        py: { base: "18px", md: "30px" }
      })}
    >
      <div className={css({ mx: "auto", maxW: "1120px" })}>
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
            href={`/areas/${area.identity.slug}`}
          >
            <ArrowLeft size={15} />
            {t("common.backToWorkspace")}
          </Link>
          <LanguageToggle />
        </div>

        <section
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", lg: "1.12fr 0.88fr" },
            gap: "18px",
            alignItems: "start"
          })}
        >
          <div
            className={css({
              display: "grid",
              gap: "18px"
            })}
          >
            <header
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
                  mb: "20px",
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
                  <ClipboardList size={16} />
                  {t("opportunity.detail")}
                </div>
                <DataAvailabilityPill status={opportunityProviderState.status} />
              </div>

              <h1
                className={css({
                  m: 0,
                  maxW: "760px",
                  fontSize: { base: "32px", md: "48px" },
                  lineHeight: 1.04,
                  letterSpacing: "0"
                })}
              >
                {opportunity.title}
              </h1>

              <p
                className={css({
                  m: 0,
                  mt: "12px",
                  color: "muted",
                  fontSize: "15px",
                  lineHeight: 1.65
                })}
              >
                {area.identity.displayName}, WA · {opportunity.type} · {opportunity.location}
              </p>

              <div
                className={css({
                  mt: "22px",
                  display: "grid",
                  gridTemplateColumns: { base: "1fr", md: "repeat(3, minmax(0, 1fr))" },
                  gap: "10px"
                })}
              >
                <DetailFact label={t("opportunity.price")} value={opportunity.price} />
                <DetailFact label={t("opportunity.status")} value={opportunity.status} />
                <DetailFact label={t("opportunity.type")} value={opportunity.type} />
              </div>
            </header>

            <section
              className={css({
                bg: "panel",
                border: "1px solid token(colors.line)",
                rounded: "panel",
                shadow: "soft",
                p: { base: "18px", md: "22px" }
              })}
            >
              <h2 className={css({ m: 0, fontSize: "22px", lineHeight: 1.2 })}>
                {t("opportunity.summary")}
              </h2>
              <p
                className={css({
                  m: 0,
                  mt: "10px",
                  color: "muted",
                  fontSize: "15px",
                  lineHeight: 1.65
                })}
              >
                {opportunity.summary}
              </p>

              <div
                className={css({
                  mt: "18px",
                  display: "grid",
                  gridTemplateColumns: { base: "1fr", md: "repeat(3, minmax(0, 1fr))" },
                  gap: "10px"
                })}
              >
                {(["live", "invest", "build"] as const).map((lens) => (
                  <div
                    className={css({
                      rounded: "control",
                      border: "1px solid rgba(17, 97, 76, 0.16)",
                      bg: "rgba(17, 97, 76, 0.045)",
                      p: "12px"
                    })}
                    key={lens}
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
                      {t(`lens.${lens}`)}
                    </p>
                    <p
                      className={css({
                        m: 0,
                        mt: "6px",
                        color: "ink",
                        fontSize: "14px",
                        lineHeight: 1.5
                      })}
                    >
                      {opportunity.fit[lens]}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className={css({
                bg: "panel",
                border: "1px solid token(colors.line)",
                rounded: "panel",
                shadow: "soft",
                overflow: "hidden"
              })}
            >
              <div
                className={css({
                  p: { base: "18px", md: "22px" },
                  borderBottom: "1px solid token(colors.line)"
                })}
              >
                <h2 className={css({ m: 0, fontSize: "22px", lineHeight: 1.2 })}>
                  {t("opportunity.checklist")}
                </h2>
              </div>
              <div className={css({ display: "grid" })}>
                {checklist.map((item, index) => (
                  <div
                    className={css({
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      p: { base: "14px 18px", md: "16px 22px" },
                      borderBottom:
                        index === checklist.length - 1 ? "none" : "1px solid token(colors.line)"
                    })}
                    key={item}
                  >
                    <CheckCircle2
                      className={css({ color: "eucalyptus", flex: "0 0 auto", mt: "2px" })}
                      size={16}
                    />
                    <p
                      className={css({
                        m: 0,
                        color: "muted",
                        fontSize: "14px",
                        lineHeight: 1.55
                      })}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className={css({ display: "grid", gap: "18px" })}>
            <section
              className={css({
                bg: "panel",
                border: "1px solid token(colors.line)",
                rounded: "panel",
                shadow: "soft",
                overflow: "hidden"
              })}
            >
              <div
                className={css({
                  p: { base: "18px", md: "22px" },
                  borderBottom: "1px solid token(colors.line)"
                })}
              >
                <h2 className={css({ m: 0, fontSize: "22px", lineHeight: 1.2 })}>
                  {t("opportunity.assumptions")}
                </h2>
              </div>
              <div className={css({ display: "grid" })}>
                {assumptions.map((assumption, index) => (
                  <div
                    className={css({
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      p: { base: "16px", md: "18px" },
                      borderBottom:
                        index === assumptions.length - 1 ? "none" : "1px solid token(colors.line)"
                    })}
                    key={assumption.label}
                  >
                    <div>
                      <p className={css({ m: 0, fontSize: "14px", fontWeight: 850 })}>
                        {assumption.label}
                      </p>
                      <p
                        className={css({
                          m: 0,
                          mt: "4px",
                          color: "muted",
                          fontSize: "13px",
                          lineHeight: 1.45
                        })}
                      >
                        {assumption.value}
                      </p>
                    </div>
                    <DataAvailabilityPill status={assumption.status} />
                  </div>
                ))}
              </div>
            </section>

            <SourceProvenancePanel providerState={sourceRecordsState} records={sourceRecords} />

            <section
              className={css({
                bg: "rgba(17, 97, 76, 0.055)",
                border: "1px solid rgba(17, 97, 76, 0.18)",
                rounded: "panel",
                p: { base: "18px", md: "20px" }
              })}
            >
              <div
                className={css({
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "eucalyptus",
                  fontSize: "13px",
                  fontWeight: 850,
                  mb: "10px"
                })}
              >
                <Bot size={16} />
                {t("opportunity.aiReady")}
              </div>
              <p
                className={css({
                  m: 0,
                  color: "ink",
                  fontSize: "14px",
                  lineHeight: 1.6
                })}
              >
                {t("opportunity.aiDescription")}
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function DetailFact({ label, value }: { label: string; value: string }) {
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
        <CircleDollarSign size={15} />
      </div>
      <div className={css({ minW: 0 })}>
        <p className={css({ m: 0, color: "muted", fontSize: "12px", fontWeight: 750 })}>{label}</p>
        <p className={css({ m: 0, mt: "2px", color: "ink", fontSize: "14px", fontWeight: 800 })}>
          {value}
        </p>
      </div>
    </div>
  );
}
