import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2, Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { Focusable } from "./Focusable";

function proxy(url: string) {
  return `/api/public/stream?u=${encodeURIComponent(url)}`;
}

function fmt(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "--:--";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export function TvPlayer({
  src,
  title,
  live,
  onExit,
}: {
  src: string;
  title: string;
  live?: boolean;
  onExit: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<number | null>(null);
  const [osd, setOsd] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const wake = useCallback(() => {
    setOsd(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setOsd(false), 5000);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const url = proxy(src);
    const isHls = src.includes(".m3u8");
    let destroy: (() => void) | undefined;
    setError(null);
    setLoading(true);

    if (isHls && !video.canPlayType("application/vnd.apple.mpegurl")) {
      let cancelled = false;
      void import("hls.js").then(({ default: Hls }) => {
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
          enableWorker: true,
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

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
    wake();
  }, [wake]);

  const seek = useCallback(
    (delta: number) => {
      const video = videoRef.current;
      if (!video || live) return;
      video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + delta));
      wake();
    },
    [live, wake],
  );

  useEffect(() => {
    wake();
    const onKey = (event: KeyboardEvent) => {
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
  }, [onExit, osd, seek, wake]);

  const progress = duration > 0 ? (time / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 bg-background" onMouseMove={wake}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="h-full w-full bg-background object-contain"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onWaiting={() => setLoading(true)}
        onPlaying={() => setLoading(false)}
        onCanPlay={() => setLoading(false)}
        onError={() => setError("Não foi possível reproduzir este conteúdo.")}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
      />

      {loading && !error && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/90">
          <p className="text-lg font-medium">{error}</p>
          <Focusable
            initialFocus
            onClick={onExit}
            className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
          >
            Voltar
          </Focusable>
        </div>
      )}

      <div
        className="absolute inset-x-0 bottom-0 p-10 transition-opacity duration-300"
        style={{
          opacity: osd ? 1 : 0,
          background: "var(--gradient-fade-bottom)",
          pointerEvents: osd ? "auto" : "none",
        }}
      >
        <div className="mb-4 flex items-center gap-3">
          {live && (
            <span className="rounded-md bg-live px-2 py-0.5 text-xs font-bold uppercase text-primary-foreground">
              Ao vivo
            </span>
          )}
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>

        {!live && (
          <div className="mb-5">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>{fmt(time)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Focusable
            initialFocus
            onClick={togglePlay}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label={playing ? "Pausar" : "Reproduzir"}
          >
            {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Focusable>
          {!live && (
            <>
              <Focusable
                onClick={() => seek(-15)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-elevated"
                aria-label="Voltar 15 segundos"
              >
                <RotateCcw className="h-6 w-6" />
              </Focusable>
              <Focusable
                onClick={() => seek(15)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-elevated"
                aria-label="Avançar 15 segundos"
              >
                <RotateCw className="h-6 w-6" />
              </Focusable>
            </>
          )}
          <Focusable
            onClick={onExit}
            className="flex h-14 items-center gap-2 rounded-full bg-elevated px-6 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            Sair
          </Focusable>
        </div>
      </div>
    </div>
  );
}
