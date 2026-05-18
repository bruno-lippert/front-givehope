import type { Metadata } from "next";
import { AuthCard } from "../components/auth/auth-card";
import { AuthShell } from "../components/auth/auth-shell";
import { FormSelectField, FormTextField } from "../components/auth/form-field";
import { SubmitButton } from "../components/auth/submit-button";
import {
  IdCardIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "../components/icons";

export const metadata: Metadata = {
  title: "Criar Conta | GiveHope",
  description: "Crie sua conta GiveHope para doar e acompanhar seu impacto.",
};

const genderOptions = [
  { label: "Selecionar", value: "" },
  { label: "Feminino", value: "F" },
  { label: "Masculino", value: "M" },
];

export default function CadastroPage() {
  return (
    <AuthShell>
      <AuthCard activeMode="register">
        <form className="space-y-5">
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
            name="senhaHash"
            label="Senha"
            type="password"
            placeholder="••••••••"
            icon={<LockIcon className="h-5 w-5" />}
            autoComplete="new-password"
            required
          />

          <FormTextField
            id="confirmarSenha"
            name="confirmarSenha"
            label="Confirmar senha"
            type="password"
            placeholder="••••••••"
            icon={<LockIcon className="h-5 w-5" />}
            autoComplete="new-password"
            required
          />

          <SubmitButton>Criar Minha Conta</SubmitButton>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
