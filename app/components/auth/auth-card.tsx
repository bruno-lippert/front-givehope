import Link from "next/link";

type AuthMode = "login" | "register";

type AuthCardProps = {
  activeMode: AuthMode;
  children: React.ReactNode;
};

const tabs = [
  { mode: "login", label: "Entrar", href: "/login" },
  { mode: "register", label: "Criar Conta", href: "/cadastro" },
] as const;

export function AuthCard({ activeMode, children }: AuthCardProps) {
  return (
    <div className="w-full min-w-0 rounded-lg bg-white p-5 shadow-2xl shadow-slate-300/70 ring-1 ring-slate-100 sm:p-10 lg:p-12">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
          Bem-vindo
        </h1>
        <p className="mt-3 text-base font-medium text-[#5b382b] sm:text-lg">
          Escolha como deseja continuar
        </p>
      </div>

      <div className="mt-8 grid min-w-0 rounded-lg bg-slate-100 p-1.5 sm:mt-9">
        <div className="grid min-w-0 grid-cols-2 gap-1">
          {tabs.map((tab) => {
            const isActive = tab.mode === activeMode;

            return (
              <Link
                key={tab.mode}
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={`min-w-0 rounded-md px-3 py-3 text-center text-sm font-extrabold transition-colors sm:px-4 sm:text-base ${
                  isActive
                    ? "bg-white text-primary shadow-sm"
                    : "text-[#4a2a1e] hover:bg-white/70"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-8 min-w-0 sm:mt-9">{children}</div>
    </div>
  );
}
