import type { DataAvailabilityStatus, SourceDocument } from "@/lib/data-contracts";

export type EvidenceMetadata = {
  basis: string;
  lastCheckedAt?: string;
  evidenceUrl?: string;
  limitations: string[];
};

export type DataSourceStatus = {
  id: string;
  name: string;
  status: DataAvailabilityStatus;
  geographyLevel: string;
  productUse: string;
  currentEvidence: string;
  evidence: EvidenceMetadata;
  nextAction: string;
  sourceDocuments: SourceDocument[];
};

export const dataSourceStatuses: DataSourceStatus[] = [
  {
    id: "domain-core-packages",
    name: "Domain buyer-facing packages",
    status: "access_pending",
    geographyLevel: "Listing, property, suburb, address",
    productUse: "Listings, suburb performance, property profile, price/rent estimates",
    currentEvidence: "OAuth works, but buyer-facing packages still need access approval.",
    evidence: {
      basis: "Domain Developer Portal project and OAuth smoke test",
      evidenceUrl: "https://developer.domain.com.au/",
      lastCheckedAt: "2026-06-21",
      limitations: [
        "Business Profile is incomplete.",
        "Buyer-facing packages are not approved.",
        "Sandbox Listings Management does not provide buyer search data."
      ]
    },
    nextAction: "Complete Business Profile and request official API package access.",
    sourceDocuments: [
      {
        confidence: "high",
        id: "src_domain_portal_project",
        lastCheckedAt: "2026-06-21",
        missingFields: [
          "Approved Agents & Listings package",
          "Approved Properties & Locations package",
          "Approved Property Package"
        ],
        sourceName: "Domain Developer Portal",
        sourceType: "url",
        sourceUrl: "https://developer.domain.com.au/",
        status: "access_pending",
        title: "PROPERTY-TRACKER-DEV portal access evidence"
      }
    ]
  },
  {
    id: "proptrack-commercial",
    name: "PropTrack / REA commercial APIs",
    status: "access_pending",
    geographyLevel: "Address, property, suburb, listing, transaction",
    productUse: "Commercial fallback/comparison source for market and listing data",
    currentEvidence: "Commercial B2B candidate only; not a self-serve MVP dependency.",
    evidence: {
      basis: "Public product/API documentation observed",
      evidenceUrl: "https://www.proptrack.com.au/products/property-data-and-insights/apis/",
      lastCheckedAt: "2026-06-21",
      limitations: [
        "Commercial access is not approved.",
        "No trial payload has been inspected.",
        "Do not use REA public pages as a data backbone."
      ]
    },
    nextAction: "Evaluate commercial access later; do not block WA-first MVP.",
    sourceDocuments: [
      {
        confidence: "medium",
        id: "src_proptrack_api_docs",
        lastCheckedAt: "2026-06-21",
        missingFields: ["Commercial agreement", "Trial response fields", "Allowed display terms"],
        sourceName: "PropTrack",
        sourceType: "url",
        sourceUrl: "https://www.proptrack.com.au/products/property-data-and-insights/apis/",
        status: "access_pending",
        title: "PropTrack API product page"
      }
    ]
  },
  {
    id: "abs-census-wa",
    name: "ABS WA Census DataPacks",
    status: "mapping_pending",
    geographyLevel: "SA1, SA2, SAL, LGA, POA",
    productUse: "Demographics and long-term area profile",
    currentEvidence: "WA SA2 Census file downloaded and fields confirmed.",
    evidence: {
      basis: "Downloaded WA SA2 Census DataPack and inspected CSV fields",
      evidenceUrl: "https://www.abs.gov.au/census/find-census-data/datapacks",
      lastCheckedAt: "2026-06-21",
      limitations: ["Suburb-to-SA2 mapping is unresolved.", "Raw file is not committed to the app."]
    },
    nextAction: "Map first five suburbs to ABS geography before area-level display.",
    sourceDocuments: [
      {
        capturedAt: "2026-06-21",
        confidence: "high",
        id: "src_abs_wa_sa2_2021",
        lastCheckedAt: "2026-06-21",
        missingFields: ["Suburb-to-SA2 mapping", "Stored raw snapshot id"],
        sourceName: "ABS Census DataPack",
        sourceType: "file",
        sourceUrl: "https://www.abs.gov.au/census/find-census-data/datapacks",
        status: "file_validated",
        title: "2021 WA SA2 Census DataPack"
      }
    ]
  },
  {
    id: "wa-police-crime",
    name: "WA Police crime statistics",
    status: "mapping_pending",
    geographyLevel: "WA, region, district, locality/suburb depending report",
    productUse: "Crime trend card with geography caveats",
    currentEvidence: "Crime XLSX sheets and fields were inspected.",
    evidence: {
      basis: "Downloaded WA Police crime statistics workbook and inspected sheets/fields",
      evidenceUrl: "https://www.police.wa.gov.au/Crime/CrimeStatistics",
      lastCheckedAt: "2026-06-21",
      limitations: [
        "Offence grouping method is not defined.",
        "Locality/suburb matching needs explicit caveats.",
        "Raw file is not committed to the app."
      ]
    },
    nextAction: "Define suburb/locality matching caveats before showing area trends.",
    sourceDocuments: [
      {
        capturedAt: "2026-06-21",
        confidence: "high",
        id: "src_wa_police_crime_xlsx",
        lastCheckedAt: "2026-06-21",
        missingFields: [
          "Suburb/locality mapping",
          "Offence grouping method",
          "Stored raw snapshot id"
        ],
        sourceName: "WA Police",
        sourceType: "file",
        sourceUrl: "https://www.police.wa.gov.au/Crime/CrimeStatistics",
        status: "file_validated",
        title: "WA Police crime time series XLSX"
      }
    ]
  },
  {
    id: "wa-schools",
    name: "WA Education / Data WA school list",
    status: "mapping_pending",
    geographyLevel: "School point/address",
    productUse: "School list and future map markers",
    currentEvidence: "School XLSX fields include coordinates and addresses.",
    evidence: {
      basis: "Downloaded WA schools list workbook and inspected address/coordinate fields",
      evidenceUrl: "https://catalogue.data.wa.gov.au/",
      lastCheckedAt: "2026-06-21",
      limitations: [
        "Distance rules are not implemented.",
        "Catchment interpretation is not validated.",
        "Raw file is not committed to the app."
      ]
    },
    nextAction: "Add distance/catchment interpretation rules before area claims.",
    sourceDocuments: [
      {
        capturedAt: "2026-06-21",
        confidence: "high",
        id: "src_wa_schools_xlsx",
        lastCheckedAt: "2026-06-21",
        missingFields: ["Distance calculation", "Catchment/caveat copy", "Stored raw snapshot id"],
        sourceName: "WA Education / Data WA",
        sourceType: "file",
        sourceUrl: "https://catalogue.data.wa.gov.au/",
        status: "file_validated",
        title: "Western Australian Schools Lists"
      }
    ]
  },
  {
    id: "transperth-gtfs",
    name: "Transperth GTFS",
    status: "mapping_pending",
    geographyLevel: "Stops, routes, trips, shapes",
    productUse: "Transport and commute context",
    currentEvidence: "GTFS files and stop fields were inspected.",
    evidence: {
      basis: "Downloaded Transperth GTFS zip and inspected route/stop fields",
      evidenceUrl: "https://www.transperth.wa.gov.au/About/Spatial-Data-Access",
      lastCheckedAt: "2026-06-21",
      limitations: [
        "Area-to-stop matching is not implemented.",
        "Commute assumptions are not defined.",
        "Raw file is not committed to the app."
      ]
    },
    nextAction: "Map stops/routes to area workspaces and define commute assumptions.",
    sourceDocuments: [
      {
        capturedAt: "2026-06-21",
        confidence: "high",
        id: "src_transperth_gtfs",
        lastCheckedAt: "2026-06-21",
        missingFields: ["Area-to-stop mapping", "Commute method", "Stored raw snapshot id"],
        sourceName: "Transperth / PTA",
        sourceType: "file",
        sourceUrl: "https://www.transperth.wa.gov.au/About/Spatial-Data-Access",
        status: "file_validated",
        title: "Transperth GTFS zip"
      }
    ]
  },
  {
    id: "data-wa-planning",
    name: "Data WA / planning layers",
    status: "license_constrained",
    geographyLevel: "Locality and planning scheme geometry",
    productUse: "Area boundaries and planning proof of concept",
    currentEvidence: "Catalogue resources exist; licence and interpretation need review.",
    evidence: {
      basis: "Data WA catalogue resources observed",
      evidenceUrl: "https://catalogue.data.wa.gov.au/",
      lastCheckedAt: "2026-06-21",
      limitations: [
        "Licence terms need review before public display.",
        "Layer choice and interpretation rules are not defined.",
        "No local file/API response has been inspected in this app."
      ]
    },
    nextAction: "Review licence and start with metadata-only planning prototype.",
    sourceDocuments: [
      {
        confidence: "low",
        id: "src_data_wa_planning_catalogue",
        lastCheckedAt: "2026-06-21",
        missingFields: ["Licence approval", "Selected layer", "Field inspection"],
        sourceName: "Data WA / DPLH",
        sourceType: "url",
        sourceUrl: "https://catalogue.data.wa.gov.au/",
        status: "license_constrained",
        title: "Planning and locality catalogue references"
      }
    ]
  }
];
