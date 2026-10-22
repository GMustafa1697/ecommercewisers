# Add a "Tailwind" badge to the code animation

## Context

The "Why ecommercewisers" panel plays `public/animations/code-dark.lottie` (a dotLottie file). Seven tech badges ride an arc above the screens: **HTML, CSS, Js, PHP, Next.js, React, SQL**. You asked (2026-10-20) to add **"Tailwind"** as an eighth badge, matching the existing style.

Your choices:
- Label **"Tailwind"** (not "Tailwind CSS" / "TailwindCSS") — it is one word like the others.
- **Add it on top of the seven** (nothing is removed).
- **Text only**, no Tailwind logo mark — like every other badge, and it keeps the page's "no brand marks outside the Platforms strip" rule.

The animation has **no text layers**: every label is a vector outline (shape layers, `ty: 4`). So "Tailwind" must be drawn as new vector path data, exactly as the last rework drew "Next.js", "React" and "SQL" in Geist SemiBold.

## How it works today (read from the file)

1080×1080, 30 fps, 480 frames (16 s loop). 73 top-level layers, `"assets": []`, no fonts, no text layers.

- Badges are layers `PHP` (ind 65), `CSS` (66), `HTML` (67), `JS` (69), `Next.js` (72), `React` (73), `SQL` (74), at array indices 64–70. They sit **below** the screens and the phone, so the screens cover them. `path` (71) and `bg circle` (72) are the last two array entries, i.e. the very back.
- Each badge layer: glyph groups (one per character, e.g. `N`,`e`,`x`,`t`,`.`,`j`,`s`) + a `Ring` group (two `sh` paths, merged, white fill; outer radius 25.007, inner 23.007 — a 2-unit ring) + a `Disc` group (one `sh` path, radius 24.007, fill = badge colour).
- Colours: dark **#28282C** (0.1568627450980392) for Js, HTML, Next.js, SQL; gold **#E6AC0E** (0.902) for CSS, PHP, React. Letters and ring are white.
- Badge geometry in the `control` null's local space (null at canvas 540,540, scale 188%; **canvas = 540 + local × 1.88**):

  | Slot | local | canvas | ring Ø |
  |---|---|---|---|
  | A | (-118.3, -86.558) | (317.6, 377.3) | 44 |
  | B | (-72, -124.3) | (404.6, 306.3) | 50 |
  | C | (-1.1, -140) | (537.9, 276.8) | 73 |
  | D | (67.4, -124.3) | (666.7, 306.3) | 50 |
  | E | (114.6, -86.6) | (755.4, 377.2) | 44 |
  | H1 | (116.997, -19.457) | (759.8, 503.4) | 44 |
  | H2 | (-134.344, -11.948) | (287.4, 517.5) | 44 |

  `H1` is behind the right monitor, `H2` behind the left one. The monitors cover canvas x 130–950, y 416–739 and never move; the phone is in the middle and drops away during frames 198–285 and 447–42, so the middle is **not** a safe place to hide a badge.
