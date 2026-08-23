import Link from "@/components/SafeLink";

type Props = {
  poster_path: string;
  urlImage: string;
  urlName: string;
  name: string;
  star: string;
  vote_average: number | string;
  air_date: string;
  episode_count: number;
  overview: string;
}

const CardSeasonsDetails = ({ poster_path, urlImage,urlName, name, star, vote_average, air_date, episode_count, overview }: Props) => {
  return (
    <>
      <div className="container">
        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row items-center py-4">
          <div className="mr-5">
            <Link href={urlImage}>
              <img
                src={poster_path}
                className="max-w-[130px] max-h[195px] rounded-sm"
                alt="Poster da temporada"
              />            
            </Link>
          </div>

          <div>
            <div>
              <Link href={urlName}>
                <h1 className="text-center mt-2 sm:text-left sm:mt-0 md:text-left md:mt-0 lg:text-left lg:mt-0 text-black font-bold text-xl mr-2">{name}</h1>              
              </Link>              
              <div className="flex justify-center sm:justify-start md:justify-start lg:justify-start text-black mt-3 lg:mt-0">

                {vote_average ? (
                  <>
                    <div className="flex justify-center items-center bg-[#032541] rounded-sm text-white w-14 py-1 mr-2">
                      <img src={star} className="w-3 mr-1" alt="star" />
                      <span className="text-sm">{vote_average}</span>
                      <span className="text-[11px]">%</span>
                    </div>
                  </>
                ) : (
                  <p className="mr-2">--</p>
                )}
                <span>{air_date}</span>
                <span className="mx-1">.</span>
                <span>{episode_count} episódios</span>
              </div>
            </div>

            <div className="text-black">
              <p className="text-justify my-4 px-2 md:pr-2">
                {overview ? (
                  <>
                    {overview}
                  </>
                ) : (
                  <p>Sem descrição</p>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardSeasonsDetails
