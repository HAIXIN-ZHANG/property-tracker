import type { ProviderAdapter } from "@/lib/data-contracts";

export type DomainAreaQuery = {
  suburb: string;
  state: "WA";
  postcode?: string;
};

export type DomainAreaResult = {
  locationId?: string;
  listingCount?: number;
  suburbPerformance?: {
    medianPrice?: number;
    daysOnMarket?: number;
  };
};

export const domainProviderAdapter: ProviderAdapter<DomainAreaQuery, DomainAreaResult> = {
  id: "domain",
  name: "Domain API",
  status: "access_pending",
  capabilities: [
    "Address suggestions",
    "Listings and agents",
    "Properties and locations",
    "Rental estimates",
    "School data"
  ],
  caveats: [
    "OAuth credentials exist, but buyer-facing API package access is not approved.",
    "Do not show Domain-backed suburb metrics until endpoint access and fields are tested."
  ],
  query() {
    // This stub deliberately fails closed until Domain package access is granted.
    return {
      ok: false,
      error: "Domain buyer-facing API access is still pending.",
      source: "Domain Developer Portal",
      status: "access_pending",
      warnings: ["Keep Domain and PropTrack as provider interfaces, not sample-data claims."]
    };
  }
};
