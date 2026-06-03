import type { Metadata } from "next";
import { DonorAreaShell } from "../../components/donor/donor-area-shell";
import { DonorProfileForm } from "../../components/donor/donor-profile-form";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Editar Perfil | GiveHope",
  description: "Atualize os dados cadastrais do seu perfil GiveHope.",
};

export default function DonorProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <DonorAreaShell activeItem="profile">
          <DonorProfileForm />
        </DonorAreaShell>
      </main>
      <SiteFooter />
    </div>
  );
}
