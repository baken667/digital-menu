"use client";
import { trpc } from "@/trpc/provider";
import { usePagination } from "@/hooks/use-pagination";
import UserCard from "@/components/users/user-card";
import PageLoading from "@/components/common/page-loading";

export default function UsersPageClient() {
  const { page, limit } = usePagination();

  const { data, isLoading, isRefetching } = trpc.users.list.useQuery(
    {
      page,
      limit,
    }
  );

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="flex-1 space-y-4">
      {data?.data.map((user) => (
        <UserCard key={user.id} user={user} isFetching={isRefetching} />
      ))}
    </div>
  );
}
