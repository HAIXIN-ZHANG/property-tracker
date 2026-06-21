# TODO

Last updated: 2026-06-21

## Current Focus

Stage 2 provider contracts, adapter stubs, and source document wiring are in
place. Next focus is Stage 2.5: connect one real open-data proof before the
saved opportunity tracker.

## Stage 0: Foundation

- [x] Initialize git repository for `property-tracker`.
- [x] Align `package.json` scripts with files that actually exist.
- [x] Remove or defer Prisma/ingestion scripts until schema and source files exist.
- [x] Create product brief.
- [x] Create data source audit.
- [x] Create data validation matrix.
- [x] Create data feasibility review.
- [x] Create area identity design.
- [x] Create Domain API setup guide.
- [x] Create staged roadmap.
- [x] Create detailed stage execution plan.
- [x] Create tech stack document.
- [x] Create design direction document.
- [x] Create agent guide.
- [x] Create initial TODO.
- [x] Rename remaining `landalpha` scaffold references to `property-tracker` and set the product brand to AreaScope.
- [x] Replace Tailwind scaffold with Panda CSS.
- [x] Decide UI primitive approach: Ark UI.
- [x] Add Prettier config.
- [x] Add ESLint config.
- [x] Add Jest config.
- [x] Add React Testing Library.
- [x] Add Playwright config.
- [x] Add basic `pnpm check` script.
- [x] Add initial app shell.

## Stage 0.5: Data Validation And Area Identity

- [x] Register/login at Domain Developer Portal.
- [x] Create Domain project `property-tracker-dev`.
- [ ] Complete Domain Business Profile.
- [x] Create OAuth client using `Client Credentials`.
- [x] Create Domain client secret.
- [x] Add `Listings Management` sandbox only if useful for credential smoke testing.
- [ ] Request access to Domain `Address Suggestions`.
- [ ] Request access to Domain `Agents & Listings`.
- [ ] Request access to Domain `Properties & Locations`.
- [ ] Request access to Domain `Property Package`.
- [ ] Request access to Domain `Rental AVM API`.
- [ ] Request access to Domain `Schools Data`.
- [x] Use Domain Live API Browser to verify `GET /v1/me`.
- [ ] Smoke test Domain listing search for one Perth suburb.
- [ ] Smoke test Domain suburb performance for one Perth suburb.
- [ ] Smoke test Domain demographics for one Perth suburb.
- [ ] Smoke test Domain address/location resolution.
- [x] Download one ABS sample table for a WA area.
- [x] Download/inspect WA Police crime data fields.
- [x] Download/inspect WA Education / Data WA school list fields.
- [x] Identify open Data WA/SLIP boundary or planning layers.
- [x] Download Transperth GTFS and inspect stop fields.
- [x] Define static `AreaIdentity` records for Alkimos, Baldivis, Byford, Ellenbrook, and Subiaco.
- [x] Mark each dashboard card with an honest `DataAvailabilityStatus`.
- [x] Keep PropTrack as a later-stage commercial candidate, not an MVP blocker.

## Stage 1: Static Area Workspace MVP

- [x] Create `src/app` structure.
- [x] Add static external market brief link slate.
- [x] Define Market Signals metric dictionary and feasibility rules.
- [x] Add sample area data for Perth/WA suburbs.
- [x] Build first area selection screen with sample area links.
- [x] Add static sample area search/autocomplete.
- [x] Build area workspace page.
- [x] Build Market Signals preview with data-availability labels.
- [x] Add strategy lens switcher: `Live`, `Invest`, `Build`.
- [x] Add area metric cards.
- [x] Add opportunity list.
- [x] Add sample opportunity detail page.
- [x] Add source/provenance display component.
- [x] Replace fake provenance placeholders with an honest empty state.
- [x] Split source-ready data from mapping-pending area metric readiness.
- [x] Split Market Signals availability states: sample, link-only, public candidate, derived later, access pending.
- [x] Add bilingual UI label structure.
- [x] Verify desktop and mobile layout.

## Stage 2: Data Source Interfaces

