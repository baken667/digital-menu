"use client";
import { trpc } from "@/lib/trpc/provider";
import { usePagination } from "@/hooks/use-pagination";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-search";
import PageLoading from "@/components/common/page-loading";
import { messages } from "@/lib/messages";
import PagePagination from "@/components/common/page-pagination";
import NotFoundBanner from "@/components/common/not-found-banner";
import UserCard from "./components/user-card";

export default function UsersPageClient() {
  const { page, limit, setPage } = usePagination();

  const { searchTerm, handleSearch } = useSearch();

  const { data, isLoading, isRefetching } = trpc.users.list.useQuery({
    page,
    limit,
    input: searchTerm,
  });

  return (
    <div className="flex-1 flex flex-col space-y-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex gap-4">
          <Input
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchTerm}
            placeholder={messages.common.search}
          />
        </div>
      </div>
      {isLoading ? (
        <PageLoading />
      ) : (
        <div className="space-y-4">
          {data?.data.map((user) => (
            <UserCard key={user.id} user={user} isFetching={isRefetching} />
          ))}
        </div>
      )}

      {!isLoading && data?.data.length === 0 && (
        <NotFoundBanner title={messages.errors.users.notFoundPlural} />
      )}
      <PagePagination pagination={data?.pagination} setPage={setPage} />
    </div>
  );
}
