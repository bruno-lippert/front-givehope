import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "../brand-logo";
import { ArrowLeftIcon, CheckIcon } from "../icons";

type DonationLayoutProps = {
  children: ReactNode;
  currentStep: 1 | 2 | 3;
};

const steps = [
  { number: 1, label: "Valor" },
  { number: 2, label: "Identificacao" },
  { number: 3, label: "Pagamento" },
] as const;

export function DonationLayout({ children, currentStep }: DonationLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-7 sm:px-6 lg:px-8">
        <header className="flex justify-center">
          <BrandLogo />
        </header>

        <section className="flex flex-1 flex-col items-center justify-center py-9">
          <div className="w-full max-w-3xl">
            <DonationSteps currentStep={currentStep} />
            {children}
          </div>
        </section>

        <footer className="pb-2 text-center text-xs font-semibold text-slate-500">
          Copyright 2024 GiveHope. Todos os direitos reservados.
        </footer>
      </div>
    </main>
  );
}

export function DonationCard({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 overflow-hidden rounded-lg bg-white shadow-xl shadow-slate-300/60 ring-1 ring-slate-200">
      <div className="h-2 bg-gradient-to-r from-primary-dark to-primary" />
      <div className="px-5 py-9 sm:px-9 lg:px-12">{children}</div>
    </div>
  );
}

export function DonationCardSkeleton() {
  return (
    <DonationCard>
      <div className="mx-auto max-w-md animate-pulse space-y-5">
        <div className="mx-auto h-8 w-2/3 rounded bg-slate-100" />
        <div className="mx-auto h-4 w-5/6 rounded bg-slate-100" />
        <div className="h-14 rounded-md bg-slate-100" />
        <div className="h-14 rounded-md bg-slate-100" />
      </div>
    </DonationCard>
  );
}

export function BackLink({ href, children = "Voltar" }: { href: string; children?: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-10 items-center gap-2 rounded-md px-2 text-sm font-bold text-[#5b382b] transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <ArrowLeftIcon className="h-4 w-4" />
      {children}
    </Link>
  );
}

function DonationSteps({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  return (
    <ol className="grid grid-cols-3 items-start">
      {steps.map((step, index) => {
        const isComplete = step.number < currentStep;
        const isCurrent = step.number === currentStep;
        const isActive = isComplete || isCurrent;

        return (
          <li key={step.number} className="relative flex flex-col items-center">
            {index > 0 ? (
              <span
                className={`absolute right-1/2 top-4 h-1 w-full -translate-x-4 rounded-full ${
                  step.number <= currentStep ? "bg-primary-dark" : "bg-slate-200"
                }`}
              />
            ) : null}
            <span
              className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold shadow-sm ring-4 ring-slate-100 ${
                isActive ? "bg-primary-dark text-white" : "bg-white text-slate-500"
              }`}
            >
              {isComplete ? <CheckIcon className="h-4 w-4" /> : step.number}
            </span>
            <span
              className={`mt-3 text-center text-xs font-extrabold ${
                isActive ? "text-primary-dark" : "text-[#5b382b]"
              }`}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
