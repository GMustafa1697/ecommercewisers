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
- [x] 2. Header: wordmark, nav, secondary CTA, skip link, `MobileNav`
- [x] 3. Hero: eyebrow, H1, supporting line, two CTAs (the code panel was removed at your request)
- [x] 4. Services: 4 cards on a light band
- [x] 5. Why ecommercewisers: 4 value points
- [x] 6. Process: Discover, Design, Develop, Launch on a light band
- [x] 7. Portfolio Preview: confirm each project, crop and resize the images, then build
- [x] 8. CTA: surface panel, `mailto:` button (placeholder email). Replaced by **Contact** (2026-10-02, your request): the heading, the email and a form; it doesn't send yet (no SMTP)
- [x] 9. Footer: wordmark, nav, services, contact, copyright
- [x] 10. Video reviews (added 2026-09-30 at your request): Splide carousel of portrait videos with play/pause and mute, one playing at a time; stock placeholders with a notice
- [x] 11. Platforms (added 2026-10-01 at your request): a dark, full-bleed logo strip after the Hero, with the five platform logos in their original colours, scrolling smoothly in an endless Splide loop (no pause button)

## Phase 7: Testing
- [x] `npm run check` and the `/ew-test` sweeps are clean
- [x] Responsive at 320 / 375 / 768 / 1024 / 1440
- [x] Keyboard, focus, landmarks and contrast
- [x] No console errors; performance and a11y checked on the production build. Lighthouse itself was **not** run: it needs the `lighthouse` package (your OK). Equivalent checks were done in headless Chrome (see `PROGRESS.md` → Phase 7).

## Phase 8: Review and polish
- [x] `/ew-review` with no open blocker or major findings
- [x] Duplication removed, spacing and type consistent with `DESIGN.md`

## Phase 9: Git and version control
- [x] Milestone committed (one commit per phase), no secrets tracked. Only your `.gitignore` edit and `.claude/plans/` are left uncommitted, pending your call.
- [x] Remote: `origin`, the private GitHub repo `GMustafa1697/ecommercewisers`. Everything since Phase 8 committed and pushed to `main` (2026-10-02).
- [ ] Tag `homepage-v1` (proposed). **Your decision.**

