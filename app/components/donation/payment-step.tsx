"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { CopyIcon } from "../icons";
import { DonationCard } from "./donation-layout";
import { formatCurrency, parseDonationValue } from "./donation-utils";

export function PaymentStep() {
  const searchParams = useSearchParams();
  const value = parseDonationValue(searchParams.get("valor"));
  const [copied, setCopied] = useState(false);
  const pixCode = useMemo(() => createFakePixCode(value), [value]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <DonationCard>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-normal text-slate-950">
            Finalizar Doacao
          </h1>

          <div className="mt-7 rounded-lg border border-orange-100 bg-slate-100 px-5 py-7 text-center">
            <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-md bg-white p-4 shadow-sm ring-1 ring-orange-100">
              <FakeQrCode />
            </div>
            <h2 className="mt-6 text-xl font-extrabold text-slate-950">
              Pagamento via PIX
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-6 text-[#5b382b]">
              Escaneie o codigo PIX ou copie a chave demonstrativa para concluir
              este fluxo educacional.
            </p>
          </div>
        </div>

        <div className="rounded-md bg-orange-50 px-5 py-4 text-center lg:mt-20">
          <span className="block text-sm font-extrabold text-[#5b382b]">Valor</span>
          <strong className="mt-1 block text-4xl font-extrabold text-primary">
            {formatCurrency(value)}
          </strong>
        </div>
      </div>

      <div className="mt-8">
        <label
          htmlFor="pix-code"
          className="text-sm font-extrabold text-[#5b382b]"
        >
          Codigo PIX Copia e Cola
        </label>
        <div className="mt-3 flex min-w-0 flex-col gap-3 rounded-md bg-slate-100 p-2 ring-1 ring-orange-100 sm:flex-row">
          <input
            id="pix-code"
            value={pixCode}
            readOnly
            className="min-h-12 min-w-0 flex-1 bg-transparent px-3 text-sm font-bold text-slate-600 outline-none"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-extrabold text-primary-dark shadow-sm transition-colors hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <CopyIcon className="h-4 w-4" />
            {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
        <p className="mt-3 text-center text-xs font-semibold text-slate-500">
          O codigo acima e ficticio e existe apenas para demonstracao do projeto.
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-7 py-3 text-sm font-extrabold text-white shadow-xl shadow-primary/25 transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Voltar para pagina inicial
        </Link>
      </div>
    </DonationCard>
  );
}

function createFakePixCode(value: number) {
  const cents = Math.round(value * 100);

  return `00020126580014BR.GOV.BCB.PIX0136GIVEHOPE-PIX-DEMO-EDUCACIONAL520400005303986540${cents}5802BR5908GIVEHOPE6009PORTALEGRE62070503***6304FAKE`;
}

function FakeQrCode() {
  const cells = Array.from({ length: 121 }, (_, index) => {
    const row = Math.floor(index / 11);
    const col = index % 11;
    const finder =
      (row < 4 && col < 4) ||
      (row < 4 && col > 6) ||
      (row > 6 && col < 4);
    const filled = finder || (row * 3 + col * 5 + row * col) % 4 === 0;

    return (
      <span
        key={index}
        className={filled ? "bg-slate-950" : "bg-white"}
        aria-hidden
      />
    );
  });

  return (
    <div
      aria-label="QR Code PIX demonstrativo"
      role="img"
      className="grid h-full w-full grid-cols-11 grid-rows-11 gap-1"
    >
      {cells}
    </div>
  );
}
