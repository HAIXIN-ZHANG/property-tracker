import { Building2, Home, MapPinned } from "lucide-react";
import Link from "next/link";
import { css } from "styled-system/css";
import type { AreaOpportunity, StrategyLens } from "@/lib/areas";
import { useI18n } from "@/components/i18n-provider";
import { DataAvailabilityPill } from "@/components/data-availability-pill";

type OpportunityListProps = {
  areaSlug: string;
  lens: StrategyLens;
  opportunities: AreaOpportunity[];
};

const iconByType = {
  House: Home,
  "House & Land": Building2,
  Land: MapPinned
};

export function OpportunityList({ areaSlug, lens, opportunities }: OpportunityListProps) {
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
      aria-labelledby="opportunities-title"
    >
      <div
        className={css({
          p: { base: "18px", md: "22px" },
          borderBottom: "1px solid token(colors.line)"
        })}
      >
        <h2
          className={css({
            m: 0,
            fontSize: { base: "21px", md: "24px" },
            lineHeight: 1.15,
            letterSpacing: "0"
          })}
          id="opportunities-title"
        >
          {t("opportunities.title")}
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
          {t("opportunities.description")}
        </p>
      </div>

      <div className={css({ display: "grid" })}>
        {opportunities.map((opportunity, index) => {
          const Icon = iconByType[opportunity.type];
          return (
            <article
              className={css({
                display: "grid",
                gap: "13px",
                p: { base: "16px", md: "18px" },
                borderBottom:
                  index === opportunities.length - 1 ? "none" : "1px solid token(colors.line)"
              })}
              key={opportunity.id}
            >
              <div
                className={css({
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "14px"
                })}
              >
                <div
                  className={css({
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "11px",
                    minW: 0
                  })}
                >
                  <div
                    className={css({
                      display: "grid",
                      placeItems: "center",
                      w: "34px",
                      h: "34px",
                      rounded: "control",
                      bg: "rgba(17, 97, 76, 0.08)",
                      color: "eucalyptus",
                      flex: "0 0 auto"
                    })}
                  >
                    <Icon size={17} />
                  </div>
                  <div className={css({ minW: 0 })}>
                    <h3
                      className={css({
                        m: 0,
                        fontSize: "16px",
                        lineHeight: 1.25
                      })}
                    >
                      {opportunity.title}
                    </h3>
                    <p
                      className={css({
                        m: 0,
                        mt: "4px",
                        color: "muted",
                        fontSize: "13px",
                        lineHeight: 1.45
                      })}
                    >
                      {opportunity.type} · {opportunity.location}
                    </p>
                  </div>
                </div>
                <DataAvailabilityPill status={opportunity.sourceStatus} />
              </div>

              <div
                className={css({
                  display: "grid",
                  gridTemplateColumns: { base: "1fr", sm: "0.55fr 1fr" },
                  gap: "10px"
                })}
              >
                <div>
                  <p
                    className={css({
                      m: 0,
                      color: "ink",
                      fontSize: "18px",
                      fontWeight: 820,
                      lineHeight: 1.2
                    })}
                  >
                    {opportunity.price}
                  </p>
                  <p
                    className={css({
                      m: 0,
                      mt: "4px",
                      color: "muted",
                      fontSize: "12px",
                      fontWeight: 750
                    })}
                  >
                    {opportunity.status}
                  </p>
                </div>
                <p
                  className={css({
                    m: 0,
                    color: "muted",
                    fontSize: "14px",
                    lineHeight: 1.55
                  })}
                >
                  {opportunity.summary}
                </p>
              </div>

              <div
                className={css({
                  rounded: "control",
                  border: "1px solid rgba(17, 97, 76, 0.16)",
                  bg: "rgba(17, 97, 76, 0.045)",
                  px: "12px",
                  py: "10px"
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
                  {t("common.currentLensFit")}
                </p>
                <p
                  className={css({
                    m: 0,
                    mt: "5px",
                    color: "ink",
                    fontSize: "14px",
                    lineHeight: 1.5
                  })}
                >
                  {opportunity.fit[lens]}
                </p>
              </div>

              <Link
                className={css({
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  justifySelf: "start",
                  h: "36px",
                  rounded: "control",
                  border: "1px solid token(colors.line)",
                  bg: "panel",
                  color: "ink",
                  px: "12px",
                  fontSize: "13px",
                  fontWeight: 800,
                  textDecoration: "none",
                  _hover: {
                    borderColor: "rgba(17, 97, 76, 0.32)",
                    bg: "rgba(17, 97, 76, 0.045)"
                  },
                  _focusVisible: {
                    outline: "3px solid rgba(17, 97, 76, 0.18)",
                    outlineOffset: "2px"
                  }
                })}
                href={`/areas/${areaSlug}/opportunities/${opportunity.id}`}
              >
                {t("opportunities.open")}
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
