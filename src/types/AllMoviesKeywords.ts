export type TypeAllMoviesKeywords = {
  results: ResultsAllMoviesKeywords[];
  page: number;
  total_pages: number;
  total_results: number;
}

export type ResultsAllMoviesKeywords = {
  id: number;
  poster_path: string;
  title: string;
  original_title: string;
  release_date: string;
  overview: string;
}