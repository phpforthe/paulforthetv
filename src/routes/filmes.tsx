import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { TvShell } from "@/components/tv/TvShell";
import { PosterCard } from "@/components/tv/PosterCard";
import { Focusable } from "@/components/tv/Focusable";
import { Splash } from "@/components/tv/Splash";
import { getVodCategories, getVodStreams } from "@/lib/xtream.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/filmes")({
  head: () => ({
    meta: [
      { title: "Filmes em Grade de Pôsteres — LG IPTV Player" },
      {
        name: "description",
        content:
          "Catálogo de filmes VOD em grade de pôsteres, com categorias e detalhes completos na Smart TV LG.",
      },
      { property: "og:title", content: "Catálogo de Filmes VOD" },
      {
        property: "og:description",
        content: "Pôsteres, sinopse, elenco e nota antes de assistir.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MoviesPage,
});

const PAGE = 48;

function MoviesPage() {
  const navigate = useNavigate();
  const cats = useServerFn(getVodCategories);
  const vod = useServerFn(getVodStreams);
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [visible, setVisible] = useState(PAGE);

  const { data: categories, isLoading } = useQuery({
    queryKey: ["vod-categories"],
    queryFn: () => cats(),
    staleTime: 30 * 60_000,
  });
  const { data: movies } = useQuery({
    queryKey: ["vod", categoryId ?? "all"],
    queryFn: () => vod({ data: categoryId ? { categoryId } : {} }),
    enabled: Boolean(categoryId),
    staleTime: 10 * 60_000,
  });

  useEffect(() => {
    if (!categoryId && categories?.[0]) setCategoryId(categories[0].category_id);
  }, [categories, categoryId]);

  if (isLoading) return <Splash message="Carregando catálogo de filmes..." />;

  return (
    <TvShell>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Filmes</h1>
      <div className="flex gap-8">
        <aside className="scrollbar-none h-[76vh] w-72 shrink-0 space-y-1.5 overflow-y-auto pr-2">
          {(categories ?? []).map((c, i) => (
            <Cat
              key={c.category_id}
              initialFocus={i === 0}
              label={c.category_name}
              active={categoryId === c.category_id}
              onSelect={() => {
                setCategoryId(c.category_id);
                setVisible(PAGE);
              }}
            />
          ))}
        </aside>

        <div className="scrollbar-none h-[76vh] flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-4 gap-5 2xl:grid-cols-6">
            {(movies ?? []).slice(0, visible).map((m) => (
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
          </div>
          {(movies?.length ?? 0) > visible && (
            <div className="mt-6 flex justify-center">
              <Focusable
                onClick={() => setVisible((v) => v + PAGE)}
                className="rounded-xl bg-elevated px-6 py-3 text-sm font-semibold"
              >
                Carregar mais filmes
              </Focusable>
            </div>
          )}
        </div>
      </div>
    </TvShell>
  );
}

function Cat({
  label,
  active,
  initialFocus,
  onSelect,
}: {
  label: string;
  active: boolean;
  initialFocus?: boolean | undefined;
  onSelect: () => void;
}) {
  return (
    <Focusable
      initialFocus={initialFocus}
      onClick={onSelect}
      onFocus={onSelect}
      className={cn(
        "block w-full truncate rounded-lg px-4 py-3 text-sm font-medium",
        active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground",
      )}
    >
      {label}
    </Focusable>
  );
}
