# ecommercewisers progress

_Last updated: 2026-09-30_

## Now
- **Current phase:** Phase 6, Homepage development
- **Current task:** **all 8 homepage sections are built** (cycles 2–9: Header, Hero, Services, Why ecommercewisers, Process, Portfolio Preview, CTA, Footer). `npm run check` passes and the rule sweeps are clean. None is committed. They will share one commit, `Phase 6: homepage sections`. **Waiting for `/ew-review` of cycles 3–9, the open cycle 2 review items (see In progress), and your commit approval.**
- **Next task:** close Phase 6: `/ew-review`, fix, then commit. Then Phase 7 (Testing).

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
    - ~~cycle 2: define the header height once (`--header-height`)~~ done in cycle 2
    - ~~cycle 3: drop the redundant `bg-background text-foreground` on `main`~~ done in cycle 3
    - ~~when a section first uses an intro: add `max-w-prose` to the `SectionHeading` intro~~ done in cycle 8
    - `ButtonLink`: don't treat `//` hrefs as internal
- **Phase 6, cycle 2, Header** (not committed yet):
  - `Header.tsx`: the skip link before `<header>`; a sticky header with the wordmark (`/#top`), `nav aria-label="Main"` from `md`, and a secondary CTA
  - `MobileNav.tsx` (the only client component): 44px toggle with `aria-expanded`/`aria-controls`; overlay panel with 48px links and a full-width CTA; closes on a link click or Escape (focus returns to the toggle)
  - `layout.tsx` renders the Header
  - `--header-height` is shared by the Header and `scroll-padding-top`
  - Checked in headless Chrome (DevTools protocol, true mobile viewports):
    - no horizontal overflow at 320/375/768/1024/1440, with the menu closed or open
    - the toggle shows below `md` and the inline nav from `md`
    - Escape and link clicks close the menu
    - Tab order: skip link, then logo
- **Phase 6, cycle 3, Hero** (not committed yet):
  - `Hero.tsx`: `section aria-labelledby="hero-title"`; one left-aligned `max-w-3xl` column with the eyebrow, the page's only `h1`, the intro, and a primary and a secondary `lg` button
  - The planned code panel was built, then **removed at your request**. Its data (`CodeToken`, `heroSection.code`) went with it.
  - `ui/Eyebrow.tsx`: the eyebrow style in one place; `SectionHeading` now uses it
  - `page.tsx`: the placeholder is gone; `<main id="main" className="flex-1">` renders the Hero
  - `DESIGN.md`: the hero layout, `Eyebrow`, and an anchor-target focus rule (`tabIndex={-1}` + `outline-none`), which cycle 4 withdrew after testing
  - Checked in headless Chrome at 320/375/768/1024/1440:
    - no horizontal overflow
    - one `h1`
    - buttons 48px tall, full width and stacked below `sm`
    - only one gold button in the first viewport
    - no console errors
    - Tab order: skip link, header, then "Start a project" and "Explore services"
- **Phase 6, cycle 4, Services** (not committed yet):
  - `Services.tsx`: `<section id="services" className="theme-light">` (the first light band) with `SectionHeading` ("Services", "What we build") and a `<ul>` of 4 cards: `serviceIcons` icon, H3 and one line, all from `servicesSection`
  - `page.tsx` renders it after the Hero
  - `DESIGN.md`: the card title/body classes, the `mt-12` heading-to-content gap, and the anchor-target rule **withdrawn**: `focus()` after Next's scroll centres short sections (tested: 201px instead of 64px at 1440)
  - Checked in headless Chrome at 320/375/768/1024/1440:
    - no horizontal overflow
    - columns 1 / 1 / 2 / 4 / 4, with the cards in a row the same height
    - headings h1 → h2 → h3 ×4
    - the band is #F3F3F3, white cards, black eyebrow and icons, muted at black 70%; no gold text in the band
    - no console errors
    - from the mobile menu, "Services" lands the section at 64px and closes the menu. On desktop the page currently ends after Services, so it stops at the maximum scroll; it will reach 64px once the later sections exist.
