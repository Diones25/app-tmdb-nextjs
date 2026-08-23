export type MovieDetail = {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string | any;
  runtime: string | any;
  vote_average: number;
  tagline: string;
  overview: string;
  original_title: string;
  status: string;
  original_language: string;
  budget: string;
  revenue: string;
  genres: string[]
}

export type Genre = {
  name: string;
}