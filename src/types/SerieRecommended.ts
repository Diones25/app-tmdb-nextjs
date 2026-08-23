export type SerieRecommended = SerieRecommendedItem[];

export interface SerieRecommendedItem {
  id: number
  backdrop_path: string
  name: string
  vote_average: number
}