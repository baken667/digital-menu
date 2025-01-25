"use client";

import PageLoading from "@/components/common/page-loading";
import PagePagination from "@/components/common/page-pagination";
import { Input } from "@/components/ui/input";
import { usePagination } from "@/hooks/use-pagination";
import { useSearch } from "@/hooks/use-search";
import { messages } from "@/lib/messages";
import { trpc } from "@/trpc/provider";
import EstablishmentCard from "./components/establishment-card";

export default function EstablishmentsPageClient() {
  const { page, limit, setPage } = usePagination();
  const { searchTerm, handleSearch } = useSearch();
  const { data, isLoading } = trpc.establishment.list.useQuery({
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
          {data?.data.map((establishment) => (
            <EstablishmentCard
              key={establishment.id}
              establishment={establishment}
            />
          ))}
        </div>
      )}
      <PagePagination pagination={data?.pagination} setPage={setPage} />
    </div>
  );
}
