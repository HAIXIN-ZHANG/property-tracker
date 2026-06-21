# Data Feasibility Review

Last updated: 2026-06-20

This document answers the core product question:

```txt
Given the data we can actually access, what can property-tracker build now,
what is conditional, and what should not be promised yet?
```

## Validation Levels

| Level                      | Meaning                                                                | Product Meaning                                               |
| -------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| `Portal observed`          | We saw the provider package/account state in the provider portal       | Good for access planning, not enough for feature delivery     |
| `Credential verified`      | Credentials worked against a harmless endpoint                         | API plumbing is real, but product data may still be gated     |
| `Official source verified` | Official docs, catalogue, or download page exists                      | Source is plausible, but fields still need testing            |
| `File/API validated`       | A sample response/file was downloaded and fields were inspected        | Safe to build an MVP adapter or importer                      |
| `Access gated`             | Provider exists but needs approval, paid plan, or commercial agreement | Must be shown as `access_pending` in the product              |
| `Licence constrained`      | Data exists but reuse/display terms need careful review                | OK for local prototype; do not promise public-product use yet |
| `Not suitable`             | The source is unreliable, legally risky, or not maintainable           | Do not use as product backbone                                |

## What Was Actually Validated

| Source                                | Validation Result                                   | Fields / Evidence Confirmed                                                                                                                                                                                                                                                                                     | MVP Use                                                                                         |
| ------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Domain Developer Portal               | `Credential verified`, but core data `Access gated` | Project `PROPERTY-TRACKER-DEV` exists, OAuth client exists, client secret created, `GET /v1/me` worked in Domain Live API Browser. Core packages such as `Agents & Listings`, `Properties & Locations`, `Property Package`, `Rental AVM`, `Price Estimation`, and `Schools Data` still require access requests. | Use Domain only as a later integration path until packages are approved                         |
| Domain Listings Management Sandbox    | `Credential verified`                               | Sandbox package added. This validates authentication/plumbing, not buyer search data.                                                                                                                                                                                                                           | Useful for API adapter plumbing only                                                            |
| ABS Census DataPacks                  | `File/API validated`                                | Downloaded `2021_GCP_SA2_for_WA_short-header.zip`. It contains readmes, metadata, and 2021 Census CSV tables such as `2021Census_G01_WA_SA2.csv`. Confirmed fields include `SA2_CODE_2021`, total population, age bands, language, citizenship, education, and dwelling/person counts.                          | Real demographics card can be built for WA SA2 areas                                            |
| WA Police Crime Statistics            | `File/API validated`                                | Downloaded crime time series XLSX. Confirmed sheets include `Data`, `Regions`, `Offences`, and district sheets. Confirmed `Data` fields include `Website Region`, offence hierarchy fields, `Period`, `Year`, `MonthYear1`, `Count`, and production date.                                                       | Real crime trend card can be built, with geography and methodology caveats                      |
| WA Education / Data WA Schools Lists  | `File/API validated`                                | Data WA exposes `Western Australian Schools Lists` under Creative Commons Attribution 4.0. Downloaded XLSX and confirmed fields including school code, school name, street, suburb, state, postcode, latitude, and longitude.                                                                                   | Real school list/map markers can be built without Domain Schools Data                           |
| Transperth / PTA Spatial Data         | `File/API validated`                                | Downloaded GTFS zip. Confirmed files include `stops.txt`, `routes.txt`, `trips.txt`, `stop_times.txt`, `calendar.txt`, and `shapes.txt`. Confirmed stop fields include `stop_id`, `stop_code`, `stop_name`, `stop_lat`, `stop_lon`, `zone_id`, and `supported_modes`.                                           | Real transport context can be built for Perth areas                                             |
| Data WA / Landgate Localities         | `Official source verified`, `licence constrained`   | Data WA package `Localities (LGATE-234)` exists with GeoPackage, Shapefile, GeoJSON, WFS, ArcGIS Map Service, and WMS resources. Notes reference Landgate personal-use licensing.                                                                                                                               | Area boundary prototype is feasible; public-product licensing needs review                      |
| Data WA / DPLH Local Planning Schemes | `Official source verified`, `licence constrained`   | Planning layers such as scheme boundary, zones/reserves, R Codes, special areas, lines, and points were found with GeoJSON/Shapefile/GeoPackage resources. Licence is `Custom (Active Acceptance)`.                                                                                                             | Planning map proof of concept is feasible; public use and normalized interpretation need review |
| Landgate Cadastre                     | `Official source verified`, `licence constrained`   | Cadastre polygon/address/no-attributes datasets exist, but use `Custom (Other)` licensing and some services are subscription/token oriented.                                                                                                                                                                    | Do not make parcel-level cadastre/build constraints an MVP promise                              |
| PropTrack / REA                       | `Official source verified`, `Access gated`          | PropTrack has commercial B2B API products, but this is not self-serve in the same way as Domain's developer portal.                                                                                                                                                                                             | Later commercial evaluation only                                                                |
| Builder / developer websites          | `Source type accepted`, not field-validated yet     | No selected sample source pages have been extracted yet.                                                                                                                                                                                                                                                        | Manual URL/text/PDF import plus AI extraction is feasible after provenance model exists         |
| Google Search result pages            | `Not suitable`                                      | SERP scraping is not a durable or compliant data backbone.                                                                                                                                                                                                                                                      | Do not use                                                                                      |

