---
description: Implement only the plan approved earlier in this conversation, then check and stop.
argument-hint: [optional note, e.g. "with the copy change we agreed"]
---

Implement the plan that was approved earlier in this conversation. Extra note from the user: $ARGUMENTS

Rules:
- If no plan has been approved in this conversation, say so and stop. Suggest `/ew-plan <task>`.
- Implement **only** what the approved plan lists. Touch no unrelated files. If you find something else that needs fixing, note it in the report and leave it.
- Follow `CLAUDE.md`: semantic tokens only (no raw hex, no gradients, no other hues), brand is always `ecommercewisers`, never the word "premium", no invented clients, metrics or reviews.
- Add no dependency unless the approved plan names it. If one turns out to be needed, stop and ask.
- Check `node_modules/next/dist/docs/` before using a Next.js API you have not used in this project yet.

When the code is done:
1. Run `npm run check`. If it fails, fix what your change caused and run it again. Report anything that still fails.
2. Update `docs/PROGRESS.md`: move the task to Completed and set the next task. Tick the item in `docs/PLAN.md` if it is finished.
3. Report: the files changed (one line each), the check result, and anything left for `/ew-review`.
4. Stop. Do not commit unless the user asks.
