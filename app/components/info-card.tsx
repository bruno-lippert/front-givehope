import type { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  accentClassName: string;
};

export function InfoCard({
  title,
  description,
  icon,
  accentClassName,
}: InfoCardProps) {
  return (
    <article
      className={`rounded-lg border-l-4 bg-white p-7 shadow-sm ring-1 ring-slate-200/70 ${accentClassName}`}
    >
      <div className="mb-8">{icon}</div>
      <h3 className="mb-4 font-heading text-xl font-extrabold tracking-normal text-slate-950">
        {title}
      </h3>
      <p className="text-sm leading-7 text-slate-600">{description}</p>
    </article>
  );
}
