import Image from "next/image";
import { PauseIcon, PlayIcon, VolumeIcon, VolumeOffIcon } from "@/components/ui/icons";
import { controlLabels, type ReviewVideo } from "@/data/reviews";

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
export function ReviewCard({ video }: ReviewCardProps) {
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
          sizes="(min-width: 1440px) 326px, (min-width: 1024px) 23vw, (min-width: 640px) 50vw, 80vw"
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
