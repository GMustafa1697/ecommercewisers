# Add a "Tailwind" badge to the code animation

## Context

The "Why ecommercewisers" panel plays `public/animations/code-dark.lottie` (a dotLottie file). Seven tech badges ride an arc above the screens: **HTML, CSS, Js, PHP, Next.js, React, SQL** (C++ was removed on 2026-10-20). You asked (2026-10-21, with a screenshot of the current animation) to **add Tailwind CSS** to it.

Your choices:
- **Label "Tailwind"** — one word, like the other badges. "Tailwind CSS" needs a 6.4 em word in a 30-unit-wide disc, so its letters would be 40% smaller than "Tailwind" and unreadable; "TW" would be legible but is a code, not the name.
- **Add it to the seven** — nothing is removed.
- **Tailwind in the large centre badge of the reduced-motion still**, next to React and Next.js — the site's own stack.
- **Text only**, no Tailwind logo mark: like every other badge, and it keeps the page's "no brand marks outside the Platforms strip" rule.

The animation has **no text layers**: every label is a vector outline (shape layers, `ty: 4`). "Tailwind" must be drawn as new path data, exactly as the last rework drew "Next.js", "React" and "SQL" in Geist SemiBold.

*(This supersedes the earlier draft `.claude/plans/glistening-swimming-whisper.md`, which had the same idea but a different still frame; that file is deleted during the work.)*

## How it works today (read from the file)

1080×1080, 30 fps, 480 frames (16 s loop). 73 top-level layers, `"assets": []`, no fonts, no text layers.

- Badges are layers `PHP` (ind 65), `CSS` (66), `HTML` (67), `JS` (69), `Next.js` (72), `React` (73), `SQL` (74), at array indices 64–70. They sit **below** the screens and the phone, so the screens cover them. `path` (71) and `bg circle` (72) are the last two array entries, i.e. the very back.
- Each badge layer: one group per character + a `Ring` group (two merged `sh` paths, white fill, outer radius 25.007, inner 23.007 — a 2-unit ring) + a `Disc` group (one `sh` path, radius 24.007, fill = the badge colour).
- Colours: dark **#28282C** for Js, HTML, Next.js, SQL; gold **#E6AC0E** for CSS, PHP, React. Letters and ring are white.
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

