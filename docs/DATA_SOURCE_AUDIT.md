# Data Source Audit

Last updated: 2026-06-20

This document tracks what data can realistically support `property-tracker`.

The product should be constrained by data that is:

- Stable enough to refresh.
- Legal enough to use in a personal product that may become public.
- Traceable enough for AI explanations.
- Useful enough to change a property decision.

## Source Tiers

### Tier 1: Product Backbone

These sources can support core product features.

| Source                               | Access                             | Useful Data                                                                          | Product Use                                 | Main Risk                                                |
| ------------------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------- | -------------------------------------------------------- |
| ABS                                  | Official API and downloads         | Census, demographics, income, education, employment, housing, regional population    | Area profile, long-term demand analysis     | Census is slow-moving and geography mapping is complex   |
| WA Police Crime Statistics           | Official public data               | Suburb and area offence trends                                                       | WA crime context                            | Reported/detected crime is not the same as actual crime  |
| WA Education / Data WA Schools Lists | Official public download/catalogue | School name, code, address, suburb, postcode, latitude, longitude                    | School context and map markers              | School quality/catchment analysis needs separate sources |
| Data WA / SLIP / Landgate            | Public and gated spatial data      | Boundaries, cadastre, planning, transport, environment, property and planning layers | Map layers, land context, planning overlays | Some datasets are paid, restricted, or custom-licensed   |
| Transperth / PTA spatial data        | Official download                  | GTFS, routes, stops, shapefiles                                                      | Transport access and commute context        | Custom license, not standard open data                   |
| OpenStreetMap                        | Open data under ODbL               | POI, roads, shops, parks, amenities, transport tags                                  | Amenity scoring and base context            | Attribution and ODbL obligations                         |

### Tier 2: Opportunity Discovery And Enrichment

These sources are useful but should not be treated as guaranteed complete data.

| Source                             | Access                               | Useful Data                                                         | Product Use                                | Main Risk                                          |
| ---------------------------------- | ------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------- |
| Builder websites                   | Public source pages                  | House-and-land package pages, inclusions, floor plans               | AI extraction and package comparison       | Page formats change; terms differ by site          |
| Developer and estate websites      | Public source pages                  | Land releases, estates, title timing, stage information             | Land and build tracker                     | Often unstructured and marketing-heavy             |
| Council planning portals           | Public web portals, sometimes ArcGIS | Development applications, local planning, amendments                | Planning events and risk tracking          | Highly fragmented by council                       |
| State infrastructure project pages | Public pages and releases            | Road, rail, school, hospital, and community infrastructure projects | Area event timeline                        | Hard to normalize and keep fresh                   |
| User uploads                       | User-provided                        | Quotes, PDFs, brochures, emails, inspection notes                   | AI extraction and personal decision record | Requires careful provenance and confidence display |

### Tier 3: Commercial Or Later-Stage Sources

These may become valuable later but should not block MVP.

| Source               | Access                                              | Useful Data                                                                                    | Product Use                                          | Main Risk                                                  |
| -------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| Domain Public API    | Official API, package gated                         | Listings, property details, suburb performance, demographics, schools, price/rental estimates  | Later official listing/market integration            | Core buyer packages require approval and may be commercial |
| Pricefinder          | Commercial subscription                             | Sales history, AVM, property reports, market data                                              | Deep property analysis                               | Commercial access and reuse limits                         |
| CoreLogic / Cotality | Commercial B2B                                      | AVM, property history, risk data, market indices                                               | Advanced valuation and market analytics              | Commercial licensing                                       |
| PropTrack            | Commercial B2B APIs                                 | REA-linked listings, address, property, market, transaction data                               | Advanced market intelligence and REA-side comparison | Commercial licensing and sales/trial access                |
| SQM Research         | Public pages, paid/downloadable chart data, reports | Total listings, asking prices, vacancy rates, rent listings, rental yields, postcode snapshots | Market Signals external links and later chart data   | Terms, copyright, and commercial reuse limits              |
| Google Places API    | Official API                                        | Places, ratings, reviews metadata, photos, POI                                                 | Amenity and business context                         | Caching and display restrictions                           |

