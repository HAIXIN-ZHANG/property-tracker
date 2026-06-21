# Stage 2.5: Real Open Data Proof

Last updated: 2026-06-21

## Goal

Prove that AreaScope can move beyond sample data by connecting one real,
field-checked public dataset into the area workspace without overstating what the
data means.

This stage should validate the full data path:

```txt
field-checked public source
-> small typed sample
-> provider/importer boundary
-> one mapped area
-> UI card
-> source document + caveat
```

## First Source

Start with WA Education / Data WA schools.

Reason:

- The fields are already inspected: school name, address, suburb, postcode,
  latitude, and longitude.
- The user value is clear for owner-occupier, investment, and build decisions.
- It does not depend on Domain package approval.
- It can be useful before maps exist.
- It has simpler geography than ABS, crime, or GTFS.

## Non-Goals

- Do not import every WA school into app code.
- Do not build a database.
- Do not claim school catchment or enrolment eligibility.
- Do not infer school quality or rankings.
- Do not add a map yet unless the list proof is already complete.
- Do not treat distance as a commute or catchment claim.

## Data Honesty Rules

- Source document status may be `file_validated`.
- Area-level school context remains `mapping_pending` until distance and area
  rules are explicit.
- Display a caveat such as:

```txt
School list is field-checked from WA Education/Data WA. Distance and catchment
rules are not validated yet.
```

- If a school is matched by suburb text only, label it as a locality match, not
  a catchment or nearby-school truth.
- If coordinates are used, show the distance method before displaying a distance.

## Scope For First Pass

Implement only one visible proof:

```txt
Ellenbrook area page
-> Schools panel
-> 3-8 school rows from a typed sample
-> source/caveat block
-> status: file_validated source, mapping_pending area interpretation
```

The typed sample can be a small curated fixture derived from the inspected source
fields. The fixture must keep source metadata and missing fields visible.

## Data Model

Recommended types:

```ts
type SchoolRecord = {
  id: string;
  name: string;
  sector?: string;
  level?: string;
  street?: string;
  suburb: string;
  postcode: string;
  latitude?: number;
  longitude?: number;
  sourceDocumentId: string;
};

type AreaSchoolContext = {
  areaSlug: string;
  status: "mapping_pending";
  matchMethod: "suburb_text" | "coordinate_radius";
  schools: SchoolRecord[];
  caveats: string[];
};
```

Use the existing Stage 2 data contracts where possible instead of inventing a
parallel status language.

## Implementation Tasks

- Define `SchoolRecord` and `AreaSchoolContext` types.
- Add a small WA schools typed sample fixture.
- Add a `schoolProvider` or `waSchoolProvider` boundary.
- Return Ellenbrook school context with `mapping_pending`.
- Add source document metadata for the WA schools file.
- Add a compact schools panel to the area workspace.
- Add tests that prove the provider does not claim catchment truth.
- Update `/data-sources` if the source document status changes.
- Run `pnpm check`.
- Browser-smoke `/areas/ellenbrook`.

## Done When

- Ellenbrook shows a real-data-derived school list.
- The UI clearly separates file validation from area interpretation.
- No school row implies catchment, ranking, quality, or enrolment eligibility.
- The provider has focused tests.
- `pnpm check` passes.

## Follow-Up Candidates

After this proof works, choose the next source by value and mapping difficulty:

- ABS SA2 demographics for area profile.
- Transperth GTFS for transport stops/routes.
- WA Police crime for trend context with strong geography caveats.
