import Link from "next/link";
import { BrandLogo } from "./brand-logo";
import { GlobeIcon, ShareIcon } from "./icons";

const footerLinks = [
  { label: "Privacidade", href: "#" },
  { label: "Termos", href: "#" },
  { label: "Contato", href: "#contato" },
  { label: "Relatórios", href: "#" },
];

export function SiteFooter() {
  return (
    <footer id="contato" className="border-t border-slate-200 bg-neutral">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-10 text-center sm:px-6 lg:px-8">
        <BrandLogo className="text-slate-950" />

        <nav aria-label="Links do rodapé" className="flex flex-wrap justify-center gap-5">
          {footerLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-500 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-slate-500">
          <Link href="#" aria-label="Compartilhar GiveHope" className="hover:text-primary">
            <ShareIcon className="h-5 w-5" />
          </Link>
          <Link href="#" aria-label="Site da GiveHope" className="hover:text-primary">
            <GlobeIcon className="h-5 w-5" />
          </Link>
        </div>

        <p className="text-xs text-slate-400">
          © 2024 GiveHope. Transformando vidas através da generosidade.
        </p>
      </div>
    </footer>
  );
}
