# ecommercewisers progress

_Last updated: 2026-09-29_

## Now
- **Current phase:** Phase 3, Documentation
- **Current task:** write the four docs and cross-check them against `CLAUDE.md`
- **Next task:** Phase 4, Design system: tokens in `src/app/globals.css`

## Completed
- **Phase 0, Project understanding:** see the Project snapshot below. Nothing changed.
- **Phase 1, Next.js foundation:**
  - Added the `typecheck` and `check` scripts.
  - Gitignored the Claude local settings and plans.
  - Left the scaffold SVGs out.
  - Set the metadata.
  - Replaced `page.tsx` with a placeholder.
- **Phase 2, Claude Code configuration:**
  - `CLAUDE.md` rules
  - the `/ew-plan`, `/ew-implement`, `/ew-test`, `/ew-review` and `/ew-status` commands
  - empty `.claude/agents/` and `.claude/skills/`
  - read-only and check permissions in `.claude/settings.json`

## In progress
- Phase 3, Documentation: `GUIDE.md`, `PLAN.md`, `DESIGN.md`, `PROGRESS.md`

## Decisions log
| Date | Area | Decision |
|---|---|---|
| 2026-09-29 | Source of truth | The guide (`.claude/reference/Ecomwiser_Claude_Code_Complete_Guide.docx`) only: its colours, 4 services and 8 homepage sections. The earlier specs and the old copy are superseded. |
| 2026-09-29 | Old repo | Only image files may come from `c:/Users/gm052/Desktop/ecomwiser/`, and only in Phase 6. No code or copy. |
| 2026-09-29 | Brand | `ecommercewisers`: lowercase, one word, everywhere |
| 2026-09-29 | Theme | Dark-first (#000 page, #111 surfaces), with light bands (#F3F3F3) for rhythm via `.theme-light` |
| 2026-09-29 | Type | Geist + Geist Mono via `next/font` (the scaffold default) |
| 2026-09-29 | Commands | `/ew-*` prefix, to avoid the built-in `/plan`, `/review` and `/status` |
| 2026-09-29 | Git | Local repo on `main`, one commit per phase, no remote, no Co-Authored-By trailer |
| 2026-09-29 | Location | The project root is this folder, not a subfolder |
| 2026-09-29 | Tooling | `typecheck` = `next typegen && tsc --noEmit` (Next 16 generates `LayoutProps`). No extra dependencies; `clsx` and `tailwind-merge` wait until Phase 6 needs them. |

## Known issues
- **Exposed API key (your action):** the old repo pushed an OpenRouter key (in `.claude/settings.loca.json`) to GitHub. **Rotate it.** That file does not exist in this folder, and it is gitignored here anyway.
- **No logo:** there is no real `ecommercewisers` logo. The old repo's SVGs say "ecomwisers", so they can't be used as they are.
- **Default favicon:** `src/app/favicon.ico` is still the create-next-app icon.
- **No contact details yet:** email, phone and social links are needed for the Footer and CTA. Placeholders must be marked.
- **Boilerplate README:** `README.md` is still the create-next-app text.
- **Tooling warnings:**
  - npm flags ESLint 9.39.5 as deprecated. It is the version `eslint-config-next` 16.3.6 uses; leave it until Next supports ESLint 10.
  - npm skipped the `unrs-resolver` postinstall script (allow-scripts policy). Lint works without it.

## Project snapshot (Phase 0, 2026-09-29)

**Versions**

| Package | Version |
|---|---|
| next | 16.3.6 (Turbopack) |
| react / react-dom | 19.2.8 |
| typescript | 5.9.3 |
| tailwindcss / @tailwindcss/postcss | 4.3.3 |
| eslint / eslint-config-next | 9.39.5 / 16.3.6 |
| @types/node / @types/react | 20.19.43 / 19.3.0 |
| Node / npm | 24.19.0 / 11.17.0 |

**What the scaffold contained** (`create-next-app --ts --tailwind --eslint --app --src-dir --import-alias "@/*"`)
- **App Router tree:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/app/favicon.ico`. There were no other routes and no components.
- **Dependencies:** `next`, `react` and `react-dom` only.
- **Public assets:** `file.svg`, `globe.svg`, `next.svg`, `vercel.svg` and `window.svg`. All were boilerplate and none were copied, so there is no `public/` folder yet.
- **Config files:**
  - `next.config.ts` is empty.
  - `tsconfig.json` is strict, with `@/*` mapped to `./src/*`.
  - `eslint.config.mjs` is a flat config (core-web-vitals + typescript).
  - `postcss.config.mjs` uses `@tailwindcss/postcss`.
  - There is **no `tailwind.config`**: Tailwind 4 is configured in CSS.
- **Agent files:** `AGENTS.md` (Next's rules: read `node_modules/next/dist/docs/` first) and `CLAUDE.md` (`@AGENTS.md`).
- **Styling:** `globals.css` had a light/dark `prefers-color-scheme` switch, with the body font set to Arial even though Geist was loaded. `page.tsx` used the `zinc` palette and `dark:` variants.

**What had to change before development**

| Finding | Fixed in |
|---|---|
| A bare `tsc --noEmit` fails on a clean checkout (`Cannot find name 'LayoutProps'`), because route types are generated | Phase 1: `typecheck` runs `next typegen` first |
| `next lint` has been removed in Next 16, and `next build` no longer lints | Phase 1: `check` runs lint separately |
| Default metadata and a boilerplate page (`zinc`, `dark:`, Vercel links) | Phase 1 |
| Unused scaffold SVGs | Phase 1 (not copied) |
| The body font was Arial, which overrode Geist | Phase 4 |
| The `prefers-color-scheme` light/dark switch conflicts with dark-first | Phase 4 |
| Tailwind's full default palette makes off-brand colours possible | Phase 4 (`--color-*: initial`) |
| Boilerplate README, default favicon | Open (see Known issues) |

**Recommended structure** (Proposed; confirmed in Phase 5)
```
src/
  app/            layout.tsx, page.tsx, globals.css (tokens)
  components/
    sections/     Header, Hero, Services, … (one file per section)
    ui/           Container, Button, SectionHeading, …
public/
  images/         images from the old repo (Phase 6)
```
