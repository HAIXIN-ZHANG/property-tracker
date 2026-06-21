# Staged Roadmap

Last updated: 2026-06-20

The product can be large. The implementation should not be.

Each stage should create a working loop before the next stage adds data depth or automation.

For detailed stage-by-stage features, user flows, dependencies, and flow checks, see [Stage Execution Plan](STAGE_EXECUTION_PLAN.md).

## Stage 0: Product And Repo Foundation

Goal:

Turn the idea into a maintainable product repository.

Deliverables:

- Product brief
- Data source audit
- Staged roadmap
- TODO list
- Project naming changed from `landalpha` to `property-tracker`
- Tech stack finalized
- Tailwind removed and Panda CSS added
- Basic lint, format, typecheck, test scripts

Done when:

- A new contributor can read the docs and understand the product.
- The repo can install, typecheck, and run a blank app.

## Stage 0.5: Data Validation And Area Identity

Goal:

Make sure the product is shaped around data we can actually obtain and map.

Deliverables:

- Data validation matrix
- Data feasibility review
- Domain API setup guide
- Area identity design
- First five WA sample areas selected
- Domain registration and project creation checklist
- Data availability status model
- Dashboard card dependency map
- First smoke-test plan for Domain, ABS, WA Police, Data WA, and Transperth
- Validated candidate importers for ABS WA SA2, WA Police crime, WA schools, and Transperth GTFS

Done when:

- Every MVP dashboard card has a preferred source, fallback source, and current validation status.
- The first sample areas have a clear mapping plan across Domain, ABS, WA Police, Data WA, Transperth, and OSM.
- Domain API access is either validated or explicitly marked as access pending.

## Stage 1: Static Area Workspace Demo

Goal:

Build the first visible read-only workspace with sample data.

Deliverables:

- Area search screen
- Area dashboard route
- Strategy lens switcher: `Live`, `Invest`, `Build`
- Static Perth/WA sample areas
- Market, demographics, crime, school, transport, planning cards
- Market Signals sample page with honest availability labels
- Read-only opportunity list with sample house, land, and package items
- Empty provenance state when no real source is attached
- Basic bilingual UI label system

Done when:

- A user can search/select an area and understand the intended product flow without live APIs.
- The UI does not imply saved tracking, suburb-level validation, or sourced opportunity facts.

## Stage 2: Data Source Interfaces

Goal:

Create clean boundaries for real data providers.

Deliverables:

- Domain API client interface
- Market Signal provider/snapshot interfaces
- ABS data adapter
- WA crime adapter
- Source provenance model
- Mock providers for local development
- Ingestion status UI
- Data source status page

Done when:

- The app can switch between mock data and real provider credentials without rewriting UI logic.

## Stage 3: Opportunity Tracker

Goal:

Make the product useful even before full automation.

Deliverables:

- Save opportunity
- Opportunity detail page
- Source URL import
- Manual note input
- PDF/text placeholder import
- Opportunity status: watching, inspecting, quoted, rejected, shortlisted
- Compare selected opportunities

Done when:

- A user can track real personal research items over multiple sessions.

## Stage 4: AI Extraction And Briefs

Goal:

Use AI to extract and explain data with provenance.

Deliverables:

- Source snapshot record
- AI extraction pipeline
- Extract package fields from pasted text or source HTML
- Extract quote fields from PDF/text
- Field confidence and missing-fields display
- AI area brief
- AI opportunity brief
- AI next-check suggestions

Done when:

- AI outputs always show sources, confidence, and missing fields.

## Stage 5: Domain API Integration

Goal:

Use official Domain API data where access is available.

Deliverables:

- OAuth/client credentials support
- Listing search
- Listing detail
- Listing snapshot job for active/new/old listing trends
- Property detail
- Suburb performance
- Demographics
- Schools
- Price estimate
- Rental estimate
- Data refresh job

Done when:

- An area can show real Domain-backed listings and market metrics when credentials are configured.

## Stage 6: WA Planning, Map, And Infrastructure

Goal:

Add spatial and planning context.

Deliverables:

- Map mode using MapLibre
- Area boundaries
- Listing markers
- Schools and transport markers
- Planning/infrastructure event layer
- Data WA/SLIP proof of concept
- Transperth GTFS import

Done when:

- A user can see where opportunities sit relative to transit, schools, amenities, and planning events.

## Stage 7: Investment And Build Analysis

Goal:

Turn raw data into structured decision support.

Deliverables:

- Owner-occupier scorecard
- Investment scorecard
- Market Signals interpretation layer
- Land-and-build checklist
- Package comparison
- Quote comparison
- Gross yield and simple cash-flow calculator
- Risk flags

Done when:

- A user can compare opportunities with explicit assumptions and source-backed fields.

## Stage 8: Cloud Ingestion And Monitoring

Goal:

Move from local prototype to a product-like system.

Deliverables:

- Scheduled provider refresh
- Source fetch queue
- Error monitoring
- Provider rate-limit handling
- Data freshness indicators
- Watchlist change events
- Notification design

Done when:

- Watched areas and opportunities can update without manual refresh.

## Stage 9: National Expansion

Goal:

Generalize beyond Perth/WA.

Deliverables:

- NSW data adapters
- VIC data adapters
- QLD data adapters
- National area mapping rules
- State-specific crime and planning disclaimers
- Provider capability matrix in UI

Done when:

- The product can honestly show which data is available in each state and avoid pretending all states are equal.
