import type { ProviderAdapter } from "@/lib/data-contracts";

export type AbsAreaQuery = {
  areaSlug: string;
  state: "WA";
  sa2Code?: string;
};

export type AbsDemographicResult = {
  sa2Code: string;
  population?: number;
  householdCount?: number;
  medianAge?: number;
};

export const absProviderAdapter: ProviderAdapter<AbsAreaQuery, AbsDemographicResult> = {
  id: "abs-census",
  name: "ABS Census DataPacks",
  status: "mapping_pending",
  capabilities: ["Population", "Households", "Age profile", "Tenure mix"],
  caveats: [
    "WA SA2 fields are file-validated, but suburb-to-SA2 mapping is not implemented.",
    "Do not treat SA2 metrics as suburb truth without a displayed geography caveat."
  ],
  query(query) {
    if (!query.sa2Code) {
      return {
        ok: false,
        error: "ABS query requires a verified SA2 code before area-level display.",
        source: "ABS Census DataPack",
        status: "mapping_pending",
        warnings: ["Area identity mapping must be completed before returning demographic values."]
      };
    }

    return {
      ok: false,
      error: "ABS importer is not implemented yet.",
      source: "ABS Census DataPack",
      status: "mapping_pending",
      warnings: ["The first importer should read validated files, then attach source documents."]
    };
  }
};
