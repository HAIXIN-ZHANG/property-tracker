# Stage Execution Plan

Last updated: 2026-06-20

This document turns the roadmap into executable stages.

Principle:

```txt
Every stage must create or preserve a working loop.
If a live data source is blocked, the stage must still work with mock data, manual input, or an access-pending state.
```

## Current Checkpoint

Current demo-ready stage:

```txt
Stage 1: Static Area Workspace Demo
```

What is already true:

- Product direction is documented.
- Domain project exists.
- Domain OAuth credentials have been verified with `GET /v1/me`.
- Domain `Listings Management` sandbox is added.
- Domain buyer-facing data packages are still not approved.
- PropTrack/REA APIs exist as commercial B2B candidates, but are not MVP dependencies.
- ABS WA SA2, WA Police crime, WA schools, and Transperth GTFS sample files have been downloaded and field-checked.
- Data WA/Landgate locality and DPLH planning datasets exist, but their licences need review before public-product use.

Next implementation focus:

```txt
Define provider interfaces, source documents, market signal snapshots, and mock
provider data before connecting real APIs.
```

The Stage 0 cleanup removed dead Prisma/ingestion scripts, replaced Tailwind with
Panda CSS, added Jest/React Testing Library, added Playwright, and created a
minimal Next app shell. Stage 1 added the visible read-only area-first workspace
demo and is complete when `pnpm check` passes. It does not yet save real user
research records.

## Stage Summary

| Stage | User-visible outcome                       | Can it work now?                | Main dependency                                               | Decision                         |
| ----- | ------------------------------------------ | ------------------------------- | ------------------------------------------------------------- | -------------------------------- |
| 0     | Clean, runnable app foundation             | Yes                             | Repo/tooling cleanup                                          | Done                             |
| 0.5   | Data availability and area mapping plan    | Mostly                          | Area identity mapping, licence review, Domain access requests | Continue in parallel             |
| 1     | Static read-only area workspace demo       | Yes                             | Sample data                                                   | Done                             |
| 2     | Provider interfaces and data source status | Yes                             | Type contracts and mocks                                      | Do next                          |
| 3     | Manual opportunity tracker                 | Yes                             | Local persistence                                             | Build before complex automation  |
| 4     | AI extraction and briefs                   | Yes, with user-provided sources | AI model + provenance model                                   | Build after source records exist |
| 5     | Domain API integration                     | Conditionally                   | Approved Domain packages                                      | Do not block MVP                 |
| 6     | Map, planning, infrastructure context      | Mostly                          | Open spatial data and manual events                           | Add after workspace is useful    |
| 7     | Investment/build analysis                  | Yes with assumptions            | Opportunity data and calculators                              | Add after tracker exists         |
| 8     | Cloud ingestion and monitoring             | Later                           | Database, queues, provider access                             | Productization stage             |
| 9     | National expansion                         | Later                           | State-by-state data mapping                                   | Only after WA works              |

## Stage 0: Product And Repo Foundation

### Goal

Make the repository professional, runnable, and ready for iterative UI work.

### Features / Tasks

- Initialize git repository.
- Clean `package.json` so scripts point to existing files.
- Remove or defer Prisma/ingestion scripts until schema/source files exist.
- Replace Tailwind with Panda CSS.
- Choose UI primitive approach.
- Add Prettier.
- Add ESLint.
- Add Jest.
- Add React Testing Library.
- Add Playwright.
- Add `pnpm check`.
- Add a minimal Next app shell.

### User Flow

This stage is mostly developer-facing:

```txt
Install dependencies
-> Run dev server
-> Open blank app shell
-> Run pnpm check
-> See passing type/lint/test baseline
```

### Flow Check

This stage can work.

No external data is required.

### Main Risks

- Keeping dead scripts makes the repo look broken.
- Keeping Tailwind while planning Panda CSS creates styling confusion.
- Adding too much database/ingestion structure before UI exists slows the MVP.

### Done When

