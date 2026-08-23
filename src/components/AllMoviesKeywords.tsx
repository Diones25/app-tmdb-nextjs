"use client";

import Link from "@/components/SafeLink";
import { Button } from "./ui/button"
import { useEffect, useRef, useState } from 'react';
import { getAllMoviesKeywords } from '@/utils/api';
import CardKeywordMovies from './CardKeywordMovies';
import { TypeAllMoviesKeywords } from '@/types/AllMoviesKeywords';

type Props = {
  keywordId: number;
  initialData: TypeAllMoviesKeywords;
};

const AllMoviesKeywords = ({ keywordId, initialData }: Props) => {
  const [items, setItems] = useState<TypeAllMoviesKeywords["results"]>(initialData.results);
  const [page, setPage] = useState(initialData.page);
  const [totalPages, setTotalPages] = useState(initialData.total_pages);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [autoLoadEnabled, setAutoLoadEnabled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = async (enableAutoLoad: boolean = false) => {
    if (isLoadingMore) return;
    if (page >= totalPages) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;
    const res = await getAllMoviesKeywords(keywordId, nextPage);
    setItems((prev) => [...prev, ...res.results]);
    setPage(nextPage);
    if (enableAutoLoad) setAutoLoadEnabled(true);
    setIsLoadingMore(false);
  };

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (!autoLoadEnabled) return;
    if (page >= totalPages) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        loadMore();
      }
    }, { rootMargin: '200px' });

    observer.observe(el);
    return () => observer.disconnect();
  }, [autoLoadEnabled, page, totalPages, keywordId]);

  return (
    <>
      <div className="min-h-screen mt-3">
        <div className="container">          

          {items.map((item) => (
            <div key={item.id}>
              <Link href={`/details/${item.id}`}>
                <CardKeywordMovies
                  key={item.id}
                  poster_path={item.poster_path}
                  title={item.title}
                  original_title={item.original_title}
                  release_date={item.release_date}
                  overview={item.overview}
                />
              </Link>
            </div>
          ))}

          <>
            {page < totalPages ? (
              <Button
                className="w-full text-xl bg-blue-400 hover:bg-blue-300 hover:text-black"
                onClick={() => loadMore(true)}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? "Carregando..." : "Carregar mais"}
              </Button>
            ) : (
              ""
            )}
            <div ref={sentinelRef} />
          </>

        </div>
      </div>
    </>
  )
}

export default AllMoviesKeywords
