export type MarketSignalGroup =
  | "supply"
  | "demand"
  | "price"
  | "rental"
  | "pressure"
  | "future_supply";

export type MarketSignalAvailability =
  | "sample_now"
  | "external_link_now"
  | "access_pending"
  | "public_source"
  | "derived_later";

export type MarketSignalDefinition = {
  id: string;
  label: string;
  group: MarketSignalGroup;
  availability: MarketSignalAvailability;
  v1Behaviour: string;
  preferredSources: string[];
  dependencies: string[];
  formula?: string;
};

export type MarketSignalAvailabilityMeta = {
  label: string;
  color: string;
  background: string;
  borderColor: string;
  description: string;
};

const marketSignalAvailabilityMeta: Record<MarketSignalAvailability, MarketSignalAvailabilityMeta> =
  {
    sample_now: {
      label: "Sample only",
      color: "muted",
      background: "rgba(102, 115, 109, 0.09)",
      borderColor: "rgba(102, 115, 109, 0.2)",
      description: "Static sample value; not a live local metric."
    },
    external_link_now: {
      label: "Link only",
      color: "eucalyptus",
      background: "rgba(17, 97, 76, 0.08)",
      borderColor: "rgba(17, 97, 76, 0.22)",
      description: "Use the original source link; no local series is stored."
    },
    access_pending: {
      label: "Access pending",
      color: "amber",
      background: "rgba(183, 121, 31, 0.1)",
      borderColor: "rgba(183, 121, 31, 0.24)",
      description: "Provider access is required before this can be shown."
    },
    public_source: {
      label: "Public source candidate",
      color: "ocean",
      background: "rgba(38, 98, 217, 0.08)",
      borderColor: "rgba(38, 98, 217, 0.22)",
      description: "Public source exists, but geography mapping may be broader than suburb."
    },
    derived_later: {
      label: "Derived later",
      color: "muted",
      background: "rgba(102, 115, 109, 0.09)",
      borderColor: "rgba(102, 115, 109, 0.2)",
      description: "Requires upstream metrics and a clear formula before display."
    }
  };

export const marketSignalDefinitions: MarketSignalDefinition[] = [
  {
    id: "active_listings_trend",
    label: "Active listings trend",
    group: "supply",
    availability: "external_link_now",
    v1Behaviour: "Show link-only availability with SQM and Domain access-pending source paths.",
    preferredSources: ["SQM Total Property Listings", "Domain Agents & Listings snapshots"],
    dependencies: ["Area identity", "Property type filter"]
  },
  {
    id: "new_listings",
    label: "New listings",
    group: "supply",
    availability: "external_link_now",
    v1Behaviour: "Show link-only availability and explain that automation needs snapshots.",
    preferredSources: ["SQM Chart Data", "Domain Agents & Listings snapshots"],
    dependencies: ["Listing id", "Date listed", "Snapshot date"]
  },
  {
    id: "old_listings",
    label: "Old listings",
    group: "supply",
    availability: "external_link_now",
    v1Behaviour: "Show link-only availability with an external SQM reference.",
    preferredSources: ["SQM Total Property Listings", "Domain Agents & Listings snapshots"],
    dependencies: ["Listing id", "Date listed", "Snapshot date"]
  },
  {
    id: "sold_volume",
    label: "Sold volume",
    group: "demand",
    availability: "access_pending",
    v1Behaviour: "Show access-pending status until Domain or PropTrack data is available.",
    preferredSources: [
      "Domain suburb performance",
      "Domain sales results",
      "PropTrack Transactions API"
    ],
    dependencies: ["Sold date", "Sold price", "Area identity"]
  },
  {
    id: "days_on_market",
    label: "Days on market",
    group: "demand",
    availability: "access_pending",
    v1Behaviour: "Show a sample card and explain required listing lifecycle data.",
    preferredSources: ["SQM Postcode Snapshot", "Domain listing snapshots"],
    dependencies: ["Date listed", "Sold or removed date", "Listing id"]
  },
  {
    id: "asking_price_trend",
    label: "Asking price trend",
    group: "price",
    availability: "external_link_now",
    v1Behaviour: "Link to SQM asking price charts and show sample vendor sentiment trend.",
    preferredSources: [
      "SQM Asking Property Prices",
      "Domain listing snapshots",
      "PropTrack Market API"
    ],
    dependencies: ["Asking price", "Snapshot date", "Property type"]
  },
  {
    id: "vendor_discount",
    label: "Vendor discount",
    group: "price",
    availability: "derived_later",
    v1Behaviour: "Show the formula and mark dependencies as missing.",
    preferredSources: [
      "Domain listing snapshots",
      "Domain sales results",
      "PropTrack Transactions API"
    ],
    dependencies: ["Initial asking price", "Price change history", "Final sold price"],
    formula: "(initialAskingPrice - soldPrice) / initialAskingPrice"
  },
  {
    id: "vacancy_rate",
    label: "Vacancy rate",
    group: "rental",
    availability: "external_link_now",
    v1Behaviour: "Link to SQM vacancy rates and show sample investor signal.",
    preferredSources: ["SQM Vacancy Rates"],
    dependencies: ["Postcode", "Month"]
  },
  {
    id: "rent_listings",
    label: "Rent listings",
    group: "rental",
    availability: "external_link_now",
    v1Behaviour: "Link to SQM rent listings and show sample rental supply trend.",
    preferredSources: ["SQM Weekly Rent Listings", "Domain rental listings later"],
    dependencies: ["Postcode or area", "Snapshot date"]
  },
  {
    id: "asking_rent_yield",
    label: "Asking rent and yield",
    group: "rental",
    availability: "external_link_now",
    v1Behaviour: "Link to SQM asking rent/yield charts and show sample assumptions.",
    preferredSources: ["SQM Asking Rent Prices", "SQM Rental Yields", "Domain Rental AVM"],
    dependencies: ["Asking rent", "Asking or sale price", "Property type"]
  },
  {
    id: "net_supply_rate",
    label: "Net supply rate",
    group: "pressure",
    availability: "derived_later",
    v1Behaviour: "Show the formula only until listing snapshots and sold/removed counts exist.",
    preferredSources: ["Domain listing snapshots", "Domain sales results", "PropTrack Market API"],
    dependencies: ["New listings", "Sold or removed listings", "Active listings"],
    formula: "(newListings - soldOrRemovedListings) / activeListings"
  },
  {
    id: "months_of_stock",
    label: "Months of stock",
    group: "pressure",
    availability: "derived_later",
    v1Behaviour: "Show the formula only until active listings and sold volume are connected.",
    preferredSources: [
      "Domain listing snapshots",
      "Domain suburb performance",
      "PropTrack Market API"
    ],
    dependencies: ["Active listings", "Recent monthly sold volume"],
    formula: "activeListings / recentMonthlySoldVolume"
  },
  {
    id: "building_approvals",
    label: "Building approvals",
    group: "future_supply",
    availability: "public_source",
    v1Behaviour: "Show as a public-data candidate, usually at LGA/state level rather than suburb.",
    preferredSources: ["ABS Building Approvals"],
    dependencies: ["LGA or state mapping", "Approval month", "Dwelling type"]
  }
];

export function getMarketSignalsByGroup(group: MarketSignalGroup) {
  return marketSignalDefinitions.filter((signal) => signal.group === group);
}

export function getDerivedMarketSignals() {
  return marketSignalDefinitions.filter((signal) => signal.availability === "derived_later");
}

export function getMarketSignalAvailabilityMeta(availability: MarketSignalAvailability) {
  return marketSignalAvailabilityMeta[availability];
}
