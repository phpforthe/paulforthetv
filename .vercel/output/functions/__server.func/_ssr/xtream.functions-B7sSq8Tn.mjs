import { a as getCookie, i as deleteCookie$1, n as __exportAll, r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-DBSzQuRl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/xtream.functions-B7sSq8Tn.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var COOKIE_NAME = "xtream_auth_session";
function getCredentials() {
	const sessionValue = getCookie(COOKIE_NAME);
	if (!sessionValue) return null;
	try {
		const decoded = Buffer.from(sessionValue, "base64").toString("utf-8");
		const parsed = JSON.parse(decoded);
		if (parsed.username && parsed.password) return {
			username: parsed.username,
			password: parsed.password
		};
	} catch {}
	return null;
}
function clearCredentials() {
	deleteCookie$1(COOKIE_NAME, { path: "/" });
}
var xtream_functions_exports = /* @__PURE__ */ __exportAll({
	getAccountInfo_createServerFn_handler: () => getAccountInfo_createServerFn_handler,
	getHome_createServerFn_handler: () => getHome_createServerFn_handler,
	getLiveCategories_createServerFn_handler: () => getLiveCategories_createServerFn_handler,
	getLiveStreamUrl_createServerFn_handler: () => getLiveStreamUrl_createServerFn_handler,
	getLiveStreams_createServerFn_handler: () => getLiveStreams_createServerFn_handler,
	getMovieDetail_createServerFn_handler: () => getMovieDetail_createServerFn_handler,
	getNowPlaying_createServerFn_handler: () => getNowPlaying_createServerFn_handler,
	getSeriesCategories_createServerFn_handler: () => getSeriesCategories_createServerFn_handler,
	getSeriesDetail_createServerFn_handler: () => getSeriesDetail_createServerFn_handler,
	getSeriesList_createServerFn_handler: () => getSeriesList_createServerFn_handler,
	getSession_createServerFn_handler: () => getSession_createServerFn_handler,
	getVodCategories_createServerFn_handler: () => getVodCategories_createServerFn_handler,
	getVodStreams_createServerFn_handler: () => getVodStreams_createServerFn_handler,
	loginFn_createServerFn_handler: () => loginFn_createServerFn_handler,
	logoutFn_createServerFn_handler: () => logoutFn_createServerFn_handler
});
var getSession_createServerFn_handler = createServerRpc({
	id: "914c8c60e2220477eed9cd6f711dbaaede2fd8009c3671eabc82f20577073a45",
	name: "getSession",
	filename: "src/lib/xtream.functions.ts"
}, (opts) => getSession.__executeServer(opts));
var getSession = createServerFn({ method: "GET" }).handler(getSession_createServerFn_handler, async () => {
	return { isAuthenticated: !!getCredentials() };
});
var loginFn_createServerFn_handler = createServerRpc({
	id: "4b2db185cc0399aadf510337c42dd067a9ed83609a36e3f0d2fa8ff70569b6e8",
	name: "loginFn",
	filename: "src/lib/xtream.functions.ts"
}, (opts) => loginFn.__executeServer(opts));
var loginFn = createServerFn({ method: "POST" }).validator((d) => d).handler(loginFn_createServerFn_handler, async ({ data }) => {
	try {
		const { XTREAM_HOST } = await import("./xtream.server-CB1gndmx.mjs");
		const url = new URL(`${XTREAM_HOST}/player_api.php`);
		url.searchParams.set("username", data.username);
		url.searchParams.set("password", data.password);
		const res = await fetch(url.toString(), { headers: {
			"User-Agent": "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 Chrome/108 Safari/537.36",
			Accept: "application/json"
		} });
		if (!res.ok) throw new Error("Falha na requisição");
		const text = await res.text();
		const parsed = JSON.parse(text);
		if (!parsed || !parsed.user_info || parsed.user_info.auth === 0) throw new Error("Credenciais inválidas");
		const payload = JSON.stringify({
			username: data.username,
			password: data.password
		});
		return {
			success: true,
			token: Buffer.from(payload, "utf-8").toString("base64")
		};
	} catch (err) {
		clearCredentials();
		return {
			success: false,
			error: "Usuário ou senha incorretos."
		};
	}
});
var logoutFn_createServerFn_handler = createServerRpc({
	id: "02954ca19c2b9d0df9ff0b7f53b478a4dd8b57ac1b13131bb0b979fefbeb451d",
	name: "logoutFn",
	filename: "src/lib/xtream.functions.ts"
}, (opts) => logoutFn.__executeServer(opts));
var logoutFn = createServerFn({ method: "POST" }).handler(logoutFn_createServerFn_handler, async () => {
	return { success: true };
});
var getAccountInfo_createServerFn_handler = createServerRpc({
	id: "71809cb64373e795ace7ea14d2b94a73011e0a944b54f32bf7911d7d7920be75",
	name: "getAccountInfo",
	filename: "src/lib/xtream.functions.ts"
}, (opts) => getAccountInfo.__executeServer(opts));
var getAccountInfo = createServerFn({ method: "GET" }).handler(getAccountInfo_createServerFn_handler, async () => {
	const { xtreamApi } = await import("./xtream.server-CB1gndmx.mjs");
	const data = await xtreamApi("");
	return {
		username: data.user_info?.username ?? "",
		status: data.user_info?.status ?? "",
		expDate: data.user_info?.exp_date ?? ""
	};
});
var getHome_createServerFn_handler = createServerRpc({
	id: "71851484db01981753633808d647b39d6bd37a8b29dc690fa5765acda0b13103",
	name: "getHome",
	filename: "src/lib/xtream.functions.ts"
}, (opts) => getHome.__executeServer(opts));
var getHome = createServerFn({ method: "GET" }).handler(getHome_createServerFn_handler, async () => {
	const { xtreamApi } = await import("./xtream.server-CB1gndmx.mjs");
	const [live, vodCats, seriesCats] = await Promise.all([
		xtreamApi("get_live_streams").catch(() => []),
		xtreamApi("get_vod_categories").catch(() => []),
		xtreamApi("get_series_categories").catch(() => [])
	]);
	const pickCats = (cats) => (cats ?? []).slice(0, 2);
	const [movieChunks, seriesChunks] = await Promise.all([Promise.all(pickCats(vodCats).map((c) => xtreamApi("get_vod_streams", { category_id: c.category_id }).catch(() => []))), Promise.all(pickCats(seriesCats).map((c) => xtreamApi("get_series", { category_id: c.category_id }).catch(() => [])))]);
	const movies = movieChunks.flat();
	const series = seriesChunks.flat();
	const byAdded = [...movies].sort((a, b) => Number(b.added ?? 0) - Number(a.added ?? 0));
	const byRating = [...series].sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0));
	return {
		live: (live ?? []).slice(0, 24),
		movies: byAdded.slice(0, 24),
		series: byRating.slice(0, 24),
		counts: {
			live: live?.length ?? 0,
			movies: movies.length,
			series: series.length
		}
	};
});
var getLiveCategories_createServerFn_handler = createServerRpc({
	id: "83907d4c3ae72ba7097a70a5afde72115d57861ed97c8cb2769b3f0b5456a5b5",
	name: "getLiveCategories",
	filename: "src/lib/xtream.functions.ts"
}, (opts) => getLiveCategories.__executeServer(opts));
var getLiveCategories = createServerFn({ method: "GET" }).handler(getLiveCategories_createServerFn_handler, async () => {
	const { xtreamApi } = await import("./xtream.server-CB1gndmx.mjs");
	return xtreamApi("get_live_categories").catch(() => []);
});
var getLiveStreams_createServerFn_handler = createServerRpc({
	id: "df8423e255ad2454a21c41710e7e55ec4ed1ba1b5454c69f48797228ac9d257e",
	name: "getLiveStreams",
	filename: "src/lib/xtream.functions.ts"
}, (opts) => getLiveStreams.__executeServer(opts));
var getLiveStreams = createServerFn({ method: "GET" }).inputValidator((d) => d).handler(getLiveStreams_createServerFn_handler, async ({ data }) => {
	const { xtreamApi } = await import("./xtream.server-CB1gndmx.mjs");
	return await xtreamApi("get_live_streams", data.categoryId ? { category_id: data.categoryId } : {}).catch(() => []) ?? [];
});
var getNowPlaying_createServerFn_handler = createServerRpc({
	id: "b88ea5fd08ebde001d443e52220378d563bf653e5d8ac75cd768dad8d0a50844",
	name: "getNowPlaying",
	filename: "src/lib/xtream.functions.ts"
}, (opts) => getNowPlaying.__executeServer(opts));
var getNowPlaying = createServerFn({ method: "GET" }).inputValidator((d) => d).handler(getNowPlaying_createServerFn_handler, async ({ data }) => {
	const { xtreamApi, decodeEpg } = await import("./xtream.server-CB1gndmx.mjs");
	return ((await xtreamApi("get_short_epg", {
		stream_id: data.streamId,
		limit: 2
	}).catch(() => ({}))).epg_listings ?? []).map((e) => ({
		title: decodeEpg(e.title),
		description: decodeEpg(e.description),
		start: e.start ?? "",
		end: e.end ?? ""
	}));
});
var getVodCategories_createServerFn_handler = createServerRpc({
	id: "71d4a15dcfa6e955435ee81cda1188b764d41dcc9c5bbb09a3bf6e843e6231c3",
	name: "getVodCategories",
	filename: "src/lib/xtream.functions.ts"
}, (opts) => getVodCategories.__executeServer(opts));
var getVodCategories = createServerFn({ method: "GET" }).handler(getVodCategories_createServerFn_handler, async () => {
	const { xtreamApi } = await import("./xtream.server-CB1gndmx.mjs");
	return xtreamApi("get_vod_categories").catch(() => []);
});
var getVodStreams_createServerFn_handler = createServerRpc({
	id: "bdcc99ba303c1632be24fccf23159f858e00d3103591d3194310055af67655fa",
	name: "getVodStreams",
	filename: "src/lib/xtream.functions.ts"
}, (opts) => getVodStreams.__executeServer(opts));
var getVodStreams = createServerFn({ method: "GET" }).inputValidator((d) => d).handler(getVodStreams_createServerFn_handler, async ({ data }) => {
	const { xtreamApi } = await import("./xtream.server-CB1gndmx.mjs");
	return await xtreamApi("get_vod_streams", data.categoryId ? { category_id: data.categoryId } : {}).catch(() => []) ?? [];
});
var getSeriesCategories_createServerFn_handler = createServerRpc({
	id: "6dc52dbd9015eec729484c7bffb8887f52089ef2148e56059816d56300317ef6",
	name: "getSeriesCategories",
	filename: "src/lib/xtream.functions.ts"
}, (opts) => getSeriesCategories.__executeServer(opts));
var getSeriesCategories = createServerFn({ method: "GET" }).handler(getSeriesCategories_createServerFn_handler, async () => {
	const { xtreamApi } = await import("./xtream.server-CB1gndmx.mjs");
	return xtreamApi("get_series_categories").catch(() => []);
});
var getSeriesList_createServerFn_handler = createServerRpc({
	id: "0422d0ea8b8a00e4b332fb46c32678f778021c84c53c0d2426506cfdd120ddc6",
	name: "getSeriesList",
	filename: "src/lib/xtream.functions.ts"
}, (opts) => getSeriesList.__executeServer(opts));
var getSeriesList = createServerFn({ method: "GET" }).inputValidator((d) => d).handler(getSeriesList_createServerFn_handler, async ({ data }) => {
	const { xtreamApi } = await import("./xtream.server-CB1gndmx.mjs");
	return await xtreamApi("get_series", data.categoryId ? { category_id: data.categoryId } : {}).catch(() => []) ?? [];
});
var getMovieDetail_createServerFn_handler = createServerRpc({
	id: "d2767f090172f499df265cdd5c235e7cb7ac2cc5618948b76c87c7fadc241ceb",
	name: "getMovieDetail",
	filename: "src/lib/xtream.functions.ts"
}, (opts) => getMovieDetail.__executeServer(opts));
var getMovieDetail = createServerFn({ method: "GET" }).inputValidator((d) => d).handler(getMovieDetail_createServerFn_handler, async ({ data }) => {
	const { xtreamApi, buildStreamUrl } = await import("./xtream.server-CB1gndmx.mjs");
	const res = await xtreamApi("get_vod_info", { vod_id: data.vodId });
	const info = res.info ?? {};
	const md = res.movie_data ?? {};
	const ext = md["container_extension"] || "mp4";
	return {
		id: data.vodId,
		name: md["name"] || info["name"] || "",
		plot: info["plot"] || info["description"] || "",
		cast: info["cast"] || info["actors"] || "",
		director: info["director"] || "",
		genre: info["genre"] || "",
		releaseDate: info["releasedate"] || info["release_date"] || "",
		duration: info["duration"] || "",
		rating: info["rating"] || "",
		cover: info["movie_image"] || info["cover_big"] || "",
		backdrop: Array.isArray(info["backdrop_path"]) ? String(info["backdrop_path"][0] ?? "") : "",
		url: buildStreamUrl("movie", data.vodId, ext)
	};
});
var getSeriesDetail_createServerFn_handler = createServerRpc({
	id: "79368ffdbf3baa8d0cbd8031f44d059def278fa4e4b62ba806ab4934deb3dfa7",
	name: "getSeriesDetail",
	filename: "src/lib/xtream.functions.ts"
}, (opts) => getSeriesDetail.__executeServer(opts));
var getSeriesDetail = createServerFn({ method: "GET" }).inputValidator((d) => d).handler(getSeriesDetail_createServerFn_handler, async ({ data }) => {
	const { xtreamApi, buildStreamUrl } = await import("./xtream.server-CB1gndmx.mjs");
	const res = await xtreamApi("get_series_info", { series_id: data.seriesId });
	const info = res.info ?? {};
	const seasons = Object.entries(res.episodes ?? {}).map(([season, eps]) => ({
		season,
		episodes: (eps ?? []).map((e) => ({
			id: String(e.id),
			num: e.episode_num,
			title: e.title,
			plot: e.info?.plot ?? "",
			image: e.info?.movie_image ?? "",
			duration: e.info?.duration ?? "",
			url: buildStreamUrl("series", e.id, e.container_extension || "mp4")
		}))
	})).sort((a, b) => Number(a.season) - Number(b.season));
	return {
		id: data.seriesId,
		name: info["name"] || "",
		plot: info["plot"] || "",
		cast: info["cast"] || "",
		director: info["director"] || "",
		genre: info["genre"] || "",
		rating: info["rating"] || "",
		cover: info["cover"] || "",
		backdrop: Array.isArray(info["backdrop_path"]) ? String(info["backdrop_path"][0] ?? "") : "",
		seasons
	};
});
var getLiveStreamUrl_createServerFn_handler = createServerRpc({
	id: "61fadd2fb7afd70d4d3e841225732442542f53eb84f39e48e6ff0a90454c4374",
	name: "getLiveStreamUrl",
	filename: "src/lib/xtream.functions.ts"
}, (opts) => getLiveStreamUrl.__executeServer(opts));
var getLiveStreamUrl = createServerFn({ method: "GET" }).inputValidator((d) => d).handler(getLiveStreamUrl_createServerFn_handler, async ({ data }) => {
	const { buildStreamUrl } = await import("./xtream.server-CB1gndmx.mjs");
	return { url: buildStreamUrl("live", data.streamId, "m3u8") };
});
//#endregion
export { getCredentials as n, xtream_functions_exports as t };
