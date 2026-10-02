import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Shown as the gold-tinted chip. */
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Put on the h2 so the section can use aria-labelledby. */
  id?: string;
};

export function SectionHeading({ eyebrow, title, intro, id }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {/* 30 / 36 / 48px; balanced, so no word sits alone on the last line. 48px only from xl: at lg
          the Services heading column is about 360px, where 48px breaks the title one word a line. */}
      <h2
        id={id}
        className={cn(eyebrow && "mt-4", "text-3xl font-semibold tracking-tight text-balance md:text-4xl xl:text-5xl")}
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-4 max-w-prose text-base leading-relaxed text-pretty text-muted lg:text-lg">{intro}</p>
      )}
    </div>
  );
}
