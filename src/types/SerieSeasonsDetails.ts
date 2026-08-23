export interface SerieSeasonsDetails {
  first_air_date: string
  name: string
  poster_path: string
  seasons: Season[]
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