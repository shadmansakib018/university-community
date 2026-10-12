# Implementation Plan — University Community

Status: M1 complete · M2–M5 not started · Last updated: 2026-10-12
Related: [PRD.md](PRD.md) · [ARCHITECTURE.md](ARCHITECTURE.md) · [DATABASE.md](DATABASE.md) · [HANDOFF.md](HANDOFF.md) (current status and next steps)

## Progress

| Milestone | Status |
|---|---|
| M1: Frontend foundation | ✅ Complete, approved and committed 2026-10-12 |
| M2: Schema, RLS, auth | ⏸ Pending, **awaiting owner approval** |
| M3: Discovery and membership | ⏸ Pending |
| M4: Feed, posts, comments | ⏸ Pending |
| M5: Testing, polish, deploy | ⏸ Pending |

## Workflow per milestone

1. Explain the plan and list the files to be created or modified.
2. Wait for approval.
3. Implement only that milestone, in small focused commits.
4. Run `npm run lint`, `typecheck`, `test`, `build`, plus `db:test` / `test:e2e` where they apply.
5. Fix real errors (never suppress them), then summarize changed files and verification results.
6. Wait for approval before the next milestone.

## Current repository state (as inspected)

| Item | State | Action |
|---|---|---|
| Vite + React 19 + TS scaffold | Present; `App.tsx` is still the Vite demo | Replace in M1 |
| `src/lib/supabase.ts` | Untyped `createClient` with publishable key | Add env check + `Database` generic in M2 |
| `.env.local` | Present, gitignored by `*.local` | Never read, print or commit it |
| `tsconfig.app.json` | Had no `"strict": true`, which conflicted with CLAUDE.md | **Done (M1)**: enabled in `tsconfig.app.json` and `tsconfig.node.json`, with no fallout |
| `claude.md` | Was lowercase; Claude Code expects `CLAUDE.md` on case-sensitive systems | **Done**: renamed to `CLAUDE.md` by the owner |
| `.claude/skills/` | Had an empty `feature-check` skill and a `review-security` skill | **Done**: owner removed the `.claude/` folder |
| npm scripts | Only `dev`, `build`, `lint`, `preview` | **Done (M1)**: `typecheck`, `test`, `test:watch` and `test:e2e` added. `db:test` and `db:types` come in M2 |
| Tailwind, shadcn, Router, Vitest, Playwright, Supabase CLI | Not installed | **Done (M1)** for all except the Supabase CLI (M2) |
| `docs/`, `supabase/` | `docs/` added by this task; no `supabase/` | M2 |

---

## Milestone 1: Frontend foundation, routing, styling, layout

**Goal**: a navigable, styled shell of every page using placeholder data. No database access.

Status: **Complete. Reviewed and approved by owner** (2026-10-12).

Owner refinements for M1
- Modern, professional, responsive UI for a student community, with clean typography, consistent spacing and polished components.
- One consistent visual design across the landing, auth, dashboard, discovery, group feed, post and profile pages.
- Install the approved dependencies, but add shadcn/ui components only when a page actually uses them (not the full list up front).
- All navigation works through React Router. Mock groups, posts and comments live in one clearly labelled mock module (`src/mocks/`), to be deleted in M3/M4.
- No real authentication, database queries, membership operations or post/comment persistence. Forms validate and show UI feedback only.
- Preserve `src/lib/supabase.ts` and `.env.local` unchanged. Don't touch the hosted Supabase project.
- Works on mobile and desktop.
- Run lint, typecheck, unit tests, build and the Playwright smoke test, and fix any failures before declaring done.
- Stop after M1. Don't start M2 without approval.

