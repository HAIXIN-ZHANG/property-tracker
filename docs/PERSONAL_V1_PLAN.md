# AreaScope Personal V1

Latest product decision: 2026-11-21

**Status:** The existing prototype is preserved and implementation is paused.
This is the plan to use when work resumes. See [TODO](TODO.md) for the active
checklist.

## Product Decision

AreaScope is a private, Perth/WA-first property decision workspace for one
person. It answers: **Which of the properties I already found should I follow up
on, what is actually included, and what do I still need to verify?**

The previous area-first platform tested source availability and how to show
uncertainty. It did not deliver a live feed or a saved shortlist. Keep its
useful app shell, tests, and source-evidence patterns, but do not finish the old
roadmap first. Stage 2.5 (the WA schools data proof) is deferred, not cancelled
or implemented. Domain and PropTrack buyer data remain access pending and are
not dependencies of the personal version.

## First Usable Loop

1. Save a property or package from a link, with suburb, type, status, and next action.
2. In its detail view, record quoted or advertised amounts, inclusions,
   exclusions, evidence links and check dates, and unanswered questions.
3. Compare two or three candidates side by side: established home, land plus
   build, or house-and-land package. Show the known subtotal and missing costs
   separately. A missing quote is not zero, and an advertised package price is
   not a verified all-in total. Do not count included costs twice.
4. Revisit the shortlist later and pick up from the last recorded next action.

The shortlist is the home screen. Suburb is a filter and a label, not a new
region database. Keep the existing, calm UI style and locale setup. Do not
populate the personal shortlist with prototype fixtures.

## Data And Tools

| Part                        | First version                                                                                                                                                                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AreaScope web app           | Keep the existing Next.js, TypeScript, Panda CSS and Jest stack. Run locally on one computer, with data in one browser profile.                                                                                                                              |
| Storage and backup          | Use browser storage and a versioned JSON export. Validate a backup and confirm any replacement before overwriting saved records. Clearing site data can erase the shortlist. No automatic sync.                                                              |
| Existing property Skill     | Run `skilldock-property-search` in Codex when needed. Manually copy useful results into AreaScope. Do not introduce a second skill, a plugin, or an AI API for V1.                                                                                           |
| Listings and builder quotes | Open original listings and quotes separately. Store links, relevant fields, and notes; no fetching, scraping, or document uploads.                                                                                                                           |
| Market and planning context | Open [REIWA market reports](https://reiwa.com.au/the-wa-market/perth-metro/) or [PlanWA](https://www.planning.wa.gov.au/mapping-and-data/planwa) directly. Store only relevant references and notes; do not treat broader-geography figures as suburb facts. |

Distinguish advertised claims, confirmed details, and missing information. Keep
personal addresses, budgets, quotes and backups out of Git. Use fictional
candidates in tests or any screenshots shared outside the workspace.

## Finish Line

Rough estimate: 2-3 focused workdays, or about a week of part-time work. This is
an estimate, not a schedule. No deployment is required.

- Create and revisit three candidates. Confirm notes, sources, and next actions
  survive a reload.
- Compare two or three candidates. Check that an unquoted cost stays unknown,
  included costs are not double-counted, and subtotals are clearly labelled.
- Export the shortlist and restore it in a clean browser profile. Invalid
  backups must leave saved data untouched.
- Pass `pnpm check` and the Playwright shortlist/comparison flow; update the
  README to describe what actually shipped.

## Reopen Only On Real Usage

- Add structured Skill import only if copying results becomes repetitive.
- Consider private hosting or sync only if access across devices becomes necessary.
- Revisit an open data source only if a recurring decision needs it and the
  actual coverage, geography, and reuse terms are verified.
- No V1 commitments to automated listing tracking, maps, market dashboards,
  investment forecasting, a native app, or public rollout.
