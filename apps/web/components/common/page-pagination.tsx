import {
  PageNumberCounters,
  PageNumberPagination,
} from "prisma-extension-pagination/dist/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type PagePaginationProps = {
  pagination?: PageNumberPagination & PageNumberCounters;
  setPage?: (page: number) => void;
};

export default function PagePagination({
  pagination,
  setPage,
}: PagePaginationProps) {
  if (!pagination || !setPage) {
    return null;
  }

  if (pagination.pageCount <= 1) {
    return null;
  }

  const { pageCount, currentPage, isFirstPage, isLastPage } = pagination;

  const handleNext = () => {
    if (!isLastPage) setPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (!isFirstPage) setPage(currentPage - 1);
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) setPage(page);
  };

  const getPages = () => {
    const pages = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(pageCount - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < pageCount - 2) {
      pages.push("...");
    }

    if (pageCount > 1) {
      pages.push(pageCount);
    }
    return pages;
  };

  const pages = getPages();

  return (
    <Pagination>
      <PaginationContent className="flex flex-col md:flex-row gap-2">
        <PaginationItem className="hidden md:block">
          <PaginationPrevious
            isDisabled={isFirstPage}
            onClick={handlePrevious}
          />
        </PaginationItem>
        <div className="flex gap-2">
          {pages.map((page, index) =>
            page === "..." ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => handlePageClick(page as number)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}
        </div>
        <PaginationItem className="hidden md:block">
          <PaginationNext isDisabled={isLastPage} onClick={handleNext} />
        </PaginationItem>
        <div className="flex md:hidden">
          <PaginationItem>
            <PaginationPrevious
              isDisabled={isFirstPage}
              onClick={handlePrevious}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext isDisabled={isLastPage} onClick={handleNext} />
          </PaginationItem>
        </div>
      </PaginationContent>
    </Pagination>
  );
}
