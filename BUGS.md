# Bugs

Track bugs discovered during development. Log them here, fix them, and note the resolution.

## BUG-001: CORS middleware allowed all HTTP methods
- **Found in:** Phase 4, Integration hardening
- **Severity:** Medium
- **Description:** `CORSMiddleware` in `backend/app/main.py` was configured with `allow_methods=["*"]`, permitting any HTTP method (including ones the API never intends to expose) from allowed origins instead of only the methods the app actually needs.
- **Root cause:** AI-generated code defaults to broad, convenient wildcards (`allow_methods=["*"]`) rather than the least-privilege set — AI-written code is not optimized for security by default and needs an explicit security pass to tighten configuration like this.
- **Fix:** Replaced the wildcard with an explicit list of the methods the API actually uses: `allow_methods=["GET", "POST", "PUT", "DELETE"]`.
- **Status:** Fixed

## BUG-002: Hardcoded, non-default API base URL in frontend client
- **Found in:** Phase 4, category filter debugging
- **Severity:** Medium
- **Description:** `frontend/src/api/client.js` hardcodes `BASE_URL = 'http://localhost:8001'` — a non-standard port — with no environment-based configuration and nothing in `.env.example` or `CLAUDE.md` documenting the divergence from the default `--port 8000` used in the documented `uvicorn` command.
- **Root cause:** Temporary workaround adopted while debugging an unkillable process squatting port 8000 during a live session; the change was never reverted or turned into a proper env-driven setting, so it silently breaks the app for anyone running the backend on the documented default port.
- **Fix:** Not yet applied. Options: revert to `8000` once the stuck process is cleared, or read the base URL from a Vite env var (e.g. `import.meta.env.VITE_API_URL`) with `8000` as the documented default.
- **Status:** Open

## BUG-003: Category filter selection is lost on navigation
- **Found in:** Phase 4, `ExpensesPage.jsx` filter feature
- **Severity:** Low
- **Description:** The selected category filter lives only in local `useState` on `ExpensesPage`. Navigating away (e.g. clicking "Add New" to create an expense) and back remounts the page, silently resetting the filter to "All categories" even though the user had a specific category selected.
- **Root cause:** Filter state has no persistence across route changes (no URL query param, no storage) — consistent with the "no global state management" simplicity goal, but the reset happens invisibly instead of being an explicit user action.
- **Fix:** Not yet applied. Could sync the filter to a URL search param (`?category_id=`) so it survives navigation and is bookmarkable/shareable.
- **Status:** Open

## BUG-004: CORS `allow_headers` still wildcarded
- **Found in:** Phase 4, `backend/app/main.py`
- **Severity:** Low
- **Description:** `CORSMiddleware` still sets `allow_headers=["*"]` even after BUG-001 tightened `allow_methods`. `CLAUDE.md`'s "What NOT to Do" explicitly says not to set CORS to `*`.
- **Root cause:** Same root cause as BUG-001 (AI-generated code defaults to broad wildcards); only the methods wildcard was caught in that pass, headers was overlooked.
- **Fix:** Not yet applied. Should be narrowed to the headers actually sent (`Content-Type`).
- **Status:** Open

<!--
Format:

## BUG-001: [Short description]
- **Found in:** Phase N, Step X.Y
- **Severity:** Low / Medium / High
- **Description:** What's wrong
- **Root cause:** Why it happened
- **Fix:** What was changed
- **Status:** Open / Fixed (commit hash)
-->
