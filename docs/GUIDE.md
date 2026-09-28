# ecommercewisers developer guide

How the ecommercewisers website is built, phase by phase, with Claude Code. The source of truth is `.claude/reference/Ecomwiser_Claude_Code_Complete_Guide.docx`. This guide applies it to this repo.

- **Rules:** `CLAUDE.md` · **Roadmap:** `docs/PLAN.md` · **Design system:** `docs/DESIGN.md` · **Status:** `docs/PROGRESS.md`
- **Current milestone:** the homepage only. Services, About, Portfolio and Contact wait for Phase 11.

## The controlled workflow

Every major task goes through the same cycle. Never give Claude one giant instruction such as "build the whole site".

| Step | What happens | Command |
|---|---|---|
| Analyze + Plan | Claude reads the docs and code, then writes a plan. No edits. | `/ew-plan <task>` |
| Approve | **You** approve, change or reject the plan. | (you) |
| Implement | Claude builds only the approved plan and runs `npm run check`. | `/ew-implement` |
| Test | typecheck, lint, build and the rule sweeps | `/ew-test` |
| Review | Findings ranked by severity. No edits. | `/ew-review` |
| Fix | Fix the findings you accept, then test again. | (ask Claude) |
| Update docs | `PROGRESS.md` and `PLAN.md` | part of `/ew-implement` |
| Commit | Only when you ask, after `npm run check` passes. | (ask Claude) |

Run `/ew-status` at any time to see where the project stands.

### When to add agents and skills

- **`.claude/agents/`**: add a subagent only when a task is repeated and self-contained, and it benefits from its own context. A likely first candidate is a read-only "a11y auditor" for Phase 7. One Markdown file per agent, with `name`, `description` and `tools` in the frontmatter.
- **`.claude/skills/`**: add a skill when a procedure with supporting files keeps recurring, for example "add a homepage section" with a template. One folder per skill with a `SKILL.md`.
- Neither folder has content yet. Don't add either one just to have it. The `/ew-*` commands cover the workflow.

---

## Phase 0: Project understanding
- **Goal:** find out exactly what the scaffold contains before anything changes.
- **Why it matters:** Next.js 16 and Tailwind 4 differ from older conventions (no `tailwind.config`, no `next lint`, generated route types). Wrong assumptions waste whole phases.
- **Files:** none change. The findings go into the Project snapshot in `docs/PROGRESS.md`.
- **Claude workflow:** the guide §8 analysis prompt, or `/ew-plan "Phase 0 analysis"`. Read only.
- **Commands:** `node -p "require('next/package.json').version"` (and the same for react, typescript, tailwindcss, eslint), `npx next --help`, `ls node_modules/next/dist/docs/`
- **Steps:** record the versions → the App Router tree → dependencies → public assets → config files → the styling system → anything that should change first.
- **Testing:** `git status` shows nothing changed.
- **Checklist:** ☐ versions recorded ☐ Tailwind major version checked ☐ issues listed with the phase that fixes them
- **Common mistakes:** changing files "while you're there"; assuming Tailwind 3 or a `tailwind.config`; skipping the bundled Next docs.

## Phase 1: Next.js foundation
- **Goal:** a clean, checked base with no boilerplate.
- **Why it matters:** every later phase relies on `npm run check`, and on secrets never reaching git.
- **Files:** `package.json` (the `typecheck` and `check` scripts), `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx`
- **Claude workflow:** `/ew-plan` → approve → `/ew-implement`
- **Commands:** `npm run check`, `git status`
- **Steps:**
  1. Add the scripts. `typecheck` runs `next typegen && tsc --noEmit`, because `LayoutProps` is generated.
  2. Gitignore the Claude local settings and plans.
  3. Remove the scaffold assets.
  4. Set the metadata.
  5. Make `page.tsx` a minimal placeholder.
- **Testing:** `npm run check` passes, and `git status` shows no `settings.local.json`, `settings.loca.json` or `.env*` file.
- **Checklist:** ☐ scripts ☐ gitignore confirmed before the first commit ☐ metadata ☐ placeholder page ☐ commit `Phase 1: Next.js foundation`
- **Common mistakes:** a bare `tsc --noEmit` on a clean checkout (it fails on `LayoutProps`); committing before checking `git status`; building homepage sections here.