- **Phase 6, cycle 5, Why ecommercewisers** (not committed yet):
  - `ui/FeatureItem.tsx`: the shared marker → H3 → one line `<li>`; the wrapper style comes in through `className`
  - `Services.tsx` now renders its cards through `FeatureItem`. Its server HTML is byte-for-byte the same as before the refactor.
  - `WhyUs.tsx`: `<section id="why">` on the black page, `SectionHeading` ("Why ecommercewisers", "What working with us looks like") and a `<ul>` of 4 `FeatureItem`s on `border-t border-border pt-6`, each with a gold `CheckIcon`; the copy is `whySection`
  - `page.tsx` renders it after Services
  - `DESIGN.md`: `FeatureItem` in the Shared UI table and the Cards section
  - Checked in headless Chrome at 320/375/768/1024/1440:
    - no horizontal overflow
    - columns 1 / 1 / 2 / 4 / 4, and every H3 fits on one line
    - headings h1 → h2 → h3 ×4 → h2 → h3 ×4
    - black section, 1px #2A2A2A top borders, gold icons and eyebrow, white H3s, #8A8A8A body
    - no console errors
    - desktop nav "Services" now lands at 64px; "Why us" stops at the page's maximum scroll until cycle 6 adds Process
- **Phase 6, cycle 6, Process** (not committed yet):
  - `Process.tsx`: `<section id="process" className="theme-light">` (the second light band), `SectionHeading` ("Process", "From brief to launch in four steps") and an `<ol>` of 4 `FeatureItem`s on `border-t border-border pt-6`. The marker is the step number `01`–`04`, derived from the position and `aria-hidden`. The copy is `processSection`.
  - `page.tsx` renders it after Why
  - `DESIGN.md`: Process's wrapper and number marker in the Cards section
  - Checked in headless Chrome at 320/375/768/1024/1440:
    - no horizontal overflow
    - columns 1 / 1 / 2 / 4 / 4, every H3 on one line
    - headings h1, then h2 → h3 ×4 for each of the three sections
    - an `<ol>` of 4, all numbers `aria-hidden`, 24px tall like the icons
    - band #F3F3F3, black numbers, eyebrow and H3s, muted body, black-12% borders; no gold text in the band
    - no console errors
    - desktop nav "Why us" now lands at 64px; "Process" stops at the page's maximum scroll until the CTA exists
- **Phase 6, cycle 7, Portfolio Preview** (not committed yet):
  - You confirmed all 5 projects one by one as your work, that you're allowed to show them, and their names and labels. The old repo's big Ella capture turned out to be an **auto-parts** store, so Ella is two projects.
  - `public/images/work/`: 5 WebP crops (top of the page, 4:5), made with headless Chrome outside the project. No dependency; 11–57 KB each. The 6 MB and 12 MB originals were not copied.
  - `site.ts`: `workSection.projects` holds the 5 projects, so the "Work" nav link now shows
  - `PortfolioPreview.tsx`: `<section id="work">` on black, `SectionHeading` ("Work", "Selected projects") and a `<ul>` of cards. Each card is a `next/image` (lazy, `sizes`, alt text) in a `rounded-lg` frame, then the `Eyebrow` label and the H3 name. No links. The section returns `null` if the list is empty.
  - `Header.tsx`: nav links are `min-w-11 justify-center`, so "Work" is 44×44 (the cycle 2 review nit)
  - `page.tsx` renders it after Process
  - `DESIGN.md`: the image method, the portfolio card, and the nav link minimum width
  - Checked in headless Chrome at 320/375/768/1024/1440:
    - no horizontal overflow; the Header fits at 768 with 5 links, and every nav link is at least 44×44
    - rows 1 / 1 / 2+2+1 / 4+1 / 4+1
    - all 5 images load with `srcset`, lazy loading and alt text, at a 4:5 ratio
    - the card boxes have their size before the images load; cumulative layout shift is 0
    - gold labels (`text-accent`), white H3 names
    - a plain page load has the hero H1 as the Largest Contentful Paint and no console warnings or errors
    - desktop nav "Process" and "Work" both land at 64px