Tasks
- Enable `"strict": true` in `tsconfig.app.json`.
- Add the `@/*` path alias (`tsconfig.app.json` + `vite.config.ts`).
- Install Tailwind v4 (`@tailwindcss/vite`), initialize shadcn/ui, and add the base components (button, card, input, label, textarea, form, dialog, alert-dialog, dropdown-menu, avatar, badge, skeleton, sonner, separator).
- Install `react-router`, `lucide-react`, `react-hook-form`, `zod` (**dependency approval requested**).
- Remove the Vite demo assets and CSS (`App.css`, `assets/react.svg`, `assets/vite.svg`, `assets/hero.png`, demo markup).
- Create `src/app/` (App, router, PublicLayout, AppLayout with responsive nav and mobile menu), `src/pages/` (Landing, NotFound), and placeholder pages for every route in ARCHITECTURE.md §5.
- Create the shared `LoadingState`, `EmptyState`, `ErrorState`, `ConfirmDialog`, `PageHeader` and `StudentStatusBadge` components.
- Set up Vitest + RTL + jsdom (`src/test/setup.ts`) and Playwright with one smoke test.
- Add scripts: `typecheck` (`tsc -b --noEmit` or equivalent), `test`, `test:watch`, `test:e2e`.

Key files: `tsconfig.app.json`, `vite.config.ts`, `package.json`, `components.json`, `src/index.css`, `src/main.tsx`, `src/app/**`, `src/pages/**`, `src/components/**`, `vitest.config.ts` (or a `test` block in the Vite config), `playwright.config.ts`, `e2e/smoke.spec.ts`.

Done when: every route renders at mobile and desktop widths, the 404 works, the shared state components have unit tests, and all four checks plus the Playwright smoke test pass.

### M1 completion report (2026-10-12)

**Completed**
- [x] `"strict": true` enabled (app and node tsconfigs); the codebase compiles cleanly under strict.
- [x] `@/*` alias in `tsconfig.json`, `tsconfig.app.json` and `vite.config.ts`.
- [x] Tailwind v4 + shadcn/ui (radix base, Nova preset) initialized. Indigo brand theme in `src/index.css`.
- [x] Approved deps installed: `react-router`, `lucide-react`, `react-hook-form`, `zod`, `@hookform/resolvers`, Tailwind, Vitest, RTL, jsdom, Playwright.
- [x] Vite demo assets and CSS removed. New favicon, page title and meta description.
- [x] `src/app/`: `App`, `routes.tsx`, `PublicLayout`, `AppLayout` (desktop nav, account dropdown, mobile sheet menu), skip link, footer, preview banner.
- [x] Every route from ARCHITECTURE.md §5 is a working, styled page: Landing, Sign up, Log in, Forgot password, Reset password, Auth callback, Dashboard, Discover, Group feed, Post discussion, Settings, 404.
- [x] Shared components: `LoadingState`, `EmptyState`, `ErrorState`, `ConfirmDialog`, `PageHeader`, `StudentStatusBadge`, plus `UserAvatar`, `AuthorMeta`, `DeleteButton`, `FormTextField`, `AppLogo`.
- [x] Forms validate with zod schemas whose limits mirror DATABASE.md (`src/lib/validation.ts`).
- [x] Vitest + RTL + jsdom (`vitest.config.ts`, `src/test/setup.ts`, `src/test/render.tsx`), plus Playwright (`playwright.config.ts`, `e2e/smoke.spec.ts`, desktop and mobile projects).
- [x] Scripts: `typecheck` (`tsc -b`), `test`, `test:watch`, `test:e2e`.

**Not done in M1 (by design)**
- No real auth, Supabase queries, membership writes or post/comment persistence. Pages use `src/mocks/`, and actions only update local component state and show a "Preview mode" toast.
- `RequireAuth` / `PublicOnlyRoute`, `lib/errors.ts`, and typing `src/lib/supabase.ts` → M2. `src/lib/supabase.ts` and `.env.local` were not modified.
- The `LoadingState` and `ErrorState` components exist and are tested, but no page uses them yet because mock data is synchronous. They get wired in M3/M4 when data becomes async.
- Feed pagination ("Load more") → M4.

