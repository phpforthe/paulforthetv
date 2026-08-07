import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Play, Star } from "lucide-react";
import { TvShell } from "@/components/tv/TvShell";
import { Focusable } from "@/components/tv/Focusable";
import { Splash, ErrorState } from "@/components/tv/Splash";
import { getMovieDetail } from "@/lib/xtream.functions";

export const Route = createFileRoute("/filme/$id")({
  head: () => ({
    meta: [
      { title: "Detalhes do Filme — LG IPTV Player" },
      {
        name: "description",
        content: "Sinopse, elenco, nota e reprodução em alta qualidade do filme escolhido.",
      },
      { property: "og:title", content: "Detalhes do Filme" },
      {
        property: "og:description",
        content: "Veja sinopse, elenco e nota antes de dar play na sua Smart TV LG.",
      },
      { property: "og:type", content: "video.movie" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MovieDetail,
});

function MovieDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const detail = useServerFn(getMovieDetail);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => detail({ data: { vodId: Number(id) } }),
    staleTime: 10 * 60_000,
  });

  if (isLoading) return <Splash message="Carregando detalhes do filme..." />;

  return (
    <TvShell>
      {error || !data ? (
        <ErrorState message="Detalhes indisponíveis para este título." />
      ) : (
        <div className="relative -mx-10 -mt-8 min-h-screen">
          {(data.backdrop || data.cover) && (
            <img
              src={data.backdrop || data.cover}
              alt=""
              className="absolute inset-0 h-[70vh] w-full object-cover opacity-35"
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-hero)" }}
            aria-hidden
          />
          <div className="relative flex gap-10 px-10 pt-16">
            {data.cover && (
              <img
                src={data.cover}
                alt={data.name}
                className="h-[24rem] w-64 shrink-0 rounded-2xl object-cover"
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
                {data.releaseDate && <span>{data.releaseDate}</span>}
                {data.duration && <span>{data.duration}</span>}
                {data.genre && <span>{data.genre}</span>}
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
              {data.director && (
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Direção: </span>
                  {data.director}
                </p>
              )}
              <div className="mt-8">
                <Focusable
                  initialFocus
                  onClick={() =>
                    navigate({
                      to: "/player",
                      search: { src: data.url, title: data.name },
                    })
                  }
                  className="flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground"
                >
                  <Play className="h-6 w-6" /> Assistir
                </Focusable>
              </div>
            </div>
          </div>
        </div>
      )}
    </TvShell>
  );
}
