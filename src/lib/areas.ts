import type { DataAvailabilityStatus } from "@/lib/data-contracts";
import type { MarketSignalAvailability } from "@/lib/market-signals";

export type StrategyLens = "live" | "invest" | "build";

export type AreaMetric = {
  label: string;
  value: string;
  detail: string;
  status: DataAvailabilityStatus;
};

export type AreaSignal = {
  label: string;
  value: string;
  change: string;
  availability: MarketSignalAvailability;
  source: string;
  formula?: string;
  missingDependencies?: string[];
};

export type AreaOpportunity = {
  id: string;
  title: string;
  type: "Land" | "House" | "House & Land";
  price: string;
  location: string;
  status: "Watching" | "Inspecting" | "Shortlisted";
  sourceStatus: DataAvailabilityStatus;
  summary: string;
  fit: Record<StrategyLens, string>;
  sourceRecords?: SourceRecord[];
  assumptions?: Array<{
    label: string;
    value: string;
    status: DataAvailabilityStatus;
  }>;
  checklist?: string[];
};

export type SourceRecord = {
  title: string;
  sourceName: string;
  href?: string;
  status: DataAvailabilityStatus;
  note: string;
};

export type AreaProfile = {
  identity: {
    id: string;
    slug: string;
    displayName: string;
    state: "WA";
    primaryPostcode: string;
    areaType: "suburb";
    mappingStatus: "unverified" | "manually_verified";
  };
  headline: string;
  summary: string;
  lensNotes: Record<StrategyLens, string>;
  metrics: AreaMetric[];
  signals: AreaSignal[];
  planningNotes: Array<{
    title: string;
    detail: string;
    status: DataAvailabilityStatus;
  }>;
  opportunities: AreaOpportunity[];
};

export const strategyLensLabels: Record<StrategyLens, string> = {
  live: "Live",
  invest: "Invest",
  build: "Build"
};

export const strategyLensDescriptions: Record<StrategyLens, string> = {
  live: "Owner-occupier view: schools, amenity, commute and area confidence.",
  invest: "Investor view: rent pressure, supply, liquidity and long-term demand.",
  build: "Land and build view: release timing, packages, infrastructure and constraints."
};

