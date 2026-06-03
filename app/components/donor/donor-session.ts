export type StoredUser = {
  id?: string;
  username?: string;
  role?: string;
};

export type DonorSession = {
  token: string;
  user: StoredUser;
};

export function readDonorSession() {
  const token = localStorage.getItem("givehope:token");
  const rawUser = localStorage.getItem("givehope:user");

  if (!token || !rawUser) {
    return null;
  }

  try {
    return {
      token,
      user: JSON.parse(rawUser) as StoredUser,
    };
  } catch {
    return null;
  }
}

export function updateStoredDonorName(username: string) {
  const rawUser = localStorage.getItem("givehope:user");

  if (!rawUser) {
    return;
  }

  try {
    const user = JSON.parse(rawUser) as StoredUser;
    localStorage.setItem(
      "givehope:user",
      JSON.stringify({ ...user, username }),
    );
    window.dispatchEvent(new Event("givehope:session"));
  } catch {
    // Keep the current session untouched if the stored payload is malformed.
  }
}
