"use client";

import { Play } from "lucide-react";
import CardImage from "../CardImage";
import VoteAveregeItem from "../VoteAveregeItem";
import Link from "@/components/SafeLink";
import { formateDate, formateDateDetails, formateYear } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import CardPersonMovieDetail from "../CardPersonMovieDetail";
import ScrollableCarousel from "../ScrollableCarousel";
const svgFacebook = "/assets/facebook.svg";
const svgTwitter = "/assets/twitter.svg";
const svgInstagram = "/assets/instagram.svg";
const svgIMDB = "/assets/imdb.svg";
const link_HomePage = "/assets/link_HomePage.svg";
const star = "/assets/star.svg";
const calender = "/assets/calender.svg";
const noVideoAvaible = "/assets/no-video-available.jpg";
const imageNotFound = "/assets/imageNotFound.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import MoviesRecommended from "../MoviesRecommended";
import type { SeriePageData } from "@/lib/tmdb";

type Props = { data: SeriePageData };

const SeriesDetails = ({ data }: Props) => {
  const { serie, videos, trailerKey, images, credits, externalIds, keywords, recommended } = data;

  return (
    <>

      <div className="min-h-screen mt-3 text-white">
        <div
          style={{
            backgroundImage: `url(${`https://image.tmdb.org/t/p/w1920_and_h800_face/`}.${serie.backdrop_path})`,
          }}        
          className="bg-no-repeat bg-cover bg-center"
        >
          <div className='bg-[rgba(0,0,0,0.6)] py-6'>
            <div className="container">                          
              <div className="flex flex-col lg:flex-row items-center py-7">
                <CardImage
                  poster_path={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${serie.poster_path}`}                  
                /> 

                <div className="ml-9 mt-3 text-center lg:text-left">
                  <h2 className="text-white text-4xl font-bold">{serie.original_name}<span className="font-normal">({formateYear(serie.first_air_date)})</span></h2>
                  <p>                    
                    <span className="mr-1">{formateDateDetails(serie.first_air_date)}</span>
                    <span className="font-bold">.</span>
                    <span className="mx-1">
                      {serie.genres+","}                      
                    </span>
                  </p>

                  <div className="flex justify-center lg:justify-start mt-5">
                    <div>
                      <div className="flex items-center">
                        <VoteAveregeItem
                          vote_average={serie.vote_average}
                        />
                        <div className="ml-2 text-left font-bold">
                          <p>Avaliação</p>
                          <p>dos</p>
                          <p>usuários</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row">
                    <div className="mr-3">
                      {videos.length > 0 &&
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="flex justify-center m-auto lg:ml-0 my-3 py-1 px-1 w-44 cursor-pointer rounded-sm hover:bg-gray-500 ">
                              <Play />
                              <span className="font-semibold">Reproduzir trailer</span>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[920px]">
                            <DialogHeader>
                              <DialogTitle>Trailer Oficial</DialogTitle>
                            </DialogHeader>

                            {trailerKey ? (
                              <>
                                <iframe
                                  className="w-full h-[28rem]"
                                  src={`https://www.youtube.com/embed/${trailerKey}`}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  referrerPolicy="strict-origin-when-cross-origin"
                                  allowFullScreen
                                >
                                </iframe>
                              </>
                            ) : (
                              <p className="bg-orange-300 border border-orange-400 rounded-xl w-70 text-center text-white py-2 m-2">Não há trailer para exibição</p>
                            )}

                          </DialogContent>
                        </Dialog>                  
                      }
                    </div>

                    <div>
                      <Link href={`/tv/${serie.id}/seasons`}>
                        <div className="flex justify-center m-auto lg:ml-0 my-3 py-1 px-1 w-44 cursor-pointer rounded-sm bg-red-500 hover:bg-red-400 ">
                          <Play />
                          <span className="font-semibold">Assistir série</span>
                        </div>                      
                      </Link>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-300">{ serie.tagline }</p>
                    <h2 className="font-semibold text-2xl my-2">Sinopse</h2>
                    <p>{ serie.overview }</p>
                  </div>
                </div>
              </div>             

            </div>            
          </div>
        </div>
        
        <div className="container">
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6'>
            <div className='sm:col-span-3 md:col-span-2'>
              {credits.length > 0 &&
                <h1 className="text-black text-2xl font-semibold">Elenco principal</h1>
              }
              <ScrollableCarousel className="gap-4 pb-6 mt-4">

                {credits.length > 0 &&
                  <>
                  {credits.map((item) => (
                    <div key={item.id}>
                      <Link href={`/person/details/${item.id}`}>
                        <CardPersonMovieDetail
                          key={item.id}
                          profile_path={item.profile_path ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}` : imageNotFound}
                          name={item.name}
                          character={item.character}
                        />
                      </Link>
                    </div>
                    ))}
                  </>

                }
              </ScrollableCarousel>

              {serie.seasons.length > 0 ? (
                <>
                  <div className="mt-10">
                    <h1 className="text-black text-2xl font-semibold">Temporada atual</h1>

                    <div className="my-4 border rounded-sm">

                      <div className=" lg:flex">
                        <div className="lg:mr-5 mt-5 lg:mt-0">
                          <img
                            src={serie.seasons[0]?.poster_path ? `https://media.themoviedb.org/t/p/w130_and_h195_bestv2${serie.seasons[0]?.poster_path}` : imageNotFound}
                            className="h-[220px] max-w-[200px] sm:max-w-[200px] md:max-w-[200px] lg:max-w-[460px] m-auto sm:m-auto md:m-auto lg:rounded-tl-sm "
                            alt="Poster da temporada"
                          />
                        </div>

                        <div className="py-4 text-center sm:text-center md:text-center">
                          <div>
                            <h1 className="text-black hover:text-gray-500 text-xl font-semibold cursor-pointer text-center sm:text-center md:text-center lg:text-left xl:text-left mb-0 sm:mb-0 md:mb-0 lg:mb-1 xl:mb-1">{serie.seasons[0]?.name ? serie.seasons[0]?.name : "--"}</h1>
                            <div className="flex justify-center lg:justify-start text-black mt-3 lg:mt-0">

                              {serie.seasons[0]?.vote_average ? (
                                <>
                                  <div className="flex justify-center items-center bg-[#032541] rounded-sm text-white w-14 py-1 mr-2">
                                    <img src={star} className="w-3 mr-1" alt="star" />
                                    <span className="text-sm">{serie.seasons[0]?.vote_average ? (serie.seasons[0]?.vote_average * 10).toFixed(0) : "0"}</span>
                                    <span className="text-[11px]">%</span>
                                  </div>
                                </>
                              ) : (
                                <p className="mr-2">--</p>
                              )}
                              <span>{formateYear(serie.seasons[0]?.air_date ?? "")}</span>
                              <span className="mx-1">.</span>
                              <span>{serie.seasons[0]?.episode_count} episódios</span>
                            </div>
                          </div>

                          <div className="text-black">
                            <p className="my-4 px-2 md:pr-2 text-center sm:text-center md:text-center lg:text-left">
                              {serie.seasons[0]?.overview ? (
                                <>
                                  {serie.seasons[0]?.overview}
                                </>
                              ) : (
                                <p>Sem descrição</p>
                              )}
                            </p>
                          </div>

                          <div className="flex justify-center lg:justify-start text-black px-2">
                            <img src={calender} className="w-4" alt="calendário" />
                            <p className="mx-2">{serie.next_episode_to_air?.name ? serie.next_episode_to_air?.name : "Sem nome"}</p>
                            <p>({serie.next_episode_to_air?.season_number ? serie.next_episode_to_air?.season_number : "--"}x{serie.next_episode_to_air?.episode_number ? serie.next_episode_to_air?.episode_number : "--"}, {serie.next_episode_to_air?.air_date ? formateDate(serie.next_episode_to_air?.air_date ?? "") : "--"})</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link href={`/tv/${serie.id}/seasons`}>
                      <h1 className="text-black text-lg font-semibold cursor-pointer hover:text-gray-500">Mostrar todas as temporadas</h1>
                    </Link>
                  </div>
                </>
              ): (
                ""
              )}
              
              {videos.length > 0 &&
                <div className="flex pb-6 mt-6">
                  <Tabs defaultValue="videos">
                    <div className="flex items-center text-black mt-2">
                      <h1 className="text-black text-2xl font-semibold mr-10">Mídia</h1>
                      <TabsList className="bg-transparent">
                        <TabsTrigger value="videos" className="mr-6">Vídeos <span className="text-gray-500">{videos.length}</span></TabsTrigger>
                        <TabsTrigger value="imagens" className="">Imagens de fundo <span className="text-gray-500">{images.length}</span></TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="">
                      <div className=" w-[320px] sm:w-[380px] md:w-[450px] lg:w-[620px] xl:w-[870px] overflow-x-scroll overflow-y-hidden">
                        <TabsContent value="videos">
                          <div className="flex">
                            

                            {videos.length > 0 ? (
                              <>
                                {videos.map((item, index) => (
                                  <iframe
                                    key={index}
                                    className="min-w-[33rem] h-[19rem]"
                                    src={`https://www.youtube.com/embed/${item?.key}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                  >
                                  </iframe>
                                ))} 
                              </>
                            ) : (
                                <img src={ noVideoAvaible } alt="" />
                            )}
                            
                          </div>
                        </TabsContent>

                        <TabsContent value="imagens">
                          <div className="flex">
                            {images.map((item, index) => (
                              <div key={index} className="min-w-[533px] h-[19rem]">
                                <img src={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2${item.file_path}`} alt="" />
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </div>
                    </div>

                  </Tabs> 
                </div> 
              }
              
              <div className="mt-6">
                <h1 className="text-black text-2xl font-semibold">Recomendações</h1>
                <ScrollableCarousel className="gap-4 pb-6 mt-4">

                  {recommended.length > 0 &&
                    <>
                      {recommended.map(item => (                          
                        <Link href={`/series/details/${item.id}`} key={item.id}>
                          <MoviesRecommended
                            backdrop_path={item.backdrop_path ? `https://media.themoviedb.org/t/p/w250_and_h141_face/${item.backdrop_path}` : imageNotFound}
                            title={item.name}
                            vote_average={(item.vote_average * 10).toFixed(0)}
                          /> 
                        </Link>                       
                      ))}
                    </>
                  }
                  
                </ScrollableCarousel>
              </div>
            </div>

            <div className='sm:col-span-3 md:col-auto mt-4'>

              <div className="flex justify-center md:justify-start mt-1">
                <TooltipProvider>
                  <Tooltip>
                    {externalIds.facebook_id ? (
                      <Link href={`https://www.facebook.com/${externalIds.facebook_id}`}>
                        <TooltipTrigger asChild>
                          <img src={svgFacebook} alt="facebook" className="w-9 mr-1" />
                        </TooltipTrigger>
                      </Link>
                    ) : (
                      <TooltipTrigger asChild>
                        <img src={svgFacebook} alt="facebook" className="w-9 mr-1" />
                      </TooltipTrigger>
                    )}
                    <TooltipContent>
                      <p>Visitar Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    {externalIds.twitter_id ? (
                      <Link href={`https://twitter.com/${externalIds.twitter_id}`}>
                        <TooltipTrigger asChild>
                          <img src={svgTwitter} alt="twitter" className="w-9 ml-1" />
                        </TooltipTrigger>
                      </Link>
                    ) : (
                      <TooltipTrigger asChild>
                        <img src={svgTwitter} alt="twitter" className="w-9 ml-1" />
                      </TooltipTrigger>
                    )}
                    <TooltipContent>
                      <p>Visitar Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    {externalIds.instagram_id ? (
                      <Link href={`https://instagram.com/${externalIds.instagram_id}`}>
                        <TooltipTrigger asChild>
                          <img src={svgInstagram} alt="instagram" className="w-9 mr-1" />
                        </TooltipTrigger>
                      </Link>
                    ) : (
                      <TooltipTrigger asChild>
                        <img src={svgInstagram} alt="instagram" className="w-9 mr-1" />
                      </TooltipTrigger>
                    )}
                    <TooltipContent>
                      <p>Visitar Instagram</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>                

                <TooltipProvider>
                  <Tooltip>
                    {externalIds.imdb_id ? (
                      <Link href={`https://www.imdb.com/title/${externalIds.imdb_id}`}>
                        <TooltipTrigger asChild>
                          <img src={svgIMDB} alt="imdb" className="w-9 ml-1" />
                        </TooltipTrigger>
                      </Link>
                    ) : (
                      <TooltipTrigger asChild>
                        <img src={svgIMDB} alt="imdb" className="w-9 ml-1" />
                      </TooltipTrigger>
                    )}
                    <TooltipContent>
                      <p>Visitar IMDB</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>      
                
                <TooltipProvider>
                  <Tooltip>
                    {serie.homepage ? (
                      <Link href={serie.homepage}>
                        <TooltipTrigger asChild>
                          <img src={link_HomePage} alt="homePage" className="w-9 ml-1" />
                        </TooltipTrigger>
                      </Link>
                    ) : (
                      <TooltipTrigger asChild>
                        <img src={link_HomePage} alt="homePage" className="w-9 ml-1" />
                      </TooltipTrigger>
                    )}
                    <TooltipContent>
                      <p>Visitar página inicial</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="text-black text-center md:text-left mt-6">

                <div className="mb-4">
                  <p className="font-semibold">Situação</p>
                  <p>{serie.status === "Returning Series" ? "Renovada" : "" }</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Emissora</p>
                  <img src={`https://media.themoviedb.org/t/p/h30/${serie.networks[0]?.logo_path}`} alt="Emissora" />
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Tipo</p>
                  <p>{serie.type === "Scripted" ? "Roteirizada" : ""}</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Idioma original</p>
                  <p>{  serie.original_language === "en" ? "Inglês" : "" }</p>
                </div>
                
                <div className="mb-4">
                  <p className="font-semibold">Palavras-chave</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1 mt-2">
                    {keywords.map(item => (
                      <div key={item.id}>
                        <Link href={`/keyword/${item.id}/movie`}>
                          <div key={item.id}>
                            <p className="bg-gray-200 text-center rounded-sm py-1">{item.name}</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div> 

    </>
  )
}

export default SeriesDetails;
