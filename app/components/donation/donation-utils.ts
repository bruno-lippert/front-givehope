export const DEFAULT_DONATION_VALUE = 50;

export type StoredDonationUser = {
  id?: string;
  username?: string;
  role?: string;
};

export function parseDonationValue(value: string | null) {
  if (!value) {
    return DEFAULT_DONATION_VALUE;
  }

  const normalized = value.replace(",", ".");
  const parsed = Number(normalized);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_DONATION_VALUE;
  }

  return Math.round(parsed * 100) / 100;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function getFirstName(name?: string) {
  const trimmedName = name?.trim();

  if (!trimmedName) {
    return "doador";
  }

  return trimmedName.split(/\s+/)[0];
}

export function readDonationUser() {
  const token = localStorage.getItem("givehope:token");
  const rawUser = localStorage.getItem("givehope:user");

  if (!token) {
    return null;
  }

  if (!rawUser) {
    return {};
  }

  try {
    return JSON.parse(rawUser) as StoredDonationUser;
  } catch {
    return {};
  }
}

export function createDonationUrl(path: string, value: number) {
  return `${path}?valor=${encodeURIComponent(String(value))}`;
}