**Deviations from the original plan**
| Planned | Actual | Reason |
|---|---|---|
| shadcn `form` and `dialog` components | Used the newer shadcn `field` component with react-hook-form `Controller`. No `dialog`; added `sheet` (mobile menu) and `radio-group` (student status) | `field` is shadcn's current recommended form primitive. Components were added only when used, per the owner's refinement. |
| `src/app/router.tsx` | `src/app/routes.tsx` exports the route table, and `App.tsx` creates the browser router | Tests reuse the same table with `createMemoryRouter` |
| No `src/mocks/`, `src/config/` | Added `src/mocks/` (data + queries, labelled MOCK) and `src/config/app.ts` (`APP_NAME = 'Quad'`) | Owner asked for clearly identified mock data. The product name lives in one place so it's easy to change. |
| Per-feature `types.ts` from generated DB types | Hand-written domain types in `features/*/types.ts` | Generated types arrive in M2; the hand-written ones will be derived from them |
| Pages compose hooks | M1 pages call `src/mocks/queries.ts` directly (marked `TODO(M3/M4)`) | No async data layer yet; hooks arrive with Supabase |
| — | `@hookform/resolvers` added | Required to connect zod with react-hook-form |
| — | `next-themes` (pulled in by shadcn `sonner`) removed | The MVP has one light theme |
| — | shadcn added the `cn` package (maintained by shadcn) and `radix-ui` | shadcn v4 defaults |
| — | ESLint `react-refresh/only-export-components` is off for `src/components/ui/**` only | Generated shadcn files export `cva` variants by design. The rule only affects HMR. |
| Mock membership shared across pages | Join/leave state is per page (not shared between Discover, Dashboard and Group) | Avoids building fake persistence; real membership arrives in M3 |

**Verification results (final run)**
| Check | Result |
|---|---|
| `npm run lint` | ✅ 0 problems |
| `npm run typecheck` | ✅ no errors (strict) |
| `npm test` | ✅ 8 files, 66 tests passed |
| `npm run build` | ✅ built; ⚠️ Vite warning: main JS chunk 672 kB (208 kB gzip) > 500 kB advisory |
| `npm run test:e2e` | ✅ 6 passed (3 smoke tests × desktop-chromium + mobile-chromium) |
| Visual check | Screenshots at 1280 px and 390 px of landing, sign-up, dashboard, discover, group, post and settings reviewed |

