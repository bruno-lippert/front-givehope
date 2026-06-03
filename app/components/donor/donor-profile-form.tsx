"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL, getApiMessage, readApiBody } from "../../lib/api";
import { readDonorSession, updateStoredDonorName } from "./donor-session";

type DonorProfileApi = {
  nomeCompleto?: string;
  cpf?: string;
  sexo?: string;
  dataNascimento?: string;
  celular?: string;
  email?: string;
  endereco?: {
    cep?: string;
    rua?: string;
    numero?: number | string;
    bairro?: string;
    cidade?: string;
    estado?: string;
  };
};

type ProfileForm = {
  nomeCompleto: string;
  cpf: string;
  sexo: string;
  dataNascimento: string;
  celular: string;
  email: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
};

type ProfileState =
  | { status: "loading"; message?: never }
  | { status: "ready"; message?: string }
  | { status: "saving"; message?: string }
  | { status: "error"; message: string };

const emptyForm: ProfileForm = {
  nomeCompleto: "",
  cpf: "",
  sexo: "",
  dataNascimento: "",
  celular: "",
  email: "",
  cep: "",
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
};

const genderOptions = [
  { label: "Selecionar", value: "" },
  { label: "Feminino", value: "F" },
  { label: "Masculino", value: "M" },
];

const brazilianStateOptions = [
  { label: "Selecionar", value: "" },
  { label: "AC", value: "AC" },
  { label: "AL", value: "AL" },
  { label: "AP", value: "AP" },
  { label: "AM", value: "AM" },
  { label: "BA", value: "BA" },
  { label: "CE", value: "CE" },
  { label: "DF", value: "DF" },
  { label: "ES", value: "ES" },
  { label: "GO", value: "GO" },
  { label: "MA", value: "MA" },
  { label: "MT", value: "MT" },
  { label: "MS", value: "MS" },
  { label: "MG", value: "MG" },
  { label: "PA", value: "PA" },
  { label: "PB", value: "PB" },
  { label: "PR", value: "PR" },
  { label: "PE", value: "PE" },
  { label: "PI", value: "PI" },
  { label: "RJ", value: "RJ" },
  { label: "RN", value: "RN" },
  { label: "RS", value: "RS" },
  { label: "RO", value: "RO" },
  { label: "RR", value: "RR" },
  { label: "SC", value: "SC" },
  { label: "SP", value: "SP" },
  { label: "SE", value: "SE" },
  { label: "TO", value: "TO" },
];

