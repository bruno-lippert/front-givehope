import Link from "next/link";
import type { ReactNode } from "react";
import { HeartHandIcon, UserIcon } from "../icons";

type DonorAreaShellProps = {
  activeItem: "donations" | "profile";
  children: ReactNode;
};

const navItems = [
  {
    id: "donations",
    label: "Minhas Doacoes",
    href: "/doador/minhas-doacoes",
    icon: HeartHandIcon,
  },
  {
    id: "profile",
    label: "Perfil",
    href: "/doador/perfil",
    icon: UserIcon,
  },
] as const;

export function DonorAreaShell({ activeItem, children }: DonorAreaShellProps) {
  return (
    <section className="bg-neutral">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 bg-white px-4 py-4 lg:border-b-0 lg:border-r lg:px-5 lg:py-8">
          <nav aria-label="Area do doador">
            <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === activeItem;

                return (
                  <li key={item.id} className="shrink-0 lg:shrink">
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex min-h-11 items-center gap-3 rounded-md px-4 py-3 text-sm font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                        isActive
                          ? "bg-orange-50 text-primary"
                          : "text-slate-500 hover:bg-slate-100 hover:text-primary-dark"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0 px-4 py-9 sm:px-8 lg:px-10 lg:py-12">
          {children}
        </div>
      </div>
    </section>
  );
}
