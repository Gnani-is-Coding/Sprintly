# Sprintly

A multi-user SaaS-style project management app — a Jira + Trello hybrid built for learning modern frontend architecture.

## Tech Stack

- **React 19** (Vite + SWC)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (component library)
- **Redux Toolkit** (client/global UI state)
- **React Query** (server/async state)
- **React Router** (routing)
- **@dnd-kit** (drag and drop)
- **Bun** (package manager & runtime)

## State Management Philosophy

- **React Query** — all server data: projects, boards, columns, cards, users, comments
- **Redux Toolkit** — UI-only state: modals, drawers, selected items, filters, view preferences
- **Local state** — form inputs, inline editing toggles, dropdown open/close

Redux should **never** store fetched server data.

## Project Structure

```
src/
  features/       → feature-based modules (projects, board, cards)
  store/           → Redux slices (UI state only)
  lib/             → API client, query keys, utils
  components/      → shared UI components (shadcn wrappers, layout)
  pages/           → route-level page components
```

## Getting Started

```bash
bun install
bun run dev
```

## Roadmap

See [TODO.md](./TODO.md) for the full phase-by-phase plan.
