# How to add a video review

The "Video reviews" slider on the homepage shows one card per video. Each card uses these files:

- the **video** (`.mp4`)
- the **thumbnail**: the picture shown before the video plays (`.webp`)
- for real reviews, the **captions**: the spoken words as text (`.vtt`)

All of them go in `public/videos/reviews/`.
The list of videos is `videos`, at the top of `src/components/sections/Reviews.tsx`.
You only change that list. You don't change the code below it.

## Rules
- Show a real review only with the person's **permission**.
- Every real review needs **captions**, so people who can't hear can read it.
- While `isPlaceholder = true` (top of `Reviews.tsx`), the site shows "These are placeholders, not customers".
  When every clip is a real review, set it to `false`.
- **Use a new file name** for every new or changed file (`review-08`, `review-09`, …). Browsers keep old
  files for up to a day.
- Keep only the finished files in `public/videos/reviews/`. Everything in `public/` goes online, so delete
  the original file after Step 1.

## Step 1: Prepare the video
The video should be portrait **9:16**, **720×1280**, MP4, and about **3 MB or less**.

Run this in the project folder (ffmpeg is already installed). Change `my-video.mp4` to your file:

```powershell
ffmpeg -i "my-video.mp4" -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart "public/videos/reviews/review-08.mp4"
```

This makes the video 720×1280 (it cuts the edges if the video isn't portrait), small, and quick to start.
- Still too big? Change `-crf 26` to `-crf 28` and run it again.
- A video without sound works too.

## Step 2: Make the thumbnail
```powershell
ffmpeg -ss 00:00:01 -i public/videos/reviews/review-08.mp4 -frames:v 1 -quality 75 public/videos/reviews/review-08.webp
```

`-ss 00:00:01` takes the picture at 1 second. For another moment, change the time (e.g. `00:00:04.5`),
run it again and open the `.webp` to check it. Pick a moment where the face is clear and the eyes are open.

## Step 3: Write the captions (real reviews)
In VS Code, create `public/videos/reviews/review-08.vtt`:

```
WEBVTT

00:00:00.000 --> 00:00:04.000
The first sentence the person says.

00:00:04.000 --> 00:00:08.500
The next sentence.
```

- The first line must be `WEBVTT`, then an empty line.
- Times are `hours:minutes:seconds.milliseconds`.
- Write exactly what the person says.

## Step 4: Add the video to the list
Open `src/components/sections/Reviews.tsx`. The list is near the top.

### A. A placeholder clip (as now)
Name the files `review-08.mp4` and `review-08.webp`, then add `8` to the numbers:

```ts
const videos: ReviewVideo[] = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
```

Each number picks the files with that number. The order of the numbers is the order of the slides.

### B. Real reviews
Real reviews need a name and captions. So replace the whole `videos` block (from `const videos` to its
closing `});`) with a list. Use one block per video:

```ts
const videos: ReviewVideo[] = [
  {
    caption: "Customer name, Store name",
    src: "/videos/reviews/review-08.mp4",
    poster: "/videos/reviews/review-08.webp",
    captions: "/videos/reviews/review-08.vtt",
  },
];
```

| Field | What it is | Example |
|---|---|---|
| `caption` | The clip's name. It isn't shown: screen readers read it on the play and mute buttons | `"Customer name, Store name"` |
| `src` | The video. It starts with `/videos/reviews/`, **without** `public` | `"/videos/reviews/review-08.mp4"` |
| `poster` | The thumbnail | `"/videos/reviews/review-08.webp"` |
| `captions` | The captions file (needed for real reviews) | `"/videos/reviews/review-08.vtt"` |

When the real reviews replace the placeholders, delete the placeholder files. When no placeholders are left,
set `isPlaceholder = false`.

## Step 5: Check it
1. Run `npm run dev` and open http://localhost:3000/#reviews.
2. The new card shows the thumbnail. Press play: the video plays. The sound button turns the sound on and off.
   For real reviews, the captions show on the video.
3. A new dot appears under the slider. With more than 7 videos, check at 320px wide that the dots don't
   touch the arrows on either side.
4. Check phone, tablet and desktop widths: in Chrome, press `F12`, then `Ctrl+Shift+M`.
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
| The card has no picture | The thumbnail path is wrong or the file is missing | Check the `.webp` name, and that the path starts with `/videos/reviews/` |
| The video doesn't play | Wrong path, or the file isn't an H.264 MP4 | Check `src`, or run Step 1 on the original again |
| The old video still shows | You reused a file name | Use a new number and update the list |
| The video looks cut or zoomed | It isn't portrait 9:16 | Step 1 crops it to fit. Record in portrait if you can |
| No captions show | The `.vtt` doesn't start with `WEBVTT`, or the path is wrong | Fix the first line, or the `captions` path |
| A red error, or `npm run check` fails | A missing comma, quote or bracket | Compare your block with the example above |
