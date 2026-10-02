// The Video reviews section's content.

/** One review clip. `captions` is a WebVTT file, required for real, spoken reviews (WCAG 1.2.2). */
export type ReviewVideo = { caption: string; src: string; poster: string; captions?: string };

export const eyebrow = "Video reviews";
export const title = "In their own words";

// PLACEHOLDER: stock clips, not customers. Replace with real, consented reviews (with captions)
// before deploy, then set isPlaceholder to false.
export const isPlaceholder = true;
export const notice = "These are placeholders, not customers. Real video reviews will replace them.";

/** The clips and their posters in public/videos/reviews/. */
export const videos: ReviewVideo[] = [1, 2, 3, 4, 5, 6].map((n) => {
  const file = `/videos/reviews/review-${String(n).padStart(2, "0")}`;
  return { caption: "Placeholder", src: `${file}.mp4`, poster: `${file}.webp` };
});

/** The carousel's name and per-slide label for screen readers (%s: the number and the total). */
export const carouselLabel = "Review videos";
export const slideLabel = "Video %s of %s";

/** The buttons' accessible names, each followed by ": " and the clip's caption. */
export const controlLabels = { play: "Play video", pause: "Pause video", mute: "Mute video" };
