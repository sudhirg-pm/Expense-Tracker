# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Phase 3 — Frontend Core
- Tailwind CSS integrated (`@tailwindcss/vite` plugin, imported in `frontend/src/index.css`) for utility-first styling across all pages; `CLAUDE.md` tech stack updated
- `ExpensesPage.jsx` built as the main list/table: fetches expenses and categories from the API client, resolves category names, handles loading/empty/error states, and includes a per-row Delete button guarded by `window.confirm` and wired to `deleteExpense`
- `ExpensesForm.jsx` reusable add/edit form (HTML5 validation: required fields, `type="number"` amount with `min`/`step`) supporting an optional existing item for edit mode, plus `AddExpensePage.jsx` and an `expenses/new` route; "Add New" on the list links to it
- `frontend/src/api/client.js`: single fetch wrapper (`request`) handling JSON parsing, 204 responses, and a thrown `ApiError` on non-2xx responses, with list/get/create/update/delete functions for both `expenses` and `categories`
- `/add-component` custom skill created (`.claude/skills/add-component/SKILL.md`) and used to scaffold `CategoriesPage.jsx`, `CategoriesForm.jsx`, and `AddCategoryPage.jsx` mirroring the Expenses pattern, wired into routing and nav

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
