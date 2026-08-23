"use client";

import Link from "@/components/SafeLink";
const imageNotFound = "/assets/imageNotFound.png";
const arrowLeft = "/assets/arrowLeft.svg";
const star = "/assets/star.svg";
import { formateDuration, formateYear } from '@/lib/utils';
import CardSeasonsEpisodeDetails from './CardSeasonsEpisodeDetails';
import type { SeasonEpisodesPageData } from "@/lib/tmdb";

type Props = { data: SeasonEpisodesPageData };

function SeriesSeasonsEpisodeDetails({ data }: Props) {
  const { seriesId, seasonNumber, name, poster_path, air_date, episodes, imdbId } = data;

  return (
    <>

      <div className="min-h-screen mt-3 ">
        <div className="bg-gray-300 mt-6">
          <div className="container">
            <div className="flex items-center py-4">
              <div className="mr-5">
                <img
                  src={poster_path ? `https://media.themoviedb.org/t/p/w58_and_h87_face${poster_path}` : imageNotFound}
                  className="rounded-[3px]"
                  alt="Poster da serie"
                />
              </div>

              <div>
                <div className="flex">
                  <h1 className="text-black font-bold text-3xl mr-2">{name}</h1>
                  <h1 className="text-black font-semibold text-3xl">({formateYear(air_date)})</h1>
                </div>

                <Link href={`/tv/${seriesId}/seasons`}>
                  <div className='flex items-center cursor-pointer'>
                    <img
                      src={arrowLeft}
                      className='mr-2 w-3'
                      alt="arrow left"
                    />
                    <span className="text-gray-600 font-semibold hover:text-gray-400">Voltar à lista de temporadas</span>
                  </div>
                </Link>

              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <h1 className="text-black font-bold text-2xl mt-6 mb-3">Episódios <span className='font-normal text-gray-500'>{episodes.length}</span></h1>
        </div>

        {episodes.length > 0 ? (
          <>
            {episodes.map((item) => (
              <div key={item.id}>
                <CardSeasonsEpisodeDetails
                  still_path={item.still_path ? `https://media.themoviedb.org/t/p/w227_and_h127_bestv2${item.still_path}` : imageNotFound}
                  name={item.name}
                  star={star}
                  vote_average={item.vote_average ? (item.vote_average * 10).toFixed(0) : "0"}
                  air_date={item.air_date ? formateYear(item.air_date) : "--"}
                  runtime={formateDuration(String(item.runtime))}
                  overview={item.overview}
                  imdb={imdbId ?? undefined}
                  season_number={item.season_number}
                  episode_number={item.episode_number}
                  series_id={String(seriesId)}
                />
              </div>
            ))}
          </>
        ) : (
          <p></p>
        )}
      </div> 

    </>
  )
}

export default SeriesSeasonsEpisodeDetails
