---
name: add-endpoint
description: Scaffold full CRUD FastAPI endpoints for a resource following project conventions
disable-model-invocation: true
argument-hint: "[resource-name]"
allowed-tools: Read, Edit, Write, Bash
---

Create CRUD API endpoints for the $ARGUMENTS resource, following the pattern established in `backend/app/schemas/expense.py`, `backend/app/routers/expenses.py`, and their registration in `backend/app/main.py`.

Current project structure:
!`find backend/app -type f -name "*.py" | head -20`

Current routers:
!`ls backend/app/routers/ 2>/dev/null`

Current models:
!`ls backend/app/models/ 2>/dev/null`

Requirements:
- The SQLAlchemy model for the resource must already exist in `backend/app/models/`. If it does not, STOP and tell the user to create it first (e.g. via the `create-table` skill) rather than inventing one here.
- Create a Pydantic schema file `backend/app/schemas/<resource>.py` with:
  - A `<Resource>Base` with the shared fields
  - `<Resource>Create(<Resource>Base)` for POST bodies
  - `<Resource>Update(<Resource>Base)` for PUT bodies (full replace, not partial/PATCH)
  - `<Resource>Read(<Resource>Base)` with `model_config = ConfigDict(from_attributes=True)`, adding `id` and any server-generated fields (e.g. `created_at`)
  - Mirror any DB-level constraints as Pydantic field validation (e.g. a positive-amount `CheckConstraint` becomes `Field(gt=0)`)
- Create a router file `backend/app/routers/<resource>.py` with:
  - `router = APIRouter(prefix="/<resources>", tags=["<resources>"])`
  - `POST ""` — create, 201, validate any foreign keys exist first (404 if not) before inserting
  - `GET ""` — list all
  - `GET "/{id}"` — get one, 404 if missing
  - `PUT "/{id}"` — full update, 404 if missing, re-validate foreign keys
  - `DELETE "/{id}"` — delete, 204, 404 if missing
  - All routes take `db: Session = Depends(get_db)` from `app.database`
  - Use a small `_get_<resource>_or_404` helper to avoid repeating the 404 lookup
- Register the router in `backend/app/main.py` via `app.include_router(<resource>.router, prefix="/api")`
- Do NOT create tests (handled separately)
- Do NOT add comments to obvious code
- After scaffolding, verify by running the app (`uvicorn app.main:app --port <test-port>`) and curling through create → list → get → update → delete → 404-after-delete, then stop the server and delete any throwaway `.db` file
