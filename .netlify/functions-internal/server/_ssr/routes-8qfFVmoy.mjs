import { r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getAccountInfo, s as getHome } from "./router-ULJc8M43.mjs";
import { t as Focusable } from "./Focusable-CfCfNRou.mjs";
import { p as Info, s as Play } from "../_libs/lucide-react.mjs";
import { i as useServerFn, n as Splash, r as TvShell, t as ErrorState } from "./Splash-BpM6ma3S.mjs";
import { n as PosterCard, t as CarouselRow } from "./PosterCard-DjBd_oe5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-8qfFVmoy.js
var import_jsx_runtime = require_jsx_runtime();
function HomePage() {
	const navigate = useNavigate();
	const home = useServerFn(getHome);
	const account = useServerFn(getAccountInfo);
	const { data, isLoading, error } = useQuery({
		queryKey: ["home"],
		queryFn: () => home(),
		staleTime: 3e5
	});
	const { data: acc } = useQuery({
		queryKey: ["account"],
		queryFn: () => account(),
		staleTime: 18e5
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, { message: "Autenticando e carregando seu conteúdo..." });
	const featured = data?.movies?.[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TvShell, { children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: error.message }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative -mx-10 -mt-8 mb-8 h-[22rem] overflow-hidden",
			children: [
				featured?.stream_icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: featured.stream_icon,
					alt: "",
					className: "absolute inset-0 h-full w-full object-cover opacity-40"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0",
					style: { background: "var(--gradient-hero)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex h-full flex-col justify-end px-10 pb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
							children: "Destaque de hoje"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 max-w-3xl text-4xl font-bold tracking-tight",
							children: featured?.name ?? "Sua TV, do seu jeito"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								data?.counts.live ?? 0,
								" canais · ",
								data?.counts.movies ?? 0,
								" filmes ·",
								" ",
								data?.counts.series ?? 0,
								" séries",
								acc?.username ? ` · conectado como ${acc.username}` : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Focusable, {
								initialFocus: true,
								onClick: () => featured && navigate({
									to: "/filme/$id",
									params: { id: String(featured.stream_id) }
								}),
								className: "flex items-center gap-2 rounded-xl bg-primary px-7 py-3 font-semibold text-primary-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5" }), " Assistir"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Focusable, {
								onClick: () => navigate({ to: "/live" }),
								className: "flex items-center gap-2 rounded-xl bg-elevated px-7 py-3 font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-5 w-5" }), " Ver canais ao vivo"]
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselRow, {
			title: "Canais Ao Vivo",
			children: (data?.live ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
				wide: true,
				badge: "Ao vivo",
				title: c.name,
				image: c.stream_icon,
				onSelect: () => navigate({
					to: "/player",
					search: {
						src: `http://tvsrv.co/live/terezinhaconceicao/153759/${c.stream_id}.m3u8`,
						title: c.name,
						live: "1"
					}
				})
			}, c.stream_id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselRow, {
			title: "Filmes Adicionados Recentemente",
			children: (data?.movies ?? []).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
				title: m.name,
				image: m.stream_icon,
				subtitle: m.rating ? `Nota ${m.rating}` : void 0,
				onSelect: () => navigate({
					to: "/filme/$id",
					params: { id: String(m.stream_id) }
				})
			}, m.stream_id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselRow, {
			title: "Séries em Alta",
			children: (data?.series ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
				title: s.name,
				image: s.cover,
				subtitle: s.rating ? `Nota ${s.rating}` : void 0,
				onSelect: () => navigate({
					to: "/serie/$id",
					params: { id: String(s.series_id) }
				})
			}, s.series_id))
		})
	] }) });
}
//#endregion
export { HomePage as component };
