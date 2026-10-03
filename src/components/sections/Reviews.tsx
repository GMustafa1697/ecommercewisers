"use client";

// No hooks here, but it must be a client file: ReviewsCarousel passes a function (wireVideos) to
// Carousel, which a Server Component can't do.

import type Splide from "@splidejs/splide";
import Image from "next/image";
import { Carousel } from "@/components/ui/Carousel";
import { PauseIcon, PlayIcon, VolumeIcon, VolumeOffIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  carouselLabel,
  controlLabels,
  eyebrow,
  isPlaceholder,
  notice,
  type ReviewVideo,
  slideLabel,
  title,
  videos,
} from "@/data/reviews";

type ReviewCardProps = {
  video: ReviewVideo;
};

const controlClass =
  "inline-flex size-11 items-center justify-center rounded-md bg-background/70 text-foreground transition-colors ease-out hover:bg-background";

/**
 * A portrait review video with play/pause and mute buttons. It holds no React state:
 * ReviewsCarousel drives it through the DOM (data-started, data-playing, data-unmuted),
 * so the copies Splide makes for looping work exactly like the originals. Sound starts muted.
 */
function ReviewCard({ video }: ReviewCardProps) {
  return (
    <div
      data-review-card=""
      data-caption={video.caption}
      className="group overflow-hidden rounded-lg border border-border bg-surface"
    >
      <div className="relative aspect-9/16">
        {/* Nothing downloads until play: preload="none", and the poster below is a lazy next/image. */}
        <video
          src={video.src}
          preload="none"
          playsInline
          muted
          className="absolute inset-0 size-full object-cover"
        >
          {video.captions && <track kind="captions" src={video.captions} srcLang="en" label="English" default />}
        </video>
        <Image
          src={video.poster}
          alt=""
          fill
          sizes="(min-width: 1440px) 326px, (min-width: 1024px) 23vw, (min-width: 640px) 50vw, 76vw"
          className="object-cover group-data-started:hidden"
        />
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          <button
            type="button"
            data-action="play"
            aria-label={`${controlLabels.play}: ${video.caption}`}
            className={controlClass}
          >
            <PlayIcon className="size-5 group-data-playing:hidden" />
            <PauseIcon className="hidden size-5 group-data-playing:block" />
          </button>
          <button
            type="button"
            data-action="mute"
            aria-pressed="true"
            aria-label={`${controlLabels.mute}: ${video.caption}`}
            className={controlClass}
          >
            <VolumeOffIcon className="size-5 group-data-unmuted:hidden" />
            <VolumeIcon className="hidden size-5 group-data-unmuted:block" />
          </button>
        </div>
      </div>
      <p className="p-4 font-semibold">{video.caption}</p>
    </div>
  );
}

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

function ReviewsCarousel({ videos }: ReviewsCarouselProps) {
  return (
    <Carousel label={carouselLabel} slideLabel={slideLabel} onMounted={wireVideos} className="mt-8">
      {videos.map((video) => (
        <ReviewCard key={video.src} video={video} />
      ))}
    </Carousel>
  );
}

/** The Video reviews heading, the placeholder notice and the carousel. Content: data/reviews.ts. */
export function Reviews() {
  if (videos.length === 0) return null;

  return (
    <Section id="reviews" dark>
      <SectionHeading id="reviews-title" eyebrow={eyebrow} title={title} />
      {/* PLACEHOLDER notice: shown until real, consented reviews replace the stock clips. */}
      {isPlaceholder && (
        <p className="mt-12 rounded-lg border border-border bg-surface p-4 text-sm text-muted lg:mt-16">{notice}</p>
      )}
      <ReviewsCarousel videos={videos} />
    </Section>
  );
}
