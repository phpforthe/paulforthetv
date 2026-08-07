import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as loginFn, a as Route$5 } from "./router-ULJc8M43.mjs";
import { t as Focusable } from "./Focusable-CfCfNRou.mjs";
import { d as LoaderCircle, f as KeyRound, g as EyeOff, h as Eye, n as Tv, t as User } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DOX8WQma.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginScreen() {
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const router = useRouter();
	const redirectUrl = Route$5.useSearch().redirect || "/";
	const handleLogin = async () => {
		if (!username || !password) {
			toast.error("Preencha todos os campos");
			return;
		}
		setLoading(true);
		try {
			const res = await loginFn({ data: {
				username,
				password
			} });
			if (res.success && res.token) {
				document.cookie = `xtream_auth_session=${res.token}; max-age=2592000; path=/; samesite=lax`;
				toast.success("Login efetuado com sucesso!");
				router.invalidate();
				navigate({ to: redirectUrl });
			} else toast.error(res.error || "Erro ao fazer login");
		} catch (e) {
			toast.error("Ocorreu um erro no servidor.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-[90vh] flex flex-col items-center justify-center px-4 bg-background relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-[500px] p-10 bg-elevated/40 backdrop-blur-2xl border border-white/5 rounded-3xl shadow-2xl relative z-10 flex flex-col items-center animate-in fade-in zoom-in-95 duration-700",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center mb-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, { className: "w-10 h-10 text-white" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight",
							children: "TVPaulForthe"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground mt-2 font-medium",
							children: "Acesse seu catálogo premium"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5 text-muted-foreground" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								autoFocus: true,
								type: "text",
								placeholder: "Usuário",
								value: username,
								onChange: (e) => setUsername(e.target.value),
								autoComplete: "off",
								autoCorrect: "off",
								autoCapitalize: "off",
								spellCheck: "false",
								"data-tv-focusable": "",
								onKeyDown: (e) => {
									if (e.key === "Enter" || e.keyCode === 13) {
										const target = e.currentTarget;
										target.blur();
										setTimeout(() => {
											target.focus();
											target.click();
										}, 50);
										setTimeout(() => {
											document.getElementById("password-input")?.focus();
										}, 100);
									}
								},
								className: "w-full bg-black/40 border border-white/10 rounded-2xl px-12 py-5 text-lg placeholder:text-muted-foreground/60 transition-all focus:border-primary focus:bg-black/60 focus:ring-4 focus:ring-primary/20 outline-none tv-focusable tv-focus-ring"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-5 w-5 text-muted-foreground" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: showPassword ? "text" : "password",
									id: "password-input",
									placeholder: "Senha",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									autoComplete: "off",
									autoCorrect: "off",
									autoCapitalize: "off",
									spellCheck: "false",
									"data-tv-focusable": "",
									onKeyDown: (e) => {
										if (e.key === "Enter" || e.keyCode === 13) {
											const target = e.currentTarget;
											if (password.length > 0) handleLogin();
											else {
												target.blur();
												setTimeout(() => {
													target.focus();
													target.click();
												}, 50);
												setTimeout(() => {
													document.getElementById("login-button")?.focus();
												}, 100);
											}
										}
									},
									className: "w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-16 py-5 text-lg placeholder:text-muted-foreground/60 transition-all focus:border-primary focus:bg-black/60 focus:ring-4 focus:ring-primary/20 outline-none tv-focusable tv-focus-ring"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focusable, {
									onClick: () => setShowPassword(!showPassword),
									className: "absolute inset-y-0 right-2 flex items-center p-3 text-muted-foreground hover:text-white transition-colors rounded-xl focus:bg-white/10 focus:text-white outline-none",
									"aria-label": showPassword ? "Ocultar senha" : "Exibir senha",
									children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-5 w-5" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Focusable, {
							id: "login-button",
							onClick: handleLogin,
							className: "w-full relative group overflow-hidden mt-6 rounded-2xl bg-primary text-primary-foreground font-bold text-xl py-5 flex justify-center items-center transition-all focus:ring-4 focus:ring-primary focus:ring-offset-4 focus:ring-offset-background outline-none hover:bg-primary/90 hover:scale-[1.02]",
							disabled: loading,
							children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Entrar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" })]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { LoginScreen as component };
