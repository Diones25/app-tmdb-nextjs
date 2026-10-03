import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getMediaTitle, getPersonPageData } from "@/lib/tmdb";
import PersonDetails from "@/components/pages/PersonDetails";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const meta = await getMediaTitle(`/person/${id}`);
  return meta
    ? { title: meta.title, description: meta.overview }
    : { title: "Pessoa não encontrada" };
}

export default async function PersonDetailsPage({ params }: Props) {
  const { id } = await params;

  let data;
  try {
    data = await getPersonPageData(Number(id));
  } catch {
    notFound();
  }

  return <PersonDetails data={data} />;
}
