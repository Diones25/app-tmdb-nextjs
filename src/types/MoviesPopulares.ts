
export type MoviesPopulares = {
  results: Results[];
  page: number;
  total_pages: number;
  total_results: number;
}

export type Results = {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
  release_date: string;
}