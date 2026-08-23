
export type MoviesUpcoming = {
  results: ResultsUpcoming[];
  page: number;
  total_pages: number;
  total_results: number;
}

export type ResultsUpcoming = {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
  release_date: string;
}