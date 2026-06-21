# AreaScope

[![CI](https://github.com/HAIXIN-ZHANG/property-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/HAIXIN-ZHANG/property-tracker/actions/workflows/ci.yml)

Area-first property research and opportunity tracking for Australian buyers.

AreaScope is a decision workspace for researching suburbs, tracking property
opportunities, comparing land / house-and-land options, and using AI to explain
source-backed data. The first product target is Perth/WA.

The repo and package name remain `property-tracker`.

It is not a Domain or realestate.com.au clone. The product should help buyers
understand an area before chasing a listing.

## Project Status

| Area                 | Status      | Notes                                                         |
| -------------------- | ----------- | ------------------------------------------------------------- |
| App foundation       | Complete    | Next.js, TypeScript, Panda CSS, Jest, Playwright, CI-ready    |
| Data feasibility     | In progress | WA open data field-checked; Domain/PropTrack access is gated  |
| Static MVP           | Demo ready  | Stage 1 read-only sample workspace is implemented             |
| Data contracts       | Complete    | Stage 2 provider contracts, mock provider, and stubs exist    |
| Live provider data   | Later       | Domain/PropTrack integrations stay behind provider adapters   |
| AI extraction/briefs | Later       | AI explains stored/source-backed facts; it is not a fact feed |

## Target Product Loop

```txt
Search area
-> Review area brief
-> Track opportunities
-> Apply Live / Invest / Build lens
-> Generate source-backed AI brief
-> Monitor changes over time
```

The MVP should work without paid listing API access.

## Current Capabilities

- Static app shell with a calm, iOS/macOS-inspired research workspace direction.
- Sample area search for the first five Perth/WA suburbs.
- Area workspace pages with Live / Invest / Build strategy lenses.
- Read-only sample opportunity list and opportunity detail pages.
- Bilingual UI label structure for English and Chinese.
- Canonical `DataAvailabilityStatus` model for `sample_data`, `file_validated`,
  `mapping_pending`, `source_accepted`, `access_pending`, `license_constrained`,
  and related readiness states.
- Market Signals availability model for `sample_now`, `external_link_now`,
  `public_source`, `derived_later`, and `access_pending` signals.
- Data contracts for provider results, source documents, area identity mappings,
  market signal snapshots, extraction runs, and provider adapters.
- Mock area provider plus fail-closed Domain, ABS, and WA Police adapter stubs.
- Data source readiness page at `/data-sources`.
- External Market Brief slate linking to original market, policy, planning, and
  data sources.
- Market Signals metric dictionary for supply, demand, price, rental, pressure,
  and future supply signals.
- Product, roadmap, data feasibility, and implementation planning documents.

Validated public-data candidates already confirmed:

- ABS WA SA2 Census DataPack
- WA Police crime time series XLSX
- WA Education / Data WA school list XLSX
- Transperth GTFS
- Data WA / SLIP locality and planning layer metadata

Domain and PropTrack stay as later official/commercial integrations until access
is approved.

## Tech Stack

- Next.js App Router
- TypeScript
- Panda CSS
- Ark UI for accessible headless primitives
- Jest + React Testing Library
- Playwright
- ESLint + Prettier
- pnpm

See [Tech Stack](docs/TECH_STACK.md) for the full rationale.

## Getting Started

Requirements:

- Node.js 22
- pnpm 9.15.0

Install dependencies:

```bash
pnpm install
```

Generate Panda CSS helpers:

```bash
pnpm codegen
```

Run the app:

```bash
pnpm dev
```

Run the main verification gate:

```bash
pnpm check
```

Run browser tests when e2e coverage exists:

```bash
pnpm e2e
```

## Scripts

| Command             | Purpose                                                  |
| ------------------- | -------------------------------------------------------- |
| `pnpm dev`          | Generate Panda helpers and start the Next.js dev server  |
| `pnpm build`        | Generate Panda helpers and build the production app      |
| `pnpm check`        | Run format check, lint, typecheck, Jest tests, and build |
| `pnpm test`         | Run Jest unit/component tests                            |
| `pnpm e2e`          | Run Playwright tests when e2e workflows exist            |
| `pnpm format`       | Format the repository with Prettier                      |
| `pnpm format:check` | Verify formatting without writing changes                |

## Project Structure

```txt
src/app/                 Next App Router routes
src/components/          Reusable UI components
src/lib/                 Data contracts, sample data, helpers, colocated tests
docs/                    Product, data, roadmap, and implementation planning
styled-system/           Generated Panda CSS helpers
```

`styled-system` is generated by Panda CSS. Do not edit it by hand.

## Planning Docs

- [Product Brief](docs/PRODUCT_BRIEF.md)
- [Data Source Audit](docs/DATA_SOURCE_AUDIT.md)
- [Data Validation Matrix](docs/DATA_VALIDATION_MATRIX.md)
- [Data Feasibility Review](docs/DATA_FEASIBILITY_REVIEW.md)
- [Market Signals](docs/MARKET_SIGNALS.md)
- [Area Identity](docs/AREA_IDENTITY.md)
- [Stage 2.5 Open Data Proof](docs/STAGE_2_5_OPEN_DATA_PROOF.md)
- [Domain API Setup](docs/DOMAIN_API_SETUP.md)
- [Tech Stack](docs/TECH_STACK.md)
- [Design Direction](docs/DESIGN_DIRECTION.md)
- [Staged Roadmap](docs/STAGED_ROADMAP.md)
- [Stage Execution Plan](docs/STAGE_EXECUTION_PLAN.md)
- [TODO](docs/TODO.md)

## Data Principles

- Show whether data is `sample_data`, `file_validated`, `mapping_pending`,
  `source_accepted`, `access_pending`, `license_constrained`, `derived_later`, or
  `rejected`.
- Show Market Signals as `sample_now`, `external_link_now`, `public_source`,
  `derived_later`, or `access_pending`.
- Store source provenance for important claims.
- Use AI for extraction and explanation, not as the source of truth.
- Keep provider integrations behind adapter interfaces.
- Do not scrape Google search results, Domain public listing pages, or
  realestate.com.au public listing pages as a product backbone.

## Current Stage

Completed:

```txt
Stage 1: Static area workspace demo
Stage 2: Data source interfaces
```

Next implementation focus:

```txt
Stage 2.5: Real open-data proof
```

Parallel validation track:

```txt
Stage 0.5: Data validation and area identity
```

Stage 1 is demo-ready, and Stage 2 now separates UI from data providers through
contracts, a mock area provider, fail-closed adapter stubs, canonical runtime
readiness status, provider warnings, source document metadata, and a
data-readiness page. Stage 2.5 connects one real open-data source before saved
opportunity tracking starts in Stage 3.
