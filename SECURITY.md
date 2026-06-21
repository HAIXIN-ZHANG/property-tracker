# Security Policy

`property-tracker` is currently an early-stage personal project.

## Supported Versions

Only the `main` branch is actively maintained.

## Secrets

Never commit real API keys, OAuth client secrets, tokens, downloaded private
provider data, or paid report exports.

Use `.env.local` for local secrets. The repository only includes `.env.example`.

## Data Handling

- Treat provider credentials as private.
- Treat paid/commercial data as licence-constrained unless the terms explicitly
  allow storage and redistribution.
- Keep source provenance for claims shown in the UI.
- Do not use public-page scraping of Domain, realestate.com.au, or Google search
  result pages as a production data backbone.

## Reporting Issues

For now, create a private GitHub issue or contact the repository owner directly.
