export type MovieRecommended = MovieRecommendedItem[];

export interface MovieRecommendedItem {
  id: number
  backdrop_path: string
  title: string
  vote_average: number
}