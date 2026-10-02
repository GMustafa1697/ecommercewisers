"use client";

import type Splide from "@splidejs/splide";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { Carousel } from "@/components/ui/Carousel";
import { carouselLabel, controlLabels, type ReviewVideo, slideLabel } from "@/data/reviews";

type ReviewsCarouselProps = {
  videos: ReviewVideo[];
};

/**
 * Drives the review cards through the DOM, so Splide's loop clones work like the originals:
 * a delegated click for the play/mute buttons, and capture-phase media events for the state.
 */
function wireVideos(root: HTMLElement, splide: Splide) {
  const videosIn = () => root.querySelectorAll("video");

  // A video stops when its slide scrolls out of view.
  splide.on("hidden", (slide) => slide.slide.querySelector("video")?.pause());
  // Clones copy attributes, not the muted property, so set it on every video once they exist.
  videosIn().forEach((video) => {
    video.muted = true;
  });

  function onClick(event: MouseEvent) {
    const button = (event.target as Element).closest<HTMLButtonElement>("button[data-action]");
    const card = button?.closest<HTMLElement>("[data-review-card]");
    const video = card?.querySelector("video");
    if (!button || !card || !video) return;
    if (button.dataset.action === "play") {
      // play() rejects when a pause interrupts it while the video is still loading (AbortError) or
      // the browser blocks it. The card follows the media events, so there's nothing to undo.
      if (video.paused) video.play().catch(() => {});
      else video.pause();
    } else {
      const unmuted = !card.hasAttribute("data-unmuted");
      card.toggleAttribute("data-unmuted", unmuted);
      video.muted = !unmuted;
      button.setAttribute("aria-pressed", String(!unmuted));
    }
  }

  // play/pause/ended don't bubble, so listen in the capture phase.
  function onMedia(event: Event) {
    const video = event.target;
    if (!(video instanceof HTMLVideoElement)) return;
    const card = video.closest<HTMLElement>("[data-review-card]");
    if (!card) return;
    const playing = event.type === "play";
    if (playing) {
      card.setAttribute("data-started", "");
      // Only one video plays at a time: when one starts, pause the rest (clones included).
      videosIn().forEach((other) => {
        if (other !== video) other.pause();
      });
    }
    card.toggleAttribute("data-playing", playing);
    card
      .querySelector('button[data-action="play"]')
      ?.setAttribute("aria-label", `${playing ? controlLabels.pause : controlLabels.play}: ${card.dataset.caption}`);
  }

  const mediaEvents = ["play", "pause", "ended"];
  root.addEventListener("click", onClick);
  mediaEvents.forEach((type) => root.addEventListener(type, onMedia, true));
  return () => {
    root.removeEventListener("click", onClick);
    mediaEvents.forEach((type) => root.removeEventListener(type, onMedia, true));
  };
}

export function ReviewsCarousel({ videos }: ReviewsCarouselProps) {
  return (
    <Carousel label={carouselLabel} slideLabel={slideLabel} onMounted={wireVideos} className="mt-8">
      {videos.map((video) => (
        <ReviewCard key={video.src} video={video} />
      ))}
    </Carousel>
  );
}
