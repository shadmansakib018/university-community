# Product Requirements Document — University Community

Status: Approved · Owner: project team · Last updated: 2026-10-12

## 1. Problem

Incoming university students have few trustworthy places to ask questions about the school they are about to attend. Current students have the answers but are scattered across unofficial group chats and social networks. This app is a single, university-scoped discussion space that connects the two groups.

## 2. Users

| Persona | Description | Primary needs |
|---|---|---|
| Incoming student | Admitted or deciding; not yet enrolled | Find their university, ask questions, read advice |
| Current student | Enrolled at a university | Answer questions, share experience, discuss with peers |

Student status is **self-reported** and is not verified in the MVP.

## 3. Goals and non-goals

### Goals (MVP)
- Students can create an account, confirm their email, and sign in securely.
- Students can find any US 4-year degree-granting university and join its community.
- Members can read and write text posts and flat comments in that community.
- The server (Supabase RLS) enforces all access rules, not just the UI.
- Clean, responsive, accessible UI on desktop and mobile.

### Non-goals (explicitly out of scope)
Direct messaging, real-time chat, notifications, AI features, recommendation algorithms, nested comment threads, multiple groups per university, image or file uploads, post/comment editing, moderation and reporting tools, student-status verification, account deletion UI.

## 4. Business rules

1. Exactly one community group exists per university.
2. A user may join many groups but each group only once.
3. Only members can see a group's posts and comments.
4. Only members can create posts and comments in a group.
5. Only the author can delete their own post or comment. Deleting a post deletes its comments.
6. Posts are text only (title + body). Comments are flat (no replies to comments).
7. Feeds are ordered newest first. Comments within a post are ordered oldest first, which reads naturally as a conversation.
8. After a user leaves a group, their existing posts remain visible to members, and the user loses access until they rejoin.

## 5. Features and user stories

### 5.1 Authentication
- **Sign up**: As a visitor, I can register with email, password, display name and student status.
  - Acceptance: inline validation; on success I see a "check your email" screen; duplicate emails show a friendly error.
- **Email confirmation**: Clicking the link confirms my account and signs me in at the dashboard.
- **Log in / log out**: Wrong credentials show a generic error (no account enumeration). Log out returns to the landing page.
- **Persistent sessions**: Reloading or reopening the browser keeps me signed in until I log out or the session expires.
- **Protected routes**: Visiting a protected page while signed out redirects to login and returns me to the original page afterwards.
- **Password reset**: I can request a reset email, follow the link, and set a new password.

### 5.2 Profile
- I can view and edit my display name and student status (Incoming / Current).
- I can see my account email (read from my own session) and when I joined.
- Other users see only my display name and student status, never my email.

### 5.3 Dashboard
- Shows cards for the groups I've joined: university name, city/state, and a link into the group.
- Has a prominent "Discover universities" action.
- Shows an empty state with a call to action when I've joined no groups.

### 5.4 University discovery
- I can search universities by name (minimum 2 characters, debounced).
- Results show name, city and state, plus a Join or Leave/"Joined" control.
- Joining is idempotent: I can't create duplicate memberships.
- Data comes from the U.S. Department of Education College Scorecard (IPEDS-based), filtered to currently operating, predominantly bachelor's-degree-granting institutions.

### 5.5 Group feed and discussions
- Members see the group's posts, newest first, 20 per page, with "Load more".
- Each post shows title, body preview, author display name, student status badge and relative timestamp.
- Members can create a post (title + body).
- Opening a post shows the full post and its comments, and members can add comments.
- Authors see a Delete action on their own posts and comments, which asks for confirmation first.
- Non-members who open a group URL see the university info and a "Join to see the discussion" prompt, not the posts.

## 6. Validation limits

Enforced in the UI **and** by database CHECK constraints.

| Field | Rule |
|---|---|
| Email | Valid email format (Supabase validates too) |
| Password | 8–72 characters (72 is the bcrypt limit) |
| Display name | 2–50 characters after trimming |
| Student status | `incoming` or `current` |
| Post title | 3–150 characters after trimming |
| Post body | 1–5,000 characters after trimming |
| Comment body | 1–2,000 characters after trimming |
| University search | 2–100 characters; `%` and `_` escaped |

## 7. Non-functional requirements

- **Security**: RLS on every public table; explicit least-privilege GRANTs; no service-role key in the frontend; author IDs come from the session, never the client.
- **Accessibility**: WCAG 2.1 AA contrast, keyboard navigable, labelled form controls, visible focus, semantic landmarks.
- **Responsive**: usable from 360 px wide upward.
- **Performance**: university search responds in under 500 ms on the full dataset (trigram index); feed pages limited to 20 posts.
- **UX states**: every data view has loading, empty, error, and success states.

## 8. Success criteria for the course MVP

- All user stories above pass their acceptance criteria.
- RLS tests show both allowed and forbidden operations behave correctly.
- Playwright covers sign up → join → post → comment → delete.
- `lint`, `typecheck`, `test` and `build` pass. The app is deployed on Vercel.
