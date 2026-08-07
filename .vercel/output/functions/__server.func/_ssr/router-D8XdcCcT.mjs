import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, n as QueryClientProvider, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as createRootRouteWithContext, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as useRouter, z as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as __exportAll, o as getServerFnById, r as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-DBSzQuRl.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D8XdcCcT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CAxAL_lE.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getSession = createServerFn({ method: "GET" }).handler(createSsrRpc("914c8c60e2220477eed9cd6f711dbaaede2fd8009c3671eabc82f20577073a45"));
var loginFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("4b2db185cc0399aadf510337c42dd067a9ed83609a36e3f0d2fa8ff70569b6e8"));
var logoutFn = createServerFn({ method: "POST" }).handler(createSsrRpc("02954ca19c2b9d0df9ff0b7f53b478a4dd8b57ac1b13131bb0b979fefbeb451d"));
var getAccountInfo = createServerFn({ method: "GET" }).handler(createSsrRpc("71809cb64373e795ace7ea14d2b94a73011e0a944b54f32bf7911d7d7920be75"));
var getHome = createServerFn({ method: "GET" }).handler(createSsrRpc("71851484db01981753633808d647b39d6bd37a8b29dc690fa5765acda0b13103"));
var getLiveCategories = createServerFn({ method: "GET" }).handler(createSsrRpc("83907d4c3ae72ba7097a70a5afde72115d57861ed97c8cb2769b3f0b5456a5b5"));
var getLiveStreams = createServerFn({ method: "GET" }).inputValidator((d) => d).handler(createSsrRpc("df8423e255ad2454a21c41710e7e55ec4ed1ba1b5454c69f48797228ac9d257e"));
var getNowPlaying = createServerFn({ method: "GET" }).inputValidator((d) => d).handler(createSsrRpc("b88ea5fd08ebde001d443e52220378d563bf653e5d8ac75cd768dad8d0a50844"));
var getVodCategories = createServerFn({ method: "GET" }).handler(createSsrRpc("71d4a15dcfa6e955435ee81cda1188b764d41dcc9c5bbb09a3bf6e843e6231c3"));
var getVodStreams = createServerFn({ method: "GET" }).inputValidator((d) => d).handler(createSsrRpc("bdcc99ba303c1632be24fccf23159f858e00d3103591d3194310055af67655fa"));
var getSeriesCategories = createServerFn({ method: "GET" }).handler(createSsrRpc("6dc52dbd9015eec729484c7bffb8887f52089ef2148e56059816d56300317ef6"));
var getSeriesList = createServerFn({ method: "GET" }).inputValidator((d) => d).handler(createSsrRpc("0422d0ea8b8a00e4b332fb46c32678f778021c84c53c0d2426506cfdd120ddc6"));
var getMovieDetail = createServerFn({ method: "GET" }).inputValidator((d) => d).handler(createSsrRpc("d2767f090172f499df265cdd5c235e7cb7ac2cc5618948b76c87c7fadc241ceb"));
var getSeriesDetail = createServerFn({ method: "GET" }).inputValidator((d) => d).handler(createSsrRpc("79368ffdbf3baa8d0cbd8031f44d059def278fa4e4b62ba806ab4934deb3dfa7"));
createServerFn({ method: "GET" }).inputValidator((d) => d).handler(createSsrRpc("61fadd2fb7afd70d4d3e841225732442542f53eb84f39e48e6ff0a90454c4374"));
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "TVPaulForthe" },
			{
				name: "description",
				content: "Aplicativo IPTV Xtream Codes para Smart TVs LG."
			},
			{
				property: "og:title",
				content: "TVPaulForthe"
			},
			{
				property: "og:description",
				content: "Aplicativo IPTV Xtream Codes para Smart TVs LG."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			type: "image/png",
			href: "/favicon.png"
		}]
	}),
	beforeLoad: async ({ location }) => {
		if (location.pathname === "/login") return;
		try {
			if (!(await getSession()).isAuthenticated) throw redirect({
				to: "/login",
				search: { redirect: location.href }
			});
		} catch (e) {
			if (e instanceof Error && e.message.includes("redirect")) throw e;
			throw redirect({ to: "/login" });
		}
	},
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	const isPlayer = useRouter().state.location.pathname.startsWith("/player");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-screen flex flex-col relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}), !isPlayer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "w-full text-center py-4 bg-background/50 text-muted-foreground text-sm border-t border-border/50",
				children: "TVPaulForthe | By Paul Forthe - Pedro II - Pi."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-center",
			theme: "dark",
			richColors: true
		})]
	});
}
var $$splitComponentImporter$7 = () => import("./routes-D4tJRVxC.mjs");
var Route$8 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "LG IPTV Player — Canais, Filmes e Séries na sua Smart TV" },
		{
			name: "description",
			content: "Aplicativo IPTV para Smart TV LG com canais ao vivo, filmes, séries e navegação total pelo controle remoto."
		},
		{
			property: "og:title",
			content: "LG IPTV Player para Smart TV LG"
		},
		{
			property: "og:description",
			content: "Canais ao vivo, EPG, filmes e séries com player HLS otimizado para TV."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./filmes-41HGAfBt.mjs");
var Route$7 = createFileRoute("/filmes")({
	head: () => ({ meta: [
		{ title: "Filmes em Grade de Pôsteres — LG IPTV Player" },
		{
			name: "description",
			content: "Catálogo de filmes VOD em grade de pôsteres, com categorias e detalhes completos na Smart TV LG."
		},
		{
			property: "og:title",
			content: "Catálogo de Filmes VOD"
		},
		{
			property: "og:description",
			content: "Pôsteres, sinopse, elenco e nota antes de assistir."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./live-DbqbNoLn.mjs");
var Route$6 = createFileRoute("/live")({
	head: () => ({ meta: [
		{ title: "Canais Ao Vivo com EPG — LG IPTV Player" },
		{
			name: "description",
			content: "Navegue pelas categorias e assista canais ao vivo com guia de programação (EPG) direto na Smart TV LG."
		},
		{
			property: "og:title",
			content: "Canais Ao Vivo com EPG"
		},
		{
			property: "og:description",
			content: "Categorias, grade de canais e programação atual em tempo real."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./login-5O_e0aha.mjs");
var Route$5 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./player-CfDJc92L.mjs");
var Route$4 = createFileRoute("/player")({
	validateSearch: (search) => ({
		src: String(search["src"] ?? ""),
		title: String(search["title"] ?? "Reproduzindo"),
		live: search["live"] ? String(search["live"]) : void 0
	}),
	head: () => ({ meta: [
		{ title: "Player — LG IPTV Player" },
		{
			name: "description",
			content: "Player de vídeo HLS/TS/MP4 com controles por controle remoto e OSD automático."
		},
		{
			property: "og:title",
			content: "Player de vídeo para Smart TV LG"
		},
		{
			property: "og:description",
			content: "Reprodução de canais ao vivo, filmes e episódios com OSD que some em 5 segundos."
		},
		{
			property: "og:type",
			content: "video.other"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./series-aSftVqe_.mjs");
var Route$3 = createFileRoute("/series")({
	head: () => ({ meta: [
		{ title: "Séries com Temporadas e Episódios — LG IPTV Player" },
		{
			name: "description",
			content: "Explore séries por categoria, escolha temporada e episódio e assista direto na Smart TV LG."
		},
		{
			property: "og:title",
			content: "Catálogo de Séries"
		},
		{
			property: "og:description",
			content: "Temporadas, episódios e sinopses organizados para o controle remoto."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./filme._id-Dv4jNtxV.mjs");
var Route$2 = createFileRoute("/filme/$id")({
	head: () => ({ meta: [
		{ title: "Detalhes do Filme — LG IPTV Player" },
		{
			name: "description",
			content: "Sinopse, elenco, nota e reprodução em alta qualidade do filme escolhido."
		},
		{
			property: "og:title",
			content: "Detalhes do Filme"
		},
		{
			property: "og:description",
			content: "Veja sinopse, elenco e nota antes de dar play na sua Smart TV LG."
		},
		{
			property: "og:type",
			content: "video.movie"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./serie._id-DX2lKOui.mjs");
var Route$1 = createFileRoute("/serie/$id")({
	head: () => ({ meta: [
		{ title: "Detalhes da Série — LG IPTV Player" },
		{
			name: "description",
			content: "Sinopse, elenco, temporadas e episódios da série selecionada, prontos para assistir."
		},
		{
			property: "og:title",
			content: "Detalhes da Série"
		},
		{
			property: "og:description",
			content: "Escolha temporada e episódio com o controle remoto e dê play."
		},
		{
			property: "og:type",
			content: "video.tv_show"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var UA = "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 Chrome/108 Safari/537.36";
function proxied(target) {
	return `/api/public/stream?u=${encodeURIComponent(target)}`;
}
function rewritePlaylist(body, baseUrl) {
	return body.split("\n").map((line) => {
		const trimmed = line.trim();
		if (!trimmed) return line;
		if (trimmed.startsWith("#")) return line.replace(/URI="([^"]+)"/g, (_m, uri) => {
			try {
				return `URI="${proxied(new URL(uri, baseUrl).toString())}"`;
			} catch {
				return `URI="${uri}"`;
			}
		});
		try {
			return proxied(new URL(trimmed, baseUrl).toString());
		} catch {
			return line;
		}
	}).join("\n");
}
var Route = createFileRoute("/api/public/stream")({ server: { handlers: { GET: async ({ request }) => {
	const raw = new URL(request.url).searchParams.get("u");
	if (!raw) return new Response("Missing u", { status: 400 });
	let target;
	try {
		target = new URL(raw);
	} catch {
		return new Response("Bad URL", { status: 400 });
	}
	if (!/^https?:$/.test(target.protocol)) return new Response("Forbidden Protocol", { status: 403 });
	const range = request.headers.get("range");
	const upstream = await fetch(target.toString(), {
		headers: {
			"User-Agent": UA,
			...range ? { Range: range } : {}
		},
		redirect: "follow"
	});
	const contentType = upstream.headers.get("content-type") ?? "";
	if (target.pathname.endsWith(".m3u8") || contentType.includes("mpegurl") || contentType.includes("x-mpegURL")) {
		const text = await upstream.text();
		if (!text.trimStart().startsWith("#EXTM3U")) return new Response("Stream indisponível", {
			status: 502,
			headers: { "Access-Control-Allow-Origin": "*" }
		});
		const finalUrl = upstream.url || target.toString();
		return new Response(rewritePlaylist(text, finalUrl), {
			status: upstream.status,
			headers: {
				"Content-Type": "application/vnd.apple.mpegurl",
				"Cache-Control": "no-store",
				"Access-Control-Allow-Origin": "*"
			}
		});
	}
	const headers = new Headers();
	for (const key of [
		"content-type",
		"content-length",
		"content-range",
		"accept-ranges"
	]) {
		const value = upstream.headers.get(key);
		if (value) headers.set(key, value);
	}
	headers.set("Access-Control-Allow-Origin", "*");
	headers.set("Cache-Control", "no-store");
	return new Response(upstream.body, {
		status: upstream.status,
		headers
	});
} } } });
var rootRouteChildren = {
	IndexRoute: Route$8.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$9
	}),
	FilmesRoute: Route$7.update({
		id: "/filmes",
		path: "/filmes",
		getParentRoute: () => Route$9
	}),
	LiveRoute: Route$6.update({
		id: "/live",
		path: "/live",
		getParentRoute: () => Route$9
	}),
	LoginRoute: Route$5.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$9
	}),
	PlayerRoute: Route$4.update({
		id: "/player",
		path: "/player",
		getParentRoute: () => Route$9
	}),
	SeriesRoute: Route$3.update({
		id: "/series",
		path: "/series",
		getParentRoute: () => Route$9
	}),
	FilmeIdRoute: Route$2.update({
		id: "/filme/$id",
		path: "/filme/$id",
		getParentRoute: () => Route$9
	}),
	SerieIdRoute: Route$1.update({
		id: "/serie/$id",
		path: "/serie/$id",
		getParentRoute: () => Route$9
	}),
	ApiPublicStreamRoute: Route.update({
		id: "/api/public/stream",
		path: "/api/public/stream",
		getParentRoute: () => Route$9
	})
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { loginFn as _, Route$5 as a, getLiveCategories as c, getNowPlaying as d, getSeriesCategories as f, getVodStreams as g, getVodCategories as h, Route$4 as i, getLiveStreams as l, getSeriesList as m, Route$1 as n, getAccountInfo as o, getSeriesDetail as p, Route$2 as r, getHome as s, router_exports as t, getMovieDetail as u, logoutFn as v };
