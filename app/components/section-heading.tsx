type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-primary">
        {eyebrow}
      </p>
      <h2 className="font-heading text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
