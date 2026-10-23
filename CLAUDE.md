@AGENTS.md

# ecommercewisers: project rules

This file loads every session, so it stays short. Details live in `docs/`.

## Business
- **Brand:** `ecommercewisers`. Always lowercase and one word, everywhere: UI, metadata, copy, docs and commits. Never "Ecomwiser", "EcomWisers" or "ecomwisers". The one exception is the logo graphic, whose letters read "eCom Wisers" (your files in `public/logo/`: the wordmark since 2026-10-02, the footer lockup and the favicon since 2026-10-03). Its accessible name is still `ecommercewisers`. The files' own names keep the old spelling; never put them in `src/`.
- **Positioning:** a modern, technical e-commerce development agency. The tone is clean, professional, reliable and focused on performance. **Never use the word "premium".**
- **Target clients:** e-commerce businesses, Shopify store owners and startups.
- **Services (exactly four):** Shopify Development, WordPress Development, Next.js Development and Figma to Web.
- **Planned pages:** Home, Services, About, Portfolio and Contact.
- **Invent nothing.** No clients, testimonials, reviews, logos, metrics or contact details. Use clearly marked placeholders and list them under Known issues in `docs/PROGRESS.md`. The Portfolio shows only projects the user has confirmed, one by one, as their work. Video reviews stay stock placeholders, with the visible "placeholders, not customers" notice, until real, consented reviews with captions replace them (this blocks deploy).

## Current milestone: homepage only
- Build only `/` (`src/app/page.tsx`) and its ten sections: Header, Hero, Platforms (the logo strip after the hero, added 2026-10-01 at your request), Features (the cards after it, added 2026-09-30 at your request), Services, Process, Portfolio Preview, Video reviews, Contact (the form, which replaced the CTA on 2026-10-02 at your request) and Footer. The Footer opens with the Why ecommercewisers cards (`id="why"`), their own section until 2026-10-23 (your request).
- **Never create or start the Services, About, Portfolio or Contact pages or routes**, even when a task seems to need them.
- Nav links are in-page anchors (`/#services`, `/#why`, `/#process`, `/#work`, `/#contact`). **No links go to future pages.** The section plans are in `docs/PLAN.md` → Homepage plan.
- Phase 11 (future pages) starts only after explicit approval.

## Stack (installed versions)
- Next.js 16.3.6 (App Router, Turbopack), React 19.2.8, TypeScript 5.9.3 (strict), Node 24, npm.
- Tailwind CSS 4.3.3. It is CSS-first: the tokens are in `@theme` in `src/app/globals.css`, and there is **no** `tailwind.config`.
- ESLint 9.39.5 with flat config (`eslint-config-next` core-web-vitals + typescript).
- Splide 4.1.4 (`@splidejs/splide`, core CSS only) for the homepage carousels (video reviews and portfolio), through the shared `ui/Carousel.tsx`. Approved 2026-09-30. Also the Platforms logo strip (core Splide, scrolled continuously by a small `requestAnimationFrame` loop; no extension), through `LogoStrip` in `sections/Platforms.tsx`. Approved 2026-10-01.
- dotLottie 0.19.16 (`@lottiefiles/dotlottie-react`, pinned exactly; it pulls in `@lottiefiles/dotlottie-web` 0.80.0) for the Lottie animations (the Hero, the Features cards and Process), through `ui/LottieAnimation.tsx`. Approved 2026-09-30. Its WASM renderer is self-hosted at `public/lottie/dotlottie-player-0.80.0.wasm`, with the version in the name because it's cached forever. On every upgrade, copy `node_modules/@lottiefiles/dotlottie-web/dist/dotlottie-player.wasm` under the new version's name and update `WASM_URL` in `ui/LottieAnimation.tsx`.
- **A replaced animation gets a new file name** (`-v2`, `-v3`), because the animations are cached for a day and browsers and CDNs would keep serving the old copy under the old name. `code-dark-v2.lottie` is the first (2026-10-21); the others are unversioned until you change them. Update the `src` in the section that uses it. The Hero plays its own copy, `code-hero.lottie` (2026-10-22): the same scene with its orbit ring and seven small dots recoloured #A0A0A0, because they were near-black and vanished on the dark Hero. `code-dark-v2.lottie`, which Why played on white, is kept in `public/animations/` but unused since the Why cards moved into the footer (2026-10-23, your choice).
- Nodemailer 10.0.14 (`nodemailer`, pinned exactly; it ships its own types, so no `@types/nodemailer`) sends the contact form by SMTP, through `src/lib/mailer.ts` (`import "server-only"`), called by the `sendMessage.ts` Server Action. Approved 2026-10-03 (your request).
- These three are the only runtime dependencies beyond the scaffold.
- Next 16 differs from older versions. Read `node_modules/next/dist/docs/` before using any API (see `AGENTS.md`).
- `next lint` has been removed, and `next build` does not lint. Use the npm scripts.
- The path alias `@/*` maps to `src/*`.

