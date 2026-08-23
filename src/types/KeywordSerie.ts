export type KeywordSerie = {
  id?: number;
  results: Results[];
}

type Results = {
  id: number;
  name: string;
}