# TODO

Last updated: 2026-06-20

## Current Focus

Build a working, visible Perth/WA-first MVP without depending on live paid API access.

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
- [x] Rename remaining `landalpha` scaffold references to `property-tracker`.
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
- [ ] Define static `AreaIdentity` records for Alkimos, Baldivis, Byford, Ellenbrook, and Subiaco.
- [x] Mark each dashboard card as `real`, `mock`, `manual`, `access_pending`, or `unavailable`.
- [x] Keep PropTrack as a later-stage commercial candidate, not an MVP blocker.

## Stage 1: Static Area Workspace MVP

- [x] Create `src/app` structure.
- [x] Add static external market brief link slate.
- [x] Define Market Signals metric dictionary and feasibility rules.
- [ ] Add sample area data for Perth/WA suburbs.
- [ ] Build area search screen.
- [ ] Build area workspace page.
- [ ] Build Market Signals sample page with source-status labels.
- [ ] Add strategy lens switcher: `Live`, `Invest`, `Build`.
- [ ] Add area metric cards.
- [ ] Add opportunity list.
- [ ] Add sample opportunity detail page.
- [ ] Add source/provenance display component.
- [ ] Add bilingual UI label structure.
- [ ] Verify desktop and mobile layout.

## Stage 2: Data Source Interfaces

- [ ] Define provider interface shape.
- [ ] Define Market Signal snapshot shape.
- [ ] Add Domain API adapter stub.
- [ ] Add ABS adapter stub.
- [ ] Add WA crime adapter stub.
- [ ] Add source document model.
- [ ] Add extraction run model.
- [ ] Add mock provider data.
- [ ] Add data source status UI.

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
