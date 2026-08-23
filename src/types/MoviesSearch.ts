
export type MoviesSearch = {
  results: ResultsMoviesSearch[];
  page: number;
  total_pages: number;
  total_results: number;
}

export type ResultsMoviesSearch = {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
  release_date: string;
}