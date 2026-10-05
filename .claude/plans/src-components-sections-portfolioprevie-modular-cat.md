# Guide file: adding a review video and its thumbnail

## Context
The user wants a step-by-step guide for adding a new video, with its thumbnail (poster), to the Video reviews
slider (`src/components/sections/Reviews.tsx`). The slider reads `videos` from `src/data/reviews.ts`. Today
that list is built from numbers: `[1, 2, 3, 4, 5, 6].map(...)` makes `/videos/reviews/review-0N.mp4` and `.webp`,
all captioned "Placeholder". No component change is needed. This is a docs task.

Facts checked for the guide:
- The 6 clips in `public/videos/reviews/` are 720×1280 (9:16), H.264 + AAC, 30 fps, 0.2–2.7 MB. The posters are 720×1280 WebP,
  11–58 KB.
- ffmpeg 9.0.2 and ffprobe are installed.
- `next.config.ts` caches `/videos/*` for a day, and Next caches images for 4 hours. So a changed file needs a new name.
- `ReviewVideo` = `{ caption, src, poster, captions? }`. A `.vtt` captions track is required for real, spoken reviews
  (WCAG 1.2.2). `isPlaceholder` shows the "placeholders, not customers" notice. CLAUDE.md allows only real, consented
  reviews with captions to replace the stock clips, and this blocks deploy.
- `public/videos/reviews/gemini_generated_video_d842fbe9.mp4` (untracked, 720×1280, 2.9 MB) is a source file in the
  published folder. The guide says to keep only the finished files there.

## Changes
1. **Create `docs/REVIEW-VIDEOS.md`** with the content below. It's written for the user: short sentences and simple words.
2. **`src/data/reviews.ts`:** add a one-line pointer to the `videos` comment: `How to add a video: docs/REVIEW-VIDEOS.md.`
3. **`CLAUDE.md` → Docs:** add `- docs/REVIEW-VIDEOS.md: how to add a video review and its thumbnail`.
4. **`docs/PROGRESS.md`:** a "Latest (2026-10-05)" line: the guide, docs only.

## Guide content (`docs/REVIEW-VIDEOS.md`)

````markdown
# How to add a video review

The "Video reviews" slider on the homepage shows one card per video. Each card uses three files:

- the **video** (`.mp4`)
- the **thumbnail**: the still picture shown before the video plays (`.webp`)
- for real reviews, the **captions**: the spoken words as text (`.vtt`)

All three go in `public/videos/reviews/`. The list of videos is in `src/data/reviews.ts`.
You don't need to edit `Reviews.tsx`.

## Rules
- Show a real review only with the person's **permission**.
- Every real review needs **captions**, so people who can't hear can read it.
- While `isPlaceholder = true` in `reviews.ts`, the site shows "These are placeholders, not customers".
  When every clip is a real review, set it to `false`.
- **Use a new file name** for every new or changed file (`review-07`, `review-08`, …). Browsers keep old
  files for up to a day.
- Keep only the finished files in `public/videos/reviews/`. Everything in `public/` is published, so delete
  the original file after Step 1.

## Step 1: Prepare the video
The rules: portrait **9:16**, **720×1280**, MP4, about **3 MB or less** (the current ones are 0.2–2.7 MB).

Run this in the project folder (ffmpeg is already installed). Change `my-video.mp4` to your file:

```powershell
ffmpeg -i "my-video.mp4" -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,fps=30" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart "public/videos/reviews/review-07.mp4"
```

