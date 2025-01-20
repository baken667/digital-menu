"use client";

import PagePagination from "@/components/common/page-pagination";
import { usePagination } from "@/hooks/use-pagination";
import { trpc } from "@/trpc/provider";

export default function DashboardClient() {
  const { page, limit, setPage } = usePagination();
  const { data } = trpc.establishment.list.useQuery({
    page,
    limit,
  });

  return (
    <div className="flex-1">
      {data?.data.map((est) => <div key={est.id}>{est.name}</div>)}
      <PagePagination pagination={data?.pagination} setPage={setPage} />
    </div>
  );
}
