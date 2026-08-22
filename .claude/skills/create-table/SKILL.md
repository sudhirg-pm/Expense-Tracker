---
name: create-table
description: Scaffold a new SQLAlchemy model (database table) following project conventions
disable-model-invocation: true
argument-hint: "[table-name] [field: type, ...]"
allowed-tools: Read, Edit, Write, Bash
---

Create a new SQLAlchemy model for $ARGUMENTS following the existing patterns in the codebase.

Current models:
!`ls backend/app/models/ 2>/dev/null`

Requirements:
- Put the model in `backend/app/models/`, one file per model, named after the table (singular, snake_case, e.g. `expense.py` for `expenses`)
- Use `Mapped` / `mapped_column` typed declarative style, matching `backend/app/models/expense.py` and `backend/app/models/category.py`
- Use proper column types and constraints: `nullable=False` on required fields, `unique=True` where appropriate, `CheckConstraint` for value rules (e.g. positive amounts), and dedicated date/time columns for business dates
- Do NOT reuse `created_at` for business dates — add a specific field (e.g. `transaction_date`, `due_date`) and keep `created_at` as a `server_default=func.now()` record-creation timestamp only
- For every foreign key: if the referenced table is not clear or does not already exist in `backend/app/models/`, STOP and ask the user for that table's fields before creating it — do not invent a schema for a referenced table
- Once the referenced table's fields are confirmed, create that table's model too (if it doesn't exist), with a `relationship()` back-reference (`back_populates`) on both sides
- Register every new model in `backend/app/models/__init__.py`
- Verify the model by running `Base.metadata.create_all(bind=engine)` against a throwaway SQLite file and confirming the FK relationship resolves in both directions, then delete the throwaway `.db` file
- Do NOT add comments to obvious code
