# The Hero animation's ring and bubbles, visible on dark

## Context

You asked to make the line and bubbles in the Hero's code animation visible. They don't show because they
are near-black, and the Hero's background is dark (#222).

I read the file `public/animations/code-dark-v2.lottie` (one animation, 74 layers, 1080×1080). The
elements you mean are drawn in #28282C and #282727, which is 1.0–1.1:1 against #222:
- **The line** is the `path` layer: a thin circle around the gold disc (radius 155 units in the
  1.88× control space, a 1-unit stroke in #28282C). It's the orbit the badges ride along.
- **The bubbles** are seven small decorative dots and rings around the scene:
  - `Layer 62`, `Layer 63` and `Layer 64` are rings stroked in #282727;
  - `Layer 71` is a ring stroked in #28282C;
  - `Layer 72`, `Layer 74` and `Layer 3` are dots filled in #28282C.
  The white dots (`Layer 65`–`70`) and the gold one (`Layer 73`) already show.

The same file also plays in **Why ecommercewisers**, on the **white** section, where these dark parts
read well. So the shared file isn't recoloured: a light ring there would vanish on white.

## Approach: a Hero-only copy with the eight parts recoloured

- **New file `public/animations/code-hero.lottie`:** an exact copy of `code-dark-v2.lottie` in which
  only those eight layers change colour, to **#A0A0A0**.
  - #A0A0A0 is the palette's muted grey, 6.1:1 on #222.
  - It's visible but stays quieter than the white dots and the gold. The ring reads as a fine guide
    line, not a second outline competing with the gold disc.
  - Nothing else changes: not the timing, the shapes, the other colours or the manifest.
- **`src/components/sections/Hero.tsx`:** the content `animation.src` becomes
  `/animations/code-hero.lottie` (still frame 359, as now), with a comment on why the Hero has its own
  copy.
- **Why** keeps `code-dark-v2.lottie`, unchanged.
- **Cost:** the two sections no longer share one file, so the page fetches about 22 KB more. The Why
  copy loads lazily, near its section; the WASM player is still shared. A new name needs no cache
  handling: `/animations/*` is already cached for a day under its own name.

**How the file is made**, all in the scratchpad, never by hand-editing in `public/`:
1. A PowerShell step reads the zip with .NET's `System.IO.Compression`.
2. A Node script recolours only the `c.k` arrays of those layers' fill and stroke items, chosen by
   layer `ind`: 70, 51, 52, 53, 60, 61, 63 and 64.
3. A PowerShell step writes the new `.lottie` with the same `manifest.json` and
   `animations/12345.json`.
4. A check diffs the two JSONs and confirms that only those colour values changed.

## Docs
- **`CLAUDE.md`**, Stack: the versioned-name bullet notes that the Hero plays its own recoloured copy,
  `code-hero.lottie` (2026-10-22).
- **`docs/DESIGN.md`**:
  - Animation → the code animation: it now plays from two files. The Hero's copy draws the orbit ring
    and the seven small dark dots in #A0A0A0, because they were #28282C/#282727 and vanished on #222.
  - The Hero spec: its `src`.
- **`docs/PROGRESS.md`**:
  - a "Now" entry;
  - a Decisions-log row: a separate copy rather than recolouring the shared file, and the grey;
  - Known issues "versioned names": `code-hero.lottie` is a new, unversioned file.

## Verification
1. **The diff:** the parsed JSONs of `code-dark-v2` and `code-hero` differ only in the eight layers'
   colour arrays, all now `[0.627, 0.627, 0.627, 1]`.
2. **Headless Chrome against the dev server** (the CDP pattern from the scratchpad scripts):
   - the Hero's player requests `code-hero.lottie` and Why's requests `code-dark-v2.lottie`;
   - under emulated reduced motion (the still frame 359), take crops of the Hero animation at 1440 and
     375, before (the old file, from the same frame) and after, side by side: the ring and the seven
     dots must show;
   - a crop of Why at 1440, unchanged;
   - no console errors.
3. `npm run check` passes, and the `/ew-test` sweeps over `src/` are clean.

## Still outstanding (not part of this change)
- The Portfolio cards' raw `bg-black text-white` (Known issues).
- `.claude/refrence/` isn't gitignored; the old plan `glistening-swimming-whisper.md` needs your
  go-ahead to delete; the header wraps at 768px.