// Stage 1 data is intentionally static and source-labelled; do not treat these
// values as live market data until provider adapters replace them.
export const areaProfiles: AreaProfile[] = [
  {
    identity: {
      id: "area_ellenbrook_wa",
      slug: "ellenbrook",
      displayName: "Ellenbrook",
      state: "WA",
      primaryPostcode: "6069",
      areaType: "suburb",
      mappingStatus: "unverified"
    },
    headline: "Growth-area workspace with transport-led upside and family-buyer demand.",
    summary:
      "Use Ellenbrook to validate the core workflow: area context, transport change, sample listings, and source-labelled market signals.",
    lensNotes: {
      live: "Prioritise commute changes, schools, shopping access and established estate quality.",
      invest:
        "Watch rental pressure, active supply, new listings and how quickly family homes move.",
      build: "Compare available land, house-and-land packages, title timing and builder inclusions."
    },
    metrics: [
      {
        label: "Area identity",
        value: "Suburb sample",
        detail: "Domain and ABS provider keys still need exact mapping.",
        status: "sample_data"
      },
      {
        label: "Demographics",
        value: "Source ready",
        detail: "ABS SA2 fields are validated; suburb-to-SA2 mapping is still pending.",
        status: "mapping_pending"
      },
      {
        label: "Transport",
        value: "Source ready",
        detail: "GTFS fields are validated; stop/commute mapping is still pending.",
        status: "mapping_pending"
      },
      {
        label: "Listings",
        value: "Access pending",
        detail: "Domain buyer listing packages are not approved yet.",
        status: "access_pending"
      }
    ],
    signals: [
      {
        label: "Active listings",
        value: "Link only",
        change: "Use original SQM/Domain references; no local snapshot is stored.",
        availability: "external_link_now",
        source: "SQM / Domain later"
      },
      {
        label: "Rental pressure",
        value: "Link only",
        change: "Vacancy and rent signals need licensed or linked source data.",
        availability: "external_link_now",
        source: "SQM Research"
      },
      {
        label: "Sold volume",
        value: "Access pending",
        change: "Needs Domain suburb performance or PropTrack transactions.",
        availability: "access_pending",
        source: "Domain / PropTrack"
      },
      {
        label: "Future supply",
        value: "Public candidate",
        change:
          "ABS Building Approvals can support broader LGA/state context, not suburb truth yet.",
        availability: "public_source",
        source: "ABS / WA planning"
      },
      {
        label: "Net supply rate",
        value: "Derived later",
        change: "Requires active listings, new listings and sold/removed counts.",
        availability: "derived_later",
        source: "Formula after snapshots",
        formula: "(new listings - sold or removed listings) / active listings",
        missingDependencies: ["Active listing snapshots", "New listing count", "Sold/removed count"]
      }
    ],
    planningNotes: [
      {
        title: "Transport change",
        detail: "Track station, route and commute assumptions as source-linked notes.",
        status: "source_accepted"
      },
      {
        title: "Land releases",
        detail: "Use manual estate/source links first; avoid Google result scraping.",
        status: "source_accepted"
      }
    ],
    opportunities: [
      {
        id: "ell-land-001",
        title: "North-east corridor land watch",
        type: "Land",
        price: "Sample: mid-$300k",
        location: "Ellenbrook growth pocket",
        status: "Watching",
        sourceStatus: "sample_data",
        summary: "Track lot size, title timing, site costs and builder compatibility.",
        fit: {
          live: "Good if schools, commute and estate quality fit daily life.",
          invest: "Depends on rental depth and land supply absorption.",
          build: "Strong fit for comparing builder quotes and package assumptions."
        }
      },
      {
        id: "ell-house-001",
        title: "Established family home benchmark",
        type: "House",
        price: "Sample: high-$600k",
        location: "Established Ellenbrook",
        status: "Inspecting",
        sourceStatus: "sample_data",
        summary: "Use as a benchmark against land-plus-build total cost.",
        fit: {
          live: "Useful baseline for move-in-ready lifestyle comparison.",
          invest: "Check rent estimate and maintenance risk before yield assumptions.",
          build: "Compare against turnkey build timeline and upgrade costs."
        }
      },
      {
        id: "ell-package-001",
        title: "House-and-land package placeholder",
        type: "House & Land",
        price: "Sample: low-$700k",
        location: "Estate package source",
        status: "Shortlisted",
        sourceStatus: "source_accepted",
        summary: "Designed for later AI extraction from builder pages or pasted PDFs.",
        fit: {
          live: "Check inclusions, orientation, commute and school catchment.",
          invest: "Needs rent, vacancy and depreciation assumptions.",
          build: "Best current fit: collect inclusions, site works and timeline."
        }
      }
    ]
  },
  {
    identity: {
      id: "area_alkimos_wa",
      slug: "alkimos",
      displayName: "Alkimos",
      state: "WA",
      primaryPostcode: "6038",
      areaType: "suburb",
      mappingStatus: "unverified"
    },
    headline: "Coastal growth corridor for land, packages and infrastructure watching.",
    summary: "Alkimos is useful for testing land/build scenarios and future infrastructure notes.",
    lensNotes: {
      live: "Prioritise commute, beach access, schools and daily retail maturity.",
      invest: "Watch how supply, rent demand and new estates affect holding risk.",
      build: "Compare titled land, package pricing, estate stages and delivery timing."
    },
    metrics: [
      {
        label: "Area identity",
        value: "Suburb sample",
        detail: "Provider geography mapping is still unverified.",
        status: "sample_data"
      },
      {
        label: "Schools",
        value: "Source ready",
        detail: "School fields are validated; area school-distance mapping is still pending.",
        status: "mapping_pending"
      },
      {
        label: "Planning",
        value: "Manual first",
        detail: "Use planning and estate links until layer licences are reviewed.",
        status: "source_accepted"
      },
      {
        label: "Market data",
        value: "Access pending",
        detail: "Live listings and sales volumes need approved providers.",
        status: "access_pending"
      }
    ],
    signals: [
      {
        label: "Active listings",
        value: "Link only",
        change: "Use external links until listing snapshots exist.",
        availability: "external_link_now",
        source: "SQM / Domain later"
      },
      {
        label: "Land supply",
        value: "Sample only",
        change: "Estate pages and release notes must be attached before this becomes sourced.",
        availability: "sample_now",
        source: "Developer pages"
      },
      {
        label: "Sold volume",
        value: "Access pending",
        change: "Requires approved Domain or PropTrack data.",
        availability: "access_pending",
        source: "Domain / PropTrack"
      },
      {
        label: "Future supply",
        value: "Public candidate",
        change: "Building approvals can give broader supply context after geography mapping.",
        availability: "public_source",
        source: "ABS"
      },
      {
        label: "Months of stock",
        value: "Derived later",
        change: "Needs active stock and recent sold volume for the same geography.",
        availability: "derived_later",
        source: "Formula after snapshots",
        formula: "active listings / recent monthly sold volume",
        missingDependencies: ["Active listing count", "Recent sold volume"]
      }
    ],
    planningNotes: [
      {
        title: "Estate maturity",
        detail: "Track shopping, transport and school delivery against move-in timing.",
        status: "source_accepted"
      },
      {
        title: "Coastal supply",
        detail: "Separate lifestyle premium from land-release abundance.",
        status: "sample_data"
      }
    ],
    opportunities: [
      {
        id: "alk-land-001",
        title: "Coastal land release watch",
        type: "Land",
        price: "Sample: high-$300k",
        location: "Alkimos estate stage",
        status: "Watching",
        sourceStatus: "source_accepted",
        summary: "Compare lot width, title timing, estate fees and site constraints.",
        fit: {
          live: "Good if commute and amenity timing match lifestyle needs.",
          invest: "Supply risk needs extra scrutiny.",
          build: "Strong land/build comparison candidate."
        }
      },
      {
        id: "alk-package-001",
        title: "Coastal package benchmark",
        type: "House & Land",
        price: "Sample: mid-$700k",
        location: "Builder package",
        status: "Watching",
        sourceStatus: "sample_data",
        summary: "Use for package extraction schema and inclusions comparison.",
        fit: {
          live: "Check liveability while surrounding area matures.",
          invest: "Needs rent depth and vacancy support.",
          build: "Good for builder quote and specification comparison."
        }
      }
    ]
  },
  {
    identity: {
      id: "area_baldivis_wa",
      slug: "baldivis",
      displayName: "Baldivis",
      state: "WA",
      primaryPostcode: "6171",
      areaType: "suburb",
      mappingStatus: "unverified"
    },
    headline: "Established outer-growth area for family demand and investor screening.",
    summary: "Baldivis helps compare mature outer-suburb amenities with ongoing supply.",
    lensNotes: {
      live: "Prioritise commute, school access, shopping and established neighbourhood quality.",
      invest: "Focus on rental demand, vacancy, days on market and comparable supply.",
      build: "Use build lens only where land/package supply still exists."
    },
    metrics: [
      {
        label: "Crime",
        value: "Source ready",
        detail: "WA Police fields are validated; suburb/locality mapping is still pending.",
        status: "mapping_pending"
      },
      {
        label: "Demographics",
        value: "Source ready",
        detail: "ABS fields are validated; suburb-to-SA2 mapping is still pending.",
        status: "mapping_pending"
      },
      {
        label: "Schools",
        value: "Source ready",
        detail: "School coordinates are validated; local catchment/distance mapping is pending.",
        status: "mapping_pending"
      },
      {
        label: "Market data",
        value: "Access pending",
        detail: "Live listing and sales APIs still require approval.",
        status: "access_pending"
      }
    ],
    signals: [
      {
        label: "Active listings",
        value: "Link only",
        change: "Use source links until provider snapshots exist.",
        availability: "external_link_now",
        source: "SQM / Domain later"
      },
      {
        label: "Days on market",
        value: "Access pending",
        change: "Needs listing lifecycle or SQM licensed data.",
        availability: "access_pending",
        source: "SQM / Domain"
      },
      {
        label: "Rental pressure",
        value: "Link only",
        change: "Link first, ingest only with terms approval.",
        availability: "external_link_now",
        source: "SQM Research"
      },
      {
        label: "Future supply",
        value: "Public candidate",
        change: "Building approvals can be checked at broader geography.",
        availability: "public_source",
        source: "ABS"
      },
      {
        label: "Vendor discount",
        value: "Derived later",
        change: "Needs initial asking price, price changes and final sold price.",
        availability: "derived_later",
        source: "Formula after listing/sales history",
        formula: "(initial asking price - sold price) / initial asking price",
        missingDependencies: ["Initial asking price", "Price change history", "Sold price"]
      }
    ],
    planningNotes: [
      {
        title: "Established amenity",
        detail: "Useful for liveability comparison against newer growth corridors.",
        status: "sample_data"
      },
      {
        title: "Supply balance",
        detail: "Watch active listings versus rental demand before investor claims.",
        status: "source_accepted"
      }
    ],
    opportunities: [
      {
        id: "bal-house-001",
        title: "Family home comparable",
        type: "House",
        price: "Sample: mid-$600k",
        location: "Baldivis established pocket",
        status: "Watching",
        sourceStatus: "sample_data",
        summary: "Use to compare schools, commute and rental assumptions.",
        fit: {
          live: "Strong baseline for family-buyer workflow.",
          invest: "Needs rent and vacancy support before yield confidence.",
          build: "Only useful as a benchmark against newer builds."
        }
      }
    ]
  },
  {
    identity: {
      id: "area_byford_wa",
      slug: "byford",
      displayName: "Byford",
      state: "WA",
      primaryPostcode: "6122",
      areaType: "suburb",
      mappingStatus: "unverified"
    },
    headline: "Land/build and infrastructure-timing test area.",
    summary:
      "Byford is useful for tracking development timing, transport assumptions and land packages.",
    lensNotes: {
      live: "Check commute, schools, shopping and construction disruption tradeoffs.",
      invest: "Watch whether population growth translates into rental demand.",
      build: "Prioritise land title timing, site works and package inclusions."
    },
    metrics: [
      {
        label: "Area identity",
        value: "Suburb sample",
        detail: "Needs provider mapping before real comparison.",
        status: "sample_data"
      },
      {
        label: "Transport",
        value: "Source ready",
        detail: "GTFS fields are validated; commute mapping is still pending.",
        status: "mapping_pending"
      },
      {
        label: "Planning",
        value: "Manual first",
        detail: "Infrastructure/event tracker should start with source URLs.",
        status: "source_accepted"
      },
      {
        label: "Listings",
        value: "Access pending",
        detail: "Domain/PropTrack data is not available yet.",
        status: "access_pending"
      }
    ],
    signals: [
      {
        label: "Active listings",
        value: "Access pending",
        change: "Needs scheduled provider snapshots for a real local trend.",
        availability: "access_pending",
        source: "Domain later"
      },
      {
        label: "Package supply",
        value: "Sample only",
        change: "Builder and estate links must be attached as sources first.",
        availability: "sample_now",
        source: "Builder pages"
      },
      {
        label: "Sold volume",
        value: "Access pending",
        change: "Needs approved sales data provider.",
        availability: "access_pending",
        source: "Domain / PropTrack"
      },
      {
        label: "Future supply",
        value: "Public candidate",
        change: "ABS building approvals can support broader context.",
        availability: "public_source",
        source: "ABS"
      },
      {
        label: "Net supply rate",
        value: "Derived later",
        change: "Needs listing snapshots and removed/sold counts first.",
        availability: "derived_later",
        source: "Formula after snapshots",
        formula: "(new listings - sold or removed listings) / active listings",
        missingDependencies: ["New listings", "Active listings", "Sold/removed listings"]
      }
    ],
    planningNotes: [
      {
        title: "Infrastructure timing",
        detail: "Record planned projects as events, not unverified claims.",
        status: "source_accepted"
      },
      {
        title: "Build risk",
        detail: "Site works and timeline assumptions should be captured per opportunity.",
        status: "sample_data"
      }
    ],
    opportunities: [
      {
        id: "byf-package-001",
        title: "Infrastructure-timed package",
        type: "House & Land",
        price: "Sample: high-$600k",
        location: "Byford growth pocket",
        status: "Watching",
        sourceStatus: "source_accepted",
        summary: "Designed for testing build lens and source extraction workflow.",
        fit: {
          live: "Depends on commute tolerance and amenity maturity.",
          invest: "Needs rent pressure and future supply checks.",
          build: "Strong fit for title timing and builder comparison."
        }
      }
    ]
  },
  {
    identity: {
      id: "area_subiaco_wa",
      slug: "subiaco",
      displayName: "Subiaco",
      state: "WA",
      primaryPostcode: "6008",
      areaType: "suburb",
      mappingStatus: "unverified"
    },
    headline: "Inner established suburb for premium owner-occupier and investor comparison.",
    summary:
      "Subiaco keeps the product honest beyond land/build by testing established-market analysis.",
    lensNotes: {
      live: "Prioritise walkability, schools, amenities, heritage constraints and commute.",
      invest: "Focus on liquidity, rent depth, apartment/house split and premium risk.",
      build:
        "Build lens should focus on constraints, renovation and planning notes, not new estates."
    },
    metrics: [
      {
        label: "Demographics",
        value: "Source ready",
        detail: "ABS fields are validated; suburb-to-SA2 mapping is still pending.",
        status: "mapping_pending"
      },
      {
        label: "Amenities",
        value: "Manual first",
        detail: "OSM/Google Places rules need review before automation.",
        status: "source_accepted"
      },
      {
        label: "Planning",
        value: "Licence review",
        detail: "Planning layers exist but public use needs care.",
        status: "source_accepted"
      },
      {
        label: "Market data",
        value: "Access pending",
        detail: "Sales, listings and AVM data need provider approval.",
        status: "access_pending"
      }
    ],
    signals: [
      {
        label: "Active listings",
        value: "Link only",
        change: "Established areas need property-type filtering before local snapshots.",
        availability: "external_link_now",
        source: "SQM / Domain later"
      },
      {
        label: "Price signal",
        value: "Link only",
        change: "Asking price charts can be linked before licensed ingestion.",
        availability: "external_link_now",
        source: "SQM Research"
      },
      {
        label: "Sold volume",
        value: "Access pending",
        change: "Needs sales result coverage and property-type filters.",
        availability: "access_pending",
        source: "Domain / PropTrack"
      },
      {
        label: "Planning pressure",
        value: "Public candidate",
        change: "Council/planning events need source capture and interpretation.",
        availability: "public_source",
        source: "Council / WA planning"
      },
      {
        label: "Vendor discount",
        value: "Derived later",
        change: "Needs matched listing history and sold results first.",
        availability: "derived_later",
        source: "Formula after listing/sales history",
        formula: "(initial asking price - sold price) / initial asking price",
        missingDependencies: ["Initial asking price", "Price changes", "Sold price"]
      }
    ],
    planningNotes: [
      {
        title: "Established constraints",
        detail: "Planning, heritage and renovation assumptions need source-linked checks.",
        status: "source_accepted"
      },
      {
        title: "Premium comparison",
        detail: "Useful benchmark against growth-area affordability and commute tradeoffs.",
        status: "sample_data"
      }
    ],
    opportunities: [
      {
        id: "sub-house-001",
        title: "Inner-suburb house benchmark",
        type: "House",
        price: "Sample: premium",
        location: "Subiaco established pocket",
        status: "Watching",
        sourceStatus: "sample_data",
        summary: "Use for established-area comparison and premium-market assumptions.",
        fit: {
          live: "Strong liveability benchmark.",
          invest: "Needs rent depth, liquidity and maintenance assumptions.",
          build: "Mostly renovation/planning constraint analysis."
        }
      }
    ]
  }
];

