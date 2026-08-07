import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { Radio } from "lucide-react";
import { TvShell } from "@/components/tv/TvShell";
import { Focusable } from "@/components/tv/Focusable";
import { Splash } from "@/components/tv/Splash";
import { getLiveCategories, getLiveStreams, getNowPlaying } from "@/lib/xtream.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "Canais Ao Vivo com EPG — LG IPTV Player" },
      {
        name: "description",
        content:
          "Navegue pelas categorias e assista canais ao vivo com guia de programação (EPG) direto na Smart TV LG.",
      },
      { property: "og:title", content: "Canais Ao Vivo com EPG" },
      {
        property: "og:description",
        content: "Categorias, grade de canais e programação atual em tempo real.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LivePage,
});

const PAGE = 60;

function LivePage() {
  const navigate = useNavigate();
  const cats = useServerFn(getLiveCategories);
  const streams = useServerFn(getLiveStreams);
  const epg = useServerFn(getNowPlaying);

  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [visible, setVisible] = useState(PAGE);
  const [hovered, setHovered] = useState<number | null>(null);

  const { data: categories, isLoading: loadingCats } = useQuery({
    queryKey: ["live-categories"],
    queryFn: () => cats(),
    staleTime: 30 * 60_000,
  });

  const { data: channels, isFetching } = useQuery({
    queryKey: ["live-streams", categoryId ?? "all"],
    queryFn: () => streams({ data: categoryId ? { categoryId } : {} }),
    staleTime: 10 * 60_000,
  });

  const { data: now } = useQuery({
    queryKey: ["epg", hovered],
    queryFn: () => epg({ data: { streamId: hovered as number } }),
    enabled: hovered != null,
    staleTime: 60_000,
  });

  const list = useMemo(() => (channels ?? []).slice(0, visible), [channels, visible]);

  if (loadingCats) return <Splash message="Carregando lista de canais..." />;

  return (
    <TvShell>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Canais Ao Vivo</h1>
      <div className="flex gap-8">
        <aside className="scrollbar-none h-[76vh] w-72 shrink-0 space-y-1.5 overflow-y-auto pr-2">
          <CategoryButton
            label="Todos os canais"
            active={!categoryId}
            initialFocus
            onSelect={() => {
              setCategoryId(undefined);
              setVisible(PAGE);
            }}
          />
          {(categories ?? []).map((c) => (
            <CategoryButton
              key={c.category_id}
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
          {isFetching && !channels ? (
            <p className="text-sm text-muted-foreground">Carregando canais...</p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-3 2xl:grid-cols-4">
                {list.map((c) => {
                  const isHovered = hovered === c.stream_id;
                  return (
                    <Focusable
                      key={c.stream_id}
                      onFocus={() => setHovered(c.stream_id)}
                      onClick={() =>
                        navigate({
                          to: "/player",
                          search: {
                            src: `http://tvsrv.co/live/terezinhaconceicao/153759/${c.stream_id}.m3u8`,
                            title: c.name,
                            live: "1",
                          },
                        })
                      }
                      className="flex items-center gap-3 rounded-xl bg-card p-3"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-elevated">
                        {c.stream_icon ? (
                          <img
                            src={c.stream_icon}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <Radio className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{c.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {isHovered && now?.[0]?.title
                            ? now[0].title
                            : "Programação indisponível"}
                        </p>
                      </div>
                    </Focusable>
                  );
                })}
              </div>

              {(channels?.length ?? 0) > visible && (
                <div className="mt-6 flex justify-center">
                  <Focusable
                    onClick={() => setVisible((v) => v + PAGE)}
                    className="rounded-xl bg-elevated px-6 py-3 text-sm font-semibold"
                  >
                    Carregar mais canais ({(channels?.length ?? 0) - visible} restantes)
                  </Focusable>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </TvShell>
  );
}

function CategoryButton({
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
