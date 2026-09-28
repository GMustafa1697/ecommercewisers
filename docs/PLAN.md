# ecommercewisers roadmap

The milestone is the **homepage only**. Tick items as they are finished and committed. How each phase works is in `docs/GUIDE.md`.

## Phase 0: Project understanding
- [x] Inspect the scaffold: versions, App Router tree, dependencies, assets, config
- [x] Check the Tailwind major version (4.3.3 → CSS-first `@theme`)
- [x] Record the Project snapshot in `docs/PROGRESS.md`

## Phase 1: Next.js foundation
- [x] Add the `typecheck` (`next typegen && tsc --noEmit`) and `check` scripts
- [x] Gitignore `.claude/settings.local.json`, `.claude/settings.loca.json` and `.claude/plans/`
- [x] Remove the scaffold's public SVGs
- [x] Metadata: title and description, `lang="en"`
- [x] Placeholder `page.tsx` (not the homepage)
- [x] `npm run check` passes → commit `Phase 1: Next.js foundation`

## Phase 2: Claude Code configuration
- [x] `CLAUDE.md` project rules (under `@AGENTS.md`)
- [x] `/ew-plan`, `/ew-implement`, `/ew-test`, `/ew-review`, `/ew-status`
- [x] `.claude/agents/` and `.claude/skills/` (empty, with the rules in `GUIDE.md`)
- [x] `.claude/settings.json` permissions → commit `Phase 2: Claude Code configuration`

## Phase 3: Documentation
- [x] `docs/GUIDE.md`, `docs/PLAN.md`, `docs/DESIGN.md`, `docs/PROGRESS.md`
- [x] Cross-check the docs against `CLAUDE.md` → commit `Phase 3: documentation`

## Phase 4: Design system
- [x] Raw palette in `@theme`, default palette wiped
- [x] Semantic tokens in `:root`, `.theme-light` light band, `@theme inline` utilities
- [x] Reduced-motion guard
- [x] Tailwind scans `src/` only
- [x] Placeholder page uses the semantic utilities
- [x] `DESIGN.md` updated with the implementation and usage → commit `Phase 4: design system tokens`

## Phase 5: Homepage planning
- [x] Confirm the design items: all Locked in `DESIGN.md`, adding `--accent`, the focus ring, button sizes, the wordmark, icons and images
- [x] Plan each section: see **Homepage plan** below
- [x] Nav behaviour: in-page anchors (`/#services` …), with no links to future pages
- [x] Images: only the portfolio shots (your real work, cropped and resized). No other old-repo images.
- [x] Placeholders: the contact email (blocks deploy); the social links stay hidden until provided

## Phase 6: Homepage development (one cycle per line, each `/ew-plan` → approve → `/ew-implement` → `/ew-test` → `/ew-review` → commit)
- [x] 1. Shared UI and tokens: `--accent`, focus ring, scroll padding; `site.ts`; `Container`, `ButtonLink`, `SectionHeading`, `Wordmark`, `icons.tsx`; the page skeleton in `layout.tsx` and `page.tsx`
- [ ] 2. Header: wordmark, nav, secondary CTA, skip link, `MobileNav`
- [ ] 3. Hero: eyebrow, H1, supporting line, two CTAs, code panel
- [ ] 4. Services: 4 cards on a light band
- [ ] 5. Why ecommercewisers: 4 value points
- [ ] 6. Process: Discover, Design, Develop, Launch on a light band
- [ ] 7. Portfolio Preview: confirm each project, crop and resize the images, then build
- [ ] 8. CTA: surface panel, `mailto:` button (placeholder email)
- [ ] 9. Footer: wordmark, nav, services, contact, copyright

## Phase 7: Testing
- [ ] `npm run check` and the `/ew-test` sweeps are clean
- [ ] Responsive at 320 / 375 / 768 / 1024 / 1440
- [ ] Keyboard, focus, landmarks and contrast
- [ ] No console errors; Lighthouse performance and a11y checked

## Phase 8: Review and polish
- [ ] `/ew-review` with no open blocker or major findings
- [ ] Duplication removed, spacing and type consistent with `DESIGN.md`

## Phase 9: Git and version control
- [ ] Milestone committed, tree clean, no secrets tracked
- [ ] Tag `homepage-v1` (proposed); decide on a remote

## Phase 10: Deployment
- [ ] Host chosen (to be decided), env vars set on the host
- [ ] No placeholders left: the `/ew-test` `example.com` sweep is clean (the real contact email is in)
- [ ] Deployed; live smoke test on mobile and desktop

