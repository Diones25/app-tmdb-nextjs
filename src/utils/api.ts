import { ResultsAllMoviesKeywords, TypeAllMoviesKeywords } from "@/types/AllMoviesKeywords";
import { Channel } from "@/types/Channel";
import { ExternalId } from "@/types/ExternalId";
import { FilePath } from "@/types/FilePath";
import { Key } from "@/types/Key";
import { Keyword } from "@/types/Keyword";
import { KeywordSerie } from "@/types/KeywordSerie";
import { MovieCredits, MovieCreditsArray } from "@/types/MovieCredits";
import { Genre, MovieDetail } from "@/types/MovieDetail";
import { MovieRecommended, MovieRecommendedItem } from "@/types/MovieRecommended";
import { MoviesPopulares, Results } from "@/types/MoviesPopulares";
import { MoviesSearch, ResultsMoviesSearch } from "@/types/MoviesSearch";
import { MoviesUpcoming, ResultsUpcoming } from "@/types/MoviesUpcoming";
import { PersonCredits, PersonCreditsItem } from "@/types/PersonCredits";
import { TypePersonDetails } from "@/types/PersonDetails";
import { PersonExternalIDs } from "@/types/PersonExternalIDs";
import { PersonsPopulares, ResultsPerson } from "@/types/PersonsPopulares";
import { SerieCredits, SerieCreditsItem } from "@/types/SerieCredits";
import { SerieDetails } from "@/types/SerieDetails";
import { SerieRecommended, SerieRecommendedItem } from "@/types/SerieRecommended";
import { SerieSeasonsDetails } from "@/types/SerieSeasonsDetails";
import { ResultsSeries, SeriesPopulares } from "@/types/SeriesPopulares";
import { SeriesSearch } from "@/types/SeriesSearch";
import { SeriesSeasonsEpisodeDetails } from "@/types/SeriesSeasonsEpisodeDetails";
import axios from "axios";


const api = axios.create({
  baseURL: "/api/tmdb",
  params: {
    language: "pt-BR"
  }
});

export const getAllChannels = async (): Promise<Channel> => {
  const response = await axios.get(`https://reidosembeds.online/api/channels`);
  return response.data;
}

export const getSerachMovies = async (query: string, page: number): Promise<MoviesSearch> => {
  const response = await api.get(`/search/movie?query=${query}&page=${page}`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: ResultsMoviesSearch) => {
          return {
            id: item.id,
            poster_path: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`,
            vote_average: item.vote_average,
            title: item.title,
            release_date: item.release_date
          }
        }),
        page: parsedData.page,
        total_pages: parsedData.total_pages,
        total_results: parsedData.total_results,
      }
    }]
  });

  return response.data;
}

export const getMoviesPopulares = async (page: number): Promise<MoviesPopulares> => {
  const response = await api.get(`/movie/popular?page=${page}`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: Results) => {
          return {
            id: item.id,
            poster_path: item.poster_path,
            vote_average: item.vote_average,
            title: item.title,
            release_date: item.release_date
          }
        }),
        page: parsedData.page,
        total_pages: parsedData.total_pages,
        total_results: parsedData.total_results,
      }
    }]
  });
  return response.data;
}

export const getMovieDetails = async (id: number): Promise<MovieDetail> => {
  const response = await api.get(`/movie/${id}`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        id: parsedData.id,
        title: parsedData.title,
        backdrop_path: parsedData.backdrop_path,
        poster_path: parsedData.poster_path,
        release_date: parsedData.release_date,
        runtime: parsedData.runtime,
        vote_average: parsedData.vote_average,
        tagline: parsedData.tagline,
        overview: parsedData.overview,
        original_title: parsedData.original_title,
        status: parsedData.status,
        original_language: parsedData.original_language,
        budget: parsedData.budget,
        revenue: parsedData.revenue,
        genres: parsedData.genres.map((item: Genre) => item.name)
      }
    }]
  });
  return response.data;
}

export const getMovieDetailsVideos = async (id: number): Promise<Key[]> => {
  const response = await api.get(`/movie/${id}/videos`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: Key) => {
          return {
            key: item.key
          }
        }),
      }
    }]
  });
  return response.data.results;
}

export const getMovieDetailsVideoTrailer = async (id: number): Promise<Key> => {
  const response = await api.get(`/movie/${id}/videos`);

  const data = {
    key: response.data.results[0].key
  }

  return data
}

export const getMovieDetailsImages = async (id: number): Promise<FilePath[]> => {
  const response = await api.get(`/movie/${id}/images`);
  return response.data.backdrops.map((item: FilePath) => {
    return {
      file_path: item.file_path
    }
  });
}

export const getMovieRecommended = async (id: number): Promise<MovieRecommended> => {
  const response = await api.get(`/movie/${id}/recommendations`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: MovieRecommendedItem) => {
          return {
            id: item.id,
            backdrop_path: item.backdrop_path,
            title: item.title,
            vote_average: item.vote_average
          }
        })
      }
    }]
  });
  return response.data.results;
}

export const getMovieCredits = async (id: number): Promise<MovieCreditsArray> => {
  const response = await api.get(`/movie/${id}/credits`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.cast.map((item: MovieCredits) => {
          return {
            id: item.id,
            profile_path: item.profile_path,
            name: item.name,
            character: item.character
          }
        })
      }
    }]
  });
  return response.data.results;
}

export const getMovieExternalIds = async (id: number): Promise<ExternalId> => {
  const response = await api.get(`/movie/${id}/external_ids`);
  return response.data;
}

export const getMovieKeywords = async (id: number): Promise<Keyword> => {
  const response = await api.get(`/movie/${id}/keywords`);
  return response.data;
}

export const getAllMoviesKeywords = async (id: number, page: number = 1): Promise<TypeAllMoviesKeywords> => {
  const response = await api.get(`/keyword/${id}/movies?page=${page}`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: ResultsAllMoviesKeywords) => {
          return {
            id: item.id,
            poster_path: `https://media.themoviedb.org/t/p/w94_and_h141_bestv2/${item.poster_path}`,
            title: item.title,
            original_title: item.original_title,
            release_date: item.release_date,
            overview: item.overview
          }
        }),
        page: parsedData.page,
        total_pages: parsedData.total_pages,
        total_results: parsedData.total_results,
      }
    }]
  });
  return response.data;
}

