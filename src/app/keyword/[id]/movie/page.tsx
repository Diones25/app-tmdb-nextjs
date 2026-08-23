import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AllMoviesKeywords from "@/components/AllMoviesKeywords";
import { getMediaTitle, getKeywordMoviesPage } from "@/lib/tmdb";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const meta = await getMediaTitle(`/keyword/${id}`);
  return {
    title: meta ? `Filmes: ${meta.title}` : "Filmes por palavra-chave",
  };
}

export default async function KeywordMoviesPage({ params }: Props) {
  const { id } = await params;

  let data;
  try {
    data = await getKeywordMoviesPage(Number(id), 1);
  } catch {
    notFound();
  }

  return <AllMoviesKeywords keywordId={Number(id)} initialData={data} />;
}
