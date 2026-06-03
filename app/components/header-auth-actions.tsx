"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonLink } from "./button-link";
import { LogOutIcon } from "./icons";
import { Logout } from "./logout";

type StoredUser = {
  username?: string;
  role?: string;
};

export function HeaderAuthActions() {
  const [isReady, setIsReady] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [profileHref, setProfileHref] = useState("/doador/minhas-doacoes");

  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("givehope:token");
      const user = readStoredUser();

      setDisplayName(token ? getFirstName(user?.username) : null);
      setProfileHref(user?.role === "admin" ? "/admin/visao-geral" : "/doador/minhas-doacoes");
      setIsReady(true);
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    window.addEventListener("givehope:session", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("givehope:session", loadUser);
    };
  }, []);


  if (!isReady) {
    return <div aria-hidden className="hidden min-w-[5.5rem] md:block" />;
  }

  if (displayName) {
    return (
      <div className="hidden items-center gap-2 md:flex">
        <Link
          href={profileHref}
          className="max-w-44 truncate rounded-md px-2 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          title={profileHref.startsWith("/admin") ? "Abrir painel admin" : "Ver minhas doacoes"}
        >
          Bem-vindo, {displayName}
        </Link>
        <Logout
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Sair da conta"
          title="Sair da conta"
        >
          <LogOutIcon className="h-4 w-4" />
          <span>Sair</span>
        </Logout>
      </div>
    );
  }

  return (
    <ButtonLink href="/login" variant="ghost" className="hidden md:flex">
      Entrar
    </ButtonLink>
  );
}

function readStoredUser() {
  const rawUser = localStorage.getItem("givehope:user");

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as StoredUser;
  } catch {
    return null;
  }
}

function getFirstName(username?: string) {
  const name = username?.trim();

  if (!name) {
    return "usuario";
  }

  return name.split(/\s+/)[0];
}
