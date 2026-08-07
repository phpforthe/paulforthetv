import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as getLiveCategories, d as getNowPlaying, l as getLiveStreams } from "./router-ULJc8M43.mjs";
import { n as cn, t as Focusable } from "./Focusable-CfCfNRou.mjs";
import { o as Radio } from "../_libs/lucide-react.mjs";
import { i as useServerFn, n as Splash, r as TvShell } from "./Splash-BpM6ma3S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-BknrJnMr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE = 60;
function LivePage() {
	const navigate = useNavigate();
	const cats = useServerFn(getLiveCategories);
	const streams = useServerFn(getLiveStreams);
	const epg = useServerFn(getNowPlaying);
	const [categoryId, setCategoryId] = (0, import_react.useState)(void 0);
	const [visible, setVisible] = (0, import_react.useState)(PAGE);
	const [hovered, setHovered] = (0, import_react.useState)(null);
	const { data: categories, isLoading: loadingCats } = useQuery({
		queryKey: ["live-categories"],
		queryFn: () => cats(),
		staleTime: 18e5
	});
	const { data: channels, isFetching } = useQuery({
		queryKey: ["live-streams", categoryId ?? "all"],
		queryFn: () => streams({ data: categoryId ? { categoryId } : {} }),
		staleTime: 6e5
	});
	const { data: now } = useQuery({
		queryKey: ["epg", hovered],
		queryFn: () => epg({ data: { streamId: hovered } }),
		enabled: hovered != null,
		staleTime: 6e4
	});
	const list = (0, import_react.useMemo)(() => (channels ?? []).slice(0, visible), [channels, visible]);
	if (loadingCats) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, { message: "Carregando lista de canais..." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TvShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "mb-6 text-3xl font-bold tracking-tight",
		children: "Canais Ao Vivo"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "scrollbar-none h-[76vh] w-72 shrink-0 space-y-1.5 overflow-y-auto pr-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryButton, {
				label: "Todos os canais",
				active: !categoryId,
				initialFocus: true,
				onSelect: () => {
					setCategoryId(void 0);
					setVisible(PAGE);
				}
			}), (categories ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryButton, {
				label: c.category_name,
				active: categoryId === c.category_id,
				onSelect: () => {
					setCategoryId(c.category_id);
					setVisible(PAGE);
				}
			}, c.category_id))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scrollbar-none h-[76vh] flex-1 overflow-y-auto pr-2",
			children: isFetching && !channels ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Carregando canais..."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-3 2xl:grid-cols-4",
				children: list.map((c) => {
					const isHovered = hovered === c.stream_id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Focusable, {
						onFocus: () => setHovered(c.stream_id),
						onClick: () => navigate({
							to: "/player",
							search: {
								src: `http://tvsrv.co/live/terezinhaconceicao/153759/${c.stream_id}.m3u8`,
								title: c.name,
								live: "1"
							}
						}),
						className: "flex items-center gap-3 rounded-xl bg-card p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-elevated",
							children: c.stream_icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.stream_icon,
								alt: "",
								loading: "lazy",
								className: "h-full w-full object-contain"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "h-5 w-5 text-muted-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-semibold",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: isHovered && now?.[0]?.title ? now[0].title : "Programação indisponível"
							})]
						})]
					}, c.stream_id);
				})
			}), (channels?.length ?? 0) > visible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Focusable, {
					onClick: () => setVisible((v) => v + PAGE),
					className: "rounded-xl bg-elevated px-6 py-3 text-sm font-semibold",
					children: [
						"Carregar mais canais (",
						(channels?.length ?? 0) - visible,
						" restantes)"
					]
				})
			})] })
		})]
	})] });
}
function CategoryButton({ label, active, initialFocus, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focusable, {
		initialFocus,
		onClick: onSelect,
		onFocus: onSelect,
		className: cn("block w-full truncate rounded-lg px-4 py-3 text-sm font-medium", active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"),
		children: label
	});
}
//#endregion
export { LivePage as component };
