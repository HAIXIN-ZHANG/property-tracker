# Review Handoff: Stage 1 Corrections

Last updated: 2026-06-20

## Purpose

This document captures the current reviewer findings after the Stage 1 sample
workspace implementation.

Use it as a handoff for the next implementation pass.

## Non-Negotiable Product Rule

Only design and present product capabilities that are grounded in data we can
actually obtain, map, and explain honestly.

If the data is not available yet, the UI must show that truth clearly instead of
simulating a stronger capability.

## Important Constraint

`property-tracker` is not a listing portal clone.

The product must stay:

- WA-first
- area-first
- source-aware
- honest about access gaps

Do not turn blocked, partial, broader-geography, or placeholder data into
something that looks like validated suburb-level truth.

## Findings To Fix

### P1. `Validated` is being used too early at the area-card level

Problem:

- Some area cards are marked `validated` even though the selected suburb still
  has `mappingStatus: unverified`.
- This mixes two different truths:
  - source/file fields were validated
  - this suburb-level metric is product-ready and correctly mapped

Why this is a business problem:

- The user reads the area workspace as suburb-level truth.
- If suburb-to-SA2, suburb-to-police geography, or suburb-to-transport mapping
  is not verified yet, the card should not imply completed suburb-level
  validation.

Expected correction:

- Separate `source readiness` from `area metric readiness`.
- A validated source candidate is not the same thing as a validated area card.
- If mapping is still pending, the card should say so explicitly.

Examples:

- `ABS source validated, suburb mapping pending`
- `WA Police source validated, district/locality mapping pending`
- `GTFS source validated, commute card not mapped yet`

Acceptance check:

- No area card should read as fully validated suburb truth while the area
  identity remains unverified.

### P1. Provenance currently uses placeholder records that look real

Problem:

- Opportunity detail pages generate fallback provenance records even when no
  real source has been attached yet.
- This creates a fake feeling of traceability.

Why this is a business problem:

- The product promise is "no source, no claim".
- Placeholder provenance is still not real provenance.
- Users should not see a populated source panel unless an actual source note,
  URL, file, or extracted record exists.

Expected correction:

- Replace fake provenance entries with an explicit empty state.
- The empty state should explain what is missing and what the next action is.

Suggested empty-state copy direction:

- `No source attached yet`
- `Attach a source URL, pasted text, PDF, or manual note before treating this as a sourced opportunity`

Acceptance check:

- If an opportunity has no real source records, the UI shows an honest empty
  state rather than generated placeholder items.

### P1. Market Signals status semantics are too compressed

Problem:

- The product docs distinguish multiple availability states:
  - `sample_now`
  - `external_link_now`
  - `access_pending`
  - `public_source`
  - `derived_later`
- Runtime UI currently collapses too much into:
  - `validated`
  - `sample`
  - `manual`
  - `access_pending`

Why this is a business problem:

- `external link`, `manual note`, `public broader-geography source`, and
  `derived later` do not mean the same thing.
- When these are flattened into a small set of display states, the user loses
  the real meaning of what can actually be used now.

Expected correction:

- Introduce a runtime signal availability model that preserves the important
  product distinctions.
- Keep the UI honest about:
  - sample-only values
  - link-only metrics
  - public-but-not-mapped metrics
  - derived metrics missing dependencies
  - provider-gated metrics

Acceptance check:

- A user can tell whether each signal is:
  - sample
  - link-only
  - public-source candidate
  - derived later
  - access pending

### P1. Market Signals cards visually imply stronger data than we have

Problem:

- The current signal cards draw decorative mini bars even for metrics that are
  only placeholders, manual notes, or access-pending concepts.

Why this is a business problem:

- Visual chart language implies observed numeric series.
- For blocked or conceptual metrics, this is misleading.

Expected correction:

- Do not render chart-like micro-visuals for signals unless the displayed metric
  actually has a chart-ready basis.
- Use alternate UI treatments for:
  - formula-only metrics
  - access-pending metrics
  - public-source candidates
  - link-only metrics

Acceptance check:

- A metric with no real series should not look like a real chart.

### P2. Home search CTA still falls back to a default area on no match

Problem:

- When the filtered result set is empty, the page still keeps a CTA that points
  to the default sample area.

Why this is a business problem:

- It makes the search feel fake.
- A user who sees "no match" should not be silently redirected to another area.

Expected correction:

- Disable or remove the primary CTA when there is no area match.
- Keep the search behaviour honest even in the static sample stage.

Acceptance check:

- No-match state must not navigate to a fallback suburb.

### P2. Stage 1 completion is overstated

Problem:

- Repo-facing docs now say Stage 1 is complete.
- But the product loop still claims the user can track opportunities.
- In practice, the current implementation is still read-only sample browsing.

Why this is a business problem:

- It overstates real user utility.
- It may push implementation into Stage 2 abstraction before the real research
  loop exists.

Expected correction:

Choose one of these paths explicitly:

1. Keep Stage 1 marked complete, but narrow the wording so it clearly means:
   `sample workspace demo complete`
2. Or keep Stage 1 partially complete until users can actually start a real
   local research record

Acceptance check:

- README, roadmap, and stage docs must not imply real opportunity tracking if
  the app still only supports sample detail browsing.

## Implementation Guidance

Prefer the smallest correction set that improves business honesty.

Suggested order:

1. Fix the no-match CTA behaviour on the home page.
2. Replace fake provenance fallback with an empty state.
3. Split area-card truth from source-validation truth.
4. Expand Market Signals availability semantics.
5. Reduce chart-like visuals for non-chart-ready metrics.
6. Align README and stage wording with the real product state.

## Out Of Scope For This Pass

Do not:

- invent new provider-backed data
- claim suburb-level validation without verified mapping
- add AI extraction flows that pretend source capture already exists
- build deep provider abstractions before the above honesty issues are fixed

## Definition Of Done For This Pass

This pass is done when:

- the home search no longer has fake fallback behaviour
- provenance is honest when no source exists
- area cards no longer overclaim validation
- Market Signals no longer flatten meaningfully different availability states
- docs describe the current product state accurately
