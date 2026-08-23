"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import CardItem from "./Card";
import Banner from "./Banner";
import { Key, SetStateAction, useEffect, useState } from "react";
import Link from "@/components/SafeLink";
import {
  useAllChannels,
  useMoviesPopulares,
  useMoviesUpcoming,
  usePersonsPopulares,
  useSeriesPopulares
} from "@/utils/queries";
import { formateDate } from "@/lib/utils";
import CardPerson from "./CardPerson";
const imageNotFound = "/assets/imageNotFound.png";
import PaginationComponent from "./PaginationComponent";
import SearchInput from "./SearchInput";
import { getSerachMovies, getSerachSeries } from "@/utils/api";
import { MoviesSearch } from "@/types/MoviesSearch";
import { SeriesSearch } from "@/types/SeriesSearch";
import CardTv from "./CardTv";

function HomePage() {
  const [page, setPage] = useState(1);
  const [tvPage, setTvPage] = useState(1);
  const [maxButtons, _] = useState(10);
  const [query, setQuery] = useState("");
  const [tvQuery, setTvQuery] = useState("");
  const [moviesSearch, setMoviesSearch] = useState<MoviesSearch | any>([]);
  const [seriesSearch, setSeriesSearch] = useState<SeriesSearch | any>([]);
  const [showPagainationSearch, setShowPaginationSearch] = useState(false);

  const [activeTab, setActiveTab] = useState('populares');
  const moviesPopulares = useMoviesPopulares(page);
  const MoviesUpcoming = useMoviesUpcoming(page);
  const SeriesPopulares = useSeriesPopulares(page);
  const PersonsPopulares = usePersonsPopulares(page);
  const AllChannels = useAllChannels();
  const tvItemsPerPage = 20;

  const tvChannels = AllChannels.data?.data ?? [];
  const tvFilteredChannels = tvQuery
    ? tvChannels.filter((item) =>
      (item.name ?? '').toLowerCase().includes(tvQuery.toLowerCase().trim())
    )
    : tvChannels;

  const tvTotalItems = tvFilteredChannels.length;
  const tvTotalPages = Math.ceil(tvTotalItems / tvItemsPerPage);
  const tvStartIndex = (tvPage - 1) * tvItemsPerPage;
  const tvChannelsPage = tvFilteredChannels.slice(tvStartIndex, tvStartIndex + tvItemsPerPage);

  useEffect(() => {
    (async () => {
      if (query) {
        const response = await getSerachMovies(query, page);
        setMoviesSearch(response);

        const responseSe = await getSerachSeries(query, page);
        setSeriesSearch(responseSe)

        setShowPaginationSearch(true);
      }
      else {
        setMoviesSearch([])
        setSeriesSearch([])
        setShowPaginationSearch(false);
      }

    })();
  }, [query, page])

  useEffect(() => {
    setTvPage(1);
  }, [tvQuery])

  return (
    <>
      <Banner />

      <div className="min-h-screen">
        <div className="container">
          <Tabs defaultValue="populares" value={activeTab} onValueChange={setActiveTab} className="mt-3">
            <div className="flex items-center">
              <h2 className="mr-3 font-semi-bold font-serif hidden sm:block text-md sm:text-2xl md:text-2xl">Os Mais Populares</h2>
              <div className="w-[600px]">
                <TabsList className="grid w-full mb-[95px] sm:mb-[31px] md:mb-[0px] sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 bg-transparent border border-[#1BB293]">
                  <TabsTrigger value="populares" className={activeTab === 'populares' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Populares</TabsTrigger>
                  <TabsTrigger value="lancamentos" className={activeTab === 'lancamentos' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Lançamentos</TabsTrigger>
                  <TabsTrigger value="series" className={activeTab === 'series' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Séries</TabsTrigger>
                  <TabsTrigger value="tv" className={activeTab === 'tv' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>TV</TabsTrigger>
                  <TabsTrigger value="pessoas" className={activeTab === 'pessoas' ? 'bg-gradient-to-r from-sky-500 to-green-500 text-white' : ''}>Pessoas</TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="populares" className="mt-3">

              <div className="my-6">
                <SearchInput
                  placeholder={"Digite o nome do filme que você deseja pesquisar"}
                  value={query}
                  onChange={(search: SetStateAction<string>) => setQuery(search)}
                />
              </div>

              {moviesPopulares.isLoading && 'Carregando...'}
              <div className="flex justify-center sm:justify-start">
                <div>
                  <div>
                    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>

                      {moviesPopulares.data && moviesSearch.results === undefined ? (
                        <>
                          {moviesPopulares.data.results.map((item) => (
                            <div key={item.id}>
                              <Link href={`/details/${item.id}`}>
                                <CardItem
                                  key={item.id}
                                  vote_average={item.vote_average}
                                  poster_path={item.poster_path ? `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}` : imageNotFound}
                                  title={item.title}
                                  release_date={formateDate(item.release_date)}
                                />
                              </Link>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {moviesSearch.results?.map((item: { id: number; vote_average: number; poster_path: string | undefined; title: string | undefined; release_date: string; }) => (
                            <div key={item.id}>
                              <Link href={`/details/${item.id}`}>
                                <CardItem
                                  key={item.id}
                                  vote_average={item.vote_average}
                                  poster_path={item.poster_path}
                                  title={item.title}
                                  release_date={formateDate(item.release_date)}
                                />
                              </Link>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    {moviesPopulares.data !== undefined && !showPagainationSearch ? (
                      <>
                        <PaginationComponent
                          page={page}
                          maxButtons={maxButtons}
                          totalPages={moviesPopulares.data?.total_pages}
                          setPage={setPage}
                        />
                      </>
                    ) : (
                      ""
                    )}

                    {showPagainationSearch ? (
                      <>
                        <PaginationComponent
                          page={page}
                          maxButtons={maxButtons}
                          totalPages={moviesSearch.total_pages}
                          setPage={setPage}
                        />
                      </>
                    ) : (
                      ""
                    )}

                  </div>
                </div>
              </div>

            </TabsContent>

            <TabsContent value="lancamentos">
              <div className="flex justify-center sm:justify-start">
                <div>
                  <div>
                    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>

                      {MoviesUpcoming.isLoading && 'Carregando...'}

                      {MoviesUpcoming.data &&
                        <>
                          {MoviesUpcoming.data.results.map((item) => (
                            <div key={item.id}>
                              <Link href={`/releases/details/${item.id}`}>
                                <CardItem
                                  key={item.id}
                                  vote_average={item.vote_average}
                                  poster_path={item.poster_path}
                                  title={item.title}
                                  release_date={formateDate(item.release_date)}
                                />
                              </Link>
                            </div>
                          ))}
                        </>

                      }

                    </div>
                  </div>

                  <div className="mt-5">
                    {MoviesUpcoming.data !== undefined ? (
                      <>
                        <PaginationComponent
                          page={page}
                          maxButtons={maxButtons}
                          totalPages={MoviesUpcoming.data?.total_pages}
                          setPage={setPage}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="series">

              <div className="my-6">
                <SearchInput
                  placeholder={"Digite o nome do serie que você deseja pesquisar"}
                  value={query}
                  onChange={(search: SetStateAction<string>) => setQuery(search)}
                />
              </div>

              {SeriesPopulares.isLoading && 'Carregando...'}

              <div className="flex justify-center sm:justify-start">
                <div>
                  <div>
                    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>

                      {SeriesPopulares.data && seriesSearch.results === undefined ? (
                        <>
                          {SeriesPopulares.data.results.map((item) => (
                            <div key={item.id}>
                              <Link href={`/series/details/${item.id}`}>
                                <CardItem
                                  key={item.id}
                                  vote_average={item.vote_average}
                                  poster_path={item.poster_path ? `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}` : imageNotFound}
                                  title={item.name}
                                  release_date={formateDate(item.first_air_date)}
                                />
                              </Link>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {seriesSearch.results?.map((item: { id: number; vote_average: number; poster_path: any; name: string | undefined; first_air_date: string; }) => (
                            <div key={item.id}>
                              <Link href={`/series/details/${item.id}`}>
                                <CardItem
                                  key={item.id}
                                  vote_average={item.vote_average}
                                  poster_path={item.poster_path ? `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}` : imageNotFound}
                                  title={item.name}
                                  release_date={formateDate(item.first_air_date)}
                                />
                              </Link>
                            </div>
                          ))}
                        </>
                      )}

                    </div>
                  </div>

                  <div className="mt-5">
                    {SeriesPopulares.data !== undefined && !showPagainationSearch ? (
                      <>
                        <PaginationComponent
                          page={page}
                          maxButtons={maxButtons}
                          totalPages={SeriesPopulares.data?.total_pages}
                          setPage={setPage}
                        />
                      </>
                    ) : (
                      ""
                    )}

                    {showPagainationSearch ? (
                      <>
                        <PaginationComponent
                          page={page}
                          maxButtons={maxButtons}
                          totalPages={seriesSearch.total_pages}
                          setPage={setPage}
                        />
                      </>
                    ) : (
                      ""
                    )}

                  </div>

                </div>
              </div>
            </TabsContent>

            <TabsContent value="tv">
              <div className="flex justify-center sm:justify-start">
                <div>
                  <div className="my-6">
                    <SearchInput
                      placeholder={"Digite o nome do canal que você deseja pesquisar"}
                      value={tvQuery}
                      onChange={(search: SetStateAction<string>) => setTvQuery(search)}
                    />
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                    {AllChannels.isLoading && 'Carregando...'}
                    {tvChannelsPage.length > 0 &&
                      <>
                        {tvChannelsPage.map((item) => (
                          <div key={item.id}>
                            <CardTv
                              key={item.id}
                              preview_url={item.preview_url ? item.preview_url : imageNotFound}
                              logo_url={item.logo_url}
                              name={item.name}
                              category={item.category}
                              embed_url={item.embed_url}
                            />
                          </div>
                        ))}
                      </>
                    }
                  </div>

                  <div className="mt-5">
                    {tvTotalPages > 1 ? (
                      <PaginationComponent
                        page={tvPage}
                        maxButtons={maxButtons}
                        totalPages={tvTotalPages}
                        setPage={setTvPage}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pessoas">
              <div className="flex justify-center sm:justify-start">
                <div>
                  <div>
                    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>

                      {PersonsPopulares.isLoading && 'Carregando...'}

                      {PersonsPopulares.data &&
                        <>
                          {PersonsPopulares.data.results.map((item) => (
                            <div key={item.id}>
                              <Link href={`/person/details/${item.id}`}>
                                <CardPerson
                                  key={item.id}
                                  profile_path={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`}
                                  name={item.name}
                                />
                              </Link>
                            </div>
                          ))}
                        </>

                      }

                    </div>
                  </div>

                  <div className="mt-5">
                    {PersonsPopulares.data !== undefined ? (
                      <>
                        <PaginationComponent
                          page={page}
                          maxButtons={maxButtons}
                          totalPages={PersonsPopulares.data?.total_pages}
                          setPage={setPage}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

      </div>

    </>
  )
}

export default HomePage
