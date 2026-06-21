import { ArrowLeft, DatabaseZap, FileCheck2, LockKeyhole, MapPinned } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { css } from "styled-system/css";
import { dataSourceStatuses, type EvidenceMetadata } from "@/lib/data-source-status";
import {
  getDataAvailabilityMeta,
  type DataAvailabilityStatus,
  type SourceDocument
} from "@/lib/data-contracts";

export const metadata: Metadata = {
  title: "Data sources | AreaScope",
  description: "Current data readiness and source status for AreaScope."
};

const toneStyles: Record<
  ReturnType<typeof getDataAvailabilityMeta>["tone"],
  { bg: string; border: string; color: string }
> = {
  blocked: {
    bg: "rgba(102, 115, 109, 0.08)",
    border: "rgba(102, 115, 109, 0.22)",
    color: "muted"
  },
  neutral: {
    bg: "rgba(102, 115, 109, 0.08)",
    border: "rgba(102, 115, 109, 0.22)",
    color: "muted"
  },
  positive: {
    bg: "rgba(17, 97, 76, 0.08)",
    border: "rgba(17, 97, 76, 0.22)",
    color: "eucalyptus"
  },
  warning: {
    bg: "rgba(183, 121, 31, 0.1)",
    border: "rgba(183, 121, 31, 0.24)",
    color: "amber"
  }
};