## Feature Feasibility

| Product Feature                                      | Feasibility Now                              | Reason                                                                                                   |
| ---------------------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Area search and area workspace                       | Feasible with sample/static area identity    | We can start with five WA sample areas and map to SA2/locality later                                     |
| Demographics card                                    | Feasible with real data                      | ABS WA SA2 DataPack is downloaded and fields are confirmed                                               |
| Crime card                                           | Feasible with real data                      | WA Police XLSX is downloaded and fields are confirmed                                                    |
| Schools card                                         | Feasible with real data                      | WA schools XLSX is downloaded and lat/lng fields are confirmed                                           |
| Transport card                                       | Feasible with real data                      | Transperth GTFS is downloaded and stop/route fields are confirmed                                        |
| Market Signals sample dashboard                      | Feasible with sample/external-link data      | SQM/Domain/PropTrack/Cotality/ABS sources exist, but many metrics need access or licensing               |
| Basic map mode                                       | Feasible after core workspace                | Schools and transport markers are ready; localities/planning boundaries need licence review              |
| Planning/infrastructure timeline                     | Partially feasible                           | Data WA planning layers exist, but interpretation and council/event coverage are fragmented              |
| Manual opportunity tracker                           | Feasible now                                 | No provider dependency                                                                                   |
| AI extraction from user-provided source text/PDF/URL | Feasible after source/provenance model       | AI can extract facts from supplied sources, not invent missing facts                                     |
| AI area brief                                        | Feasible after cards have source-backed data | AI should explain already-loaded facts and limitations                                                   |
| Domain-backed listing search                         | Not feasible yet                             | `Agents & Listings` / `Property Package` access is not approved                                          |
| Domain-backed suburb performance                     | Not feasible yet                             | `Properties & Locations` / `Property Package` access is not approved                                     |
| Automated Market Signals real-data pipeline          | Not feasible yet                             | Listing snapshots, sold volume, commercial chart data, and derived-metric dependencies are not connected |
| Domain price estimate                                | Not feasible yet                             | `Price Estimation` package is gated                                                                      |
| Domain rental estimate / yield automation            | Not feasible yet                             | `Rental AVM` package is gated                                                                            |
| REA live listing search                              | Not feasible for MVP                         | PropTrack is commercial B2B, not an immediate self-serve source                                          |
| Automated builder reputation scoring                 | Not suitable for MVP                         | High risk, subjective, and data-poor                                                                     |
| Parcel-level land/build constraint checker           | Not suitable for MVP                         | Cadastre and detailed planning constraints require licence review and careful interpretation             |
| Fully automated national expansion                   | Not suitable for MVP                         | Data availability and definitions differ by state                                                        |

## Revised Product Logic

The product is still viable, but the first version should not be positioned as:

```txt
A live Domain/REA replacement with automated listing search, valuation, rent estimate, and parcel checks.
```

The first viable product should be positioned as:

```txt
An area-first property research workspace for WA buyers,
combining official open datasets, manual opportunity tracking,
and source-backed AI explanation/extraction.
```

This keeps the user flow coherent:

```txt
Search/select area
-> review real public-data cards
-> switch Live / Invest / Build lens
-> save opportunities manually or from source text
-> attach source URLs/PDFs/notes
-> AI extracts missing fields and explains tradeoffs
-> later connect Domain/PropTrack if access is approved
```

## What Must Change In The Roadmap

1. Stage 1 should use real-looking sample UI, but every unvalidated value must be labelled as sample, manual, or access pending.
2. Stage 2 should define provider interfaces and `DataAvailabilityStatus` before any provider-specific UI hard-coding.
3. ABS, WA Police, WA schools, and Transperth should move from "research" to "validated candidate importers".
4. Domain listing/search/price/rent features should move to conditional later stages.
5. The first map should show schools, transport, and area boundaries before parcel/cadastre or planning interpretation.
6. Investment analysis should start with user-entered assumptions and transparent formulas, not automatic valuation claims.
7. AI assistant boundaries should be explicit: explain, summarize, extract, compare, and suggest next checks; never claim source-free facts.

## Immediate Next Step

Stage 1 read-only sample workspace demo is complete. Build Stage 2 next:

```txt
Provider interfaces
-> source document contracts
-> market signal snapshot shape
-> mock providers
-> source availability UI
```

This keeps real data integration behind stable contracts instead of hard-coding
Domain, ABS, WA Police, schools, or transport assumptions directly into UI
components.

Stage 0.5 continues in parallel as data import proof-of-concepts for:

- ABS WA SA2 demographics
- WA Police crime time series
- WA schools list
- Transperth GTFS
- Data WA localities/planning layer metadata
