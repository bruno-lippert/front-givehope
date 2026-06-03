import type { Metadata } from "next";
import { DonorAreaShell } from "../../components/donor/donor-area-shell";
import { DonorDonationsPanel } from "../../components/donor/donor-donations-panel";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Minhas Doacoes | GiveHope",
  description: "Historico de doacoes do usuario logado na GiveHope.",
};

export default function DonorDonationsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <DonorAreaShell activeItem="donations">
          <DonorDonationsPanel />
        </DonorAreaShell>
      </main>
      <SiteFooter />
    </div>
  );
}