## Phase 10: Deployment
- [ ] Host chosen (to be decided), env vars set on the host. It must run Next.js (the contact form's Server Action), not a static export
- [x] Security headers and `public/` caching in `next.config.ts` (2026-10-02). On the host: HSTS and HTTPS redirects, and rate limiting for the form once it sends
- [ ] No placeholders left: the `/ew-test` `example.com` sweep is clean (the real contact email is in)
- [ ] Deployed; live smoke test on mobile and desktop

## Phase 11: Future pages (only after explicit approval)
- [ ] Services
- [ ] About
- [ ] Portfolio
- [ ] Contact

## Homepage plan (approved in Phase 5, 2026-09-29)

### Structure
Since 2026-09-30 (your requests) **white and dark sections alternate**: the Hero and Platforms (one dark block since 2026-10-01, split by a border), Services, Process, Reviews and the footer are dark, the rest white. See `DESIGN.md` → Theme.

| # | Section | Component | `id` | Theme | Columns (mobile / `sm` / `lg`) |
|---|---|---|---|---|---|
| 1 | Header | `Header` + `ScrollHeader` + `MobileNav` | | a **dark glass bar** (#222 at 80% + blur, rounded) floating in the 1440px container, sticky, 68px (a 12px gap above the 56px bar); hides on scroll down, returns on scroll up | nav inline from `md` |
| 2 | Hero | `Hero` | | **dark** (since 2026-10-01), a faint dot grid, reaching up under the floating header | 1 (text only, `max-w-5xl`) |
| 2a | Platforms | `Platforms` (+ `LogoStrip`) | | **dark**, full-bleed | Splide loop, scrolled continuously: fixed 10rem / 12rem / 15rem slides, as many as fit (added 2026-10-01) |
| 2b | Features | `Features` (+ `LottieAnimation`) | `features` | white, light-grey cards | visible heading, then 1 / 1 / 2 cards (2×2 from `lg`), each a Lottie on a white tile beside the text from `sm` (added 2026-09-30, redesigned 2026-10-01) |
| 3 | Services | `Services` | `services` | **dark** | 1 / 1 / 2 (sticky heading + stacking cards from `lg`) |
| 4 | Why ecommercewisers | `WhyUs` (+ `LottieAnimation`) | `why` | white | a bento: white cards 1 / 2 / 2, with the animation panel beside them from `xl` (below them before) |
| 5 | Process | `Process` (+ `ProcessPlayer`, `LottieAnimation`) | `process` | **dark** | phones (below `sm`): your portrait animation alone (HTML steps for screen readers only; shown under reduced motion); tablets: stacked (animation cropped 5:3, then the steps); at `lg` the steps (2fr) beside it (3fr); from `xl` the whole animation, with its drawn step column (HTML steps for screen readers only) |
| 6 | Portfolio Preview | `PortfolioPreview` (in the shared `Carousel`) | `work` | white | Splide: 1 (+20% peek) / 2 / 4 per view |
| 6b | Video reviews | `Reviews` (+ `ReviewsCarousel`, `ReviewCard`) | `reviews` | **dark** | Splide: 1 card (+20% peek) / 2 / 4 per view |
| 7 | Contact (replaced the CTA, 2026-10-02) | `Contact` (+ `ContactForm`, `sendMessage`) | `contact` | white, light-grey `bg-surface` panel | stacked; heading and email beside the form from `lg` |
| 8 | Footer | `Footer` | | **dark** (`theme-dark`) | 1 / 2 / 4 (from `md`) |

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
   - One left-aligned text column (`max-w-3xl`). The decorative code panel that was planned beside it was removed in cycle 3 at your request.
   - **Redesigned 2026-10-01** from your reference image: a **dark** hero reaching up under the floating header, with a faint dot grid. A gold-tinted chip eyebrow, a bigger H1 (72px on desktop) with "your way" in gold, the muted intro, then "Start a project" (primary) and "See how we work" (secondary, `/#process`, replacing "Explore services"). The copy is your reference's, word for word (see Copy). Spec in `DESIGN.md` → Typography, Spacing and Theme.
2a. **Platforms** (added 2026-10-01, your request with the old site's screenshot): a dark band right after the Hero, full-bleed like the screenshot. It shows the WooCommerce, WordPress, Next.js, Figma and Shopify logos in their **original colours** (your second request; the first version was monochrome) as SVG images, in an **endless Splide loop that scrolls smoothly** at 48 px/s. It pauses on hover and off-screen and stays still for reduced motion. No pause button and no other controls (your request). No visible heading (your choice); a screen-reader-only H2, "Platforms we build on", names it. No nav link. Spec in `DESIGN.md` → Cards → Platforms, and Animation.
2b. **Features** (added 2026-09-30, your request with a reference screenshot): four points after the hero, each with its own Lottie animation in place of an icon (`</code>` brackets, laptop, speed gauge, search results). Since 2026-10-01 (your request): white, with the visible H2 "What every project includes", and four light-grey cards in a 2×2 grid from `lg`, each with its animation on a white tile beside the title and line. No nav link.
3. **Services**
   - ~~`SectionHeading`, then 4 cards: an icon, an H3 and one line.~~ Redesigned 2026-09-30 after reference `ser1`/`ser2` (your request):
     - Left (sticky from `lg`): `SectionHeading` with eyebrow, H2 and intro, then the primary "Start a project" button (`/#contact`).
     - Right: 4 cards that stack as you scroll (CSS `position: sticky`, each 1rem lower), with each covered card shrinking 5% per card on top of it (scroll-driven CSS, from your reference video). Each card is **white** on the dark section (`theme-light`) and has an icon in a gold ring, an H3, one line and a 3-item checklist.
     - Spec in `DESIGN.md` → Cards.
   - The data is in `Services.tsx` (`services`, with `points`), exported for the Footer.
4. **Why ecommercewisers**
   - `SectionHeading`, then 4 items. Each has a `border-t border-border pt-6`, a check icon (`text-accent`, gold), an H3 and one line. No cards and no metrics.
   - Since 2026-09-30 (your requests): a **bento**. The four points are **white** cards (border and soft shadow), each with its own icon (bolt, bag, route, code) on a black tile. The dotLottie code animation (`LottieAnimation`, cropped to 4:3) sits in a matching white panel sharing the grid's gap: beside the 2×2 cards from `xl`, under them before. Spec in `DESIGN.md` → Cards, Theme and Animation.
5. **Process**
   - `SectionHeading`, then an `<ol>` of 4 steps. Each has a number `01`–`04` (`font-mono text-accent`, black on the band), an H3 and one line.
   - Since 2026-10-01 (your requests), final since 2026-10-02: your dotLottie animation (`process-animation-final.json`) draws the four steps as cards on its left and a grid of tiles feeding a "Your store" panel on its right. From `xl` (1280px) it shows whole, and the HTML steps are kept for screen readers only. Below that its text would be too small, so it's cropped to the tiles and panel, with the readable HTML steps **in step with it** beside it (`lg`) or under it (tablets): the current step highlighted, a gold bar filling, and a click to jump. Phones (below 640px) get your portrait version (`process-mobile-b.json`: a step tracker, then one step at a time above the store panel) on its own, with the HTML steps for screen readers only. Under reduced motion it shows stills, and phones show the steps under the still. Spec in `DESIGN.md` → Cards → Process, and Animation → The Process animation.
6. **Portfolio Preview**
   - `SectionHeading` (eyebrow "Work", H2 "Selected projects"), then the project cards in a looping Splide slider (the shared `Carousel`, 4 per view on desktop like the video reviews; changed 2026-09-30 at your request). Each card has a 4:5 frame showing the top of a **full-length** homepage screenshot, which **scrolls to the bottom on hover** (CSS only, off for reduced motion), then a label (eyebrow style) and the project name (H3). There are no external links unless you provide live URLs.
   - The data is `projects` in `PortfolioPreview.tsx`, exported for the Header's nav. **If the list is empty, the section renders nothing and the "Work" nav link is hidden.**
   - The images go in `public/images/work/`. Crop and resize them before committing (see `DESIGN.md` → Images). No new dependency: do the resizing outside the project.
   - **Confirmed by you in cycle 7 (2026-09-30), one by one, as your work.** All 5 are shown, so the fifth card sits alone on a second row on desktop (your choice).

     | Project | Label | Image (`public/images/work/`) | Source in `ecomwiser/public/work/` |
     |---|---|---|---|
     | Ella — Auto parts store | Shopify theme customisation | `ella-auto-parts.webp`, 800×1000 | `screencapture-new-ella-demo-07-…png` (the 12 MB capture is an auto-parts store, not the jewelry one) |
     | Ella — Jewelry store | Shopify theme customisation | `ella-jewelry.webp`, 370×463 (low-res) | `ella-shopify-7.0-home-jewelery.jpg` |
     | Ecomus — Activewear store | Shopify theme customisation | `ecomus-activewear.webp`, 800×1000 | `screencapture-ecomusnext-themesflat-vercel-app-…png` |
     | Home Gym | Custom development | `home-gym.webp`, 370×463 (low-res) | `ella-7-home-gym.jpg` |
     | Layout 22 | UI / Layout system | `layout-22.webp`, 540×675 (low-res) | `layout-22.png` |
6b. **Video reviews** (added 2026-09-30; the reference is `.claude/reference/image.png`)
   - `SectionHeading` (eyebrow "Video reviews", H2 "In their own words"). While `isPlaceholder`, a notice follows: "These are placeholders, not customers. Real video reviews will replace them."
   - A Splide carousel (`role="group"`, label "Review videos", **endless horizontal loop**, no autoplay, drag and swipe) with page dots under it (since 2026-10-02; the custom arrows, "Previous videos" / "Next videos", were removed at your request).
   - Each card has a 9:16 video (`preload="none"`, lazy `next/image` poster), play/pause and mute buttons (sound starts muted), and a caption.
   - **Only one video plays at a time:** starting one pauses the others, and a video pauses when its slide leaves the view.
   - The data is in `Reviews.tsx`: 6 stock clips (`public/videos/reviews/`, 720×1280 H.264, 0.2–2.6 MB each) made with ffmpeg from the old repo's stock files. The two comedy clips (and their `rv-7`/`rv-8` copies) are never used.
7. **Contact** (2026-10-02, your screenshot; it replaced the CTA, a panel with an H2, one line and a `mailto:` "Start a project" button)
   - One `bg-surface border border-border rounded-lg p-6 md:p-12` panel. Left: the chip eyebrow "Contact", H2 "Get in touch", the intro, and `Email:` with the address (`mailto:`). Right: a form with Name, Email and Message and a primary "Send message" button. Stacked below `lg`.
   - Every "Start a project" button and the nav's "Contact" link scroll here (`/#contact`).
   - **No SMTP yet (your choice):** the browser checks the fields, the `sendMessage` Server Action checks them again, and the form then says sending isn't set up yet and shows the email. It never claims a message was sent. It **blocks deploy**.
   - The email is a **placeholder**, `hello@example.com`, marked `// PLACEHOLDER` in `Contact.tsx`. It **blocks deploy**. The screenshot's WhatsApp number and address wait for real ones.
8. **Footer**
   - Column 1: `Wordmark` and a one-line description. Then Navigation (`<nav aria-label="Footer">`), Services (the 4 names → `/#services`) and Contact (the email; social links only once they're provided).
   - Bottom row: `© {year} ecommercewisers. All rights reserved.`

### Copy (draft, approved; each section's copy lives at the top of its own file)
| Where | Text |
|---|---|
| Hero | ~~Eyebrow "E-commerce development agency" · H1 "We build fast, reliable online stores." · "Shopify, WordPress and Next.js development, plus Figma to Web, for e-commerce businesses, Shopify store owners and startups."~~ Since 2026-10-01, your reference **word for word** (your choice): chip "Design, build, optimize" · H1 "Tailor-made stores built **your way**, from scratch." · "We design and hand-build custom Shopify themes, Shopify apps, WordPress sites and UI/UX — no cookie-cutter templates, no page builders. Every line of code is written for your business." · buttons "Start a project" (`/#contact`), "See how we work" (`/#process`). See `PROGRESS.md` → Known issues for how it differs from the four services. |
| Features | sr-only H2 "What every project includes" · **Handcrafted code:** "Every line is written for your store, whether we build it new or customise your theme." (adapted from the screenshot's "no pre-made templates", which clashes with the theme-customisation projects) · **Pixel-perfect responsive:** "Custom layouts tested at every breakpoint so your store looks right on all devices." · **Fast by default:** "Custom-optimised code that loads fast because it only includes what your store actually needs." · **Search-ready:** "Clean, semantic markup with proper metadata — built for search engines from day one." (the last three word for word from your screenshot) |
| Services | (2026-09-30, adapted from the reference) Eyebrow "What we do" · H2 "Custom solutions for every part of your online store" · intro "Every project is built around your products, your brand and your exact requirements." · button "Start a project" · **Shopify Development:** "Shopify stores built or customised to fit your products and brand." (Theme customisation and new store builds / Product, collection and cart pages / App setup and integrations) · **WordPress Development:** "WordPress sites and stores your team can manage with ease." (Custom themes and page layouts / WooCommerce stores / Content your team can edit without a developer) · **Next.js Development:** "Custom storefronts and web apps built for speed." (Headless storefronts / Fast, statically rendered pages / Typed, maintainable code) · **Figma to Web:** "Your Figma designs turned into responsive, production-ready pages." (Responsive layouts from mobile to desktop / Reusable components that match your design / Accessible, semantic markup) |
| Why | Eyebrow "Why ecommercewisers" · H2 "What working with us looks like" · **Performance first:** "Pages built to load fast on real phones." · **E-commerce focus:** "Catalogs, product pages, checkout and the content around them." · **A clear process:** "You approve a plan before we build, and see progress at every step." · **Maintainable code:** "Typed, documented code your team can build on." |
| Process | Eyebrow "Process" · H2 "From brief to launch in four steps" · **Discover:** "We learn your products, customers and goals, and agree what to build." · **Design:** "We plan structure and design, or work from your Figma files." · **Develop:** "We build, test on real devices and share progress as we go." · **Launch:** "We launch, check everything live and hand over what you need to run it." |
| Portfolio | Eyebrow "Work" · H2 "Selected projects" |
| Contact | Eyebrow "Contact" (chip) · H2 "Get in touch" · "Have a project in mind? Tell us about it and we'll reply with next steps." · "Email:" · "All fields are required." · Name · Email · Message · Button "Send message" · not sent: "Sending isn't set up yet, so your message wasn't sent. Please email us at …" (until 2026-10-02 the CTA: H2 "Have a store to build or improve?" · "Tell us what you're working on and we'll reply with next steps." · Button "Start a project") |
| Footer | "E-commerce development: Shopify, WordPress, Next.js and Figma to Web." · © line |

### Files (Phase 6)
- ~~`src/content/site.ts`~~: removed on 2026-09-30 (your request); each section then held its own content.
- `src/data/` (since 2026-10-02, your request): the content, one file per section: `header.ts`, `hero.ts`, `platforms.ts`, `features.ts`, `services.ts`, `why.ts`, `process.ts`, `portfolio.ts`, `reviews.ts`, `contact.ts`, `footer.ts`. Edit these to change text, images and links.
- `src/components/ui/`: `Container.tsx`, `ButtonLink.tsx` (variant and size map; `next/link` for `/…` hrefs, `<a>` for `mailto:`), `Section.tsx`, `SectionHeading.tsx`, `Eyebrow.tsx`, `FeatureItem.tsx`, `IconTile.tsx`, `Carousel.tsx`, `LogoStrip.tsx`, `SplideTrack.tsx`, `LottieAnimation.tsx`, `Wordmark.tsx`, `icons.tsx`
- `src/components/sections/` (flat since 2026-10-02, your choice): `Header.tsx`, `MobileNav.tsx`, `ScrollHeader.tsx`, `Hero.tsx`, `Platforms.tsx`, `Features.tsx`, `Services.tsx`, `WhyUs.tsx`, `Process.tsx`, `ProcessPlayer.tsx`, `PortfolioPreview.tsx`, `Reviews.tsx`, `ReviewsCarousel.tsx`, `ReviewCard.tsx`, `Contact.tsx`, `ContactForm.tsx`, `sendMessage.ts` (Contact replaced `Cta.tsx`), `Footer.tsx`, `FooterColumn.tsx`
- `src/lib/`: `cn.ts`, `useMediaQuery.ts`, `breakpoints.ts`
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
