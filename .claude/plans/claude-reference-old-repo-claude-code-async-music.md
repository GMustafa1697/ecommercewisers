# ecommercewisers: fresh start, Phases 0–4 (per the Claude Code guide)

## Context

This rebuild starts from scratch and follows `.claude/reference/Ecomwiser_Claude_Code_Complete_Guide.docx` (called "the guide" below). The earlier specs in `.claude/plans/` (#222 black, Standards/Reviews/contact form, old copy) are **superseded**. The only thing we may take from the old repo `c:/Users/gm052/Desktop/ecomwiser/` is image files, and that only happens in Phase 6, not in this run.

This run covers **Phases 0–4**: scaffold, foundation, Claude Code config, docs and design-system tokens. It then **stops before Phase 5 (homepage planning)**. No homepage sections are built.

> ⚠️ Before starting, rotate the OpenRouter key in `.claude/settings.loca.json`. The old repo pushed it to GitHub. Only you can rotate it. This plan gitignores the file before the first commit.

### Decisions (from your answers)

| Area | Decision |
|---|---|
| Source of truth | The guide only: its colours, services (Shopify, WordPress, Next.js, Figma to Web) and 8 homepage sections |
| Brand name | `ecommercewisers`: lowercase, one word, everywhere (header, title, copy, docs) |
| Theme | Dark-first (#000 page, #111 surfaces) with light bands (#F3F3F3) for rhythm |
| Type | Geist + Geist Mono via `next/font` (scaffold default) |
| Custom commands | `/ew-plan`, `/ew-implement`, `/ew-test`, `/ew-review`, `/ew-status`, to avoid clashing with the built-in `/plan`, `/review` and `/status` |
| Git | Local repo on `main`, one commit per phase, no remote. No Co-Authored-By trailer, which matches `includeCoAuthoredBy: false` in your settings file |
| Location | The project root is this folder (`ecommercewisers/`), not a subfolder |

---

## Step 1: Scaffold (guide §7)

`create-next-app` refuses a folder that already has `.claude/` in it. So scaffold it in the scratchpad, in a folder named `ecommercewisers` so `package.json` gets the right name, and then copy it across:

```bash
npx create-next-app@latest "<scratchpad>/ecommercewisers" --ts --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --use-npm --disable-git --skip-install --yes
# copy everything incl. dotfiles (.gitignore, AGENTS.md, CLAUDE.md) into the project root, then:
npm install
git init -b main
```

No extra dependencies. `clsx` and `tailwind-merge` wait until Phase 6 actually needs them.

## Phase 0: Project understanding (read only)

Inspect the result and record a **Project snapshot** in `docs/PROGRESS.md`. The snapshot covers everything in the guide §8 checklist:
- the versions of Next, React, TypeScript, Tailwind and ESLint
- the App Router tree, dependencies, public assets and config files
- anything that should change before development starts

**Check the installed Tailwind major version** and choose the integration from it. v4 is expected, which means `@theme` in CSS and no `tailwind.config`. Read `node_modules/next/dist/docs/` wherever the scaffold's `AGENTS.md` says to.

## Phase 1: Next.js foundation → commit `Phase 1: Next.js foundation`

- `package.json`: add `"typecheck": "tsc --noEmit"` and `"check": "npm run typecheck && npm run lint && npm run build"`.
- `.gitignore`: append `.claude/settings.local.json`, `.claude/settings.loca.json` and `.claude/plans/`. Confirm with `git status` that the key file is untracked **before** the first commit.
- Delete the scaffold's `public/*.svg`.
- `src/app/layout.tsx`:
  - keep the Geist and Geist Mono `next/font` setup
  - `lang="en"`
  - metadata title `ecommercewisers — E-commerce Development Agency`
  - description `ecommercewisers builds fast, reliable online stores: Shopify, WordPress and Next.js development, plus Figma to Web, for e-commerce businesses and startups.`
- `src/app/page.tsx`: replace the boilerplate with a minimal placeholder: a `<main>` holding an `h1` with the brand name and one muted line. It is **not** the homepage.
- Leave `next.config.ts`, `tsconfig.json` and `eslint.config.mjs` at the scaffold defaults unless Phase 0 finds a problem.
- Run `npm run check`, then commit.

## Phase 2: Claude Code configuration → commit `Phase 2: Claude Code configuration`

**`CLAUDE.md`**
- Keep the scaffold's `@AGENTS.md` line first, then append the project rules. Keep them tight, about 120 lines, because the file loads every session.
- The rules cover the guide §10 list:
  - business, clients, services and stack (exact versions from Phase 0)
  - the colour system and the theme rule
  - design, coding and component rules
  - responsive, accessibility, performance and testing requirements
  - Git rules
  - the controlled workflow (Analyze → Plan → Approve → Implement → Test → Review → Fix → Docs → Commit)
- Hard rules:
  - The milestone is **homepage only**. Never start Services, About, Portfolio or Contact.
  - Never use the word "premium".
  - Brand is always `ecommercewisers`.
  - Use semantic tokens only. No raw hex outside `globals.css`, no gradients, no other hues.
  - Gold text never goes on light bands.
  - Invent no clients, metrics or reviews.
  - Never commit secrets.

**`.claude/commands/`** (Markdown files with a `description` and `argument-hint` in the frontmatter)

| Command | Behaviour |
|---|---|
| `ew-plan.md` | Reads `CLAUDE.md` and `docs/PROGRESS.md` + `DESIGN.md`, then inspects the relevant code. Outputs the goal, the files to change, what is reused, responsive and a11y notes, risks, and a milestone check (refuse anything out of scope). **Edits nothing.** Ends by asking for approval. |
| `ew-implement.md` | Implements only the approved plan in the conversation. Uses tokens, adds no new deps without asking, touches no unrelated files. Runs `npm run check`, updates `PROGRESS.md`, lists the changed files, then stops. |
| `ew-test.md` | Runs `typecheck`, `lint` and `build`, plus the grep sweeps (see Verification). Reports pass or fail with the output. Does not fix anything unless asked. |
| `ew-review.md` | Reviews `git diff` and the changed files for token use, consistency, responsiveness, a11y, performance and duplication. Findings are ranked by severity. No edits. |
| `ew-status.md` | Reads `PROGRESS.md`, `PLAN.md`, `git log -5` and `git status`. Reports the phase, what is done, what is next and any blockers. `allowed-tools` is limited to read-only tools. |

**Other `.claude/` changes**
- `.claude/agents/` and `.claude/skills/`: create each with a `.gitkeep`. `docs/GUIDE.md` explains when to add to them. No agents are defined yet.
- `.claude/settings.json`: keep `plansDirectory`. Add `permissions.allow` for `Bash(npm run typecheck)`, `Bash(npm run lint)`, `Bash(npm run build)`, `Bash(npm run check)`, `Bash(git status)`, `Bash(git diff:*)` and `Bash(git log:*)`.

## Phase 3: Documentation → commit `Phase 3: documentation`

| File | Contents |
|---|---|
| `docs/GUIDE.md` | Phases 0–11. Each phase has: goal, why it matters, files, Claude workflow (which `/ew-*` command), commands, steps, testing, checklist and common mistakes. |
| `docs/PLAN.md` | The roadmap with checkboxes. Phases 0–4 are ticked as they finish. The Phase 6 sub-list holds the guide's 8 sections: Header, Hero, Services, Why ecommercewisers, Process, Portfolio Preview, CTA, Footer. |
| `docs/DESIGN.md` | Colours, semantic variables, typography, spacing, buttons, cards, borders, radius, icons, animation, responsive and a11y rules. Colours, theme and fonts are **Locked**. Everything else is marked **Proposed** until you approve it in Phase 5. Includes the contrast table below. |
| `docs/PROGRESS.md` | Current phase and task, completed work, in-progress work, next task, the decisions log (the table above) and the Phase 0 snapshot. Known issues: the API key, no real logo for `ecommercewisers` (the old SVGs say "ecomwisers"), the default favicon, and no contact details yet. |

Review the four docs and `CLAUDE.md` against each other for contradictions, then run `npm run check`.

## Phase 4: Design system → commit `Phase 4: design system tokens`

**`src/app/globals.css`**: replaces the scaffold file, including its `prefers-color-scheme` block and the Arial body font. Plan for Tailwind v4:

```css
@import "tailwindcss";

@theme {
  --color-*: initial;                 /* wipe Tailwind's palette: bg-blue-500 etc. generate nothing */
  --color-primary: #E6AC0E;  --color-black: #000000;  --color-white: #FFFFFF;
  --color-light-gray: #F3F3F3;  --color-dark-surface: #111111;
  --color-secondary-text: #8A8A8A;  --color-dark-border: #2A2A2A;
  /* proposed: type scale (--text-*), --radius-*, --container-page */
}

:root {                                /* guide §4 semantic names, dark by default */
  color-scheme: dark;
  --background: var(--color-black);        --foreground: var(--color-white);
  --surface: var(--color-dark-surface);    --surface-muted: var(--color-light-gray);
  --primary: var(--color-primary);         --primary-foreground: var(--color-black);
  --muted: var(--color-secondary-text);    --border: var(--color-dark-border);
}

.theme-light {                         /* light band: same names, flipped values */
  color-scheme: light;
  --background: var(--color-light-gray);   --foreground: var(--color-black);
  --surface: var(--color-white);
  --muted: color-mix(in oklab, var(--color-black) 70%, transparent);   /* #8A8A8A fails AA here */
  --border: color-mix(in oklab, var(--color-black) 12%, transparent);
}

@theme inline {                        /* inline, so .theme-light overrides take effect per element */
  --color-background: var(--background);  --color-foreground: var(--foreground);
  --color-surface: var(--surface);        --color-surface-muted: var(--surface-muted);
  --color-primary-foreground: var(--primary-foreground);
  --color-muted: var(--muted);            --color-border: var(--border);
  --font-sans: var(--font-geist-sans);    --font-mono: var(--font-geist-mono);
}

body { background: var(--background); color: var(--foreground); font-family: var(--font-sans); }
```

- Why it is shaped this way: the raw palette sits in plain `@theme`, the guide's semantic names sit in `:root`, and `@theme inline` maps them to utilities. This avoids a `--color-primary` self-reference, and it lets a `.theme-light` section flip `bg-background`, `text-muted` and `border-border` without separate class names.
- Add a `prefers-reduced-motion` guard. Transitions are limited to colour, background and border, at 150ms or less.
- Contrast figures, all checked: white on #000 is 21:1; gold on #000 is 10.3:1; #8A8A8A on #000 is 6.1:1 and on #111 is 5.5:1; the light-band muted text is about 8:1.
- Gold on #F3F3F3 is only 1.8:1, so on light bands gold appears only as a fill with black text on it.
- The placeholder `page.tsx` uses `bg-background text-foreground text-muted` to prove the tokens compile.
- Update `DESIGN.md` to show which tokens were implemented and where. Also show how components use them (`bg-surface`, `text-muted`, `className="theme-light"` on a band).

**Stop here.** Report back and wait for approval of Phase 5.

---

## Critical files

- **New or replaced:** `CLAUDE.md` (appended), `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `package.json` (scripts), `.gitignore`
- **New:** `.claude/commands/ew-{plan,implement,test,review,status}.md`, `.claude/settings.json` (permissions), `docs/{GUIDE,PLAN,DESIGN,PROGRESS}.md`
- **Untouched:** `.claude/reference/`, `.claude/settings.loca.json` (gitignored), the old repo

## Verification (end of each phase, and in full after Phase 4)

```bash
npm run check                                                          # typecheck + lint + build must pass
git status                                                             # settings.loca.json never staged
grep -rni "premium" src                                                # → nothing
grep -rnE "#[0-9a-fA-F]{3,8}\b" src --include=*.ts --include=*.tsx     # → nothing (hex only in globals.css)
grep -rnE "gradient|dark:|(blue|purple|green|red|zinc|slate|gray)-[0-9]" src   # → nothing
```

- Run `npm run dev`. `curl -s -o /dev/null -w "%{http_code}" localhost:3000` should return 200, and the dev server log must show no errors.
- Confirm in the built CSS (`.next/static/css/*.css`) that `--color-background` and the rest exist and that no `--color-blue-*` does.
- Check that `/ew-status` is listed in the slash menu and reads the docs correctly.
- `git log --oneline` should show 4 phase commits (Phase 0 changes nothing, so it has no commit).
