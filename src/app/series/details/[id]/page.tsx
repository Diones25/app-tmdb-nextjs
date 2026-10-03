import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMediaTitle, getSeriePageData } from "@/lib/tmdb";
import SeriesDetails from "@/components/pages/SeriesDetails";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const meta = await getMediaTitle(`/tv/${id}`);
  return meta
    ? { title: meta.title, description: meta.overview }
    : { title: "Série não encontrada" };
}

export default async function SeriesDetailsPage({ params }: Props) {
  const { id } = await params;

  let data;
  try {
    data = await getSeriePageData(Number(id));
  } catch {
    notFound();
  }

  return <SeriesDetails data={data} />;
}
