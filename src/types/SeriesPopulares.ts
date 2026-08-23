export type SeriesPopulares = {
  results: ResultsSeries[];
  page: number;
  total_pages: number;
  total_results: number;
}

export type ResultsSeries = {
  id: number;
  poster_path: string;
  vote_average: number;
  name: string;
  first_air_date: string;
}