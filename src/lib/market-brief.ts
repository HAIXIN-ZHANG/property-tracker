export type MarketBriefCategory = "market" | "policy" | "planning" | "data";

export type MarketBriefItem = {
  title: string;
  sourceName: string;
  href: string;
  category: MarketBriefCategory;
  cadence: string;
  relevance: string;
  priority: "primary" | "secondary";
};

export const marketBriefItems: MarketBriefItem[] = [
  {
    title: "Domain Research",
    sourceName: "Domain",
    href: "https://www.domain.com.au/research/",
    category: "market",
    cadence: "Reports",
    relevance: "House prices, rental reports, school zones, liveability and buyer guides.",
    priority: "primary"
  },
  {
    title: "Australian Property Market Insights",
    sourceName: "realestate.com.au",
    href: "https://www.realestate.com.au/insights/",
    category: "market",
    cadence: "News & outlooks",
    relevance: "REA market outlooks, rate commentary, rental pressure and buyer behaviour.",
    priority: "primary"
  },
  {
    title: "Property Chart Data",
    sourceName: "SQM Research",
    href: "https://sqmresearch.com.au/property/buy-chart-data",
    category: "data",
    cadence: "Chart data",
    relevance: "Listings, asking prices, vacancy, rent listings, yields and postcode snapshots.",
    priority: "primary"
  },
  {
    title: "Property Data APIs",
    sourceName: "PropTrack",
    href: "https://www.proptrack.com.au/products/property-data-and-insights/apis/",
    category: "data",
    cadence: "Commercial data",
    relevance: "Later-stage candidate for suburb supply, demand, sales and rental signals.",
    priority: "primary"
  },
  {
    title: "Cash Rate Target",
    sourceName: "Reserve Bank of Australia",
    href: "https://www.rba.gov.au/statistics/cash-rate/",
    category: "policy",
    cadence: "Policy signal",
    relevance: "Borrowing capacity and investor demand should be read against rate settings.",
    priority: "secondary"
  },
  {
    title: "State Infrastructure Strategy",
    sourceName: "Infrastructure WA",
    href: "https://www.infrastructure.wa.gov.au/",
    category: "planning",
    cadence: "Long-term planning",
    relevance: "Medium-to-long-term infrastructure context for area watchlists.",
    priority: "secondary"
  },
  {
    title: "Planning, Lands and Heritage",
    sourceName: "WA Government",
    href: "https://www.wa.gov.au/organisation/department-of-planning-lands-and-heritage",
    category: "planning",
    cadence: "Announcements",
    relevance: "Planning consultations, land use updates and development pathways.",
    priority: "secondary"
  }
];

export function getPrimaryMarketBriefItems(items: MarketBriefItem[] = marketBriefItems) {
  return items.filter((item) => item.priority === "primary");
}

export function getMarketBriefCategories(items: MarketBriefItem[] = marketBriefItems) {
  return Array.from(new Set(items.map((item) => item.category)));
}