export default function DataSourcesPage() {
  return (
    <main
      className={css({
        minH: "100vh",
        px: { base: "18px", md: "36px" },
        py: { base: "18px", md: "30px" }
      })}
    >
      <div className={css({ mx: "auto", maxW: "1120px" })}>
        <Link
          className={css({
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            color: "muted",
            fontSize: "13px",
            fontWeight: 750,
            mb: "18px",
            textDecoration: "none",
            _hover: { color: "ink" }
          })}
          href="/"
        >
          <ArrowLeft size={15} />
          Back to workspace
        </Link>

        <header
          className={css({
            bg: "panel",
            border: "1px solid token(colors.line)",
            rounded: "panel",
            shadow: "soft",
            p: { base: "22px", md: "28px" },
            mb: "18px"
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
              mb: "16px"
            })}
          >
            <DatabaseZap size={16} />
            Stage 2 data boundary
          </div>
          <h1
            className={css({
              m: 0,
              fontSize: { base: "34px", md: "54px" },
              lineHeight: 1.02,
              letterSpacing: "0"
            })}
          >
            Data source readiness
          </h1>
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
            This page shows what is actually usable now, what only has field-level validation, and
            what remains access-gated. It does not imply live suburb-level data.
          </p>
        </header>

        <section
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", lg: "repeat(2, minmax(0, 1fr))" },
            gap: "14px"
          })}
          aria-label="Data source readiness list"
        >
          {dataSourceStatuses.map((source) => (
            <article
              className={css({
                bg: "panel",
                border: "1px solid token(colors.line)",
                rounded: "panel",
                shadow: "soft",
                overflow: "hidden"
              })}
              key={source.id}
            >
              <div
                className={css({
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                  p: { base: "18px", md: "20px" },
                  borderBottom: "1px solid token(colors.line)"
                })}
              >
                <div>
                  <h2 className={css({ m: 0, fontSize: "20px", lineHeight: 1.2 })}>
                    {source.name}
                  </h2>
                  <p
                    className={css({
                      m: 0,
                      mt: "6px",
                      color: "muted",
                      fontSize: "13px",
                      lineHeight: 1.45
                    })}
                  >
                    {source.productUse}
                  </p>
                </div>
                <AvailabilityPill status={source.status} />
              </div>

              <div
                className={css({
                  display: "grid",
                  gap: "12px",
                  p: { base: "18px", md: "20px" }
                })}
              >
                <SourceFact icon="map" label="Geography" value={source.geographyLevel} />
                <SourceFact icon="file" label="Current evidence" value={source.currentEvidence} />
                <EvidenceMetadataBox evidence={source.evidence} />
                <SourceFact icon="lock" label="Next action" value={source.nextAction} />

                <div
                  className={css({
                    rounded: "control",
                    border: "1px dashed token(colors.line)",
                    bg: "rgba(245,246,243,0.58)",
                    p: "12px"
                  })}
                >
                  <SourceDocumentList documents={source.sourceDocuments} />
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function SourceDocumentList({ documents }: { documents: SourceDocument[] }) {
  if (documents.length === 0) {
    return (
      <>
        <SourceSectionLabel>Source documents</SourceSectionLabel>
        <p
          className={css({
            m: 0,
            mt: "6px",
            color: "muted",
            fontSize: "14px",
            lineHeight: 1.5
          })}
        >
          No source document attached yet.
        </p>
      </>
    );
  }

  return (
    <div className={css({ display: "grid", gap: "10px" })}>
      <SourceSectionLabel>Source documents</SourceSectionLabel>
      {documents.map((document) => (
        <div
          className={css({
            display: "grid",
            gap: "9px",
            borderTop: "1px solid token(colors.line)",
            pt: "10px"
          })}
          key={document.id}
        >
          <div
            className={css({
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "10px"
            })}
          >
            <p
              className={css({
                m: 0,
                color: "ink",
                fontSize: "14px",
                fontWeight: 760,
                lineHeight: 1.4
              })}
            >
              {document.title}
            </p>
            <AvailabilityPill status={document.status} />
          </div>

          <div
            className={css({
              display: "grid",
              gridTemplateColumns: { base: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
              gap: "6px 12px"
            })}
          >
            <DocumentMeta label="Source" value={document.sourceName} />
            <DocumentMeta label="Type" value={document.sourceType} />
            <DocumentMeta label="Captured" value={document.capturedAt ?? "Not available"} />
            <DocumentMeta label="Checked" value={document.lastCheckedAt ?? "Not available"} />
            <DocumentMeta label="Confidence" value={document.confidence ?? "Not available"} />
            <DocumentMeta label="Raw snapshot" value={document.rawSnapshotId ?? "Not available"} />
          </div>

          <p
            className={css({
              m: 0,
              color: "muted",
              fontSize: "12px",
              lineHeight: 1.45
            })}
          >
            Still missing:{" "}
            {document.missingFields.length > 0
              ? document.missingFields.join(", ")
              : "none recorded"}
          </p>

          {document.sourceUrl ? (
            <a
              className={css({
                justifySelf: "start",
                color: "eucalyptus",
                fontSize: "12px",
                fontWeight: 800,
                textDecoration: "none",
                _hover: { textDecoration: "underline" }
              })}
              href={document.sourceUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open source evidence
            </a>
          ) : (
            <p className={css({ m: 0, color: "muted", fontSize: "12px", lineHeight: 1.45 })}>
              Source URL: not available
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function EvidenceMetadataBox({ evidence }: { evidence: EvidenceMetadata }) {
  return (
    <div
      className={css({
        display: "grid",
        gap: "8px",
        rounded: "control",
        border: "1px solid token(colors.line)",
        bg: "rgba(255,255,255,0.52)",
        p: "11px"
      })}
    >
      <SourceSectionLabel>Evidence metadata</SourceSectionLabel>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: { base: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          gap: "6px 12px"
        })}
      >
        <DocumentMeta label="Basis" value={evidence.basis} />
        <DocumentMeta label="Checked" value={evidence.lastCheckedAt ?? "Not available"} />
      </div>
      {evidence.evidenceUrl ? (
        <a
          className={css({
            justifySelf: "start",
            color: "eucalyptus",
            fontSize: "12px",
            fontWeight: 800,
            textDecoration: "none",
            _hover: { textDecoration: "underline" }
          })}
          href={evidence.evidenceUrl}
          rel="noreferrer"
          target="_blank"
        >
          Open evidence reference
        </a>
      ) : (
        <p className={css({ m: 0, color: "muted", fontSize: "12px", lineHeight: 1.45 })}>
          Evidence URL: not available
        </p>
      )}
      <p
        className={css({
          m: 0,
          color: "muted",
          fontSize: "12px",
          lineHeight: 1.45
        })}
      >
        Limitations: {evidence.limitations.join(", ")}
      </p>
    </div>
  );
}

function DocumentMeta({ label, value }: { label: string; value: string }) {
  return (
    <p
      className={css({
        m: 0,
        color: "muted",
        fontSize: "12px",
        lineHeight: 1.45
      })}
    >
      <span className={css({ color: "ink", fontWeight: 800 })}>{label}:</span> {value}
    </p>
  );
}

function SourceSectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className={css({
        m: 0,
        color: "muted",
        fontSize: "12px",
        fontWeight: 850,
        textTransform: "uppercase"
      })}
    >
      {children}
    </p>
  );
}

function AvailabilityPill({ status }: { status: DataAvailabilityStatus }) {
  const meta = getDataAvailabilityMeta(status);
  const style = toneStyles[meta.tone];

  return (
    <span
      className={css({
        display: "inline-flex",
        alignItems: "center",
        minH: "28px",
        rounded: "999px",
        border: "1px solid",
        borderColor: style.border,
        bg: style.bg,
        color: style.color,
        px: "10px",
        fontSize: "12px",
        fontWeight: 800,
        whiteSpace: "nowrap"
      })}
      title={meta.description}
    >
      {meta.label}
    </span>
  );
}

function SourceFact({
  icon,
  label,
  value
}: {
  icon: "file" | "lock" | "map";
  label: string;
  value: string;
}) {
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "flex-start",
        gap: "10px"
      })}
    >
      <div
        className={css({
          display: "grid",
          placeItems: "center",
          w: "30px",
          h: "30px",
          rounded: "control",
          bg: "rgba(17, 97, 76, 0.08)",
          color: "eucalyptus",
          flex: "0 0 auto"
        })}
      >
        {icon === "file" ? <FileCheck2 size={15} /> : null}
        {icon === "lock" ? <LockKeyhole size={15} /> : null}
        {icon === "map" ? <MapPinned size={15} /> : null}
      </div>
      <div>
        <p className={css({ m: 0, color: "muted", fontSize: "12px", fontWeight: 800 })}>{label}</p>
        <p className={css({ m: 0, mt: "4px", color: "ink", fontSize: "14px", lineHeight: 1.5 })}>
          {value}
        </p>
      </div>
    </div>
  );
}
