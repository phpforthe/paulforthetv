import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Focusable-BQyxN9vP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Focusable = (0, import_react.forwardRef)(function Focusable({ className, initialFocus = false, pop = "sm", onKeyDown, onClick, disabled = false, ...props }, ref) {
	const handleKeyDown = (event) => {
		if (!disabled && (event.key === "Enter" || event.key === "NumpadEnter" || event.key === " ")) {
			event.preventDefault();
			event.stopPropagation();
		}
		onKeyDown?.(event);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		type: "button",
		disabled,
		"data-tv-focusable": "",
		...initialFocus ? { "data-tv-autofocus": "true" } : {},
		...props,
		onKeyDown: handleKeyDown,
		onClick,
		className: cn("tv-focusable tv-focus-ring text-left outline-none", pop === "lg" && "tv-pop", pop === "sm" && "tv-pop-sm", disabled && "cursor-not-allowed opacity-60", className)
	});
});
Focusable.displayName = "Focusable";
//#endregion
export { cn as n, Focusable as t };
