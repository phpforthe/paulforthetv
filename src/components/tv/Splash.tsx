import { Loader2 } from "lucide-react";

export function Splash({ message = "Conectando ao servidor..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-background">
      <div
        className="absolute inset-0 opacity-40"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      <div className="relative flex flex-col items-center gap-6">
        <div
          className="flex h-24 w-24 items-center justify-center rounded-3xl text-3xl font-black tracking-tighter text-primary-foreground"
          style={{ background: "var(--gradient-brand)" }}
        >
          TV
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight">LG IPTV Player</h1>
          <p className="mt-2 text-base text-muted-foreground">{message}</p>
        </div>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
      <h2 className="text-2xl font-semibold">Não foi possível carregar</h2>
      <p className="max-w-lg text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
