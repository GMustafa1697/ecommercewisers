# ecommercewisers progress

_Last updated: 2026-10-03_

## Now
- **Latest (2026-10-03):**
  - Your Process animation v3 replaced both earlier Process animations (see Completed), and phones then got the step tabs above the ring (your request). Uncommitted, and not yet through `/ew-review` or the hand check. It plays at 0.6× (my recommendation, applied because `/ew-implement` ran without your answer); say if you want it as delivered.
  - Before it: the error scan (the editor's Splide CSS error fixed, the stray clone deleted).
  - Then each section became one self-contained file (the flatten plan, approved with `/ew-implement`; see Completed). Also uncommitted and not yet through `/ew-review`.
  - Then the carousels on phones: one centred card with both neighbours peeking, and the Portfolio arrows beside the dots (see Completed).
  - Then the footer lockup and the favicon (your files; see Completed).
  - Then SMTP for the contact form (Nodemailer through the Server Action). **Your action:** put the real `SMTP_PASS` in `.env.local`. Until then sends fail with `EAUTH`.
- **Where we stopped (2026-10-02, your request "save all code we start tomorrow"):** a polish pass, saved as the work-in-progress commit `WIP: hover and spacing polish (unreviewed)`. `npm run check` passes, but it hasn't been through `/ew-test` or `/ew-review`, the hand check at 375 / 768 / 1024 / 1440, or DESIGN.md.
  - The changes:
    - a gold `::selection` (`globals.css`)
    - a lift + shadow + accent border on hover for the Features and Portfolio cards
    - a shadow and a 1px lift on the buttons (`ButtonLink`)
    - a `ring-primary/25` on the eyebrow chip
    - more Hero padding, a gold hairline over its eyebrow and wider CTA spacing
  - **Check first tomorrow:**
    - DESIGN.md says "No shadows inside `.theme-dark`", but the dark Portfolio cards and the Hero's primary button now have one.
    - DESIGN.md's Buttons table still lists the old classes.
    - The Features cards were "no shadow".
    - Keep, change or revert each change, then update DESIGN.md.
- **Before that:** the first push to GitHub (2026-10-02, your request "push on github"). Before it came the error scan (reinstalled `node_modules`, moved the backup copy out of the project), the Portfolio at 4 cards per row, the Portfolio's bordered cards with arrows, the Services deck hold, the move of content to `src/data/` with flat sections, the second code audit, the logo, the Portfolio redesign, the first code audit, the design refinement pass and the eyebrow chips.
- **Committed and pushed:** everything since Phase 8 is one commit, `Homepage: new sections, contact form and review fixes` (one commit, because the docs, `globals.css` and `page.tsx` carry changes from several sections at once), pushed to `origin/main`, the private repo `GMustafa1697/ecommercewisers`. GitHub's own initial commit (a `.gitattributes` with `* text=auto`) was merged in, not overwritten. The commit holds:
  - the codebase review and its fixes, the Why cards' hover, the Contact section (it replaced the CTA), the cards centred on phones, the carousel dots
  - the Process work: the animation, the redesign in sync, the dashboard and final animations, the phone animation, the list removed on phones
  - the dark Hero, the Platforms logo strip, the Features strip, the dark glass header, the white/dark theme, the Why bento with the code animation, the Services redesign, the Video reviews
  - the inline data structure (every section owns its copy; `site.ts` removed), your `.gitignore` edit and `.claude/plans/` (one plan renamed from the old "ecomwiser" spelling to `claude-reference-old-repo-claude-code-async-music.md`)
  - the error scan's docs, the deletion of `.claude/reference/`'s guide from the tree (now gitignored; it stays in the Phase 2 commit's history)
  - Left out: `.claude/plans/CLAUDE.md`, a saved GitHub page holding your GitHub login, an email and session values (never commit secrets; now gitignored), and `ecommercewisers/`, an untracked clone of the GitHub repo that's no longer needed. The first stays on disk; the clone was deleted in the 2026-10-03 error scan.
- **Next task:** `/ew-review` of today's changes (Process v3, the phone tabs, one file per section, the phone carousels, the footer lockup and favicon, the contact SMTP) and the WIP polish above, plus the hand check at 375 / 768 / 1024 / 1440. Then your decisions: the `homepage-v1` tag (Phase 9); the host, the real email and the real review videos (Phase 10, deploy); approval and content for the future pages (Phase 11).

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
- **Phase 6, cycle 2, Header** (committed 2026-10-02):
  - `Header.tsx`: the skip link before `<header>`; a sticky header with the wordmark (`/#top`), `nav aria-label="Main"` from `md`, and a secondary CTA
  - `MobileNav.tsx` (the only client component): 44px toggle with `aria-expanded`/`aria-controls`; overlay panel with 48px links and a full-width CTA; closes on a link click or Escape (focus returns to the toggle)
  - `layout.tsx` renders the Header
  - `--header-height` is shared by the Header and `scroll-padding-top`
  - Checked in headless Chrome (DevTools protocol, true mobile viewports):
    - no horizontal overflow at 320/375/768/1024/1440, with the menu closed or open
    - the toggle shows below `md` and the inline nav from `md`
    - Escape and link clicks close the menu
    - Tab order: skip link, then logo
- **Phase 6, cycle 3, Hero** (committed 2026-10-02):
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
- **Phase 6, cycle 4, Services** (committed 2026-10-02):
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
- **Phase 6, cycle 5, Why ecommercewisers** (committed 2026-10-02):
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
- **Phase 6, cycle 6, Process** (committed 2026-10-02):
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
- **Phase 6, cycle 7, Portfolio Preview** (committed 2026-10-02):
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
- **Phase 6, cycle 8, CTA** (committed 2026-10-02; you said "do it", so the locked Phase 5 spec was built without a separate plan step):
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
- **Phase 6, cycle 9, Footer** (committed 2026-10-02; built from the locked Phase 5 spec on your "make all sections"):
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

- **Phase 6 committed** as `Phase 6: homepage sections` (2026-09-30), staged by path. Your `.gitignore` edit and `.claude/plans/` were left out.
- **Phase 7, Testing** (2026-09-30), on the **production build** (`next start`) in headless Chrome:
  - Performance, on a Lighthouse-like mobile profile (412px, 150 ms RTT, 1.6 Mbps, 4× CPU, cold cache):
    - first contentful paint = largest contentful paint = **1.5 s** (the hero H1)
    - cumulative layout shift **0**
    - about 770 ms of long tasks (React and the Next runtime starting up; see Known issues)
    - 240 KB in 15 requests: 143 KB scripts, 52 KB fonts, 5 KB CSS, 0 KB images on load (the portfolio images lazy-load)
  - Contrast: every visible text element (67 at 375, 73 at 1440) passes WCAG AA. The lowest is 5.47:1 (muted on #111).
  - A11y basics: no duplicate IDs, every link and button has a name, every image has `alt`, the `aria-controls` target exists, `lang="en"`, the title is set
  - Keyboard: the full-page Tab order with focus rings (21 stops); the mobile menu opens with Enter or Space, Tab goes into its links, and Escape closes it and returns focus to the toggle
  - No console warnings or errors, in dev or production
  - Lighthouse itself wasn't run: it needs the `lighthouse` package, and adding it needs your OK

- **Phase 8, Review and polish** (2026-09-30). A review of the whole committed homepage plus the open cycle 2 items found no blocker or major issues. Fixed:
  - duplicate markup: new `ui/Section.tsx` (anchor, label, padding, container; used by 5 sections) and `ui/SectionGrid.tsx` (the 1/2/4 list; used by 4). The rendered `<main>` HTML was byte-for-byte identical before and after the refactor.
  - `MobileNav`: the panel is capped at the viewport height minus the header and scrolls (the CTA is reachable at 568×320). It now also closes on a tap outside and when focus Tabs out of it. **That extends the approved behaviour ("link click or Escape"); say if you want it reverted.**
  - `Header`: dropped the stray `rounded-sm` on the wordmark link; `MobileNav` is imported through `@/`
  - `ButtonLink`: `//host` URLs are no longer treated as internal (the cycle 1 deferred nit)
  - `FeatureItem`: `text-pretty` on the body, so no lone word sits on the last line
  - `DESIGN.md`: the header and mobile nav link styles are documented (no visual change), the skip link is described as "button-style" instead of "pill", and the new components and menu behaviour are added
  - Checked: `npm run check`, the rule sweeps, the whole-page check (no overflow, targets, headings, gold, anchors at 64px, 21 focus-ringed Tab stops, clean console) and the mobile menu (tap outside/inside, Tab out, link tap, landscape scrolling)
  - Left open for your decision: keyboard focus after in-page links (needs a CLAUDE.md exception). Logged, not built: a 404 page (outside the milestone).

- **Video reviews section** (2026-09-30, from the plan in `.claude/plans/claude-plans-splide-getting-started-md-delegated-curry.md`; committed 2026-10-02):
  - Tools: ffmpeg 9.0.2 installed with winget (a system tool, not in the repo). `@splidejs/splide` **4.1.4** added (pinned; the React wrapper was skipped because it predates React 19).
  - `public/videos/reviews/`: 6 stock clips re-encoded to 720×1280 H.264 (0.2–2.6 MB each; 68 MB → 5.9 MB) plus 6 WebP posters. The comedy clips and their `rv-7`/`rv-8` copies were not used.
  - `site.ts`: `ReviewVideo` type and `reviewsSection` (`isPlaceholder: true`, the notice, 6 "Placeholder" videos)
  - `icons.tsx`: play, pause, volume, volume-off, chevron left and right
  - `Reviews.tsx` (a light band after Portfolio), `ReviewsCarousel.tsx` (client; Splide with `role: "group"`, label, `perMove: 1`, **loop** (added on request), no autoplay, drag, `noDrag: "button"`), `ReviewCard.tsx` (stateless markup: video, poster, play/pause, mute, driven through `data-*` attributes by native listeners on the carousel, so Splide's loop clones work too)
  - `CLAUDE.md`: nine sections, Splide in the stack, the animation-library exception, the placeholder rule. `DESIGN.md` and `PLAN.md` updated.
  - Checked in headless Chrome:
    - `npm run check` passes
    - at 320/375/768/1024/1440: 1 / 1 / 2 / 4 / 4 cards visible, no overflow, every button at least 44×44
    - no video or poster downloads until the section is reached and a video is played
    - **one at a time:** playing 1, then 2, then 3 leaves only the last playing, and a playing video pauses when its slide leaves the view
    - mute flips `aria-pressed` and the sound; pause and the end of a clip reset the button
    - the arrows step one card; dragging works; off-screen buttons are out of the Tab order; focus rings show
    - **loop** (after your request): 14 Next and 3 Prev clicks go 1→6→1→6→1→3, then back 2→1→**6** across the start, at 1440 and 375. A visible *clone* card's play and mute work (icon, `aria-label`, `aria-pressed`, sound), and playing a real card pauses the clone. Splide adds 16 clones at 4 per view and 4 at 1 per view.
    - reduced motion makes moves instant
    - a plain load keeps the hero H1 as the Largest Contentful Paint, with a clean console

- **Eyebrow badge** (2026-09-30, your requests; committed 2026-10-02): first a neutral light tint, then, at your "make it look better, change the colour scheme", a **gold scheme**: `border-primary/30 bg-primary/15` with a gold dot and `font-medium`. Then, at "keep just every section main eyebrow style, remove the new CSS from the others": `Eyebrow` has a `variant`. `badge` (the default) is used by the 6 section eyebrows; `plain` is the portfolio card labels, back to exactly the original classes (no background, border, padding or dot). Measured in Chrome:
  - Then, at "change the colour scheme again", you chose the **surface chip + gold dot**: `border-border bg-surface text-foreground` (#111 chip with white text on dark, white chip with black text on bands), with gold only in the dot. The plain labels keep `text-accent`, byte-identical classes to the original.
  - Then, at "change it again", you chose **no chip, dot + line**: a gold dot, the label in `text-muted`, and a short gold line (variant renamed `section`). This is the current state.
  - Checked: 6 section eyebrows and 5 plain labels; every eyebrow on one line at 320–1440 (the gold line narrows to 22px at 320); no overflow; the full-page contrast check passes; clean console
  - no section eyebrow wraps at 320/375/768/1024/1440, no overflow. The plain "SHOPIFY THEME CUSTOMISATION" wraps to two lines at 1024 only, exactly as it did before the badge work.
  - the full-page contrast check (80 text elements) passes, lowest 5.47:1; clean console

- **Palette rebalance** (2026-09-30; committed 2026-10-02): `globals.css` has black #222222 (your edit), surface #2E2E2E, border #3D3D3D, and muted #A0A0A0. `npm run check` passes. In Chrome the full-page contrast check passes (80 text elements, lowest 5.19:1), the console is clean, and the surfaces now read as raised.

- **Portfolio slider + hover-scroll** (2026-09-30, your request; committed 2026-10-02):
  - `ui/Carousel.tsx` (new): the shared looping Splide carousel, extracted from `ReviewsCarousel` so the setup exists once. `ReviewsCarousel` now passes its video wiring as `onMounted`.
  - `PortfolioPreview.tsx`: the projects in the `Carousel` (4 per view on desktop, as you asked after first seeing 3; 2 on tablet; 1 plus a peek on phones). With 3 gone, `Carousel` lost its `desktop` option, since both carousels now show 4. Each 4:5 frame shows the top of a full-length screenshot and scrolls to the bottom on hover (`object-position`, 1 s per frame-width of travel, at least 1.5 s; 0.7 s back; `motion-safe` only).
  - Images: full-length WebP made with ffmpeg (800×4200, 370×2400, 800×3336, 370×1352, 540×1512; 51–227 KB), named `*-full.webp`, because the same names served the old 4:5 crops from Next's 4-hour image cache.
  - Checked in headless Chrome:
    - `npm run check` passes
    - 1 / 1 / 2 / 4 / 4 per view at 320/375/768/1024/1440 (after the change to 4), loop clones, no overflow
    - all 5 images load full-length (height ratios 2.8–6.5)
    - hover on Ella (4.0 s): 0% → 56% at 1.5 s → 100% at 4.5 s; leaving returns to 0% in about 1 s; the screenshot shows the Ella footer while hovered
    - a clone card scrolls too
    - drag left and right move the right way
    - reduced motion: no scroll on hover
    - the reviews carousel still passes its checks on the shared component (loop, clone controls, one video at a time)

- **Container 1440px** (2026-09-30, your request; committed 2026-10-02): `Container` is `max-w-360` (1440px, padding included) instead of `max-w-6xl` (1152px). Both carousels' image `sizes` are updated to the wider cards. Measured in Chrome: at 1920 every container is 1440px, centred (240px each side), with 1376px of content; at 1440 it's full width; 1024 and 375 are unchanged. The carousels show 4 per view with 326px cards at 1440 and wider; no overflow; `npm run check` passes.

- **Services redesign** (2026-09-30, your request after reference `ser1`/`ser2`; committed 2026-10-02):
  - `site.ts`: new eyebrow "What we do", H2 "Custom solutions for every part of your online store", an intro, `cta: startProject`, and 3 `points` per service (draft copy). The four services and their one-liners are unchanged, so the Footer is too.
  - `FeatureItem`: optional `style` and `children`, so Services reuses it for the checklist and the stack offset.
  - `Services.tsx`: two columns from `lg` (heading, intro and button in a sticky left column; cards on the right), one column below. Each card has an icon in a gold ring and a checklist, and is `position: sticky` 1.5rem lower than the one before, so the cards gather into a stack under the header. CSS only, still a Server Component. Stacking is off below 36rem of viewport height (phones in landscape), where a stuck card would hide its checklist.
  - Checked in headless Chrome at 1440×900, 1024×768, 768×1024, 375×667, 320×640 and 667×375:
    - `npm run check` passes; the built CSS has the sticky, `top: calc(…)` and `2fr 3fr` rules
    - cards stick at 96 / 120 / 144 / 168px (header + 2rem + 1.5rem steps) at every size; the left H2 stays at 124px through the section on desktop
    - 667×375 is a plain list (`position: static`), every checklist readable
    - no horizontal scroll at any size
  - **Then, from your reference video** (`.claude/reference/eCom Wisers … 17-42-52.mp4`): covered cards now **shrink** as later cards land on them, and the strips are 1rem (16px) apart instead of 1.5rem, both measured from the video (final widths ≈ 85 / 90 / 95 / 100%). Scroll-driven CSS in `globals.css` (`.services-stack`), no JS, no dependency. Checked in headless Chrome:
    - 1440×900 and 375×667: the scale runs 1 → 0.985 → 0.96 … → 0.85 / 0.90 / 0.95 / 1 in step with each arriving card; the cards stick at 96 / 112 / 128 / 144px
    - reduced motion (emulated): every card stays at scale 1, stacking unchanged
    - 667×375: plain list, scale 1
    - on exit the strips slide under the front card, as in the reference
    - `npm run check` passes, and the built CSS keeps the `@supports` / `@media` guards; clean console

- **Code animation in Why ecommercewisers** (2026-09-30, your request with the spec `.claude/plans/lottie-integration.md`; committed 2026-10-02):
  - `@lottiefiles/dotlottie-react` **0.19.16**, pinned exactly (it brings `@lottiefiles/dotlottie-web` 0.80.0). The API was checked against the installed `.d.ts`: `DotLottieReact`, `dotLottieRefCallback`, `setWasmUrl`, `renderConfig.freezeOnOffscreen`/`autoResize`, `play`/`pause`/`setFrame`/`isLoaded`, and the `load` event.
  - Assets:
    - `public/animations/code-dark.lottie` (19,922 B, sha256 `74a493df…`, identical to the zip's); the JSON isn't copied.
    - `public/lottie/dotlottie-player.wasm` (1,238,072 B, sha256 `92822207…`, identical to `node_modules`).
  - `ui/CodeAnimation.tsx` (client): the self-hosted WASM, `loop`, the off-screen freeze, and playback started from `load`, with the frame-360 still under reduced motion. `SectionGrid` gained `columns?: 2 | 4`. `WhyUs` stays a Server Component: heading and 2×2 points on the left, the animation on the right from `lg`.
  - Deviations from your spec (agreed in the plan): no `priority` prop (below the fold: it would be dead code), and no `autoplay` prop (a reduced-motion visitor would otherwise see motion before the check).
  - Checked:
    - `npm run check` passes; `/` is still static
    - `"use client"` is on `CodeAnimation.tsx` only (`WhyUs.tsx`: no match)
    - Headless Chrome, production build, at 1440/1024/768/375:
      - the WASM loads from `/lottie/dotlottie-player.wasm` as `application/wasm`, with **0** jsdelivr/unpkg requests
      - it plays in view (the canvas changes over 1 s) and freezes off-screen
      - reduced motion: the canvas is static and shows the full-scene still
      - the square is reserved before load (512 / 448 / 448 / 343 px); layout shift **0**
      - no horizontal scroll; points 2×2 beside the animation on desktop, stacked above it on mobile
      - no console errors
    - The dev server shows no hydration warnings.
    - The player adds a 218 KB JS chunk (53 KB gzipped), plus the WASM (1.24 MB, 498 KB gzipped).
  - **Then "change color scheme … better UI" (your request):**
    - The points became surface cards with a gold icon tile (black check on gold), and the animation sits in a matching surface panel as tall as the text column.
    - Side by side only from `xl`: at 1024 the 2×2 cards were ~208px wide, with titles wrapping.
    - The animation is cropped to 4:3 (`fit: "cover"`): the scene fills only ~20–78% of the square canvas, so it's about 30% larger in the same width. I sampled it every 2.5 s across the 16 s loop, and nothing is clipped.
    - Rechecked on the dev server at 1440, 1280, 1024 and 375: no horizontal scroll, it plays in view, reduced motion holds a still, layout shift 0, 0 CDN requests, `npm run check` passes.
  - **Then "make more better UI and change colors" (your request): a bento.**
    - The four points are cards toned by position, balanced diagonally: **gold** (a new `.theme-gold` scope in `globals.css`: black text on gold, muted black at 80%), **dark**, **dark** and **light** (`theme-light` on the card).
    - Each point has its own icon instead of four identical checks: bolt, bag, route and code (new `BoltIcon` and `RouteIcon`, and a `whyIcons` map; `whySection` items gained `icon`). Each sits on a dark tile, with a gold icon on the gold and dark cards and a light icon on the light card.
    - The heading spans the top. The 2×2 cards and the animation panel share one gap (a single bento), side by side from `xl`.
    - `SectionGrid` lost the `columns` prop again, since Why no longer uses it (Process is its only user).
    - Checked on the dev server at 1440, 1280, 1024, 768 and 375:
      - no horizontal scroll; clean console; `npm run check` passes; the sweeps are clean
      - measured text contrast in the section (canvas-resolved, alpha composited over each card): lowest **5.18:1** (the gold card body), then 5.19 (dark cards), 5.64 (light card); titles 7.78–15.91

- **Light-first site** (2026-09-30, your request: "change all sections colors and make white background"; committed 2026-10-02):
  - Your choices: a white site with grey bands (over "everything white" or "only Why white"), and **only the footer** stays dark (not the header, CTA panel or animation panel).
  - `globals.css`: `:root` now holds light values: a white page, #F3F3F3 surfaces, black text, muted black at 70%, borders black at 12%, a black accent, `color-scheme: light`. A new `.theme-dark` scope carries the former dark values; `.theme-light` (the grey band) is unchanged; the `.theme-gold` comment was updated. Every section flipped with that one change, because all components use the semantic utilities (checked: no raw palette classes anywhere).
  - `Footer`: `theme-dark` (it was `border-t border-border bg-surface`). `WhyUs`: the gold highlight card plus three light-grey cards, with every icon on a black tile. `MobileNav`: the open panel gets `shadow-sm`, so the white menu separates from the white page.
  - Rhythm: Header, Hero (white) → Services (grey) → Why (white) → Process (grey) → Portfolio (white) → Reviews (grey) → CTA (white, grey panel) → Footer (dark).
  - Checked in headless Chrome at 1440×900 and 375×667:
    - full-page text contrast: 148 elements (1440) and 106 (375), **no failures**. Lowest per section: header 5.93, hero 5.93, Services 5.64, Why 5.18 (the gold-card body), Process 5.64, Portfolio 5.93, Reviews 5.64, CTA 5.64, footer 6.08
    - footer links compute to pure white; header links to black at 70%
    - no horizontal scroll; clean console; the mobile menu opens (`aria-expanded="true"`) as a white panel with a shadow
    - `npm run check` passes; the sweeps are clean (they now also check raw palette classes)
  - Docs: CLAUDE.md (palette roles, theme rule, gold-text rules), DESIGN.md (Colours, Theme, Semantic variables with three columns, Contrast, Cards, Borders, Focus ring, Implementation) and PLAN.md (the rhythm column).

- **Then "not all section white, add dark sections"** (2026-09-30, your request; committed 2026-10-02): you chose the **alternating** rhythm (over "dark opening" and "dark showcases").
  - Header, Hero (white) → Services (**dark**) → Why (white) → Process (**dark**) → Portfolio (white) → Reviews (**dark**) → CTA (white, light-grey panel) → Footer (**dark**).
  - `Section`: the `light` prop became `dark` (it renders `theme-dark`). Services, Process and Reviews pass `dark`. The grey band `.theme-light` is removed from `globals.css`, since nothing used it any more (no dead code).
  - Services cards lost `shadow-sm` (no shadows on dark). On dark the icon rings and checks turn gold, and Process shows gold step numbers, because `--accent` is gold inside `theme-dark`.
  - Checked in headless Chrome at 1440×900 and 375×667:
    - full-page contrast: 148 and 106 text elements, **no failures**. Lowest per section: header 5.93, hero 5.93, Services 5.19, Why 5.18, Process 6.08, Portfolio 5.93, Reviews 5.19, CTA 5.64, footer 6.08
    - the Services stack on dark still sticks at 96/112/128/144px and shrinks to 0.85/0.90/0.95/1
    - no horizontal scroll; clean console; `npm run check` passes; the sweeps are clean (including `theme-light` and the old `light` prop)
  - Docs: CLAUDE.md (palette roles, theme rule), DESIGN.md (Colours, Theme, Semantic variables now two columns, Contrast, Cards, Implementation, Section API, examples), PLAN.md (the rhythm column) and `/ew-review`.

- **Then "in this section card must be white"** (Why ecommercewisers, 2026-09-30; committed 2026-10-02): all four cards and the animation panel are white (`bg-background`), outlined by `border-border` and `shadow-sm`, with the icons still on black tiles. The gold highlight card went with it, and the now-unused `.theme-gold` scope was removed from `globals.css` (no dead code).
  - Checked: `npm run check` passes; the sweeps are clean. Full-page contrast at 1440: 148 text elements, no failures, with the lowest 5.19 (dark cards) and 5.93 in Why. No horizontal scroll at 1440, 1280, 1024, 768 or 375; clean console.

- **Then "write this card white"** (the Services stacking cards, 2026-09-30; committed 2026-10-02): the cards are **white on the dark Services section**, as in the `ser1`/`ser2` reference.
  - `globals.css`: the light values now live in one shared rule, `:root, .theme-light`, and `.theme-light` (in `@layer components`) adds its white background and black text. That brings back the class name, now meaning "white element inside a dark section", without duplicating a value.
  - `Services`: the cards use `theme-light` instead of `bg-surface`. Inside a card, the icon and checks are black and muted text is black at 70%; the gold icon ring stays as a decorative line.
  - Checked: full-page contrast at 1440, 148 text elements, no failures (Services now 5.93, lowest on the page 5.19 in Reviews). The stack still sticks at 96/112/128/144px and shrinks to 0.85/0.90/0.95/1, with the white strips separated by the 12% border. `npm run check` passes; the sweeps are clean.

- **Glass header, hides on scroll** (2026-09-30, your request: "navbar sticky and glass; on scroll down fade up, on scroll up fade down"; committed 2026-10-02):
  - `ScrollHeader.tsx` (new, client): renders the `<header>` (sticky, `bg-background/80 backdrop-blur-md`) and sets `data-hidden` while scrolling down past 64px (steps of 8px or more, a passive rAF-throttled listener). `Header` stays a Server Component and passes its bar as children.
  - `globals.css` → `.site-header`: a 300 ms `translate` + `opacity` transition. `data-hidden` slides it up (−100%) and fades it out, unless focus is inside it or the mobile menu is open.
  - **Bug found and fixed while testing:** focusing any header link made the page scroll towards the top (y 1400 → 950), because the bar sits inside `html`'s `scroll-padding-top` band. This already happened with the old sticky header. Fixed with a scoped `scroll-margin` on the bar's links and buttons, which keeps the scroll padding for anchors and focus elsewhere. With the header hidden, focus reveals it instantly (`:focus-within` has no transition), so no jump then either.
  - Checked in headless Chrome:
    - 1440 and 375: at the top it shows; scrolling down to 900 hides it (top −65px, opacity 0); up to 700 shows it; down to 1500 hides it again
    - focus on a header link while hidden: shown in place, and the page stays at y 1500
    - 375: the mobile menu open while scrolling down keeps it shown; closing the menu hides it
    - reduced motion: transition-duration 1e-05s (instant); computed glass: white at 0.8, `blur(12px)`, sticky; clean console
    - nav-link contrast on the glass (computed): 4.81:1 over the #222 sections and 4.64:1 over pure black, both ≥ 4.5
    - `npm run check` passes; the sweeps are clean

- **Then "make navbar dark glassy and 1440px"** (2026-09-30; committed 2026-10-02): the header is now a **dark glass bar floating in the 1440px container**, like the reference video's nav.
  - `Header`: the bar is a `theme-dark` div inside the `Container`: rounded, bordered, #222 at 80% with a 12px blur. The links are `text-foreground/70`: over white content the glass is only #4E4E4E, where `text-muted` (#A0A0A0) would be 3.2:1.
  - `ScrollHeader`: the `<header>` is a transparent, `pointer-events-none` wrapper, `h-(--header-height) pt-3`. `--header-height` went from 4rem to **4.25rem** (a 12px gap plus the 56px bar), so the scroll padding, the sticky offsets and the menu height follow.
  - `MobileNav`: the menu is a floating dark dropdown under the bar (`mt-2 rounded-lg border`), capped to the viewport; the `shadow-sm` is gone (it's dark now).
  - Checked in headless Chrome:
    - the bar is 1376px at 1920 (x = 272) and 1440 (x = 32), exactly the content's left edge; 343px at 375; header 68px; 8px radius
    - a click in the margin hits the page (`BODY`)
    - pixels sampled from screenshots: the glass renders #4E4E4E over white and #222 over dark. Nav-link contrast is 5.08:1 and 8.47:1; white text 8.32:1
    - hide/show still works (hidden at −68px); the mobile dropdown fits the viewport; no horizontal scroll; clean console
    - `npm run check` passes

- **Features strip** (2026-09-30, your request: "make this section and replace icons with" four Lottie zips; committed 2026-10-02):
  - Your choices: **after the hero** (dark, with a border before the dark Services, as in your reference) and the **adapted first line** ("Every line is written for your store, whether we build it new or customise your theme."). The other three texts are word for word.
  - Assets: `laptop-ui.lottie` (1,331 B), `speed-gauge.lottie` (1,523 B) and `search-results.lottie` (1,445 B) in `public/animations/`; the first card reuses `code-dark.lottie`. No JSON copied. All 512×512, 3–5 s loops, palette colours only.
  - `ui/LottieAnimation.tsx` replaces `CodeAnimation.tsx`: one player for every animation (`src`, `stillFrame`, `fit`, `className`), so Why and Features share it. `site.ts`: `LottieFile` and `Feature` types, `featuresSection`, and `whySection.animation`.
  - `Features.tsx` (new): `<Section id="features" dark className="border-b border-border">`, an `sr-only` h2, and four centred `FeatureItem`s with a 96px animation each. `Section` gained `className?`. `page.tsx`: `<Features />` after `<Hero />`.
  - Reduced-motion stills were chosen from each JSON's layer timing, as the middle of the frames where every layer is at full opacity and scale: laptop 70, gauge 60, search 80, code 360. All four were confirmed complete in screenshots.
  - Checked in headless Chrome at 1440, 1024, 768 and 375:
    - all four `.lottie` files load (200); the WASM loads once
    - each animation changes over 1 s in view, and none does under reduced motion
    - headings h1 → h2 (sr-only) → h3 ×4 → the Services h2
    - dark #222 with a 1px #3D3D3D bottom border; layout shift 0; no horizontal scroll; clean console
    - `npm run check` passes

- **Inline data structure** (2026-09-30, your request: "every section has its own data, no need for `site.ts`"; committed 2026-10-02):
  - Every section declares its copy, data and types at the top of its own file. `src/content/site.ts` and `src/content/` are deleted.
  - Shared data is exported by its owner, never copied: `startProject`/`contact`/`contactHref` (Cta), `nav` (Header), `projects` (PortfolioPreview), `services` (Services), `brand` (Wordmark). No import cycles.
  - Section data now holds icon components directly (`icon: BagIcon`), so the `serviceIcons`/`whyIcons` maps and the icon-name types are gone from `icons.tsx`. `ReviewVideo` moved to `ReviewCard.tsx`; `MobileNav` types its props inline.
  - Also removed a stray `tex` class from the Features `<Section>`.
  - Proof it's a pure move: a headless-Chrome snapshot at 1440 and 375, taken before any edit and again after. The visible text, 28 links, 43 images, 22 video sources, 48 headings, ids and 105 ARIA labels are all **identical**. The only byte difference is Next's random per-request id in its inline script, after the page's last word.
  - `npm run check` passes; the sweeps are clean (the placeholder email is now reported in `Cta.tsx`); clean console; no horizontal scroll.
  - Docs: the CLAUDE.md data rule was rewritten; `/ew-test`, DESIGN.md and PLAN.md were updated.

- **Fix: Lottie animations not playing** (2026-10-01, your report "lottie animation not working"; committed 2026-10-02):
  - Cause: `LottieAnimation`'s load handler set `player.loop = true` and `player.speed = 1`, but in dotlottie-web 0.80 both are getter-only. Every player threw `TypeError: Cannot set property loop … which has only a getter` before `play()`, so all five canvases stayed on frame 0. Three Features icons (laptop, gauge, search) were blank, because their frame 0 is empty.
  - Fix: both lines were removed. `<DotLottieReact loop>` already loops, and the speed is never changed from its default of 1. The handler now only calls `play()`, or `pause()` + `setFrame()` for reduced motion.
  - Checked in headless Chrome at 1440 and at 375 with reduced motion: no exceptions; all five canvases paint and change over 1 s while in view; they freeze off-screen; under reduced motion each shows its still frame and doesn't move. `npm run check` passes.

- **Fix: Features Lotties flickered at each loop** (2026-10-01, your report "not smooth, make it loop, don't flicker"; committed 2026-10-02):
  - Cause: `laptop-ui` and `speed-gauge` built themselves up from an empty frame and had no outro, so at every 3 s loop the whole icon cut to blank in one frame (−86 % and −62 % of the painted pixels). `search-results` shrank away to nothing and stayed blank for about 0.33 s of every 5 s. `code-dark` was already seamless.
  - Fix, keyframes only, with the same easing as before: the base stays on screen and only the details come and go, ending exactly on the first frame.
    - **Laptop:** the body and open lid are static. The image card, text lines and button pop in, hold and leave in reverse. The loop is now 120 frames (4 s).
    - **Gauge:** the dial, hub and inner arc are static. The needle's sweep, which already ran from 0° to 0°, is the loop.
    - **Search:** the bar and its icon are static. The results and magnifier come and go as before.
  - Also: the gauge needle was filled #282727, invisible on the dark #222 strip, and with the intro gone it is the gauge's only motion. It is now palette white (#FFFFFF, text inside `.theme-dark`). **Reverted to #282727 the same day**, when the section moved to white (next entry).
  - Laptop still 70 → 64, the middle of its new fully built hold (frames 48–80). The gauge (60) and search (80) stills are unchanged. The originals are still in your zips: `.claude/reference/files (3).zip`, `(4)` and `(5)`.
  - Checked in headless Chrome, sampled on every animation frame for 13–17 s: the worst one-frame drop is now 1 % (gauge) or 5 % (search), with 0 near-empty frames; the needle is visible in every sample and sweeps every 3 s; no errors. Under reduced motion all five canvases show their stills, unmoving. `npm run check` passes.

- **Features redesign: white, grey cards, 2×2** (2026-10-01, your request "change layout of this section and also background color, animation not appear properly"; committed 2026-10-02):
  - Diagnosis: the four Lotties are drawn for a light background. Their outlines, the laptop base, the dark dial segments, the search-row lines and much of the code scene are #282727/#424346, so they vanished on #222. They also filled only about 72×43–58px of their 96px boxes.
  - Your choices: **white section with light-grey cards**, **2×2 with the animation beside the text**, and the **visible heading**.
    - `<Section id="features">` (no longer `dark`), with `SectionHeading` showing the existing H2 "What every project includes" (no eyebrow, no new copy).
    - Four `FeatureItem` cards (`bg-surface`, border, `p-6 md:p-8`), each animation on a white tile: 112px; 128px from `sm`; 160px from `xl`.
    - The tile sits on top on phones and beside the text from `sm`, where the title and line centre against it.
    - One column up to `lg` (at 768 a 2×2 would leave about 150px for text beside a tile), then 2×2.
  - The gauge needle is back to its supplied #282727 (the white from the previous fix would vanish on white).
  - Checked in headless Chrome at 375, 768, 1024 and 1440:
    - 1 column at 375 and 768, 2 columns at 1024 and 1440; the text centres exactly against each tile
    - white tiles on #F3F3F3 cards on the white page; all animations complete (all five gauge segments, the needle, the laptop and search outlines)
    - no horizontal scroll; layout shift 0; headings H1 → H2 → H3 ×4; no console errors
    - `npm run check` passes; the sweeps are clean (expected: `example.com` in `Cta.tsx`; the `dark:` and `text-primary` hits are comments in `globals.css`)
  - Docs: CLAUDE.md (Features is no longer listed as dark), DESIGN.md (rhythm, Features spec, animation stills), PLAN.md (table and section 2b).
  - The hero and Features are now two white sections in a row, the page's first such pair. The heading and grey cards separate them.

- **"Handcrafted code" animation replaced** (2026-10-01, your request with `.claude/reference/code-brackets.json` and its preview GIF; committed 2026-10-02):
  - New `public/animations/code-brackets.lottie` (1,540 B), packed from your JSON with a manifest like the other custom files. It is 400×400 and 96 frames (3.2 s): gold `< >` open, `/code` pops in between, then it closes. The brackets never leave the screen and frame 96 equals frame 0, so it loops without a blink.
  - Recoloured to the locked palette: the brackets and slash #F5B800 → gold #E6AC0E, the letters #000000 → black #222222. No other changes.
  - `Features.tsx`: the first card now uses it, with still 52 (every letter is shown in 42–62). `code-dark.lottie` stays, used by Why ecommercewisers.
  - Checked in headless Chrome at 1440:
    - over 10 s, the worst one-frame drop is 5 % with 0 near-empty frames
    - under reduced motion the still shows the full `</code>` and doesn't move
    - no horizontal scroll; layout shift 0; no errors
    - `npm run check` passes
  - Docs: DESIGN.md (Features animations), PLAN.md (section 2b).

- **Platforms logo strip** (2026-10-01, your request: "make a new section with these logos, using Splide, make the loop infinite", with a screenshot of the old site's strip; plan in `.claude/plans/make-new-section-with-noble-seal.md`; committed 2026-10-02):
  - Your choices:
    - **monochrome** marks (over the screenshot's brand colours, which break the palette)
    - **core Splide autoplay** (over the AutoScroll extension, a new dependency, and over a CSS marquee)
    - **no visible label** (over a small "Platforms we build on" line)
  - `sections/Platforms.tsx` (new, Server Component): a dark, full-bleed `<section>` right after the Hero, with an `sr-only` H2 "Platforms we build on". It holds the data (WooCommerce, WordPress, Next.js, Figma, Shopify, the screenshot's order) and the toggle labels.
  - `ui/LogoStrip.tsx` (new, client): Splide `type: "loop"`, autoplay one logo every 2.5 s (600 ms move). It pauses on hover and focus. The `.splide__toggle` pause/play button is there for WCAG 2.2.2. Reduced motion mounts it paused, and a `matchMedia` listener follows live changes. Fixed slide widths, 10 / 12 / 15rem.
  - `ui/icons.tsx`: a filled `Mark` base and five `currentColor` marks, sized by height (`h-10 md:h-12 w-auto`), grey with white on hover. Shopify, WordPress, Next.js and Figma use Simple Icons 16.33.0 paths (CC0 data). WooCommerce is the old repo's `public/marks/woocommerce.svg`: one evenodd path, so "Woo" is cut out of the bubble, rounded to one decimal (4.7 → 2.2 KB).
  - `ui/Carousel.tsx`: the arrow classes are exported once as `carouselControlClass`, so the toggle reuses them instead of a copy.
  - `page.tsx`: `<Platforms />` between `<Hero />` and `<Features />`. The white/dark rhythm still alternates: Hero white → Platforms dark → Features white → Services dark.
  - Checked against the dev server in headless Chrome at 320, 375, 768, 1024, 1440 and 1920. Results:
    - No horizontal scroll and no layout shift at any width. No console errors or warnings.
    - The band is 136px tall on phones and 176px from `md`. The marks are 40/48px tall and #A0A0A0, turning white on hover (measured).
    - Autoplay steps 160/192/240px (one slide) every 2.5 s. Over 16 s of animation frames at 375, 1440 and 1920 it wraps once, shows all five logos in order, and leaves **no gap on any frame**. Splide makes 4 clones at 320 and 16 at 1920.
    - Hover holds the position. Leaving resumes it.
    - The toggle is 44×44. A click stops it: the label becomes "Start the logo carousel", Play shows, and the position holds for 3.5 s. Enter starts it again. The focus ring is gold (#E6AC0E) after its 150 ms colour transition.
    - Reduced motion: it mounts paused with "Start the logo carousel", and the position holds. Switching the setting live resumes it, and switching back pauses it.
    - Accessibility tree: the region and group are named "Platforms we build on", each slide is read by its platform name, and no visible slide is `aria-hidden` while every out-of-view clone is.
    - `npm run check` passes (typecheck, lint, and a build that prerenders `/` statically).
    - The `/ew-test` sweeps are clean. The only hits are the expected `example.com` placeholder and two `globals.css` comments that quote the `text-primary` rule.
  - Docs:
    - CLAUDE.md: eleven sections; Splide for the strip; the brand-mark exception; the autoplay exception; Platforms among the dark sections.
    - DESIGN.md: Theme, Icons, Cards → Platforms, Animation → The Platforms strip, Shared UI.
    - PLAN.md: cycle 11, structure row 2a, section 2a.

- **Then "use original colours of logos, make smooth scrolling, remove pause button"** (2026-10-01, your request with a screenshot of the strip; committed 2026-10-02):
  - **Original colours:**
    - The five logos are the old repo's colour SVGs (`ecomwiser/public/marks/*.svg`), copied unchanged to `public/images/platforms/`. They hold only paths and fills (checked: no scripts or links).
    - `Platforms.tsx` shows them with `next/image` (viewBox size as `width`/`height`, `alt` = the name, `h-10 w-auto md:h-12`).
    - The brand hues stay inside the SVG files, so no hex goes into the code and the `/ew-test` hex sweep still passes.
    - The monochrome `Mark` components were removed from `icons.tsx` (no dead code), so the file is back to its line icons.
  - **Smooth scrolling, still core Splide** (no new dependency): `LogoStrip.tsx` drops autoplay and drives the loop itself.
    - A `requestAnimationFrame` loop moves the track 48 px/s through Splide's `Move.translate`, which wraps the loop, and keeps Splide's index in step for `aria-hidden`.
    - It pauses on hover and off-screen (`IntersectionObserver`), and stays still under reduced motion, following the setting live. Drag is off.
  - **Pause button removed**, with its labels and icons. `Carousel.tsx` is back to its local `arrowClass`, because the shared `carouselControlClass` export no longer had a second user.
  - Checked against the dev server in headless Chrome at 320, 375, 768, 1024, 1440 and 1920:
    - No horizontal scroll, layout shift 0, no console errors or warnings, no button in the section.
    - All five images load, clones included. They are 40px tall on phones and 48px from `md`: Woo 80×48, Figma 32×48.
    - Motion: a steady 48.0 px/s, never backwards, at most 0.83 px per frame (1.6 px on one late frame at 375). Over 27 s at 375, 1440 and 1920 it makes one seamless wrap and passes all five logos in order, with **no gap on any of about 1,625 frames**.
    - Hover holds the position (−1618 → −1618 over 2 s), and leaving resumes it. Off-screen, it holds.
    - Reduced motion: still at mount. A live switch off starts it. Switching back on stops it, after snapping 71px to the nearest slide (Splide re-applies its options on that media change).
    - Accessibility tree: the region and group are named "Platforms we build on", and the images are read as WooCommerce, WordPress, Next.js, Figma and Shopify. Out-of-view clones are `aria-hidden`.
    - `npm run check` passes, and the `/ew-test` sweeps are clean (the same two expected hits).
  - Docs: CLAUDE.md (the logo and hue exceptions, Splide's use, the Performance exception), DESIGN.md (Colours, Cards → Platforms, Icons, Animation, Shared UI), PLAN.md (cycle 11, row 2a, section 2a).

- **Hero redesign, dark, from your reference image** (2026-10-01, your request "make header like that in image"; I read "header" as the hero, the section the image shows; committed 2026-10-02):
  - Your choice: the reference copy **word for word** (over a version adapted to the four services). See Known issues.
  - `Hero.tsx`:
    - A `theme-dark` section that reaches up under the floating header (`-mt-(--header-height)`, the height added back to the top padding), so the page is dark from the top and the glass bar floats over #222.
    - A faint dot grid behind it: an `aria-hidden` SVG pattern, white at 10%.
    - The chip eyebrow "Design, build, optimize", and the H1 "Tailor-made stores built **your way**, from scratch." (`text-accent` span, gold on dark; up to 72px with `lg:text-7xl`).
    - The intro (`max-w-200`), then "Start a project" and "See how we work" (`/#process`, replacing "Explore services").
    - The copy is at the top of the file, as before.
  - `Eyebrow.tsx`: a new `chip` variant (`w-fit rounded-md bg-primary/15 px-2.5 py-1 font-medium text-accent`, Geist). `font-mono` moved from the base into `section` and `plain`, so those are unchanged.
  - `Platforms.tsx`: a `border-t border-border` against the now-dark Hero, as in the old site's screenshot.
  - Checked in headless Chrome at 320, 375, 768, 1024, 1232 (your image's width) and 1440:
    - The hero starts at y 0 under the 68px header. No horizontal scroll, layout shift 0, one `h1`, no console errors.
    - H1 36 / 36 / 60 / 72 / 72 / 72px. From 768 it breaks exactly as in your image: "Tailor-made stores built" / "your way, from scratch."
    - The intro is two lines from 768 ("…WordPress sites and UI/UX —" / "no cookie-cutter templates…"), and "cookie-cutter" never splits.
    - Colours: chip text gold #E6AC0E on its tint, "your way" gold, intro #A0A0A0 (6.1:1 on #222). The buttons are 48px tall and link to `/#contact` and `/#process`. The Platforms border is #3D3D3D.
  - Docs:
    - CLAUDE.md: the theme rule (the Hero is dark).
    - DESIGN.md: Theme, Typography (H1, Eyebrow `chip`), Spacing (hero padding, column, intro, dot grid), Cards → Platforms (border), Shared UI.
    - PLAN.md: structure, section 2, the Copy table.

- **Process animation** (2026-10-01, your request "in section add this animation" with `.claude/reference/process-animation.json`; committed 2026-10-02):
  - Checked first, by rendering 15 frames in headless Chrome:
    - It's a 1200×400, 14 s loop (30 fps) of the four steps on a timeline above a white card, drawn for a dark background.
    - Its colours are gold #E6AC0E, #222, #3D3D3D, white and light greys only, with no fonts, images or text layers.
    - Its content stays in x 208–1001, y 23–391 over the whole loop.
  - `public/animations/process-steps.lottie` (new, 9,272 B), packed with Python's `zipfile` and the same manifest as the other custom files. The only edit is the internal name: "ecomwisers-process-v3" → "ecommercewisers-process" (the brand rule). Nothing in the animation itself changed.
  - `Process.tsx`: a `LottieAnimation` (`fit="cover"`, still frame 360) between the heading and the steps, in a box of `mx-auto mt-12 aspect-9/4 w-full max-w-5xl sm:aspect-5/2 lg:aspect-3/1`. Narrow screens crop the empty sides, and from `lg` it shows the whole canvas. The data is at the top of the file.
  - Checked against the dev server in headless Chrome at 375, 768, 1024 and 1440:
    - Boxes of 343×152, 705×282, 945×315 and 1024×341, with the steps 48px below.
    - It plays, it's `aria-hidden`, layout shift is 0, and there's no horizontal scroll.
    - Over a full 14 s loop, no content reaches the outer 2% of the box on either side.
    - Under reduced motion it holds the still: the whole timeline gold, the launch scene built.
    - A plain page load has a clean console, and the largest paint is still the hero text. A Next `<Image>` LCP warning appeared only when my test jumped straight to the section before the page settled.
    - `npm run check` passes, and the `/ew-test` sweeps are clean.
  - Fixed on the way: CLAUDE.md and DESIGN.md called the Platforms strip "the only content that moves by itself", which wasn't true (the Lotties loop too). It now says "the only auto-moving carousel".
  - Docs: CLAUDE.md (dotLottie uses, the Performance exception), DESIGN.md (Cards → Process, Animation → The Process animation, Shared UI), PLAN.md (structure row 5, section 5).

- **Process: a seamless loop and the steps in sync** (2026-10-01, your request "enhance this animation and make this section more effective, according to the animation"; committed 2026-10-02):
  - Your choice: **side by side** from `lg` (over keeping the stacked layout).
  - **The animation, reworked** (`public/animations/process-steps.lottie`, 9,164 B). A Python script (`json` and `zipfile`, outside the project) does the following; your reference file is unchanged:
    - It turns the intro's keyframes (all ≤ frame 50) into their final values, so everything is on screen from frame 0, and drops the root fade-out.
    - It moves every later keyframe 30 frames earlier, keeps the ambient dots' paths closed, and adds the rewind (364–386: the pointer goes back; the connectors, rings and progress bar retract).
    - The result is a 390-frame (13 s) loop instead of 420 (14 s).
    - Measured over every frame: the 389 → 0 wrap is pixel-identical. The largest frame-to-frame change is 20, against 306 and 270 for the old fade-out and pop-in. No frame is empty (13 nearly-empty samples before).
  - **The section:**
    - `sections/ProcessPlayer.tsx` (new, client) shows the four steps as cards beside the animation and follows the player's `frame` events.
    - The current card is `bg-surface` with `aria-current="step"`, and a gold bar down its left edge fills with the scene, then stays full, like the timeline. Each title is a button stretched over its card, and choosing a step jumps the animation to it.
    - Under reduced motion, a still with every step done, and choosing a step shows its own still.
    - `Process.tsx` keeps the copy and the step frames (`start`, `still`).
    - `ui/LottieAnimation.tsx` gained `onPlayer?`.
    - `ui/SectionGrid.tsx` was **deleted**: Process was its last user (no dead code).
  - Checked against the dev server in headless Chrome at 375, 768, 1024 and 1440:
    - Side by side from 1024 (at 1440 the list is 519px wide and the animation 778×346); stacked with the animation on top at 375 and 768.
    - No horizontal scroll and layout shift 0. A plain load has a clean console, and the largest paint is still the hero text.
    - Over 15 s the current step went Discover → Design → Develop → Launch → Discover. Each bar filled from about 0 to 1 within its step, earlier bars stayed full and later ones empty.
    - Clicking the Develop card (away from its title) made it current with its bar restarting (0.15). Enter on the focused Discover button did the same for Discover. The focus ring is gold.
    - Reduced motion: Launch is current with every bar full and the canvas still. Choosing Discover shows a different still, which stays put, with only the first bar full.
    - `npm run check` passes, and the `/ew-test` sweeps are clean.
  - Docs:
    - DESIGN.md: Cards → Process, `FeatureItem`, Animation → The Process animation, Shared UI (`ProcessPlayer`, `LottieAnimation`'s `onPlayer`, `SectionGrid` removed).
    - PLAN.md: structure row 5, section 5.

- **The new Process animation, the dashboard version** (2026-10-01, your request "use this animation in Process" after replacing `.claude/reference/process-animation.json` at 23:42; committed 2026-10-02):
  - Checked first:
    - It's a new file: 1000×600, 474 frames (15.8 s), with step markers (discover 24, design 120, develop 216, launch 312). A 3×4 grid of tiles (a row per step) lights up row by row and feeds a "Your store" panel that builds to a live sales chart.
    - Rendered 18 frames, then candidate stills. The content spans x 17–980, y 37–558. It's blank for about 0.8 s at each loop (453–473 and 0–3).
    - Colours: gold, neutral greys and #3D3D3D, with no other hues. It has **gradients**: gold-to-#F2F2F2 tile borders, and gold-to-transparent fills on the hero and the chart.
  - `public/animations/process-dashboard.lottie` (new, 31,839 B): packed by a Python script (`json`, `zipfile`), with the gold set exactly to #E6AC0E (79 values were #E6AB0D) and the brand spelling in its name. Nothing else changed: the fade, the gradients and the timing are as you made them.
  - `public/animations/process-steps.lottie` (my reworked copy of the first file, never committed) was deleted, since nothing uses it.
  - `Process.tsx`: the new file, 474 frames, step starts from the markers (0, 120, 216, 312) and stills 104 / 208 / 306 / 440. `ProcessPlayer.tsx`: the animation box is now `aspect-video` at every width (it was 9:4 / 5:2 for the first file's wide canvas).
  - Checked against the dev server in headless Chrome at 375, 768, 1024 and 1440:
    - The animation is 343×193, 705×397, 529×297 (beside the steps) and 778×438 (beside the steps).
    - No horizontal scroll and layout shift 0. A plain load has a clean console, and the largest paint is still the hero text.
    - Over 17 s the current step went Discover → Design → Develop → Launch → Discover, in time with the tile rows. Each bar filled 0 → 1, with earlier bars full and later ones empty.
    - Clicking a card and pressing Enter on a step both jump the animation. The focus ring is gold.
    - Reduced motion: still, with every step done. Choosing Discover shows its still.
    - `npm run check` passes, and the `/ew-test` sweeps are clean.
  - Docs: DESIGN.md (Colours: the gradient exception; Cards → Process; Animation → The Process animation; Shared UI), PLAN.md (row 5, section 5).

- **The final Process animation** (2026-10-02, your request "remove the old animation and add the new one" with `.claude/reference/process-animation-final.json`; plan approved; committed 2026-10-02):
  - Analysis: the dashboard animation, now 1270×600, with a new 270px **step column drawn into it** on the left: four cards whose number, title, highlight and gold bar follow the markers. That's the same thing the section's HTML list does. The same 474 frames, markers, fade-out loop and gold gradients as before.
  - Your choice: **the full animation on wide screens** (over the full animation everywhere, or keeping the current layout).
  - `public/animations/process-flow.lottie` (new, 52,115 B):
    - Packed by a Python script. All 87 uses of the rounded gold #E6B31A (70 colours, 17 gradient stops) were set to #E6AC0E, by walking colour values only. The name was fixed to the brand spelling. Nothing else changed.
    - `process-dashboard.lottie` was deleted (untracked). Your reference files are untouched.
  - **Copy check:** I rendered the step column at 2× and compared it with `Process.tsx`. All four titles and descriptions match word for word, so no copy changed.
  - `ui/LottieAnimation.tsx` gained `align?`.
  - `ProcessPlayer.tsx`:
    - **Below `xl`:** the animation is a 5:3 box kept right (canvas x 270–1270: the tiles and panel), stacked over the synced list, or beside it at `lg`.
    - **From `xl`:** the whole canvas, the interactive list `xl:hidden`, and a static `sr-only` list (H3 + text, no buttons) for screen readers.
  - `Process.tsx`: the new file and comment. The start frames (0 / 120 / 216 / 312) and stills (104 / 208 / 306 / 440) are unchanged, and confirmed on renders.
  - Checked against the dev server in headless Chrome at 375, 768, 1024, 1280, 1440 and 1920:
    - Boxes of 343×206, 705×423, 529×317 (5:3), then 1201×567, 1361×643 and 1376×650 (2.117, the whole canvas).
    - From 1280: the interactive list is hidden with 0 focusable buttons, the screen-reader list is `sr-only`, and the accessibility tree has Discover, Design, Develop and Launch once each. Tab from the Process heading goes straight to the next section.
    - The crop: over a full 16 s loop, nothing opaque in the left 1% of the box at 375 and 1024, so no sliver of the step cards.
    - Below 1280: over 17 s the current step went Discover → Design → Develop → Launch → Discover, with the bars filling in step. Click and Enter jump the animation.
    - Reduced motion: the default has every step done, and choosing Discover shows its still. At 1440 the canvas holds still.
    - No horizontal scroll and layout shift 0 everywhere. A plain load has a clean console, and the largest paint is still the hero text.
    - `npm run check` passes, and the `/ew-test` sweeps are clean.
  - Docs: DESIGN.md (Colours note, Cards → Process, Animation → The Process animation, Shared UI), PLAN.md (row 5, section 5).

- **The Process animation for phones** (2026-10-02, your request "use `process-mobile-b.json` in mobile view only, ask me if anything is unclear"; plan approved; committed 2026-10-02):
  - Analysis: a 400×740 portrait companion to the final file, with the same 474 frames and markers. A tracker, then one step's text and tile row at a time (sliding at each marker), above the same store panel. The same rounded gold, gold gradients and fade-out loop.
  - Your choices: **phones only, below 640px** (over below 768px or below 1024px), and **the HTML steps stay visible** under it on phones (over screen readers only; removed later the same day at your request, see the next entry).
  - `public/animations/process-flow-mobile.lottie` (new, 55,392 B): packed by the same script, now taking the name and id as arguments. All 91 gold values were set to #E6AC0E (74 colours, 17 gradient stops), and the name was fixed. **Copy check:** the four texts match `Process.tsx` word for word.
  - `ProcessPlayer.tsx`:
    - A live `phone` flag (`(max-width: 639px)`); `reduced` now uses the same small `mediaQuery` helper.
    - On phones the animation is the portrait file, whole, in an `aspect-20/37` box (at most 400px wide); otherwise it's as before.
    - The player mounts only after hydration, so each visitor downloads one file. A same-size `aria-hidden` box holds the space until then.
  - `Process.tsx`: `animation.mobileSrc`, and the comment.
  - Checked against the dev server in headless Chrome:
    - **Phones** at 320, 375 and 639: portrait boxes 288×533, 343×635 and 400×740 (centred), only `process-flow-mobile.lottie` fetched, and the list under it.
    - **640 and up:** only `process-flow.lottie`, with 640 and 768 stacked (5:3), 1024 side by side and 1440 whole, as before.
    - **Sync at 375:** Discover → Design → Develop in step. Tapping the Develop card (scrolled into view) jumps there, and the animation plays Develop when scrolled back.
    - **Resize and scroll:** resizing 375 → 800 → 375 swaps the file each way and keeps the sync. Scrolled off screen it freezes, and back in view it resumes (also at 1440).
    - **Reduced motion at 375:** a still with every step done, and choosing Design shows its still.
    - No horizontal scroll and layout shift 0 everywhere. A plain load has a clean console, with the hero text as the largest paint.
    - `npm run check` passes, and the `/ew-test` sweeps are clean.
  - Docs: DESIGN.md (Cards → Process: the phone layout; Animation: the phone file; Shared UI: `ProcessPlayer`), PLAN.md (row 5, section 5).

- **The Process step list removed on phones** (2026-10-02, your request "remove on mobile", with a screenshot of the list under the phone animation; committed 2026-10-02):
  - `ProcessPlayer.tsx`: the interactive list is now `hidden flex-col gap-2 motion-reduce:flex sm:flex xl:hidden`, and the static copy `sr-only motion-reduce:hidden sm:hidden xl:block`. Phones show the heading and the portrait animation only; screen readers get the static copy, as from `xl`.
  - **Kept under reduced motion (my call):** the phone still shows only Launch's text, so the other three steps would be unreadable. With reduced motion set, phones show the list under the still, as before. Say if you want it gone there too.
  - Checked against the dev server in headless Chrome, with and without reduced motion, at 320, 375, 639, 640, 768, 1024, 1279, 1280 and 1440:
    - **Phones:** no list and no buttons, the copy `sr-only`. The section is 911px tall at 375 (was about 1,600). Under reduced motion the list shows under the still.
    - **640–1279:** the list and its 4 buttons as before. **From 1280:** the `sr-only` copy, as before.
    - Each step heading is exposed exactly once in the accessibility tree at every width.
    - The phone animation plays; resizing 375 → 800 → 375 shows and hides the list. Layout shift 0, no horizontal scroll.
    - `npm run check` passes, and the `/ew-test` sweeps are clean.
  - Docs: DESIGN.md (Cards → Process, Animation, Shared UI), PLAN.md (row 5, section 5).

- **Carousel dots** (2026-10-02, your request "splide pagination not show" on the Portfolio; committed 2026-10-02):
  - Cause: your `Carousel.tsx` edit (`pagination: true`, `arrows: false`) turned Splide's pagination on, but its core CSS leaves the page buttons unstyled, so they were empty 0×0 buttons.
  - `ui/Carousel.tsx` (shared, so the Video reviews get the dots too, as they lost the arrows with the same edit):
    - The page buttons get Tailwind classes through Splide's `classes.page`: an 8px round dot in a 24×24 target: a grey ring for the other pages, filled with the accent (black on white, gold on dark) for the current one. The same day: first short bars in 44px targets; then **round dots** ("pagination must be dots"), the current one larger; then, as that looked uneven and scattered ("pagination not looking good"), **same-size, tight dots**. Your choice: 24px targets, an exception to the 44px rule (logged in CLAUDE.md and DESIGN.md), over keeping 44px.
    - A `.splide__pagination` placeholder in a `mt-8 h-6` box, so the dots' space is held before mount.
  - Left as you set it: `arrows: false`. The arrow markup is still in the file but never shows (Splide's core CSS keeps the carousel hidden until it mounts, then it hides the arrows), so it's unused code now. Say if I should remove it, or bring the arrows back beside the dots.
  - Checked against the dev server in headless Chrome at 320, 375, 768, 1024 and 1440:
    - Both carousels: 2 dots from `lg`, 3 on tablets, 5 / 6 on phones; 24×24 targets side by side, centred. Dots 8×8: rings `#222` at 70% on white and #A0A0A0 on #222; the current one filled black on white, gold on dark (rechecked after each change, with zoomed captures at 1× and 2× density).
    - Clicking dot 2 moves to page 2 (on phones, slide 2), and the current dot follows. Hover darkens an idle ring and leaves the current dot. ArrowRight moves focus and the slide, wrapping on the last; the focus ring shows (black on white, gold on dark).
    - Section heights are the same with and without JS (within 0.02px), layout shift 0, no horizontal scroll. Under reduced motion the dots change instantly.
    - `npm run check` passes, and the `/ew-test` sweeps are clean.
  - Docs: CLAUDE.md (Responsive: the tap-target exception), DESIGN.md (Cards → Carousel arrows and dots, Accessibility, Shared UI → `Carousel`), PLAN.md (6b).

- **Cards centred on phones** (2026-10-02, your request "make them center on mobile", with screenshots of the Features, Services and Why cards; committed 2026-10-02):
  - `ui/FeatureItem.tsx` (shared by all three): the card is `text-center sm:text-left`.
  - The markers: `mx-auto sm:mx-0` on the Features tile (`Features.tsx`), the Services ring (`Services.tsx`) and the Why tile (`WhyUs.tsx`).
  - **The Services checklist:** the list is centred as a block (`mx-auto w-fit`, as wide as its longest row), and its rows are left-aligned with the ticks in one column (your request: "ul centred, li left"). Before that, the same day: centred flex rows (the tick far from wrapped text), then centred rows with the tick inline. From `sm` it's as before.
    - A list whose longest row wraps fills the card, so on narrow phones it reads left-aligned. All four fit on one line from about 418px wide: Shopify from 386, Figma to Web from 407, WordPress from 418, Next.js always. At 375 only Next.js is a visibly centred block.
  - Below 640px only, the same phone breakpoint as the Process animation. From 640px nothing changes: Features puts the tile beside the text there and Why goes to two columns.
  - Checked against the dev server in headless Chrome at 320, 375, 639, 640, 768 and 1440: below 640 all 12 markers are centred in their cards, every title and line is centred, and each checklist is centred as a block (0px off) with its ticks in one column and its rows left-aligned. From 640 all are left-aligned, with the checklists full width as before. No horizontal scroll, clean console.
  - `npm run check` passes, and the `/ew-test` sweeps are clean.
  - Docs: DESIGN.md (Cards: the Services checklist, the centring note; Shared UI → `FeatureItem`).

- **Contact section** (2026-10-02, your request "make a contact us section with name, email and message, no SMTP setting for now", with a screenshot; plan approved; committed 2026-10-02):
  - Your choices:
    - **Submit:** check the fields (browser, then a Server Action), then say plainly that sending isn't set up yet. Not: opening the visitor's email app.
    - **Placement:** it **replaces the CTA** and its `#contact` anchor, so there are still eleven sections. Not: added after the CTA.
    - **Details:** **email only**. The screenshot's WhatsApp number (+1 555…) and London address look like sample data.
    - **Copy:** no "within one business day" promise.
  - New `sections/Contact.tsx` (server): the copy, and `contact`, `contactHref` and `startProject` (moved from `Cta.tsx`, with the placeholder comment). A light-grey panel: the chip eyebrow, H2 and intro and the email on the left, the form on the right (stacked below `lg`).
  - New `sections/ContactForm.tsx` (client, small): labelled Name, Email and Message fields (`required`, `maxLength`, `autoComplete`), "All fields are required.", a `role="status"` line, and "Send message" ("Sending…" and disabled while pending). `useActionState`; the values come back as `defaultValue`, so they survive React's form reset.
  - New `sections/sendMessage.ts` (`"use server"`): trims and checks every field again (1–100 / an email pattern, up to 254 / 1–5000), since a Server Action is a public endpoint. It returns the errors, or "not sent", with a one-line marker where SMTP goes. No new dependency.
  - `ui/ButtonLink.tsx`: `buttonClass()` exported, so the submit reuses the button styles. `ui/SectionHeading.tsx`: `eyebrowVariant` (`chip` for Contact).
  - `page.tsx` renders `<Contact />` where `<Cta />` was; Header, Hero, Services and Footer import from `sections/Contact`; `Cta.tsx` is deleted; `/ew-test` expects the `example.com` hit in `Contact.tsx`.
  - Checked against the dev server in headless Chrome:
    - **Layout:** stacked at 320, 375 and 768; side by side at 1024 and 1440. Fields 48px tall (the textarea 170px), the button 48px, the email link 44px; 16px text in the fields. No horizontal scroll, layout shift 0.
    - **Accessibility tree:** a "Get in touch" region; text boxes named Name, Email and Message; the "Send message" button; one status; one `h1`, headings in order.
    - **Contrast** (measured): labels 14.3:1, the required note 5.67:1, field borders 5.67:1 on the panel and 5.92:1 on the field, typed text 15.9:1, the chip 13.1:1.
    - **Keyboard:** the email link → Name → Email → Message → Send message, each with the 2px focus ring.
    - **Empty submit:** blocked by the browser, no request, focus on Name. **Invalid email:** blocked, focus on Email.
    - **Valid submit** (on a slowed network): one POST, "Sending…" and disabled while pending, then the not-sent note in the status line, with the typed values still there.
    - **Browser checks bypassed** (with JS): the server's three errors under their fields, with `aria-invalid` and `aria-describedby`, and "Check the fields marked above." (it said "below" at first, though it sits under the fields; fixed).
    - **Links:** the Hero's "Start a project" lands on `#contact`; 7 links point there; the Footer email is unchanged. Clean console.
    - `npm run check` passes (`/` is still static), and the `/ew-test` sweeps are clean (`example.com` only in `Contact.tsx`, expected).
  - Docs: CLAUDE.md (the section list, the shared exports), DESIGN.md (the rhythm, the chip eyebrow, buttons, Cards → Contact, Shared UI), PLAN.md (the checklist, row 7, section 7, the copy table, the file list).

- **Why cards: hover** (2026-10-02, your request "on hover the background, text and icon colours change", with a screenshot of the four cards; committed 2026-10-02):
  - `WhyUs.tsx`: on hover a card inverts to black (`hover:bg-foreground`, the border too), its title white and its line white at 70%; the icon tile turns gold with a black icon (`group` on the card, `group-hover:` on the tile). 300 ms colour transitions. You didn't name the colours, so I used the site's dark style (#222, white, the gold accent).
  - Checked in headless Chrome at 1440: before, a white card with a black tile; hovered, #222 with a white title (15.9:1), the line at 8.5:1, a gold tile (7.8:1 on the card) and a black icon (7.8:1). The neighbouring cards stay white, and it reverts on mouse-out. The built CSS has the hover rules inside `@media (hover:hover)`, so touch screens don't get them. Instant under reduced motion. Clean console.
  - `npm run check` passes, and the `/ew-test` sweeps are clean.
  - Docs: DESIGN.md (Cards → Why: the hover; and your own edit to the panel, now first and without a border or shadow).

- **Codebase review and fixes** (2026-10-02, your request for a full review: bugs, performance, code quality, architecture, security, technical debt; plan approved; committed 2026-10-02):
  - Scope: every file in `src/`, the configs and `.gitignore`. Tested on the dev server and a production build (`next start`): no-JS loads, form submits with and without JS, menu edge cases, headers and caching, the console. There are no payments, subscriptions, feature gating or authentication on the site.
  - 20 findings. Fixed (your choice: all four groups, and remove the arrow code):
    - **Carousels blank until JavaScript** (Portfolio, Reviews, the logo strip): Splide's core CSS hides `.splide` until mount. They now carry `is-rendered`, and the pre-mount gap applies (`mr-6!`).
    - **Found while verifying, pre-existing:** under reduced motion the phone carousels started half a slide off, and 24px off on desktop. Root cause: the global reduced-motion rule set `transition-duration: 0.01ms` on every element, which made every style change a transition, so Splide measured the old layout. It's `0s` now (`globals.css`).
    - **Security headers** (`next.config.ts`): a CSP without nonces (`/` stays static; `wasm-unsafe-eval` for dotLottie, `unsafe-eval` in dev only), `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY`. `X-Powered-By` is off.
    - **Caching:** the WASM is renamed `dotlottie-player-0.80.0.wasm` and cached forever; the animations, videos and platform logos for a day (they were `max-age=0`).
    - **Form hardening:** control characters (line breaks) in the name are rejected ("Enter your name on one line."), against email header injection once SMTP sends. A honeypot field (`website`, hidden from sight and screen readers, out of the Tab order) makes a bot get the usual answer and nothing sent.
    - **Mobile menu:** widening past `md` with it open now closes it. It used to stay "open" (invisible), so the header could never hide.
    - **Video `play()`:** an interrupted play (pause while loading) logged an unhandled `AbortError`; it's caught now.
    - **Dead code removed:** the carousel arrows (markup, classes, `prevLabel`/`nextLabel`, the two chevron icons) and the unused `surface-muted` token. `ScrollHeader` measures the header instead of a hard-coded 68px.
    - **Repo hygiene:** `.claude/reference/` (11 MB, including an 8.7 MB recording) is ignored, and the README is a short project one.
    - **Not confirmed, so not changed:** clone state after a breakpoint change. Splide keeps the same clones across breakpoints, so they never copy a live card's state.
  - Left for you or other inputs (Known issues): the real email, SMTP and real reviews (deploy blockers); pause controls for the logo strip and the Process animation (WCAG 2.2.2); the Process animation's dim text contrast; a favicon or logo and the domain for the metadata (`metadataBase`, Open Graph, robots, sitemap); the hero copy vs the four services; the stray `ser2.png` in the repo root (not the same file as the reference one); `@types/node` 20 on Node 24.
  - Checked, on the production build and the dev server:
    - **Headers:** the CSP and the four other headers are on every response, `X-Powered-By` is gone, the WASM is `immutable`, and animations, videos and platform logos are `max-age=86400`. No CSP violations while every Lottie plays, the carousels move, the videos run and the form posts.
    - **Before JS:** the logo strip, Portfolio and Reviews are visible, with a 24px gap. After mount the first slide is in the same place (to the pixel) at 375 and 1440, with and without reduced motion.
    - **Layout and controls:** layout shift 0 loading `/`, `/#work` and `/#reviews` at 375 and 1440. The dots and arrow keys work, and no arrow markup is left. All six Lotties animate in view.
    - **Mobile menu:** open at 375 and widen to 1280: it closes and the header hides on scroll down again.
    - **Header:** 68px tall, shown at 60px of scroll, hidden at 400.
    - **Video:** a rapid play then pause on a slow network logs no error (before the fix: an `AbortError`).
    - **Form:** a normal submit gives the usual note. A filled honeypot gives the same note. A line break in the name gives the error.
    - **Process:** unchanged at every width, with and without reduced motion. Clean console.
    - `npm run check` passes (`/` static), and the `/ew-test` sweeps are clean.
  - Docs: CLAUDE.md (the WASM note, the token list, a Performance line on headers and caching), DESIGN.md (carousels, icons, tokens, Shared UI, the reduced-motion guard), PLAN.md (the deploy checklist, 6b).

- **Eyebrow chips** (2026-10-02, your screenshot "make all eyebrows like that"; plan `.claude/plans/make-all-eybrow-like-ticklish-glacier.md`):
  - `ui/Eyebrow.tsx`: `chip` is the default variant. The `section` variant (gold dot, muted label, gold line) and its markup are removed. `plain` stays for the portfolio card labels (not in scope).
  - `ui/SectionHeading.tsx`: the `eyebrowVariant` prop is removed, so every section eyebrow (What we do, Why ecommercewisers, Process, Work, Video reviews, Contact) renders the chip. `Contact.tsx` and `Hero.tsx` drop their explicit `chip`.
  - Contrast: gold on the tint over #222 (≈5.8:1) in the dark sections; black on the tint on white and on the grey Contact panel (13.1:1). No gold text on light.
  - Docs: DESIGN.md (the eyebrow row, the `primary` role, the Shared UI table), CLAUDE.md (the `primary` role).
  - Checked: `npm run check` passes (`/` static) and the `/ew-test` sweeps are clean.

- **Design refinement pass** (2026-10-02, your request "audit all UI components for visual improvements"; plan `.claude/plans/make-all-eybrow-like-ticklish-glacier.md`). An audit of every section at 1440 and 375 (screenshots), then your three choices and the fixes:
  - **One gold accent language** (your choice): a 15% gold tint marks labels and icons, solid gold marks actions and active states. New shared `ui/IconTile.tsx` (a `size-6` icon on a `size-12 rounded-md bg-primary/15` tile) replaces the Services gold ring and the black Why tiles. The Why hover is unchanged except that the tile turns from the tint to solid gold. Features keeps its white animation tiles.
  - **Section titles** (your choice): `SectionHeading`'s H2 is 30 / 36 / 48px with `text-balance`. The plan said 48px from `lg`; at 1024 the Services title broke one word a line in its ~360px column, so 48px starts at `xl` (1280). Every title is balanced at 320–1440, which also fixes the lone "store" on the Services title at 375. Eyebrow to H2 is `mt-4`, and the intro is `text-pretty`.
  - **Features eyebrow** (your choice): "Included". Every section heading now has a chip.
  - **Hierarchy:** the portfolio card labels (`Eyebrow` `plain`) are muted instead of black, so the project names lead. The footer column titles are small uppercase labels. The Contact email is a labelled block (label "Email", address `text-lg font-medium`) instead of one small line.
  - **Spacing:** sections `lg:py-28`; heading to content `lg:mt-16` (Features, Why, Process, Portfolio, the Reviews notice).
  - **Cleanup:** the Why list's indentation; the Why panel's `rounded-lg bg-background`, invisible on white, dropped; stale comments in `FeatureItem` and `globals.css`.
  - Docs: DESIGN.md (Colours with the tint/solid rule, Contrast, Typography, Spacing, Cards, Icons, Shared UI), CLAUDE.md (the primary row).
  - Checked:
    - `npm run check` passes (`/` static) and the `/ew-test` sweeps are clean.
    - In headless Chrome at 320, 375, 768, 1024, 1280 and 1440: no horizontal overflow; every H2 at 30/36/48px with no single-word last line; all 8 tiles 48×48 with a black icon on the tint (14.3:1, calculated).
    - A forced `:hover` on a Why card gives a #222 card, a white title, a 70% white line and a solid gold tile with a black icon.
    - Plain loads at 375, 1024, 1280 and 1440 have a clean console. The only warnings, "image detected as LCP", came from the script's full-height screenshots, not from a real load.
    - Before and after screenshots of every section at 375 and 1440 were compared (scratchpad, not committed).

- **Code audit pass** (2026-10-02, your request "audit all code … component organization … consistent theming"; plan `.claude/plans/make-all-eybrow-like-ticklish-glacier.md`). Your note asked for "premium" UI; the brand rule bans the word, so it's nowhere in code or copy.
  - **Organisation** (your choice): sections with private parts have folders: `sections/header/` (Header, MobileNav, ScrollHeader), `process/` (Process, ProcessPlayer), `reviews/` (Reviews, ReviewsCarousel, ReviewCard), `contact/` (Contact, ContactForm, the `sendMessage` Server Action) and `footer/` (Footer, FooterColumn). The six one-file sections stay flat. Files were moved with plain `mv` (the git index is untouched), and every import was updated.
  - **Performance:** the dotLottie player is a `next/dynamic` import and mounts only within 400px of the viewport. The first load's JS went from 234.5 to 202.5 KB gzipped (−32 KB, −14%), with the player in its own 34 KB chunk. See Known issues → Code animation weight for what still loads right after hydration.
  - **Duplication removed:**
    - `src/lib/useMediaQuery.ts` (`useMediaQuery`, `REDUCED_MOTION`) replaces the media-query listeners in `ProcessPlayer` and `LottieAnimation`. `LogoStrip` reads the shared query directly, in its rAF loop.
    - `ui/SplideTrack.tsx` holds the track, list and slide markup that `Carousel` and `LogoStrip` each repeated.
    - `Eyebrow` gains a `label` variant and `as` (`p`/`h2`), replacing the two copies of the small-label classes (Contact, FooterColumn).
  - **Layout** (your choice): the Hero is centred over the dot grid, so its right half no longer stands empty.
  - **Theming** (your choice): the Why cards are on the grey surface (`bg-surface`, no shadow), like Features and Contact. The hover is unchanged. The icon is 13.1:1 on the tint over grey.
  - **Audited, no change:** headers and CSP, static rendering, images, fonts, form validation, the tokens (the sweeps are clean). Not touched: `ser2.png`, `.claude/plans/CLAUDE.md`.
  - Docs:
    - CLAUDE.md: the folder rule, the shared-data paths, lazy Lotties, `WASM_URL`
    - `ew-test.md`: the expected `example.com` path is now `sections/contact/Contact.tsx`
    - DESIGN.md: Hero, Why cards, Animation, Shared UI
    - PLAN.md: the file list
    - Known issues: seven outdated lines fixed, two resolved items removed
  - Checked:
    - `npm run check` passes (`/` static), the sweeps are clean, and no old import paths remain.
    - Dev server, CDP: the animations still mount, play and freeze; Features, Why and Process are the same height before and after the players mount; the three Splide instances mount; the Hero is centred (208px each side at 1440, 16px at 375) with no overflow; the Why card is grey at rest, black with a solid gold tile on forced hover; the console is clean.
    - **Production build** (`next start` on :3100, then stopped) at 375×800, 768×1024 and 1440×900: layout shift 0 over load and a full scroll; 9 JS requests; all six animations load as you scroll; the console is clean. The dev server shows a 0.03 shift from the Platforms slides at 1440: React Strict Mode mounts Splide twice in development only.

- **Portfolio browser-frame cards** (2026-10-02, your note "this section not looking good"). The diagnosis: the 4:5 strips squeezed a whole homepage into each card (unreadable, and four clashing store palettes); the raw screenshots had no framing (the light Ecomus page faded into the white section); it was the only white section without grey surface cards; and the mono capitals of the labels competed with the names. Your choices: **keep the carousel**, with **browser-frame cards**.
  - Each project is a grey surface card (`bg-surface p-4`, `h-full` for equal heights) holding a white browser frame (a bar with three decorative dots), with the screenshot cropped to **4:3** (16:10 at first; taller at your request, "increase the height"), so the store's hero shows at a readable size. The hover-scroll stays, retimed for the frame (`height / width − 0.75` s, 2.0–5.7 s).
  - The name comes first (H3, now `text-balance`), then the label in `text-sm text-muted` sentence case. `Eyebrow`'s `plain` variant lost its only user, so it was removed. The names, labels and images are unchanged (confirmed by you in cycle 7).
  - Docs: DESIGN.md (Images → the Portfolio card, the hover-scroll exception, the Eyebrow rows).
  - Checked:
    - `npm run check` passes.
    - In headless Chrome at 320, 375, 768, 1024 and 1440: no overflow; the first slide in the same place before and after Splide mounts; every card the same height; the label at black 70%; a clean console.
    - A forced hover moves the image from `50% 0%` to `50% 100%` over 4.5 s on the Ella card (4:3).
    - Screenshots were compared with the old cards.
  - **Then, the same day ("still looking not good"):** the cards were still too small for the 1440 layout (290px screenshots), the grey card, white frame and bar made three nested outlines, and the frames cut content off. Your choices: **3 per view with lighter cards**, and you'll **send larger screenshots** of the three small projects.
    - `Carousel` gains `perPage?: 3 | 4` (default 4, with the matching pre-mount slide width). The Portfolio uses 3 from `lg`; the video reviews stay at 4.
    - The grey outer card is gone. Each slide is one browser frame on the page (`rounded-lg border bg-background`, a light-grey `bg-surface` bar with three dots), then the name and label. The screenshots are 441×330 at 1440 (were 290×218) and 302×226 at 1024 (were 186×140).
    - Checked: `npm run check` passes; at 320–1440 no overflow, the first slide in place before and after mount, the hover-scroll at 4.5 s, a clean console; the Portfolio shows 3 from 1024 and the reviews 4 (2 each at 768).
  - **Then ("increase height and use dark colour"; your choices: a dark section, 4:5 frames):**
    - The Portfolio is a dark section (`<Section dark>`), so Process, Portfolio and Reviews are three dark sections in a row. A full-width `border-y border-border` (1px #3D3D3D) separates them, like the Hero and the logo strip. Inside, the tokens flip by themselves: a #222 frame with a #2E2E2E bar and white-at-20% dots, a white name, a #A0A0A0 label (6.1:1), a gold chip and gold dots.
    - The frames are **4:5**: 441×551 at 1440, 302×377 at 1024, 272×341 at 375. The hover-scroll is retimed (`height / width − 1.25` s): 4.0 s for Ella, 1.5–5.2 s across the five.
    - Docs: CLAUDE.md (the theme rule's exception, the dark-section list), DESIGN.md (Theme, the rhythm, the Portfolio card, the hover-scroll, the dots), and the `globals.css` comment.
    - Checked: `npm run check` passes; at 320–1440 no overflow, the first slide in place, the label #A0A0A0, the hover-scroll at 4.0 s, a clean console; both dividers render at 1px #3D3D3D (screenshots at 1440).

- **Logo** (2026-10-02, your request "use logo in our website", then "use logo from img, not text"). Your wordmark SVG from `public/logo/` replaces the text wordmark in the Header and Footer. I flagged first that its letters read "eCom Wisers", against the brand rule; you chose to use it.
  - `Wordmark.tsx` is generated from the SVG file: its viewBox and single path, copied unchanged (checked byte for byte), drawn with `fill="currentColor"`, so it's white in the dark header and footer and visible in forced-colours mode (an `<img>` would render black). `block h-5 w-auto`: 157×20px. `role="img"`, `aria-label="ecommercewisers"`.
  - The file names in `public/logo/` keep your old-spelling names. Nothing in `src/` mentions them, so the brand sweep stays clean. The lockup file is unused.
  - Docs: CLAUDE.md (the brand rule's logo exception, the logo line), DESIGN.md (Logo, Shared UI), Known issues (the spelling and WCAG 2.5.3, replacing "No logo").
  - Checked: `npm run check` passes; the sweep finds no old spellings in `src/`; at 320, 375, 768 and 1440 the logo is 157×20, white, `role="img"` named "ecommercewisers"; the header link target is 157×44; no overflow; a clean console; screenshots of the header and footer.

- **Second code audit** (2026-10-02, from your pasted "audit and redesign" prompt). Most of the prompt conflicted with CLAUDE.md (a new palette with orange, purple and cyan; gradients; parallax and scroll animation; an auto-rotating testimonial carousel; invented testimonials, socials and a newsletter; masonry and filters on the Portfolio; a dark-mode toggle; the banned word). You chose **keep my rules, do what fits**, and **skip the motion for now**. The non-conflicting extras were already in place (Lottie icons, 44px targets, lazy WebP images, AA contrast, 320–1920 responsiveness).
  - **Audit, read-only:**
    - Static: no unused exports, every icon used, no dead CSS. The only `style=` props pass data-driven CSS variables, so they stay.
    - Rendered at 375, 1440 and 1920: every visible text element passes AA (lowest 5.04:1); one `h1`; no skipped heading levels; landmarks and `lang` present; every image has alt text; no duplicate IDs; no positive `tabindex`; targets at least 44px (except the approved dots); no overflow. The logo link's computed name is "ecommercewisers".
  - **Fixed:**
    - `sections/contact/limits.ts`: one source for the form's `maxLength` and the Server Action's limits (they were typed twice).
    - `src/lib/breakpoints.ts` (`atLeast`, `below`, `maxPx`): one source for the breakpoints that `Carousel`, `LogoStrip`, `ProcessPlayer` and `MobileNav` each typed by hand.
    - `MAX_STEP_MS` in `LogoStrip` and `FRAME_RATIO` (tied to `aspect-4/5`) in `PortfolioPreview` name the last magic numbers.
    - Geist Mono is `preload: false`. It sets only the Process step numbers (640–1279px), so phones and wide desktops now fetch one font file instead of two (−23 KB).
  - Not changed: the `public/logo/` files (yours; unused at runtime since the wordmark is inlined).
  - Docs: CLAUDE.md (the `src/lib/` helpers), DESIGN.md (Typography, Shared UI).
  - Checked:
    - `npm run check` passes; no raw breakpoints, limits or `1.25` remain outside the new constants.
    - Breakpoints switch exactly as before at 639/640 and 1023/1024: Portfolio 1/2/3, reviews 1/2/4, logo slides 160/192/240px, and the Process file changes from mobile to desktop at 640.
    - The mobile menu closes when the window widens from 767 to 768 and reopens at 767.
    - The step numbers render in Geist Mono at 768, and Geist Mono isn't loaded at 375, 1440 or 1920.
    - `maxLength` is 100/254/5000, and with the browser checks removed the server answers "Keep your name under 100 characters."
    - The a11y sweep is unchanged (0 contrast failures at 375, 1440 and 1920), with a clean console.

- **Content in `src/data/`, flat sections** (2026-10-02, from your pasted "modular website" prompt: "one component, one data file, easy to change"). The prompt's visual parts (yellow, orange and cyan, gradients, parallax, an auto-rotating carousel, masonry, sample testimonials) repeat the previous prompt; they stay declined under your earlier "keep my rules". Your choices: **`src/data/`, one file per section**, and **flat folders**.
  - `sections/` is flat again: the five folders (header, process, reviews, contact, footer) were merged back with plain `mv`, and the imports updated.
  - `src/data/` has 11 files (`header`, `hero`, `platforms`, `features`, `services`, `why`, `process`, `portfolio`, `reviews`, `contact`, `footer`). They hold every text, link, image and Lottie path, carousel and button label, form label, and the server's error messages, with their types. The data files keep the names the components already used.
  - Components now hold only layout and behaviour. Shared content imports from data files, not from other sections: Header, Hero, Services and Footer use `data/contact`; Footer uses `data/header` and `data/services`; `data/header` uses `data/portfolio`. `sections/limits.ts` merged into `data/contact.ts`. `MobileNav` gets its button label as a prop, so the portfolio data stays out of the browser bundle.
  - Not moved: landmark names (`aria-label="Main"`/`"Footer"`), the hidden honeypot's label, layout constants (`FRAME_RATIO`, class strings) and `brand` (still in `ui/Wordmark.tsx`).
  - Docs: CLAUDE.md (the flat-sections and data rules, replacing "each section owns its content" and the folder rule; the shared-content list), `ew-test.md` (the `example.com` hit is now in `src/data/contact.ts`), DESIGN.md (Shared UI paths, `src/data/*`), PLAN.md (the file list).
  - Checked:
    - `npm run typecheck` and `npm run check` pass; no content constants are left in the components.
    - **The rendered page is byte-identical:** the server-rendered body (scripts and stylesheet links removed) is 71,704 characters before and after, with no difference.
    - The strings that only appear after a click match too: "Play video: Placeholder" → "Pause video: Placeholder" → back; "Mute video: Placeholder"; the server's four errors ("Keep your name under 100 characters.", "Enter a valid email address.", "Enter a message.", "Check the fields marked above."). The console is clean.

- **Services: the finished deck holds** (2026-10-02, your request "make section like in image, don't cover all cards on scroll", with the reference image). The diagnosis: the section ended before the last cards stuck (at 90% of the section, cards 3 and 4 were still moving), so the finished deck in the image never showed. Each card slid over the last and the stack left half-built. Your choice: **keep the section dark**.
  - `globals.css`: a `.services-stack::after` spacer (`--stack-hold: 30vh`, only where the cards are sticky, i.e. viewports at least 36rem tall) keeps the sticky cards and heading on screen after the fourth card lands. The shrink ranges now exclude that tail (`100% − --stack-tail`, the gap plus the hold), so the timing is unchanged. The gap moved into the `--stack-gap` variable (1.5rem, 2rem from `md`), used by `gap-(--stack-gap)` in `Services.tsx`.
  - The copy and the gold-tint icons stay (the image shows older text and the old ring icon).
  - Docs: DESIGN.md (Cards → Services: the hold).
  - Checked:
    - `npm run check` passes.
    - Sampled every 40px of scroll at 1440×900: the full deck (card tops 100/116/132/148, widths 669/708/748/787px = 0.85–1) holds for about 320px of scroll, with the heading pinned beside it. At 375×800 it holds for about 240px (widths 292–343px).
    - Screenshots of the held deck at both sizes; a clean console.

- **Portfolio: bordered cards and arrows** (2026-10-02, your reference image "make these cards like in image"). Your choices: **bring back the arrows** (Portfolio only), and keep **the service label** as the muted line (over the image's "Homepage › …" breadcrumb).
  - Each project is one bordered card (`rounded-lg border border-border bg-background`, `h-full` for equal heights): the screenshot edge to edge at **3:4** (no browser bar), then `p-5` with the label (muted) above the name (bold, white). `FRAME_RATIO` is 4/3, so the hover scroll is retimed (3.9 s for Ella, 1.5–5.2 s across the five).
  - `Carousel` gains `arrows?: boolean`. It renders our own round 44px prev/next buttons, which Splide finds by class and wires up with labels and `aria-controls`: a white circle with a #222 chevron and a #3D3D3D ring, centred on the track, 12px in. They're hidden until Splide has mounted. `ChevronLeftIcon` and `ChevronRightIcon` are back in `icons.tsx`. The reviews stay dots-only.
  - Docs: DESIGN.md (the Portfolio card, Arrows replacing "No carousel arrows", Icons, the Carousel row, the hover-scroll exception).
  - Checked:
    - `npm run check` passes.
    - At 375, 768, 1024 and 1440: the arrows are 44×44 and labelled; Next then Prev moves Ella Auto parts → Ella Jewelry → back; the reviews have no arrows; all cards are the same height; no overflow.
    - The server HTML has the arrows hidden until mount.
    - Screenshots at 1440 and 375.
  - **Then, 4 per row** (your request "make 4 cards in a single row"):
    - The Portfolio uses the carousel's default 4 per view from `lg`, like the reviews. `Carousel`'s `perPage` option lost its only user, so it was removed and the carousel is back to one layout (4 / 2 / 1 plus a peek).
    - `sizes` is now `324px` / `23vw` at 1440 / 1024. The cards are 326px wide at 1440 (images 324×432), so the 370px-wide sources are no longer stretched.
    - Checked: `npm run check` passes; at 375 / 768 / 1024 / 1440 the Portfolio shows 1 / 2 / 4 / 4 cards (like the reviews), 5 / 3 / 2 / 2 dots, both arrows; the first slide stays in place on mount; equal card heights; the hover scroll at 3.9 s; no overflow; a clean console.

- **Error scan** (2026-10-02, your request "scan all code and remove error"). No code changed: every error came from the environment.
  - `node_modules` held only `@next`, so every import failed in the editor (`Cannot find module 'react'`, `next/dynamic`, `@lottiefiles/dotlottie-react`). Reinstalled with `npm ci` (the lockfile's exact versions; `package.json` and the lockfile unchanged). The leftover `next start` on :3100 from the production check was still running and locking the SWC binary, so it was stopped first.
  - `npm run lint` failed with 17,549 problems, all inside `ecommercewisers - Copy/`, a full backup (its own `.git`, `node_modules`, `.next`) inside the project root. Your choice: **move it out**. It is now `Desktop/ecommercewisers-backup/`, complete (`git fsck` clean, on `b079177`, same working-tree changes).
  - Checked: `npm run check` passes; the `/ew-test` sweeps are clean (the only hits are two `globals.css` comments that name the rules, and the expected `example.com` placeholder); no secrets tracked; the dev server compiles `/` with no errors; headless Edge at 1440 shows a clean console; every asset path in `src/data/` exists in `public/`; the self-hosted WASM is byte-identical to `@lottiefiles/dotlottie-web`'s.
- **Error scan** (2026-10-03, your request "scan all basecode and remove errors"). One error, from the editor only.
  - VS Code showed TS2882 (`Cannot find module or type declarations for side-effect import of '@splidejs/splide/css/core'`) in `ui/Carousel.tsx` and `ui/LogoStrip.tsx`. VS Code runs its bundled TypeScript 6.0.3, where `noUncheckedSideEffectImports` is on by default; the project's 5.9.3 has it off, so `npm run check` passed. Next's `*.css` declaration doesn't match the subpath, which has no `.css` extension. Fixed with an empty ambient module in `src/types/splide.d.ts`, in the style of Next's own; the imports are unchanged. A whole-program check now finds 0 errors under both 6.0.3 and 5.9.3.
  - Deleted `ecommercewisers/`, the untracked clone of the GitHub repo (your choice). Its commits are all in `main`.
  - Checked: ESLint and the project's `tsc` were already clean; the `/ew-test` sweeps are clean (the two `globals.css` comments and the expected `example.com`); no secrets tracked.
- **Process animation v3** (2026-10-03, your request "add this animation and remove old"). Plan approved with `/ew-implement`; its two open choices took my recommendations (see the Decisions log).
  - `public/animations/process-ring.lottie` (53,221 B), built from your `process-animation-v3.json`: the gold set from #E6AB0D to #E6AC0E in all 44 uses, the name "ecommercewisers-process-v3", and a clean manifest. It replaces `process-flow.lottie` and `process-flow-mobile.lottie` (deleted). One file for every width.
  - `data/process.ts`: the new file, 278 frames, `speed: 0.6`; step starts 16 / 74 / 132 / 190 (the markers) and stills 64 / 122 / 180 / 246; `mobileSrc` is gone.
  - `ProcessPlayer.tsx`: below `xl`, and under reduced motion at every width, a square ring crop (at most 400px) with the synced steps; from `xl`, while it plays, the whole canvas with the `sr-only` copy. The switch is CSS only (`xl:motion-safe:`); the phone-file switch and the hydration gate are gone.
  - `LottieAnimation.tsx`: an optional `speed` prop (default 1). `lib/breakpoints.ts`: `below()` removed, since the Process player was its only user. `layout.tsx`: the mono font comment now says the step numbers show below 1280px.
  - Checked: `npm run check` passes; the `/ew-test` sweeps are clean; the packed file renders headlessly with the exact gold (10,102 px of #E6AC0E at frame 246). In the production build, driven over DevTools at 375 / 768 / 1024 / 1280 / 1440 and with reduced motion at 375 and 1440: the boxes are 343² / 400² / 400² / 1216×574 / 1376×650; the right list shows at each width; tapping a step moves `aria-current`; the canvas mounts in about 0.5 s; only `process-ring.lottie` is requested for Process; no horizontal scroll; no console errors. **Not yet checked by hand.**
  - Resolved by the new file: the old canvas text issue (v3's descriptions are 5.6:1 and about 19px at 1440), and the gold gradient exception (v3 has none).
- **Process on phones: step tabs** (2026-10-03, your request "on mobile, first row heading and text, second row the animated ring"; your choices: the "step tabs in a row" layout, phones only).
  - `ProcessPlayer.tsx`: below 640px the step list is a row of four tabs (number + 14px title, the fill bar along the bottom), then the shown step's text, then the ring (`max-sm:order-last`). The same `<li>`, button, fill refs and `paint()` serve the tabs and the cards, so the sync code is unchanged. The descriptions stay `sr-only` in the list on phones; the visible text under the tabs is `aria-hidden`. Tablets, `lg` and `xl` are unchanged.
  - Checked: `npm run check` passes. In the production build over DevTools at 320 / 375 / 639: the tabs sit in one row (69×76 at 320, 83×76 at 375), no title overflows, the order is tabs → text → ring, tapping tab 3 makes Develop current and shows its text, and under reduced motion Launch shows by default and a tap switches the still and text. At 640 / 768 / 1024 / 1280 / 1440 the layout is as before. No horizontal scroll, no console errors. **Not yet checked by hand on a phone.**
- **One file per section** (2026-10-03, your request "flatten src/components/sections so each section is ONE self-contained .tsx file"; plan approved with `/ew-implement`, your choices: as planned, and `LogoStrip` inlined too).
  - Merged as plain, non-exported functions above each section's export, their code unchanged: `MobileNav` + `ScrollHeader` → `Header.tsx`, `LogoStrip` (from `ui/`, Platforms was its only user) → `Platforms.tsx`, `ProcessPlayer` → `Process.tsx`, `ReviewCard` + `ReviewsCarousel` → `Reviews.tsx`, `ContactForm` → `Contact.tsx`, `FooterColumn` → `Footer.tsx`. The eight old files are deleted. Export names are unchanged, so `page.tsx` and `layout.tsx` didn't change.
  - `"use client"` on Header, Platforms, Process, Reviews and Contact. Reviews has no hooks but must be client, because `ReviewsCarousel` passes a function to `Carousel`; a comment says so. Footer stays a Server Component.
  - `sendMessage.ts` is a `"use server"` action, so it stays its own file, imported by `Contact.tsx`.
  - The `ui/` usage list (shown before deciding): every other `ui/` component has two or more users, so it stays.
  - Also: the `globals.css` comment naming `ScrollHeader.tsx`, and in the docs `CLAUDE.md` (the sections rule, the client exception, file locations), `PLAN.md` (the file lists), `DESIGN.md` (file locations, and the `breakpoints` row, stale since `below()` went with the v3 change).
  - Checked:
    - `npx tsc --noEmit` and `npm run check` pass (0 errors, lint clean, `/` static).
    - The prerendered `/` HTML, with scripts and `<link>`s stripped, is identical to before (862 lines), apart from the contact form's hidden `$ACTION_KEY`, which Next regenerates every build.
    - First-load JS: 530,424 → 541,451 B uncompressed (+11,027 B, +2.1%); 162.8 KB gzipped now.
    - `sections/` holds 12 files, and nothing imports a deleted file.
    - The `/ew-test` sweeps are clean.
    - In the production build over DevTools, all pass: the mobile menu (opens, Escape closes and refocuses the toggle), the header hiding and returning on scroll, the logo strip (48 px/s), review mute and play, the contact form reaching the Server Action ("not sent" message), the footer, and the Process layout and tabs at 320–1440 (as before). No console errors.
- **Carousels on phones: centred card, both neighbours peeking** (2026-10-03, your screenshot "looking not good on mobile" and your answer "show a little of the cards before and after"; plan approved with `ew-implement`).
  - `ui/Carousel.tsx`, below 640px only:
    - The carousel runs edge to edge (`max-sm:-mx-4`), with Splide's `padding: "12%"` either side and a `1rem` gap, so the card is centred and a sliver of the previous and next cards shows. This replaces the right-only 20% peek that was cut 16px short of the screen edge.
    - The Portfolio arrows moved off the card into the dots row (‹ dots ›), which grows to 44px there. That was my recommended option; your answer covered the layout, not the arrows.
    - The pre-mount track padding and slide width match, so nothing jumps.
  - `ui/SplideTrack.tsx`: a `trackClassName` prop for that pre-mount padding. A `[&_.splide__track]` variant didn't work, because Tailwind turns its underscores into spaces.
  - Image `sizes` on phones: 76vw (Portfolio was 72vw, Reviews 80vw).
  - The video reviews share the carousel, so they get the same centred peek on phones. They have no arrows, so their dots row is unchanged.
  - Checked in the production build over DevTools against a baseline taken before the change:
    - Phones: 320 / 375 / 440 / 639 show both neighbours equally (22 / 29 / 37 / 61px) beside a 243 / 285 / 334 / 486px card.
    - The arrows overlap no card, and the next arrow moves one card.
    - Pre-mount and mounted sizes are identical, and there's no horizontal scroll.
    - 640 / 768 / 1024 / 1440 match the baseline exactly (slide sizes, arrow positions, dots).
    - `npm run check` passes; no console errors.
    - **Not yet checked by hand on a phone.**
- **Footer lockup and favicon** (2026-10-03, your request: the white lockup in the footer, the gold icon as the favicon; your choice: the palette gold for the icon).
  - `Footer.tsx`: a `Lockup` function replaces the `Wordmark` in the first column. It's your lockup inlined: the wordmark path (now exported from `Wordmark.tsx` as `wordmarkPath`, identical to the file's) plus the file's tagline path, both `currentColor`, the tagline `text-muted`.
    - 48px tall (213px wide). From 768 to 1023 it's 32px, because the four-column footer leaves the first column 156px at 768; the first build overflowed there and was caught by the check.
    - Server-rendered, so no JavaScript added. The header logo is unchanged.
  - `src/app/icon.svg`: your gold icon, its background #E4C64F → #E6AC0E and its title → "ecommercewisers".
  - `src/app/favicon.ico`: the create-next-app icon replaced (25,931 → 2,885 B) with 16, 32 and 48px PNGs of that icon, rendered in headless Edge and packed by a one-off script (no dependency).
  - Checked:
    - `npm run check` passes (`/icon.svg` is a static route); the sweeps are clean, with no old spelling or hex in `src/`.
    - In the production build, `<head>` links both icons; `/icon.svg` and `/favicon.ico` return 200 (`image/svg+xml`, `image/x-icon`); the `.ico` holds three PNGs and decodes in the browser with the gold exactly #E6AC0E.
    - The footer lockup at 375 / 640 / 768 / 1023 / 1024 / 1440 fits its column: white word, tagline rgb(160,160,160), label "ecommercewisers". No horizontal scroll, no console errors.
- **SMTP for the contact form** (2026-10-03, your Nodemailer brief; your choices: keep the Server Action rather than an `/api/contact` route, skip `@types/nodemailer`, keep the placeholder email on the site for now).
  - `nodemailer` 10.0.14 installed, pinned exactly; it ships its own types.
  - `.env.local` (gitignored) with your SMTP keys and `SMTP_PASS=REPLACE_ME`.
  - `.env.example` (empty values) is now committable: `!.env.example` in `.gitignore`. Checked with `git check-ignore`: `.env.local` stays ignored.
  - `src/lib/mailer.ts` (`import "server-only"`; Next 16 handles it, so no package): reads the seven keys and throws naming any that are missing. It builds the transporter per send, so a changed `.env.local` applies without a restart, and sends from `MAIL_FROM` to `MAIL_TO`.
  - `sendMessage.ts`: after the unchanged validation, it sends `New enquiry from {name}` with Reply-To the visitor, a plain-text body and an escaped HTML body.
    - On failure it logs one line with the code, command, response code and message (never the visitor's message), and returns `failed` with the typed values.
    - On success it returns `sent`, and the form clears. The honeypot (`website`) answers `sent` and sends nothing.
  - `Contact.tsx` and `data/contact.ts`: the "not set up yet" line is replaced by `sentNote` and `failedNote` (+ email link). No time promise.
  - Checked:
    - `npx tsc --noEmit`, `npm run lint` and `npm run build` pass (the build lists `Environments: .env.local`; `/` stays static).
    - On the dev server, the real form, driven in headless Edge:
      - A valid submission disables the button, then after about 3 s shows the failed message and keeps the values. The server logged `[contact] SMTP send failed: code=EAUTH command=AUTH PLAIN responseCode=535 message=Invalid login: 535 5.7.8 Error: authentication failed: (reason unavailable)`. The TLS connection to smtp.hostinger.com:465 works; the login fails, as expected with the placeholder password. Not investigated further, per your instruction.
      - With the name empty (browser validation bypassed), it showed "Enter your name." with `aria-invalid`, and nothing was sent.
    - The first test logged the error as an object, which Next's dev log file printed as `{}`; it's now one string.

## In progress
- Phase 9, Git: commits done per phase and pushed to `origin`; the tag needs your decision.
- `.claude/plans/CLAUDE.md` (a saved GitHub page) is gitignored: it holds your GitHub login, an email and session values. Delete it if you no longer need it.

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
| 2026-10-02 | Git remote | `origin` = the private GitHub repo `GMustafa1697/ecommercewisers` (your request "push on github"). GitHub's initial `.gitattributes` commit merged, not force-overwritten. Push only when you ask. |
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
| 2026-09-30 | Video reviews | New section at your request, after Portfolio as a light band, with no nav link. **Splide** (your choice over a native carousel): core `@splidejs/splide` 4.1.4, mounted in a client component, core CSS only. The 6 stock clips are placeholders with a visible notice. ffmpeg (installed with winget) compresses the videos. Sound starts muted, as in the reference; one video plays at a time. Arrows are square (`rounded-md`) to match DESIGN.md. **Later the same day:** made it loop endlessly (your request). The cards are now driven through the DOM, because loop clones don't carry React handlers. |
| 2026-09-30 | Layout | The page container's max width is **1440px** (`max-w-360`), up from 1152px (`max-w-6xl`). Padding is inside it. |
| 2026-09-30 | Portfolio | A Splide slider (the shared `Carousel`, looping like the reviews; first 3 per view, then **4 per view** on desktop at your request, matching the video reviews) with **full-length screenshots that scroll on hover**, as you asked. It's CSS only, so loop clones work, and there's no scroll for reduced motion. Changed images get new filenames (`*-full.webp`) to get past the caches. |
| 2026-09-30 | Palette | **Soft black.** You changed `--color-black` to #222222 in `globals.css`, then chose "keep #222 and rebalance". `dark-surface` #111111 → **#2E2E2E** (surfaces sit above the page again), `dark-border` #2A2A2A → **#3D3D3D** (≈1.5:1, as before), `secondary-text` #8A8A8A → **#A0A0A0** (the old grey would have failed AA on the new surface, at 3.9:1). Updated in CLAUDE.md and DESIGN.md. Every pair passes AA: the full-page lowest is 5.19:1. |
| 2026-09-30 | Eyebrow | Eyebrows sit on a badge, applied to all eyebrows, portfolio labels included. ~~Soft neutral tint (`bg-foreground/10`)~~ was replaced the same day at your request by a **gold scheme**: `bg-primary/15`, `border-primary/30`, and a gold dot. The badge then applied only to section eyebrows, with the portfolio card labels plain text again. A surface chip with a gold dot came next. **Final** (your choice from four): **no chip**, just a gold dot, the label in `text-muted`, and a short gold line. |
| 2026-09-30 | Images | The portfolio crops are made with headless Chrome outside the project (no dependency): the top of the page, 4:5, WebP at 80%, at most 800×1000, never upscaled. |
| 2026-09-30 | Process | Steps sit on a top border like Why, not on cards, so the second light band doesn't repeat Services. The visible numbers are `aria-hidden`; the `<ol>` gives the order. |
| 2026-09-30 | Components | `FeatureItem` (marker, H3, one line) is shared by Services, Why and later Process, so the item markup exists once. |
| 2026-09-30 | Services | Redesigned after reference `ser1`/`ser2`: sticky heading column and cards that stack on scroll. Your choices: ~~stack only~~ → **stack + shrink**, from your reference video (covered cards scale down 5% per card on top, strips 1rem apart; scroll-driven CSS, no JS; a new approved animation exception in CLAUDE.md and DESIGN.md, off for reduced motion), the **reference copy adapted** ("No templates… from scratch" dropped, since it clashes with the theme-customisation portfolio work), and a **gold icon ring** (decorative line, icon stays black on the band). Kept: the four services, our dot-and-line eyebrow (not the reference's chip), `rounded-lg`, the `text-xl` H3. |
| 2026-09-30 | Code animation | A dotLottie animation (your spec, `.claude/plans/lottie-integration.md`), placed in **Why ecommercewisers** (your choice over a new section or the hero): no new copy, and the dark/light rhythm is kept. The WASM renderer is **self-hosted** (your choice over the jsDelivr default). New runtime dependency `@lottiefiles/dotlottie-react` 0.19.16, pinned exactly so the self-hosted WASM can't drift. It's a new approved animation exception in CLAUDE.md and DESIGN.md.  **Later the same day:** a new scheme for the section: surface cards with gold icon tiles, and the animation in a surface panel, cropped to 4:3. Two columns from `xl` instead of `lg`. **Then ("make more better UI and change colors")** a bento: cards toned gold / dark / dark / light (new `.theme-gold` scope), distinct icons, and the animation panel in the same grid. It widens "one gold element per view" to include this one gold card (recorded in DESIGN.md). **Last:** the Why cards and animation panel are white (your request); the gold card and `.theme-gold` were removed. |
| 2026-09-30 | Theme | **Light-first** (your request), replacing dark-first: a white page with light-grey surfaces, grey bands (`theme-light`) for Services, Process and Reviews, and a new `theme-dark` scope used only by the footer (your choice). Gold stays a fill on light (gold text is 2.0:1 on white); `text-accent` is black on light and gold only inside `theme-dark`. **Then (your choice from three rhythms): white and dark alternate.** Services, Process and Reviews became dark sections (`<Section dark>`, `theme-dark`), and the unused grey band `theme-light` was removed. **Then** the Services cards became white on their dark section: `.theme-light` returns as the light scope for one element inside a dark section, sharing its values with `:root`. |
| 2026-09-30 | Header | **Glass and hide-on-scroll** (your request): white at 80% with a 12px backdrop blur; it slides up and fades out while scrolling down and returns while scrolling up (300 ms, a new approved animation exception). It stays shown for keyboard focus and while the mobile menu is open. The glass stays at 80% or more for AA contrast over dark sections. **Then** a dark glass bar (#222 at 80%) floating in the 1440px container, with white-at-70% links (5.08:1 worst case), and `--header-height` 4.25rem. |
| 2026-09-30 | Features | A tenth homepage section (your request, like the Video reviews before it): a dark strip after the hero with four Lottie animations as icons, bordered from the dark Services. The first line of copy was adapted (your choice), and CLAUDE.md's milestone now lists ten sections. `CodeAnimation` was generalised into `LottieAnimation`. |
| 2026-09-30 | Content | **No shared content file** (your request): each section owns its copy and data inline, replacing the Phase 5 rule that everything lives in `src/content/site.ts`. Data used by several sections is exported by its owning section, so nothing is duplicated. |
| 2026-09-29 | Old-repo images | Only the portfolio shots are used. The brand marks (off-palette), the "ecomwisers" logos and `reviews/*` (the milestone has no reviews section) are not. |
| 2026-10-01 | Platforms | An eleventh homepage section (your request): a dark, full-bleed logo strip after the Hero. It changes three locked rules, with your approval of the plan. **(1) Brand marks:** the five platform marks are allowed in this strip only, and only in monochrome (`currentColor`), so the palette stays locked; the screenshot's brand colours were not used (your choice). The WooCommerce path comes from the old repo's `marks/woocommerce.svg`, an image file (the 2026-09-29 old-repo rule allows images only). **(2) Autoplay:** the strip is the site's only auto-playing carousel. It pauses on hover and focus, has a pause/play toggle (WCAG 2.2.2), and starts paused under reduced motion. **(3) Splide** is used beyond the two carousels: core autoplay, no new dependency (your choice over the AutoScroll extension). No visible heading (your choice). |
| 2026-10-01 | Platforms, revised | At your request the same day: the logos use their **original brand colours** (the old repo's SVG files in `public/images/platforms/`, via `next/image`), replacing the monochrome marks. This widens the palette rule's exception to these five image files; no hex enters the code. The strip **scrolls smoothly** (a `requestAnimationFrame` loop on core Splide's `Move.translate`, 48 px/s, still no new dependency) instead of stepping with autoplay. The **pause button is removed**, so the strip no longer meets WCAG 2.2.2 for keyboard and touch users (see Known issues). It still pauses on hover and off-screen, and stays still under reduced motion. |
| 2026-10-01 | Hero | **Dark**, from your reference image: a dot grid, a gold chip eyebrow (a new `Eyebrow` `chip` variant, for the Hero only), a 72px H1 with gold highlight words, and "See how we work" (`/#process`) as the second button. It reaches up under the header so the page is dark from the top; the Platforms strip gets a border against it. The copy is **your reference word for word** (your choice over an adapted version), which reverses the 2026-09-30 decision to drop "from scratch" and "no templates" (Services) and names Shopify apps and UI/UX. |
| 2026-10-01 | Process | Your dotLottie animation sits between the Process heading and the four steps, on the dark section it's drawn for. It's cropped to its content on phones (9:4) and tablets (5:2), shown whole from `lg` (3:1), and capped at 1024px wide. It's used as delivered, except for its internal name (brand spelling). |
| 2026-10-01 | Process, in sync | The animation is reworked to loop seamlessly (always on screen; a rewind instead of a fade to blank; 13 s). The steps sit beside it from `lg` (your choice over stacked) and follow it: the current step is highlighted with a filling gold bar, and choosing a step jumps the animation there (a still under reduced motion). `SectionGrid` is gone with its last user. Your reference JSON is unchanged; the site uses the reworked copy. |
| 2026-10-01 | Process animation, v2 | Your dashboard animation replaces the first one in the synced Process player. It's used as delivered (its fade-out loop and its gold gradients included), with only the gold set exactly to #E6AC0E and the brand spelling fixed. The gradients are approved as an exception inside this file. The step frames come from its markers. |
| 2026-10-02 | Process animation, final | Your final file (the dashboard plus a drawn step column) replaces the dashboard version. From `xl` it shows whole, with the HTML steps for screen readers only (a static list, no hidden buttons). Below `xl` it's cropped to the tiles and panel, with the synced HTML steps (your choice). The gold is set exactly to #E6AC0E, and the name has the brand spelling; nothing else changed. |
| 2026-10-02 | Process on phones | Your portrait animation replaces the cropped dashboard on phones only (below 640px), in sync with the step list, which stays visible under it (your choices). Each visitor downloads only the file for their screen. The same exact-gold and name fixes as the desktop file. |
| 2026-10-02 | Process list on phones | Removed at your request: phones show only the portrait animation, and the steps stay in an `sr-only` copy for screen readers. Under reduced motion the phone still shows one step, so phones keep the list then (my call). |
| 2026-10-02 | Carousel dots | Splide's pagination, on by your edit (with the arrows off), styled with the tokens: same-size 8px dots, a ring for the other pages and filled with the accent for the current one. **24×24 tap targets** so they sit close: the one exception to the 44px rule (your choice, over 44px apart). It went through short bars, then larger current dots, the same day. Shared by Portfolio and Video reviews. |
| 2026-10-02 | Cards on phones | The Features, Services and Why cards are centred below 640px (your request), through the shared `FeatureItem`. The Services checklists are centred as blocks there, with their rows left-aligned (your request). Left-aligned from 640px, as before. |
| 2026-10-02 | Contact | A contact section replaces the CTA (your choice) with the heading, the email and a form (name, email, message). No SMTP yet: the fields are checked in the browser and by a Server Action, and the form says it can't send yet (your choice, over opening the visitor's email app). Only the email is shown; no time promise in the copy (your choices). |
| 2026-10-02 | Why cards hover | On hover a card inverts to black with white text and a gold icon tile (your request; the colours are my pick from the palette). Pointer devices only. |
| 2026-10-02 | Review fixes | From the codebase review (your choice of all four groups): carousels visible before JavaScript, the reduced-motion transition rule fixed at its root (0s), security headers and `public/` caching, form hardening (no control characters in the name, a honeypot), the arrow code and an unused token removed, the mobile menu closing on widening, caught `play()` rejections, `.claude/reference/` ignored, a project README. |
| 2026-10-01 | Features redesign | White with light-grey cards (your choice over a grey band or open items on white), because the Lotties are drawn for a light background. A 2×2 grid from `lg`, with each animation on a white tile beside the text (your choice over a 4-across card grid or a bento). The H2 "What every project includes" is now visible (your choice). |
| 2026-10-02 | Eyebrow | **Every section eyebrow is the gold-tinted chip** (your screenshot of the Contact eyebrow), replacing the 2026-09-30 dot-and-line. `chip` is `Eyebrow`'s default and the `section` variant is gone. The portfolio card labels stay `plain` (my reading of "all eyebrows", following your 2026-09-30 request to keep them plain). |
| 2026-10-02 | Accent language | **Gold tint for labels and icons, solid gold for actions and active states** (your choice in the refinement pass). The Services gold ring (your 2026-09-30 choice) and the black Why tiles become one `IconTile`: a black icon on a gold-tint tile. On hover the Why tile turns solid gold, as before. |
| 2026-10-02 | Section titles | **30 / 36 / 48px** with `text-balance` (your choice of 48px on desktop). 48px starts at `xl`, not `lg` as planned, because the Services title broke one word a line at 1024 (my call, from the measurement). Sections get `lg:py-28` and heading to content `lg:mt-16` to match. |
| 2026-10-02 | Features eyebrow | **"Included"** (your choice over "Standards" or none), so every section heading has a chip. It reverses the 2026-10-01 "title only" choice. |
| 2026-10-02 | Folders | **Sections with private parts get their own folder** (your choice over keeping `sections/` flat): `header/`, `process/`, `reviews/`, `contact/`, `footer/`. One-file sections stay flat. Shared hooks live in `src/lib/`. |
| 2026-10-02 | Lottie loading | **The player loads lazily**, within 400px of the viewport (`next/dynamic` and an `IntersectionObserver`; my call from the audit, in the approved plan). The margin is a trade-off: smaller would skip the WASM for visitors who never scroll, but risk a moment of empty tile. |
| 2026-10-02 | Hero | **Centred** (your choice over keeping your reference's left alignment), because the text-only hero left its right half empty on desktop. |
| 2026-10-02 | Why cards | **Grey surface, no shadow** (your choice), like Features and Contact, replacing your 2026-09-30 white cards with a shadow. The page has no card shadows now. |
| 2026-10-02 | Portfolio cards | **Browser-frame cards in the carousel** (your choices: keep the carousel over a 3-column grid; a browser frame over a plain image): grey surface cards, a white frame with a three-dot bar, a 4:3 hero crop (taller than the first 16:10, your request), then the name and a muted label. **Revised the same day:** 3 per view (over a one-at-a-time showcase) and no outer card, just the frame on the page. **Then** a dark section (over dark frames on white), with divider lines against the dark Process and Reviews, and 4:5 frames (over 1:1). It's the one break in the white/dark alternation. **Then** (your reference image) bordered cards with the screenshot edge to edge at 3:4, the label above the name, and prev/next arrows on this carousel only, reversing the arrows' removal. **Then** 4 per row (your request), like the reviews. |
| 2026-10-02 | Logo | **Your wordmark SVG replaces the text wordmark** (your choice after I flagged that it reads "eCom Wisers", over keeping the text logo or rebranding). Inlined with `currentColor`; its accessible name stays "ecommercewisers", and the copy keeps the brand name. The logo is the one exception to the brand rule. |
| 2026-10-02 | Redesign prompt | **Your rules stay authoritative** (your choice): the pasted prompt's new palette, gradients, parallax and scroll animation, auto-rotating carousel, glass cards, timeline and masonry layouts, dark-mode toggle and invented content were declined. Only the code audit was done. Hover lifts, scroll reveals, button glow and link underline animation were offered as reduced-motion-safe exceptions; you skipped them for now. Testimonials, social links and a newsletter wait on real content and a provider. |
| 2026-10-02 | Content and folders | **Content in `src/data/`, one file per section** (your choice over keeping it at the top of each section file), replacing the 2026-09-30 "each section owns its content" rule. **`sections/` flat** (your choice over keeping the folders), reversing the folders of earlier the same day. The second "modular website" prompt's visual parts stay declined. |
| 2026-10-03 | Process animation v3 | **Your v3 file replaces both 2026-10-02 files**: one landscape file for every width (`process-ring.lottie`). Below `xl`, and under reduced motion everywhere, it's cropped to its ring with the synced HTML steps; from `xl` it shows whole with its own step text. Two choices were my recommendations, applied when `/ew-implement` ran without your answer: **phones show the step list again** under the ring (reversing the 2026-10-02 "Process list on phones", since v3 has no portrait version and its text would be about 4px on a phone; the alternative is a portrait v3 from you), and **it plays at 0.6×** (each step about 3.2 s, the old pace; as delivered it's 1.9 s). The gold was set exactly and the name fixed; no gradients remain. |
| 2026-10-03 | Process on phones: step tabs | **Below 640px: a row of four step tabs, the shown step's text, then the ring** (your request and choice of layout, phones only; tablets keep the ring above the list). The tab titles are 14px, the type scale's one exception, so four fit across 320px. It replaces the full list under the ring from earlier the same day. |
| 2026-10-03 | One file per section | **Each section is one self-contained file** (your request and approval), replacing the 2026-10-02 rule that a section's helper files sit beside it. Sub-components are non-exported functions above the section's export; `LogoStrip` moved in from `ui/` (your choice; `ui/` keeps only shared components). The trade-off you accepted: Header, Platforms, Process, Reviews and Contact are now client files as a whole, so their static markup also ships as JS (+11 KB uncompressed first-load JS). The rendered HTML is unchanged. `sendMessage.ts` stays separate (a Server Action). |
| 2026-10-03 | Carousels on phones | **One centred card with the previous and next peeking, edge to edge** (your request), for both carousels, replacing the right-only peek. **The Portfolio arrows sit beside the dots on phones** (my recommendation; your answer covered only the layout), so they no longer cover the screenshot. Tablets and desktop are unchanged. |
| 2026-10-03 | Footer lockup, favicon | **The footer shows your lockup** (the wordmark plus "design, build, optimize"), inlined like the header's logo rather than as an `<img>`: same look, theme colours, visible in forced-colours mode, and the old-spelling file name stays out of `src/`. **The favicon is your gold icon in the palette gold #E6AC0E** (your choice over the file's #E4C64F): `src/app/icon.svg` plus a matching `favicon.ico`. |
| 2026-10-03 | Contact SMTP | **The form sends through the existing Server Action** (your choice over a new `/api/contact` route): it works without JavaScript and keeps the per-field errors. Nodemailer 10.0.14 is the third runtime dependency (your request), without `@types/nodemailer` (bundled types, your choice). Settings in `.env.local`; `.env.example` is committable. `MAIL_FROM`'s display name "eCom Wisers" (your value) differs from the brand rule's spelling; it's only in your local env and inbox. |

## Known issues
- **Exposed API key (your action):** the old repo pushed an OpenRouter key (in `.claude/settings.loca.json`) to GitHub. **Rotate it.** A `.claude/settings.loca.json` does exist in this folder (found in the 2026-10-02 code scan): it holds an `ANTHROPIC_AUTH_TOKEN` and a custom base URL. It's gitignored, so it can't be committed, and Claude Code never reads it (the name isn't `settings.local.json`). If that token is the one the old repo exposed, rotate it too.
- **The logo spells "eCom Wisers" (your call):** since 2026-10-02 the header and footer show your wordmark SVG. I flagged that its letters differ from the brand name; you chose to use it. Two effects remain until a logo spells "ecommercewisers": the visible name differs from the copy, page title and copyright, and the logo link's spoken name ("ecommercewisers") doesn't contain the visible letters, which trips WCAG 2.5.3 Label in Name for speech-input users. Send a corrected SVG and only `Wordmark.tsx` changes.
- **Placeholder email (blocks deploy):** the Contact section and Footer use `hello@example.com` until you send the real address. Social links stay hidden until you provide them. The WhatsApp number and address from your Contact screenshot wait for real ones too.
- **The contact form sends once `SMTP_PASS` is set (blocks deploy until then):** since 2026-10-03 it sends by SMTP (Nodemailer, Hostinger) to `MAIL_TO`. `.env.local` still has `SMTP_PASS=REPLACE_ME`, so every send fails with `EAUTH` (535 5.7.8, authentication failed) and the visitor sees the "wasn't sent, email us" message. Put the real password in `.env.local` (and in the host's environment at deploy). A honeypot field and a line-break check on the name are in (2026-10-02). **Rate limiting is still missing:** add it on the host (or in the action) before deploy, so the form can't be used to flood your inbox.
- **Hosting needs a server:** the form's Server Action runs on the server, so the site needs `next start` or a host that runs Next.js, not a static export. Keep `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` stable if it ever runs on several instances.
- **Low-res portfolio images (you'll send replacements):** Ella — Jewelry store and Home Gym (370px wide) and Layout 22 (540px) look soft, more so since the Portfolio cards grew to 441px at 1440 (2026-10-02). You said you'll send larger screenshots, about 1600px wide, full homepage; I'll crop them the same way, under new `*-full` file names so caches don't serve the old ones.
- **In-page links don't move keyboard focus:** after "Services", "See how we work" and the other in-page links, focus stays on the clicked link (desktop) or returns to the top of the page (mobile menu), so the next Tab doesn't go into the section. Proposed fix, for Phase 8 and only with your approval: use plain `<a href="/#…">` for in-page links in the Header, `MobileNav` and `ButtonLink`, instead of `next/link`. The browser then moves focus without re-scrolling. This needs an exception to the CLAUDE.md "next/link for internal links" rule.
- **Placeholder review videos (block deploy):** the 6 videos are stock clips of actors, shown with the notice "These are placeholders, not customers." Before deploy, replace them with real customer reviews, each with the customer's written consent and a `.vtt` captions file (WCAG 1.2.2, for spoken content), then set `isPlaceholder: false`. Stock clips must never ship as reviews: the stock licence forbids implying endorsement.
- **Hero copy vs the four services (your call):** the hero now says you build "Shopify apps" and "UI/UX", which aren't among the four services in CLAUDE.md (Next.js and Figma to Web aren't named). It also says "from scratch" and "no cookie-cutter templates", while three Portfolio projects are labelled "Shopify theme customisation". You chose the reference copy as it is. Either confirm that these are services you offer (then update the services list and the page metadata), or adapt the hero copy.
- **Process animation blinks at each loop (your call):** your v3 file (2026-10-03) also fades the whole canvas out (frames 264–277) and back in (0–8), as delivered: about 1.2 s at the 0.6× speed. Below `xl` Launch stays highlighted in the steps meanwhile. If you'd like it seamless, I can rework it as I did the first version: everything stays on screen and only the progress resets.
- **Process step text moves from `xl` (your request):** there the steps are read from the animation alone (phones have tappable step tabs with the text since 2026-10-03). Each step's text is on screen for about 3.2 s at 0.6× before it fades, and nothing pauses it (WCAG 2.2.2 asks for a way to pause motion that starts by itself and lasts over 5 s; it also helps slower readers). Reduced motion shows the list. A fix, if you want one: a small pause button over the animation, or the list beside it from `xl` too.
- **Splide is unmaintained:** 4.1.4 was last published in November 2022. It works with React 19 here, because the core is mounted directly. If it ever breaks, the fallback is a native scroll-snap row for the two carousels and a CSS marquee for the Platforms strip.
- **Platform marks are trademarks (check before deploy):** the WooCommerce, WordPress, Next.js, Figma and Shopify logos belong to their owners. They're shown in their original colours, only to name the platforms we build on, never as clients, partners or endorsements. Before deploy, check each brand's logo guidelines (for example Shopify's brand assets page and WordPress's trademark policy) for agency use, and that these files match the current official logos. If one doesn't allow it, drop that mark or replace it with its name.
- **WooCommerce isn't a fifth service:** the strip shows it, as in your screenshot, but the four services stay as they are. It's covered by WordPress Development (the Services checklist already lists "WooCommerce stores").
- **Platforms strip has no pause control (WCAG 2.2.2, Level A):** it scrolls by itself for longer than 5 s, and since the pause button was removed (your request) only mouse users can pause it, by hovering. Keyboard and touch users can't, so the page doesn't fully meet the WCAG 2.2 AA target in CLAUDE.md. It's partly mitigated: the strip is still under `prefers-reduced-motion` and stops off-screen. To restore compliance, bring back a small pause/play button (the first version had one) or stop the scroll after 5 s.
- **No hover-scroll on touch screens:** phones and tablets have no hover, so they only see the top of each screenshot. A tap-to-scroll option could be added later if you want it.
- **Skip link on the 404 page:** the Header (with its "Skip to content" → `#main` link) also renders on Next's default 404 page, which has no `#main`. Fixing it needs a custom `not-found.tsx`, which is outside the homepage milestone.
- **JavaScript start-up cost:** on a throttled phone, about 770 ms of long tasks run while React and the Next.js runtime start (measured in Phase 7, at 143 KB of script). The homepage loaded 202.5 KB of gzipped JS on 2026-10-02, with the dotLottie player deferred. Since 2026-10-03 (one file per section), its client files are five whole sections (Header, Platforms, Process, Reviews, Contact) plus the shared `Carousel` and `LottieAnimation`. That added 11 KB of uncompressed first-load JS (530,424 → 541,451 B); 162.8 KB gzipped by a level-9 gzip of the first-load chunks, which isn't measured the same way as the 202.5 KB. It doesn't delay content (LCP 1.5 s), but Lighthouse would likely score Total Blocking Time as "needs improvement". Measure again with real Lighthouse after deploy.
- **Services checklist copy is a draft:** the 3 points per service in `sections/Services.tsx` (e.g. "WooCommerce stores", "Headless storefronts") were written for the redesign. Confirm each one describes work you actually offer, or send replacements.
- **Missing site identity (needs your domain):** the favicon is in place since 2026-10-03 (your gold icon), but the metadata has no `metadataBase`, Open Graph image, robots or sitemap, and there's no `apple-icon` for the iPhone home screen yet.
- **HSTS on the host:** the security headers are in `next.config.ts`, but HSTS and the HTTPS redirect need the real domain over HTTPS, so they're set on the host at deploy.
- **Code animation weight:** the player is the heaviest asset: a 1.24 MB WASM renderer (498 KB gzipped; cached for good) and a 34 KB gzipped JS chunk. Since 2026-10-02 both load lazily, once an animation is within 400px of the viewport, so they're out of the first-load bundle. On 375×800, 768×1024 and 1440×900 the first Features tile is inside that margin, so a visitor who never scrolls still gets them shortly after hydration. A smaller margin (e.g. 100px) would skip them until the first scroll, at the cost of a moment of empty tile on a slow connection (your call).
- **WASM must match the package:** `public/lottie/dotlottie-player-0.80.0.wasm` is a copy from `node_modules/@lottiefiles/dotlottie-web/dist/`. After any upgrade of `@lottiefiles/dotlottie-react`, re-copy it under the new version's name and update `WASM_URL` in `ui/LottieAnimation.tsx`, or the player may fail to load.
- **Tooling warnings:**
  - npm flags ESLint 9.39.5 as deprecated. It is the version `eslint-config-next` 16.3.6 uses; leave it until Next supports ESLint 10.
  - npm skipped the `unrs-resolver` postinstall script (allow-scripts policy). Lint works without it.
  - VS Code's bundled TypeScript (6.x) is newer than the project's (5.9.3), so the editor can flag things `npm run typecheck` doesn't (2026-10-03). Treat the editor as an early warning for the TypeScript 6 upgrade.
  - `npm audit` reports 5 high-severity issues (2026-10-03), all in the dev-only lint chain: `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`. None is in the site's runtime code (Nodemailer included). `npm audit fix --force` would change `eslint-config-next`; leave it until a Next update fixes the chain.

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
