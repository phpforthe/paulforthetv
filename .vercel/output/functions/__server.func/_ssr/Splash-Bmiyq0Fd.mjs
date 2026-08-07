import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { I as isRedirect, b as useNavigate, d as useRouterState, v as Link, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { v as logoutFn } from "./router-D8XdcCcT.mjs";
import { n as cn, t as Focusable } from "./Focusable-BQyxN9vP.mjs";
import { _ as Clapperboard, d as LoaderCircle, l as MonitorPlay, m as House, n as Tv, u as LogOut } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Splash-Bmiyq0Fd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var items = [
	{
		to: "/",
		label: "Início",
		icon: House
	},
	{
		to: "/live",
		label: "Canais",
		icon: Tv
	},
	{
		to: "/filmes",
		label: "Filmes",
		icon: Clapperboard
	},
	{
		to: "/series",
		label: "Séries",
		icon: MonitorPlay
	}
];
function Sidebar() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const router = useRouter();
	const handleLogout = async () => {
		try {
			await logoutFn();
			document.cookie = "xtream_auth_session=; max-age=0; path=/;";
			router.invalidate();
			navigate({ to: "/login" });
		} catch {
			toast.error("Erro ao sair da conta");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "fixed left-0 top-0 z-30 flex h-screen w-24 flex-col items-center gap-3 border-r border-border bg-surface/80 py-8 backdrop-blur overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black text-primary-foreground shrink-0",
				style: { background: "var(--gradient-brand)" },
				title: "TVPaulForthe",
				children: "PF"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-[9px] font-bold text-primary mb-4 text-center leading-tight shrink-0",
				children: [
					"TVPaul",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Forthe"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 flex flex-col gap-3 w-full items-center",
				children: items.map(({ to, label, icon: Icon }) => {
					const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to,
						tabIndex: 0,
						"data-tv-focusable": "",
						className: cn("tv-focusable tv-focus-ring tv-pop-sm flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-medium text-muted-foreground shrink-0", active && "bg-elevated text-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" }), label]
					}, to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Focusable, {
				onClick: handleLogout,
				className: "tv-focusable tv-focus-ring tv-pop-sm flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-medium text-muted-foreground hover:text-red-400 mt-auto shrink-0",
				"aria-label": "Sair",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-6 w-6" }), "Sair"]
			})
		]
	});
}
var FOCUSABLE = "[data-tv-focusable]:not([disabled])";
function visibleFocusables(scope) {
	const root = scope ?? document;
	return Array.from(root.querySelectorAll(FOCUSABLE)).filter((el) => {
		const r = el.getBoundingClientRect();
		return r.width > 0 && r.height > 0;
	});
}
function center(el) {
	const r = el.getBoundingClientRect();
	return {
		x: r.left + r.width / 2,
		y: r.top + r.height / 2,
		r
	};
}
function bestCandidate(current, dir) {
	const from = center(current);
	let best = null;
	let bestScore = Number.POSITIVE_INFINITY;
	for (const el of visibleFocusables()) {
		if (el === current) continue;
		const to = center(el);
		const dx = to.x - from.x;
		const dy = to.y - from.y;
		const primary = dir === "left" ? -dx : dir === "right" ? dx : dir === "up" ? -dy : dy;
		if (primary <= 4) continue;
		const secondary = dir === "left" || dir === "right" ? Math.abs(dy) : Math.abs(dx);
		if (secondary > primary * 3 + 220) continue;
		const score = primary + secondary * 2.2;
		if (score < bestScore) {
			bestScore = score;
			best = el;
		}
	}
	return best;
}
function focusElement(el) {
	if (!el) return;
	el.focus({ preventScroll: true });
	el.scrollIntoView({
		block: "nearest",
		inline: "center",
		behavior: "smooth"
	});
}
/** Global DPad spatial navigation for the LG magic remote / arrow keys. */
function useSpatialNavigation(onBack) {
	(0, import_react.useEffect)(() => {
		const handler = (event) => {
			const key = event.key;
			const code = event.keyCode;
			if (key === "Backspace" || key === "GoBack" || code === 461) {
				if (onBack) {
					event.preventDefault();
					onBack();
				}
				return;
			}
			const dir = key === "ArrowLeft" || code === 37 ? "left" : key === "ArrowRight" || code === 39 ? "right" : key === "ArrowUp" || code === 38 ? "up" : key === "ArrowDown" || code === 40 ? "down" : null;
			if (!dir) return;
			const active = document.activeElement;
			if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) return;
			event.preventDefault();
			if (!active || !active.matches("[data-tv-focusable]:not([disabled])")) {
				focusElement(visibleFocusables()[0] ?? null);
				return;
			}
			focusElement(bestCandidate(active, dir));
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [onBack]);
}
/** Focus the first focusable element inside the page after mount. */
function useAutoFocusFirst(deps = []) {
	(0, import_react.useEffect)(() => {
		const id = window.setTimeout(() => {
			const active = document.activeElement;
			if (active && active.matches?.("[data-tv-focusable]:not([disabled])")) return;
			focusElement(document.querySelector("[data-tv-autofocus]") ?? visibleFocusables()[0] ?? null);
		}, 120);
		return () => window.clearTimeout(id);
	}, deps);
}
function listenWebOSBack(callback) {
	if (typeof window === "undefined") return () => {};
	const handler = (event) => {
		if (event.data && event.data.type === "webos-back") callback();
	};
	window.addEventListener("message", handler);
	return () => window.removeEventListener("message", handler);
}
function TvShell({ children }) {
	const router = useRouter();
	useSpatialNavigation(() => router.history.back());
	useAutoFocusFirst([]);
	(0, import_react.useEffect)(() => {
		return listenWebOSBack(() => router.history.back());
	}, [router]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "ml-24 min-h-screen px-10 py-8",
			children
		})]
	});
}
function Splash({ message = "Conectando ao servidor..." }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 opacity-40",
			style: { background: "var(--gradient-hero)" },
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex flex-col items-center gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-24 w-24 items-center justify-center rounded-3xl text-3xl font-black tracking-tighter text-primary-foreground",
					style: { background: "var(--gradient-brand)" },
					children: "TV"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl font-semibold tracking-tight",
						children: "LG IPTV Player"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-base text-muted-foreground",
						children: message
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
			]
		})]
	});
}
function ErrorState({ message }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl font-semibold",
			children: "Não foi possível carregar"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-lg text-sm text-muted-foreground",
			children: message
		})]
	});
}
//#endregion
export { useServerFn as i, Splash as n, TvShell as r, ErrorState as t };
