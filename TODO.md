# Sprintly — Phase Plan

## Phase 1 — MVP (Core Kanban)

- [ ] Set up routing (projects list, board view)
- [ ] Project CRUD (create, list, delete)
- [ ] Board per project (1:1 for now)
- [ ] Column CRUD (create, rename, reorder, delete)
- [ ] Card CRUD (create, edit, delete)
- [ ] Card detail modal/drawer (title, description)
- [ ] Drag and drop (cards between columns, column reorder)
- [ ] Redux slices: modal state, selected card, active filters (empty)
- [ ] React Query: all data fetching/mutations

## Phase 2 — Card Enrichment

- [ ] Assignee (single user, fake auth / hardcoded user)
- [ ] Labels (create, assign, color-coded)
- [ ] Priority levels (P0–P3)
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
- [ ] Search across cards
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
- [ ] Real-time sync (WebSocket/SSE)
- [ ] Notifications
- [ ] Bulk actions
- [ ] Dark mode
- [ ] Keyboard shortcuts
- [ ] Pagination / lazy loading
- [ ] Undo / redo
- [ ] Permissions (viewer/editor)
- [ ] Performance optimization pass
