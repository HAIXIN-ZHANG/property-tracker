# Review Handoff: Stage 2 Boundary Corrections

Last updated: 2026-06-21

## Purpose

This document is the active handoff for the reviewer findings after the Stage 2
provider-boundary implementation.

Business conclusion:

- Stage 2 scaffolding exists.
- Stage 2 business closure is now coherent for the MVP provider-boundary path
  after the 2026-06-21 correction pass.

The current repo has provider contracts, adapter stubs, and a data-source
status page. The main area workspace and opportunity detail now receive
provider-backed status, source, warnings, and evidence metadata. The product
still uses sample fixture data until Stage 2.5 connects the first real open-data
source.

## Non-Negotiable Product Rule

Only design and present product capabilities that are grounded in data we can
actually obtain, map, and explain honestly.

If the UI cannot point to a real source document, a real mapping state, or a
real provider status, it must show the gap instead of simulating a stronger
capability.

## Important Constraint

AreaScope is still:

- WA-first
- area-first
- source-aware
- honest about access gaps

Do not let Stage 2 create a second fake completion layer where contracts look
complete but the runtime workspace still runs on parallel sample-only models.

## Current Stage 2 Judgment

What is genuinely improved:

- The no-match home CTA issue is fixed.
- Fake provenance placeholders were removed.
- Provider interfaces now fail closed.
- Runtime UI status now uses `DataAvailabilityStatus` instead of a parallel
  `SourceStatus` model.
- The repo has a clearer data-source readiness page with evidence metadata.
- Provider warnings are surfaced in the area workspace and opportunity detail.

What is still not closed:

- Real Stage 2.5 open-data source wiring is still pending.
- Domain and PropTrack buyer-facing data are still access-pending.
- Area-level public-data mapping remains pending until source-specific importers
  and geography rules are implemented.

## Resolution Log

2026-06-21 correction pass:

- P1 workspace truth model: route entry points now pass provider-backed runtime
  metadata into the workspace and opportunity detail (`status`, `source`, and
  `warnings`). Area identity mapping data from the provider is also displayed in
  the workspace.
- P1 status split: removed the old `SourceStatus` model and the old
  source-status pill. Runtime status now uses `DataAvailabilityStatus` and
  `DataAvailabilityPill` across the home source cards, workspace, opportunity
  list/detail, source provenance panel, and data-source page.
- P1 evidence metadata: every data-source record now carries evidence basis,
  checked date, limitations, and attached `SourceDocument` metadata such as
  source URL, captured/checked timestamps, confidence, and explicit missing raw
  snapshot IDs where applicable.
- P2 provider warnings: opportunity detail now receives source-record provider
  results from the route and displays provider warnings, including the no-source
  document case.
- P2 completion gate: `pnpm check` passes after the correction pass.

## Findings

### P1. The main workspace still bypasses the new Stage 2 truth model

Problem:

- Route entry points now load area and opportunity data through the mock
  provider.
- But the provider returns the existing `AreaProfile` / `AreaOpportunity`
  sample model directly.
- The workspace, signals, and opportunity detail still render the older sample
  structures instead of the new Stage 2 contracts such as:
  - `SourceDocument`
  - `ExtractionRun`
  - `MarketSignalSnapshot`
  - `AreaIdentityMapping`

Why this is a business problem:

- The product appears to have a data boundary, but the core user flow still
  runs on a separate truth model.
- This means Stage 2 is only partially real.
- If Stage 2.5 starts from here, the repo will grow two parallel systems:
  contract files and actual runtime behavior.

Expected correction:

- Make the main area workspace and opportunity detail consume one canonical
  runtime data shape.
- If the old sample model remains temporarily, it must become an explicit
  fixture that feeds the Stage 2 contracts, not a parallel product model.
- The route -> provider -> UI chain should carry:
  - data
  - status
  - warnings
  - source evidence

Acceptance check:

- The main workspace no longer relies on a parallel status/data model that the
  Stage 2 contracts do not understand.

### P1. Runtime readiness semantics are split across two different status systems

Problem:

- Stage 2 introduced `DataAvailabilityStatus` with richer states such as:
  - `sample_data`
  - `file_validated`
  - `license_constrained`
  - `source_accepted`
  - `derived_later`
