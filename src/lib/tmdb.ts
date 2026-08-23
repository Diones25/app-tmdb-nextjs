import "server-only";
import axios from "axios";
import type { ExternalId } from "@/types/ExternalId";
import type { Keyword } from "@/types/Keyword";
import type { MovieReview } from "@/types/MovieReview";
import type { TypeAllMoviesKeywords } from "@/types/AllMoviesKeywords";

const BASE_URL = "https://api.themoviedb.org/3";

const cleanEnv = (value: string | undefined): string =>
  (value ?? "").trim().replace(/^"+|"+$/g, "");

type TitleLike = {
  title?: string;
  name?: string;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
};

type RawGenre = { id: number; name: string };

type RawMovieDetails = TitleLike & {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
  tagline: string;
  original_title: string;
  status: string;
  original_language: string;
  budget: number;
  revenue: number;
  genres: RawGenre[];
};

type RawVideo = { key: string };
type RawBackdrop = { file_path: string };
type VideoItem = { key: string };
type ImageItem = { file_path: string };
type RawCastMember = {
  id: number;
  profile_path: string | null;
  name: string;
  character: string;
};
type RawRecommendedItem = {
  id: number;
  backdrop_path: string | null;
  title: string;
  vote_average: number;
};

export type MoviePageCredit = RawCastMember;
export type MoviePageRecommendedItem = RawRecommendedItem;

export type MoviePageData = {
  movie: {
    id: number;
    title: string;
    backdrop_path: string | null;
    poster_path: string | null;
    release_date: string;
    runtime: number;
    vote_average: number;
    tagline: string;
    overview: string;
    original_title: string;
    status: string;
    original_language: string;
    budget: number;
    revenue: number;
    genres: string[];
  };
  videos: VideoItem[];
  trailerKey: string | null;
  images: ImageItem[];
  credits: MoviePageCredit[];
  externalIds: Partial<ExternalId>;
  keywords: Keyword;
  recommended: MoviePageRecommendedItem[];
  reviews: MovieReview[];
};

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export async function tmdb<T>(path: string): Promise<T> {
  const token = cleanEnv(process.env.TMDB_TOKEN);

  if (!token) {
    throw new Error("TMDB_TOKEN não configurado nas variáveis de ambiente");
  }

  const res = await axios.get<T>(`${BASE_URL}${path}`, {
    params: { language: "pt-BR", api_key: cleanEnv(process.env.TMDB_API_KEY) },
    headers: { Authorization: token },
  });

  return res.data;
}

export async function getMediaTitle(
  path: string
): Promise<{ title: string; overview: string } | null> {
  try {
    const data = await tmdb<TitleLike>(path);
    const rawTitle = data.title ?? data.name ?? "Detalhe";
    const year = (data.release_date ?? data.first_air_date ?? "").slice(0, 4);
    return {
      title: year ? `${rawTitle} (${year})` : rawTitle,
      overview: data.overview ?? "",
    };
  } catch {
    return null;
  }
}

export async function getMoviePageData(id: number): Promise<MoviePageData> {
  const details = await tmdb<RawMovieDetails>(`/movie/${id}`);

  const [videosRaw, imagesRaw, creditsRaw, recommendedRaw, reviewsRaw] =
    await Promise.all([
      safe(() => tmdb<{ results?: RawVideo[] }>(`/movie/${id}/videos`), {}),
      safe(
        () => tmdb<{ backdrops?: RawBackdrop[] }>(`/movie/${id}/images`),
        {}
      ),
      safe(() => tmdb<{ cast?: RawCastMember[] }>(`/movie/${id}/credits`), {}),
      safe(
        () =>
          tmdb<{ results?: RawRecommendedItem[] }>(
            `/movie/${id}/recommendations`
          ),
        {}
      ),
      safe(
        () => tmdb<{ results?: MovieReview[] }>(`/movie/${id}/reviews`),
        {}
      ),
    ]);

  const externalIds = await safe<Partial<ExternalId>>(
    () => tmdb<ExternalId>(`/movie/${id}/external_ids`),
    {}
  );
  const keywords = await safe<Keyword>(
    () => tmdb<Keyword>(`/movie/${id}/keywords`),
    { keywords: [] }
  );

  const videoResults = videosRaw.results ?? [];

  return {
    movie: {
      id: details.id,
      title: details.title,
      backdrop_path: details.backdrop_path,
      poster_path: details.poster_path,
      release_date: details.release_date,
      runtime: details.runtime,
      vote_average: details.vote_average,
      tagline: details.tagline,
      overview: details.overview ?? "",
      original_title: details.original_title,
      status: details.status,
      original_language: details.original_language,
      budget: details.budget,
      revenue: details.revenue,
      genres: (details.genres ?? []).map((genre) => genre.name),
    },
    videos: videoResults.map((video) => ({ key: video.key })),
    trailerKey: videoResults[0]?.key ?? null,
    images: (imagesRaw.backdrops ?? []).map((backdrop) => ({
      file_path: backdrop.file_path,
    })),
    credits: creditsRaw.cast ?? [],
    externalIds,
    keywords,
    recommended: recommendedRaw.results ?? [],
    reviews: reviewsRaw.results ?? [],
  };
}

