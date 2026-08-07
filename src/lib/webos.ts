/**
 * WebOS TV integration helpers.
 * Detects when the app is running inside the webOS wrapper and adapts behavior.
 */

export function isWebOS(): boolean {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent.toLowerCase();
  return (
    ua.includes("webos") ||
    ua.includes("web0s") ||
    ua.includes("netcast") ||
    !!(window as unknown as Record<string, unknown>)["webos"]
  );
}

export function isWebOSWrapper(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.self !== window.top && isWebOS();
  } catch {
    return false;
  }
}

export function listenWebOSBack(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const handler = (event: MessageEvent) => {
    if (event.data && (event.data as { type?: string }).type === "webos-back") {
      callback();
    }
  };

  window.addEventListener("message", handler);
  return () => window.removeEventListener("message", handler);
}
