"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { API_BASE_URL, getApiMessage, readApiBody } from "../../lib/api";
import { LockIcon, MailIcon } from "../icons";
import { FormTextField } from "./form-field";
import { SubmitButton } from "./submit-button";

type LoginResponse = {
  payload?: {
    id?: string;
    username?: string;
    role?: string;
  };
  token?: string;
};

type Feedback = {
  type: "success" | "error";
  message: string;
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectTo = getSafeRedirect(searchParams.get("redirectTo")) ?? "/";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const credentials = {
      email: String(formData.get("email") ?? ""),
      senhaHash: String(formData.get("senhaHash") ?? ""),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await readApiBody(response);

      if (!response.ok) {
        throw new Error(
          getApiMessage(data, "Nao foi possivel entrar com esses dados."),
        );
      }

      const loginData = data as LoginResponse;

      if (!loginData?.token) {
        throw new Error("Login realizado, mas a API nao retornou um token.");
      }

      localStorage.setItem("givehope:token", loginData.token);
      localStorage.setItem(
        "givehope:user",
        JSON.stringify(loginData.payload ?? null),
      );

      setFeedback({
        type: "success",
        message: "Login realizado com sucesso.",
      });

      router.push(redirectTo);
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
    <form className="space-y-6" onSubmit={handleSubmit}>
      <FormTextField
        id="email"
        name="email"
        label="E-mail"
        type="email"
        placeholder="email@exemplo.com"
        icon={<MailIcon className="h-5 w-5" />}
        autoComplete="email"
        inputMode="email"
        required
      />

      <FormTextField
        id="senha"
        name="senhaHash"
        label="Senha"
        type="password"
        placeholder="........"
        icon={<LockIcon className="h-5 w-5" />}
        autoComplete="current-password"
        labelAccessory={
          <Link
            href="#"
            className="text-sm font-extrabold text-primary transition-colors hover:text-primary-dark"
          >
            Esqueci minha senha
          </Link>
        }
        required
      />

      {feedback ? <AuthFeedback feedback={feedback} /> : null}

      <SubmitButton disabled={isSubmitting}>
        {isSubmitting ? "Entrando..." : "Entrar"}
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
