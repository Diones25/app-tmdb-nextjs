
export type MovieReview = {
  id: number;
  author_details: AuthorDetails;
  url: string;
  content: string;
}

type AuthorDetails = {
  avatar_path: string;
  name: string;
  username: string;
  rating: number;
}