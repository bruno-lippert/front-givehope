"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { API_BASE_URL, getApiMessage, readApiBody } from "../../lib/api";
import {
  IdCardIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "../icons";
import { FormSelectField, FormTextField } from "./form-field";
import { SubmitButton } from "./submit-button";

const genderOptions = [
  { label: "Selecionar", value: "" },
  { label: "Feminino", value: "F" },
  { label: "Masculino", value: "M" },
];

type Feedback = {
  type: "success" | "error";
  message: string;
};

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectTo = getSafeRedirect(searchParams.get("redirectTo"));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const now = new Date().toISOString();
    const cadastro = {
      nomeCompleto: String(formData.get("nomeCompleto") ?? ""),
      cpf: String(formData.get("cpf") ?? ""),
      sexo: String(formData.get("sexo") ?? ""),
      dataNascimento: String(formData.get("dataNascimento") ?? ""),
      celular: String(formData.get("celular") ?? ""),
      email: String(formData.get("email") ?? ""),
      password1: String(formData.get("password1") ?? ""),
      password2: String(formData.get("password2") ?? ""),
      tipo: "doador",
      ativo: true,
      criadoEm: now,
      atualizadoEm: now,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cadastro),
      });
      const data = await readApiBody(response);

      if (!response.ok) {
        throw new Error(
          getApiMessage(data, "Nao foi possivel criar sua conta."),
        );
      }

      setFeedback({
        type: "success",
        message: "Conta criada com sucesso. Entre com seu e-mail e senha.",
      });
      router.push(
        redirectTo
          ? `/login?redirectTo=${encodeURIComponent(redirectTo)}`
          : "/login",
      );
      router.refresh();
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Nao foi possivel conectar ao servidor.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <FormTextField
        id="nomeCompleto"
        name="nomeCompleto"
        label="Nome completo"
        placeholder="Seu nome completo"
        icon={<UserIcon className="h-5 w-5" />}
        autoComplete="name"
        required
      />

      <FormTextField
        id="cpf"
        name="cpf"
        label="CPF"
        placeholder="000.000.000-00"
        icon={<IdCardIcon className="h-5 w-5" />}
        inputMode="numeric"
        autoComplete="off"
        required
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormSelectField
          id="sexo"
          name="sexo"
          label="Sexo"
          options={genderOptions}
          required
        />
        <FormTextField
          id="dataNascimento"
          name="dataNascimento"
          label="Nascimento"
          type="date"
          autoComplete="bday"
          required
        />
      </div>

      <FormTextField
        id="celular"
        name="celular"
        label="Celular (com DDD)"
        type="tel"
        placeholder="(00) 00000-0000"
        icon={<PhoneIcon className="h-5 w-5" />}
        inputMode="tel"
        autoComplete="tel"
        required
      />

      <FormTextField
        id="email"
        name="email"
        label="E-mail"
        type="email"
        placeholder="email@exemplo.com"
        icon={<MailIcon className="h-5 w-5" />}
        inputMode="email"
        autoComplete="email"
        required
      />

      <FormTextField
        id="senha"
        name="password1"
        label="Senha"
        type="password"
        placeholder="........"
        icon={<LockIcon className="h-5 w-5" />}
        autoComplete="new-password"
        required
      />

      <FormTextField
        id="password2"
        name="password2"
        label="Confirmar senha"
        type="password"
        placeholder="........"
        icon={<LockIcon className="h-5 w-5" />}
        autoComplete="new-password"
        required
      />

      {feedback ? <AuthFeedback feedback={feedback} /> : null}

      <SubmitButton disabled={isSubmitting}>
        {isSubmitting ? "Criando..." : "Criar Minha Conta"}
      </SubmitButton>
    </form>
  );
}

function getSafeRedirect(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return null;
  }

  return value;
}

function AuthFeedback({ feedback }: { feedback: Feedback }) {
  return (
    <p
      role={feedback.type === "error" ? "alert" : "status"}
      className={`rounded-md px-4 py-3 text-sm font-bold ${
        feedback.type === "error"
          ? "bg-red-50 text-red-700"
          : "bg-emerald-50 text-emerald-700"
      }`}
    >
      {feedback.message}
    </p>
  );
}