- `pnpm install` works.
- `pnpm dev` starts.
- `pnpm check` passes.
- The first route renders.
- Styling system is Panda CSS, not Tailwind.

## Stage 0.5: Data Validation And Area Identity

### Goal

Make sure product features match data that can actually be obtained.

### Features / Tasks

- Complete Domain Business Profile.
- Request Domain `Address Suggestions`.
- Request Domain `Agents & Listings`.
- Request Domain `Properties & Locations`.
- Request Domain `Property Package`.
- Request Domain `Rental AVM API`.
- Request Domain `Schools Data`.
- Keep PropTrack as a later-stage commercial candidate.
- Download/inspect one ABS sample.
- Download/inspect WA Police crime data fields.
- Download/inspect WA Education / Data WA schools data fields.
- Identify open Data WA/SLIP planning or boundary layers.
- Download/inspect Transperth GTFS.
- Define static `AreaIdentity` records for first five WA areas.
- Mark dashboard cards as `real`, `mock`, `manual`, `access_pending`, or `unavailable`.

### User Flow

No full app flow yet. The product logic flow is:

```txt
Choose first WA sample areas
-> Map each area to provider identifiers where possible
-> Confirm which dashboard cards can use real/open data
-> Mark blocked/commercial data honestly
```

### Flow Check

This can work without Domain production access because it can use:

- Static `AreaIdentity` records.
- ABS public data.
- WA Police public data.
- Data WA catalogues.
- Transperth GTFS.
- Mock data where live sources are pending.

### Main Risks

- Assuming suburb equals postcode.
- Assuming ABS SA2 equals suburb.
- Treating Domain OAuth success as Domain data access.
- Treating PropTrack as self-serve before commercial access is confirmed.

### Done When

- Each MVP dashboard card has a source status.
- First five WA areas have static `AreaIdentity` records.
- Domain and PropTrack are represented as access-gated sources.

## Stage 1: Static Area Workspace Demo

Status: demo-ready.

### Goal

Build the first visible read-only product experience using sample data.

### Features / Tasks

- App shell.
- Area search page.
- Area workspace page.
- Static sample areas: Alkimos, Baldivis, Byford, Ellenbrook, Subiaco.
- Strategy lens switcher: `Live`, `Invest`, `Build`.
- Area summary card.
- Market card.
- Market Signals sample page: supply, demand, price, rental, pressure, and future supply.
- Demographics card.
- Crime card.
- Schools card.
- Transport and amenities card.
- Planning/infrastructure card.
- Read-only opportunity list with sample house, land, and house-and-land package.
- Data availability labels and honest empty provenance states.
- Basic bilingual UI label structure.

### User Flow

```txt
Open app
-> Search/select an area
-> Land on area workspace
-> Review area context cards
-> Open Market Signals for availability states and source paths
-> Switch Live/Invest/Build lens
-> See read-only opportunity list filtered/reframed by lens
-> Open sample opportunity detail
```

### Flow Check

This can work now with sample data. It is not a real saved opportunity tracker yet.

No live API is needed.

### Main Risks

- Building a dashboard that looks real while showing mock data.
- Showing derived metrics such as vendor discount or net supply without formulas and missing dependencies.
- Making the map the core screen too early.
- Adding AI chat before the product has source-backed facts.

### Done When

- A user can understand the product direction in under one minute.
- Every mock value is visually labelled as sample/demo/access pending/mapping pending.
- No sample opportunity shows fabricated provenance.
- Desktop and mobile layouts are usable.

## Stage 2: Data Source Interfaces

### Goal

Separate UI from data providers so real APIs can be added later without rewriting the app.

### Features / Tasks

- Define provider interface shape.
- Define `DataAvailabilityStatus`.
- Define `MarketSignalDefinition`.
- Define `MarketSignalSnapshot`.
- Define source provenance model.
- Add mock area provider.
- Add mock opportunity provider.
- Add Domain adapter stub.
- Add ABS adapter stub.
- Add WA crime adapter stub.
- Add data source status page.
- Add provider status badges in UI.

