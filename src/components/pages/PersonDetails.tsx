"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import Link from "@/components/SafeLink";
import CardMoviePerson from "../CardMoviePerson";
import ScrollableCarousel from "../ScrollableCarousel";
const svgFacebook = "/assets/facebook.svg";
const svgTwitter = "/assets/twitter.svg";
const svgInstagram = "/assets/instagram.svg";
import { formateDate, returnAge } from "@/lib/utils";
const imageNotFound = "/assets/imageNotFound.png";
import type { PersonPageData } from "@/lib/tmdb";


type Props = { data: PersonPageData };

const PersonDetails = ({ data }: Props) => {
  const { person, credits, externalIds } = data;

  return (
    <>

      <div className="container">
        <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row mt-8'>

          <div className="m-auto sm:m-auto md:m-auto lg:ml-0">
            <div className="min-w-[18.8rem] h-[450px] mr-7">
              <img className="rounded-sm" src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${person.profile_path}`} alt="" />
            </div>

            <div className="flex justify-center sm:justify-center md:justify-center lg:justify-start mt-8 ">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {externalIds.facebook_id ? (
                      <Link href={`https://www.facebook.com/${externalIds.facebook_id}`}>
                        <img src={svgFacebook} alt="facebook" className="w-9 mr-2" />
                      </Link>
                    ) : (
                      <img src={svgFacebook} alt="facebook" className="w-9 mr-2" />
                    )}
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 rounded-sm py-1 px-3 text-white">
                    <p>Visitar Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {externalIds.twitter_id ? (
                      <Link href={`https://twitter.com/${externalIds.twitter_id}`}>
                        <img src={svgTwitter} alt="twitter" className="w-9 ml-2 mr-2" />
                      </Link>
                    ) : (
                      <img src={svgTwitter} alt="twitter" className="w-9 ml-2 mr-2" />
                    )}                    
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 rounded-sm py-1 px-3 text-white">
                    <p>Visitar Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {externalIds.instagram_id ? (
                      <Link href={`https://instagram.com/${externalIds.instagram_id}`}>
                        <img src={svgInstagram} alt="instagram" className="w-9 mr-2" />
                      </Link>
                    ) : (
                      <img src={svgInstagram} alt="instagram" className="w-9 mr-2" />
                    )}                     
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 rounded-sm py-1 px-3 text-white">
                    <p>Visitar Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-4xl text-center sm:text-center md:text-center lg:text-left">{ person.name }</h1>

            <div className="my-4">
              <p className="font-semibold text-xl">Biografia</p>
              <p className="mt-2">
                {person.biography ? person.biography : "Sem dados para exibição"}
              </p>
            </div>

            <div className="sm:w-[20rem] md:w-[38rem] lg:min-w-[30rem] xl:w-[55rem]">
              <p className="font-semibold text-xl mb-1">Conhecido(a) por</p>
              
              <ScrollableCarousel className="gap-4 pb-3">
                {credits.length > 0 &&
                  <>
                  {credits.map(item => (
                      <div key={item.id}>
                        <Link href={`/details/${item.id}`}>
                          <CardMoviePerson
                            key={item.id}
                            poster_path={item.poster_path ? `https://media.themoviedb.org/t/p/w130_and_h195_face${item.poster_path}` : imageNotFound}
                            title={item.title}
                          />
                        </Link>  
                      </div>
                    ))}
                  </>
                }
              </ScrollableCarousel>
            </div>

          </div>
        </div>
        
      </div>

      <div className="container mt-8">
        <p className="font-semibold text-xl text-center sm:text-center md:text-left lg:text-left">Informações pessoais</p>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-3 mb-2">         
          <div className="mb-3 text-center sm:text-center md:text-left lg:text-left">
            <p className="font-semibold">Conhecido(a) por</p>
            <p>{person.known_for_department === 'Acting' ? 'Atuação' : '' }</p>
          </div>

          <div className="mb-3 text-center sm:text-center md:text-left lg:text-left">
            <p className="font-semibold">Gênero</p>
            <p>{ person.gender === 2 ? 'Masculino' : 'Feminino' }</p>
            <p>{person.gender === 3 ? 'Não binário' : '' }</p>
          </div>
        
          <div className="mb-3 text-center sm:text-center md:text-left lg:text-left">
            <p className="font-semibold">Nascimento</p>
            <p>{formateDate(person.birthday ?? "")} ({returnAge(person.birthday ?? "") } de Idade)</p>
          </div>

          <div className="mb-3 text-center sm:text-center md:text-left lg:text-left">
            <p className="font-semibold">Local de nascimento (em inglês)</p>
            <p>{ person.place_of_birth }</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PersonDetails