## Explicitly Risky Or Not A Backbone

### REA And Domain Public Page Scraping

Do not use automated scraping of public listing pages from Domain or realestate.com.au as the product backbone.

Use:

- Domain official API where possible.
- Public pages only as manual user references or UI inspiration.
- Source URLs pasted by the user only when the destination terms allow reasonable personal use.

### Google Search Results Scraping

Do not scrape Google search result pages.

Use search only as discovery if there is a compliant API or manual user flow. Google Custom Search JSON API is closed to new customers as of the current Google documentation and existing customers must transition by 2027-01-01. This makes it a poor long-term foundation.

Better pattern:

```txt
Discover source URL
-> Fetch original builder/developer/council page
-> Store source snapshot
-> AI extracts structured fields
-> Validate fields
-> Show source and confidence
```

## Data Model Implications

The product should not assume one unified data source.

Use source-aware records:

```txt
Area
AreaMetricSnapshot
MarketSignalSnapshot
AreaEvent
PropertyListing
Opportunity
SourceDocument
ExtractionRun
ExtractedField
AnalysisReport
WatchItem
Note
```

Key ideas:

- Store raw source snapshots when allowed.
- Store extracted fields separately from raw data.
- Record `sourceType`, `sourceUrl`, `capturedAt`, `extractedAt`, `confidence`, and `missingFields`.
- Never silently overwrite extracted facts without keeping a history.
- Treat AI outputs as analysis, not ground truth.

## MVP Data Strategy

Stage 1 should work without live paid API access.

Use:

- Seed/sample data for area dashboards.
- Manual source URL import.
- Manual PDF/text import.
- Domain API adapter interface with mocked data until credentials are available.
- Source provenance from day one.

This avoids the product being blocked by a single data provider.

## Source References

- Domain Developer Portal: https://developer.domain.com.au/docs/latest/
- Domain account login/register: https://developer.domain.com.au/account/login
- Domain create first project guide: https://developer.domain.com.au/docs/latest/getting-started/creating-first-project/
- Domain verify project guide: https://developer.domain.com.au/docs/latest/getting-started/verifying-project/
- Domain API packages: https://developer.domain.com.au/docs/latest/apis/
- Domain Live API Browser: https://developer.domain.com.au/docs/latest/live/
- Domain OpenAPI spec: https://developer.domain.com.au/static/latest/media/latest/openapi.json
- PropTrack Data and APIs: https://www.proptrack.com.au/products/property-data-and-insights/apis/
- PropTrack Developer Docs: https://developer.proptrack.com.au/
- ABS APIs: https://www.abs.gov.au/statistics/application-programming-interfaces-apis
- ABS Census DataPacks: https://www.abs.gov.au/census/find-census-data/datapacks
- ABS Regional Population: https://www.abs.gov.au/statistics/people/population/regional-population/latest-release
- WA Police Crime Statistics: https://www.wa.gov.au/organisation/western-australia-police-force/crime-statistics
- Data WA: https://www.data.wa.gov.au
- Transperth Spatial Data Access: https://www.transperth.wa.gov.au/About/Spatial-Data-Access
- OpenStreetMap copyright and license: https://www.openstreetmap.org/copyright
- Google Custom Search JSON API: https://developers.google.com/custom-search/v1/overview
- SQM Research Chart Data: https://sqmresearch.com.au/property/buy-chart-data
- SQM Research Total Property Listings: https://sqmresearch.com.au/property/total-property-listings
- SQM Research Postcode Snapshot: https://sqmresearch.com.au/property/postcode-snapshot
- Cotality Australia: https://www.cotality.com/au
- ABS Building Approvals: https://www.abs.gov.au/statistics/industry/building-and-construction/building-approvals-australia
