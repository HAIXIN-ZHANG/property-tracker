# Domain API Setup

Last updated: 2026-06-20

This document tracks how to register for Domain's official API and what AreaScope expects to validate first.

## Registration Links

Official entry points:

- Developer docs: https://developer.domain.com.au/docs/latest/
- Account login/register: https://developer.domain.com.au/account/login
- Projects page: https://developer.domain.com.au/projects/
- Create first project guide: https://developer.domain.com.au/docs/latest/getting-started/creating-first-project/
- Verify project guide: https://developer.domain.com.au/docs/latest/getting-started/verifying-project/
- API packages: https://developer.domain.com.au/docs/latest/apis/
- Live API Browser: https://developer.domain.com.au/docs/latest/live/
- OpenAPI spec: https://developer.domain.com.au/static/latest/media/latest/openapi.json

The Projects page requires login and JavaScript.

## Account Creation

Domain's docs say an account can be created with:

- GitHub account
- Google account
- Email registration

After choosing a login method, complete the registration form.

## Project Creation Flow

1. Go to the Projects page after logging in.
2. Click `Create Project`.
3. Fill in the project name and project description.
4. Go to `Credentials`.
5. Click `Create OAuth Client`.
6. Choose `Client Credentials`.
7. Create the client.
8. Add a client secret.
9. Go to `API Access`.
10. Add the API packages needed for the project.

Domain's guide says API keys associated with a project determine which APIs are available and which rate limits apply. It also says required APIs may need to be agreed with an account manager.

Domain's API package page suggests some packages may be available after signup, but the actual project portal is the source of truth. In the observed `PROPERTY-TRACKER-DEV` project, core packages still require access requests.

## Observed Portal State

Observed on: 2026-06-20

Project:

```txt
PROPERTY-TRACKER-DEV
```

Business profile:

```txt
Incomplete
```

The portal says the business profile must be completed before additional access can be assigned.

Observed API access status:

| API package            | Portal plan/status                               | Portal action    | Product impact                                                    |
| ---------------------- | ------------------------------------------------ | ---------------- | ----------------------------------------------------------------- |
| Address Suggestions    | Standard, unlimited calls per day, detailed data | Request access   | Useful for search/autocomplete, but not enabled yet               |
| Agents & Listings      | Standard, contact for price, detailed data       | Request access   | Core listing search is gated                                      |
| Campaign API           | Production, unlimited calls per day, full data   | Request access   | Not needed for MVP                                                |
| Listings Management    | Sandbox, up to 500 calls per day, basic data     | Added to project | Can be used for sandbox/API plumbing, but not core buyer research |
| Listings Management    | Production, unlimited calls per day, basic data  | Request access   | Not needed for MVP unless managing listings                       |
| Price Estimation       | Legacy/Premium/Premium Trial, contact for price  | Request access   | Valuation estimates are gated                                     |
| Properties & Locations | Standard, contact for price, detailed data       | Request access   | Core area, market, demographics, and property data are gated      |
| Property Enrichment    | Basic/Standard, contact for price                | Request access   | Later-stage enrichment only                                       |
| Property Package       | Standard, contact for price, full data           | Request access   | Best consolidated package, but gated                              |
| PropertyRadar          | Standard, contact for price, detailed data       | Request access   | Not needed for MVP                                                |
| Rental AVM API         | Standard, unlimited calls per day, full data     | Request access   | Rent estimate/yield data is gated                                 |
| Schools Data           | Standard, contact for price, detailed data       | Request access   | School data is gated                                              |
| Webhooks               | Standard, unlimited calls per day, full data     | Request access   | Later-stage change notifications only                             |

Conclusion:

Domain should not be treated as an immediately available MVP data backbone. Build the first product loop with sample data, manual imports, ABS/WA/open data validation, and provider interfaces. Keep Domain as a clean integration path once access is granted.

## Authentication Choice

Use OAuth 2.0 Client Credentials for the app server.

Reason:

- Domain recommends OAuth where possible.
- It works well for server-side API calls.
- The client secret stays on the server.
- API Key authentication is simpler but less flexible and does not support user-specific data.

Token endpoint:

```txt
POST https://auth.domain.com.au/v1/connect/token
```

The request uses HTTP Basic auth with:

```txt
client_id:client_secret
```

The body uses:

```txt
grant_type=client_credentials
scope=...
```

Exact scope names must be verified against endpoint references and the enabled project package. Domain returns `invalid_scope` when a requested scope is not included in the plan.

## Packages Relevant To AreaScope

### Address Suggestions

Useful endpoint:

- `GET /v1/properties/_suggest`

Product use:

- Address autocomplete.
- Property discovery.

### Agents & Listings

Useful endpoints:

