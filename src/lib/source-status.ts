export type SourceStatus = "validated" | "mapping_pending" | "access_pending" | "manual" | "sample";

export type SourceStatusMeta = {
  label: string;
  color: string;
  background: string;
  borderColor: string;
};

const sourceStatusMeta: Record<SourceStatus, SourceStatusMeta> = {
  validated: {
    label: "Validated",
    color: "eucalyptus",
    background: "rgba(17, 97, 76, 0.08)",
    borderColor: "rgba(17, 97, 76, 0.22)"
  },
  mapping_pending: {
    label: "Mapping pending",
    color: "ocean",
    background: "rgba(38, 98, 217, 0.08)",
    borderColor: "rgba(38, 98, 217, 0.22)"
  },
  access_pending: {
    label: "Access pending",
    color: "amber",
    background: "rgba(183, 121, 31, 0.1)",
    borderColor: "rgba(183, 121, 31, 0.24)"
  },
  manual: {
    label: "Manual",
    color: "ocean",
    background: "rgba(38, 98, 217, 0.08)",
    borderColor: "rgba(38, 98, 217, 0.22)"
  },
  sample: {
    label: "Sample",
    color: "muted",
    background: "rgba(102, 115, 109, 0.09)",
    borderColor: "rgba(102, 115, 109, 0.2)"
  }
};

export function getSourceStatusMeta(status: SourceStatus): SourceStatusMeta {
  return sourceStatusMeta[status];
}
