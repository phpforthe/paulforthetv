import { createServerFn } from "@tanstack/react-start";
import { setCredentials, clearCredentials, getCredentials } from "./auth.server";

export type Category = { category_id: string; category_name: string };
export type LiveChannel = {
  stream_id: number;
  name: string;
  stream_icon?: string;
  epg_channel_id?: string | null;
  category_id?: string;
};
export type VodItem = {
  stream_id: number;
  name: string;
  stream_icon?: string;
  rating?: string | number;
  added?: string;
  container_extension?: string;
  category_id?: string;
};
export type SeriesItem = {
  series_id: number;
  name: string;
  cover?: string;
  rating?: string | number;
  last_modified?: string;
  category_id?: string;
};

export const getSession = createServerFn({ method: "GET" }).handler(async () => {
  const creds = getCredentials();
  return { isAuthenticated: !!creds };
});

export const loginFn = createServerFn({ method: "POST" })
  .validator((d: { username: string; password: string }) => d)
  .handler(async ({ data }) => {
    try {
      const { XTREAM_HOST } = await import("./xtream.server");
      const url = new URL(`${XTREAM_HOST}/player_api.php`);
      url.searchParams.set("username", data.username);
      url.searchParams.set("password", data.password);
      
      const UA = "Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 Chrome/108 Safari/537.36";
      const res = await fetch(url.toString(), {
        headers: { "User-Agent": UA, Accept: "application/json" },
      });
      
      if (!res.ok) throw new Error("Falha na requisição");
      const text = await res.text();
      const parsed = JSON.parse(text);
      
      if (!parsed || !parsed.user_info || parsed.user_info.auth === 0) {
        throw new Error("Credenciais inválidas");
      }
      
      // Return the encoded payload for the client to set as cookie
      const payload = JSON.stringify({ username: data.username, password: data.password });
      const encoded = Buffer.from(payload, "utf-8").toString("base64");
      
      return { success: true, token: encoded };
    } catch (err: unknown) {
      clearCredentials();
      return { success: false, error: "Usuário ou senha incorretos." };
    }
  });

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  return { success: true };
});

export const getAccountInfo = createServerFn({ method: "GET" }).handler(async () => {
  const { xtreamApi } = await import("./xtream.server");
  const data = await xtreamApi<{
    user_info?: { username?: string; status?: string; exp_date?: string };
    server_info?: { url?: string };
  }>("");
  return {
    username: data.user_info?.username ?? "",
    status: data.user_info?.status ?? "",
    expDate: data.user_info?.exp_date ?? "",
  };
});

export const getHome = createServerFn({ method: "GET" }).handler(async () => {
  const { xtreamApi } = await import("./xtream.server");

  // The full VOD catalog is several MB, which is far too heavy for a TV.
  // The home rows are built from the first categories instead.
  const [live, vodCats, seriesCats] = await Promise.all([
    xtreamApi<LiveChannel[]>("get_live_streams").catch(() => [] as LiveChannel[]),
    xtreamApi<Category[]>("get_vod_categories").catch(() => [] as Category[]),
    xtreamApi<Category[]>("get_series_categories").catch(() => [] as Category[]),
  ]);

  const pickCats = (cats: Category[]) => (cats ?? []).slice(0, 2);

  const [movieChunks, seriesChunks] = await Promise.all([
    Promise.all(
      pickCats(vodCats).map((c) =>
        xtreamApi<VodItem[]>("get_vod_streams", { category_id: c.category_id }).catch(
          () => [] as VodItem[],
        ),
      ),
    ),
    Promise.all(
      pickCats(seriesCats).map((c) =>
        xtreamApi<SeriesItem[]>("get_series", { category_id: c.category_id }).catch(
          () => [] as SeriesItem[],
        ),
      ),
    ),
  ]);

  const movies = movieChunks.flat();
  const series = seriesChunks.flat();

  const byAdded = [...movies].sort((a, b) => Number(b.added ?? 0) - Number(a.added ?? 0));
  const byRating = [...series].sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0));

  return {
    live: (live ?? []).slice(0, 24),
    movies: byAdded.slice(0, 24),
    series: byRating.slice(0, 24),
    counts: {
      live: live?.length ?? 0,
      movies: movies.length,
      series: series.length,
    },
  };
});

export const getLiveCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { xtreamApi } = await import("./xtream.server");
  return xtreamApi<Category[]>("get_live_categories").catch(() => [] as Category[]);
});

export const getLiveStreams = createServerFn({ method: "GET" })
  .inputValidator((d: { categoryId?: string }) => d)
  .handler(async ({ data }) => {
    const { xtreamApi } = await import("./xtream.server");
    const params = data.categoryId ? { category_id: data.categoryId } : {};
    const list = await xtreamApi<LiveChannel[]>("get_live_streams", params).catch(
      () => [] as LiveChannel[],
    );
    return list ?? [];
  });