- `GET /v1/agencies`
- `GET /v1/agencies/{id}`
- `GET /v1/agencies/{id}/listings`
- `GET /v1/agents/{id}`
- `GET /v1/agents/{id}/listings`
- `GET /v1/agents/search`
- `GET /v1/listings/{id}`
- `GET /v1/listings/locations`
- `POST /v1/listings/residential/_search`

Product use:

- Listing search.
- Listing detail.
- Agency and agent context.
- Area opportunity feed.

### Properties & Locations

Useful endpoints:

- `GET /v1/addressLocators`
- `GET /v1/locations/profiles/{domainLocationId}`
- `GET /v1/properties/{id}`
- `GET /v1/salesResults/_head`
- `GET /v1/salesResults/{city}`
- `GET /v1/salesResults/{city}/listings`
- `GET /v2/demographics/{state}/{suburb}/{postcode}`
- `GET /v2/suburbPerformanceStatistics/{state}/{suburb}`
- `GET /v2/suburbPerformanceStatistics/{state}/{suburb}/{postcode}`

Product use:

- Area identity resolution.
- Area profile.
- Property profile.
- Demographic context.
- Suburb performance.
- Auction/sales result context.

### Property Package

This package looks closest to the first commercial target if it is accessible.

Useful endpoints listed by Domain:

- `GET /v1/addressLocators`
- `GET /v1/locations/profiles/{domainLocationId}`
- `GET /v1/projects`
- `GET /v1/projects/{id}`
- `GET /v1/projects/{id}/listings`
- `GET /v1/properties/_suggest`
- `GET /v1/properties/{id}`
- `GET /v1/properties/{propertyId}/priceEstimate`
- `GET /v2/demographics/{state}/{suburb}/{postcode}`
- `GET /v2/schools/{latitude}/{longitude}`
- `GET /v2/suburbPerformanceStatistics/{state}/{suburb}`
- `GET /v2/suburbPerformanceStatistics/{state}/{suburb}/{postcode}`
- `POST /v1/listings/residential/_search`

### Price Estimation

Useful endpoint:

- `GET /v1/properties/{propertyId}/priceEstimate`

Product use:

- Owner-occupier value check.
- Investment valuation assumptions.

### Rental AVM API

Useful endpoint:

- `GET /v1/properties/{propertyId}/rentalEstimate`

Product use:

- Investment rent estimate.
- Gross yield calculation.

### Schools Data

Useful endpoints:

- `GET /v2/schools/{id}`
- `GET /v2/schools/{latitude}/{longitude}`

Product use:

- Nearby school list.
- School access context for Live lens.

### Property Enrichment

Useful endpoint:

- `GET /v1/propertyenrichment`

Product use:

- Later-stage enrichment once fields and access are validated.

## First Validation Checklist

After an account and project exist:

- [x] Create a project named `property-tracker-dev`.
- [ ] Complete the Domain Business Profile.
- [x] Create an OAuth client using `Client Credentials`.
- [x] Create a client secret.
- [x] Add `Listings Management` sandbox if a sandbox package is useful for testing credentials.
- [ ] Request access to `Address Suggestions`.
- [ ] Request access to `Agents & Listings`.
- [ ] Request access to `Properties & Locations`.
- [ ] Request access to `Property Package`.
- [ ] Request access to `Price Estimation` if pricing estimates are needed.
- [ ] Request access to `Rental AVM API` if rental estimates are needed.
- [ ] Request access to `Schools Data` if Domain school data is needed.
- [x] Use Live API Browser to get a token.
- [x] Verify `GET /v1/me` returns `200`.
- [ ] Try `GET /v1/listings/locations` for a Perth suburb.
- [ ] Try `POST /v1/listings/residential/_search` for a Perth suburb.
- [ ] Try `GET /v2/suburbPerformanceStatistics/WA/{suburb}/{postcode}`.
- [ ] Try `GET /v2/demographics/WA/{suburb}/{postcode}`.
- [ ] Try `GET /v1/addressLocators` with `searchLevel=Suburb`.
- [ ] Record fields and errors in `DATA_VALIDATION_MATRIX.md`.

Domain's verification guide says `GET /v1/me` can be used to confirm basic API access. It also says the later listing verification steps require a paid/production API; if the project only has sandbox access, listing search may need to remain `Access pending`.

## Current Product Assumption

After the successful `/v1/me` verification, Domain should be treated as:

```txt
Official source verified
OAuth credentials validated
Listings Management sandbox added
Core buyer/search/area packages not approved
Fields not yet confirmed
Production package availability access pending
```

This means the app can implement Domain OAuth plumbing behind a provider interface, but the MVP must not depend on Domain listing search, suburb performance, demographics, schools, price estimates, or rental estimates until access requests are approved and smoke tests pass.
