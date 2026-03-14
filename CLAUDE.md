# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server (proxies /api and /oauth to https://course.sjtu.plus)
yarn build      # Type-check with tsc, then build with Vite
yarn lint       # Run ESLint (zero warnings allowed)
yarn format     # Prettier format src/
yarn preview    # Preview the production build
```

No test runner is wired up yet (jest is listed as a devDependency but has no config).

## Architecture

This is the frontend for **SJTU选课社区** (SJTU Course Review Community) — a React 19 + TypeScript + Vite SPA.

### Directory layout

| Path | Purpose |
|---|---|
| `src/pages/` | Route-level page components (one file per route) |
| `src/components/` | Reusable UI components |
| `src/services/` | API layer — SWR hooks (`use*`) and plain async functions |
| `src/lib/models.ts` | All shared TypeScript types |
| `src/lib/context.ts` | `CommonInfoContext` — global app state passed via React context |
| `src/lib/config.ts` | App-level constants (page size, jAccount client ID, tag colors) |
| `src/lib/touchpoint.ts` | Promotion touchpoint IDs |
| `src/lib/utils.ts` | Antd form validation rules |

### Key patterns

**Routing**: `App.tsx` defines all routes with React Router v7. Two layouts exist: `BasicLayout` (authenticated pages) and `LoginLayout` (login flow). `BasicLayout` redirects to `/login` on any 403 response.

**Global state**: `BasicLayout` calls `useCommonInfo()` which fetches `/api/common/` once on load. The result (`CommonInfo`) is provided via `CommonInfoContext` to all child pages. It contains the current user, semesters, announcements, the user's reviews, enrolled courses, and promotions. Pages access this with `useContext(CommonInfoContext)`.

**Data fetching**: Services in `src/services/` follow two patterns:
- SWR hooks (`useSWR`) for reactive data — e.g. `useCourseDetail(id)`
- Plain async functions for mutations — e.g. `changeCourseNotificationLevel(...)`

The shared axios instance (`src/services/request.ts`) sets `withCredentials: true` and handles Django CSRF via `csrftoken` cookie → `X-CSRFToken` header.

**UI**: Ant Design v6 with Chinese locale (`zhCN`). Dark mode is detected via `prefers-color-scheme` media query and applied through Antd's `theme.darkAlgorithm`. Primary brand color is `#1DA57A`.

**Path alias**: `@` resolves to `./src` (configured in `vite.config.ts`).

**Markdown**: Reviews support Markdown rendering via `react-markdown` with `remark-gfm`, `remark-breaks`, and `rehype-sanitize`. There are both preview (`md-preview.tsx`) and editor (`md-editor.tsx`) components.
