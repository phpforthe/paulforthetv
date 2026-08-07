import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Play, Info } from "lucide-react";
import { TvShell } from "@/components/tv/TvShell";
import { CarouselRow, PosterCard } from "@/components/tv/PosterCard";
import { Focusable } from "@/components/tv/Focusable";
import { Splash, ErrorState } from "@/components/tv/Splash";
import { getHome, getAccountInfo } from "@/lib/xtream.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LG IPTV Player — Canais, Filmes e Séries na sua Smart TV" },
      {
        name: "description",
        content:
          "Aplicativo IPTV para Smart TV LG com canais ao vivo, filmes, séries e navegação total pelo controle remoto.",
      },
      { property: "og:title", content: "LG IPTV Player para Smart TV LG" },
      {
        property: "og:description",
        content: "Canais ao vivo, EPG, filmes e séries com player HLS otimizado para TV.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const home = useServerFn(getHome);
  const account = useServerFn(getAccountInfo);

  const { data, isLoading, error } = useQuery({
    queryKey: ["home"],
    queryFn: () => home(),
    staleTime: 5 * 60_000,
  });
  const { data: acc } = useQuery({
    queryKey: ["account"],
    queryFn: () => account(),
    staleTime: 30 * 60_000,
  });

  if (isLoading) return <Splash message="Autenticando e carregando seu conteúdo..." />;

  const featured = data?.movies?.[0];

  return (
    <TvShell>
      {error ? (
        <ErrorState message={(error as Error).message} />
      ) : (
        <>
          <section className="relative -mx-10 -mt-8 mb-8 h-[22rem] overflow-hidden">
            {featured?.stream_icon && (
              <img
                src={featured.stream_icon}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
            )}
            <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
            <div className="relative flex h-full flex-col justify-end px-10 pb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Destaque de hoje
              </p>
              <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight">
                {featured?.name ?? "Sua TV, do seu jeito"}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {data?.counts.live ?? 0} canais · {data?.counts.movies ?? 0} filmes ·{" "}
                {data?.counts.series ?? 0} séries
                {acc?.username ? ` · conectado como ${acc.username}` : ""}
              </p>
              <div className="mt-5 flex gap-3">
                <Focusable
                  initialFocus
                  onClick={() =>
                    featured &&
                    navigate({ to: "/filme/$id", params: { id: String(featured.stream_id) } })
                  }
                  className="flex items-center gap-2 rounded-xl bg-primary px-7 py-3 font-semibold text-primary-foreground"
                >
                  <Play className="h-5 w-5" /> Assistir
                </Focusable>
                <Focusable
                  onClick={() => navigate({ to: "/live" })}
                  className="flex items-center gap-2 rounded-xl bg-elevated px-7 py-3 font-semibold"
                >
                  <Info className="h-5 w-5" /> Ver canais ao vivo
                </Focusable>
              </div>
            </div>
          </section>

          <CarouselRow title="Canais Ao Vivo">
            {(data?.live ?? []).map((c) => (
              <PosterCard
                key={c.stream_id}
                wide
                badge="Ao vivo"
                title={c.name}
                image={c.stream_icon}
                onSelect={() =>
                  navigate({
                    to: "/player",
                    search: {
                      src: `http://tvsrv.co/live/terezinhaconceicao/153759/${c.stream_id}.m3u8`,
                      title: c.name,
                      live: "1",
                    },
                  })
                }
              />
            ))}
          </CarouselRow>

          <CarouselRow title="Filmes Adicionados Recentemente">
            {(data?.movies ?? []).map((m) => (
              <PosterCard
                key={m.stream_id}
                title={m.name}
                image={m.stream_icon}
                subtitle={m.rating ? `Nota ${m.rating}` : undefined}
                onSelect={() =>
                  navigate({ to: "/filme/$id", params: { id: String(m.stream_id) } })
                }
              />
            ))}
          </CarouselRow>

          <CarouselRow title="Séries em Alta">
            {(data?.series ?? []).map((s) => (
              <PosterCard
                key={s.series_id}
                title={s.name}
                image={s.cover}
                subtitle={s.rating ? `Nota ${s.rating}` : undefined}
                onSelect={() =>
                  navigate({ to: "/serie/$id", params: { id: String(s.series_id) } })
                }
              />
            ))}
          </CarouselRow>
        </>
      )}
    </TvShell>
  );
}