**Remaining issues / follow-ups**
- Bundle size warning: add route-level code splitting (`lazy`) in M5 (tracked as risk #14).

## Milestone 2: Database schema, security policies, authentication

**Goal**: secure schema in local Supabase, plus working auth and profile flows.

Tasks
- Add the Supabase CLI as a dev dependency. Run `supabase init` and start the local stack (Docker Desktop required).
- Write and **explain before applying** the three schema migrations from DATABASE.md §7, applying them locally only.
- Generate `src/types/database.types.ts` and type the client in `src/lib/supabase.ts`, with a fail-fast env check.
- Write the pgTAP RLS tests (DATABASE.md §8) and add the `db:test` and `db:types` scripts.
- `features/auth`: `AuthProvider`, `useAuth`, `RequireAuth`, `PublicOnlyRoute`, and the Sign up, Log in, Forgot password, Reset password and `/auth/callback` pages, plus zod schemas and the `redirectTo` sanitizer.
- `features/profile`: Settings page that shows email from the session and edits display name and status.
- `lib/errors.ts` error mapping.
- Document the Supabase Auth URL configuration (Site URL and redirect URLs) for local and production.

Done when: all RLS tests pass (allowed and forbidden), sign-up → confirm (local Inbucket) → login → logout → reset works locally, unit tests cover schemas, the sanitizer, error mapping and RequireAuth, and a manual security review (RLS coverage, grants, impersonation, secrets, input handling) finds no open issues.

Production: `supabase db push` only after explicit approval, and probably deferred to M5.

## Milestone 3: University discovery and group membership

**Goal**: real university data, search, join/leave, and the dashboard.

Tasks
- Download College Scorecard Most-Recent Institution data and confirm the filter columns against the data dictionary.
- `scripts/import-universities.ts` generates `…_seed_universities.sql`. Review the row count and a sample before applying.
- `features/universities`: `searchUniversities(term)` (escapes `%` / `_`, limit 25), a debounced search box, and a result list with membership state.
- `features/groups`: `joinGroup`, `leaveGroup` (with confirmation), `getMyGroups`, Dashboard cards with an empty state, and a group header for `/groups/:groupId` with a non-member join prompt.
- Show Scorecard attribution in the footer.

Done when: search is fast on the full dataset, joining twice is impossible (UI and DB), leaving works, the dashboard reflects membership, and unit and component tests pass.

## Milestone 4: Group feed, posts, comments

**Goal**: full discussion flow.

Tasks
- `features/posts`: paginated feed (20 per page, newest first, "Load more"), `CreatePostForm`, `PostCard`, `PostPage`, and delete with confirmation.
- `features/comments`: `CommentList` (oldest first), `CommentForm`, and delete with confirmation.
- The author's display name and status badge come from the embedded `profiles` relation. Relative timestamps.
- `api.ts` never sends `author_id`, and a unit test asserts this.

Done when: members can post, comment and delete their own content; non-members are blocked server-side (pgTAP) and in the UI; all states (loading, empty, error, success) are implemented and tested.

## Milestone 5: Testing, UI refinement, deployment

Tasks
- Playwright flows: sign up → confirm → join → post → comment → delete; signed-out redirect; non-member cannot see the feed.
- Accessibility pass (keyboard, labels, contrast, focus) and responsive QA at 360 px, 768 px and 1280 px.
- Vercel project, `vercel.json` SPA rewrite, env vars, and Supabase redirect URLs for the production domain.
- With approval: `supabase link` and `supabase db push` to the hosted project. Verify RLS against production with a test account.
- Update the README with setup, scripts, architecture links and data attribution.

Done when: the deployed app passes a manual smoke test, and all automated checks pass in a clean checkout.

---

## Risks and open questions

| # | Item | Proposed default |
|---|---|---|
| 1 | Docker Desktop must be installed and running for local Supabase | Confirm before M2 |
| 2 | Supabase Auth email limits on the hosted free tier (a few emails/hour with the default SMTP) | Fine for a demo; configure custom SMTP if testing hits the limit |
| 3 | Email redirect URLs must be allow-listed in Supabase for localhost and Vercel | Manual dashboard step, documented in M2/M5 |
| 4 | New dependencies: react-hook-form, zod, react-router, lucide-react, Tailwind, shadcn deps, Vitest, RTL, Playwright, Supabase CLI | Approve as a set with M1/M2 |
| 5 | Leaving a group hides your old posts from you, and you can't delete them until you rejoin | Accept for MVP |
| 6 | Deleting a post removes other users' comments on it | Accept (follows the rules); the confirm dialog says so |
| 7 | No member counts on discovery cards (RLS hides other groups' memberships) | Omit in MVP. A SECURITY DEFINER count function can be added later if wanted. |
| 8 | No edit, moderation or reporting, so abusive content is only removable by its author or the DB owner | Accept for course MVP; note as future work |
| 9 | Scorecard filter (`PREDDEG = 3`) may exclude some large research universities coded differently | Verify well-known schools appear during M3 review; adjust the filter if needed |
| 10 | Territories (PR, GU, …) excluded by default | Confirm |
| 11 | Account deletion not in UI; cascades are in place for when it's added | Accept |
| 12 | ~~Empty `feature-check` skill~~ | Resolved: owner removed `.claude/` |
| 13 | TanStack Query not used; manual refetch after mutations | Revisit only if M4 state handling gets messy |
| 14 | Main JS bundle is 672 kB (Vite advisory limit 500 kB) | Route-level code splitting in M5 |
