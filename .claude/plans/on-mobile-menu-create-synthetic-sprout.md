# Mobile menu: spin ring, then slide-in

Two steps on the same menu, both implemented 2026-10-23 and uncommitted. Part 1 below is the record of the ring work you asked me to keep.

---

# Part 2: the menu slides in from the left (done)

**Status:** implemented as planned. `npm run check` passes, and the headless Chrome checks below all passed (details in `docs/PROGRESS.md` → Now). Still to do: your check by hand.

## Context
You sent a screenshot of the open menu with "now mobile menu slide in from left side smoothly". Today the panel just appears and disappears. It's toggled with the `hidden` attribute, and Tailwind's preflight turns that into `display: none !important`, so it can't animate.

**Outcome:** on opening, the panel glides in from the left edge of the screen while fading in. On closing (✕, a link tap, Escape, a tap outside, Tab out, or widening), it glides back out to the left. It moves on the same 400ms ease-out curve as the ☰/✕ slide, so the two move together. Under reduced motion it opens and closes instantly, as now.

## Approach
Keep the panel rendered, and swap `hidden` for an open/closed state that CSS can transition. This is the same pattern as the header's hide on scroll (`data-hidden` + CSS in `globals.css`).

### 1. `src/components/ui/ButtonContent.tsx`
Split the motion constant so the panel reuses the curve without copying it:
```ts
export const swapEase = "duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)]";
export const swapMotion = `transition-transform ${swapEase}`;
```
Each class stays a literal string, so Tailwind still finds it. Update the comment: the toggle's ☰/✕ and the menu panel move on it too.

### 2. `src/components/sections/Header.tsx` (`MobileNav` panel)
- Drop `hidden={!open}` and add `data-open={open || undefined}`.
- `className={cn("btn-secondary absolute inset-x-0 top-full isolate mt-2 rounded-lg border-2 border-border bg-background transition-[translate,opacity,visibility]", swapEase, open ? "btn-ring-on" : "invisible -translate-x-full opacity-0")}`. What each part does:
  - **Closed:** `invisible -translate-x-full opacity-0`. The panel sits just off the left edge, fully transparent. `visibility: hidden` takes it out of the tab order, the accessibility tree and hit-testing, as `hidden` did. Being off-screen to the left adds no horizontal scroll.
  - **Open:** the defaults (visible, no translate, opacity 1).
  - **Visibility:** it switches at once on opening, and at the *end* of the slide out on closing (`visibility` interpolates that way), so the panel stays visible while it leaves.
  - **The ring:** `btn-ring-on` is applied only while open. The panel no longer goes `display: none`, so this is what stops the ring when it's closed. On closing it fades out over its 200ms as the panel slides away.
- Update the comment above `MobileNav` to mention the slide.
- **Unchanged:** the toggle, rows, CTA, `id`, `aria-controls`, the close handlers and the `md:hidden` wrapper (desktop never renders it).

### 3. `src/app/globals.css`
- Block 6: `.site-header[data-hidden]:not(:focus-within):not(:has(#mobile-menu:not([hidden])))` becomes `…:not(:has(#mobile-menu[data-open]))`, so the header still stays shown while the menu is open. Update its comment ("or the mobile menu is open" stays true).
- Block 7: update the `.btn-ring-on` comment. The class is now on the panel only while it's open, rather than the panel being `display: none` while closed.
- **Reduced motion:** the global `transition-duration: 0s` already makes the slide instant. Nothing to add.

### 4. Docs
- **CLAUDE.md → Performance:** add the menu panel's slide-in to the motion exceptions: a 400 ms `translate` + `opacity` from the left, back out on close, instant under reduced motion.
- **DESIGN.md:** Responsive → Nav (the panel is now always rendered, with `data-open` and `invisible -translate-x-full opacity-0` while closed), Spacing → the header's "stays shown while the mobile menu is open" selector, and Animation → the mobile menu bullet.
- **PROGRESS.md:** a new Latest entry and a row in the Decisions log.

## Verification
1. `npm run check` passes, and the `/ew-test` sweeps are clean.
2. Headless Chrome against the dev server (:3000), with touch emulation, at 320 and 375:
   - **Closed:** the panel computes `visibility: hidden`, opacity 0 and translate -100%. Tab from the toggle skips the menu links. No horizontal scroll.
   - **Opening:** sample the panel's x position and opacity at about 0, 100, 200 and 450ms after the tap. It moves left to right and lands at the bar's left edge (16px), with opacity rising to 1 and the ring at opacity 1, running.
   - **Closing with ✕:** it slides back out to the left and ends at `visibility: hidden`. The ring is paused and faded.
   - **The other ways to close:** Escape (closes and refocuses the toggle), a link tap (closes and scrolls to the section), and widening to 768 (closes).
   - **The header** stays shown while the menu is open, even scrolling down. Once the menu is closed, scrolling down hides the header again.
   - **Reduced motion:** opening and closing are instant (no in-between frame).
   - **568×320:** the panel's list still scrolls inside it.
   - **Screenshots** mid-slide and at rest. No console errors.
3. Your check by hand at 375, 768 and 1440.

---

# Part 1: one spin ring around the whole block (done)

