import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as getSeriesCategories, m as getSeriesList } from "./router-D8XdcCcT.mjs";
import { n as cn, t as Focusable } from "./Focusable-BQyxN9vP.mjs";
import { i as useServerFn, n as Splash, r as TvShell } from "./Splash-Bmiyq0Fd.mjs";
import { n as PosterCard } from "./PosterCard-DmCG4OfS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/series-aSftVqe_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE = 48;
function SeriesPage() {
	const navigate = useNavigate();
	const cats = useServerFn(getSeriesCategories);
	const list = useServerFn(getSeriesList);
	const [categoryId, setCategoryId] = (0, import_react.useState)(void 0);
	const [visible, setVisible] = (0, import_react.useState)(PAGE);
	const { data: categories, isLoading } = useQuery({
		queryKey: ["series-categories"],
		queryFn: () => cats(),
		staleTime: 18e5
	});
	const { data: series } = useQuery({
		queryKey: ["series", categoryId ?? "all"],
		queryFn: () => list({ data: categoryId ? { categoryId } : {} }),
		enabled: Boolean(categoryId),
		staleTime: 6e5
	});
	(0, import_react.useEffect)(() => {
		if (!categoryId && categories?.[0]) setCategoryId(categories[0].category_id);
	}, [categories, categoryId]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, { message: "Carregando catálogo de séries..." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TvShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "mb-6 text-3xl font-bold tracking-tight",
		children: "Séries"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "scrollbar-none h-[76vh] w-72 shrink-0 space-y-1.5 overflow-y-auto pr-2",
			children: (categories ?? []).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cat, {
				initialFocus: i === 0,
				label: c.category_name,
				active: categoryId === c.category_id,
				onSelect: () => {
					setCategoryId(c.category_id);
					setVisible(PAGE);
				}
			}, c.category_id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scrollbar-none h-[76vh] flex-1 overflow-y-auto pr-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-5 2xl:grid-cols-6",
				children: (series ?? []).slice(0, visible).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
					title: s.name,
					image: s.cover,
					subtitle: s.rating ? `Nota ${s.rating}` : void 0,
					onSelect: () => navigate({
						to: "/serie/$id",
						params: { id: String(s.series_id) }
					})
				}, s.series_id))
			}), (series?.length ?? 0) > visible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focusable, {
					onClick: () => setVisible((v) => v + PAGE),
					className: "rounded-xl bg-elevated px-6 py-3 text-sm font-semibold",
					children: "Carregar mais séries"
				})
			})]
		})]
	})] });
}
function Cat({ label, active, initialFocus, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focusable, {
		initialFocus,
		onClick: onSelect,
		onFocus: onSelect,
		className: cn("block w-full truncate rounded-lg px-4 py-3 text-sm font-medium", active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"),
		children: label
	});
}
//#endregion
export { SeriesPage as component };
