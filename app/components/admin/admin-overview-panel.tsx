"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL, getApiMessage, readApiBody } from "../../lib/api";
import { WalletIcon } from "../icons";
import { readAdminSession } from "./admin-session";

type AdminDonation = {
  _id?: string;
  id?: string;
  nomeCompleto?: string;
  nome?: string;
  doador?: string;
  doadorNome?: string;
  email?: string;
  doadorEmail?: string;
  valor?: number | string;
  criadoEm?: string;
  createdAt?: string;
};

type OverviewState =
  | { status: "loading"; donations: AdminDonation[]; message?: never }
  | { status: "success"; donations: AdminDonation[]; message?: never }
  | { status: "error"; donations: AdminDonation[]; message: string };

export function AdminOverviewPanel() {
  const router = useRouter();
  const [state, setState] = useState<OverviewState>({
    status: "loading",
    donations: [],
  });

  useEffect(() => {
    const adminSession = readAdminSession();

    if (!adminSession) {
      router.replace(`/`);
      return;
    }

    let isActive = true;
    const token = adminSession.token;

    async function loadDonations() {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/doacoes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await readApiBody(response);

        if (!response.ok) {
          throw new Error(
            getApiMessage(data, "Nao foi possivel carregar as doacoes."),
          );
        }

        if (!Array.isArray(data)) {
          throw new Error("A API retornou um formato inesperado.");
        }

        if (isActive) {
          setState({ status: "success", donations: data as AdminDonation[] });
        }
      } catch (error) {
        if (isActive) {
          setState({
            status: "error",
            donations: [],
            message:
              error instanceof Error
                ? error.message
                : "Nao foi possivel carregar as doacoes.",
          });
        }
      }
    }

    void loadDonations();

    return () => {
      isActive = false;
    };
  }, [router]);

  const totalRaised = useMemo(
    () =>
      state.donations.reduce(
        (total, donation) => total + normalizeValue(donation.valor),
        0,
      ),
    [state.donations],
  );

  return (
    <div>
      <div>
        <h1 className="font-heading text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
          Dashboard Administrativo
        </h1>
        <p className="mt-2 text-base font-semibold text-[#5b382b]">
          Bem-vindo de volta, aqui esta o resumo do impacto hoje.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-100 text-primary-dark">
            <WalletIcon className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-sm font-extrabold uppercase tracking-[0.12em] text-[#5b382b]">
            Total arrecadado
          </h2>
          <p className="mt-2 font-heading text-4xl font-extrabold tracking-normal text-slate-950">
            {formatCurrency(totalRaised)}
          </p>
        </article>
      </div>

      <section className="mt-10">
        <h2 className="font-heading text-2xl font-extrabold tracking-normal text-slate-950">
          Gestao de Doacoes
        </h2>
        <div className="mt-5 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
          <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1.2fr)_8rem_8rem] gap-4 bg-slate-100 px-5 py-4 text-xs font-extrabold uppercase tracking-[0.08em] text-[#5b382b] max-md:hidden">
            <span>Doador</span>
            <span>E-mail</span>
            <span>Valor</span>
            <span>Data</span>
          </div>

          {state.status === "loading" ? <AdminTableLoading /> : null}
          {state.status === "error" ? <AdminTableError message={state.message} /> : null}
          {state.status === "success" && state.donations.length === 0 ? (
            <AdminEmpty message="Nenhuma doacao registrada." />
          ) : null}
          {state.status === "success" && state.donations.length > 0 ? (
            <ul className="divide-y divide-slate-200">
              {state.donations.map((donation, index) => (
                <li
                  key={donation._id ?? donation.id ?? index}
                  className="grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.2fr)_8rem_8rem] md:items-center"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-extrabold text-primary-dark">
                      {getInitials(getDonorName(donation))}
                    </span>
                    <span className="truncate text-sm font-extrabold text-slate-950">
                      {getDonorName(donation)}
                    </span>
                  </div>
                  <span className="truncate text-sm font-semibold text-slate-600">
                    {donation.email ?? donation.doadorEmail ?? "E-mail nao informado"}
                  </span>
                  <span className="text-sm font-extrabold text-slate-950">
                    {formatCurrency(normalizeValue(donation.valor))}
                  </span>
                  <span className="text-sm font-semibold text-slate-600">
                    {formatDate(donation.criadoEm ?? donation.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="flex items-center justify-between bg-slate-100 px-5 py-4 text-sm font-bold text-slate-500">
            <span>Mostrando {state.donations.length} doacoes</span>
            <div className="flex gap-2">
              <button className="rounded-md border border-orange-200 px-3 py-2 text-xs font-extrabold text-[#5b382b] disabled:cursor-not-allowed disabled:opacity-50" disabled>
                Anterior
              </button>
              <button className="rounded-md border border-orange-200 px-3 py-2 text-xs font-extrabold text-[#5b382b] disabled:cursor-not-allowed disabled:opacity-50" disabled>
                Proximo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AdminTableLoading() {
  return (
    <div className="space-y-3 p-5">
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="h-14 animate-pulse rounded-md bg-slate-100" />
      ))}
    </div>
  );
}

function AdminTableError({ message }: { message: string }) {
  return <p className="m-5 rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{message}</p>;
}

function AdminEmpty({ message }: { message: string }) {
  return <p className="px-5 py-8 text-center text-sm font-bold text-slate-500">{message}</p>;
}

function getDonorName(donation: AdminDonation) {
  return (
    donation.doador ??
    donation.doadorNome ??
    donation.nomeCompleto ??
    donation.nome ??
    "Doador"
  );
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function normalizeValue(value: AdminDonation["valor"]) {
  const numericValue = typeof value === "string" ? Number(value) : value;

  if (!numericValue || !Number.isFinite(numericValue)) {
    return 0;
  }

  return numericValue;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(value?: string) {
  if (!value) {
    return "Data nao informada";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Data nao informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