- **Motion.** Each badge has an 8-keyframe position list (times 0, 69, 137, 206, 274, 343, 411, 480 — seven steps of 480/7 ≈ 68.6 frames) and a matching 8-keyframe scale list. The cycle is **A → B → C → D → E → H1 → H2 → A**: the four arc moves and the dive reuse the delivered spatial tangents (`to`/`ti`) and easing (`i`/`o`), the wait at H1 is a hold keyframe (`h: 1`), the H1 → H2 crossing is an instant jump, and H2 → A is the rise.
- Every badge is the **same size in a given slot** (scale = slot ring Ø ÷ that badge's own ring Ø).
- Label sizing rule used last time: **cap height = min(0.20 × ring, the size at which the label's ink is 0.60 × ring wide)**, ink centred on the disc (25.257, 25.257). In the file: `SQL` ink 27.03 × 11.13, `Next.js` ink 30.01 × 7.76, `React` ink 30.01 × 7.86.
- **The still frame must be 339–386.** The phone's screen items pop in and out on their own schedule (the last one, `bottom text mobile`, is out between 417 and 427), so the reduced-motion still has to sit in that window. The current still is frame 342.

## Design

**Eight slots: five on the arc, three hidden.** The five visible arc slots (A–E) and their positions, sizes and curves are untouched. A **third hidden slot `H1b`** is added behind the right monitor, directly below H1: local **(116.997, 26.6)** → canvas **(759.8, 590)**.

*Coverage of H1b is already checked:* the right monitor's screen (layers `Layer 38/39/40 Outlines`, a hexagon spanning canvas x 688–950, y 416–739) covers a whole disc of radius 41.4 px at x = 760 for every centre from y = 475 to y = 680. H1 (503.4) sits inside that band and is verified hidden today; H1b (590) does too, with 90 px of margin below. The glide between them is a straight vertical line inside the same column, so it never peeks out. The render check below is the final proof.

H1b must be a **distinct** position from H1: the eight badges occupy the eight slots in lockstep, so two badges at the same spot would overlap.

**Cycle:** `A → B → C → D → E → H1 → H1b → H2 → A` — eight steps of **60 frames (2.0 s)** each, keyframe times **0, 60, 120, 180, 240, 300, 360, 420, 480**.

**Motion per step** (each badge's list is the cycle rotated to its own slot, as today):
1. `A→B`, `B→C`, `C→D`, `D→E` — the delivered arc curves, same spatial tangents and easing, just 60 frames instead of 68.6.
2. `E→H1` — the delivered dive behind the right monitor, same tangents.
3. `H1→H1b` — a **glide straight down the right panel** (new tangents `to` [0, 46.057], `ti` [0, -46.057], the same easing as the arc moves). It is never seen.
4. `H1b→H2` — a **hold keyframe** (`h: 1`) on `H1b`, so the crossing is an instant jump between two hidden spots, never a glide past the seams at canvas x 391 and x 688 (the last rework found that gliding shows a 1 px line of the badge through those seams).
5. `H2→A` — the delivered rise, same tangents.

**Scale per step:** slot ring Ø (44/50/73/50/44/44/44/44) ÷ that badge's own outer ring Ø. The new badge copies the `CSS` layer, so its ring is 50.014 and its scale list is CSS's.

**Order and colours.** The eight badges are placed around the cycle so the colours **alternate perfectly** (4 dark, 4 gold — the seven-badge version had one unavoidable same-colour pair). Arrangement at t = 0:

| slot | A | B | C | D | E | H1 | H1b | H2 |
|---|---|---|---|---|---|---|---|---|
| badge | CSS | SQL | React | Next.js | **Tailwind** | Js | PHP | HTML |
| colour | gold | dark | gold | dark | **gold** | dark | gold | dark |

Because the badges advance in lockstep, this arrangement holds at every step. Six steps later (the keyframe at 360) the arc reads, left to right:

**React · Next.js · Tailwind · Js · PHP** — with **Tailwind large in the middle**, and the colours alternating gold · dark · gold · dark · gold. SQL, CSS and HTML are behind the screens.

**The new badge layer.** A copy of the `CSS` layer (ring 50.014, disc 48.014, white 2-unit ring) with:
- `ind` **75** (next free), inserted at **array index 71** — right after `SQL`, before `path` and `bg circle`, so it keeps the other badges' depth and stays behind the screens and the phone.
- `ip: 0`, `op: 480`, `st: 0`, `parent: 1` (the `control` null), same as the other badges.
- 8 glyph groups `T`,`a`,`i`,`l`,`w`,`i`,`n`,`d` (one per character, as `Next.js` does), each a `sh` path with a `fl` white fill and a `tr` transform.
- 9 position keyframes (0…480) and 9 scale keyframes, from the schedule above.

**The label.** Geist **SemiBold 600**, matching the previous three new labels: stems 18.3% of cap height (the old labels measure 18.6%), nonzero fill rule (`r: 1`), white.

Size: ink width **30 units** (0.60 × the 50.014 ring), the same target as `Next.js` and `React`. Measured in Geist 600: "Tailwind" ink 3.978 em, cap height 0.710 em, so the cap lands at ≈ 5.4 units (10.7% of the ring) — a little smaller than "Next.js" (≈ 7.8), the same order of magnitude, and legible in the large centre ring (73) where the cap is ≈ 7.8 units, exactly what "Next.js" measures in a 50-unit ring. "Tailwind" has no descenders, so the ink band is centred on the disc (25.257, 25.257).

## Files

- `public/animations/code-dark.lottie` — rebuilt. Same name, so `WhyUs.tsx` and `next.config.ts` do not change. The manifest is rewritten with `"author": "ecommercewisers"` (it still says `"LottieFiles"`, which breaks the brand rule) — the same fix already applied to the Process file. Size goes from 21,534 B to about 22.5 KB (the exact number goes in the docs).
- `src/components/sections/WhyUs.tsx` — `stillFrame` **342 → 359** (the last settled frame before the move at 360; 359 is inside the 339–386 window where the phone, its screen items and all code lines are shown) and the comment above it.
- `docs/DESIGN.md` → Animation → the code animation: eight badges, the new timing and slot, the colours, the label size, the new byte size, still 359.
- `docs/PROGRESS.md` — a new entry: your choices, what changed, and the checks.
- `.claude/plans/glistening-swimming-whisper.md` — deleted (superseded by this plan).

## Tools (scratch only; no project dependency)

- A throwaway Python venv **outside the project** with `fonttools` (pure Python), as the previous rework did. Geist comes from the OFL `google/fonts` repo, instanced at wght 600. **No font file is copied into the project and no dependency is added to `package.json`.**
- The edit script lives outside the project (the scratchpad, still in place): it unzips the `.lottie`, edits `animations/12345.json`, and repacks with `zipfile`. TrueType quadratics are converted to Lottie cubic vertices (`v`, `i`, `o`, `c`). It reads the delivered tangents and easing straight out of the current file, so the arc, the dive and the rise keep their shapes.
- The script asserts: eight badge layers, no `fonts`/`chars`/text layers, colours only white / gold #E6AC0E / dark #28282C / the file's greys, the first and last keyframe of every badge equal, frame 480 = frame 0, and — with the badges stripped out — that the rest of the file is byte-identical to today's.
- Verification renders use the project's own player and `public/lottie/dotlottie-player-0.80.0.wasm` in headless Chrome, driven over the DevTools protocol from a scratch page outside the project.

## Risks

- The badges move every 2.0 s instead of 2.3 s (was 3 s before the last rework) — the price of an eighth badge.
- "Tailwind" is the longest label and therefore the smallest; it reads as a small word on the disc.
- Geist's letterforms differ slightly from the four delivered labels (accepted last time, and accepted again here).
- The file keeps its name, so a browser that cached the old file can show it for up to a day (`max-age=86400`). The site is not deployed.
- If the render check shows any badge pixel below y 434, the fallback is the equivalent spot behind the left panel next to H2 (local ≈ (-134.344, 26.6)); if no hidden spot works, the work stops and reports back before touching the file.

## Verification

1. **Frame renders** (headless Chrome, the project's player and WASM):
   - Render all 480 frames of the new file, and again from a copy with the eight badges removed; the difference between the two is what the badges show.
   - No badge pixel ever below canvas y ≈ 434 or outside x ≈ 241–822 — the same bounds the last rework held, and the check that proves `H1b` is fully hidden. The current file is the baseline.
   - At each of the eight step ends, exactly five badges, one per arc slot A–E, and three hidden.
   - Frame 480 equals frame 0; the loop is seamless.
   - A contact sheet at the still frame: "Tailwind" is legible, its weight and size sit with the other labels, and the colours alternate.
2. **Still:** frame 359 shows React · Next.js · Tailwind · Js · PHP at rest, with Tailwind large in the middle, and the phone, its screen items and all code lines on screen.
3. `npm run check` passes (typecheck, lint, build) and the `/ew-test` sweeps are clean.
4. **Dev server**, headless Chrome at 375, 768, 1024 and 1440: the animation plays in view and freezes off-screen; under reduced motion it holds the 359 still; no horizontal scroll, no console errors, layout shift 0.
5. Update the docs. **Commit only when you ask.**