This makes the video 720×1280 (it cuts the edges if the video isn't portrait), small, and quick to start.
- Still too big? Change `-crf 26` to `-crf 28` and run it again.
- A video without sound works too.

## Step 2: Make the thumbnail
```powershell
ffmpeg -ss 1 -i "public/videos/reviews/review-07.mp4" -frames:v 1 -c:v libwebp -quality 75 "public/videos/reviews/review-07.webp"
```

`-ss 1` takes the picture at 1 second. For another moment, change the number (e.g. `-ss 4.5`), run it again and
open the `.webp` to check it.

## Step 3: Write the captions (real reviews)
In VS Code, create `public/videos/reviews/review-07.vtt`:

```
WEBVTT

00:00:00.000 --> 00:00:04.000
The first sentence the person says.

00:00:04.000 --> 00:00:08.500
The next sentence.
```

- The first line must be `WEBVTT`, followed by an empty line.
- Times are `hours:minutes:seconds.milliseconds`.
- Write exactly what the person says.

## Step 4: Add the video to the list
Open `src/data/reviews.ts`.

### A. A placeholder clip (as now)
Name the files `review-07.mp4` and `review-07.webp`, then add `7` to the numbers:

```ts
export const videos: ReviewVideo[] = [1, 2, 3, 4, 5, 6, 7].map((n) => {
```

Each number picks the files with that number. The order of the numbers is the order of the slides.

### B. Real reviews
Real reviews need a name and captions, so replace the whole `videos` block (from `export const videos` to its
closing `});`) with a list. Use one block per video:

```ts
export const videos: ReviewVideo[] = [
  {
    caption: "Customer name, Store name",
    src: "/videos/reviews/review-07.mp4",
    poster: "/videos/reviews/review-07.webp",
    captions: "/videos/reviews/review-07.vtt",
  },
];
```

| Field | What it is | Example |
|---|---|---|
| `caption` | The text under the video. Screen readers also read it on the buttons | `"Customer name, Store name"` |
| `src` | The video. It starts with `/videos/reviews/`, **without** `public` | `"/videos/reviews/review-07.mp4"` |
| `poster` | The thumbnail | `"/videos/reviews/review-07.webp"` |
| `captions` | The captions file (needed for real reviews) | `"/videos/reviews/review-07.vtt"` |

When the real reviews replace the placeholders, delete the placeholder files. Once no placeholders are left, set
`isPlaceholder = false`.

## Step 5: Check it
1. Run `npm run dev` and open http://localhost:3000/#reviews.
2. The new card shows the thumbnail. Press play: the video plays. The sound button turns the sound on and off.
   The captions show on the video.
3. A new dot appears under the slider.
4. Check phone, tablet and desktop widths: in Chrome, `F12` → `Ctrl+Shift+M`.
5. Stop the server (`Ctrl+C`) and run `npm run check`. It must pass before you commit.
6. Add one line about the new video to `docs/PROGRESS.md`.

## Change a video
Make new files with a **new number** (e.g. `review-09`). Update the number (A) or the paths (B), then delete the
old files.

## Remove a video
Remove its number (A) or its block (B), then delete its files. If the list becomes empty, the whole section hides.

## If something goes wrong
| What you see | Why | Fix |
|---|---|---|
| The card has no picture | The thumbnail path is wrong or the file is missing | Check the `.webp` name and that the path starts with `/videos/reviews/` |
| The video doesn't play | Wrong path, or the file isn't H.264 MP4 | Check `src`, or run Step 1 on the original again |
| The old video still shows | You reused a file name | Use a new number and update the list |
| The video looks cut or zoomed | It isn't portrait 9:16 | Step 1 crops it to fit. Record in portrait if you can |
| No captions show | The `.vtt` doesn't start with `WEBVTT`, or the path is wrong | Fix the first line, or the `captions` path |
| A red error, or `npm run check` fails | A missing comma, quote or bracket | Compare your block with the example |
````

## Verification
- `npm run check` passes (the only code change is a comment).
- Run the guide's Step 1 and Step 2 commands on `gemini_generated_video_d842fbe9.mp4`, writing the output to the
  scratchpad, not `public/`. Then `ffprobe` confirms 720×1280 H.264 MP4 and a 720×1280 WebP. This proves the commands work
  as written. Delete the test output afterwards.
- Read the `docs/REVIEW-VIDEOS.md` preview in VS Code: the tables and code blocks display correctly.
