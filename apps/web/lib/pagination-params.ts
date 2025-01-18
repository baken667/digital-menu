export default function paginationParams(page?: number, pageSize?: number) {
  const maxPageSize = 30;
  const minPageSize = 10;

  if (!page) {
    page = 1;
  }

  if (!pageSize) {
    pageSize = 10;
  }

  if (pageSize > maxPageSize) {
    pageSize = maxPageSize;
  }

  if (pageSize < minPageSize) {
    pageSize = minPageSize;
  }

  return {
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
}