- **Phase 6, cycle 8, CTA** (not committed yet; you said "do it", so the locked Phase 5 spec was built without a separate plan step):
  - `Cta.tsx`: `<section id="contact">` on black with a `bg-surface` panel holding `SectionHeading` ("Have a store to build or improve?" and its line) and the primary `lg` "Start a project" button to `mailto:hello@example.com?subject=Project%20enquiry` (**placeholder email, blocks deploy**)
  - `SectionHeading`: `eyebrow` is now optional (no H2 top margin without it), and the intro gets `max-w-prose` (the cycle 1 deferred nit)
  - `page.tsx` renders it after Portfolio
  - `DESIGN.md`: the CTA panel and the `SectionHeading` API
  - Checked in headless Chrome at 320/375/768/1024/1440:
    - no horizontal overflow
    - stacked with a full-width 48px button below `md`, side by side from `md`
    - panel #111 with a #2A2A2A border, white H2, #8A8A8A line, a gold button with black text
    - the other sections' H2s keep their 12px top margin
    - no console errors
    - nav "Contact", the header CTA and the hero CTA all scroll to it; it's the last section until the Footer, so they stop at the page's maximum scroll with the whole panel in view
- **Phase 6, cycle 9, Footer** (not committed yet; built from the locked Phase 5 spec on your "make all sections"):
  - `Footer.tsx`, rendered by `layout.tsx` after the page: the wordmark and `site.description`, then Navigation (`nav aria-label="Footer"`, the same `nav` data as the Header), Services (the 4 names → `/#services`) and Contact (the **placeholder** email; social links only once provided), and "© {year} ecommercewisers. All rights reserved."
  - `FooterColumn.tsx`: a titled link list (its own file: one component per file, like `MobileNav`)
  - `site.ts`: `footerSection` (column titles and the rights line)
  - `DESIGN.md`: the Footer pattern
- **Whole-page check after cycle 9** (headless Chrome at 320/375/768/1024/1440):
  - no horizontal overflow; the Footer is 1 column below `sm`, then 2, then 4 from `md`
  - every visible link and button is at least 44×44px
  - links go only to in-page anchors (`#main`, `/#top`, `/#services`, `/#why`, `/#process`, `/#work`, `/#contact`) and the `mailto:`; nothing links to a future page
  - landmarks: one `header`, `main` and `footer`, the Main nav (the desktop and mobile copies; only one shows at a time) and the Footer nav
  - one `h1`, no skipped heading levels; one gold button in the first view
  - desktop nav: all five in-page links land at 64px, right under the header
  - keyboard: 21 Tab stops in order (skip link → header → hero → footer), each with a visible focus ring
  - no console warnings or errors
  - rule sweeps clean: no "premium", no raw hex in TS/TSX, no gradients, `dark:` or palette classes, no `text-primary` text, no `priority`, no old brand spelling, no tracked secrets; `example.com` only in `site.ts` (the placeholder)

