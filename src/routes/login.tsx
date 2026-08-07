import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Loader2, Tv, User, KeyRound, Eye, EyeOff } from "lucide-react";
import { loginFn } from "../lib/xtream.functions";
import { Focusable } from "../components/tv/Focusable";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginScreen,
});

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const router = useRouter();
  const search = Route.useSearch() as { redirect?: string };
  const redirectUrl = search.redirect || "/";

  const handleLogin = async () => {
    if (loading) return;

    const cleanUsername = username.trim();
    if (!cleanUsername || !password) {
      toast.error("Preencha usuário e senha");
      return;
    }

    setLoading(true);
    try {
      const res = await loginFn({
        data: { username: cleanUsername, password },
      });

      if (!res.success || !res.token) {
        toast.error(res.error || "Usuário ou senha inválidos");
        return;
      }

      const maxAge = 60 * 60 * 24 * 30;
      document.cookie = [
        `xtream_auth_session=${encodeURIComponent(res.token)}`,
        `Max-Age=${maxAge}`,
        "Path=/",
        "SameSite=Lax",
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

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    next: "password" | "login",
  ) => {
    if (event.key !== "Enter" && event.key !== "NumpadEnter") return;

    event.preventDefault();
    event.stopPropagation();

    if (next === "password") {
      passwordRef.current?.focus();
    } else if (password) {
      void handleLogin();
    }
  };

  return (
    <main className="min-h-[90vh] relative flex flex-col items-center justify-center overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-background via-background/80 to-transparent" />

      <section className="relative z-10 flex w-full max-w-[500px] flex-col items-center rounded-3xl border border-white/5 bg-elevated/40 p-10 shadow-2xl backdrop-blur-2xl">
        <div className="mb-10 flex flex-col items-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/20">
            <Tv className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white">TVPaulForthe</h1>
          <p className="mt-2 font-medium text-muted-foreground">Acesse seu catálogo premium</p>
        </div>

        <div className="w-full space-y-5">
          <label className="relative block">
            <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={usernameRef}
              autoFocus
              type="text"
              value={username}
              placeholder="Usuário"
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => handleInputKeyDown(e, "password")}
              autoComplete="username"
              className="tv-focusable tv-focus-ring w-full rounded-2xl border border-white/10 bg-black/40 px-12 py-5 text-lg outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:bg-black/60 focus:ring-4 focus:ring-primary/20"
            />
          </label>

          <div className="relative">
            <KeyRound className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={passwordRef}
              id="password-input"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleInputKeyDown(e, "login")}
              autoComplete="current-password"
              className="tv-focusable tv-focus-ring w-full rounded-2xl border border-white/10 bg-black/40 py-5 pl-12 pr-16 text-lg outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:bg-black/60 focus:ring-4 focus:ring-primary/20"
            />
            <Focusable
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              title={showPassword ? "Ocultar senha" : "Mostrar senha"}
              pop="none"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center rounded-xl p-3 text-muted-foreground hover:bg-white/10 hover:text-white"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Focusable>
          </div>

          <Focusable
            id="login-button"
            pop="lg"
            disabled={loading}
            onClick={() => void handleLogin()}
            className="mt-6 flex w-full items-center justify-center rounded-2xl bg-primary py-5 text-xl font-bold text-primary-foreground transition-all hover:bg-primary/90"
          >
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Entrar"}
          </Focusable>
        </div>
      </section>
    </main>
  );
}
