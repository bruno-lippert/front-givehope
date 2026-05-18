import Link from "next/link";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`font-heading text-2xl font-extrabold tracking-normal text-primary ${className}`}
    >
      GiveHope
    </Link>
  );
}
