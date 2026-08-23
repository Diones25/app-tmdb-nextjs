 
export type PersonsPopulares = {
  results: ResultsPerson[];
  page: number;
  total_pages: number;
  total_results: number;
}

export type ResultsPerson = {
  id: number;
  profile_path: string;
  name: string;
}