## In progress
- Phase 6, cycles 2–9: waiting for review and commit (one shared commit, your choice).
- Open from the cycle 2 (Header) review, not fixed yet:
  - minor: the mobile menu panel has no max height, so on short screens its CTA can sit below the viewport (`MobileNav.tsx`)
  - minor: the mobile menu doesn't close when focus or a tap moves outside it (needs your approval; the plan said link click or Escape only)
  - minor: the header and mobile nav link styles aren't the DESIGN.md text-link style (document them, needs approval)
  - nits: `rounded-sm` only on the wordmark link; "gold pill" wording in DESIGN.md Accessibility; the relative `./MobileNav` import; ~~recheck the header at 768 and the "Work" link width in cycle 7~~ done in cycle 7; the skip link has no `#main` on Next's default 404
  - scope: `.gitignore` no longer ignores `.claude/plans/`, which is not part of these cycles. Stage by path at commit time.

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
| 2026-09-29 | Hero | ~~The visual is a decorative code panel (`store.config.ts` snippet), not an image~~. Replaced in cycle 3: the hero is text only, with no visual (your request). |
| 2026-09-29 | Nav | In-page anchors only (`/#services`, `/#why`, `/#process`, `/#work`, `/#contact`); no links to future pages |
| 2026-09-29 | Design | New semantic token `--accent` (gold on dark, black on light bands) for all gold text and the focus ring. Header CTA is secondary, so only one gold button shows above the fold. Text wordmark as the logo. Generic SVG icons, no brand marks. |
| 2026-09-29 | Buttons | A Locked value changed after the cycle 1 review: the secondary button also gets `hover:border-muted`, because `hover:bg-surface` alone (#111 on #000, 1.1:1) is barely perceptible. |
| 2026-09-29 | Git | The Header (cycle 2) and Hero (cycle 3) share one commit, `Phase 6: Header and Hero sections`. You chose to build the Hero before committing the Header. |
| 2026-09-29 | Hero | `Eyebrow` is a shared UI component, so the eyebrow classes exist once. The hero is one `max-w-3xl` text column; the code panel was removed at your request. ~~Anchor-target sections get `tabIndex={-1}` + `outline-none`~~ (withdrawn in cycle 4). |
| 2026-09-30 | Anchor focus | Anchor sections get no `tabIndex`: Next calls `focus()` right after its smooth scroll, and in Chrome that re-scroll centres any section shorter than the viewport. Option (a) from the cycle 4 plan: keyboard focus stays on the clicked link for now (see Known issues). |
| 2026-09-30 | Git | Cycles 4–9 (Services, Why, Process, Portfolio, CTA, Footer) join the uncommitted Header and Hero: one commit, `Phase 6: homepage sections`. |
| 2026-09-30 | Footer | Built from the locked spec on your "make all sections". Footer links use the DESIGN.md text-link style (white, underline on hover) with a 44×44px target. Column titles are muted H2s. No future pages were created: they stay in Phase 11. |
| 2026-09-30 | CTA | Built straight from the locked Phase 5 spec on your "do it". `SectionHeading` gained an optional eyebrow, so the CTA reuses it instead of repeating the H2 and intro classes. |
| 2026-09-30 | Portfolio | You confirmed 5 projects one by one as your work and that you're allowed to show them: Ella — Auto parts store, Ella — Jewelry store, Ecomus — Activewear store (label "Shopify theme customisation", your call), Home Gym, Layout 22. I noted that the screenshots show the theme names ("ELLA", "ecomus", "wokiee") as logos and that the sources are the themes' demo sites. All 5 are shown (option b), so the fifth card sits alone on desktop. |
| 2026-09-30 | Images | The portfolio crops are made with headless Chrome outside the project (no dependency): the top of the page, 4:5, WebP at 80%, at most 800×1000, never upscaled. |
| 2026-09-30 | Process | Steps sit on a top border like Why, not on cards, so the second light band doesn't repeat Services. The visible numbers are `aria-hidden`; the `<ol>` gives the order. |
| 2026-09-30 | Components | `FeatureItem` (marker, H3, one line) is shared by Services, Why and later Process, so the item markup exists once. |
| 2026-09-29 | Old-repo images | Only the portfolio shots are used. The brand marks (off-palette), the "ecomwisers" logos and `reviews/*` (the milestone has no reviews section) are not. |

## Known issues
- **Exposed API key (your action):** the old repo pushed an OpenRouter key (in `.claude/settings.loca.json`) to GitHub. **Rotate it.** That file does not exist in this folder, and it is gitignored here anyway.
- **No logo:** there is no real `ecommercewisers` logo. The text `Wordmark` stands in. The old repo's SVGs say "ecomwisers", so they can't be used as they are.
- **Default favicon:** `src/app/favicon.ico` is still the create-next-app icon.
- **Placeholder email (blocks deploy):** the CTA and Footer use `hello@example.com` until you send the real address. Social links stay hidden until you provide them.
- **Low-res portfolio images:** Ella — Jewelry store and Home Gym (370px wide) and Layout 22 (540px) look soft on phones and high-resolution screens. Send larger screenshots, about 1600px wide, and I'll recrop them the same way.
- **In-page links don't move keyboard focus:** after "Services", "Explore services" and the other in-page links, focus stays on the clicked link (desktop) or returns to the top of the page (mobile menu), so the next Tab doesn't go into the section. Proposed fix, for Phase 8 and only with your approval: use plain `<a href="/#…">` for in-page links in the Header, `MobileNav` and `ButtonLink`, instead of `next/link`. The browser then moves focus without re-scrolling. This needs an exception to the CLAUDE.md "next/link for internal links" rule.
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
