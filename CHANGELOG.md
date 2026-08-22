# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Phase 2 — Backend Core
- Models: `Category` (id, unique `name`, `color`) and `Expense` (id, `amount` with `CHECK(amount > 0)`, `description`, `category_id` FK, `transaction_date`, `notes`, `created_at`), with a two-way relationship (`backend/app/models/category.py`, `backend/app/models/expense.py`)
- Alembic initialized and configured to read `DATABASE_URL` from `.env` and autogenerate from `Base.metadata` (`backend/alembic/env.py`); three migrations applied: initial schema (`categories` + `expenses`), add `notes` to `expenses`, and a no-op revision from a redundant autogenerate run
- Full CRUD for both resources: `backend/app/schemas/{category,expense}.py` (Pydantic `Base`/`Create`/`Update`/`Read` schemas, field validation mirroring DB constraints) and `backend/app/routers/{categories,expenses}.py` (POST/GET/GET-one/PUT/DELETE, 404 on missing records, FK-existence checks on expense create/update), registered in `main.py` under `/api`
- `/create-table` and `/add-endpoint` skills updated to encode these patterns (FK-table clarification rule, schema/router/router-registration structure) for scaffolding future resources

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
