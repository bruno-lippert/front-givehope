import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCard } from "../components/auth/auth-card";
import { AuthShell } from "../components/auth/auth-shell";
import { LoginForm } from "../components/auth/login-form";

export const metadata: Metadata = {
  title: "Entrar | GiveHope",
  description: "Acesse sua conta GiveHope para acompanhar suas doacoes.",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <AuthCard activeMode="login">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </AuthCard>
    </AuthShell>
  );
}
