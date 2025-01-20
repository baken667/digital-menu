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
  const showAfterEllipsisCount = 4;

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
    const pages: (number | "...")[] = [];
    const showBeforeEllipsisCount = Math.min(
      showAfterEllipsisCount,
      pageCount
    );

    for (let i = 1; i <= Math.min(3, pageCount); i++) {
      pages.push(i);
    }

    if (currentPage > showBeforeEllipsisCount + 2) {
      pages.push("...");
    }

    for (
      let i = Math.max(4, currentPage - showBeforeEllipsisCount);
      i <= Math.min(pageCount - 3, currentPage + showBeforeEllipsisCount);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < pageCount - showBeforeEllipsisCount - 1) {
      pages.push("...");
    }

    for (let i = Math.max(pageCount - 2, 4); i <= pageCount; i++) {
      pages.push(i);
    }

    console.log({ pages });
    return pages;
  };

  const pages = getPages();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious isDisabled={isFirstPage} onClick={handlePrevious} />
        </PaginationItem>
        {pages.map((page, index) =>
          page === "..." ? (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => handlePageClick(page as number)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext isDisabled={isLastPage} onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
