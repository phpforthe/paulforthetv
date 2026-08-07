import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Route$4 } from "./router-ULJc8M43.mjs";
import { t as Focusable } from "./Focusable-CfCfNRou.mjs";
import { a as RotateCcw, c as Pause, d as LoaderCircle, i as RotateCw, s as Play, v as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/player-BLK4GB_5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function proxy(url) {
	return `/api/public/stream?u=${encodeURIComponent(url)}`;
}
function fmt(seconds) {
	if (!Number.isFinite(seconds) || seconds < 0) return "--:--";
	const h = Math.floor(seconds / 3600);
	const m = Math.floor(seconds % 3600 / 60);
	const s = Math.floor(seconds % 60);
	const pad = (n) => String(n).padStart(2, "0");
	return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}
function TvPlayer({ src, title, live, onExit }) {
	const videoRef = (0, import_react.useRef)(null);
	const hideTimer = (0, import_react.useRef)(null);
	const [osd, setOsd] = (0, import_react.useState)(true);
	const [playing, setPlaying] = (0, import_react.useState)(true);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [time, setTime] = (0, import_react.useState)(0);
	const [duration, setDuration] = (0, import_react.useState)(0);
	const wake = (0, import_react.useCallback)(() => {
		setOsd(true);
		if (hideTimer.current) window.clearTimeout(hideTimer.current);
		hideTimer.current = window.setTimeout(() => setOsd(false), 5e3);
	}, []);
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video) return;
		const url = proxy(src);
		const isHls = src.includes(".m3u8");
		let destroy;
		setError(null);
		setLoading(true);
		if (isHls && !video.canPlayType("application/vnd.apple.mpegurl")) {
			let cancelled = false;
			import("../_libs/hls.js.mjs").then((n) => n.t).then(({ default: Hls }) => {
				if (cancelled) return;
				if (!Hls.isSupported()) {
					video.src = url;
					return;
				}
				const hls = new Hls({
					lowLatencyMode: false,
					maxBufferLength: 12,
					backBufferLength: 20,
					maxMaxBufferLength: 30,
					enableWorker: true
				});
				hls.loadSource(url);
				hls.attachMedia(video);
				hls.on(Hls.Events.ERROR, (_e, data) => {
					console.warn("[hls]", data.type, data.details, data.fatal);
					if (!data.fatal) return;
					if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls.startLoad();
					else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError();
					else setError("Falha ao carregar o fluxo de vídeo.");
				});
				destroy = () => hls.destroy();
			});
			return () => {
				cancelled = true;
				destroy?.();
			};
		}
		video.src = url;
		return () => {
			video.removeAttribute("src");
			video.load();
		};
	}, [src]);
	const togglePlay = (0, import_react.useCallback)(() => {
		const video = videoRef.current;
		if (!video) return;
		if (video.paused) video.play();
		else video.pause();
		wake();
	}, [wake]);
	const seek = (0, import_react.useCallback)((delta) => {
		const video = videoRef.current;
		if (!video || live) return;
		video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + delta));
		wake();
	}, [live, wake]);
	(0, import_react.useEffect)(() => {
		wake();
		const onKey = (event) => {
			const key = event.key;
			const code = event.keyCode;
			if (key === "Backspace" || key === "GoBack" || code === 461 || key === "Escape") {
				event.preventDefault();
				onExit();
				return;
			}
			if (key === "Enter" || key === " " || key === "MediaPlayPause" || code === 415) {
				if (!osd) {
					event.preventDefault();
					wake();
					return;
				}
				return;
			}
			if (key === "ArrowRight" && !osd) {
				event.preventDefault();
				seek(15);
				return;
			}
			if (key === "ArrowLeft" && !osd) {
				event.preventDefault();
				seek(-15);
				return;
			}
			wake();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("keydown", onKey);
			if (hideTimer.current) window.clearTimeout(hideTimer.current);
		};
	}, [
		onExit,
		osd,
		seek,
		wake
	]);
	const progress = duration > 0 ? time / duration * 100 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 bg-background",
		onMouseMove: wake,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				autoPlay: true,
				playsInline: true,
				className: "h-full w-full bg-background object-contain",
				onPlay: () => setPlaying(true),
				onPause: () => setPlaying(false),
				onWaiting: () => setLoading(true),
				onPlaying: () => setLoading(false),
				onCanPlay: () => setLoading(false),
				onError: () => setError("Não foi possível reproduzir este conteúdo."),
				onTimeUpdate: (e) => setTime(e.currentTarget.currentTime),
				onDurationChange: (e) => setDuration(e.currentTarget.duration)
			}),
			loading && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-12 w-12 animate-spin text-primary" })
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-medium",
					children: error
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focusable, {
					initialFocus: true,
					onClick: onExit,
					className: "rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground",
					children: "Voltar"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 p-10 transition-opacity duration-300",
				style: {
					opacity: osd ? 1 : 0,
					background: "var(--gradient-fade-bottom)",
					pointerEvents: osd ? "auto" : "none"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center gap-3",
						children: [live && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-md bg-live px-2 py-0.5 text-xs font-bold uppercase text-primary-foreground",
							children: "Ao vivo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-semibold",
							children: title
						})]
					}),
					!live && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 w-full overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-primary transition-[width] duration-300",
								style: { width: `${progress}%` }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmt(time) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmt(duration) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focusable, {
								initialFocus: true,
								onClick: togglePlay,
								className: "flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground",
								"aria-label": playing ? "Pausar" : "Reproduzir",
								children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-6 w-6" })
							}),
							!live && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focusable, {
								onClick: () => seek(-15),
								className: "flex h-14 w-14 items-center justify-center rounded-full bg-elevated",
								"aria-label": "Voltar 15 segundos",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-6 w-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focusable, {
								onClick: () => seek(15),
								className: "flex h-14 w-14 items-center justify-center rounded-full bg-elevated",
								"aria-label": "Avançar 15 segundos",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-6 w-6" })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Focusable, {
								onClick: onExit,
								className: "flex h-14 items-center gap-2 rounded-full bg-elevated px-6 font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" }), "Sair"]
							})
						]
					})
				]
			})
		]
	});
}
function PlayerPage() {
	const { src, title, live } = Route$4.useSearch();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TvPlayer, {
		src,
		title,
		live: live === "1",
		onExit: () => void navigate({ to: "/" })
	});
}
//#endregion
export { PlayerPage as component };
