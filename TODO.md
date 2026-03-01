# Sprintly — Phase Plan

---

## Backend:

### Auth System

- [x] `POST /auth/register` — validate input (Zod), check duplicate email, hash password (bcrypt), create user, return access token + set refresh token cookie
- [x] `POST /auth/login` — validate input (Zod), lookup user, compare password hash, return access token + set refresh token cookie
- [ ] `POST /auth/refresh` — validate refresh token from httpOnly cookie, issue new access token (+ rotate refresh token)
- [ ] `POST /auth/logout` — clear refresh token cookie, invalidate refresh token in DB
- [ ] `GET /auth/me` — return current user profile from access token (for page refresh hydration)
- [ ] Auth middleware — verify access token on protected routes, attach `req.user`
- [ ] Refresh token storage in DB (so tokens can be revoked per-user or per-session)
- [ ] Refresh token rotation — issue new refresh token on each refresh, invalidate the old one

### Security

- [ ] CSRF protection on `/auth/refresh` endpoint (custom header validation or double-submit cookie)
- [ ] Cookie config: `httpOnly`, `Secure`, `SameSite=Strict`, proper `Path` and `maxAge`
- [ ] Rate limiting on `/auth/login` and `/auth/register` (e.g., express-rate-limit — prevent brute force)
- [ ] Password complexity validation (min length, etc.) via Zod schema in `@sprintly/shared`
- [ ] Helmet.js for security headers
- [ ] CORS config — whitelist frontend origin only

### Shared Package (`@sprintly/shared`)

- [ ] Zod schemas: `loginSchema`, `registerSchema` (email, password validation) — shared between frontend + backend
- [ ] Shared TypeScript types: `User`, `AuthResponse`, `TokenPayload`
- [ ] API error response types (consistent error shape across all endpoints)

### CRUD (after auth is solid)

- [ ] Projects CRUD endpoints
- [ ] Boards CRUD endpoints
- [ ] Columns CRUD endpoints
- [ ] Cards CRUD endpoints

---

## Frontend:

## Phase 1 — MVP (Core Kanban)

- [x] Set up routing (Boards list, Board-Detail view)
- [ ] Boards CRUD (create, list, delete)
- [ ] Board-Column CRUD (create, rename, reorder, delete)
- [ ] Column-Cards CRUD (create, edit, delete)
- [x] Card detail modal design
- [ ] Drag and drop Fuctionality
- [ ] Redux slices:
  - filtersSlice — active label, assignee, priority, date filters
  - uiSlice — view mode, card density, sidebar state
  - selectionSlice — selected card IDs for bulk ops
  - dragSlice - whats been dragged right now.
- [ ] React Query setup and all data fetching/mutations
- [ ] Generic n Global error handling.

## Phase 2 — Card Enrichment

- [ ] Assignee 1:many for a at workspace level.
- [ ] Labels (create, assign, color-coded)
- [ ] Priority Tags (P0–P3)
- [ ] Due dates + overdue indicators
- [ ] Checklists / subtasks within cards

## Phase 3 — Collaboration & Activity

- [ ] Auth (real or simulated multi-user)
- [ ] Comments on cards
- [ ] Activity timeline per card
- [ ] Reporter vs Assignee
- [ ] Member management per project

## Phase 4 — Search, Filters & Views

- [ ] Filter by assignee, label, priority, due date
- [ ] Search across cards ( Board level search, Workspce-Project level )
- [ ] Sort by priority / date
- [ ] List/Table view toggle
- [ ] Loading & error states polished per feature

## Phase 5 — Jira-like Features

- [ ] Sprints + backlog
- [ ] Epics
- [ ] Story points / estimation
- [ ] Custom status workflows
- [ ] Board templates

## Phase 6 — Polish & Scale

- [ ] Drag-and-drop optimistic updates (refined)
- [ ] Drag-Drop history, fro UNDO, REDO actions.
- [ ] Real-time sync (WebSocket/SSE)
- [ ] Notifications
- [ ] Bulk actions
- [ ] Dark mode
- [ ] Keyboard shortcuts
- [ ] Pagination / lazy loading
- [ ] Undo / redo
- [ ] User specific-Permissions (viewer/editor)
- [ ] Performance optimizations
- [ ] Testing cases as well using a Testing frameWorks.
