# Hero: buttons side by side on phones

## Context
Below `sm` (640px) the Hero's two CTAs ("Start a project", "See how we work") are full width and stacked
(`flex flex-col gap-4 sm:flex-row` in `src/components/sections/Hero.tsx:79`). You asked for them inline
on mobile.

They won't fit at their current size: at `lg` (52px tall, 16px text, `px-6`) the pair is **401px** wide
(measured, `docs/DESIGN.md:117`), and a 375px phone has **343px** of content (Container `px-4`). So on
phones the buttons have to be smaller:

| Phone size | Pair width (`gap-2`) | 320 (288px) | 360 (328px) | 375 (343px) |
|---|---|---|---|---|
| `lg` now | ~393px | wraps | wraps | wraps |
| `md` (`h-11 px-5 text-sm`) | ~347px | wraps | wraps | wraps (by 4px) |
| **`h-11 px-3 text-sm`** | **~315px** | wraps | **fits** | **fits** |

The plan uses the last row: 44px tall (still the 44px tap-target minimum), 14px text, 12px side padding,
side by side from 360px (most Android phones, every iPhone). On a 320px screen they can't fit, so the row
wraps them onto two centred lines instead of scrolling sideways. From `sm` they go back to today's `lg`
size, so tablet and desktop look the same as now.

## Changes

### 1. `src/components/ui/ButtonLink.tsx`: one new size
Add a responsive size to `sizes`, so the Hero doesn't pass classes that fight `px-*`/`h-*` (DESIGN.md
says not to do that with `cn()`):

```ts
const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-base",
  // The Hero's pair, side by side on phones: md's height and text with tighter padding below sm, lg from sm.
  responsive: "h-11 px-3 text-sm sm:h-13 sm:px-6 sm:text-base",
} as const;
```

`ButtonStyle["size"]` picks it up through `keyof typeof sizes`; nothing else changes.

### 2. `src/components/sections/Hero.tsx`: the button row
- Line 79: `mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center xl:justify-start` becomes
  `mt-12 flex flex-wrap justify-center gap-x-2 gap-y-3 sm:gap-4 xl:justify-start`
  (a row at every width, centred while the columns stack, at the start from `xl` as now; wraps only
  when there isn't room, i.e. at 320).
- Both `ButtonLink`s get `size="responsive"`.
- Update the comment above it (lines 77–78) to say: side by side and compact on phones, wrapping on the
  narrowest, `lg` from `sm`.

### 3. Docs
- `docs/DESIGN.md`
  - Buttons → Size table: add the `responsive` row (`h-11 px-3 text-sm sm:h-13 sm:px-6 sm:text-base`,
    the Hero's two CTAs, 2026-10-23, your request "on mobile view make buttons inline").
  - Line 118 (Hero left column): replace "full width and stacked on phones" with side by side on phones
    (compact size, wraps at 320), and the button-row classes.
- `docs/PROGRESS.md`: log the change and the decision (why the phone size is smaller, and that 320 wraps).

## Verification
1. `npm run check` (typecheck, lint, build) passes.
2. `/ew-test` sweeps clean.
3. `npm run dev`, then at:
   - **320**: buttons wrap onto two centred lines, no horizontal scroll.
   - **360 / 375 / 414**: both on one centred row, 44px tall, labels on one line, nothing clipped.
   - **768 / 1024**: unchanged from today (52px `lg` buttons, centred row).
   - **1280 / 1440**: unchanged (left-aligned under the text).
4. Hover and keyboard focus still show the spin ring and arrow swap at the compact size; no console errors.
