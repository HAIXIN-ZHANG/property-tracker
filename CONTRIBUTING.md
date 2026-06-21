# Contributing

This is a personal product project, but the repository should still be easy to
review and maintain.

## Development Flow

1. Read the relevant planning docs before editing:
   - `docs/PRODUCT_BRIEF.md`
   - `docs/DATA_FEASIBILITY_REVIEW.md`
   - `docs/DATA_VALIDATION_MATRIX.md`
   - `docs/MARKET_SIGNALS.md`
   - `docs/STAGE_EXECUTION_PLAN.md`
   - `docs/TODO.md`
2. Keep changes scoped to the current stage.
3. Label sample, manual, access-pending, and validated data honestly.
4. Run `pnpm check` before opening a pull request or pushing an important change.

## Product Rules

- Start Perth/WA-first.
- Build the area workspace before advanced maps or AI chat.
- Use AI for source-backed extraction and explanation, not as a fact source.
- Keep Domain and PropTrack integrations behind provider interfaces.
- Do not scrape Domain, realestate.com.au, or Google search result pages as a
  product backbone.

## Code Style

- Use TypeScript strict mode.
- Use Panda CSS for styling.
- Use Ark UI for accessible headless primitives when interaction semantics matter.
- Keep UI calm, spacious, and research-tool oriented.
- Avoid adding database, queue, or ingestion complexity before UI/data contracts
  need it.

## Verification

Run:

```bash
pnpm check
```

This runs formatting, linting, typechecking, Jest tests, and a production build.
