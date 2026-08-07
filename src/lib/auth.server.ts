import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";

const COOKIE_NAME = "xtream_auth_session";

export function getCredentials() {
  const sessionValue = getCookie(COOKIE_NAME);
  if (!sessionValue) return null;
  try {
    const decoded = Buffer.from(sessionValue, "base64").toString("utf-8");
    const parsed = JSON.parse(decoded);
    if (parsed.username && parsed.password) {
      return { username: parsed.username as string, password: parsed.password as string };
    }
  } catch {
    //
  }
  return null;
}

export function setCredentials(username: string, password: string) {
  const payload = JSON.stringify({ username, password });
  const encoded = Buffer.from(payload, "utf-8").toString("base64");
  
  // Set the cookie for 30 days
  const maxAge = 60 * 60 * 24 * 30;
  
  setCookie(COOKIE_NAME, encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export function clearCredentials() {
  deleteCookie(COOKIE_NAME, { path: "/" });
}