**Status:** implemented 2026-10-23, uncommitted. `npm run check` passes. Logged in `docs/PROGRESS.md` (Now and the Decisions log).

## Context
You asked: "on mobile menu create animation same we use on buttons", with a screenshot of the open menu. The animation is the CTA buttons' spin ring: a gold conic sweep around a 2px border, one turn every 2s, from your `buttons.html`.

### Version 1 (replaced)
Your choices were the toggle plus every block in the menu, all spinning while open, plus a ☰/✕ slide. So the toggle became a secondary circle with a ring, the five links became secondary pills with the ring and the arrow (label left, arrow right, through a new `align` option and an `icon` size on `ButtonLink`), and every ring spun while the menu was open.

### Version 2 (final)
From your screenshot of version 1 you asked for "external animation on whole block, remove internal animation, and also remove from hamburger button animation; make fields plain, not rounded". Your follow-up choices:
- **One ring around the whole menu block**, spinning the whole time the menu is open, because phones have no hover.
- **No rings inside it.** The five rows are plain again, as before today: text with divider lines, no pill and no arrow. "Start a project" is the normal secondary CTA, with its ring on hover and keyboard focus only.
- **The hamburger has no ring.** It's back to the plain circle with the grey hover fill, but **keeps the ☰/✕ slide**.
- **Reduced motion:** the ring shows without turning, and the icons swap instantly.

## What changed (final code)

### `src/components/sections/Header.tsx` (`MobileNav`)
- **Toggle:** the original classes (`-mr-2.5 inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors ease-out hover:bg-surface`). Its ☰ and ✕ sit in a clipped `relative size-6 overflow-hidden` box (aria-hidden), each `absolute inset-0 size-full` with `swapMotion`. When open, ☰ is at `-translate-y-[150%]`; when closed, ✕ is at `translate-y-[150%]`. There's no `motion-safe:` because the swap is a change of state: under reduced motion the global 0s transition makes it instant.
- **Panel:** `#mobile-menu` is a non-scrolling frame, `btn-secondary btn-ring-on absolute inset-x-0 top-full isolate mt-2 rounded-lg border-2 border-border bg-background`, holding a `<span className="btn-ring">` and an inner `relative z-1 max-h-[calc(100dvh-var(--header-height)-1.5rem)] overflow-y-auto overscroll-contain` div. Two reasons for the frame:
  - `overflow` clips at the padding edge, so a scrolling frame would cut off the ring, which sits over the border.
  - The cap grew from 1.25rem to 1.5rem to allow for the borders, so the panel still ends 12px above the viewport's bottom.
- **Rows and CTA:** as before today (`divide-y divide-border`, 48px `Link` rows; the secondary `lg` `ButtonLink` + `ButtonContent`).

### `src/app/globals.css` (block 7, the spin ring)
- `.btn-ring-on > .btn-ring` (opacity 1) and `… > .btn-ring::before` (`animation-play-state: running`) show and spin **only the frame's own ring**. The CTA inside keeps hover and focus. The panel is `display: none` while closed, so nothing runs then.
- `.btn-ring` has `container-type: size`, and `::before` has `width: 150%; width: 150cqmax;`. That's half again the ring's longer side, so it covers the corners of the taller-than-wide panel. Buttons are unchanged (their longer side is the width), and 150% is the fallback where container units aren't supported.

### `src/components/ui/ButtonContent.tsx`
`arrowMotion` became the exported `swapMotion` (the 400ms arrow curve), shared with the toggle.

### `src/components/ui/ButtonLink.tsx`
Unchanged in the end. Version 1's `icon` size and `align` option were removed again.

### Docs
- CLAUDE.md → Performance (the motion exceptions)
- DESIGN.md → Buttons (spin ring, toggle slide), Animation, Responsive → Nav
- PROGRESS.md → Now and the Decisions log

## Verification (done)
1. `npm run check` passes. The sweeps found nothing new; the `bg-black`/`text-white` in `PortfolioPreview.tsx` are a known issue from before.
2. Headless Chrome against the dev server (scratch script `menu-ring.mjs`), with touch emulation so `(hover: hover)` is false:
   - **Closed (320, 375):** the toggle is a 44px borderless circle, ☰ in place, ✕ out.
   - **Open:** ✕ is in place. The panel is 286×348 at 320 and 341×348 at 375, with a 2px border and 8px radius. Its ring is at opacity 1, running and advancing, in gold `#e6ac0e`. The sweep is 522px against panel diagonals of 450 and 487. The CTA's ring is hidden and paused, and the rows are 48px.
   - **Behaviour:** the header stays shown while open, even scrolling down. Escape closes the menu and refocuses the toggle. A tap on "Process" closes it and lands the section at 68px.
   - **Reduced motion:** the ring has `animation-name: none` and stays visible, and the icons have swapped 50ms after the tap.
   - **568×320:** the list scrolls inside the frame (344 in 228px), the ring stays put, the panel ends 13px above the bottom and the CTA is reachable.
   - **768:** the toggle is hidden. **1440:** the header CTA's sweep is still 150% of its width (244/163px) and spins on hover.
   - **Every width:** no horizontal scroll and no console errors. Screenshots at 375 show the ring's gap moving around the block.
3. **Still to do:** your check by hand at 375, 768 and 1440.
