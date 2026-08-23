
export type SeriesSearch = {
  results: ResultsMoviesSearch[];
  page: number;
  total_pages: number;
  total_results: number;
}

export type ResultsMoviesSearch = {
  id: number;
  poster_path: string;
  vote_average: number;
  name: string;
  first_air_date: string;
}