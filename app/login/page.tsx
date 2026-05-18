import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "../components/auth/auth-card";
import { AuthShell } from "../components/auth/auth-shell";
import { FormTextField } from "../components/auth/form-field";
import { SubmitButton } from "../components/auth/submit-button";
import { LockIcon, MailIcon } from "../components/icons";

export const metadata: Metadata = {
  title: "Entrar | GiveHope",
  description: "Acesse sua conta GiveHope para acompanhar suas doações.",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <AuthCard activeMode="login">
        <form className="space-y-6">
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
            placeholder="••••••••"
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

          <SubmitButton>Entrar</SubmitButton>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
