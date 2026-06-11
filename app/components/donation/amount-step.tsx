"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "../icons";
import {
  createDonationUrl,
  DEFAULT_DONATION_VALUE,
  formatCurrency,
  parseDonationValue,
} from "./donation-utils";
import { BackLink, DonationCard } from "./donation-layout";

const presetValues = [
  { value: 20, description: "Alimenta 1 pessoa" },
  { value: 50, description: "Alimenta uma familia" },
  { value: 100, description: "Apoio mensal completo" },
];

export function AmountStep() {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState(DEFAULT_DONATION_VALUE);
  const [customValue, setCustomValue] = useState("");

  const donationValue = useMemo(() => {
    if (customValue) {
      return parseDonationValue(customValue);
    }

    return selectedValue;
  }, [customValue, selectedValue]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(createDonationUrl("/doacao/confirmacao", donationValue));
  }

  return (
    <DonationCard>
      <form onSubmit={handleSubmit}>
        <div className="text-center">
          <h1 className="font-heading text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
            Qual valor voce deseja doar?
          </h1>
          <p className="mt-4 text-sm font-semibold leading-6 text-[#5b382b] sm:text-base">
            Sua contribuicao, de qualquer tamanho, faz a diferenca imediata.
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-3">
          {presetValues.map((option) => {
            const isSelected = !customValue && selectedValue === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setSelectedValue(option.value);
                  setCustomValue("");
                }}
                className={`min-h-24 rounded-md px-4 py-4 text-center transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isSelected
                    ? "bg-primary text-white shadow-xl shadow-primary/25 ring-2 ring-primary-dark"
                    : "bg-slate-100 text-slate-950 hover:bg-slate-200"
                }`}
              >
                <span className="block text-2xl font-extrabold">
                  {formatCurrency(option.value)}
                </span>
                <span
                  className={`mt-2 block text-xs font-bold ${
                    isSelected ? "text-white/85" : "text-[#5b382b]"
                  }`}
                >
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>

        <label className="mt-6 block">
          <span className="sr-only">Outro valor</span>
          <span className="flex min-h-14 items-center rounded-md bg-slate-100 px-5 text-lg font-extrabold text-slate-400 ring-1 ring-transparent focus-within:bg-white focus-within:ring-2 focus-within:ring-primary">
            R$
            <input
              type="number"
              min="1"
              step="0.01"
              inputMode="decimal"
              value={customValue}
              onChange={(event) => setCustomValue(event.target.value)}
              placeholder="Outro valor..."
              className="ml-2 w-full min-w-0 bg-transparent text-lg font-bold text-slate-950 outline-none placeholder:text-slate-400"
            />
          </span>
        </label>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <BackLink href="/">Voltar</BackLink>
          <button
            type="submit"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-primary-dark px-7 py-4 text-base font-extrabold text-white shadow-xl shadow-primary/25 transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Continuar
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </DonationCard>
  );
}