- [x] Define provider interface shape.
- [x] Define `DataAvailabilityStatus`.
- [x] Define Market Signal snapshot shape.
- [x] Add source document model.
- [x] Add mock provider data.
- [x] Add data source status UI.
- [x] Add Domain API adapter stub.
- [x] Add ABS adapter stub.
- [x] Add WA crime adapter stub.
- [x] Add extraction run model.
- [x] Remove the parallel `SourceStatus` runtime model.
- [x] Pass provider status, source, and warnings into the workspace and opportunity detail pages.
- [x] Show inspectable evidence metadata on the data source status page.

## Stage 2.5: Real Open Data Proof

- [x] Create Stage 2.5 plan document.
- [x] Choose first real source: WA Education / Data WA schools.
- [ ] Define `SchoolRecord` and `AreaSchoolContext`.
- [ ] Add small typed WA schools sample fixture.
- [ ] Add WA schools provider/importer boundary.
- [ ] Map one area first: Ellenbrook.
- [ ] Add schools panel to area workspace.
- [ ] Show source document and caveat in the UI.
- [ ] Keep source document status `file_validated` and area interpretation `mapping_pending`.
- [ ] Add tests for provider status, source metadata, and no catchment claim.
- [ ] Run `pnpm check`.
- [ ] Browser-smoke `/areas/ellenbrook`.

## Stage 3: Opportunity Tracker

- [ ] Add save opportunity flow.
- [ ] Add status model: watching, inspecting, quoted, rejected, shortlisted.
- [ ] Add manual note capture.
- [ ] Add source URL capture.
- [ ] Add pasted text import.
- [ ] Add PDF upload placeholder.
- [ ] Add opportunity comparison view.

## Stage 4: AI Extraction And Briefs

- [ ] Choose default model for extraction and briefing.
- [ ] Define extraction schema for house-and-land packages.
- [ ] Define extraction schema for land listings.
- [ ] Define extraction schema for builder quotes.
- [ ] Add AI extraction service.
- [ ] Add field confidence display.
- [ ] Add missing fields display.
- [ ] Add AI area brief.
- [ ] Add AI opportunity brief.

## Stage 5: CI/CD And Deployment

- [x] Add GitHub Actions CI for `pnpm check`.
- [ ] Add required branch protection once the repo is public or shared.
- [ ] Choose hosting target for the first web deployment.
- [ ] Add deployment environment strategy: local, preview, production.
- [ ] Add preview deployment for pull requests.
- [ ] Add production deployment from `main`.
- [ ] Document required environment variables for deployment.
- [ ] Add deployment smoke check after production release.
- [ ] Add basic uptime or availability monitoring after public launch.
- [ ] Add release checklist for tagged MVP milestones.

## Later Backlog

- [ ] Real Domain OAuth integration.
- [ ] Domain listing search.
- [ ] Domain listing snapshot job for active/new/old listing trends.
- [ ] Domain suburb performance.
- [ ] Domain property detail.
- [ ] Domain price estimate.
- [ ] Domain rental estimate.
- [ ] ABS Census import.
- [ ] WA Police crime import.
- [ ] Transperth GTFS import.
- [ ] MapLibre map mode.
- [ ] Data WA/SLIP planning layer proof of concept.
- [ ] Council planning event tracker.
- [ ] Cloud ingestion queue.
- [ ] Watchlist change events.
- [ ] Market Signals real-data pipeline.
- [ ] National state-by-state expansion.

## Product Decisions

- The product is area-first, not listing-first.
- Start Perth/WA-first.
- Keep the product large, but implement one stage at a time.
- Do not build builder reputation scoring in MVP.
- Do not scrape Google search results pages.
- Do not scrape Domain or realestate.com.au public listing pages as a product backbone.
- Use AI for extraction and explanation, not as the source of truth.
- Keep Market Brief V1 as an external link slate; do not scrape or summarize reports until source ingestion is real.
- Keep Market Signals V1 as sample/external-link/access-pending charts until real provider access or permitted chart data exists.
- Treat vendor discount, net supply rate, and months of stock as derived metrics that require explicit formulas and source dependencies.
- Store source provenance for every important extracted claim.
- Keep maps as a mode/tab until the core workspace works.
