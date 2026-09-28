---
description: Report current phase, what is done, what is next and any blockers. Read only.
allowed-tools: Read, Glob, Grep, Bash(git status:*), Bash(git log:*)
---

Report the status of the ecommercewisers project. **Read only: change nothing.**

1. Read `docs/PROGRESS.md` and `docs/PLAN.md`.
2. Run `git log --oneline -5` and `git status --short`.
3. Report, briefly:
   - **Phase**: the current phase and task.
   - **Done**: the completed phases and tasks (from `PLAN.md` checkboxes).
   - **Next**: the next task and which `/ew-*` command starts it.
   - **Blockers / known issues**: from `PROGRESS.md`.
   - **Working tree**: uncommitted changes, if any, and whether they match the current task.
   - Flag any mismatch between the docs and git (for example, a phase marked done with no commit).
