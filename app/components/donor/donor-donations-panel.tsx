"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL, getApiMessage, readApiBody } from "../../lib/api";
import { ArrowRightIcon, ChartUpIcon, HeartHandIcon } from "../icons";
import { readDonorSession } from "./donor-session";

type Donation = {
  _id?: string;
  id?: string;
  valor?: number | string;
  criadoEm?: string;
  createdAt?: string;
};

type DonationsState =
  | { status: "loading"; donations: Donation[]; message?: never }
  | { status: "success"; donations: Donation[]; message?: never }
  | { status: "error"; donations: Donation[]; message: string };

export function DonorDonationsPanel() {
  const router = useRouter();
  const [state, setState] = useState<DonationsState>({
    status: "loading",
    donations: [],
  });

  useEffect(() => {
    const session = readDonorSession();

    if (!session?.token || !session.user?.id) {
      router.replace(
        `/login?redirectTo=${encodeURIComponent("/doador/minhas-doacoes")}`,
      );
      return;
    }

    let isActive = true;
    const token = session.token;
    const userId = session.user.id;
    console.log(userId)

    async function loadDonations() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/doador/minhas-doacoes/${encodeURIComponent(
            userId,
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await readApiBody(response);

        if (!response.ok) {
          throw new Error(
            getApiMessage(data, "Nao foi possivel carregar suas doacoes."),
          );
        }

        if (!Array.isArray(data)) {
          throw new Error("A API retornou um formato inesperado.");
        }

        if (isActive) {
          setState({ status: "success", donations: data as Donation[] });
        }
      } catch (error) {
        if (isActive) {
          setState({
            status: "error",
            donations: [],
            message:
              error instanceof Error
                ? error.message
                : "Nao foi possivel carregar suas doacoes.",
          });
        }
      }
    }

    void loadDonations();

    return () => {
      isActive = false;
    };
  }, [router]);

  const totalDonated = useMemo(
    () =>
      state.donations.reduce(
        (total, donation) => total + normalizeDonationValue(donation.valor),
        0,
      ),
    [state.donations],
  );

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-4xl font-extrabold tracking-normal text-slate-950 sm:text-5xl">
            Minhas doacoes
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Acompanhe seu historico e veja o impacto acumulado das suas
            contribuicoes.
          </p>
        </div>

        <Link
          href="/doacao"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-extrabold text-white shadow-xl shadow-primary/25 transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Fazer nova doacao
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-9 grid gap-5 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <article className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-50 text-primary">
            <HeartHandIcon className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-sm font-extrabold uppercase tracking-[0.12em] text-[#5b382b]">
            Total doado
          </h2>
          <p className="mt-3 font-heading text-4xl font-extrabold tracking-normal text-slate-950">
            {formatCurrency(totalDonated)}
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Soma dos valores retornados pelo historico de doacoes do usuario
            logado.
          </p>
        </article>

        <article className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-teal-50 text-secondary">
              <ChartUpIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-extrabold tracking-normal text-slate-950">
                Historico de doacoes
              </h2>
              <p className="text-sm font-semibold text-slate-500">
                Data e valor das contribuicoes registradas.
              </p>
            </div>
          </div>

          <div className="mt-6">
            {state.status === "loading" ? <DonationsLoading /> : null}
            {state.status === "error" ? (
              <DonationsError message={state.message} />
            ) : null}
            {state.status === "success" && state.donations.length === 0 ? (
              <DonationsEmpty />
            ) : null}
            {state.status === "success" && state.donations.length > 0 ? (
              <DonationList donations={state.donations} />
            ) : null}
          </div>
        </article>
      </div>
    </div>
  );
}

function DonationList({ donations }: { donations: Donation[] }) {
  return (
    <ul className="divide-y divide-slate-200">
      {donations.map((donation, index) => (
        <li
          key={donation._id ?? donation.id ?? index}
          className="flex items-center justify-between gap-4 py-4"
        >
          <div>
            <p className="text-sm font-extrabold text-slate-950">
              Doacao #{index + 1}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {formatDonationDate(donation.criadoEm ?? donation.createdAt)}
            </p>
          </div>
          <strong className="text-lg font-extrabold text-primary-dark">
            {formatCurrency(normalizeDonationValue(donation.valor))}
          </strong>
        </li>
      ))}
    </ul>
  );
}

function DonationsLoading() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((item) => (
        <div key={item} className="h-16 animate-pulse rounded-md bg-slate-100" />
      ))}
    </div>
  );
}

function DonationsError({ message }: { message: string }) {
  return (
    <div className="rounded-md bg-red-50 px-4 py-4 text-sm font-bold text-red-700">
      {message}
    </div>
  );
}

function DonationsEmpty() {
  return (
    <div className="rounded-md bg-slate-100 px-5 py-6 text-center">
      <p className="text-sm font-bold text-slate-700">
        Voce ainda nao possui doacoes registradas.
      </p>
      <Link
        href="/doacao"
        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Fazer primeira doacao
      </Link>
    </div>
  );
}

function normalizeDonationValue(value: Donation["valor"]) {
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

function formatDonationDate(value?: string) {
  if (!value) {
    return "Data nao informada";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Data nao informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}
