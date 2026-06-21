import type { ProviderAdapter } from "@/lib/data-contracts";

export type WaCrimeQuery = {
  areaSlug: string;
  locality?: string;
  offenceGroup?: string;
};

export type WaCrimeTrendResult = {
  period: string;
  offenceGroup: string;
  incidents: number;
};

export const waCrimeProviderAdapter: ProviderAdapter<WaCrimeQuery, WaCrimeTrendResult[]> = {
  id: "wa-police-crime",
  name: "WA Police crime statistics",
  status: "mapping_pending",
  capabilities: ["Crime time series", "Offence group breakdown", "Locality-level caveats"],
  caveats: [
    "XLSX fields are inspected, but locality/suburb matching rules are not implemented.",
    "Crime should be shown as context with clear geography and offence grouping labels."
  ],
  query(query) {
    if (!query.locality) {
      return {
        ok: false,
        error: "WA Police crime query requires a verified locality mapping.",
        source: "WA Police crime statistics XLSX",
        status: "mapping_pending",
        warnings: ["Do not infer suburb crime trends from broader geography without caveats."]
      };
    }

    return {
      ok: false,
      error: "WA Police crime importer is not implemented yet.",
      source: "WA Police crime statistics XLSX",
      status: "mapping_pending",
      warnings: ["The importer must preserve offence grouping and period labels."]
    };
  }
};
