import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { TvShell } from "@/components/tv/TvShell";
import { PosterCard } from "@/components/tv/PosterCard";
import { Focusable } from "@/components/tv/Focusable";
import { Splash } from "@/components/tv/Splash";
import { getSeriesCategories, getSeriesList } from "@/lib/xtream.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/series")({
  head: () => ({
    meta: [
      { title: "Séries com Temporadas e Episódios — LG IPTV Player" },
      {
        name: "description",
        content:
          "Explore séries por categoria, escolha temporada e episódio e assista direto na Smart TV LG.",
      },
      { property: "og:title", content: "Catálogo de Séries" },
      {
        property: "og:description",
        content: "Temporadas, episódios e sinopses organizados para o controle remoto.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SeriesPage,
});

const PAGE = 48;

function SeriesPage() {
  const navigate = useNavigate();
  const cats = useServerFn(getSeriesCategories);
  const list = useServerFn(getSeriesList);
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [visible, setVisible] = useState(PAGE);

  const { data: categories, isLoading } = useQuery({
    queryKey: ["series-categories"],
    queryFn: () => cats(),
    staleTime: 30 * 60_000,
  });
  const { data: series } = useQuery({
    queryKey: ["series", categoryId ?? "all"],
    queryFn: () => list({ data: categoryId ? { categoryId } : {} }),
    enabled: Boolean(categoryId),
    staleTime: 10 * 60_000,
  });

  useEffect(() => {
    if (!categoryId && categories?.[0]) setCategoryId(categories[0].category_id);
  }, [categories, categoryId]);

  if (isLoading) return <Splash message="Carregando catálogo de séries..." />;

  return (
    <TvShell>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Séries</h1>
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
            {(series ?? []).slice(0, visible).map((s) => (
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
          </div>
          {(series?.length ?? 0) > visible && (
            <div className="mt-6 flex justify-center">
              <Focusable
                onClick={() => setVisible((v) => v + PAGE)}
                className="rounded-xl bg-elevated px-6 py-3 text-sm font-semibold"
              >
                Carregar mais séries
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
