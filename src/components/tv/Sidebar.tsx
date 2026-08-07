import { Link, useRouterState, useNavigate, useRouter } from "@tanstack/react-router";
import { Clapperboard, Home, MonitorPlay, Tv, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutFn } from "@/lib/xtream.functions";
import { toast } from "sonner";
import { Focusable } from "./Focusable";

const items = [
  { to: "/", label: "Início", icon: Home },
  { to: "/live", label: "Canais", icon: Tv },
  { to: "/filmes", label: "Filmes", icon: Clapperboard },
  { to: "/series", label: "Séries", icon: MonitorPlay },
] as const;

export function Sidebar() {
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

  return (
    <nav className="fixed left-0 top-0 z-30 flex h-screen w-24 flex-col items-center gap-3 border-r border-border bg-surface/80 py-8 backdrop-blur overflow-hidden">
      <div
        className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black text-primary-foreground shrink-0"
        style={{ background: "var(--gradient-brand)" }}
        title="TVPaulForthe"
      >
        PF
      </div>
      <div className="text-[9px] font-bold text-primary mb-4 text-center leading-tight shrink-0">
        TVPaul<br/>Forthe
      </div>
      
      <div className="flex-1 flex flex-col gap-3 w-full items-center">
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              tabIndex={0}
              data-tv-focusable=""
              className={cn(
                "tv-focusable tv-focus-ring tv-pop-sm flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-medium text-muted-foreground shrink-0",
                active && "bg-elevated text-foreground",
              )}
            >
              <Icon className="h-6 w-6" />
              {label}
            </Link>
          );
        })}
      </div>

      <Focusable
        onClick={handleLogout}
        className="tv-focusable tv-focus-ring tv-pop-sm flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-medium text-muted-foreground hover:text-red-400 mt-auto shrink-0"
        aria-label="Sair"
      >
        <LogOut className="h-6 w-6" />
        Sair
      </Focusable>
    </nav>
  );
}
