import type { DataAvailabilityStatus } from "@/lib/data-contracts";
import { mockAreaProvider } from "@/lib/providers/mock-area-provider";

const sampleAreasResult = mockAreaProvider.getAreas();

export const sampleAreas = (sampleAreasResult.ok ? sampleAreasResult.data : []).map((area) => ({
  name: area.identity.displayName,
  postcode: area.identity.primaryPostcode,
  slug: area.identity.slug
}));

export const sourceCards: Array<{
  title: string;
  description: string;
  status: DataAvailabilityStatus;
  icon: "chart" | "data" | "map";
}> = [
  {
    title: "ABS demographics",
    description:
      "WA SA2 Census fields are checked, but suburb-to-SA2 mapping must be completed first.",
    status: "mapping_pending",
    icon: "chart"
  },
  {
    title: "Crime and transport",
    description:
      "WA Police XLSX and Transperth GTFS fields exist; area matching rules are still pending.",
    status: "mapping_pending",
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
    status: "source_accepted",
    icon: "map"
  }
];
