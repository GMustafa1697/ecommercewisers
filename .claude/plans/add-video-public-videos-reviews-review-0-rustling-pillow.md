# UI/UX audit → `UI_AUDIT.md` (project root)

## Context
You asked for a senior UI/UX and front-end audit of the whole codebase: a prioritised list of improvements, each
with Issue / Location / Why it matters / Fix / Priority / Effort, grouped by category, then a Top 10 quick wins, a
design-system summary and a phased roadmap. It's saved as `UI_AUDIT.md` in the project root. **The audit changes no
other file.** The project's own "update PROGRESS.md after every task" rule is skipped, because the audit
instructions say to modify nothing; I can add a one-line pointer afterwards if you want.

## What's done (read-only, in planning)
- **Mapped the whole project:**
  - one route, `/`: `src/app/page.tsx` plus `layout.tsx`
  - Next's default 404, `/icon.svg` and `favicon.ico`
  - 11 sections and the `sendMessage` Server Action in `src/components/sections/`
  - 14 shared pieces in `src/components/ui/`
  - 5 helpers in `src/lib/`, plus `globals.css`, `next.config.ts` and the assets in `public/`
  - There are no modals.
- **Read every file.** Checked the uncommitted diffs against the last commit, and the code against
  `docs/DESIGN.md` (whose rules are marked Locked).
- **Checked the served page:**
  - one `h1`, headings in order, labelled landmarks, alt text on every image, `preload="none"` on the videos
  - first-load JS and CSS: about 215 KB gzipped, of which about 25 KB is app code (Splide plus the client
    sections)
  - the Lottie WASM: 496 KB gzipped
  - asset sizes, including two 5.9 MB and 2.3 MB PNG screenshots

## Step 1: runtime checks before writing (headless Chrome, read-only)
These confirm or drop the layout findings that only show in a browser. Chrome is installed, and Node 24 drives it
through the DevTools protocol, so no new dependency is needed. Temporary files (profile, screenshots) go in the
scratchpad only.
- **Widths:** 375 (at 667 and 812 tall), 768, 1024 and 1440 (at 900 tall).
- **At each width:**
  - a full-page screenshot, which I'll view
  - horizontal overflow (`scrollWidth > clientWidth`)
  - every link and button under 44×44 (the 24px dots are the agreed exception)
  - a text contrast scan, with each element's computed colour against its real background
  - whether the hero CTA sits above the fold
- **Suspected, to confirm:**
  - the header bar at 768: logo, 5 links and the CTA may not fit in 672px
  - the hero's "Start a project" below the fold at 375×667
  - the footer's 156px first column at 768
- **DOM after JS:**
  - Splide's slide `tabindex` and `aria-hidden` on clones (extra Tab stops)
  - what the logo strip's visible clones expose to screen readers
- **Network and stability:**
  - whether the 1.24 MB Lottie WASM loads on the first view without scrolling
  - layout shift (CLS) during load
  - the LCP element

## Step 2: write `UI_AUDIT.md`
**Audience:** you, the site's owner and developer, in plain English. Every finding gets the six fields, with
file:line references. Where a fix would change a rule DESIGN.md calls Locked, or a choice you made, it's marked
**"needs your approval"**. The report follows CLAUDE.md:
- the brand is always `ecommercewisers`
- the word "premium" never appears
- no invented clients, reviews or metrics; trust fixes say what *real* content to collect
- no new pages; the 404 and privacy items are marked for after your approval

**Outline:**
1. Summary and how the audit was done.
2. Project map (every route, section and component found), so you can confirm nothing was missed.
3. What's already strong: tokens and dark/light scopes, AA contrast, a consistent type scale, 44px targets,
   reduced motion everywhere, no layout shift by design, lazy media.
4. Findings in 7 categories. Preliminary list below; Step 1 may add, drop or re-rank:

| # | Finding (location) | Priority / effort |
|---|---|---|
| **Visual design & colour** | | |
| 1 | The primary button lost its gold. Both variants are white and use raw `bg-white`/`bg-black`/`text-*` classes, which don't flip with the theme. The CTA hierarchy is flat, and on hover in dark sections the primary turns #222 on #222 and vanishes. DESIGN.md (Locked) says `bg-primary` (`ui/ButtonLink.tsx:5-8`, your uncommitted edit) | High / S |
| 2 | Portfolio cards use raw `bg-black text-white`. The label lost its muted hierarchy, and there's a stray `bg` class. Fix: `theme-dark` on the card and a `text-muted` label (`PortfolioPreview.tsx:121,133,136`) | Med / S |
| 3 | Shadows on buttons in dark sections, and hover shadows on cards, against DESIGN.md's "no shadows in .theme-dark" and "Features: no shadow" | Low / S |
| 4 | The logo strip is optically unbalanced: at the same height Figma is 27px wide and WooCommerce 67px. WooCommerce's purple is about 2.9:1 on #222 | Low / S |
| **Typography** | | |
| 5 | The hero intro runs about 85–90 characters a line (`max-w-200` at 18px). Use about 70 (`Hero.tsx:53`) | Low / S |
| 6 | US and UK spelling are mixed: "optimize" (eyebrow, logo tagline) but "customise", "customisation" and "Custom-optimised" elsewhere. Pick US, to match the logo | Low / S |
| **Layout & spacing** | | |
| 7–9 | Header at 768, hero CTA fold at 375×667, footer at 768. Kept only if Step 1 confirms them | TBD |
| 10 | The Reviews carousel uses `mt-8`, where every other section uses `mt-12 lg:mt-16` (`Reviews.tsx:171`). The Portfolio's `border-y` divider is left over now that the section is white (`:112`) | Low / S |
| **Components & UX** | | |
| 11 | Hover effects on cards you can't click (Features lift and shadow, Why's full inversion) suggest a click that does nothing | Med / S |
| 12 | Portfolio cards are dead ends: no outcome and no link. "kalles-4-2" / "myshopify" read like a theme demo URL, and two entries have wrong sizes and alt text | Med / S–M |
| 13 | Form errors are text only. The invalid field isn't marked (yet the status says "fields marked above"), and focus doesn't move to it | Med / S |
| 14 | Inputs have no hover state. The Services footer links all go to `/#services`. The secondary variant has a dead `hover:border-muted` | Low / S |
| 15 | The nav shows no current section on a long one-page site (scroll-spy) | Low / M |
| 16 | Carousel slides as extra Tab stops (if Step 1 confirms) | Low / S |
| **Accessibility** | | |
| 17 | Nothing lets you pause the motion that starts by itself: the logo strip, and the Process, Features and Why animations. That fails WCAG 2.2.2 (level A); hover only helps mouse users. You chose "no pause button" for the strip, noted. Fix: one "Pause animations" toggle | High / S–M |
| 18 | From 1280px the Process step text exists only inside the animation (images of text, 1.4.5), and some of it is dim | Med / M |
| 19 | Seven identical names: "Play video: Placeholder" and the visible caption "Placeholder" | Low / S |
| 20 | The logo strip's visible clones repeat the alt names to screen readers (if Step 1 confirms) | Low / S |
| **Performance & code quality** | | |
| 21 | The Lottie player and WASM (about 530 KB gzipped) load on most first views. The Features icons, 1.3–1.5 KB files, sit within 400px of the fold and pull in the whole renderer. Fix: static or CSS icons in Features (needs your approval), so the WASM waits for Why and Process | Med / M |
| 22 | Two portfolio PNGs, 1920×5715 (5.9 MB) and 1920×5695 (2.3 MB), declared as 540×1512. DESIGN.md says at most 800px wide, WebP | Med / S |
| 23 | review-07.mp4 is 3.0 MB, nearly 2× the bitrate of the others | Low / S |
| 24 | Card classes and the hover-lift recipe are copied in 5 places; extract a `cardClass` helper. `transition-all` is used where specific properties would do | Low / M |
| 25 | Stale comments (`PortfolioPreview.tsx:106` is mine, from the data move; also `:110`), and DESIGN.md (Locked) out of step with the code: buttons, a white Portfolio, shadows | Med / S |
| 26 | The 404 is Next's unbranded default, with the homepage's tab title. A branded `not-found.tsx` needs your approval | Low / S |
| **Content & conversion** | | |
| 27 | Placeholder video reviews with a "placeholders, not customers" notice under "In their own words" erode trust. Hide the section until real, consented reviews exist (it already blocks deploy) | High / S |
| 28 | The hero copy offers "Shopify apps" and "UI/UX" and leaves out Next.js and Figma to Web, so it doesn't match the four services. Suggested copy, needs your approval | Med / S |
| 29 | No real proof near the CTAs. A list of real content to collect (outcomes, consented reviews, who's behind the studio). Nothing invented | Med / M |
| 30 | The form collects names and emails with no privacy line. A policy page waits for Phase 11. Plus the placeholder email (blocks deploy) | Med / S |
| 31 | No Open Graph or Twitter image, `metadataBase`, canonical, robots or sitemap, so link previews are plain | Low / S |

5. **Top 10 quick wins:** high impact and small effort, drawn from the list (e.g. #1, #2, #27, #12, #13, #11,
   #28, #6, and the confirmed layout fixes).
6. **Design-system summary:**
   - Colour: the current palette is strong and AA-compliant, so no new palette, with the reasons. The tokens
     table, plus one optional derived token (a `color-mix` gold hover).
   - Type scale: h1 36/48/60/72, h2 30/36/48, h3 20, body 16/18, small 14, label 12 uppercase, mono numbers.
   - Spacing: section 64/96/112, heading to content 48/64, card padding 24/32, gaps 24/32, container 1440 with
     16/24/32 padding.
   - Radii (6 / 8 / full), elevation, motion (200–300 ms, instant under reduced motion), the button set and the
     focus ring.
7. **Phased roadmap:**
   - Phase 1, critical, before any deploy: #1, #17, #27, #30, #22/#12 and the confirmed breakages.
   - Phase 2, consistency: #2–#6, #10, #11, #13, #14, #18, #24, #25.
   - Phase 3, enhancements: #15, #21, #26, #29, #31, a hero visual from real work, and an FAQ (new sections need
     approval).

## Verification
- Only `UI_AUDIT.md` is new or changed (`git status`). Temporary files stay in the scratchpad and are deleted
  after.
- Every finding has all six fields, and every file:line reference is re-checked against the files.
- `grep -i premium UI_AUDIT.md` finds nothing, and the brand is spelled `ecommercewisers` throughout.
- The Markdown displays cleanly in VS Code's preview: tables and code blocks.