export function getAreas() {
  return areaProfiles;
}

export function getAreaBySlug(slug: string) {
  return areaProfiles.find((area) => area.identity.slug === slug);
}

export function getDefaultArea() {
  return areaProfiles[0];
}

export function getOpportunityById(areaSlug: string, opportunityId: string) {
  return getAreaBySlug(areaSlug)?.opportunities.find(
    (opportunity) => opportunity.id === opportunityId
  );
}

export function getOpportunityRouteParams() {
  return areaProfiles.flatMap((area) =>
    area.opportunities.map((opportunity) => ({
      slug: area.identity.slug,
      opportunityId: opportunity.id
    }))
  );
}

export function getOpportunitySourceRecords(
  _area: AreaProfile,
  opportunity: AreaOpportunity
): SourceRecord[] {
  // No fallback records: an empty provenance panel is more honest than a
  // generated placeholder that looks sourced.
  return opportunity.sourceRecords ?? [];
}

export function getOpportunityAssumptions(opportunity: AreaOpportunity) {
  // These defaults keep access-gated provider data visible in the UI instead of
  // hiding uncertainty behind sample values.
  return (
    opportunity.assumptions ?? [
      {
        label: "Price confidence",
        value: "Sample only",
        status: opportunity.sourceStatus
      },
      {
        label: "Inspection state",
        value: opportunity.status,
        status: "source_accepted" as const
      },
      {
        label: "Provider data",
        value: "Access pending",
        status: "access_pending" as const
      }
    ]
  );
}

export function getOpportunityChecklist(opportunity: AreaOpportunity) {
  return (
    opportunity.checklist ?? [
      `Confirm original source for ${opportunity.type.toLowerCase()} details.`,
      "Capture land size, property features, title/build timing and inclusions.",
      "Attach source URL, PDF, notes or pasted listing text before AI extraction.",
      "Compare the opportunity under Live, Invest and Build lenses."
    ]
  );
}
