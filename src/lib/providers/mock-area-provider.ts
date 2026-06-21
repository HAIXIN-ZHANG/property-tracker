import {
  areaProfiles,
  type AreaOpportunity,
  type AreaProfile,
  type SourceRecord
} from "@/lib/areas";
import type { AreaIdentityMapping, ProviderResult } from "@/lib/data-contracts";

export type AreaProvider = {
  getAreaBySlug: (slug: string) => ProviderResult<AreaProfile | undefined>;
  getAreas: () => ProviderResult<AreaProfile[]>;
  getDefaultArea: () => ProviderResult<AreaProfile>;
  getOpportunityById: (
    areaSlug: string,
    opportunityId: string
  ) => ProviderResult<AreaOpportunity | undefined>;
  getOpportunityRouteParams: () => ProviderResult<Array<{ slug: string; opportunityId: string }>>;
  getOpportunitySourceRecords: (
    area: AreaProfile,
    opportunity: AreaOpportunity
  ) => ProviderResult<SourceRecord[]>;
  getAreaIdentityMappings: () => ProviderResult<AreaIdentityMapping[]>;
};

const mockWarnings = [
  "Read-only sample data; not live market data.",
  "Area identity provider keys are not verified yet."
];

export const mockAreaProvider: AreaProvider = {
  getAreaBySlug(slug) {
    return {
      ok: true,
      data: areaProfiles.find((area) => area.identity.slug === slug),
      source: "AreaScope mock area provider",
      status: "sample_data",
      warnings: mockWarnings
    };
  },
  getAreas() {
    return {
      ok: true,
      data: areaProfiles,
      source: "AreaScope mock area provider",
      status: "sample_data",
      warnings: mockWarnings
    };
  },
  getDefaultArea() {
    return {
      ok: true,
      data: areaProfiles[0],
      source: "AreaScope mock area provider",
      status: "sample_data",
      warnings: mockWarnings
    };
  },
  getOpportunityById(areaSlug, opportunityId) {
    const area = areaProfiles.find((profile) => profile.identity.slug === areaSlug);
    return {
      ok: true,
      data: area?.opportunities.find((opportunity) => opportunity.id === opportunityId),
      source: "AreaScope mock area provider",
      status: "sample_data",
      warnings: mockWarnings
    };
  },
  getOpportunityRouteParams() {
    return {
      ok: true,
      data: areaProfiles.flatMap((area) =>
        area.opportunities.map((opportunity) => ({
          slug: area.identity.slug,
          opportunityId: opportunity.id
        }))
      ),
      source: "AreaScope mock area provider",
      status: "sample_data",
      warnings: mockWarnings
    };
  },
  getOpportunitySourceRecords(_area, opportunity) {
    return {
      ok: true,
      data: opportunity.sourceRecords ?? [],
      source: "AreaScope mock area provider",
      status: "sample_data",
      warnings:
        opportunity.sourceRecords && opportunity.sourceRecords.length > 0
          ? mockWarnings
          : ["No source document is attached to this sample opportunity yet."]
    };
  },
  getAreaIdentityMappings() {
    return {
      ok: true,
      data: areaProfiles.map((area) => ({
        areaSlug: area.identity.slug,
        caveats: [
          "Suburb-to-provider geography mapping is not verified.",
          "Do not treat sample values as suburb-level truth."
        ],
        displayName: area.identity.displayName,
        primaryPostcode: area.identity.primaryPostcode,
        providerKeys: {},
        state: area.identity.state,
        status: "mapping_pending"
      })),
      source: "AreaScope mock area provider",
      status: "mapping_pending",
      warnings: mockWarnings
    };
  }
};
