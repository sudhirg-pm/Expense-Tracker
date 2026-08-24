# Bugs

Track bugs discovered during development. Log them here, fix them, and note the resolution.

## BUG-001: CORS middleware allowed all HTTP methods
- **Found in:** Phase 4, Integration hardening
- **Severity:** Medium
- **Description:** `CORSMiddleware` in `backend/app/main.py` was configured with `allow_methods=["*"]`, permitting any HTTP method (including ones the API never intends to expose) from allowed origins instead of only the methods the app actually needs.
- **Root cause:** AI-generated code defaults to broad, convenient wildcards (`allow_methods=["*"]`) rather than the least-privilege set — AI-written code is not optimized for security by default and needs an explicit security pass to tighten configuration like this.
- **Fix:** Replaced the wildcard with an explicit list of the methods the API actually uses: `allow_methods=["GET", "POST", "PUT", "DELETE"]`.
- **Status:** Fixed

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
