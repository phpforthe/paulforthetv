import { r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$2, u as getMovieDetail } from "./router-D8XdcCcT.mjs";
import { t as Focusable } from "./Focusable-BQyxN9vP.mjs";
import { r as Star, s as Play } from "../_libs/lucide-react.mjs";
import { i as useServerFn, n as Splash, r as TvShell, t as ErrorState } from "./Splash-Bmiyq0Fd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/filme._id-Dv4jNtxV.js
var import_jsx_runtime = require_jsx_runtime();
function MovieDetail() {
	const { id } = Route$2.useParams();
	const navigate = useNavigate();
	const detail = useServerFn(getMovieDetail);
	const { data, isLoading, error } = useQuery({
		queryKey: ["movie", id],
		queryFn: () => detail({ data: { vodId: Number(id) } }),
		staleTime: 6e5
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, { message: "Carregando detalhes do filme..." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TvShell, { children: error || !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: "Detalhes indisponíveis para este título." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative -mx-10 -mt-8 min-h-screen",
		children: [
			(data.backdrop || data.cover) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: data.backdrop || data.cover,
				alt: "",
				className: "absolute inset-0 h-[70vh] w-full object-cover opacity-35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				style: { background: "var(--gradient-hero)" },
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex gap-10 px-10 pt-16",
				children: [data.cover && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: data.cover,
					alt: data.name,
					className: "h-[24rem] w-64 shrink-0 rounded-2xl object-cover"
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
								data.releaseDate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.releaseDate }),
								data.duration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.duration }),
								data.genre && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.genre })
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
						}),
						data.director && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: "Direção: "
							}), data.director]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Focusable, {
								initialFocus: true,
								onClick: () => navigate({
									to: "/player",
									search: {
										src: data.url,
										title: data.name
									}
								}),
								className: "flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-6 w-6" }), " Assistir"]
							})
						})
					]
				})]
			})
		]
	}) });
}
//#endregion
export { MovieDetail as component };
