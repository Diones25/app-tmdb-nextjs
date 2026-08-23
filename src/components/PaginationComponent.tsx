"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  page: number;
  maxButtons: number;
  totalPages: number | undefined;
  setPage: (value: React.SetStateAction<number>) => void
}

function PaginationComponent({ page, maxButtons, totalPages = 0, setPage }: Props) {

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const halfMaxButtons = Math.floor(maxButtons / 2); 
    let startPage = Math.max(page - halfMaxButtons, 1);
    let endPage = Math.min(page + halfMaxButtons, totalPages); 

    if (page <= halfMaxButtons) {
      endPage = Math.min(maxButtons, totalPages);
    }

    if (page + halfMaxButtons > totalPages) {
      startPage = Math.max(totalPages - maxButtons + 1, 1);
    }


    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem
          className="hidden sm:hidden md:block lg:block xl:block"
          key={i}
          onClick={() => handlePageChange(i)}
        >
            <PaginationLink className="cursor-pointer" isActive={i === page}>
              {i < 10 ? `0${i}` : i}
            </PaginationLink>
        </PaginationItem>        
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className="cursor-pointer" onClick={() => handlePageChange(page - 1)} />
          </PaginationItem>          

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext className="cursor-pointer" onClick={() => handlePageChange(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}

export default PaginationComponent
