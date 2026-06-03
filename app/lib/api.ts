export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function readApiBody(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export function getApiMessage(data: unknown, fallback: string) {
  if (typeof data === "string") {
    return cleanMessage(data) || fallback;
  }

  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    const message = record.message ?? record.msg ?? record.error;

    if (typeof message === "string") {
      return cleanMessage(message) || fallback;
    }
  }

  return fallback;
}

function cleanMessage(message: string) {
  return message.replace(/^msg:\s*/i, "").trim();
}
