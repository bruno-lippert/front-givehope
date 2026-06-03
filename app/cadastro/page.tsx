import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCard } from "../components/auth/auth-card";
import { AuthShell } from "../components/auth/auth-shell";
import { RegisterForm } from "../components/auth/register-form";

export const metadata: Metadata = {
  title: "Criar Conta | GiveHope",
  description: "Crie sua conta GiveHope para doar e acompanhar seu impacto.",
};

export default function CadastroPage() {
  return (
    <AuthShell>
      <AuthCard activeMode="register">
        <Suspense fallback={null}>
          <RegisterForm />
        </Suspense>
      </AuthCard>
    </AuthShell>
  );
}
