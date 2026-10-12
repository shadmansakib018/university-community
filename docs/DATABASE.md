# Database Design — University Community

Status: Design approved · Not yet implemented (M2) · Last updated: 2026-10-12
Nothing here has been applied. Each migration is explained before it's created (M2/M3), and production changes need explicit approval.

## 1. Entity-relationship overview

```
auth.users 1──1 profiles
                   │1
                   │
                   │*            *│
universities 1──1 groups 1──* group_members *──1 profiles
                    │1
                    │*
                  posts *──1 profiles (author)
                    │1
                    │*
                 comments *──1 profiles (author)
```

## 2. Tables

All tables live in `public`, have RLS enabled, and use `timestamptz` timestamps defaulting to `now()`.

### `profiles` (public profile only)
| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | FK → `auth.users(id)` ON DELETE CASCADE |
| `display_name` | `text` not null | CHECK `char_length(btrim(display_name)) between 2 and 50` |
| `student_status` | `student_status` enum not null | `'incoming' \| 'current'` |
| `created_at` | `timestamptz` not null | |
| `updated_at` | `timestamptz` not null | maintained by trigger |

**No email, no auth metadata, nothing private.** Every authenticated user can read this table. The signed-in user's own email comes from their session (`supabase.auth.getUser()`), never from a table.

### `universities` (reference data, read-only to clients)
| Column | Type | Notes |
|---|---|---|
| `id` | `bigint` PK | generated always as identity |
| `ipeds_unit_id` | `integer` not null UNIQUE | College Scorecard `UNITID`; makes re-imports idempotent |
| `name` | `text` not null | `INSTNM` |
| `city` | `text` not null | `CITY` |
| `state` | `char(2)` not null | `STABBR` |
| `created_at` | `timestamptz` not null | |

### `groups`
| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | `gen_random_uuid()` |
| `university_id` | `bigint` not null **UNIQUE** | FK → `universities(id)` ON DELETE CASCADE. Enforces one group per university. |
| `created_at` | `timestamptz` not null | |

### `group_members`
| Column | Type | Notes |
|---|---|---|
| `group_id` | `uuid` not null | FK → `groups(id)` ON DELETE CASCADE |
| `user_id` | `uuid` not null | FK → `profiles(id)` ON DELETE CASCADE, DEFAULT `auth.uid()` |
| `joined_at` | `timestamptz` not null | |
| **PK** | `(group_id, user_id)` | Enforces joining a group only once |

### `posts`
| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `group_id` | `uuid` not null | FK → `groups(id)` ON DELETE CASCADE |
| `author_id` | `uuid` not null | FK → `profiles(id)` ON DELETE CASCADE, **DEFAULT `auth.uid()`** |
| `title` | `text` not null | CHECK trimmed length 3–150 |
| `body` | `text` not null | CHECK trimmed length 1–5000 |
| `created_at` | `timestamptz` not null | |

### `comments`
| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `post_id` | `uuid` not null | FK → `posts(id)` ON DELETE CASCADE |
| `author_id` | `uuid` not null | FK → `profiles(id)` ON DELETE CASCADE, **DEFAULT `auth.uid()`** |
| `body` | `text` not null | CHECK trimmed length 1–2000 |
| `created_at` | `timestamptz` not null | |

Comments are flat by design: there's no `parent_comment_id`.

Pointing `author_id` at `profiles(id)` rather than `auth.users(id)` lets PostgREST embed the author: `select('*, author:profiles(display_name, student_status)')`.

## 3. Indexes

| Index | Purpose |
|---|---|
| `universities_name_trgm_idx` GIN (`name gin_trgm_ops`) | Fast `ILIKE '%term%'` search (needs the `pg_trgm` extension in the `extensions` schema) |
| `groups (university_id)` unique | One group per university; join lookups |
| `group_members` PK `(group_id, user_id)` | Membership checks by group |
| `group_members (user_id)` | Dashboard: "my groups" |
| `posts (group_id, created_at desc)` | Feed, newest first, paginated |
| `posts (author_id)` | FK / cascade performance |
| `comments (post_id, created_at)` | Thread, oldest first |
| `comments (author_id)` | FK / cascade performance |

## 4. Functions and triggers

All functions use `set search_path = ''` and fully schema-qualified names (`public.…`, `auth.…`), so a malicious object can't hijack name resolution.

### `public.is_group_member(p_group_id uuid) returns boolean` (SECURITY DEFINER)
```sql
create function public.is_group_member(p_group_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.group_members gm
    where gm.group_id = p_group_id
      and gm.user_id = (select auth.uid())
  );
$$;

revoke execute on function public.is_group_member(uuid) from public, anon;
grant  execute on function public.is_group_member(uuid) to authenticated;
```
Why SECURITY DEFINER: `group_members` policies need to check membership in `group_members` itself. An invoker-rights subquery would recurse into its own RLS policy. Why it's safe:
- It only answers about the **caller** (`auth.uid()`). It takes no user-id parameter, so it can't be used to probe other users' memberships.
- It returns a boolean and has no side effects. It's `stable`, owned by `postgres`, and executable only by `authenticated`.

### `public.handle_new_user()` trigger (SECURITY DEFINER)
`AFTER INSERT ON auth.users`. Inserts a `profiles` row from `new.raw_user_meta_data`:
- `display_name`: trimmed. If it's missing or the wrong length, it falls back to the email local-part, truncated, or to `'Student'`.
- `student_status`: used if it's `'incoming'` or `'current'`, otherwise `'incoming'`.
- `revoke execute ... from public, anon, authenticated`: only the trigger mechanism runs it.

SECURITY DEFINER is needed because the trigger fires in the auth service's context, which can't write to `public.profiles`. The fallbacks mean a crafted sign-up payload can neither break sign-up nor store invalid data.

