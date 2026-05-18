import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeftIcon } from "../icons";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-hidden bg-neutral">
      <div className="grid min-h-screen min-w-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
        <aside className="relative hidden min-h-screen overflow-hidden bg-slate-950 lg:block">
          <Image
            src="/images/auth-panel.jpg"
            alt=""
            fill
            priority
            sizes="45vw"
            className="object-cover object-left"
          />
          <p className="sr-only">
            GiveHope. Pequenos gestos, grandes transformações.
          </p>
        </aside>

        <section className="flex min-h-screen min-w-0 items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full min-w-0 max-w-[22rem] sm:max-w-xl">
            <Link
              href="/"
              className="mb-8 inline-flex font-heading text-2xl font-extrabold tracking-normal text-primary lg:hidden"
            >
              GiveHope
            </Link>

            {children}

            <Link
              href="/"
              className="mx-auto mt-8 flex w-fit items-center gap-2 text-base font-bold text-[#4a2a1e] transition-colors hover:text-primary"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Voltar para Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