export const getNowPlaying = createServerFn({ method: "GET" })
  .inputValidator((d: { streamId: number }) => d)
  .handler(async ({ data }) => {
    const { xtreamApi, decodeEpg } = await import("./xtream.server");
    type Epg = {
      epg_listings?: Array<{
        title?: string;
        description?: string;
        start?: string;
        end?: string;
      }>;
    };
    const res = await xtreamApi<Epg>("get_short_epg", {
      stream_id: data.streamId,
      limit: 2,
    }).catch((): Epg => ({}));
    return (res.epg_listings ?? []).map((e) => ({
      title: decodeEpg(e.title),
      description: decodeEpg(e.description),
      start: e.start ?? "",
      end: e.end ?? "",
    }));
  });

export const getVodCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { xtreamApi } = await import("./xtream.server");
  return xtreamApi<Category[]>("get_vod_categories").catch(() => [] as Category[]);
});

export const getVodStreams = createServerFn({ method: "GET" })
  .inputValidator((d: { categoryId?: string }) => d)
  .handler(async ({ data }) => {
    const { xtreamApi } = await import("./xtream.server");
    const params = data.categoryId ? { category_id: data.categoryId } : {};
    return (
      (await xtreamApi<VodItem[]>("get_vod_streams", params).catch(
        () => [] as VodItem[],
      )) ?? []
    );
  });

export const getSeriesCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { xtreamApi } = await import("./xtream.server");
  return xtreamApi<Category[]>("get_series_categories").catch(() => [] as Category[]);
});

export const getSeriesList = createServerFn({ method: "GET" })
  .inputValidator((d: { categoryId?: string }) => d)
  .handler(async ({ data }) => {
    const { xtreamApi } = await import("./xtream.server");
    const params = data.categoryId ? { category_id: data.categoryId } : {};
    return (
      (await xtreamApi<SeriesItem[]>("get_series", params).catch(
        () => [] as SeriesItem[],
      )) ?? []
    );
  });

export const getMovieDetail = createServerFn({ method: "GET" })
  .inputValidator((d: { vodId: number }) => d)
  .handler(async ({ data }) => {
    const { xtreamApi, buildStreamUrl } = await import("./xtream.server");
    const res = await xtreamApi<{
      info?: Record<string, unknown>;
      movie_data?: Record<string, unknown>;
    }>("get_vod_info", { vod_id: data.vodId });
    const info = (res.info ?? {}) as Record<string, string>;
    const md = (res.movie_data ?? {}) as Record<string, string>;
    const ext = md["container_extension"] || "mp4";
    return {
      id: data.vodId,
      name: md["name"] || info["name"] || "",
      plot: info["plot"] || info["description"] || "",
      cast: info["cast"] || info["actors"] || "",
      director: info["director"] || "",
      genre: info["genre"] || "",
      releaseDate: info["releasedate"] || info["release_date"] || "",
      duration: info["duration"] || "",
      rating: info["rating"] || "",
      cover: info["movie_image"] || info["cover_big"] || "",
      backdrop: Array.isArray(info["backdrop_path"])
        ? String((info["backdrop_path"] as unknown as string[])[0] ?? "")
        : "",
      url: buildStreamUrl("movie", data.vodId, ext),
    };
  });

export const getSeriesDetail = createServerFn({ method: "GET" })
  .inputValidator((d: { seriesId: number }) => d)
  .handler(async ({ data }) => {
    const { xtreamApi, buildStreamUrl } = await import("./xtream.server");
    const res = await xtreamApi<{
      info?: Record<string, unknown>;
      episodes?: Record<
        string,
        Array<{
          id: string;
          episode_num: number;
          title: string;
          container_extension?: string;
          info?: { plot?: string; movie_image?: string; duration?: string };
        }>
      >;
    }>("get_series_info", { series_id: data.seriesId });
    const info = (res.info ?? {}) as Record<string, string>;
    const seasons = Object.entries(res.episodes ?? {})
      .map(([season, eps]) => ({
        season,
        episodes: (eps ?? []).map((e) => ({
          id: String(e.id),
          num: e.episode_num,
          title: e.title,
          plot: e.info?.plot ?? "",
          image: e.info?.movie_image ?? "",
          duration: e.info?.duration ?? "",
          url: buildStreamUrl("series", e.id, e.container_extension || "mp4"),
        })),
      }))
      .sort((a, b) => Number(a.season) - Number(b.season));
    return {
      id: data.seriesId,
      name: info["name"] || "",
      plot: info["plot"] || "",
      cast: info["cast"] || "",
      director: info["director"] || "",
      genre: info["genre"] || "",
      rating: info["rating"] || "",
      cover: info["cover"] || "",
      backdrop: Array.isArray(info["backdrop_path"])
        ? String((info["backdrop_path"] as unknown as string[])[0] ?? "")
        : "",
      seasons,
    };
  });

export const getLiveStreamUrl = createServerFn({ method: "GET" })
  .inputValidator((d: { streamId: number }) => d)
  .handler(async ({ data }) => {
    const { buildStreamUrl } = await import("./xtream.server");
    return { url: buildStreamUrl("live", data.streamId, "m3u8") };
  });