## Commands
- `npm run dev` starts the dev server on :3000.
- SMTP settings live in `.env.local` (gitignored): copy `.env.example`, the committed template with empty values, and fill in `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` and `MAIL_TO` (comma-separated). Without them the form says it couldn't send, and the server log names the missing keys.
- `npm run typecheck` runs `next typegen && tsc --noEmit`. Typegen creates the global `LayoutProps` and `PageProps` types.
- `npm run lint`, `npm run build`
- `npm run check` runs typecheck, lint and build. **It must pass before every commit.**

## Colour system (locked, see `docs/DESIGN.md`)
| Palette | Hex | Role |
|---|---|---|
| primary | #E6AC0E | The gold accent: primary buttons (solid), eyebrow chips and icon tiles (a 15% tint). A fill on the light page, never text there. Use it sparingly. |
| black | #222222 | Text on the white page, and the background of the dark sections and footer (`.theme-dark`). A soft black, #000000 until 2026-09-30. |
| dark-surface | #2E2E2E | Surfaces inside `.theme-dark` |
| light-gray | #F3F3F3 | Surfaces (cards, panels, frames) on the white page |
| white | #FFFFFF | The page background (since 2026-09-30), and text in the dark sections |
| secondary-text | #A0A0A0 | Muted text inside `.theme-dark` (6.1:1 on #222, 5.2:1 on #2E2E2E). On light, muted is black at 70% (5.9:1 on white, 5.6:1 on grey). |
| dark-border | #3D3D3D | Borders inside `.theme-dark` (decorative, ≈1.5:1). On light, borders are black at 12%. |

