# Area Identity

Last updated: 2026-06-21

AreaScope starts with an area search, but every provider identifies places differently.

This document defines the area identity layer that will keep Domain, ABS, WA Police, Data WA, Transperth, OpenStreetMap, and user-entered opportunities aligned.

## Problem

The same user-facing area can map to different provider geographies:

- Domain may use suburb, postcode, and `domainLocationId`.
- ABS may use `SA2`, `SAL`, `LGA`, `POA`, and other ASGS codes.
- WA Police may use suburb, district, or region.
- Data WA / SLIP may use geometry layers.
- Transperth uses stop and route coordinates.
- OSM uses nodes, ways, relations, names, tags, and geometry.

If this is not handled early, the app can show a suburb dashboard where market, crime, population, and planning data describe slightly different boundaries.

## Core Entity

Use an internal `AreaIdentity` record for each area the user can track.

Suggested fields:

```ts
type AreaIdentity = {
  id: string;
  displayName: string;
  slug: string;
  state: "WA" | "NSW" | "VIC" | "QLD" | "SA" | "TAS" | "ACT" | "NT";
  country: "AU";
  primaryPostcode?: string;
  areaType: "suburb" | "locality" | "postcode" | "lga" | "sa2" | "custom";
  centroid?: {
    latitude: number;
    longitude: number;
  };
  boundingBox?: {
    north: number;
    east: number;
    south: number;
    west: number;
  };
  aliases: string[];
  providerKeys: AreaProviderKeys;
  mappingStatus: "unverified" | "provider_matched" | "manually_verified" | "ambiguous";
  notes?: string;
};
```

Provider keys:

```ts
type AreaProviderKeys = {
  domain?: {
    domainLocationId?: string;
    suburb?: string;
    postcode?: string;
    state?: string;
  };
  abs?: {
    salCode?: string;
    sa2Code?: string;
    lgaCode?: string;
    poaCode?: string;
    gccsaCode?: string;
  };
  waPolice?: {
    suburbName?: string;
    districtName?: string;
    regionName?: string;
  };
  dataWa?: {
    boundaryLayerId?: string;
    planningLayerIds?: string[];
  };
  osm?: {
    relationId?: string;
    placeId?: string;
    osmName?: string;
  };
};
```

## Mapping Status

### unverified

The area exists only as user input or sample data.

### provider_matched

At least one official provider has returned a matching area or location id.

### manually_verified

The mapping has been reviewed and accepted for product use.

### ambiguous

The same name maps to multiple places or provider geographies.

Example:

- Same suburb name in different states.
- Suburb and postcode do not exactly overlap.
- ABS SAL and Domain suburb differ.
- WA Police suburb grouping differs from ABS suburb/locality.

## First Sample Areas

Start with five WA areas:

| Area       | Reason                                                              |
| ---------- | ------------------------------------------------------------------- |
| Alkimos    | Growth corridor, land/build, transport infrastructure relevance     |
| Baldivis   | Established outer growth area, family buyer and investor comparison |
| Byford     | Land/build and infrastructure timing use case                       |
| Ellenbrook | Growth area with transport changes and established estates          |
| Subiaco    | Inner established suburb, owner-occupier and investment comparison  |

Each sample area should eventually store:

- Domain suburb/postcode/location id
- ABS SAL/SA2/LGA/POA mapping
- WA Police suburb mapping
- Data WA boundary reference
- Transperth nearest key stops/stations
- OSM relation/place reference if useful

## Area Resolution Flow

```txt
User searches area
-> Normalize text
-> Query Domain location/address endpoints where available
-> Query local AreaIdentity records
-> Match ABS/WA/Data WA provider keys
-> Show ambiguity if more than one match
-> Store selected AreaIdentity
```

## Product Rules

1. Never compare two areas unless both have a known `AreaIdentity`.
2. Every area dashboard card must know which provider geography it uses.
3. If a metric uses a different boundary from the selected area, show a small data note.
4. Store provider mappings separately from user-facing labels.
5. Do not assume postcode equals suburb.
6. Do not assume ABS SA2 equals suburb.
7. For early MVP, manual verified mappings are acceptable.

## Initial Implementation

Stage 1 can use static mappings for five sample areas.

Stage 2 introduced the first data-boundary pieces:

- Static area identity records for the first five WA sample areas.
- `AreaIdentityMapping` for area-to-provider geography readiness.
- `DataAvailabilityStatus`.
- Mock provider boundaries that keep provider keys empty until verified.

Stage 3 can attach saved opportunity records to these area identities. Stage 5
and later should enrich the mappings with real provider identifiers.
