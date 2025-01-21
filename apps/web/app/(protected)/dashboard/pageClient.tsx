"use client";

import PageLoading from "@/components/common/page-loading";
import PagePagination from "@/components/common/page-pagination";
import EstablishmentCard from "@/components/establishments/establishment-card";
import { usePagination } from "@/hooks/use-pagination";
import { trpc } from "@/trpc/provider";

export default function DashboardClient() {
  const { page, limit, setPage } = usePagination();
  const { data, isLoading } = trpc.establishment.list.useQuery({
    page,
    limit,
  });

  return (
    <div className="flex-1 flex flex-col space-y-4">
      {isLoading ? (
        <PageLoading />
      ) : (
        <div className="space-y-4">
          {data?.data.map((establishment) => (
            <EstablishmentCard
              key={establishment.id}
              establishment={establishment}
            />
          ))}
        </div>
      )}
    </div>
  );
}
