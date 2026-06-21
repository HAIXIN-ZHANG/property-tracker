import type { SourceStatus } from "@/lib/source-status";
import { getAreas } from "@/lib/areas";

export const sampleAreas = getAreas().map((area) => ({
  name: area.identity.displayName,
  postcode: area.identity.primaryPostcode,
  slug: area.identity.slug
}));

export const sourceCards: Array<{
  title: string;
  description: string;
  status: SourceStatus;
  icon: "chart" | "data" | "map";
}> = [
  {
    title: "ABS demographics",
    description: "WA SA2 Census DataPack downloaded and field-checked for first importer work.",
    status: "validated",
    icon: "chart"
  },
  {
    title: "Crime and transport",
    description: "WA Police XLSX and Transperth GTFS are confirmed as usable MVP data sources.",
    status: "validated",
    icon: "data"
  },
  {
    title: "Domain listings",
    description: "OAuth works, but buyer-facing data packages still require access approval.",
    status: "access_pending",
    icon: "data"
  },
  {
    title: "Planning and boundaries",
    description: "Data WA layers exist; licence and interpretation need review before public use.",
    status: "manual",
    icon: "map"
  }
];
