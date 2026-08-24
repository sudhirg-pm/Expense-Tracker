# Requirements

Features organized by phase. Check them off as you complete each one.

## Phase 1 — Foundation
- [x] Backend project scaffold (FastAPI + SQLite)
- [x] Health endpoint (`GET /api/health`)
- [x] Frontend project scaffold (React + Vite)
- [x] Frontend routing setup with placeholder pages
- [x] `/add-endpoint` custom skill created

## Phase 2 — Backend Core
- [x] Database models for main resource
- [x] Database models for secondary resource (categories/analytics/statuses)
- [x] Alembic migrations set up with initial schema
- [x] CRUD endpoints: Create
- [x] CRUD endpoints: Read (list + detail)
- [x] CRUD endpoints: Update
- [x] CRUD endpoints: Delete
- [x] Input validation with Pydantic schemas
- [ ] CLAUDE.md updated with backend conventions

## Phase 3 — Frontend Core
- [x] Main list/table page
- [x] Add/edit form with validation
- [x] API client module (fetch wrapper)
- [x] Delete with confirmation
- [x] `/add-component` custom skill created
- [x] Tailwind CSS integrated for styling

## Phase 4 — Integration
- [ ] CORS configured (NOT wildcard `*`)
- [ ] Frontend connected to backend API
- [ ] Full create → list → delete flow working in browser
- [ ] Filter/search functionality (1-shot health check)
- [ ] Bugs logged in BUGS.md

## Phase 5 — Parallel Work
- [ ] Feature A branch (search/filter)
- [ ] Feature B branch (export/report)
- [ ] Both features built with parallel Claude instances
- [ ] Branches merged cleanly
- [ ] `.mcp.json` for GitHub MCP (optional)

## Phase 6 — Testing
- [ ] Backend API tests (pytest with in-memory SQLite)
- [ ] Frontend component tests (Vitest + React Testing Library)
- [ ] Test coverage reviewed and gaps filled on critical paths

## Phase 7 — Hardening
- [ ] Security review completed (SQL injection, CORS, input validation)
- [ ] Accessibility audit completed
- [ ] `/review-diff` custom skill created
- [ ] Lint hook set up (PostToolUse)
- [ ] Diff review exercise completed

## Phase 8 — CI/CD
- [ ] GitHub Actions workflow (tests + linting on push/PR)
- [ ] CI passing on GitHub
- [ ] Branch protection configured (optional)

## Phase 9 — Docker & Ship
- [ ] Backend Dockerfile
- [ ] Frontend Dockerfile
- [ ] docker-compose.yml
- [ ] App runs with `docker compose up --build`
- [ ] App accessible in browser
- [ ] Tagged `v1.0`
