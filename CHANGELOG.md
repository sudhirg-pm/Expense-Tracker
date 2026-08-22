# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Phase 1 — Foundation
- Backend scaffold: FastAPI app (`backend/app/main.py`), SQLAlchemy engine/session setup reading `DATABASE_URL` from `.env` (`backend/app/database.py`), `requirements.txt` (fastapi, uvicorn, sqlalchemy, pydantic, python-dotenv, alembic)
- `GET /api/health` and `GET /api/ping` endpoints, with CORS restricted to `CORS_ORIGINS` from `.env` (ahead of Phase 4's CORS item)
- Frontend scaffold via `npm create vite@latest -- --template react`, with `react-router-dom` added
- Routing: `App.jsx` (BrowserRouter), `Layout.jsx` (nav + Outlet), `HomePage.jsx` and `ExpensesPage.jsx` placeholder pages
- `/add-endpoint` custom skill created (`.claude/skills/add-endpoint/SKILL.md`)

### Phase 0 — Setup
- Initial project setup with CLAUDE.md, tracking files, and permissions
- Chose Expense Tracker with FastAPI + React + Vite + SQLite stack

<!--
Format for future entries:

### Phase N — [Phase Name]
- What was added, changed, or fixed
- Keep it brief — one line per meaningful change
- Date: YYYY-MM-DD
-->
