import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getMediaTitle, getMoviePageData } from "@/lib/tmdb";
import MoviesDetails from "@/components/pages/MoviesDetails";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const meta = await getMediaTitle(`/movie/${id}`);
  return meta
    ? { title: meta.title, description: meta.overview }
    : { title: "Filme não encontrado" };
}

export default async function MovieDetailsPage({ params }: Props) {
  const { id } = await params;

  let data;
  try {
    data = await getMoviePageData(Number(id));
  } catch {
    notFound();
  }

  return <MoviesDetails data={data} />;
}
