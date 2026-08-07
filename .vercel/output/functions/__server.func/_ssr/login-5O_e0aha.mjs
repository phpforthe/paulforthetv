import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as loginFn, a as Route$5 } from "./router-D8XdcCcT.mjs";
import { t as Focusable } from "./Focusable-BQyxN9vP.mjs";
import { d as LoaderCircle, f as KeyRound, g as EyeOff, h as Eye, n as Tv, t as User } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-5O_e0aha.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginScreen() {
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const usernameRef = (0, import_react.useRef)(null);
	const passwordRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	const router = useRouter();
	const redirectUrl = Route$5.useSearch().redirect || "/";
	const handleLogin = async () => {
		if (loading) return;
		const cleanUsername = username.trim();
		if (!cleanUsername || !password) {
			toast.error("Preencha usuário e senha");
			return;
		}
		setLoading(true);
		try {
			const res = await loginFn({ data: {
				username: cleanUsername,
				password
			} });
			if (!res.success || !res.token) {
				toast.error(res.error || "Usuário ou senha inválidos");
				return;
			}
			document.cookie = [
				`xtream_auth_session=${encodeURIComponent(res.token)}`,
				`Max-Age=2592000`,
				"Path=/",
				"SameSite=Lax"
			].join("; ");
			toast.success("Login efetuado com sucesso!");
			await router.invalidate();
			await navigate({ to: redirectUrl });
		} catch (error) {
			console.error("Falha no login:", error);
			toast.error("Ocorreu um erro no servidor.");
		} finally {
			setLoading(false);
		}
	};
	const handleInputKeyDown = (event, next) => {
		if (event.key !== "Enter" && event.key !== "NumpadEnter") return;
		event.preventDefault();
		event.stopPropagation();
		if (next === "password") passwordRef.current?.focus();
		else if (password) handleLogin();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-[90vh] relative flex flex-col items-center justify-center overflow-hidden bg-background px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-background via-background/80 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 flex w-full max-w-[500px] flex-col items-center rounded-3xl border border-white/5 bg-elevated/40 p-10 shadow-2xl backdrop-blur-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-10 flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, { className: "h-10 w-10 text-white" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-4xl font-black tracking-tight text-white",
							children: "TVPaulForthe"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-medium text-muted-foreground",
							children: "Acesse seu catálogo premium"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "relative block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: usernameRef,
								autoFocus: true,
								type: "text",
								value: username,
								placeholder: "Usuário",
								onChange: (e) => setUsername(e.target.value),
								onKeyDown: (e) => handleInputKeyDown(e, "password"),
								autoComplete: "username",
								className: "tv-focusable tv-focus-ring w-full rounded-2xl border border-white/10 bg-black/40 px-12 py-5 text-lg outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:bg-black/60 focus:ring-4 focus:ring-primary/20"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: passwordRef,
									id: "password-input",
									type: showPassword ? "text" : "password",
									value: password,
									placeholder: "Senha",
									onChange: (e) => setPassword(e.target.value),
									onKeyDown: (e) => handleInputKeyDown(e, "login"),
									autoComplete: "current-password",
									className: "tv-focusable tv-focus-ring w-full rounded-2xl border border-white/10 bg-black/40 py-5 pl-12 pr-16 text-lg outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:bg-black/60 focus:ring-4 focus:ring-primary/20"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focusable, {
									"aria-label": showPassword ? "Ocultar senha" : "Mostrar senha",
									title: showPassword ? "Ocultar senha" : "Mostrar senha",
									pop: "none",
									onClick: () => setShowPassword((value) => !value),
									className: "absolute right-2 top-1/2 flex -translate-y-1/2 items-center rounded-xl p-3 text-muted-foreground hover:bg-white/10 hover:text-white",
									children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-5 w-5" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focusable, {
							id: "login-button",
							pop: "lg",
							disabled: loading,
							onClick: () => void handleLogin(),
							className: "mt-6 flex w-full items-center justify-center rounded-2xl bg-primary py-5 text-xl font-bold text-primary-foreground transition-all hover:bg-primary/90",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin" }) : "Entrar"
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { LoginScreen as component };