type SerieNextEpisode = {
  name?: string | null;
  season_number?: number | null;
  episode_number?: number | null;
  air_date?: string | null;
};

type RawSeason = {
  id: number;
  name: string;
  poster_path: string | null;
  vote_average: number;
  air_date: string;
  episode_count: number;
  overview: string;
  season_number: number;
};

type RawTvDetails = {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  original_name: string;
  overview: string;
  homepage: string;
  status: string;
  tagline: string;
  type: string;
  original_language: string;
  vote_average: number;
  genres: RawGenre[];
  networks: { logo_path: string | null }[];
  next_episode_to_air: SerieNextEpisode | null;
  seasons: RawSeason[];
};

export type SeriePageData = {
  serie: {
    id: number;
    backdrop_path: string | null;
    poster_path: string | null;
    first_air_date: string;
    name: string;
    original_name: string;
    overview: string;
    homepage: string;
    status: string;
    tagline: string;
    type: string;
    original_language: string;
    vote_average: number;
    genres: string[];
    networks: { logo_path: string | null }[];
    next_episode_to_air: SerieNextEpisode | null;
    seasons: RawSeason[];
  };
  videos: VideoItem[];
  trailerKey: string | null;
  images: ImageItem[];
  credits: MoviePageCredit[];
  externalIds: Partial<ExternalId>;
  keywords: { id: number; name: string }[];
  recommended: { id: number; backdrop_path: string | null; name: string; vote_average: number }[];
};

export type SeasonsPageData = {
  id: number;
  name: string;
  poster_path: string | null;
  first_air_date: string;
  seasons: RawSeason[];
};

export type EpisodeItem = {
  id: number;
  name: string;
  still_path: string | null;
  vote_average: number;
  air_date: string;
  runtime: number;
  overview: string;
  season_number: number;
  episode_number: number;
};

export type SeasonEpisodesPageData = {
  seriesId: number;
  seasonNumber: number;
  name: string;
  poster_path: string | null;
  air_date: string;
  episodes: EpisodeItem[];
  imdbId: string | null;
};

export type PersonPageData = {
  person: {
    id: number;
    profile_path: string | null;
    name: string;
    biography: string;
    known_for_department: string;
    gender: number;
    birthday: string | null;
    place_of_birth: string;
  };
  credits: { id: number; poster_path: string | null; title: string }[];
  externalIds: {
    facebook_id?: string | null;
    twitter_id?: string | null;
    instagram_id?: string | null;
  };
};