## Phase 11: Future pages (only after explicit approval)
- [ ] Services
- [ ] About
- [ ] Portfolio
- [ ] Contact

## Homepage plan (approved in Phase 5, 2026-09-29)

### Structure
| # | Section | Component | `id` | Theme | Columns (mobile / `sm` / `lg`) |
|---|---|---|---|---|---|
| 1 | Header | `Header` + `MobileNav` | | dark, sticky `h-16`, `border-b border-border` | nav inline from `md` |
| 2 | Hero | `Hero` | | dark | 1 / 1 / 2 (text 7 : panel 5) |
| 3 | Services | `Services` | `services` | **light band** | 1 / 2 / 4 |
| 4 | Why ecommercewisers | `WhyUs` | `why` | dark | 1 / 2 / 4 |
| 5 | Process | `Process` | `process` | **light band** | 1 / 2 / 4 |
| 6 | Portfolio Preview | `PortfolioPreview` | `work` | dark | 1 / 2 / 4 |
| 7 | CTA | `Cta` | `contact` | dark, `bg-surface` panel | 1 (text and button side by side from `md`) |
| 8 | Footer | `Footer` | | `bg-surface`, `border-t border-border` | 1 / 2 / 4 (from `md`) |

- **Page skeleton:** `layout.tsx` renders `Header`, then `{children}`, then `Footer`. `page.tsx` renders `<main id="main">` with sections 2–7. There is no other route.
- **Nav (Header and Footer):** Services `/#services` · Why us `/#why` · Process `/#process` · Work `/#work` · Contact `/#contact`. They use `next/link`. **No links go to the future pages.**

### Sections
1. **Header**
   - The `Wordmark` links to `/`. The nav is `<nav aria-label="Main">`, shown from `md`.
   - "Start a project" is a **secondary** `md`-size button that goes to `/#contact`.
   - A skip link, "Skip to content", goes to `#main`.
   - Below `md`, `MobileNav` (the only `"use client"` component) adds a 44px icon button with `aria-label`, `aria-expanded` and `aria-controls`. Its panel sits under the header with the links stacked, then the CTA. It closes on a link click or Escape.
2. **Hero**
   - Eyebrow, H1, supporting line, then a primary `lg` button "Start a project" (`/#contact`) and a secondary `lg` button "Explore services" (`/#services`).
   - The **code panel** is `bg-surface border border-border rounded-lg`, in Geist Mono with `aria-hidden="true"`. Keys are `text-foreground`, strings `text-accent` and comments `text-muted`. Lines are ≤ 36 characters.
     ```ts
     // store.config.ts
     export const store = {
       platform: "shopify",
       // or "wordpress", "nextjs"
       design: "figma-to-web",
       priorities: [
         "speed",
         "reliability",
         "clean code",
       ],
     };
     ```
3. **Services**
   - `SectionHeading`, then 4 cards: an icon (`text-accent`, which is black on the band), an H3 and one line.
   - The data comes from `site.ts` (`servicesSection.items`) and is shared with the Footer.
4. **Why ecommercewisers**
   - `SectionHeading`, then 4 items. Each has a `border-t border-border pt-6`, a check icon (`text-accent`, gold), an H3 and one line. No cards and no metrics.
5. **Process**
   - `SectionHeading`, then an `<ol>` of 4 steps. Each has a number `01`–`04` (`font-mono text-accent`, black on the band), an H3 and one line.
6. **Portfolio Preview**
   - `SectionHeading` (eyebrow "Work", H2 "Selected projects"), then project cards. Each card is a top-of-page crop (`aspect-[4/5]`, `rounded-lg`, `next/image` with `sizes`), a label (eyebrow style) and the project name (H3). There are no external links unless you provide live URLs.
   - The data comes from `site.ts` (`workSection.projects`). **If the list is empty, the section renders nothing and the "Work" nav link is hidden.**
   - The images go in `public/images/work/`. Crop and resize them before committing (see `DESIGN.md` → Images). No new dependency: do the resizing outside the project.
   - **Candidates. Confirm each one's name, label and image in cycle 7, before anything is built:**

     | Project | Label (from the old site) | Source image in `ecomwiser/public/work/` | To check |
     |---|---|---|---|
     | Ella — Jewelry store | Shopify theme customisation | `screencapture-new-ella-demo-07-…png` (12 MB) or `ella-shopify-7.0-home-jewelery.jpg` (370px wide) | which image |
     | Ecomus — Activewear store | Shopify theme customisation | `screencapture-ecomusnext-themesflat-vercel-app-…png` (6.7 MB) | the capture is a Next.js demo on vercel.app, so is the label right? |
     | Home Gym | Custom development | `ella-7-home-gym.jpg` (370px wide) | the old label said "Work example"; low-res |
     | Layout 22 | UI / Layout system | `layout-22.png` (540px wide) | low-res |