- **Motion.** Each badge has an 8-keyframe position list (times 0, 69, 137, 206, 274, 343, 411, 480 — seven steps of 480/7 ≈ 68.6 frames) and a matching 8-keyframe scale list. The cycle is **A → B → C → D → E → H1 → H2 → A**; the four arc moves and the dive reuse the delivered spatial tangents (`to`/`ti`) and easing (`i`/`o`), the wait at H1 is a hold keyframe (`h: 1`), the H1 → H2 crossing is an instant jump, and H2 → A is the rise.
- Every badge is the **same size in a given slot** (scale = slot ring Ø ÷ that badge's own ring Ø): 44 / 50 / 73 / 50 / 44 / 44 / 44.
- Label sizing rule used last time: **cap height = min(0.20 × ring, the size at which the label's ink is 0.60 × ring wide)**, ink centred on the disc (25.257, 25.257). Measured in the file: `SQL` ink 27.03 × 11.13, `Next.js` ink 30.01 × 7.76, `React` ink 30.01 × 7.86.
- Reduced-motion still: frame **342** (`src/components/sections/WhyUs.tsx:18`) — the last settled frame before the move at 343, inside the window 339–382 where the phone, its screen items and all code lines are shown.

## Design

**Eight slots: five on the arc, three hidden.** The five visible arc slots (A–E) and their positions, sizes and curves are untouched. A **third hidden slot `H1b`** is added behind the right monitor, directly below `H1`: local **(116.997, 26.6)** → canvas **(759.8, 590)**. It must be confirmed opaque by the render check in Verification; if the right panel does not cover it, the fallback is the same column deeper (local y up to ~50) or the equivalent spot behind the left panel next to `H2` (local ≈ (-134.344, 26.6)).

`H1b` must be a **distinct** position from `H1`: the eight badges occupy the eight slots in lockstep, so two badges at the same spot would overlap and their labels would be unreadable.

**Cycle:** `A → B → C → D → E → H1 → H1b → H2 → A` — eight steps of **60 frames (2.0 s)** each, keyframe times **0, 60, 120, 180, 240, 300, 360, 420, 480**.

**Motion per step** (each badge's list is the cycle rotated to its own slot, as today):
1. `A→B`, `B→C`, `C→D`, `D→E` — the delivered arc curves, same spatial tangents and easing, just 60 frames instead of 68.6.
2. `E→H1` — the delivered dive behind the right monitor, same tangents.
3. `H1→H1b` — a hidden glide down the right panel (new tangents; it never shows).
4. `H1b→H2` — a **hold keyframe** (`h: 1`) on `H1b`, so the crossing is an instant jump between two hidden spots, never a glide past the seams at canvas x 391 and x 688 (the previous rework found that gliding shows a 1 px line of the badge through those seams).
5. `H2→A` — the delivered rise, same tangents.

**Scale per step:** slot ring Ø (44/50/73/50/44/44/44/44) ÷ that badge's own outer ring Ø. The new badge copies the `CSS` layer, so its ring is 50.014 and its scale list is CSS's.

**Order and colours.** The eight badges are placed around the cycle so the colours **alternate perfectly** (4 dark, 4 gold — the seven-badge version had one unavoidable same-colour pair). Arrangement at t = 0:

| slot | A | B | C | D | E | H1 | H1b | H2 |
|---|---|---|---|---|---|---|---|---|
| badge | HTML | CSS | Js | **Tailwind** | Next.js | PHP | SQL | React |
| colour | dark | gold | dark | **gold** | dark | gold | dark | gold |

Because the badges advance in lockstep, this arrangement holds at every step. At the still frame it gives, left to right:

**Js · Tailwind · Next.js · React · SQL** — with Next.js large in the middle and Tailwind second from the left, so the new badge is visible in the reduced-motion still.

**The new badge layer.** A copy of the `CSS` layer (ring 50.014, disc 48.014, white 2-unit ring) with:
- `ind` **75** (next free; 68 is free too, but 75 avoids the reused number), inserted at **array index 71** — right after `SQL`, before `path` and `bg circle`, so it keeps the other badges' depth and stays behind the screens and the phone.
- `ip: 0`, `op: 480`, `st: 0`, `parent: 1` (the `control` null), same as the other badges.
- 8 glyph groups `T`,`a`,`i`,`l`,`w`,`i`,`n`,`d` (one per character, as `Next.js` does), each a `sh` path with a `fl` white fill and a `tr` transform.
- 9 position keyframes (0…480) and 9 scale keyframes, from the schedule above.

**The label.** Geist **SemiBold 600**, matching the previous three new labels: stems 18.3% of cap height (the old labels measure 18.6%), nonzero fill rule (`r: 1`), white.

Size: ink width **30 units** (0.60 × the 50.014 ring), the same target as `Next.js` and `React`. Measured advance widths in Geist: `Tailwind` 4.400 em, `Next.js` 3.708 em, `SQL` 2.101 em, cap height 0.710 em. So at ink width 30, "Tailwind" is em ≈ 6.9 and cap height ≈ **4.9** — a little smaller than `Next.js` (5.6), the same order of magnitude, and legible at the large centre slot. The ink band is centred on the disc (25.257, 25.257); "Tailwind" has no descenders.

Because "Tailwind" is eight characters in the same disc, it will be the **smallest label in the animation** — that is the cost of one word in a circular badge, and it is why the short label was chosen over "Tailwind CSS" (which would be 6.411 em and need an em of 4.7, i.e. a cap height of 3.3, unreadable).

## Files

- `public/animations/code-dark.lottie` — rebuilt. Same name, so `WhyUs.tsx` and `next.config.ts` do not change. The manifest is rewritten with `"author": "ecommercewisers"` (it still says `"LottieFiles"`, which breaks the brand rule) — the same fix already applied to the Process file.
- `src/components/sections/WhyUs.tsx` — `stillFrame` **342 → 359** (the last settled frame before the move at 360; 359 is inside the 339–382 window where the phone, its screen items and all code lines are shown) and the comment above it.
- `docs/DESIGN.md` → Animation → the code animation: eight badges, the new timing and slot, the colours, the label size, the new byte size, still 359.
- `docs/PROGRESS.md` — a new entry: your choices, what changed, and the checks.

## Tools (scratch only; no project dependency)

- A throwaway Python venv **outside the project** with `fonttools` (pure Python), as the previous rework did. Geist comes from the OFL `google/fonts` repo (`ofl/geist/Geist[wght].ttf`, reachable) instanced at wght 600; the fallback is `node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf` (Regular only). **No font file is copied into the project and no dependency is added to `package.json`.**
- The edit script lives outside the project: it unzips the `.lottie`, edits `animations/12345.json`, and repacks with `zipfile` and a hand-written manifest. TrueType quadratics are converted to Lottie cubic vertices (`v`, `i`, `o`, `c`).
- The script asserts: eight badge layers, no `fonts`/`chars`/text layers, the label count of eight, colours only white / gold #E6AC0E / dark #28282C, the first and last keyframe of every badge equal, frame 480 = frame 0, and — with the badges stripped out — that the rest of the file is byte-identical to today's.
- Verification renders use the project's own player and `public/lottie/dotlottie-player-0.80.0.wasm` in headless Chrome, driven over the DevTools protocol from a scratch page outside the project.

## Risks

- The badges move every 2.0 s instead of 2.3 s (was 3 s before the last rework) — the price of an eighth badge.
- "Tailwind" is the longest label and therefore the smallest; it reads as a small word on the disc.
- Geist's letterforms differ slightly from the four delivered labels (accepted last time, and accepted again here).
- The file keeps its name, so a browser that cached the old file can show it for up to a day (`max-age=86400`). The site is not deployed.
- If the render check shows the right panel does not cover `H1b`, the fallback position is used; if no hidden spot works, the fallback is to report back before touching the file.

## Verification

1. **Frame renders** (headless Chrome, the project's player and WASM):
   - Render all 480 frames of the new file, and again from a copy with the eight badges removed; the difference is what the badges show.
   - No badge pixel ever below canvas y ≈ 434 or outside x ≈ 241–822 — this is the check that proves `H1b` is fully hidden, and it must be compared against the same check on the current file as a baseline.
   - At each of the eight step ends, exactly five badges, one per arc slot A–E, and three hidden.
   - Frame 480 equals frame 0; the loop is seamless.
   - A contact sheet at the still frame, to check that "Tailwind" is legible, that its weight and size sit with the other labels, and that the colours alternate.
2. **Still:** frame 359 shows Js · Tailwind · Next.js · React · SQL at rest, with the phone and all code lines on screen.
3. `npm run check` passes (typecheck, lint, build) and the `/ew-test` sweeps are clean.
4. **Dev server**, headless Chrome at 375, 768, 1024 and 1440: the animation plays in view and freezes off-screen; under reduced motion it holds the 359 still; no horizontal scroll, no console errors, layout shift 0.
5. Update the docs. **Commit only when you ask.**