### `public.set_updated_at()` trigger (invoker)
`BEFORE UPDATE ON profiles`, sets `updated_at = now()`.

### `public.create_group_for_university()` trigger (invoker)
`AFTER INSERT ON universities`, inserts the matching `groups` row so the one-group-per-university invariant can't be forgotten. Only migrations insert universities.

## 5. Grants (automatic exposure is disabled, so every grant is explicit)

`anon` gets **nothing**. The only public page (landing) is static.

| Table | `authenticated` privileges |
|---|---|
| `profiles` | `SELECT`; `UPDATE (display_name, student_status)` |
| `universities` | `SELECT` |
| `groups` | `SELECT` |
| `group_members` | `SELECT`; `INSERT (group_id)`; `DELETE` |
| `posts` | `SELECT`; `INSERT (group_id, title, body)`; `DELETE` |
| `comments` | `SELECT`; `INSERT (post_id, body)`; `DELETE` |

Column-level INSERT grants leave out `author_id` / `user_id`. A client that tries to send one gets a permission error, and the column is filled by `DEFAULT auth.uid()`. There's no UPDATE on posts or comments, and no INSERT on profiles (the trigger creates them).

Each migration begins with `revoke all on <table> from anon, authenticated;` before granting, so the end state is explicit.

## 6. RLS policies

RLS is enabled on all six tables. Policies target `to authenticated` and use `(select auth.uid())`, so the value is evaluated once per statement.

| Table | Operation | Policy |
|---|---|---|
| `profiles` | SELECT | `true` (only public columns exist) |
| | UPDATE | USING / WITH CHECK `id = (select auth.uid())` |
| `universities` | SELECT | `true` |
| `groups` | SELECT | `true` (non-members can see that a group exists) |
| `group_members` | SELECT | `user_id = (select auth.uid()) or public.is_group_member(group_id)` |
| | INSERT | WITH CHECK `user_id = (select auth.uid())` |
| | DELETE | USING `user_id = (select auth.uid())` |
| `posts` | SELECT | `public.is_group_member(group_id)` |
| | INSERT | WITH CHECK `author_id = (select auth.uid()) and public.is_group_member(group_id)` |
| | DELETE | USING `author_id = (select auth.uid())` |
| `comments` | SELECT | `exists (select 1 from public.posts p where p.id = post_id and public.is_group_member(p.group_id))` |
| | INSERT | WITH CHECK `author_id = (select auth.uid()) and exists (… same membership check …)` |
| | DELETE | USING `author_id = (select auth.uid())` |

Notes:
- DELETE also requires the row to be visible under the SELECT policy. Someone who has left a group therefore can't delete their old posts until they rejoin. This is an accepted MVP behavior and is listed as an open question.
- Deleting a post cascades to its comments, including other users' comments. That follows from "author may delete their post".

## 7. Migrations and seed data

Planned files in `supabase/migrations/` (timestamps assigned when created):

| Migration | Content | Milestone |
|---|---|---|
| `…_create_profiles.sql` | enum, `profiles`, `handle_new_user`, `set_updated_at`, grants, RLS | M2 |
| `…_create_communities.sql` | `pg_trgm`, `universities`, `groups`, `group_members`, `is_group_member`, group trigger, indexes, grants, RLS | M2 |
| `…_create_discussions.sql` | `posts`, `comments`, indexes, grants, RLS | M2 |
| `…_seed_universities.sql` | generated inserts (`on conflict (ipeds_unit_id) do nothing`) | M3 |

**University data source**: U.S. Department of Education **College Scorecard** "Most Recent Institution-Level Data" (IPEDS-derived, public domain, attributed in the app footer and README). `scripts/import-universities.ts` reads the downloaded CSV, filters it, and writes the seed migration for review. Proposed filter, to be confirmed against the data dictionary in M3:
- predominantly bachelor's-degree-granting (`PREDDEG = 3`)
- currently operating
- 50 states + DC

The result is expected to be roughly 2,000–2,300 rows. The seed is a **migration** rather than `seed.sql` because production needs the data too.

Generated TypeScript types: `supabase gen types typescript --local > src/types/database.types.ts`, rerun after every schema migration.

## 8. RLS test plan (pgTAP, `supabase/tests/`)

Tests create users A and B and impersonate them with `set local role authenticated` plus `set local request.jwt.claims`. Every case checks both the allowed and the forbidden path.

| # | Scenario | Expected |
|---|---|---|
| 1 | `anon` selects from any table | permission denied |
| 2 | A updates B's profile | 0 rows affected |
| 3 | A updates own `display_name` to 1 char | check violation |
| 4 | A reads profiles | sees `display_name`/`student_status` only; no email column exists |
| 5 | A joins group G | ok; joining again → unique violation |
| 6 | A inserts membership with `user_id = B` | permission denied (column not granted) |
| 7 | A deletes B's membership | 0 rows affected |
| 8 | Non-member B selects posts in G | 0 rows |
| 9 | Non-member B inserts post in G | RLS violation |
| 10 | Member A inserts post with explicit `author_id = B` | permission denied |
| 11 | Member A inserts post | ok, `author_id = A` |
| 12 | Member B deletes A's post | 0 rows affected |
| 13 | A deletes own post | ok; its comments cascade |
| 14 | Non-member comments on a post in G | RLS violation |
| 15 | B (non-member) calls `is_group_member(G)` | `false`; cannot learn about A |
| 16 | `authenticated` executes `handle_new_user()` directly | permission denied |
| 17 | `authenticated` inserts/updates `universities` or `groups` | permission denied |
| 18 | A leaves G, then selects posts in G | 0 rows |
