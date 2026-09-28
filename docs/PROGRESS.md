# ecommercewisers progress

_Last updated: 2026-09-29_

## Now
- **Current phase:** Phase 6, Homepage development
- **Current task:** none. Cycle 1 (shared UI and tokens) is reviewed, fixed and committed.
- **Next task:** cycle 2, Header. Start it with `/ew-plan "Phase 6 cycle 2: Header"`.

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
- **Phase 3, Documentation:**
  - `GUIDE.md`, `PLAN.md`, `DESIGN.md`, `PROGRESS.md`
  - Cross-checked them against `CLAUDE.md`. That aligned the `/ew-plan` breakpoints with `DESIGN.md`.
- **Phase 4, Design system:** `src/app/globals.css` now holds:
  - the raw palette in `@theme`, with the default palette wiped
  - the semantic tokens in `:root`
  - the `.theme-light` band
  - the `@theme inline` utilities
  - the reduced-motion guard
  - Tailwind scanning `src/` only

  The body font is Geist, replacing Arial, and the placeholder page uses the tokens. Built CSS: the 7 palette variables and no default palette; the semantic utilities resolve to `var(--…)`.
- **Phase 5, Homepage planning:**
  - Homepage plan in `docs/PLAN.md`: structure, theme rhythm, nav, 8 section specs, draft copy, files, 9 build cycles.
  - Every `DESIGN.md` item is now Locked, adding `--accent`, the focus ring, button sizes, the wordmark, icons and images.
  - `CLAUDE.md`: `text-accent` rule, `preload` instead of the deprecated `priority`, anchor-only nav, `site.ts`.
  - `/ew-test`: new sweeps for `text-primary` text and `priority`.
- **Phase 6, cycle 1, Shared UI and tokens:**
  - `globals.css`: `--accent`, `text-accent`, the global focus ring, scroll padding and smooth scrolling
  - `layout.tsx`: `data-scroll-behavior="smooth"`
  - `page.tsx`: `<main id="main">` with `Container`
  - `src/content/site.ts`: all the approved copy and data; section objects are named `…Section`, so nothing shadows the global `process`
  - `src/lib/cn.ts`
  - `src/components/ui/`: `Container`, `ButtonLink`, `SectionHeading`, `Wordmark`, `icons.tsx`
  - Review fixes:
    - secondary `hover:border-muted`
    - an `example.com` placeholder sweep in `/ew-test`
    - the CTA label reuses `startProject.label`
    - the `globals.css` comment now names `text-accent`
  - Deferred review nits:
    - cycle 2: define the header height once (`--header-height`), shared by `scroll-padding-top` and the Header
    - cycle 3: drop the redundant `bg-background text-foreground` on `main`
    - when a section first uses an intro: add `max-w-prose` to the `SectionHeading` intro
    - `ButtonLink`: don't treat `//` hrefs as internal

## In progress
- Nothing.

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
| 2026-09-29 | Tokens | `.theme-light` also sets its own background and text colour (one class makes a band) and sits in `@layer components` so utilities can override it. Tailwind scans `src/` only (`source("..")`). The light-band muted and border colours are black at 70% and 12% (same palette, AA-safe). |
| 2026-09-29 | Portfolio | The old repo's `public/work/*` projects (Ella, Ecomus, Home Gym, Layout 22) are **your real work** (your answer in Phase 5). Each project's name, label and image is confirmed in cycle 7 before it's built. The images are cropped and resized first. |
| 2026-09-29 | Contact | The CTA and Footer use `mailto:` with a **placeholder** email (`hello@example.com`, marked in `site.ts`) until you send the real one. No Contact page in this milestone. |
| 2026-09-29 | Hero | The visual is a decorative code panel (`store.config.ts` snippet), not an image |
| 2026-09-29 | Nav | In-page anchors only (`/#services`, `/#why`, `/#process`, `/#work`, `/#contact`); no links to future pages |
| 2026-09-29 | Design | New semantic token `--accent` (gold on dark, black on light bands) for all gold text and the focus ring. Header CTA is secondary, so only one gold button shows above the fold. Text wordmark as the logo. Generic SVG icons, no brand marks. |
| 2026-09-29 | Buttons | A Locked value changed after the cycle 1 review: the secondary button also gets `hover:border-muted`, because `hover:bg-surface` alone (#111 on #000, 1.1:1) is barely perceptible. |
| 2026-09-29 | Old-repo images | Only the portfolio shots are used. The brand marks (off-palette), the "ecomwisers" logos and `reviews/*` (the milestone has no reviews section) are not. |

## Known issues
- **Exposed API key (your action):** the old repo pushed an OpenRouter key (in `.claude/settings.loca.json`) to GitHub. **Rotate it.** That file does not exist in this folder, and it is gitignored here anyway.
- **No logo:** there is no real `ecommercewisers` logo. The text `Wordmark` stands in. The old repo's SVGs say "ecomwisers", so they can't be used as they are.
- **Default favicon:** `src/app/favicon.ico` is still the create-next-app icon.
- **Placeholder email (blocks deploy):** the CTA and Footer use `hello@example.com` until you send the real address. Social links stay hidden until you provide them.
- **Portfolio to confirm (cycle 7):**
  - the name, label and image for each of the 4 candidates
  - the Ecomus capture is a Next.js demo on vercel.app, but the old label said "Shopify theme customisation"
  - three of the source images are low-res (370–540px wide), and the two full captures are 6.7 MB and 12 MB, so they need cropping and resizing outside the project
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

**Structure** (confirmed in Phase 5; the full file list is in `docs/PLAN.md` → Homepage plan)
```
src/
  app/            layout.tsx (Header, Footer), page.tsx (main and sections), globals.css (tokens)
  content/        site.ts (all homepage copy and data)
  components/
    sections/     Header, MobileNav, Hero, Services, WhyUs, Process, PortfolioPreview, Cta, Footer
    ui/           Container, ButtonLink, SectionHeading, Wordmark, icons.tsx
public/
  images/work/    confirmed portfolio shots only (cropped and resized)
```
