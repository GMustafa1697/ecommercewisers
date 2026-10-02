# Plan: code audit fixes (within the locked design system)

## Context
You pasted a generic "audit and redesign" prompt. Most of it conflicts with your CLAUDE.md rules: a new palette with orange, purple and cyan; gradients; parallax and scroll animations; an auto-rotating testimonial carousel; invented testimonials, socials and a newsletter; masonry and filters on the Portfolio you just finalised; a dark-mode toggle; and the banned word. You chose to **keep your rules and do what fits**, and to **skip the motion additions for now**. What fits is Part 1, the code audit. The rest of what doesn't conflict is already in place: Lottie icons, 44px targets, lazy WebP images, AA contrast, and 320–1920 responsiveness.

**What the audit checked (read-only, 2026-10-02)**
- **Static scan:**
  - no unused exports
  - every icon used
  - Tailwind emits only the classes in use, and `globals.css` has no dead rules
  - the only `style=` props pass data-driven CSS variables (`--stack-count` and `--stack-index` in Services, `--scroll-duration` per project), which can't be classes, so they stay
- **Rendered sweep in Chrome, at 375, 1440 and 1920:**
  - every visible text element passes AA (85–98 elements; lowest 5.04:1)
  - one `h1`, no skipped heading levels, all landmarks present, `lang="en"`
  - every image has `alt`, no duplicate IDs, no positive `tabindex`
  - every target is at least 44px (except the approved dots)
  - no overflow
  - the logo link's computed name is "ecommercewisers" (checked in the accessibility tree)
- **What's left:** the four fixes below. The already-logged items stay as your choices: the Platforms pause button, the Process text on phones, the logo's spelling (WCAG 2.5.3), the focus after in-page links, and the canvas text in the Process animation.

## Changes

### 1. One source for the contact form's limits
`ContactForm.tsx` hard-codes `maxLength` 100 / 254 / 5000, and `sendMessage.ts` repeats them in its own `limits`. If one changes, the browser and server checks disagree.
- New `src/components/sections/contact/limits.ts`, exporting `contactLimits = { name: 100, email: 254, message: 5000 } as const`.
- `sendMessage.ts` and `ContactForm.tsx` both import it. It can't live in `sendMessage.ts`, because a `"use server"` file may export only async functions.

### 2. One source for the breakpoints
Hand-typed breakpoints sit in four places: `Carousel` (`1023`, `639`), `LogoStrip` (`1023`, `639`), `ProcessPlayer` (`"(max-width: 639px)"`) and `MobileNav` (`"(min-width: 48rem)"`).
- New `src/lib/breakpoints.ts`, mirroring Tailwind's defaults (sm 40rem, md 48rem, lg 64rem), with:
  - `atLeast("md")`, giving `(width >= 48rem)`, the same query Tailwind's `md:` uses
  - `below("sm")`, giving `(width < 40rem)`
  - `maxPx("lg")`, giving `1023`, for Splide's pixel breakpoint keys
- `Carousel` and `LogoStrip` use `maxPx("lg")` and `maxPx("sm")`, `ProcessPlayer` uses `below("sm")`, and `MobileNav` uses `atLeast("md")`. Behaviour is unchanged.

### 3. Name the last two magic numbers
- `LogoStrip.tsx`: the `50` in `Math.min(now - last, 50)` becomes `const MAX_STEP_MS = 50`. The comment already explains it (a dropped frame or background tab never jumps the strip).
- `PortfolioPreview.tsx`: the `1.25` in `scrollSeconds` becomes `const FRAME_RATIO = 5 / 4`, the frame's height ÷ width, with a note tying it to `aspect-4/5`, so changing one reminds you of the other.

### 4. Stop preloading Geist Mono
Both fonts are preloaded on every visit (29 KB + 23 KB). Geist Mono now only sets the small `aria-hidden` step numbers in the Process list, which is visible only from 640 to 1279px.
- In `layout.tsx`, `Geist_Mono({ …, preload: false })` (Next 16 font API, `node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md` → `preload`). The font still loads where it's used, with `display: swap`. It's just no longer a high-priority download on phones and desktops that never show it.

**Not changed:** the `public/logo/` files. They're yours and unused at runtime, since the wordmark is inlined. Say if you want them moved out of `public/`.

## Docs
- **DESIGN.md:** Shared UI (`breakpoints.ts`, `contact/limits.ts`), and Typography (Geist Mono isn't preloaded).
- **CLAUDE.md:** the Coding rules' list of shared helpers in `src/lib/` (`cn.ts`, `useMediaQuery.ts`, `breakpoints.ts`).
- **PROGRESS.md:** a Completed entry with the audit results; Decisions (prompt items declined under your rules, motion skipped for now); and the prompt's content-dependent items, testimonials, socials and newsletter, waiting on real content.

## Verification
- `npm run check` passes, and the `/ew-test` sweeps are clean.
- Grep confirms that no raw `1023`, `639` or `48rem` breakpoints, no limit numbers and no `1.25` remain outside the new constants.
- **Contact form** (dev server): a too-long name is still capped by `maxLength`, and the server still answers "Keep your name under 100 characters." when the browser checks are bypassed.
- **Breakpoints:** at 639/640, 767/768 and 1023/1024:
  - Carousel and LogoStrip switch slide counts and widths at the same points as before
  - the Process phone animation switches at 640
  - the mobile menu closes when the window widens past 768
- **Fonts:** the built `index.html` preloads one font (Geist) instead of two, and the Process step numbers still render in Geist Mono at 768.
- Rerun the read-only a11y sweep at 375, 1440 and 1920: 0 contrast failures, no overflow, a clean console.
