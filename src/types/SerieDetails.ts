export interface SerieDetails {
  id: number
  backdrop_path: string
  first_air_date: string
  genres: Genre[]
  homepage: string
  in_production: boolean
  last_air_date: string
  last_episode_to_air: LastEpisodeToAir
  name: string
  next_episode_to_air: NextEpisodeToAir
  networks: Network[]
  original_language: string
  original_name: string
  overview: string
  poster_path: string
  seasons: Season[]
  status: string
  tagline: string
  type: string
  vote_average: number
}

export interface Genre {
  id: number
  name: string
}

export interface LastEpisodeToAir {
  id: number
  name: string
  overview: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
}

export interface NextEpisodeToAir {
  id: number
  name: string
  overview: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: any
  season_number: number
  show_id: number
  still_path: any
}

export interface Network {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface Season {
  air_date?: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path?: string
  season_number: number
  vote_average: number
}