export function DonorProfileForm() {
  const router = useRouter();
  const [initialForm, setInitialForm] = useState<ProfileForm>(emptyForm);
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [state, setState] = useState<ProfileState>({ status: "loading" });
  const isDirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(initialForm),
    [form, initialForm],
  );

  useEffect(() => {
    const session = readDonorSession();

    if (!session?.token || !session.user?.id) {
      router.replace(`/login?redirectTo=${encodeURIComponent("/doador/perfil")}`);
      return;
    }

    let isActive = true;
    const token = session.token;
    const userId = session.user.id;

    async function loadProfile() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/doador/perfil/${encodeURIComponent(userId)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await readApiBody(response);

        if (!response.ok) {
          throw new Error(
            getApiMessage(data, "Nao foi possivel carregar seu perfil."),
          );
        }

        const profileForm = toProfileForm(data as DonorProfileApi);

        if (isActive) {
          setInitialForm(profileForm);
          setForm(profileForm);
          setState({ status: "ready" });
        }
      } catch (error) {
        if (isActive) {
          setState({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Nao foi possivel carregar seu perfil.",
          });
        }
      }
    }

    void loadProfile();

    return () => {
      isActive = false;
    };
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isDirty || state.status === "saving") {
      return;
    }

    const session = readDonorSession();

    if (!session?.token || !session.user?.id) {
      router.replace(`/login?redirectTo=${encodeURIComponent("/doador/perfil")}`);
      return;
    }

    setState({ status: "saving" });

    try {
      const response = await fetch(
        `${API_BASE_URL}/doador/perfil/${encodeURIComponent(session.user.id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
          body: JSON.stringify(toProfilePayload(form)),
        },
      );
      const data = await readApiBody(response);

      if (!response.ok) {
        throw new Error(
          getApiMessage(data, "Nao foi possivel salvar suas alteracoes."),
        );
      }

      setInitialForm(form);
      updateStoredDonorName(form.nomeCompleto);
      setState({
        status: "ready",
        message: "Alteracoes salvas com sucesso.",
      });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Nao foi possivel salvar suas alteracoes.",
      });
    }
  }

  function updateField(field: keyof ProfileForm, value: string) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setState((currentState) =>
      currentState.status === "error" ? { status: "ready" } : currentState,
    );
  }

  return (
    <div>
      <div>
        <h1 className="font-heading text-4xl font-extrabold tracking-normal text-slate-950 sm:text-5xl">
          Editar Meu Perfil
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Atualize seus dados pessoais para manter seu cadastro sempre correto.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-8"
      >
        {state.status === "loading" ? <ProfileLoading /> : null}

        {state.status !== "loading" ? (
          <div className="space-y-9">
            <ProfileSection number="1" title="Dados Pessoais">
              <div className="grid gap-5 md:grid-cols-2">
                <TextInput
                  label="Nome completo"
                  value={form.nomeCompleto}
                  onChange={(value) => updateField("nomeCompleto", value)}
                  className="md:col-span-2"
                  required
                />
                <TextInput
                  label="CPF"
                  value={form.cpf}
                  onChange={(value) => updateField("cpf", value)}
                />
                <SelectInput
                  label="Sexo"
                  value={form.sexo}
                  onChange={(value) => updateField("sexo", value)}
                  options={genderOptions}
                />
                <TextInput
                  label="Data de nascimento"
                  value={form.dataNascimento}
                  onChange={(value) => updateField("dataNascimento", value)}
                  type="date"
                />
                <TextInput
                  label="Celular"
                  value={form.celular}
                  onChange={(value) => updateField("celular", value)}
                  type="tel"
                />
                <TextInput
                  label="E-mail"
                  value={form.email}
                  onChange={(value) => updateField("email", value)}
                  type="email"
                  className="md:col-span-2"
                />
              </div>
            </ProfileSection>

            <ProfileSection number="2" title="Endereco">
              <div className="grid gap-5 md:grid-cols-6">
                <TextInput
                  label="CEP"
                  value={form.cep}
                  onChange={(value) => updateField("cep", value)}
                  className="md:col-span-2"
                />
                <TextInput
                  label="Rua"
                  value={form.rua}
                  onChange={(value) => updateField("rua", value)}
                  className="md:col-span-4"
                />
                <TextInput
                  label="Numero"
                  value={form.numero}
                  onChange={(value) => updateField("numero", value)}
                  className="md:col-span-2"
                  inputMode="numeric"
                />
                <TextInput
                  label="Bairro"
                  value={form.bairro}
                  onChange={(value) => updateField("bairro", value)}
                  className="md:col-span-2"
                />
                <TextInput
                  label="Cidade"
                  value={form.cidade}
                  onChange={(value) => updateField("cidade", value)}
                  className="md:col-span-2"
                />
                <SelectInput
                  label="Estado"
                  value={form.estado}
                  onChange={(value) => updateField("estado", value)}
                  className="md:col-span-2"
                  options={brazilianStateOptions}
                />
              </div>
            </ProfileSection>
          </div>
        ) : null}

        {state.status === "error" ? (
          <p className="mt-6 rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {state.message}
          </p>
        ) : null}

        {state.status === "ready" && state.message ? (
          <p className="mt-6 rounded-md bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
            {state.message}
          </p>
        ) : null}

        {state.status !== "loading" ? (
          <div className="mt-9 flex justify-end">
            <button
              type="submit"
              disabled={!isDirty || state.status === "saving"}
              className="inline-flex min-h-13 items-center justify-center rounded-md bg-primary-dark px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-primary/25 transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70"
            >
              {state.status === "saving" ? "Salvando..." : "Salvar Alteracoes"}
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}

function ProfileSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-sm font-extrabold text-secondary">
          {number}
        </span>
        <h2 className="font-heading text-xl font-extrabold tracking-normal text-slate-950">
          {title}
        </h2>
      </div>
      <div className="mt-5 rounded-lg bg-slate-100 p-5 sm:p-6">{children}</div>
    </section>
  );
}

function TextInput({
  label,
  value,
  onChange,
  className = "",
  type = "text",
  required = false,
  inputMode,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  type?: "text" | "date" | "email" | "tel";
  required?: boolean;
  inputMode?: "numeric";
  maxLength?: number;
}) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#5b382b]">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        required={required}
        inputMode={inputMode}
        maxLength={maxLength}
        className="mt-2 min-h-12 w-full min-w-0 rounded-md border-0 bg-white px-4 py-3 text-sm font-bold text-slate-950 outline-none ring-1 ring-transparent transition placeholder:text-slate-400 focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  className?: string;
}) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#5b382b]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-12 w-full min-w-0 rounded-md border-0 bg-white px-4 py-3 text-sm font-bold text-slate-950 outline-none ring-1 ring-transparent transition focus:ring-2 focus:ring-primary"
      >
        {options.map((option) => (
          <option key={option.value || "empty"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ProfileLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-52 animate-pulse rounded bg-slate-100" />
      <div className="h-44 animate-pulse rounded-lg bg-slate-100" />
      <div className="h-56 animate-pulse rounded-lg bg-slate-100" />
    </div>
  );
}

function toProfileForm(profile: DonorProfileApi): ProfileForm {
  return {
    nomeCompleto: profile.nomeCompleto ?? "",
    cpf: profile.cpf ?? "",
    sexo: profile.sexo ?? "",
    dataNascimento: formatDateForInput(profile.dataNascimento),
    celular: profile.celular ?? "",
    email: profile.email ?? "",
    cep: profile.endereco?.cep ?? "",
    rua: profile.endereco?.rua ?? "",
    numero:
      profile.endereco?.numero === undefined || profile.endereco.numero === null
        ? ""
        : String(profile.endereco.numero),
    bairro: profile.endereco?.bairro ?? "",
    cidade: profile.endereco?.cidade ?? "",
    estado: profile.endereco?.estado?.toUpperCase() ?? "",
  };
}

function toProfilePayload(profile: ProfileForm) {
  return {
    nomeCompleto: profile.nomeCompleto,
    cpf: profile.cpf,
    sexo: profile.sexo,
    dataNascimento: profile.dataNascimento,
    celular: profile.celular,
    email: profile.email,
    endereco: {
      cep: profile.cep,
      rua: profile.rua,
      numero: profile.numero ? Number(profile.numero) : undefined,
      bairro: profile.bairro,
      cidade: profile.cidade,
      estado: profile.estado.toUpperCase(),
    },
    atualizadoEm: new Date().toISOString(),
  };
}

function formatDateForInput(value?: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}
