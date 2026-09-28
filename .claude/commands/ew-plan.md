---
description: Analyze a task and produce an implementation plan for approval. Edits nothing.
argument-hint: <task, e.g. "Hero section">
allowed-tools: Read, Glob, Grep, Bash(git status:*), Bash(git diff:*), Bash(git log:*)
---

Plan this task for ecommercewisers: **$ARGUMENTS**

This is the Analyze and Plan step of the controlled workflow. **Do not create, edit or delete any file. Do not install anything.**

1. Read `CLAUDE.md`, `docs/PROGRESS.md` and `docs/DESIGN.md`. Read `docs/PLAN.md` if the task's place in the roadmap is unclear.
2. **Milestone check.** The current milestone is the homepage only. If the task touches Services, About, Portfolio or Contact pages, or anything outside the current phase in `docs/PROGRESS.md`, say so, refuse it and stop.
3. Inspect the code the task touches: existing components in `src/`, the tokens in `src/app/globals.css`, and the relevant guide in `node_modules/next/dist/docs/` for any Next.js API you plan to use.
4. Output the plan with these headings:
   - **Goal**: one or two sentences.
   - **Files**: each file to create or change, with one line on why.
   - **Reuse**: existing components, tokens and utilities to use. Name any new dependency and why it is needed (the default is none).
   - **Responsive**: behaviour at mobile (≤640px), tablet (641–1024px) and desktop (≥1025px).
   - **Accessibility**: landmarks, heading order, focus, keyboard, labels, contrast (which tokens, on which background).
   - **Risks**: what could break, and open questions.
   - **Verification**: the checks you will run after implementing.
5. End with: "Approve this plan to run `/ew-implement`, or tell me what to change." Then stop.