export const geMoviesUpcoming = async (page: number): Promise<MoviesUpcoming> => {
  const response = await api.get(`/movie/upcoming?page=${page}`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: ResultsUpcoming) => {
          return {
            id: item.id,
            poster_path: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`,
            vote_average: Number(item.vote_average),
            title: item.title,
            release_date: item.release_date
          }
        }),
        page: parsedData.page,
        total_pages: parsedData.total_pages,
        total_results: parsedData.total_results,
      }
    }]
  });
  return response.data;
}

export const getMovieReviews = async (id: number): Promise<any> => {
  const response = await api.get(`/movie/${id}/reviews`);
  return response.data;
}

export const getSeriesPopulares = async (page: number): Promise<SeriesPopulares> => {
  const response = await api.get(`/tv/popular?page=${page}`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: ResultsSeries) => {
          return {
            id: item.id,
            poster_path: item.poster_path,
            vote_average: item.vote_average,
            name: item.name,
            first_air_date: item.first_air_date
          }
        }),
        page: parsedData.page,
        total_pages: parsedData.total_pages,
        total_results: parsedData.total_results,
      }
    }]
  });

  return response.data;
}

export const getSerachSeries = async (query: string, page: number): Promise<SeriesSearch> => {
  const response = await api.get(`/search/tv?query=${query}&page=${page}`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: ResultsSeries) => {
          return {
            id: item.id,
            poster_path: item.poster_path,
            vote_average: item.vote_average,
            name: item.name,
            first_air_date: item.first_air_date
          }
        }),
        page: parsedData.page,
        total_pages: parsedData.total_pages,
        total_results: parsedData.total_results,
      }
    }]
  });

  return response.data;
}

export const getSeriesDetails = async (id: number): Promise<SerieDetails> => {
  const response = await api.get(`/tv/${id}`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      const currentYear = new Date().getFullYear();
      const seasonsCurrentYear = parsedData.seasons.filter((season: { air_date: string | number | Date; }) => {
        return season.air_date && new Date(season.air_date).getFullYear() === currentYear;
      });

      const seasons = seasonsCurrentYear;

      return {
        id: parsedData.id,
        backdrop_path: parsedData.backdrop_path,
        first_air_date: parsedData.first_air_date,
        genres: parsedData.genres.map((item: Genre) => item.name),
        homepage: parsedData.homepage,
        in_production: parsedData.in_production,
        last_air_date: parsedData.last_air_date,
        last_episode_to_air: parsedData.last_episode_to_air,
        name: parsedData.name,
        next_episode_to_air: parsedData.next_episode_to_air,
        networks: parsedData.networks,
        original_language: parsedData.original_language,
        original_name: parsedData.original_name,
        overview: parsedData.overview,
        poster_path: parsedData.poster_path,
        seasons: seasons,
        status: parsedData.status,
        tagline: parsedData.tagline,
        type: parsedData.type,
        vote_average: parsedData.vote_average
      }
    }]
  });

  return response.data;
}

export const getSeriesSeasonsDetails = async (id: number): Promise<SerieSeasonsDetails> => {
  const response = await api.get(`/tv/${id}`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        first_air_date: parsedData.first_air_date,
        name: parsedData.name,
        poster_path: parsedData.poster_path,
        seasons: parsedData.seasons
      }
    }]
  });

  return response.data;
}

export const getSerieDetailsVideos = async (id: number): Promise<Key[]> => {
  const response = await api.get(`/tv/${id}/videos`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: Key) => {
          return {
            key: item.key
          }
        }),
      }
    }]
  });
  return response.data.results;
}

export const getSerieDetailsVideoTrailer = async (id: number): Promise<Key> => {
  const response = await api.get(`/tv/${id}/videos`);

  const data = {
    key: response.data.results[1].key
  }

  return data
}

export const getSerieDetailsImages = async (id: number): Promise<FilePath[]> => {
  const response = await api.get(`/tv/${id}/images`);
  return response.data.backdrops.map((item: FilePath) => {
    return {
      file_path: item.file_path
    }
  });
}

export const getSerieRecommended = async (id: number): Promise<SerieRecommended> => {
  const response = await api.get(`/tv/${id}/recommendations`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: SerieRecommendedItem) => {
          return {
            id: item.id,
            backdrop_path: item.backdrop_path,
            name: item.name,
            vote_average: item.vote_average
          }
        })
      }
    }]
  });
  return response.data.results;
}

export const getSerieCredits = async (id: number): Promise<SerieCredits> => {
  const response = await api.get(`/tv/${id}/credits`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.cast.map((item: SerieCreditsItem) => {
          return {
            id: item.id,
            profile_path: item.profile_path,
            name: item.name,
            character: item.character
          }
        })
      }
    }]
  });
  return response.data.results;
}

export const getSerieKeywords = async (id: number): Promise<KeywordSerie> => {
  const response = await api.get(`/tv/${id}/keywords`);
  return response.data;
}

export const getSerieExternalIds = async (id: number): Promise<ExternalId> => {
  const response = await api.get(`/tv/${id}/external_ids`);
  return response.data;
}

export const getSeriesSeasonsEpisodeDetails = async (series_id: number, season_number: number): Promise<SeriesSeasonsEpisodeDetails> => {
  const response = await api.get(`/tv/${series_id}/season/${season_number}`, {
    transformResponse: [function (data) {
      const parsedData: SeriesSeasonsEpisodeDetails = JSON.parse(data);

      return {
        air_date: parsedData.air_date,
        episodes: parsedData.episodes,
        name: parsedData.name,
        poster_path: parsedData.poster_path
      }
    }]
  });

  return response.data;
}

export const getPersonsPopulares = async (page: number): Promise<PersonsPopulares> => {
  const response = await api.get(`/person/popular?page=${page}`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.results.map((item: ResultsPerson) => {
          return {
            id: item.id,
            profile_path: item.profile_path,
            name: item.name
          }
        }),
        page: parsedData.page,
        total_pages: parsedData.total_pages,
        total_results: parsedData.total_results,
      }
    }]
  });
  return response.data;
}

export const getPersonDetails = async (id: number): Promise<TypePersonDetails> => {
  const response = await api.get(`/person/${id}`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        id: parsedData.id,
        profile_path: parsedData.profile_path,
        name: parsedData.name,
        biography: parsedData.biography,
        known_for_department: parsedData.known_for_department,
        gender: parsedData.gender,
        birthday: parsedData.birthday,
        place_of_birth: parsedData.place_of_birth,
      }
    }]
  });

  return response.data;
}

export const getPersonCredits = async (id: number): Promise<PersonCredits> => {
  const response = await api.get(`/person/${id}/movie_credits`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        results: parsedData.cast.map((item: PersonCreditsItem) => {
          return {
            id: item.id,
            poster_path: item.poster_path,
            title: item.title
          }
        })
      }
    }]
  });

  return response.data.results;
}

export const getPersonExternalIDs = async (id: number): Promise<PersonExternalIDs> => {
  const response = await api.get(`/person/${id}/external_ids`, {
    transformResponse: [function (data) {
      const parsedData = JSON.parse(data);

      return {
        id: parsedData.id,
        facebook_id: parsedData.facebook_id,
        twitter_id: parsedData.twitter_id,
        instagram_id: parsedData.instagram_id
      }
    }]
  });
  return response.data;
}
