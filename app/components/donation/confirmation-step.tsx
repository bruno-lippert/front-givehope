"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import { ArrowRightIcon, UserIcon } from "../icons";
import { BackLink, DonationCard } from "./donation-layout";
import {
  createDonationUrl,
  formatCurrency,
  getFirstName,
  parseDonationValue,
  type StoredDonationUser,
} from "./donation-utils";

export function ConfirmationStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const value = parseDonationValue(searchParams.get("valor"));
  const user = useDonationUser();

  useEffect(() => {
    if (!user) {
      router.replace(createDonationUrl("/doacao/identificacao", value));
    }
  }, [router, user, value]);

  const displayName = useMemo(() => user?.username ?? "Doador GiveHope", [user]);
  const firstName = getFirstName(displayName);

  return (
    <DonationCard>
      <div className="text-center">
        <h1 className="font-heading text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
          Ola, {firstName}!
        </h1>
        <p className="mt-4 text-sm font-semibold leading-6 text-[#5b382b] sm:text-base">
          Voce ja esta conectado. Confirme seus dados para prosseguir.
        </p>
      </div>

      <div className="mx-auto mt-8 flex max-w-sm flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-primary-dark ring-2 ring-orange-100">
          <UserIcon className="h-10 w-10" />
        </div>
        <h2 className="mt-5 text-lg font-extrabold text-slate-950">{displayName}</h2>
        <p className="mt-2 text-sm font-semibold text-slate-500">
          Doacao selecionada:{" "}
          <strong className="text-primary-dark">{formatCurrency(value)}</strong>
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-md">
        <button
          type="button"
          onClick={() => router.push(createDonationUrl("/doacao/pagamento", value))}
          className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 text-base font-extrabold text-white shadow-xl shadow-primary/25 transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Confirmar e Continuar
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-10 border-t border-slate-200 pt-7">
        <BackLink href={createDonationUrl("/doacao/identificacao", value)}>
          Voltar
        </BackLink>
      </div>
    </DonationCard>
  );
}

function useDonationUser() {
  const snapshot = useSyncExternalStore(
    subscribeToStorage,
    getDonationSessionSnapshot,
    () => "",
  );

  return useMemo(() => parseDonationSession(snapshot), [snapshot]);
}

function subscribeToStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);

  return () => window.removeEventListener("storage", onStoreChange);
}

function getDonationSessionSnapshot() {
  const token = localStorage.getItem("givehope:token");

  if (!token) {
    return "";
  }

  return localStorage.getItem("givehope:user") ?? "{}";
}

function parseDonationSession(snapshot: string) {
  if (!snapshot) {
    return null;
  }

  try {
    return JSON.parse(snapshot) as StoredDonationUser;
  } catch {
    return {};
  }
}

