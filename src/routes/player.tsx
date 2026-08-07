import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TvPlayer } from "@/components/tv/TvPlayer";

type Search = { src: string; title: string; live?: string | undefined };

export const Route = createFileRoute("/player")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    src: String(search["src"] ?? ""),
    title: String(search["title"] ?? "Reproduzindo"),
    live: search["live"] ? String(search["live"]) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Player — LG IPTV Player" },
      {
        name: "description",
        content: "Player de vídeo HLS/TS/MP4 com controles por controle remoto e OSD automático.",
      },
      { property: "og:title", content: "Player de vídeo para Smart TV LG" },
      {
        property: "og:description",
        content: "Reprodução de canais ao vivo, filmes e episódios com OSD que some em 5 segundos.",
      },
      { property: "og:type", content: "video.other" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlayerPage,
});

function PlayerPage() {
  const { src, title, live } = Route.useSearch();
  const navigate = useNavigate();

  return (
    <TvPlayer
      src={src}
      title={title}
      live={live === "1"}
      onExit={() => void navigate({ to: "/" })}
    />
  );
}
