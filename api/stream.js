export const config = {
  runtime: 'edge',
};

const UA = "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 Chrome/108 Safari/537.36";

function proxied(target) {
  return `/api/stream?u=${encodeURIComponent(target)}`;
}

function rewritePlaylist(body, baseUrl) {
  return body
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return line;
      if (trimmed.startsWith("#")) {
        return line.replace(/URI="([^"]+)"/g, (_m, uri) => {
          try {
            return `URI="${proxied(new URL(uri, baseUrl).toString())}"`;
          } catch {
            return `URI="${uri}"`;
          }
        });
      }
      try {
        return proxied(new URL(trimmed, baseUrl).toString());
      } catch {
        return line;
      }
    })
    .join("\n");
}

export default async function handler(request) {
  const url = new URL(request.url);
  const raw = url.searchParams.get("u");
  if (!raw) return new Response("Missing u", { status: 400 });

  let target;
  try {
    target = new URL(raw);
  } catch {
    return new Response("Bad URL", { status: 400 });
  }

  if (!/^https?:$/.test(target.protocol)) {
    return new Response("Forbidden Protocol", { status: 403 });
  }

  const range = request.headers.get("range");
  const upstream = await fetch(target.toString(), {
    headers: {
      "User-Agent": UA,
      ...(range ? { Range: range } : {}),
    },
    redirect: "follow",
  });

  const contentType = upstream.headers.get("content-type") ?? "";
  const isPlaylist =
    target.pathname.endsWith(".m3u8") ||
    contentType.includes("mpegurl") ||
    contentType.includes("x-mpegURL");

  if (isPlaylist) {
    const text = await upstream.text();
    if (!text.trimStart().startsWith("#EXTM3U")) {
      return new Response("Stream indisponível", {
        status: 502,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }
    const finalUrl = upstream.url || target.toString();
    return new Response(rewritePlaylist(text, finalUrl), {
      status: upstream.status,
      headers: {
        "Content-Type": "application/vnd.apple.mpegurl",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  const headers = new Headers();
  for (const key of [
    "content-type",
    "content-length",
    "content-range",
    "accept-ranges",
  ]) {
    const value = upstream.headers.get(key);
    if (value) headers.set(key, value);
  }
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Cache-Control", "no-store");

  return new Response(upstream.body, { status: upstream.status, headers });
}
