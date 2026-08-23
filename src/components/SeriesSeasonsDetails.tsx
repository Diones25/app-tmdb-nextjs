"use client";

import Link from "@/components/SafeLink";
import {
  formateYear,
} from '@/lib/utils';
const imageNotFound = "/assets/imageNotFound.png";
const star = "/assets/star.svg";
const arrowLeft = "/assets/arrowLeft.svg";
import CardSeasonsDetails from './CardSeasonsDetails';
import type { SeasonsPageData } from "@/lib/tmdb";

type Props = { data: SeasonsPageData };

const SeriesSeasonsDetails = ({ data }: Props) => {
  const { id, name, poster_path, first_air_date, seasons } = data;

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
                  <h1 className="text-black font-bold text-3xl mr-2">{ name }</h1>
                  <h1 className="text-black font-semibold text-3xl">({formateYear(first_air_date)})</h1>
                </div>

                <Link href={`/series/details/${id}`}>
                  <div className='flex items-center cursor-pointer'>
                    <img
                      src={arrowLeft}
                      className='mr-2 w-3'
                      alt="arrow left"
                    />
                    <span className="text-gray-600 font-semibold hover:text-gray-400">Voltar ao início</span>
                  </div>                
                </Link>

              </div>
            </div>
          </div>
        </div>


        {seasons.length > 0 ? (
          <>
            {seasons.map((item) => (
              <div key={item.id}>
                <CardSeasonsDetails
                  poster_path={item.poster_path ? `https://media.themoviedb.org/t/p/w130_and_h195_bestv2${item.poster_path}` : imageNotFound}
                  urlImage={`/tv/${id}/season/${item.season_number}`}
                  urlName={`/tv/${id}/season/${item.season_number}`}
                  name={item.name}
                  star={star}
                  vote_average={item.vote_average ? (item.vote_average * 10).toFixed(0) : "0"}
                  air_date={item.air_date ? formateYear(item.air_date) : "--"}
                  episode_count={item.episode_count}
                  overview={item.overview}
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

export default SeriesSeasonsDetails;