export async function getSeriePageData(id: number): Promise<SeriePageData> {
  const details = await tmdb<RawTvDetails>(`/tv/${id}`);

  const [videosRaw, imagesRaw, creditsRaw, recommendedRaw] = await Promise.all([
    safe(() => tmdb<{ results?: RawVideo[] }>(`/tv/${id}/videos`), {}),
    safe(() => tmdb<{ backdrops?: RawBackdrop[] }>(`/tv/${id}/images`), {}),
    safe(() => tmdb<{ cast?: RawCastMember[] }>(`/tv/${id}/credits`), {}),
    safe(
      () =>
        tmdb<{
          results?: { id: number; backdrop_path: string | null; name: string; vote_average: number }[];
        }>(`/tv/${id}/recommendations`),
      {}
    ),
  ]);

  const externalIds = await safe<Partial<ExternalId>>(
    () => tmdb<ExternalId>(`/tv/${id}/external_ids`),
    {}
  );
  const keywordsRaw = await safe<{ results?: { id: number; name: string }[] }>(
    () => tmdb<{ results?: { id: number; name: string }[] }>(`/tv/${id}/keywords`),
    {}
  );

  const videoResults = videosRaw.results ?? [];
  const currentYear = new Date().getFullYear();

  return {
    serie: {
      id: details.id,
      backdrop_path: details.backdrop_path,
      poster_path: details.poster_path,
      first_air_date: details.first_air_date,
      name: details.name,
      original_name: details.original_name,
      overview: details.overview,
      homepage: details.homepage ?? "",
      status: details.status,
      tagline: details.tagline,
      type: details.type,
      original_language: details.original_language,
      vote_average: details.vote_average,
      genres: (details.genres ?? []).map((genre) => genre.name),
      networks: details.networks ?? [],
      next_episode_to_air: details.next_episode_to_air ?? null,
      seasons: (details.seasons ?? []).filter(
        (season) =>
          season.air_date && new Date(season.air_date).getFullYear() === currentYear
      ),
    },
    videos: videoResults.map((video) => ({ key: video.key })),
    trailerKey: videoResults[1]?.key ?? null,
    images: (imagesRaw.backdrops ?? []).map((backdrop) => ({
      file_path: backdrop.file_path,
    })),
    credits: creditsRaw.cast ?? [],
    externalIds,
    keywords: keywordsRaw.results ?? [],
    recommended: recommendedRaw.results ?? [],
  };
}

export async function getSeasonsPageData(id: number): Promise<SeasonsPageData> {
  const details = await tmdb<RawTvDetails>(`/tv/${id}`);

  return {
    id: details.id,
    name: details.name,
    poster_path: details.poster_path,
    first_air_date: details.first_air_date,
    seasons: details.seasons ?? [],
  };
}

export async function getSeasonEpisodesPageData(
  seriesId: number,
  seasonNumber: number
): Promise<SeasonEpisodesPageData> {
  const season = await tmdb<{
    name: string;
    poster_path: string | null;
    air_date: string;
    episodes: EpisodeItem[];
  }>(`/tv/${seriesId}/season/${seasonNumber}`);

  const externalIds = await safe<Partial<ExternalId>>(
    () => tmdb<ExternalId>(`/tv/${seriesId}/external_ids`),
    {}
  );

  return {
    seriesId,
    seasonNumber,
    name: season.name,
    poster_path: season.poster_path,
    air_date: season.air_date,
    episodes: season.episodes ?? [],
    imdbId: externalIds.imdb_id ?? null,
  };
}

export async function getPersonPageData(id: number): Promise<PersonPageData> {
  const person = await tmdb<{
    id: number;
    profile_path: string | null;
    name: string;
    biography: string;
    known_for_department: string;
    gender: number;
    birthday: string | null;
    place_of_birth: string;
  }>(`/person/${id}`);

  const creditsRaw = await safe<{ cast?: { id: number; poster_path: string | null; title: string }[] }>(
    () => tmdb<{ cast?: { id: number; poster_path: string | null; title: string }[] }>(
      `/person/${id}/movie_credits`
    ),
    {}
  );
  const externalIds = await safe<PersonPageData["externalIds"]>(
    () =>
      tmdb<{ facebook_id?: string | null; twitter_id?: string | null; instagram_id?: string | null }>(
        `/person/${id}/external_ids`
      ),
    {}
  );

  return {
    person: {
      id: person.id,
      profile_path: person.profile_path,
      name: person.name,
      biography: person.biography ?? "",
      known_for_department: person.known_for_department ?? "",
      gender: Number(person.gender ?? 0),
      birthday: person.birthday,
      place_of_birth: person.place_of_birth ?? "",
    },
    credits: creditsRaw.cast ?? [],
    externalIds,
  };
}

export async function getKeywordMoviesPage(
  keywordId: number,
  page: number
): Promise<TypeAllMoviesKeywords> {
  const raw = await tmdb<{
    page: number;
    total_pages: number;
    total_results: number;
    results?: {
      id: number;
      poster_path: string | null;
      title: string;
      original_title: string;
      release_date: string;
      overview: string;
    }[];
  }>(`/keyword/${keywordId}/movies?page=${page}`);

  return {
    results: (raw.results ?? []).map((item) => ({
      id: item.id,
      poster_path: item.poster_path
        ? `https://www.themoviedb.org/t/p/w94_and_h141_bestv2${item.poster_path}`
        : "",
      title: item.title,
      original_title: item.original_title,
      release_date: item.release_date,
      overview: item.overview,
    })),
    page: raw.page,
    total_pages: raw.total_pages,
    total_results: raw.total_results,
  };
}