- But the main UI still uses the older `SourceStatus` model:
  - `validated`
  - `mapping_pending`
  - `access_pending`
  - `manual`
  - `sample`

Why this is a business problem:

- The same product truth can now be expressed differently on different pages.
- Richer Stage 2 distinctions are being flattened before they reach the main
  workspace.
- A user can see `File validated` in one place and `Validated` or `Sample` in
  another place without understanding the difference.

Expected correction:

Choose one of these paths explicitly:

1. Make `DataAvailabilityStatus` the canonical runtime status model everywhere.
2. Or keep a smaller display model, but derive it through one explicit mapping
   layer with documented semantics.

Do not keep two uncoordinated status systems in live runtime use.

Acceptance check:

- Status language shown in the workspace, opportunity detail, and data-source
  page is semantically consistent.

### P1. The data-source readiness page still lacks inspectable evidence fields

Problem:

- Stage 2 correctly introduced `SourceDocument` fields such as:
  - `sourceUrl`
  - `capturedAt`
  - `lastCheckedAt`
  - `confidence`
  - `rawSnapshotId`
- But the current data-source records mostly omit those fields.
- The UI then displays only title, status, and missing fields.

Why this is a business problem:

- The page claims to show what is actually usable now.
- But users still cannot inspect the evidence freshness or provenance depth.
- This makes readiness look cleaner than it really is.

Expected correction:

- For every attached source document, show as much real evidence metadata as is
  currently available.
- If a field is missing, show that gap explicitly.
- At minimum, the UI should be able to distinguish:
  - source attached but lightly described
  - source attached and field-checked
  - source attached with freshness metadata

Acceptance check:

- A reviewer can tell when a source was captured or checked, or can clearly see
  that the timestamp metadata is not available yet.

### P2. Provider warnings exist but are not surfaced to the user flow

Problem:

- The provider layer now returns useful warnings, including when an opportunity
  has no attached source document.
- The opportunity detail UI does not consume that provider result.
- It still reads source records from the older helper path.

Why this is a business problem:

- The most important Stage 2 honesty signal is being dropped before it reaches
  the user.
- The boundary knows the truth, but the product does not show it.

Expected correction:

- Opportunity detail should receive provider-backed source result metadata or a
  normalized UI model derived from it.
- Warnings should become visible product copy when they change how strongly the
  user should trust the displayed record.

Acceptance check:

- If an opportunity has no attached source document, the detail view can show a
  provider-backed warning rather than only an empty list.

### P2. Stage 2 should not be treated as complete while `pnpm check` is failing

Problem:

- The current repo does not pass the declared completion gate.
- `pnpm check` currently fails on `docs/STAGE_2_5_OPEN_DATA_PROOF.md` formatting.

Why this is a business problem:

- The repo declares `pnpm check` as the main completion gate.
- Marking Stage 2 done while that gate is red weakens the discipline the repo
  already chose.

Expected correction:

- Restore a green `pnpm check` before treating the current stage handoff as
  resolved.

Acceptance check:

- `pnpm check` passes again after the Stage 2 correction pass.

## Implementation Guidance

Prefer the smallest correction set that creates one honest runtime path.

Suggested order:

1. Restore `pnpm check`.
2. Choose one canonical runtime status model.
3. Make the workspace and opportunity detail consume provider-backed runtime
   data instead of parallel sample-only truth.
4. Surface provider warnings where they matter to trust.
5. Expand the data-source page so evidence metadata is inspectable, not just
   summarized.
6. Only then continue Stage 2.5 real open-data proof work.

## Minimum Acceptance Bar

The pass is done when all of the following are true:

- `pnpm check` passes.
- The main workspace does not rely on a parallel status model with different
  semantics from the data-source page.
- Opportunity detail can reflect provider-backed warning state.
- Source-document evidence is inspectable enough to support the readiness
  claims.
- Stage 2.5 starts from the unified runtime model instead of bypassing it.

## Out Of Scope For This Pass

Do not:

- invent live provider data
- claim suburb-level mapping that does not exist
- start Stage 3 persistence work
- build importer complexity beyond what is needed to prove one honest runtime
  path
- hide missing evidence behind cleaner copy
