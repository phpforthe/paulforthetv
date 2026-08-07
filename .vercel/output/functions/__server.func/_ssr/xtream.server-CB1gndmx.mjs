import { n as getCredentials } from "./xtream.functions-B7sSq8Tn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/xtream.server-CB1gndmx.js
var XTREAM_HOST = "http://tvsrv.co";
var UA = "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 Chrome/108 Safari/537.36";
async function xtreamApi(action, params = {}) {
	const creds = getCredentials();
	if (!creds) throw new Error("Não autorizado. Faça o login.");
	const url = new URL(`${XTREAM_HOST}/player_api.php`);
	url.searchParams.set("username", creds.username);
	url.searchParams.set("password", creds.password);
	if (action) url.searchParams.set("action", action);
	for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
	const res = await fetch(url.toString(), { headers: {
		"User-Agent": UA,
		Accept: "application/json"
	} });
	if (!res.ok) throw new Error(`Xtream API ${res.status}`);
	const text = await res.text();
	try {
		return JSON.parse(text);
	} catch {
		throw new Error("Resposta invalida do servidor Xtream");
	}
}
function buildStreamUrl(kind, id, ext = "m3u8") {
	const creds = getCredentials();
	if (!creds) return "";
	return `${XTREAM_HOST}/${kind === "live" ? "live" : kind === "movie" ? "movie" : "series"}/${creds.username}/${creds.password}/${id}.${ext}`;
}
function decodeEpg(value) {
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
//#endregion
export { XTREAM_HOST, buildStreamUrl, decodeEpg, xtreamApi };
