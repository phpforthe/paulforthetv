import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Focusable-CfCfNRou.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/** Remote-control focusable primitive: DPad aware, scales and glows on focus. */
var Focusable = (0, import_react.forwardRef)(function Focusable({ className, initialFocus, pop = "sm", onKeyDown, onClick, ...props }, ref) {
	const lastClickTime = (0, import_react.useRef)(0);
	const handleAction = (e, force = false) => {
		const now = Date.now();
		if (now - lastClickTime.current < 400 && !force) return;
		lastClickTime.current = now;
		if (onClick) onClick(e);
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.keyCode === 13) {
			e.preventDefault();
			handleAction(e);
		}
		onKeyDown?.(e);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "button",
		ref,
		tabIndex: 0,
		"data-tv-focusable": "",
		onClick: (e) => handleAction(e, false),
		onKeyDown: handleKeyDown,
		...initialFocus ? { "data-tv-autofocus": "" } : {},
		className: cn("tv-focusable tv-focus-ring text-left", pop === "lg" && "tv-pop", pop === "sm" && "tv-pop-sm", className),
		...props
	});
});
//#endregion
export { cn as n, Focusable as t };
