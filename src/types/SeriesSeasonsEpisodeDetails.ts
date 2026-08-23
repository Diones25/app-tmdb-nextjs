export interface SeriesSeasonsEpisodeDetails {
  air_date: string
  episodes: Episode[]
  name: string
  poster_path: string
}

export interface Episode {
  air_date: string
  episode_number: number
  id: number
  name: string
  overview: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
  vote_average: number
}