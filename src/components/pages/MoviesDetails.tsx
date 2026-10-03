"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";


import Link from "@/components/SafeLink";
import { currencyUSD, formateDateDetails, formateDuration, formateYear } from "@/lib/utils";
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


const svgFacebook = "/assets/facebook.svg";
const svgTwitter = "/assets/twitter.svg";
const svgInstagram = "/assets/instagram.svg";
const svgIMDB = "/assets/imdb.svg";
const noVideoAvaible = "/assets/no-video-available.jpg";
const imageNotFound = "/assets/imageNotFound.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import { useEffect, useRef, useState } from "react";

import CardReview from "../CardReview";
import type { MoviePageData } from "@/lib/tmdb";
import VoteAveregeItem from "../VoteAveregeItem";
import CardImage from "../CardImage";
import CardPersonMovieDetail from "../CardPersonMovieDetail";
import ScrollableCarousel from "../ScrollableCarousel";
import MoviesRecommended from "../MoviesRecommended";
import { Button } from "../ui/button";

type Props = { data: MoviePageData };

const MoviesDetails = ({ data }: Props) => {
  const { movie, videos, trailerKey, images, credits, externalIds, keywords, recommended, reviews } = data;
  const [activeTab, setActiveTab] = useState('player1');
  const reviewsScrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollReviewsLeft, setCanScrollReviewsLeft] = useState(false);
  const [canScrollReviewsRight, setCanScrollReviewsRight] = useState(false);

  const updateReviewsScrollButtons = () => {
    const el = reviewsScrollerRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollReviewsLeft(el.scrollLeft > 0);
    setCanScrollReviewsRight(el.scrollLeft < maxScrollLeft - 1);
  };

  const scrollReviewsBy = (direction: "left" | "right") => {
    const el = reviewsScrollerRef.current;
    if (!el) return;
    const amount = Math.max(320, Math.floor(el.clientWidth * 0.85));
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    updateReviewsScrollButtons();
    const onResize = () => updateReviewsScrollButtons();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [reviews.length]);

  return (
    <>
      <div className="min-h-screen mt-3 text-white">
        <div
          style={{
            backgroundImage: `url(${`https://image.tmdb.org/t/p/w1920_and_h800_face/`}.${movie.backdrop_path})`,
          }}        
          className="bg-no-repeat bg-cover bg-center"
        >
          <div className='bg-[rgba(0,0,0,0.6)] py-6'>
            <div className="container">                          
              <div className="flex flex-col lg:flex-row items-center py-7">
                <CardImage
                  poster_path={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}                  
                /> 

                <div className="ml-9 mt-3 text-center lg:text-left">
                  <h2 className="text-white text-4xl font-bold">{movie.title}<span className="font-normal">({formateYear(movie.release_date)})</span></h2>
                  <p>                    
                    <span className="mr-1">{formateDateDetails(movie.release_date)}</span>
                    <span className="font-bold">.</span>
                    <span className="mx-1">
                      {movie.genres+","}                      
                    </span>
                    <span className="font-bold">.</span>
                    <span className="ml-1">{formateDuration(String(movie.runtime)) }</span>
                  </p>

                  <div className="flex justify-center lg:justify-start mt-5">
                    <div>
                      <div className="flex items-center">
                        <VoteAveregeItem
                          vote_average={movie.vote_average}
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
                      {externalIds.imdb_id != null &&
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="flex justify-center m-auto lg:ml-0 my-3 py-1 px-1 w-44 cursor-pointer rounded-sm bg-red-500 hover:bg-red-400 ">
                              <Play />
                              <span className="font-semibold">Assistir filme</span>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-[80rem]">
                            <DialogHeader>
                              <DialogTitle>Assistir filme</DialogTitle>
                            </DialogHeader>

                            <div>                                
                              <Tabs defaultValue="player1" value={activeTab} onValueChange={setActiveTab}>
                                <div className="flex items-center">                        
                                  <div className="m-auto md:m-0">
                                    <TabsList className="grid w-full sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 bg-transparent border border-[#1BB293]">
                                      <TabsTrigger value="player1" className={activeTab === 'player1' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white py-2 w-32' : 'py-2'}>Player 1</TabsTrigger>
                                      <TabsTrigger value="player2" className={activeTab === 'player2' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white py-2 w-32' : 'py-2'}>Player 2</TabsTrigger>
                                      <TabsTrigger value="player3" className={activeTab === 'player3' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white py-2 w-32' : 'py-2'}>Player 3</TabsTrigger>
                                      <TabsTrigger value="player4" className={activeTab === 'player4' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white py-2 w-32' : 'py-2'}>Player 4</TabsTrigger>
                                      <TabsTrigger value="player5" className={activeTab === 'player5' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white py-2 w-32' : 'py-2'}>Player 5</TabsTrigger>
                                      <TabsTrigger value="player6" className={activeTab === 'player6' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white py-2 w-32' : 'py-2'}>Player 6</TabsTrigger>                                        
                                    </TabsList>
                                  </div>
                                </div>

                                <TabsContent value="player1" className="mt-3">
                                  <div>
                                    <iframe
                                      id="EmbedderContainer"
                                      className="w-full h-[28rem]"
                                      src={`https://embed.embedplayer.site/${externalIds.imdb_id}`}
                                      frameBorder="0"
                                      allowFullScreen
                                    >
                                    </iframe>
                                  </div>
                                </TabsContent>

                                <TabsContent value="player2">
                                  <div className="flex flex-col items-center">
                                    <iframe
                                      id="EmbedderContainer"
                                      className="w-full h-[28rem]"
                                      src={`https://fembed.sx/e/${externalIds.imdb_id}`}
                                      frameBorder="0"
                                      allowFullScreen
                                    >
                                    </iframe>
                                    <Link className="mt-3" href={`https://fembed.sx/e/${externalIds.imdb_id}`} target="_blank" rel="noopener noreferrer">
                                      <Button>Abrir no Fembed</Button>
                                    </Link>
                                  </div>
                                </TabsContent>

                                <TabsContent value="player3">
                                  <div>
                                    <iframe
                                      id="EmbedderContainer"
                                      className="w-full h-[28rem]"
                                      src={`https://embedplayapi.top/embed/${movie.id}`}
                                      frameBorder="0"
                                      allowFullScreen
                                    >
                                    </iframe>
                                  </div>
                                </TabsContent>
                          
                                <TabsContent value="player4">
                                  <div>
                                    <iframe
                                      id="EmbedderContainer"
                                      className="w-full h-[28rem]"
                                      src={`https://superflixapi.best/filme/${externalIds.imdb_id}`}
                                      frameBorder="0"
                                      allowFullScreen
                                    >
                                    </iframe>
                                  </div>
                                </TabsContent>

                                <TabsContent value="player5">
                                  <div>
                                    <iframe
                                      id="EmbedderContainer"
                                      className="w-full h-[28rem]"
                                      src={`https://playerflixapi.com/filme/${externalIds.imdb_id}`}
                                      frameBorder="0"
                                      allowFullScreen
                                    >
                                    </iframe>
                                  </div>
                                </TabsContent>

                                <TabsContent value="player6">
                                  <div>
                                    <iframe
                                      id="EmbedderContainer"
                                      className="w-full h-[28rem]"
                                      src={`https://myembed.biz/filme/${externalIds.imdb_id}`}
                                      frameBorder="0"
                                      allowFullScreen
                                    >
                                    </iframe>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>

                          </DialogContent>
                        </Dialog>
                      }
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p>{ movie.tagline }</p>
                    <h2 className="font-semibold text-2xl my-2">Sinopse</h2>
                    <p>{ movie.overview }</p>
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

              <div className={`${reviews.length > 0 ? 'pb-6 mt-6' : ''}`}>
                {reviews.length > 0 &&
                  <>
                    <h1 className="text-black text-2xl font-semibold mb-4">Avaliações em destaque</h1>
                    <div className="relative">
                      {canScrollReviewsLeft ? (
                        <button
                          type="button"
                          onClick={() => scrollReviewsBy("left")}
                          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-gray-200/90 text-gray-800 shadow-md hover:bg-gray-200"
                          aria-label="Rolar avaliações para a esquerda"
                        >
                          <ChevronLeft className="m-auto" />
                        </button>
                      ) : null}

                      {canScrollReviewsRight ? (
                        <button
                          type="button"
                          onClick={() => scrollReviewsBy("right")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-gray-200/90 text-gray-800 shadow-md hover:bg-gray-200"
                          aria-label="Rolar avaliações para a direita"
                        >
                          <ChevronRight className="m-auto" />
                        </button>
                      ) : null}

                      <div
                        ref={reviewsScrollerRef}
                        onScroll={updateReviewsScrollButtons}
                        className="no-scrollbar flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth pr-12 snap-x snap-mandatory"
                      >
                        {reviews.map((item) => (
                          <div key={item.id} className="snap-start">
                            <CardReview
                              key={item.id}
                              avatar_path={item.author_details?.avatar_path}
                              name={!item.author_details?.name ? item.author_details?.username : item.author_details?.name}
                              rating={!item.author_details.rating ? 0 : item.author_details.rating}
                              url={item.url}
                              content={`${item.content.slice(0, 150)}...`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                }
              </div> 

              {images.length > 0 &&
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
                      <div className=" w-[260px] sm:w-[380px] md:w-[450px] lg:w-[620px] xl:w-[870px] overflow-x-scroll overflow-y-hidden">
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
                              <img src={noVideoAvaible} alt="" />
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
              
              {recommended.length > 0 &&
                <>
                  <div className="mt-6">
                    <h1 className="text-black text-2xl font-semibold">Recomendações</h1>
                    <ScrollableCarousel className="gap-4 pb-6 mt-4">
                      {recommended.map(item => (
                        <Link href={`/details/${item.id}`} key={item.id}>
                          <MoviesRecommended
                            backdrop_path={`https://media.themoviedb.org/t/p/w250_and_h141_face/${item.backdrop_path}`}
                            title={item.title}
                            vote_average={(item.vote_average * 10).toFixed(0)}
                          />
                        </Link>
                      ))}
                    </ScrollableCarousel>
                  </div>
                </>
              }
                
            </div>

            <div className='sm:col-span-3 md:col-auto mt-4'>

              <div className="flex justify-center md:justify-start mt-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {externalIds.facebook_id ? (
                        <>
                          <Link href={`https://www.facebook.com/${externalIds.facebook_id}`}>
                            <img src={svgFacebook} alt="facebook" className="w-9 mr-1" />
                          </Link>
                        </>
                      ) : (
                        <img src={svgFacebook} alt="facebook" className="w-9 mr-1" />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visitar Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {externalIds.twitter_id ? (
                        <>
                          <Link href={`https://twitter.com/${externalIds.twitter_id}`}>
                            <img src={svgTwitter} alt="twitter" className="w-9 ml-1" />
                          </Link>
                        </>
                      ) : (
                        <img src={svgTwitter} alt="twitter" className="w-9 ml-1" />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visitar Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {externalIds.instagram_id ? (
                        <>
                          <Link href={`https://instagram.com/${externalIds.instagram_id}`}>
                            <img src={svgInstagram} alt="instagram" className="w-9 mr-1" />
                          </Link>
                        </>
                      ) : (
                        <img src={svgInstagram} alt="instagram" className="w-9 mr-1" />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visitar Instagram</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>                

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {externalIds.imdb_id ? (
                        <>
                          <Link href={`https://www.imdb.com/title/${externalIds.imdb_id}`}>
                            <img src={svgIMDB} alt="imdb" className="w-9 ml-1" />
                          </Link>
                        </>
                      ) : (
                        <img src={svgIMDB} alt="imdb" className="w-9 ml-1" />
                      )} 
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visitar IMDB</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>                
              </div>

              <div className="text-black text-center md:text-left mt-6">

                <div className="mb-4">
                  <p className="font-semibold">Titulo original</p>
                  <p>{ movie.original_title }</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Situação</p>
                  <p>{ movie.status === "Released" ? "Lançado" : "" }</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Idioma original</p>
                  <p>{ movie.original_language === "en" ? "Inglês" : "" }</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold">Orçamento</p>
                  <p>{ currencyUSD(String(movie.budget)) }</p>
                </div>

                <div className="mb-6">
                  <p className="font-semibold">Receita</p>
                  <p>{ currencyUSD(String(movie.revenue)) }</p>
                </div>
                
                <div className="mb-4">
                  <p className="font-semibold">Palavras-chave</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1 mt-2">
                    {(keywords.keywords ?? []).map(item => (
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

export default MoviesDetails
