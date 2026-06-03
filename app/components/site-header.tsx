import Link from "next/link";
import { BrandLogo } from "./brand-logo";
import { ButtonLink } from "./button-link";
import { HeaderAuthActions } from "./header-auth-actions";

const navItems = [
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogo />

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-8 md:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-700 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <HeaderAuthActions />
          <ButtonLink href="/doacao" className="min-h-10 px-4 py-2">
            Doe<span className="hidden sm:inline">&nbsp;Agora</span>
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
