# Product Brief

Last updated: 2026-06-20

## Product Thesis

AreaScope is an area-first property research workspace for Australian buyers.

The product helps a buyer start from a suburb or area, understand the local context, track property opportunities, and make better decisions across owner-occupier, investor, and land-and-build strategies.

It is not a listing portal. It should not try to replace Domain or realestate.com.au. Its job is to connect area data, property opportunities, manual research, and AI explanations into one durable workspace.

## Target User

Primary user:

- An upgrade or replacement buyer.
- May buy an established home, vacant land, or a house-and-land package.
- Cares about schools, shopping, transport, crime, infrastructure, planning, population, and long-term value.
- May also evaluate investment properties.
- Wants to track multiple areas and opportunities over time.

Initial assumption:

- Build Perth/WA-first before expanding nationally.
- Support English and Chinese UI labels later, but keep repo-facing docs in English.

## Core Product Loop

```txt
Search area
-> Enter area workspace
-> Review local context
-> Track opportunities
-> Switch strategy lens
-> Generate AI brief
-> Follow changes over time
```

## Strategy Lenses

The same area and opportunity data can be viewed through different strategy lenses.

### Live

For owner-occupier or upgrade decisions.

Priorities:

- School access
- Commute and transport
- Shopping and daily convenience
- Safety and crime trend
- Infrastructure and planning upside
- Lifestyle fit
- Long-term resale quality

### Invest

For rental and capital growth decisions.

Priorities:

- Median price and rent
- Gross yield
- Population growth
- Demand and supply signals
- Crime trend
- Transport and employment access
- Comparable listings and rental estimate
- Policy and planning risks

### Build

For vacant land, house-and-land packages, and build planning.

Priorities:

- Land availability
- Estate and release stage
- Lot size, frontage, depth
- Title status
- Builder package price
- Inclusions and exclusions
- Quote comparison
- Planning constraints
- Local infrastructure timing

Builder reputation is not a core MVP feature. It can be replaced by manual notes, quote records, and source-linked research.

## Main Workspaces

### Area Workspace

The user enters by searching an area, suburb, or postcode.

Expected sections:

- Area summary
- Market metrics
- Market Signals: supply, demand, price, rental, pressure, and future supply
- Demographics
- Crime trend
- Schools
- Transport and amenities
- Planning and infrastructure events
- Active opportunities
- Saved notes
- AI area brief

### Opportunity Tracker

An opportunity can be:

- Established house
- Apartment or unit
- Vacant land
- House-and-land package
- Estate release
- Builder quote
- Manual note
- Source URL
- PDF or uploaded document

Each opportunity should store provenance:

- Source type
- Source URL or file reference
- Captured at
- Last checked at
- Extracted fields
- Missing fields
- Confidence

### AI Brief

AI should explain known data and highlight gaps.

AI can:

- Explain an area.
- Compare areas.
- Explain market signals, formulas, and missing source dependencies.
- Extract structured fields from source pages, PDFs, and pasted text.
- Summarize planning and infrastructure pages.
- Generate owner-occupier, investor, or build briefs.
- Suggest next checks.

AI should not:

- Be the only fact source.
- Make unsupported recommendations.
- Claim prices or package details without a source.
- Invent market metrics such as vendor discount, net supply, or months of stock.
- Scrape restricted sites by bypassing terms or technical controls.
- Automatically score builder reputation.

## Non-Goals For Early Stages

- Full national coverage.
- Automated scraping of REA or Domain public pages.
- Scraping Google search results pages.
- Fully automated builder reputation scoring.
- Complex prediction models.
- Social or multi-user collaboration.
- Heavy GIS analysis before the core workspace works.

## Product Quality Bar

Every important claim should be traceable.

Use this rule:

```txt
No source, no claim.
Low confidence, show uncertainty.
Missing data, show the gap.
```

Every AI-generated insight should be connected to:

- `sourceUrl`
- `sourceType`
- `extractedAt`
- `confidence`
- `missingFields`
- `rawSnapshotId`

## UX Principles

- Start with the actual workspace, not a marketing landing page.
- Make area research the first screen.
- Keep the UI calm, dense, and useful.
- Use an iOS/macOS-inspired visual style, but avoid copying native UI blindly.
- Use maps as a mode or tab, not the entire product.
- Make AI contextual and button-driven before building a free-form chat assistant.
- Use bilingual UI labels later, but do not translate source data automatically in MVP.
