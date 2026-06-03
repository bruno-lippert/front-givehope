"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { API_BASE_URL, getApiMessage, readApiBody } from "../../lib/api";
import { SearchIcon, TrashIcon } from "../icons";
import { readAdminSession } from "./admin-session";

type PortalUser = {
  _id?: string;
  id?: string;
  nomeCompleto?: string;
  nome?: string;
  email?: string;
  celular?: string;
  tipo?: string;
  ativo?: boolean;
};

type UsersState =
  | { status: "loading"; users: PortalUser[]; message?: never }
  | { status: "success"; users: PortalUser[]; message?: string }
  | { status: "error"; users: PortalUser[]; message: string };

export function AdminUsersPanel() {
  const router = useRouter();
  const [state, setState] = useState<UsersState>({
    status: "loading",
    users: [],
  });
  const [query, setQuery] = useState("");

  useEffect(() => {
    const session = readAdminSession();

    if (!session) {
      router.replace(`/`);
      return;
    }

    let isActive = true;
    const token = session.token;

    async function loadUsers() {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/usuarios`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await readApiBody(response);

        if (!response.ok) {
          throw new Error(
            getApiMessage(data, "Nao foi possivel carregar os usuarios."),
          );
        }

        if (!Array.isArray(data)) {
          throw new Error("A API retornou um formato inesperado.");
        }

        if (isActive) {
          setState({ status: "success", users: data as PortalUser[] });
        }
      } catch (error) {
        if (isActive) {
          setState({
            status: "error",
            users: [],
            message:
              error instanceof Error
                ? error.message
                : "Nao foi possivel carregar os usuarios.",
          });
        }
      }
    }

    void loadUsers();

    return () => {
      isActive = false;
    };
  }, [router]);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return state.users;
    }

    return state.users.filter((user) => {
      const name = getUserName(user).toLowerCase();
      const email = (user.email ?? "").toLowerCase();

      return name.includes(normalizedQuery) || email.includes(normalizedQuery);
    });
  }, [query, state.users]);

  async function handleDeactivateUser(user: PortalUser) {
    const session = readAdminSession();
    const userId = user._id ?? user.id;

    if (!session || !userId) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/usuarios/${encodeURIComponent(userId)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        },
      );
      const data = await readApiBody(response);

      if (!response.ok) {
        throw new Error(
          getApiMessage(data, "Nao foi possivel inativar o usuario."),
        );
      }

      setState((currentState) => ({
        status: "success",
        users: currentState.users.map((currentUser) =>
          (currentUser._id ?? currentUser.id) === userId
            ? { ...currentUser, ativo: false }
            : currentUser,
        ),
        message: "Usuario inativado com sucesso.",
      }));
    } catch (error) {
      setState((currentState) => ({
        status: "error",
        users: currentState.users,
        message:
          error instanceof Error
            ? error.message
            : "Nao foi possivel inativar o usuario.",
      }));
    }
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-extrabold tracking-normal text-slate-950 sm:text-4xl">
        Dashboard Administrativo
      </h1>

      <section className="mt-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="font-heading text-2xl font-extrabold tracking-normal text-slate-950">
            Usuarios Cadastrados
          </h2>
          <form onSubmit={handleSearch} className="flex min-w-0 gap-2">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nome ou e-mail..."
              className="min-h-11 w-full min-w-0 rounded-md border-0 bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:ring-2 focus:ring-primary md:w-80"
            />
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <SearchIcon className="h-4 w-4" />
              Pesquisar
            </button>
          </form>
        </div>

        <div className="mt-5 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
          <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1.2fr)_10rem_5rem] gap-4 bg-slate-100 px-5 py-4 text-xs font-extrabold uppercase tracking-[0.08em] text-[#5b382b] max-md:hidden">
            <span>Nome</span>
            <span>E-mail</span>
            <span>Contato</span>
            <span>Acao</span>
          </div>

          {state.status === "loading" ? <UsersLoading /> : null}
          {state.status === "error" ? (
            <p className="m-5 rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {state.message}
            </p>
          ) : null}
          {state.status === "success" && state.message ? (
            <p className="m-5 rounded-md bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
              {state.message}
            </p>
          ) : null}
          {state.status !== "loading" && filteredUsers.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm font-bold text-slate-500">
              Nenhum usuario encontrado.
            </p>
          ) : null}
          {state.status !== "loading" && filteredUsers.length > 0 ? (
            <ul className="divide-y divide-slate-200">
              {filteredUsers.map((user, index) => {
                const userId = user._id ?? user.id;
                const isInactive = user.ativo === false;

                return (
                  <li
                    key={userId ?? index}
                    className={`grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.2fr)_10rem_5rem] md:items-center ${
                      isInactive ? "opacity-55" : ""
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-extrabold text-primary-dark">
                        {getInitials(getUserName(user))}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-slate-950">
                          {getUserName(user)}
                        </p>
                        {isInactive ? (
                          <p className="text-xs font-bold text-slate-500">Inativo</p>
                        ) : null}
                      </div>
                    </div>
                    <span className="truncate text-sm font-semibold text-slate-600">
                      {user.email ?? "E-mail nao informado"}
                    </span>
                    <span className="text-sm font-semibold text-slate-600">
                      {user.celular ?? "Nao informado"}
                    </span>
                    <button
                      type="button"
                      onClick={() => void handleDeactivateUser(user)}
                      disabled={!userId || isInactive}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#5b382b] transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label={`Inativar ${getUserName(user)}`}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}

          <div className="flex items-center justify-between bg-slate-100 px-5 py-4 text-sm font-bold text-slate-500">
            <span>
              Mostrando {filteredUsers.length} de {state.users.length} usuarios
            </span>
            <div className="flex gap-2">
              <button className="rounded-md border border-orange-200 px-3 py-2 text-xs font-extrabold text-[#5b382b] disabled:cursor-not-allowed disabled:opacity-50" disabled>
                Anterior
              </button>
              <button className="rounded-md border border-orange-200 px-3 py-2 text-xs font-extrabold text-[#5b382b] disabled:cursor-not-allowed disabled:opacity-50" disabled>
                Proximo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function UsersLoading() {
  return (
    <div className="space-y-3 p-5">
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="h-14 animate-pulse rounded-md bg-slate-100" />
      ))}
    </div>
  );
}

function getUserName(user: PortalUser) {
  return user.nomeCompleto ?? user.nome ?? "Usuario";
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
