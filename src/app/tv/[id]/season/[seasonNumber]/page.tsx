import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeriesSeasonsEpisodeDetails from "@/components/SeriesSeasonsEpisodeDetails";
import { getMediaTitle, getSeasonEpisodesPageData } from "@/lib/tmdb";

type Props = {
  params: Promise<{ id: string; seasonNumber: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, seasonNumber } = await params;
  const meta = await getMediaTitle(`/tv/${id}`);
  const name = meta ? meta.title : "Série";
  return {
    title: `${name} — Temporada ${seasonNumber}`,
    description: meta?.overview,
  };
}

export default async function SeasonEpisodesPage({ params }: Props) {
  const { id, seasonNumber } = await params;

  let data;
  try {
    data = await getSeasonEpisodesPageData(Number(id), Number(seasonNumber));
  } catch {
    notFound();
  }

  return <SeriesSeasonsEpisodeDetails data={data} />;
}
