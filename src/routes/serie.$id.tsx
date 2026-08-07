import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Play, Star } from "lucide-react";
import { TvShell } from "@/components/tv/TvShell";
import { Focusable } from "@/components/tv/Focusable";
import { Splash, ErrorState } from "@/components/tv/Splash";
import { getSeriesDetail } from "@/lib/xtream.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/serie/$id")({
  head: () => ({
    meta: [
      { title: "Detalhes da Série — LG IPTV Player" },
      {
        name: "description",
        content:
          "Sinopse, elenco, temporadas e episódios da série selecionada, prontos para assistir.",
      },
      { property: "og:title", content: "Detalhes da Série" },
      {
        property: "og:description",
        content: "Escolha temporada e episódio com o controle remoto e dê play.",
      },
      { property: "og:type", content: "video.tv_show" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SeriesDetail,
});

function SeriesDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const detail = useServerFn(getSeriesDetail);
  const [season, setSeason] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["series-detail", id],
    queryFn: () => detail({ data: { seriesId: Number(id) } }),
    staleTime: 10 * 60_000,
  });

  useEffect(() => {
    if (data?.seasons?.[0] && !season) setSeason(data.seasons[0].season);
  }, [data, season]);

  if (isLoading) return <Splash message="Carregando temporadas e episódios..." />;

  const current = data?.seasons.find((s) => s.season === season) ?? data?.seasons[0];

  return (
    <TvShell>
      {error || !data ? (
        <ErrorState message="Detalhes indisponíveis para esta série." />
      ) : (
        <div className="relative -mx-10 -mt-8 min-h-screen">
          {(data.backdrop || data.cover) && (
            <img
              src={data.backdrop || data.cover}
              alt=""
              className="absolute inset-0 h-[60vh] w-full object-cover opacity-30"
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-hero)" }}
            aria-hidden
          />
          <div className="relative px-10 pt-16">
            <div className="flex gap-10">
              {data.cover && (
                <img
                  src={data.cover}
                  alt={data.name}
                  className="h-[20rem] w-52 shrink-0 rounded-2xl object-cover"
                />
              )}
              <div className="max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight">{data.name}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {data.rating && (
                    <span className="flex items-center gap-1 text-primary">
                      <Star className="h-4 w-4 fill-current" /> {data.rating}
                    </span>
                  )}
                  {data.genre && <span>{data.genre}</span>}
                  <span>{data.seasons.length} temporada(s)</span>
                </div>
                <p className="mt-5 text-base leading-relaxed text-foreground/85">
                  {data.plot || "Sinopse não disponível."}
                </p>
                {data.cast && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Elenco: </span>
                    {data.cast}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-10 flex gap-3 overflow-x-auto pb-2">
              {data.seasons.map((s, i) => (
                <Focusable
                  key={s.season}
                  initialFocus={i === 0}
                  onClick={() => setSeason(s.season)}
                  className={cn(
                    "shrink-0 rounded-xl px-6 py-3 text-sm font-semibold",
                    current?.season === s.season
                      ? "bg-primary text-primary-foreground"
                      : "bg-elevated text-muted-foreground",
                  )}
                >
                  Temporada {s.season}
                </Focusable>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 pb-16 2xl:grid-cols-3">
              {(current?.episodes ?? []).map((ep) => (
                <Focusable
                  key={ep.id}
                  onClick={() =>
                    navigate({
                      to: "/player",
                      search: {
                        src: ep.url,
                        title: `${data.name} — T${current?.season}E${ep.num} ${ep.title}`,
                      },
                    })
                  }
                  className="flex gap-4 rounded-xl bg-card p-3"
                >
                  <div className="flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-elevated">
                    {ep.image ? (
                      <img
                        src={ep.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Play className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {ep.num}. {ep.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {ep.plot || "Sem descrição."}
                    </p>
                    {ep.duration && (
                      <p className="mt-1 text-[11px] text-muted-foreground">{ep.duration}</p>
                    )}
                  </div>
                </Focusable>
              ))}
            </div>
          </div>
        </div>
      )}
    </TvShell>
  );
}
