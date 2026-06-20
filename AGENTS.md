# Agent Guide

Use this file when working on `property-tracker`.

## Project Direction

`property-tracker` is an area-first property research workspace for Australian property buyers.

Start Perth/WA-first. Do not treat Domain or realestate.com.au public-page scraping as the product backbone.

## Before Editing

Read these docs first:

- `docs/PRODUCT_BRIEF.md`
- `docs/DATA_FEASIBILITY_REVIEW.md`
- `docs/DATA_VALIDATION_MATRIX.md`
- `docs/MARKET_SIGNALS.md`
- `docs/STAGE_EXECUTION_PLAN.md`
- `docs/TODO.md`

## Language

Repo-facing docs and code comments should be in English.

The product can support Chinese and English in UI labels later through locale files.

## Development Rules

- Keep stages working end to end.
- Show mocked, manual, access-pending, and validated data honestly in the UI.
- Use Panda CSS, not Tailwind.
- Use Ark UI for accessible headless primitives when needed.
- Follow `docs/DESIGN_DIRECTION.md`: calm iOS/macOS-inspired UI, premium spacing, no noisy or crowded dashboards.
- Use AI for source-backed extraction and explanation, not as a fact source.
- Keep Domain and PropTrack integrations behind provider interfaces.
- Do not add database, queue, or ingestion complexity before the UI/data contracts need it.

## Verification

Use `pnpm check` as the main completion gate.

Run Playwright separately with `pnpm e2e` when browser workflows exist.
