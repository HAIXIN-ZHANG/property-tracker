# Market Signals

Last updated: 2026-06-20

`Market Signals` is the area-level analytics module for `property-tracker`.

It should feel similar in purpose to market dashboards from property portals and research sites, but it must be honest about data availability. The first version can show the chart layout, source links, and sample data. Real automated metrics require approved APIs, purchased chart data, or our own scheduled snapshots.

## Product Role

The user is trying to answer:

```txt
Is this area getting tighter, softer, more expensive, riskier, or more investable?
```

The module should support `Live`, `Invest`, and `Build` strategy lenses without pretending to be a live listing portal.

## Signal Groups

| Group         | Example Signals                                        | Why It Matters                                   |
| ------------- | ------------------------------------------------------ | ------------------------------------------------ |
| Supply        | active listings, new listings, old listings            | Shows whether buyers have choice or competition  |
| Demand        | sold volume, days on market, auction/sold activity     | Shows liquidity and buyer pressure               |
| Price         | asking price trend, median sale price, price change    | Shows vendor sentiment and affordability         |
| Rental        | vacancy rate, rent listings, asking rent, rental yield | Supports investor view and rental-market stress  |
| Pressure      | months of stock, net supply rate, stale listing share  | Combines supply and demand into decision signals |
| Future Supply | building approvals, planning events, land releases     | Helps judge future housing and infrastructure    |

## Metric Feasibility

| Metric                          | V1 Behaviour                     | Real Data Path                                                        | Status              | Notes                                                                 |
| ------------------------------- | -------------------------------- | --------------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------- |
| Active listings trend           | Link-only availability card      | SQM Total Property Listings, Domain listing search snapshots          | Conditional         | Domain access needed for automated suburb-level snapshots             |
| New listings                    | Link-only availability card      | SQM Chart Data or our own Domain listing snapshots                    | Conditional         | Our own snapshots require daily/weekly scheduled capture              |
| Old/stale listings              | Link-only availability card      | SQM Chart Data or our own listing age calculation                     | Conditional         | Can be derived from `dateListed` if Domain returns it                 |
| Sold volume / transaction count | Access-pending availability card | Domain suburb performance/sales results, PropTrack Transactions API   | Access gated        | Government open data is not enough for clean near-real-time suburb UI |
| Asking price trend              | External link availability card  | SQM Asking Property Prices, Domain/PropTrack later                    | Conditional         | Better for vendor sentiment than final transaction values             |
| Vendor discount                 | Definition only in V1            | Initial asking price, price change history, final sold price          | Later derived       | Do not promise accuracy until listing and sold history are available  |
| Days on market                  | Access-pending availability card | SQM Postcode Snapshot, Domain `dateListed`, listing status snapshots  | Conditional         | Can be calculated if we store listing lifecycle history               |
| Vacancy rate                    | External link availability card  | SQM Vacancy Rates                                                     | External/commercial | Reuse and download terms need review                                  |
| Rent listings                   | External link availability card  | SQM Weekly Rent Listings, Domain/PropTrack rental listing feeds later | Conditional         | Useful for investor lens                                              |
| Asking rent / rental yield      | External link availability card  | SQM Asking Rent Prices/Rental Yields, Domain Rental AVM later         | Conditional         | Yield should show assumptions and source date                         |
| Net supply rate                 | Definition only in V1            | New listings, sold/removed listings, active stock                     | Later derived       | This is our own derived metric, not a direct provider field           |
| Months of stock                 | Definition only in V1            | Active listings divided by recent monthly sales volume                | Later derived       | Requires reliable sales volume                                        |
| Building approvals              | Public-data card later           | ABS Building Approvals                                                | Public source       | Usually LGA/state level, not exact suburb level                       |
| Planning and infrastructure     | Manual/event list first          | WA planning pages, Infrastructure WA, council portals, Data WA layers | Partially feasible  | Good for area watchlists, hard to normalize                           |

## Derived Metrics

These should not be shown as exact facts until source dependencies are available.

### Vendor Discount

```txt
vendorDiscountRate = (initialAskingPrice - soldPrice) / initialAskingPrice
```

Requires:

- Initial asking price.
- Price change history.
- Final sold price.
- Matched property/listing identity.

### Net Supply Rate

```txt
netSupplyRate = (newListings - soldOrRemovedListings) / activeListings
```

Requires:

- Active listing count.
- New listing count.
- Sold/removed listing count.
- Consistent time window.

### Months Of Stock

```txt
monthsOfStock = activeListings / recentMonthlySoldVolume
```

Requires:

- Active listing count.
- Sold volume for the same geography.
- Consistent property type and time window.

## Data Source Strategy

### V1: Display The Shape

Build a polished Market Signals page with:

- Sample data.
- Source-status badges.
- External links to SQM, Domain Research, REA/PropTrack, RBA, ABS, and WA planning sources.
- Clear labels: `Sample`, `External link`, `Access pending`, or `Derived later`.

Do not claim these are live market values.

### V2: Connect Source Links And Manual Data

Add:

- Manual note/source URL attachment.
- CSV/manual import placeholder.
- Source provenance table.
- Data freshness labels.

### V3: Domain Snapshot Pipeline

After `Agents & Listings` access is approved:

- Search each watched area by suburb/postcode/property type.
- Store listing ids, listing type, property type, price display, suburb, postcode, coordinates, land size, and `dateListed` if available.
- Capture snapshots daily or weekly.
- Derive active listings, new listings, stale listings, removed listings, and price-change history.

### V4: Commercial Data Evaluation

Evaluate:

- PropTrack Market API for supply, demand, rent, sale insights.
- PropTrack Transactions/Listings APIs for transaction and listing coverage.
- SQM chart data for postcode-level time series.
- Cotality products for deeper professional-grade reports and market analytics.

## UI Shape

First page layout:

```txt
Area header
-> Strategy lens tabs: Live / Invest / Build
-> Signal summary cards
-> Supply and demand chart
-> Price and rental chart
-> Pressure metrics
-> Future supply and planning signals
-> Source and freshness panel
```

The page should be calm and analytical, not a noisy news feed.

## Product Rules

1. A chart can use sample data only if it is labelled `Sample`.
2. A provider-gated metric must show `Access pending`.
3. Derived metrics must list their formula and missing dependencies.
4. SQM/Cotality/PropTrack data must not be copied or republished beyond allowed terms.
5. Domain/REA public page scraping is not a product backbone.
6. AI can explain the signals and formulas, but cannot invent values.

## Source References

- SQM Research Chart Data: https://sqmresearch.com.au/property/buy-chart-data
- SQM Total Property Listings: https://sqmresearch.com.au/property/total-property-listings
- SQM Postcode Snapshot: https://sqmresearch.com.au/property/postcode-snapshot
- Domain API Packages: https://developer.domain.com.au/docs/latest/apis/
- Domain Suburb Performance: https://developer.domain.com.au/docs/latest/apis/pkg_properties_locations/references/suburbperformance_get_bynamedsuburb/
- PropTrack Property Data APIs: https://www.proptrack.com.au/products/property-data-and-insights/apis/
- Cotality Australia: https://www.cotality.com/au
- ABS Building Approvals: https://www.abs.gov.au/statistics/industry/building-and-construction/building-approvals-australia
