import { Activity, BarChart3, ExternalLink, LockKeyhole, Sigma } from "lucide-react";
import { css } from "styled-system/css";
import type { AreaSignal } from "@/lib/areas";
import {
  getMarketSignalAvailabilityMeta,
  type MarketSignalAvailability
} from "@/lib/market-signals";
import { useI18n } from "@/components/i18n-provider";

type MarketSignalsPreviewProps = {
  signals: AreaSignal[];
};

const iconByAvailability: Record<MarketSignalAvailability, typeof Activity> = {
  access_pending: LockKeyhole,
  derived_later: Sigma,
  external_link_now: ExternalLink,
  public_source: Activity,
  sample_now: BarChart3
};

export function MarketSignalsPreview({ signals }: MarketSignalsPreviewProps) {
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
      aria-labelledby="market-signals-title"
    >
      <div
        className={css({
          display: "flex",
          alignItems: { base: "flex-start", md: "center" },
          justifyContent: "space-between",
          flexDirection: { base: "column", md: "row" },
          gap: "12px",
          p: { base: "18px", md: "22px" },
          borderBottom: "1px solid token(colors.line)"
        })}
      >
        <div>
          <h2
            className={css({
              m: 0,
              fontSize: { base: "21px", md: "24px" },
              lineHeight: 1.15,
              letterSpacing: "0"
            })}
            id="market-signals-title"
          >
            {t("signals.title")}
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
            {t("signals.description")}
          </p>
        </div>

        <div
          className={css({
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            color: "eucalyptus",
            fontSize: "13px",
            fontWeight: 800
          })}
        >
          <Activity size={16} />
          {t("signals.preview")}
        </div>
      </div>

      <div
        className={css({
          display: "grid",
          gridTemplateColumns: { base: "1fr", md: "repeat(2, minmax(0, 1fr))" }
        })}
      >
        {signals.map((signal, index) => {
          const Icon = iconByAvailability[signal.availability];
          const meta = getMarketSignalAvailabilityMeta(signal.availability);
          return (
            <article
              className={css({
                display: "grid",
                gap: "13px",
                minH: "188px",
                p: { base: "16px", md: "18px" },
                borderBottom:
                  index === signals.length - 1 ? "none" : "1px solid token(colors.line)",
                borderRight: {
                  md:
                    index % 2 === 0 && index !== signals.length - 1
                      ? "1px solid token(colors.line)"
                      : "none"
                }
              })}
              key={signal.label}
            >
              <div
                className={css({
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "12px"
                })}
              >
                <div
                  className={css({
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: meta.color,
                    fontSize: "13px",
                    fontWeight: 800
                  })}
                >
                  <Icon size={16} />
                  {signal.label}
                </div>
                <SignalAvailabilityPill availability={signal.availability} />
              </div>

              <div>
                <p
                  className={css({
                    m: 0,
                    fontSize: { base: "24px", md: "28px" },
                    lineHeight: 1.05,
                    fontWeight: 820,
                    letterSpacing: "0"
                  })}
                >
                  {signal.value}
                </p>
                <p
                  className={css({
                    m: 0,
                    mt: "7px",
                    color: "muted",
                    fontSize: "14px",
                    lineHeight: 1.5
                  })}
                >
                  {signal.change}
                </p>
              </div>

              <div
                className={css({
                  mt: "auto",
                  display: "grid",
                  gap: "7px",
                  rounded: "control",
                  border: "1px dashed token(colors.line)",
                  bg: "rgba(245,246,243,0.58)",
                  p: "10px"
                })}
              >
                <p
                  className={css({
                    m: 0,
                    color: "muted",
                    fontSize: "12px",
                    fontWeight: 750,
                    lineHeight: 1.45
                  })}
                >
                  {meta.description}
                </p>
                {signal.formula ? (
                  <p
                    className={css({
                      m: 0,
                      color: "ink",
                      fontSize: "12px",
                      fontWeight: 750,
                      lineHeight: 1.45
                    })}
                  >
                    {t("signals.formula")}: {signal.formula}
                  </p>
                ) : null}
                {signal.missingDependencies?.length ? (
                  <p
                    className={css({
                      m: 0,
                      color: "muted",
                      fontSize: "12px",
                      lineHeight: 1.45
                    })}
                  >
                    {t("signals.missing")}: {signal.missingDependencies.join(", ")}
                  </p>
                ) : null}
              </div>

              <p
                className={css({
                  m: 0,
                  color: "muted",
                  fontSize: "12px",
                  fontWeight: 700
                })}
              >
                {t("common.preferredSource")}: {signal.source}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SignalAvailabilityPill({ availability }: { availability: MarketSignalAvailability }) {
  const { t } = useI18n();
  const meta = getMarketSignalAvailabilityMeta(availability);

  return (
    <span
      className={css({
        display: "inline-flex",
        alignItems: "center",
        minH: "26px",
        rounded: "999px",
        border: "1px solid",
        borderColor: meta.borderColor,
        bg: meta.background,
        color: meta.color,
        px: "9px",
        fontSize: "12px",
        fontWeight: 750,
        whiteSpace: "nowrap"
      })}
    >
      {t(`signalAvailability.${availability}`)}
    </span>
  );
}
