
# University Community App

## Project

A university-based discussion platform connecting incoming
and current students across US universities.

Read docs/PRD.md and docs/ARCHITECTURE.md before making
major architectural decisions, when those files exist.

## Technology

- React + Vite + TypeScript
- React Router
- Tailwind CSS + shadcn/ui
- Supabase Auth + PostgreSQL
- Supabase Row Level Security
- Vitest + React Testing Library
- Playwright for E2E testing

Do not introduce a new framework or backend service
without approval.

## Architecture

- Use feature-based code organization.
- Keep UI components separate from data access.
- Centralize Supabase client configuration.
- Use strict TypeScript; avoid `any`.
- Prefer simple solutions over unnecessary abstractions.
- Keep components focused and reusable.
- Store database changes in supabase/migrations/.
- Use generated database types where practical.

## Core Business Rules

- One group per university in the MVP.
- Users may join multiple university groups.
- Each user may join a group only once.
- Group feeds are visible only to members.
- Only members may create posts and comments.
- Only authors may delete their posts and comments.
- Incoming/current student status is self-reported.
- Text-only posts and flat comments for the MVP.

## Security

- Enforce permissions through database RLS.
- Never rely on frontend checks alone.
- Never expose Supabase secret/service-role keys.
- Validate user-controlled input.
- Never trust client-provided author IDs.
- Do not make production database changes without approval.
- Do not commit .env files or secrets.

## UI Guidelines

- Responsive, accessible, mobile-friendly design.
- Prefer reusable shadcn/ui components.
- Use consistent spacing, typography, and colors.
- Implement loading, empty, error, and success states.
- Confirm destructive user actions.
- Avoid unnecessary animations and visual clutter.

## Development Process

- Work on one feature or milestone at a time.
- For complex tasks, propose a plan before editing.
- Do not refactor unrelated code.
- Explain database schema changes before applying them.
- Add tests for business logic and access controls.
- Run the applicable checks before completion.
- Fix actual errors; do not hide or suppress them.
- Summarize changed files and verification results.

## Verification

Use the scripts defined in package.json.

Expected checks after setup:
- npm run lint
- npm run typecheck
- npm test
- npm run build

Use Playwright for critical user workflows.
If a script is missing, set it up before relying on it.

## Git

- Make small, focused commits.
- Do not commit secrets or generated build artifacts.
- Never force-push or overwrite work without approval.

## MVP Boundaries

Do not add the following unless requested:
- Direct messaging
- Real-time chat
- Notifications
- AI features
- Complex recommendation algorithms
- Multi-level comment threads
- Multiple groups per university

## Supabase Database Security

- Enable RLS on all public application tables.
- Use explicit GRANT statements for Data API access.
- Grant only the minimum permissions needed by each role.
- Create RLS policies for all authorized operations.
- Never expose service_role or secret keys in React.
- Test unauthorized access before considering a feature complete.