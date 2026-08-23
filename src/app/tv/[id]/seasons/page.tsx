import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeriesSeasonsDetails from "@/components/SeriesSeasonsDetails";
import { getMediaTitle, getSeasonsPageData } from "@/lib/tmdb";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const meta = await getMediaTitle(`/tv/${id}`);
  const name = meta ? meta.title : "Série";
  return {
    title: `${name} — Temporadas`,
    description: meta?.overview,
  };
}

export default async function SeriesSeasonsPage({ params }: Props) {
  const { id } = await params;

  let data;
  try {
    data = await getSeasonsPageData(Number(id));
  } catch {
    notFound();
  }

  return <SeriesSeasonsDetails data={data} />;
}
