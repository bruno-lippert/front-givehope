"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ArrowRightIcon } from "../icons";
import { BackLink, DonationCard } from "./donation-layout";
import {
  createDonationUrl,
  formatCurrency,
  parseDonationValue,
  readDonationUser,
} from "./donation-utils";

export function IdentificationStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const value = parseDonationValue(searchParams.get("valor"));
  const confirmationUrl = createDonationUrl("/doacao/confirmacao", value);
  const loginUrl = `/login?redirectTo=${encodeURIComponent(confirmationUrl)}`;
  const cadastroUrl = `/cadastro?redirectTo=${encodeURIComponent(confirmationUrl)}`;

  useEffect(() => {
    if (readDonationUser()) {
      router.replace(confirmationUrl);
    }
  }, [confirmationUrl, router]);

  return (
    <DonationCard>
      <div className="text-center">
        <h1 className="font-heading text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
          Como deseja continuar?
        </h1>
        <p className="mt-4 text-sm font-semibold leading-6 text-[#5b382b] sm:text-base">
          Escolha uma opcao para prosseguir com sua doacao de{" "}
          <strong>{formatCurrency(value)}</strong>.
        </p>
      </div>

      <div className="mx-auto mt-9 max-w-md">
        <Link
          href={loginUrl}
          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-md bg-primary-dark px-6 py-4 text-base font-extrabold text-white shadow-xl shadow-primary/25 transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Fazer Login
          <ArrowRightIcon className="h-5 w-5" />
        </Link>

        <p className="mt-6 text-center text-sm font-semibold text-[#5b382b]">
          Ainda nao tem conta?{" "}
          <Link
            href={cadastroUrl}
            className="font-extrabold text-primary-dark transition-colors hover:text-primary"
          >
            Criar uma conta
          </Link>
        </p>
      </div>

      <div className="mt-10 border-t border-slate-200 pt-7">
        <BackLink href={createDonationUrl("/doacao", value)}>Voltar</BackLink>
      </div>
    </DonationCard>
  );
}
