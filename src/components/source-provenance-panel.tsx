"use client";

import { ExternalLink } from "lucide-react";
import { css } from "styled-system/css";
import type { SourceRecord } from "@/lib/areas";
import type { RuntimeDataState } from "@/lib/data-contracts";
import { DataAvailabilityPill } from "@/components/data-availability-pill";
import { useI18n } from "@/components/i18n-provider";

type SourceProvenancePanelProps = {
  providerState: RuntimeDataState;
  records: SourceRecord[];
};

export function SourceProvenancePanel({ providerState, records }: SourceProvenancePanelProps) {
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
      aria-labelledby="source-provenance-title"
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
          id="source-provenance-title"
        >
          {t("opportunity.sourcePanel")}
        </h2>
        <div
          className={css({
            mt: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: "wrap"
          })}
        >
          <p
            className={css({
              m: 0,
              color: "muted",
              fontSize: "13px",
              lineHeight: 1.45
            })}
          >
            {providerState.source}
          </p>
          <DataAvailabilityPill status={providerState.status} />
        </div>
      </div>

      {records.length === 0 ? (
        <div
          className={css({
            p: { base: "18px", md: "22px" },
            display: "grid",
            gap: "8px"
          })}
        >
          <h3 className={css({ m: 0, fontSize: "16px", lineHeight: 1.25 })}>
            {t("source.emptyTitle")}
          </h3>
          <p
            className={css({
              m: 0,
              color: "muted",
              fontSize: "14px",
              lineHeight: 1.55
            })}
          >
            {t("source.emptyDescription")}
          </p>
          <ProviderWarnings warnings={providerState.warnings} />
        </div>
      ) : (
        <div className={css({ display: "grid" })}>
          <ProviderWarnings warnings={providerState.warnings} />
          {records.map((record, index) => {
            // Source records may be external links later; local/manual records
            // render as articles so they do not imply a missing destination.
            const content = (
              <>
                <div
                  className={css({
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px"
                  })}
                >
                  <div>
                    <h3 className={css({ m: 0, fontSize: "15px", lineHeight: 1.25 })}>
                      {record.title}
                    </h3>
                    <p
                      className={css({
                        m: 0,
                        mt: "4px",
                        color: "muted",
                        fontSize: "13px",
                        fontWeight: 750
                      })}
                    >
                      {record.sourceName}
                    </p>
                  </div>
                  <DataAvailabilityPill status={record.status} />
                </div>

                <p
                  className={css({
                    m: 0,
                    color: "muted",
                    fontSize: "14px",
                    lineHeight: 1.55
                  })}
                >
                  {record.note}
                </p>
              </>
            );

            const className = css({
              display: "grid",
              gap: "10px",
              p: { base: "16px", md: "18px" },
              color: "ink",
              textDecoration: "none",
              borderBottom: index === records.length - 1 ? "none" : "1px solid token(colors.line)",
              _hover: record.href
                ? {
                    bg: "rgba(17, 97, 76, 0.045)"
                  }
                : undefined
            });

            if (record.href) {
              return (
                <a
                  className={className}
                  href={record.href}
                  key={record.title}
                  rel="noreferrer"
                  target="_blank"
                >
                  <div
                    className={css({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px"
                    })}
                  >
                    <span
                      className={css({ color: "eucalyptus", fontSize: "12px", fontWeight: 850 })}
                    >
                      {t("common.source")}
                    </span>
                    <ExternalLink size={15} />
                  </div>
                  {content}
                </a>
              );
            }

            return (
              <article className={className} key={record.title}>
                {content}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function ProviderWarnings({ warnings }: { warnings: string[] }) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <ul
      className={css({
        m: 0,
        p: { base: "0 18px 16px 36px", md: "0 22px 18px 40px" },
        color: "muted",
        fontSize: "13px",
        lineHeight: 1.5
      })}
    >
      {warnings.map((warning) => (
        <li key={warning}>{warning}</li>
      ))}
    </ul>
  );
}