**Theme rule:** **white and dark sections alternate** (since 2026-09-30, your requests; it was dark-first). The exceptions are runs of dark blocks split by 1px #3D3D3D divider lines: Hero → Platforms → Process at the top (your edit moved Process up), and Reviews → Contact → footer at the end (2026-10-23, your choice; Contact carries the `border-y`). Until your edits, Process → Portfolio → Reviews was the dark run (2026-10-02). The page is `bg-background` (white) and surfaces are `bg-surface` (#F3F3F3). The dark scope flips the same semantic utilities:
- `<Section dark>` renders `theme-dark` (#222, white text, #2E2E2E surfaces, gold accent). Services, Process, Reviews and Contact (since 2026-10-23, with a `border-y` divider against its dark neighbours) are dark, and so are the Hero (since 2026-10-01; it reaches up under the floating header), the Platforms strip (its own full-bleed `<section className="theme-dark">`, bordered from the Hero) and the footer (`<footer className="theme-dark">`). The header is a dark glass bar. The other sections are white, Portfolio Preview included since your edit (it keeps its `border-y`).
- `theme-light` makes one element inside a dark section white, with the light values: the Services cards on the dark Services section, and the Contact form card (2026-10-23, your request: all dark but the form), whose submit is the gold primary button.
- The reverse: `theme-dark` makes the Features cards black on their white section (2026-10-22, your requests; the Contact panel was black too until 2026-10-23, and the Why cards until they moved into the footer, where they're `bg-surface`), and `theme-light` makes the Features animation tiles white again, because the animations need a light background.

See `docs/DESIGN.md` → Theme.

Hard rules:
- Use the semantic utilities only: `bg-background`, `bg-surface`, `text-foreground`, `text-muted`, `border-border`, `bg-primary text-primary-foreground`, `text-accent`. Don't use the raw palette utilities (`bg-black`, `text-white`, …), because they don't flip inside the theme scopes.
- **Gold text is always `text-accent`**: black on the white page, gold only inside `.theme-dark` (the dark sections and footer). Never use `text-primary` for text.
- Raw hex belongs only in `src/app/globals.css`. No arbitrary colour values (`bg-[#…]`), no gradients, no blue, purple, green, red or any other hue. `globals.css` wipes Tailwind's default palette. The one exception is the platform logo files, which keep their brand hues inside the SVGs (2026-10-01, your request). The favicon files (`src/app/icon.svg`, `favicon.ico`) hold the palette gold and black. The one approved gradient is the CTA buttons' spin ring (`.btn-ring` in `globals.css`, 2026-10-22, your `buttons.html`): a conic gradient in palette colours only.
- **Gold text never goes on a light background** (2.0:1 on white, 1.8:1 on #F3F3F3). On light, gold appears only as a fill with black text on it, or as a decorative line or ring.
- No `dark:` variants. The theme comes from tokens.

## Design principles
- Modern, technical and clean, with generous whitespace, a strong type hierarchy and a restrained accent.
- The fonts are Geist and Geist Mono via `next/font`.
- For spacing, radius, the type scale, buttons, cards, icons, images and motion, follow `docs/DESIGN.md`. Everything there is **Locked** (Phase 5).
- The logo is the `Wordmark` component: your wordmark SVG (since 2026-10-02), inlined so it draws in `currentColor` (white in the dark header). Change the logo only there. The footer shows your lockup (since 2026-10-03): the same path (`wordmarkPath`, exported from `Wordmark.tsx`) plus the "design, build, optimize" line in `text-muted`, inlined in `Footer.tsx`. The favicon is your gold icon, recoloured to the palette gold: `src/app/icon.svg`, plus a `favicon.ico` (16/32/48px) made from it; Next adds the tags. The icons are generic inline SVGs, with no brand marks. The one exception is the six platform logos (WooCommerce, WordPress, Next.js, React, Figma, Shopify) in the Platforms strip, in their **original brand colours** (2026-10-01, your request; React added 2026-10-22): SVG files in `public/images/platforms/` (from the old repo; React's drawn from the official mark), shown with `next/image`, never inlined. Only one gold button shows above the fold.

## Coding and component rules
- Use Server Components by default. Add `"use client"` only where there is interaction (the mobile nav toggle, for example), and keep those components small. The exception is a section with interactive parts: since each section is one file (2026-10-03, your choice), Header, Platforms, Process, Reviews and Contact are client files as a whole (first-load JS +11 KB uncompressed). Footer and the other sections stay Server Components.
- TypeScript is strict: no `any`, and props are typed with an interface or type.
- Put sections in `src/components/sections/` and shared UI in `src/components/ui/`. One exported component per file, with PascalCase names. The exception is `src/components/ui/icons.tsx`, which holds all the icons.
- `sections/` is **flat** (since 2026-10-02, your choice: no subfolders), and **each section is one self-contained file** (since 2026-10-03, your request). Its sub-components are plain, non-exported functions above the exported section component: `MobileNav` and `ScrollHeader` in `Header.tsx`, `LogoStrip` in `Platforms.tsx`, `ProcessPlayer` in `Process.tsx`, `ReviewCard` and `ReviewsCarousel` in `Reviews.tsx`, `ContactForm` in `Contact.tsx`, `FooterColumn` in `Footer.tsx`. The one extra file is the `sendMessage.ts` Server Action, because a `"use server"` module can't share a client file. `ui/` holds only components used by two or more sections (or by other `ui/` components). Shared hooks and helpers go in `src/lib/` (`cn.ts`, `useMediaQuery.ts`, and `breakpoints.ts`, the one place scripts get Tailwind's breakpoints; never hand-type `639` or `48rem`), and so does `site.ts`, the shared content (below).
- **Each section holds its own content** (since 2026-10-05, your request "every section have own data"; `src/data/` was removed, after holding it from 2026-10-02). At the top of each section file, under a `// Content:` comment, are its texts, links, image, video and Lottie paths, labels and messages, plus their types. Not exported. The code below holds only layout and behaviour. To change a text, image or link, edit the top of the section file. The contact form's error texts are at the top of `sendMessage.ts`.
  - Content that several sections use is exported once, never copied:
    - `src/lib/site.ts`: `contact` and `contactHref` (Contact, Footer), `startProject` (Header, Hero, Services), `nav` (Header, Footer) and `contactLimits` (the form and its Server Action). They can't live in their own section, because Header and Contact are client files and server code can't read values exported from a client file ("cannot dot into a client module"). Add nothing else there.
    - `services` from `sections/Services.tsx` (Footer; both are server files)
    - `brand` from `ui/Wordmark.tsx` (Footer)
  - Never import content from a `"use client"` file into a server file.

  No copy-pasted blocks.
- Reuse before you create. No duplicate markup and no dead code.
- **Add no new dependency without asking.**
- Use `next/image` for images and `next/link` for internal links.
- Never edit `next-env.d.ts`. It is generated.

## Responsive
Build mobile-first. Pages must work from 320px, so check them at 375, 768, 1024 and 1440. There must be no horizontal scroll, and tap targets must be at least 44×44px. The one exception is the carousel dots: 24×24px, side by side, the WCAG AA minimum (2026-10-02, your choice).

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
- No layout shift and no animation libraries. The approved exceptions are Splide, for the two carousels and the Platforms strip (the only auto-moving carousel: a continuous 48 px/s scroll, paused on hover and off-screen, still under reduced motion; no pause button, your request), the portfolio's hover-scroll (a CSS `object-position` transition, off under reduced motion), the Services card stack's shrink (a scroll-driven CSS `scale`, no JS, off under reduced motion), the dotLottie animations in the Hero, Features and Process (the player and its WASM load lazily, once an animation is within 400px of the viewport; they freeze off-screen, a still frame under reduced motion), the glass header's hide on scroll down / show on scroll up (a 300 ms translate + opacity transition from `ScrollHeader` in `Header.tsx`, instant under reduced motion), the CTA buttons' hover and focus motion (the arrow swap, and the ring that spins around the pill's border, one turn per 2 s, paused while hidden; the arrow still and the ring unturning under reduced motion), and in the mobile menu the same ring around the open panel, spinning the whole time it's open because phones have no hover (2026-10-23, your request; unturning under reduced motion), plus the toggle's ☰/✕ slide and the panel's slide in from the left and back out (400 ms `translate` + `opacity` on the arrow's curve; both instant under reduced motion). Videos load nothing until played (`preload="none"` with a lazy `next/image` poster).
- `next.config.ts` sets the security headers (a CSP without nonces, so `/` stays static; `wasm-unsafe-eval` for dotLottie) and the caching of `public/` files (the versioned WASM forever, animations, videos and platform logos for a day). Anything new loaded from another origin needs the CSP updated. HSTS is left to the host.

## Testing
A task is done only when all of these hold:
- `npm run check` passes.
- The `/ew-test` sweeps are clean.
- The dev server shows no errors or console errors.
- The page has been checked by hand at mobile, tablet and desktop widths.

## Git
- Work on branch `main`. The remote is `origin`, the private GitHub repo `GMustafa1697/ecommercewisers` (since 2026-10-02). Make one commit per phase or approved section, e.g. `Phase 6: Hero section`.
- Commit only when the user asks, and only after `npm run check` passes. Push only when the user asks.
- **Never commit secrets.** `.env*` (except the empty `.env.example`), `.claude/settings.local.json`, `.claude/settings.loca.json` and `.claude/plans/CLAUDE.md` are gitignored. Check `git status` before every commit.
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
- `docs/REVIEW-VIDEOS.md`: how to add a video review and its thumbnail

Update `PROGRESS.md` after every task.
