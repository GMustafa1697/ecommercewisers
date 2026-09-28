type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Put on the h2 so the section can use aria-labelledby. */
  id?: string;
};

export function SectionHeading({ eyebrow, title, intro, id }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl font-semibold tracking-tight lg:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted lg:text-lg">{intro}</p>}
    </div>
  );
}