### User Flow

```txt
Open area workspace
-> UI requests data from provider interface
-> Mock provider returns sample data
-> Data status badges show mock/access_pending/validated
-> Market Signals shows sample/external_link/access_pending/derived_later states
-> Data source page shows provider health and next action
```

### Flow Check

This can work now.

The provider interfaces can use mock data while real providers are pending.

### Main Risks

- Overengineering provider abstraction too early.
- Hiding missing data behind generic fallback text.
- Mixing raw source snapshots and normalized fields too loosely.

### Done When

- The UI does not care whether data comes from mock, Domain, ABS, or manual input.
- Provider status is visible and honest.
- Domain API access can be added behind the adapter later.

## Stage 3: Opportunity Tracker

### Goal

Make the app useful for real personal research even before automation.

### Features / Tasks

- Save opportunity.
- Opportunity detail page.
- Manual opportunity creation.
- Source URL capture.
- Pasted text capture.
- PDF/file placeholder.
- Notes.
- Status workflow: `watching`, `inspecting`, `quoted`, `rejected`, `shortlisted`.
- Compare selected opportunities.

### User Flow

```txt
Open area workspace
-> Add opportunity manually or from source URL
-> Save notes and status
-> Open opportunity detail
-> Add quote/source/pasted text
-> Compare two or more opportunities
```

### Flow Check

This can work without external APIs.

It may need local persistence. Start with local/mock storage if the database is not ready; move to Prisma/database after the model settles.

### Main Risks

- Starting with a heavy database schema before the workflow is clear.
- Treating imported source URL data as verified without extraction/provenance.
- Building too many opportunity types before one flow works.

### Done When

- A user can track real research items across sessions.
- Each opportunity has status, notes, and source references.
- Manual input is useful even without API access.

## Stage 4: AI Extraction And Briefs

### Goal

Use AI to extract and explain existing data, not invent facts.

### Features / Tasks

- Choose default AI model.
- Define extraction schema for land listings.
- Define extraction schema for house-and-land packages.
- Define extraction schema for builder quotes.
- Store source snapshots where allowed.
- Store extraction runs.
- Show field confidence.
- Show missing fields.
- Generate AI area brief.
- Generate AI opportunity brief.
- Generate next-check suggestions.

### User Flow

```txt
Paste source text or upload/source a document
-> AI extracts structured fields
-> User sees extracted fields, confidence, missing data, and source
-> User accepts or edits fields
-> AI generates a brief based only on stored facts
```

### Flow Check

This can work with user-provided text and files before web fetching exists.

### Main Risks

- AI claims unsupported facts.
- No clear difference between extracted facts and AI analysis.
- No human review step before saving extracted fields.

### Done When

- AI output always links to source/provenance.
- Missing fields are explicit.
- User can correct extracted fields.
- Briefs are useful but clearly bounded.

## Stage 5: Domain API Integration

### Goal

Use official Domain API data where package access is granted.

### Features / Tasks

- Store Domain credentials in environment variables.
- Implement OAuth token client.
- Add token caching.
- Add Domain adapter methods for approved endpoints.
- Add listing search if `Agents & Listings` is approved.
- Add property/location data if `Properties & Locations` is approved.
- Add address suggestion if approved.
- Add rental estimate, schools, price estimate if approved.
- Show access errors clearly in data source status UI.

### User Flow

```txt
Configure Domain env vars
-> App checks provider status
-> User searches area
-> Domain-backed cards load where approved
-> Unapproved cards show access_pending
-> User can still use mock/manual workflows
```

### Flow Check

This is only partially available now.

OAuth works, but core buyer/search/area packages are not approved yet.

### Main Risks

- Blocking the MVP on Domain access.
- Assuming sandbox listing management equals buyer listing search.
- Letting API failures break the whole area workspace.

### Done When

