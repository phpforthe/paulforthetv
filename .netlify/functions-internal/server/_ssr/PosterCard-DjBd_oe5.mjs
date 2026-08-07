import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as cn, t as Focusable } from "./Focusable-CfCfNRou.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PosterCard-DjBd_oe5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PosterCard({ title, image, subtitle, badge, wide, initialFocus, onSelect }) {
	const [broken, setBroken] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Focusable, {
		pop: "lg",
		initialFocus,
		onClick: onSelect,
		className: cn("group relative shrink-0 overflow-hidden rounded-xl bg-card", wide ? "h-[9.5rem] w-64" : "h-[16.5rem] w-[11rem]"),
		"aria-label": title,
		children: [
			image && !broken ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image,
				alt: title,
				loading: "lazy",
				onError: () => setBroken(true),
				className: "h-full w-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full w-full items-center justify-center bg-elevated p-3 text-center text-sm font-medium text-muted-foreground",
				children: title
			}),
			badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-2 top-2 rounded-md bg-live px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground",
				children: badge
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 p-2.5 pt-8",
				style: { background: "var(--gradient-fade-bottom)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-2 text-xs font-semibold leading-tight",
					children: title
				}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 line-clamp-1 text-[10px] text-muted-foreground",
					children: subtitle
				})]
			})
		]
	});
}
function CarouselRow({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 px-1 text-lg font-semibold tracking-tight",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scrollbar-none flex gap-4 overflow-x-auto px-1 py-4",
			children
		})]
	});
}
//#endregion
export { PosterCard as n, CarouselRow as t };
