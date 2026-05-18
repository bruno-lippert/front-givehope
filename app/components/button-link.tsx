import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "bg-primary text-white shadow-md shadow-primary/25 hover:bg-primary-dark focus-visible:outline-primary",
  secondary:
    "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/25 focus-visible:outline-white",
  ghost:
    "text-slate-700 hover:bg-slate-100 focus-visible:outline-primary",
};

export function ButtonLink({
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
