# Quad: University Student Community

A web app that connects incoming and current students at US universities through one members-only discussion community per university. University software engineering course project.

**Status:** Milestone 1 (frontend foundation) is complete. The UI runs on clearly labelled mock data, with no real authentication or database yet. See [docs/HANDOFF.md](docs/HANDOFF.md).

## Stack

React 19 + Vite + TypeScript (strict) · React Router · Tailwind CSS v4 + shadcn/ui · react-hook-form + zod · Supabase (Auth, Postgres, RLS) · Vitest + React Testing Library · Playwright

## Getting started

```bash
npm install
npx playwright install chromium   # once, for E2E tests
npm run dev                       # http://localhost:5173
```

Environment variables go in `.env.local` (gitignored). The frontend only uses the publishable key:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

In Milestone 1, any valid-looking email and password on `/login` opens the sample dashboard. Nothing is checked or saved.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript project build check |
| `npm test` | Unit and component tests (Vitest) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:e2e` | Playwright smoke tests (desktop + mobile Chromium) |
| `npm run build` | Production build to `dist/` |

## Documentation

- [docs/PRD.md](docs/PRD.md): product requirements
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): structure, layering, routing, key decisions
- [docs/DATABASE.md](docs/DATABASE.md): schema, grants, RLS policies, test plan
- [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md): milestones and progress
- [docs/HANDOFF.md](docs/HANDOFF.md): current status and next steps
- [CLAUDE.md](CLAUDE.md): project rules for development
