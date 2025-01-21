"use client";
import PageHeader from "@/components/layouts/dashboard/page-header";
import { trpc } from "@/trpc/provider";

export default function EstablishmentPageClient({ estId }: { estId: string }) {
  const { data, isLoading } = trpc.establishment.get.useQuery(estId);

  return (
    <>
      <PageHeader title={data?.name} backButton loading={isLoading} />
    </>
  );
}
