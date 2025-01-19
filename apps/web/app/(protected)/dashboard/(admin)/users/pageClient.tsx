"use client";
import { trpc } from "@/trpc/provider";
import { usePagination } from "@/hooks/use-pagination";
import UserCard from "@/components/users/user-card";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-search";
import PageLoading from "@/components/common/page-loading";
import { messages } from "@/lib/messages";

export default function UsersPageClient() {
  const { page, limit } = usePagination();

  const { searchTerm, handleSearch } = useSearch();

  const { data, isLoading, isRefetching } = trpc.users.list.useQuery({
    page,
    limit,
    input: searchTerm,
  });

  return (
    <div className="flex-1 flex flex-col space-y-4">
      <div className="flex flex-row">
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchTerm}
          placeholder={messages.common.search}
        />
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
    </div>
  );
}
