# ecommercewisers

The website of ecommercewisers, an e-commerce development agency (Shopify, WordPress, Next.js and Figma to Web). The brand name is always lowercase and one word.

The current milestone is the homepage only (`src/app/page.tsx`).

## Stack

- Next.js 16 (App Router, Turbopack), React 19 and TypeScript (strict)
- Tailwind CSS 4: the design tokens are in `src/app/globals.css`, and there is no `tailwind.config`
- Splide 4 for the carousels and the logo strip, and dotLottie for the animations (its WASM renderer is self-hosted in `public/lottie/`)

## Commands

```bash
npm install
npm run dev     # the dev server on http://localhost:3000
npm run check   # typecheck, lint and build; run it before every commit
npm start       # serves the production build (after npm run build)
```

The contact form uses a Server Action, so the site needs a host that runs Next.js (`next start`), not a static export.

## Where things are

- `src/components/sections/`: the homepage sections, each with its own copy and data
- `src/components/ui/`: shared UI
- `CLAUDE.md`: the project rules
- `docs/PLAN.md`: the roadmap
- `docs/DESIGN.md`: the design system
- `docs/PROGRESS.md`: status, decisions and known issues, including what blocks deploy
