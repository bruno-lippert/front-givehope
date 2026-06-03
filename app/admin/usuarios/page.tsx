import type { Metadata } from "next";
import { AdminAreaShell } from "../../components/admin/admin-area-shell";
import { AdminUsersPanel } from "../../components/admin/admin-users-panel";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Gestao de Usuarios | Admin GiveHope",
  description: "Gerencie usuarios cadastrados na GiveHope.",
};

export default function AdminUsersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <AdminAreaShell activeItem="users">
          <AdminUsersPanel />
        </AdminAreaShell>
      </main>
      <SiteFooter />
    </div>
  );
}
