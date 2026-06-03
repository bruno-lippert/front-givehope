"use client";

import { useRouter } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";

type LogoutProps = ComponentPropsWithoutRef<"button">;

export function Logout({ className, children, ...props }: LogoutProps) {
  const router = useRouter();

  function handleLogout() {
    router.push("/login");
    localStorage.removeItem("givehope:token");
    localStorage.removeItem("givehope:user");
    
    // Dispara o evento de sessão para atualizar outros componentes clientes ativos
    window.dispatchEvent(new Event("givehope:session"));
    
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
