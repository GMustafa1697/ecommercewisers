import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eyebrow, isPlaceholder, notice, title, videos } from "@/data/reviews";

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