7. **CTA**
   - A `bg-surface border border-border rounded-lg p-8 md:p-12` panel with an H2, one line and a primary `lg` button "Start a project" that goes to `mailto:{contact.email}?subject=Project%20enquiry`.
   - The email is a **placeholder**, `hello@example.com`, marked `// PLACEHOLDER` in `site.ts`. It **blocks deploy**.
8. **Footer**
   - Column 1: `Wordmark` and a one-line description. Then Navigation (`<nav aria-label="Footer">`), Services (the 4 names → `/#services`) and Contact (the email; social links only once they're provided).
   - Bottom row: `© {year} ecommercewisers. All rights reserved.`

### Copy (draft, approved; it lives in `src/content/site.ts`)
| Where | Text |
|---|---|
| Hero | Eyebrow "E-commerce development agency" · H1 "We build fast, reliable online stores." · "Shopify, WordPress and Next.js development, plus Figma to Web, for e-commerce businesses, Shopify store owners and startups." |
| Services | Eyebrow "Services" · H2 "What we build" · **Shopify Development:** "Shopify stores built or customised to fit your products and brand." · **WordPress Development:** "WordPress sites and stores your team can manage with ease." · **Next.js Development:** "Custom storefronts and web apps built for speed." · **Figma to Web:** "Your Figma designs turned into responsive, production-ready pages." |
| Why | Eyebrow "Why ecommercewisers" · H2 "What working with us looks like" · **Performance first:** "Pages built to load fast on real phones." · **E-commerce focus:** "Catalogs, product pages, checkout and the content around them." · **A clear process:** "You approve a plan before we build, and see progress at every step." · **Maintainable code:** "Typed, documented code your team can build on." |
| Process | Eyebrow "Process" · H2 "From brief to launch in four steps" · **Discover:** "We learn your products, customers and goals, and agree what to build." · **Design:** "We plan structure and design, or work from your Figma files." · **Develop:** "We build, test on real devices and share progress as we go." · **Launch:** "We launch, check everything live and hand over what you need to run it." |
| Portfolio | Eyebrow "Work" · H2 "Selected projects" |
| CTA | H2 "Have a store to build or improve?" · "Tell us what you're working on and we'll reply with next steps." · Button "Start a project" |
| Footer | "E-commerce development: Shopify, WordPress, Next.js and Figma to Web." · © line |

### Files (Phase 6)
- `src/content/site.ts`: typed `site`, `contact` (placeholder email), `contactHref`, `socials` (empty), `startProject`, `nav` (Work hidden while there are no projects), and one object per section: `heroSection`, `servicesSection`, `whySection`, `processSection`, `workSection`, `ctaSection`
- `src/components/ui/`: `Container.tsx`, `ButtonLink.tsx` (variant and size map; `next/link` for `/…` hrefs, `<a>` for `mailto:`), `SectionHeading.tsx`, `Wordmark.tsx`, `icons.tsx`
- `src/components/sections/`: `Header.tsx`, `MobileNav.tsx`, `Hero.tsx`, `Services.tsx`, `WhyUs.tsx`, `Process.tsx`, `PortfolioPreview.tsx`, `Cta.tsx`, `Footer.tsx`
- `src/app/`: `globals.css` (`--accent`, focus ring, scroll), `layout.tsx` (Header and Footer), `page.tsx` (`main` and the sections)
- `public/images/work/`: the confirmed portfolio images only
- **No new dependencies.**

## Completion checklist (guide §15)
- [ ] Project runs locally
- [ ] Colour variables are centralised
- [ ] `CLAUDE.md` is present and accurate
- [ ] Documentation is up to date
- [ ] The homepage-only restriction is respected
- [ ] No unnecessary dependencies
- [ ] Responsive layout works on mobile, tablet and desktop
- [ ] Accessibility basics are checked
- [ ] No console errors
- [ ] Lint passes
- [ ] Production build passes
- [ ] Git milestone is committed
