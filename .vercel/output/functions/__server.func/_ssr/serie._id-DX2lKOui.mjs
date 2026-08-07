import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route$1, p as getSeriesDetail } from "./router-D8XdcCcT.mjs";
import { n as cn, t as Focusable } from "./Focusable-BQyxN9vP.mjs";
import { r as Star, s as Play } from "../_libs/lucide-react.mjs";
import { i as useServerFn, n as Splash, r as TvShell, t as ErrorState } from "./Splash-Bmiyq0Fd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/serie._id-DX2lKOui.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SeriesDetail() {
	const { id } = Route$1.useParams();
	const navigate = useNavigate();
	const detail = useServerFn(getSeriesDetail);
	const [season, setSeason] = (0, import_react.useState)(null);
	const { data, isLoading, error } = useQuery({
		queryKey: ["series-detail", id],
		queryFn: () => detail({ data: { seriesId: Number(id) } }),
		staleTime: 6e5
	});
	(0, import_react.useEffect)(() => {
		if (data?.seasons?.[0] && !season) setSeason(data.seasons[0].season);
	}, [data, season]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, { message: "Carregando temporadas e episódios..." });
	const current = data?.seasons.find((s) => s.season === season) ?? data?.seasons[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TvShell, { children: error || !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: "Detalhes indisponíveis para esta série." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative -mx-10 -mt-8 min-h-screen",
		children: [
			(data.backdrop || data.cover) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: data.backdrop || data.cover,
				alt: "",
				className: "absolute inset-0 h-[60vh] w-full object-cover opacity-30"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				style: { background: "var(--gradient-hero)" },
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative px-10 pt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-10",
						children: [data.cover && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: data.cover,
							alt: data.name,
							className: "h-[20rem] w-52 shrink-0 rounded-2xl object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-4xl font-bold tracking-tight",
									children: data.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground",
									children: [
										data.rating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1 text-primary",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-current" }),
												" ",
												data.rating
											]
										}),
										data.genre && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.genre }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [data.seasons.length, " temporada(s)"] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 text-base leading-relaxed text-foreground/85",
									children: data.plot || "Sinopse não disponível."
								}),
								data.cast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: "Elenco: "
									}), data.cast]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 flex gap-3 overflow-x-auto pb-2",
						children: data.seasons.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Focusable, {
							initialFocus: i === 0,
							onClick: () => setSeason(s.season),
							className: cn("shrink-0 rounded-xl px-6 py-3 text-sm font-semibold", current?.season === s.season ? "bg-primary text-primary-foreground" : "bg-elevated text-muted-foreground"),
							children: ["Temporada ", s.season]
						}, s.season))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-2 gap-4 pb-16 2xl:grid-cols-3",
						children: (current?.episodes ?? []).map((ep) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Focusable, {
							onClick: () => navigate({
								to: "/player",
								search: {
									src: ep.url,
									title: `${data.name} — T${current?.season}E${ep.num} ${ep.title}`
								}
							}),
							className: "flex gap-4 rounded-xl bg-card p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-elevated",
								children: ep.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: ep.image,
									alt: "",
									loading: "lazy",
									className: "h-full w-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5 text-muted-foreground" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-sm font-semibold",
										children: [
											ep.num,
											". ",
											ep.title
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
										children: ep.plot || "Sem descrição."
									}),
									ep.duration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] text-muted-foreground",
										children: ep.duration
									})
								]
							})]
						}, ep.id))
					})
				]
			})
		]
	}) });
}
//#endregion
export { SeriesDetail as component };