## Phase 2: Claude Code configuration
- **Goal:** Claude works inside project rules and a repeatable workflow.
- **Why it matters:** `CLAUDE.md` loads every session. That is how the milestone, colour and brand rules survive a new session.
- **Files:** `CLAUDE.md`, `.claude/commands/ew-{plan,implement,test,review,status}.md`, `.claude/settings.json`, `.claude/agents/`, `.claude/skills/`
- **Claude workflow:** plan → approve → implement. Keep `CLAUDE.md` short, at about 120 lines.
- **Commands:** type `/ew-` in Claude Code, and all five commands should appear.
- **Steps:** append the rules under `@AGENTS.md` → write the commands → set the read-only and check permissions in `settings.json`.
- **Testing:** `settings.json` is valid JSON, `/ew-status` runs, and `npm run check` passes.
- **Checklist:** ☐ milestone, brand, "premium" and colour rules are in `CLAUDE.md` ☐ 5 commands ☐ permissions
- **Common mistakes:** naming the commands `/plan`, `/review` or `/status` (those clash with built-ins); a `CLAUDE.md` so long that it gets skimmed; putting secrets in `settings.json` (use `settings.local.json`, which is gitignored).

## Phase 3: Documentation
- **Goal:** one place for the roadmap, the design system and the status.
- **Why it matters:** Claude and you both start each task from the docs, not from memory.
- **Files:** `docs/GUIDE.md`, `docs/PLAN.md`, `docs/DESIGN.md`, `docs/PROGRESS.md`
- **Claude workflow:** plan → approve → implement → **review the docs against each other and `CLAUDE.md`**
- **Commands:** `npm run check`
- **Steps:** write the four docs. Mark any design decision that isn't made yet as **Proposed**. Log the decisions and known issues.
- **Testing:** no contradictions between the docs and `CLAUDE.md` (command names, token names, breakpoints, milestone).
- **Checklist:** ☐ 4 docs ☐ Proposed vs Locked labels ☐ known issues listed ☐ commit `Phase 3: documentation`
- **Common mistakes:** inventing final design decisions; docs that disagree with `CLAUDE.md`; forgetting to update `PROGRESS.md`.

## Phase 4: Design system
- **Goal:** the colour system in code, as the only colour source.
- **Why it matters:** once the default palette is gone, an off-brand colour cannot compile.
- **Files:** `src/app/globals.css`, `src/app/page.tsx` (token smoke test), `docs/DESIGN.md`
- **Claude workflow:** guide §9 prompt / `/ew-plan "design tokens"` → approve → `/ew-implement` → `/ew-test`
- **Commands:** `npm run check`; inspect `.next/static/**/*.css` for the tokens
- **Steps:**
  1. Put the raw palette in `@theme` and wipe the defaults with `--color-*: initial`.
  2. Put the semantic names in `:root`, with the dark values.
  3. Add `.theme-light` for light bands.
  4. Map the semantic names to utilities in `@theme inline`.
  5. Add the reduced-motion guard.
