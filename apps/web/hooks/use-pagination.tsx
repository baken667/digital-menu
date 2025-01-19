"use client";
import { DEFAULT_PAGINATION, MAX_PAGINATION } from "@/lib/consts";
import { useRouter, useSearchParams } from "next/navigation";

export function usePagination(
  defaultLimit = DEFAULT_PAGINATION,
  defaultPage = 1
) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const limit = Math.min(
    parseInt(searchParams.get("limit") || defaultLimit.toString(), 10),
    MAX_PAGINATION
  );
  const page = Math.max(
    parseInt(searchParams.get("page") || defaultPage.toString(), 10),
    1
  );

  const updateSearchParams = (key: string, value: number | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === undefined || value) {
      params.delete(key);
    } else {
      params.set(key, value.toString());
    }

    router.push(`?${params.toString()}`);
  };

  const setPage = (newPage: number) => {
    const sanitizedPage = Math.max(newPage, 1);

    updateSearchParams("page", sanitizedPage);
  };

  const setLimit = (newLimit: number) => {
    const sanitizedLimit = Math.min(newLimit, MAX_PAGINATION);
    updateSearchParams("limit", sanitizedLimit);
  };

  return {
    limit,
    page,
    setPage,
    setLimit,
  };
}
