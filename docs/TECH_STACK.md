# Tech Stack

Last updated: 2026-06-21

This project should stay small enough to move quickly, while keeping the repo credible as a real product.

## Core App

| Layer           | Choice                 | Why                                                                             |
| --------------- | ---------------------- | ------------------------------------------------------------------------------- |
| Framework       | Next.js App Router     | Good default for a TypeScript React product with future server-side data access |
| Language        | TypeScript strict mode | Keeps source adapters, AI schemas, and UI contracts explicit                    |
| Package manager | pnpm                   | Fast, deterministic, and already configured in the project                      |
| Styling         | Panda CSS              | Type-safe styling, design tokens, recipes later, no Tailwind dependency         |
| UI primitives   | Ark UI                 | Accessible headless primitives that pair well with Panda CSS                    |
| Icons           | lucide-react           | Practical icon coverage for tool and dashboard controls                         |

## Quality Tools

| Tool                  | Purpose                                                  |
| --------------------- | -------------------------------------------------------- |
| Prettier              | Formatting                                               |
| ESLint + Next config  | Static linting and React/Next rules                      |
| Jest                  | Unit tests                                               |
| React Testing Library | Component tests                                          |
| Playwright            | Browser/e2e tests when the app has stable workflows      |
| `pnpm check`          | Format, lint, typecheck, test, and production build gate |

## Deferred On Purpose

These are not part of the Stage 0 foundation:

- Prisma/database schema
- Background ingestion workers
- Cloud queues
- Provider-specific import scripts
- Domain production API integration

Reason:

```txt
The product should first have a clean visible app shell and source-aware data model.
Provider ingestion should be added once the UI and import contracts are stable.
```

## Current Styling Decision

Use Panda CSS directly through `styled-system/css` through the current MVP stages.

Add Panda recipes only when a component family repeats enough to justify it.

Use Ark UI when a component needs real interaction semantics, such as:

- Select
- Dialog
- Tabs
- Combobox
- Menu
- Tooltip

Do not install a heavy visual component library for the MVP. The product needs a tailored property-research interface, not a generic admin dashboard.