- **Testing:** the built CSS has `bg-background`, `text-muted` and the other semantic utilities, and no `--color-blue-*`. The page renders dark with muted text.
- **Checklist:** ☐ palette ☐ semantic tokens ☐ light band ☐ contrast table ☐ `DESIGN.md` shows the usage ☐ commit `Phase 4: design system tokens`
- **Common mistakes:** a `tailwind.config.js` (Tailwind 4 doesn't use one); `--color-primary: var(--color-primary)` self-references; `dark:` variants; gold text on `#F3F3F3`.

## Phase 5: Homepage planning
- **Goal:** each of the 8 sections is planned and approved before any code.
- **Why it matters:** layout, content and component decisions are cheap to change in a plan and expensive to change in code.
- **Files:** `docs/PLAN.md` (the section plans), `docs/DESIGN.md` (Proposed becomes Locked), `docs/PROGRESS.md`
- **Claude workflow:** `/ew-plan "homepage sections"`, then one `/ew-plan` per section if needed. Approve each one.
- **Commands:** none beyond reading
- **Steps:**
  1. Confirm the Proposed design items.
  2. For each section, set its content (real copy only; mark placeholders), layout at each breakpoint, components, data shape, a11y and theme (dark, or a `.theme-light` band).
  3. Decide the nav behaviour for the future pages.
  4. Decide the image needs (Phase 6 copies images from the old repo).
- **Testing:** every section has an approved plan. There are no invented clients or metrics.
- **Checklist:** ☐ 8 section plans ☐ design items locked ☐ component list ☐ placeholder list
- **Common mistakes:** starting to code; planning the Services, About, Portfolio or Contact pages; placeholder testimonials presented as real.

## Phase 6: Homepage development
- **Goal:** build Header, Hero, Services, Why ecommercewisers, Process, Portfolio Preview, CTA and Footer, **one section per cycle**.
- **Why it matters:** small approved steps keep the design consistent and the diffs reviewable.
- **Files:** `src/components/sections/*`, `src/components/ui/*`, `src/app/page.tsx`, `public/images/*` (only the image files from the old repo)
- **Claude workflow:** per section, `/ew-plan <section>` → approve → `/ew-implement` → `/ew-test` → `/ew-review` → fix → commit
- **Commands:** `npm run dev`, `npm run check`
- **Steps:** build the shared UI first (container, button, section heading), then the sections in page order. Add `clsx` and `tailwind-merge` only when a component actually needs conditional classes, and ask first.
- **Testing:** `/ew-test` is clean; check at 375, 768, 1024 and 1440 px; keyboard-only pass.
- **Checklist:** ☐ one commit per section ☐ semantic tokens only ☐ `PROGRESS.md` updated after each section
- **Common mistakes:** building several sections at once; raw hex or arbitrary colours; `"use client"` on whole sections; copying code (not only images) from the old repo.

## Phase 7: Testing
- **Goal:** the whole homepage is verified, not just each section on its own.
- **Why it matters:** sections that pass alone can still clash (heading order, duplicate IDs, overflow).
- **Files:** none, unless there are fixes. Record the results in `PROGRESS.md`.
- **Claude workflow:** `/ew-test`, then a manual pass. Optionally add an a11y auditor agent (see the agents note above).
- **Commands:** `npm run check`, `npm run dev`, browser devtools (Lighthouse, console)
- **Steps:**
  1. Lint, build and the sweeps.
  2. Responsive checks from 320 to 1440 px.
  3. Keyboard and screen reader basics.
  4. Contrast.
  5. The console has no errors.
  6. Lighthouse for performance and a11y.
- **Testing:** this whole phase is the testing.
- **Checklist:** the guide §15 completion checklist (see `PLAN.md`)
- **Common mistakes:** testing only at desktop width; ignoring warnings in the dev console; skipping the keyboard pass.

## Phase 8: Review and polish
- **Goal:** consistent, clean, duplicate-free code and UI.
- **Why it matters:** polish is where visual consistency and maintainability are won.
- **Files:** components and docs, as the findings require
- **Claude workflow:** `/ew-review` → pick the findings → `/ew-plan "fix review findings"` → `/ew-implement`
- **Commands:** `npm run check`
- **Steps:** remove the duplication, tighten spacing and type against `DESIGN.md`, polish the hover and focus states within the motion rules.
- **Testing:** run `/ew-test` again, plus a visual check.
- **Checklist:** ☐ no blocker or major findings are open
- **Common mistakes:** "polish" that brings in new colours, gradients or animation libraries; scope creep into other pages.

## Phase 9: Git and version control
- **Goal:** the homepage milestone is committed cleanly.
- **Why it matters:** it gives a known-good point to deploy from and to roll back to.
- **Files:** none new
- **Claude workflow:** ask Claude to commit once `npm run check` passes
- **Commands:** `git status`, `git log --oneline`, `git tag homepage-v1` (proposed)
- **Steps:** confirm the tree is clean and holds no secrets, then commit the milestone summary and tag it. Adding a remote needs your decision, and secrets need rotating before anything is pushed.
- **Testing:** `git status` is clean, and `git log` tells the phase story.
- **Checklist:** ☐ no secrets tracked ☐ the milestone commit ☐ the tag
- **Common mistakes:** pushing to a remote with secrets in the history; one giant commit instead of phase commits.

## Phase 10: Deployment
- **Goal:** the homepage is live.
- **Why it matters:** real-device testing and sharing
- **Files:** possibly `next.config.ts` (images and headers), host config. The host is **to be decided**.
- **Claude workflow:** `/ew-plan "deployment"` → approve → implement
- **Commands:** `npm run build`, `npm run start` (a local production check)
- **Steps:** choose a host → set the env vars there (never in git) → deploy → smoke-test on mobile and desktop → Lighthouse on the live URL.
- **Testing:** the live page matches local, with no console errors.
- **Checklist:** ☐ host chosen ☐ domain ☐ live smoke test
- **Common mistakes:** deploying without a production build check; secrets committed "just for the deploy".

## Phase 11: Future pages
- **Goal:** Services, About, Portfolio and Contact, **only after explicit approval**.
- **Why it matters:** the homepage components and tokens get reused, so each page is cheaper to build.
- **Files:** `src/app/<page>/page.tsx` and new sections, once approved
- **Claude workflow:** the same cycle, one page at a time, starting with `/ew-plan <page>`
- **Commands:** the same as Phase 6
- **Steps:** update the milestone in `CLAUDE.md` and `PLAN.md` first, then plan → build → test → review → commit.
- **Testing:** the same as Phase 7, per page.
- **Checklist:** ☐ approval recorded in `PROGRESS.md` ☐ `CLAUDE.md` milestone updated
- **Common mistakes:** starting before approval; forking the design system instead of reusing it.