- Domain-backed data appears only for approved packages.
- Access-pending features degrade cleanly.
- Mock/manual fallback still works.

## Stage 6: WA Planning, Map, And Infrastructure

### Goal

Add spatial context without making the whole app a map product.

### Features / Tasks

- Map mode/tab using MapLibre.
- Area boundary layer.
- Opportunity markers.
- Schools and transport markers.
- Planning/infrastructure event list.
- Data WA/SLIP proof of concept.
- Transperth GTFS import.
- Basic distance/context calculations.

### User Flow

```txt
Open area workspace
-> Switch to Map mode
-> See area boundary and tracked opportunities
-> Toggle schools, transport, amenities, planning
-> Open event/opportunity detail from map
```

### Flow Check

This can work after Stage 1/2 with mock geometry and open data samples.

### Main Risks

- Building GIS complexity too early.
- Showing precise boundaries when mapping is unverified.
- Overloading the first screen with map interactions.

### Done When

- Map adds useful spatial understanding.
- Non-map workspace remains fully usable.
- Every layer has source/status attribution.

## Stage 7: Investment And Build Analysis

### Goal

Turn stored data into structured decision support.

### Features / Tasks

- Owner-occupier scorecard.
- Investment scorecard.
- Land-and-build checklist.
- Package comparison.
- Quote comparison.
- Gross yield calculator.
- Simple cash-flow calculator.
- Assumption editor.
- Risk flags.

### User Flow

```txt
Open opportunity
-> Choose Live/Invest/Build analysis
-> Review assumptions
-> Edit missing numbers
-> Compare options
-> Generate source-backed summary
```

### Flow Check

This can work with manual inputs and stored opportunities.

It becomes stronger when Domain/PropTrack/commercial data is available, but it should not require them.

### Main Risks

- Pretending the app can predict returns.
- Hiding assumptions.
- Using incomplete rent/price data without warnings.

### Done When

- Every score/calculation shows assumptions.
- Missing data is visible.
- User can compare opportunities without trusting a black-box score.

## Stage 8: Cloud Ingestion And Monitoring

### Goal

Move from local prototype to a product-like system that refreshes data and tracks changes.

### Features / Tasks

- Database schema.
- Source fetch queue.
- Scheduled refresh jobs.
- Provider rate-limit handling.
- Error monitoring.
- Data freshness indicators.
- Watchlist change events.
- Notification design.

### User Flow

```txt
User watches area/opportunity
-> System refreshes approved/manual sources
-> System detects meaningful changes
-> User sees change timeline and notifications
```

### Flow Check

This should wait until Stage 2/3 data models are stable.

### Main Risks

- Building infrastructure before product behavior is proven.
- Storing source data without respecting terms/licensing.
- No clear change threshold, causing noisy alerts.

### Done When

- Watched items update without manual refresh.
- Failures are visible and recoverable.
- Data freshness is shown in the UI.

## Stage 9: National Expansion

### Goal

Expand beyond Perth/WA while preserving honest data availability.

### Features / Tasks

- State-by-state provider matrix.
- NSW adapters.
- VIC adapters.
- QLD adapters.
- National `AreaIdentity` mapping rules.
- State-specific crime data disclaimers.
- State-specific planning data disclaimers.
- Provider capability matrix in UI.

### User Flow

```txt
User searches an area in another state
-> App resolves state/provider availability
-> Supported cards show data
-> Unsupported cards show access/state limitation
-> User can still track opportunities manually
```

### Flow Check

This should not start until WA works.

### Main Risks

- Pretending all states have equivalent crime/planning/open data.
- Hardcoding WA assumptions into national models.
- Expanding before the core loop is useful.

### Done When

- The app can show different capability levels per state.
- WA patterns generalize cleanly.
- Unsupported data is clearly labelled.

## Recommended Next Move

Build Stage 2 provider interfaces and source document contracts.

Continue Stage 0.5 data access and source validation in parallel, but do not let
it block the visible MVP.
