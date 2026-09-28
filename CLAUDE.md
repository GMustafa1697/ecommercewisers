@AGENTS.md

# ecommercewisers: project rules

This file loads every session, so it stays short. Details live in `docs/`.

## Business
- **Brand:** `ecommercewisers`. Always lowercase and one word, everywhere: UI, metadata, copy, docs and commits. Never "Ecomwiser", "EcomWisers" or "ecomwisers".
- **Positioning:** a modern, technical e-commerce development agency. The tone is clean, professional, reliable and focused on performance. **Never use the word "premium".**
- **Target clients:** e-commerce businesses, Shopify store owners and startups.
- **Services (exactly four):** Shopify Development, WordPress Development, Next.js Development and Figma to Web.
- **Planned pages:** Home, Services, About, Portfolio and Contact.
- **Invent nothing.** No clients, testimonials, reviews, logos, metrics or contact details. Use clearly marked placeholders and list them under Known issues in `docs/PROGRESS.md`. The Portfolio shows only projects the user has confirmed, one by one, as their work.

## Current milestone: homepage only
- Build only `/` (`src/app/page.tsx`) and its eight sections: Header, Hero, Services, Why ecommercewisers, Process, Portfolio Preview, CTA and Footer.
- **Never create or start the Services, About, Portfolio or Contact pages or routes**, even when a task seems to need them.
- Nav links are in-page anchors (`/#services`, `/#why`, `/#process`, `/#work`, `/#contact`). **No links go to future pages.** The section plans are in `docs/PLAN.md` → Homepage plan.
- Phase 11 (future pages) starts only after explicit approval.

## Stack (installed versions)
- Next.js 16.3.6 (App Router, Turbopack), React 19.2.8, TypeScript 5.9.3 (strict), Node 24, npm.
- Tailwind CSS 4.3.3. It is CSS-first: the tokens are in `@theme` in `src/app/globals.css`, and there is **no** `tailwind.config`.
- ESLint 9.39.5 with flat config (`eslint-config-next` core-web-vitals + typescript).
- Next 16 differs from older versions. Read `node_modules/next/dist/docs/` before using any API (see `AGENTS.md`).
- `next lint` has been removed, and `next build` does not lint. Use the npm scripts.
- The path alias `@/*` maps to `src/*`.

## Commands
- `npm run dev` starts the dev server on :3000.
- `npm run typecheck` runs `next typegen && tsc --noEmit`. Typegen creates the global `LayoutProps` and `PageProps` types.
- `npm run lint`, `npm run build`
- `npm run check` runs typecheck, lint and build. **It must pass before every commit.**

## Colour system (locked, see `docs/DESIGN.md`)
| Palette | Hex | Role |
|---|---|---|
| primary | #E6AC0E | The gold accent: primary buttons, highlights, active states, icons. Use it sparingly. |
| black | #000000 | The main page background |
| dark-surface | #111111 | Cards and raised areas on dark |
| light-gray | #F3F3F3 | Light bands |
| white | #FFFFFF | Text on dark |
| secondary-text | #8A8A8A | Muted text on dark |
| dark-border | #2A2A2A | Borders on dark |

**Theme rule:** the site is dark-first. The page is `bg-background` (#000) and surfaces are `bg-surface` (#111). A light band is a `<section className="theme-light">`, and inside it the same semantic utilities switch to light values.

Hard rules:
- Use the semantic utilities only: `bg-background`, `bg-surface`, `bg-surface-muted`, `text-foreground`, `text-muted`, `border-border`, `bg-primary text-primary-foreground`, `text-accent`. Don't use the raw palette utilities (`bg-black`, `text-white`, …), because they don't flip in light bands.
- **Gold text is always `text-accent`** (gold on dark, black on light bands). Never use `text-primary` for text.
- Raw hex belongs only in `src/app/globals.css`. No arbitrary colour values (`bg-[#…]`), no gradients, no blue, purple, green, red or any other hue. `globals.css` wipes Tailwind's default palette.
- **Gold text never goes on a light band** (it is only 1.8:1 there). On light bands, gold appears only as a fill with black text on it.
- No `dark:` variants. The theme comes from tokens.

## Design principles
- Modern, technical and clean, with generous whitespace, a strong type hierarchy and a restrained accent.
- The fonts are Geist and Geist Mono via `next/font`.
- For spacing, radius, the type scale, buttons, cards, icons, images and motion, follow `docs/DESIGN.md`. Everything there is **Locked** (Phase 5).
- The logo is the text `Wordmark` component. The icons are generic inline SVGs, with no brand marks. Only one gold button shows above the fold.

## Coding and component rules
- Use Server Components by default. Add `"use client"` only where there is interaction (the mobile nav toggle, for example), and keep those components small.
- TypeScript is strict: no `any`, and props are typed with an interface or type.
- Put sections in `src/components/sections/` and shared UI in `src/components/ui/`. One component per file, with PascalCase names. The exception is `src/components/ui/icons.tsx`, which holds all the icons.
- All homepage copy and data (nav, services, points, steps, projects, contact) lives in typed exports in `src/content/site.ts`, mapped to markup. No copy-pasted blocks.
- Reuse before you create. No duplicate markup and no dead code.
- **Add no new dependency without asking.**
- Use `next/image` for images and `next/link` for internal links.
- Never edit `next-env.d.ts`. It is generated.

## Responsive
Build mobile-first. Pages must work from 320px, so check them at 375, 768, 1024 and 1440. There must be no horizontal scroll, and tap targets must be at least 44×44px.

## Accessibility (WCAG 2.2 AA)
- Use landmarks (`header`, `nav`, `main`, `footer`), exactly one `h1`, and headings in order.
- Give images meaningful `alt` text, or `alt=""` if they are decorative.
- Focus must be visible. Everything must work by keyboard, and toggles need `aria-expanded` and `aria-controls`.
- Contrast must be at least 4.5:1 for text and 3:1 for UI and large text. The pairs are listed in `docs/DESIGN.md`.
- Respect `prefers-reduced-motion`.

## Performance
- Pages render statically, with minimal client JS.
- Load fonts with `next/font` only.
- Use `next/image` with `sizes`. `priority` is deprecated in Next 16. Use `preload`, and only for an above-the-fold image; the homepage has none.
- No layout shift and no animation libraries.

## Testing
A task is done only when all of these hold:
- `npm run check` passes.
- The `/ew-test` sweeps are clean.
- The dev server shows no errors or console errors.
- The page has been checked by hand at mobile, tablet and desktop widths.

## Git
- Work on branch `main`, locally, with no remote yet. Make one commit per phase or approved section, e.g. `Phase 6: Hero section`.
- Commit only when the user asks, and only after `npm run check` passes.
- **Never commit secrets.** `.env*`, `.claude/settings.local.json` and `.claude/settings.loca.json` are gitignored. Check `git status` before every commit.
- No Co-Authored-By trailer.

## Controlled workflow
Every major task follows **Analyze → Plan → Approve → Implement → Test → Review → Fix → Update docs → Commit**.
- The commands are `/ew-plan <task>`, then `/ew-implement`, `/ew-test`, `/ew-review` and `/ew-status`.
- Do one phase or section at a time. Never "build the whole site".
- Stop after each step and wait for approval. Ideas that fall outside the milestone go into `docs/PROGRESS.md`, not into code.

## Docs
- `docs/GUIDE.md`: how each phase works
- `docs/PLAN.md`: the roadmap
- `docs/DESIGN.md`: the design system
- `docs/PROGRESS.md`: status, decisions and known issues

Update `PROGRESS.md` after every task.
