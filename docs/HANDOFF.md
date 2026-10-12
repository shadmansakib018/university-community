# Handoff — University Community ("Quad")

Last updated: 2026-10-12 · Written for whoever picks this up next (including a fresh Claude Code session)

## 1. Current status

| Milestone | State |
|---|---|
| Planning docs (PRD, Architecture, Database, Plan) | ✅ Approved |
| **M1: Frontend foundation, routing, styling, layout** | ✅ **Complete, approved and committed** (see §8). |
| M2: Database schema, RLS, authentication | ⏸ Not started. **Needs explicit owner approval before starting.** |
| M3–M5 | ⏸ Not started |

The app is a fully navigable, styled UI running on **mock data**. There is no real authentication, no database access, and nothing is persisted. `src/lib/supabase.ts` exists but isn't imported anywhere yet.

**Before doing anything:** read [CLAUDE.md](../CLAUDE.md) and [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md). Each milestone follows plan → approval → implement → verify → stop.

## 2. Features implemented (M1)

All routes from [ARCHITECTURE.md §5](ARCHITECTURE.md) render real pages:

| Route | What works |
|---|---|
| `/` | Landing page: hero, features, how it works, CTAs |
| `/signup` | Validated form (name, email, student status, password ×2), then a "check your email" screen |
| `/login` | Validated form. Any valid input navigates to `/dashboard` (mock). |
| `/forgot-password` | Validated form, then a non-enumerating "if an account exists…" message |
| `/reset-password` | Validated new-password form, then a toast and a redirect to `/login` |
| `/auth/callback` | "Email confirmed" placeholder |
| `/dashboard` | Joined-group cards, empty state, Discover CTA |
| `/discover` | Name search (min 2 chars), result count, empty state, Join / Leave (with confirm) |
| `/groups/:groupId` | Group header, membership button, create-post form, newest-first feed. Non-members see a join prompt. Unknown ID shows a not-found state. |
| `/groups/:groupId/posts/:postId` | Full post, author delete (confirm), oldest-first comments, add comment, delete own comment (confirm) |
| `/settings` | Public profile form (name, status), private account info (email, member since), log out |
| `*` | 404 page |

Cross-cutting: responsive nav (desktop bar, mobile sheet menu), account dropdown, skip-to-content link, "Preview mode" banner on signed-in pages, toasts, accessible form errors (`aria-invalid`, `aria-describedby`, `role="alert"`).

## 3. Important architectural decisions

Full list: [ARCHITECTURE.md §10](ARCHITECTURE.md). Security design: [DATABASE.md](DATABASE.md).

- **No custom backend.** Supabase RLS is the authorization layer. Frontend checks are UX only.
- **Anti-impersonation:** `author_id` / `user_id` default to `auth.uid()`, and column-level INSERT grants exclude them.
- **SECURITY DEFINER functions** use `set search_path = ''`, have execute revoked from `public, anon`, and only answer about the caller.
- **Profiles are public-only** (display name, status). Email never leaves `auth.users`.
- **Layering:** pages → hooks → `api.ts` → `src/lib/supabase.ts`. In M1, pages call `src/mocks/queries.ts` directly; each call site is marked `TODO(Mn)`.
- **Validation limits** live in `src/lib/validation.ts` and must match the DB CHECK constraints in DATABASE.md.
- **Route table** is in `src/app/routes.tsx` and shared by the app (`createBrowserRouter`) and tests (`createMemoryRouter`).
- **Product name** "Quad" is in `src/config/app.ts`, the only place to change it.
- **Theme:** indigo primary, light only (`src/index.css`). shadcn style `radix-nova`.

## 4. Files and folders worth reviewing

| Path | Why |
|---|---|
| `src/app/routes.tsx` | All routes, plus the M2 TODO for `RequireAuth` / `PublicOnlyRoute` |
| `src/app/layouts/AppLayout.tsx` | Signed-in shell; the mock user must be replaced by the auth session in M2 |
| `src/mocks/` | ⚠️ All sample data. Delete once M3/M4 replace it. |
| `src/lib/validation.ts` | Shared zod fields + `LIMITS` (mirror of DB constraints) |
| `src/features/*/schemas.ts` | Form schemas (auth, profile, posts, comments) |
| `src/components/shared/` | Reusable states, ConfirmDialog, FormTextField, etc. |
| `src/test/render.tsx`, `src/test/setup.ts` | Test helpers and jsdom polyfills for Radix |
| `e2e/smoke.spec.ts`, `playwright.config.ts` | E2E setup (desktop + mobile projects) |
| `eslint.config.js` | Note the scoped rule override for `src/components/ui/**` |
| `src/lib/supabase.ts` | **Untouched**; to be typed and env-checked in M2 |

