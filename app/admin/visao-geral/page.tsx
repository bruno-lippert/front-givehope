import type { Metadata } from "next";
import { AdminAreaShell } from "../../components/admin/admin-area-shell";
import { AdminOverviewPanel } from "../../components/admin/admin-overview-panel";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Visao Geral | Admin GiveHope",
  description: "Painel administrativo com resumo das informacoes da GiveHope.",
};

export default function AdminOverviewPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <AdminAreaShell activeItem="overview">
          <AdminOverviewPanel />
        </AdminAreaShell>
      </main>
      <SiteFooter />
    </div>
  );
}
