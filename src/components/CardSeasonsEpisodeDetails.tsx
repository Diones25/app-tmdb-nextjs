import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
const arrow_down = "/assets/arrow-down.svg";
import { useState } from "react";
import Link from "@/components/SafeLink";
import { Button } from "./ui/button";

type Props = {
  still_path: string;
  name: string;
  star: string;
  vote_average: number | string;
  air_date: string;
  runtime: string;
  overview: string;
  season_number?: number;
  episode_number?: number;
  imdb?: string;
  series_id?: string;
}

const CardSeasonsEpisodeDetails = ({ still_path, name, star, vote_average, air_date, runtime, overview, season_number, episode_number, series_id }: Props) => {
  const [activeTab, setActiveTab] = useState('player1');

  return (
    <>
      <div className="container">
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row border mb-7 rounded-sm px-3 sm:px-3 md:px-3 lg:px-0 lg:pr-3">
          <div className="mr-5">
            <img
              src={still_path}
              className="max-w-[227px] max-h[127px] rounded-none lg:rounded-tl-sm m-auto mt-5 sm:mt-5 md:mt-5 lg:mt-0"
              alt="Poster da temporada"
            />            
          </div>

          <div className="py-3">
            <div>
              <h1 className="text-center mt-2 sm:text-left md:text-left lg:text-left text-black font-bold text-xl mr-2">{ episode_number } - {name}</h1>                           
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
                <span>{runtime}</span>
              </div>
            </div>

            <div className="text-black">
              <p className="my-4 px-2 md:pr-2 text-justify">
                {overview ? (
                  <>
                    {overview}
                  </>
                ) : (
                  <p>Sem descrição</p>
                )}
              </p>
            </div>

            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    
                    <div className="flex items-center bg-red-500 text-white px-2 rounded-[2px]">                       
                      Assistir
                      <div className="ml-1">
                        <img
                          src={arrow_down}
                          className="w-3"
                          alt="arrow down"
                        />
                      </div> 
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Tabs defaultValue="player1" value={activeTab} onValueChange={setActiveTab} className="mt-3">
                      <div className="flex items-center">                        
                        <div className="w-[600px]">
                          <TabsList className="grid w-full mb-[95px] sm:mb-[31px] md:mb-[0px] sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 bg-transparent border border-[#1BB293]">
                            <TabsTrigger value="player1" className={activeTab === 'player1' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Player 1</TabsTrigger>
                            <TabsTrigger value="player2" className={activeTab === 'player2' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Player 2</TabsTrigger>
                            <TabsTrigger value="player3" className={activeTab === 'player3' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Player 3</TabsTrigger>
                            <TabsTrigger value="player4" className={activeTab === 'player4' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Player 4</TabsTrigger>
                            <TabsTrigger value="player5" className={activeTab === 'player5' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Player 5</TabsTrigger>
                            <TabsTrigger value="player6" className={activeTab === 'player6' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Player 6</TabsTrigger>
                          </TabsList>
                        </div>
                      </div>

                      <TabsContent value="player1" className="mt-3">
                        <div>
                          <iframe
                            id="EmbedderContainer"
                            className="w-full h-[28rem]"
                            src={`https://embed.embedplayer.site/serie/${series_id}/`}
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
                            src={`https://fembed.sx/e/${series_id}/${season_number}-${episode_number}`}
                            frameBorder="0"
                            allowFullScreen
                          >
                          </iframe>
                          <Link className="mt-3" href={`https://fembed.sx/e/${series_id}/${season_number}-${episode_number}`} target="_blank" rel="noopener noreferrer">
                            <Button>Abrir no Fembed</Button>
                          </Link>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="player3">
                        <div>
                          <iframe
                            id="EmbedderContainer"
                            className="w-full h-[28rem]"
                            src={`https://embedplayapi.top/embed/${series_id}/${season_number}/${episode_number}`}
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
                            src={`https://fshd.link/serie/${series_id}/${season_number}/${episode_number}`}
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
                            src={`https://superflixapi.asia/serie/${series_id}/${season_number}/${episode_number}`}
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
                            src={`https://playerflixapi.com/serie/${series_id}/${season_number}/${episode_number}`}
                            frameBorder="0"
                            allowFullScreen
                          >
                          </iframe>
                        </div>
                      </TabsContent> 
                    </Tabs>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default CardSeasonsEpisodeDetails