Open TODO markers (search `TODO(M`) mark each spot that changes later:
- M2 (8): the 5 auth pages, `routes.tsx`, `AppLayout`, `SettingsPage`
- M3 (2): `DashboardPage`, `DiscoverPage`
- M3/M4 (1): `GroupPage`
- M4 (1): `PostPage`

## 5. Dependencies installed

**Runtime:** `react-router` 8, `lucide-react`, `react-hook-form`, `zod` 4, `@hookform/resolvers`, `tailwindcss` 4 + `@tailwindcss/vite`, plus what shadcn added: `radix-ui`, `class-variance-authority`, `cn` (shadcn's class merger), `shadcn` (CSS import), `tw-animate-css`, `sonner`, `@fontsource-variable/geist`. Already present: `@supabase/supabase-js`, `react`, `react-dom`.

**Dev:** `vitest` 5, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `@playwright/test` (Chromium installed via `npx playwright install chromium`).

**Removed:** `next-themes` (pulled in by shadcn's sonner; unnecessary with one theme).

**Not installed yet:** Supabase CLI (M2), which needs **Docker Desktop** for the local stack.

## 6. Test results (2026-10-12, final run)

| Check | Result |
|---|---|
| `npm run lint` | ✅ pass (0 problems) |
| `npm run typecheck` | ✅ pass (strict) |
| `npm test` | ✅ 8 files, **66 tests** passed |
| `npm run build` | ✅ pass; ⚠️ chunk-size warning: main JS 672 kB (208 kB gzip) |
| `npm run test:e2e` | ✅ **6 passed** (3 smoke tests × desktop + mobile Chromium) |

Unit coverage: formatting helpers, all zod schemas (including the rule that `authorId` is stripped), university search and monograms, shared state components, ConfirmDialog confirm/cancel, CommentList author-only delete, SignUp form validation and success, and every route rendering.

## 7. Known bugs and unfinished work

No known functional bugs. Intentional M1 limitations:
- **No auth or persistence.** Login accepts any valid input. Join/leave, new posts, comments and deletes only change local page state and reset on navigation or refresh.
- **Membership isn't shared across pages:** joining on Discover doesn't update the Dashboard.
- **Deleting a sample post** navigates back to the group, where the post still appears (a toast explains this).
- **`LoadingState` / `ErrorState`** are built and tested but not used by any page yet (mock data is synchronous).
- **Feed pagination** ("Load more", 20 per page) → M4.
- **Bundle size warning** (672 kB) → route-level code splitting in M5 (plan risk #14).
- **Line endings:** Git warns "LF will be replaced by CRLF" on several files. This is harmless on Windows; consider adding `.gitattributes` (`* text=auto eol=lf`) before committing if the team uses mixed OSes.

## 8. Git state

Branch `main`. Planning and M1 were committed on 2026-10-12 in four commits on top of `55fa7c0 Initial React Vite project setup`:
1. `docs:` project docs and `CLAUDE.md`
2. `chore:` strict TS, path alias, Tailwind v4, shadcn/ui, Supabase client
3. `feat:` M1 app shell, routing, pages, shared components and mock data
4. `test:` Vitest/RTL unit tests and Playwright smoke tests

`.env.local` is ignored (`*.local`), and so are `dist/`, `playwright-report/` and `test-results/`. The `.claude/` folder (project skills) was removed by the owner. The `review-security` skill mentioned in the M2 plan no longer exists in the repo, so do that review manually against DATABASE.md §8.

## 9. Recommended next steps (Milestone 2)

Get owner approval first, then follow [IMPLEMENTATION_PLAN.md › Milestone 2](IMPLEMENTATION_PLAN.md).

1. **Prerequisites:** confirm Docker Desktop is installed and running. Add the Supabase CLI as a dev dependency, then run `supabase init` and `supabase start`.
2. **Explain each migration before applying it** (CLAUDE.md rule), and apply **locally only**:
   - `profiles` + `handle_new_user` trigger
   - `universities` / `groups` / `group_members` + `is_group_member()`
   - `posts` / `comments`
3. **Generate types** into `src/types/database.types.ts`. Type `src/lib/supabase.ts` and add a fail-fast env check (that's the only planned change to that file).
4. **pgTAP RLS tests** for all 18 cases in DATABASE.md §8. Add the `db:test` and `db:types` scripts.
5. **Auth:**
   - Build `AuthProvider`, `useAuth`, `RequireAuth`, `PublicOnlyRoute` and the `redirectTo` sanitizer.
   - Wire up the 5 auth pages (replace their `TODO(M2)` markers), plus `AppLayout` and `SettingsPage`.
   - Add `lib/errors.ts`.
6. **Remove mock user usage** from AppLayout and Settings. Keep group/post mocks until M3/M4.
7. **Do a security review** of the migrations and auth code (missing RLS, grants, impersonation, secrets), then run all checks. Configure Supabase Auth redirect URLs for localhost.
8. **No hosted or production database changes** without explicit approval.
