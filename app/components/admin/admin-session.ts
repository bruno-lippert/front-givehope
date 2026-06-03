export type AdminUser = {
  id?: string;
  username?: string;
  role?: string;
};

export type AdminSession = {
  token: string;
  user: AdminUser;
};

export function readAdminSession() {
  const token = localStorage.getItem("givehope:token");
  const rawUser = localStorage.getItem("givehope:user");

  if (!token || !rawUser) {
    return null;
  }

  try {
    const user = JSON.parse(rawUser) as AdminUser;

    if (user.role !== "admin") {
      return null;
    }

    return { token, user };
  } catch {
    return null;
  }
}
