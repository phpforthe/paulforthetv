import { getCredentials } from "./auth.server";

// Xtream Codes engine (server-only). Credentials are now dynamic per request.
export const XTREAM_HOST = "http://tvsrv.co";

const UA = "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 Chrome/108 Safari/537.36";

export async function xtreamApi<T = unknown>(
  action: string,
  params: Record<string, string | number> = {},
): Promise<T> {
  const creds = getCredentials();
  if (!creds) {
    throw new Error("Não autorizado. Faça o login.");
  }

  const url = new URL(`${XTREAM_HOST}/player_api.php`);
  url.searchParams.set("username", creds.username);
  url.searchParams.set("password", creds.password);
  if (action) url.searchParams.set("action", action);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));

  const res = await fetch(url.toString(), {
    headers: { "User-Agent": UA, Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Xtream API ${res.status}`);
  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Resposta invalida do servidor Xtream");
  }
}

export function buildStreamUrl(
  kind: "live" | "movie" | "series",
  id: string | number,
  ext = "m3u8",
) {
  const creds = getCredentials();
  if (!creds) return "";
  
  const seg = kind === "live" ? "live" : kind === "movie" ? "movie" : "series";
  return `${XTREAM_HOST}/${seg}/${creds.username}/${creds.password}/${id}.${ext}`;
}

export function decodeEpg(value?: string | null) {
  if (!value) return "";
  try {
    return decodeURIComponent(escape(atob(value)));
  } catch {
    try {
      return atob(value);
    } catch {
      return value;
    }
  }
}
