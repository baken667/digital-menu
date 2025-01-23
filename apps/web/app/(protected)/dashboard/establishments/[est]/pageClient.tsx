"use client";
import UploadEstablishmentLogo from "@/components/establishments/upload-establishment-logo";
import PageHeader from "@/components/layouts/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/provider";
import Image from "next/image";

export default function EstablishmentPageClient({ estId }: { estId: string }) {
  const { establishment } = trpc.useUtils();
  const { data, isLoading } = trpc.establishment.get.useQuery(estId);

  const { mutate, isLoading: isExecuting } =
    trpc.establishment.deleteLogo.useMutation({
      onSuccess: () => {
        establishment.invalidate();
      },
    });

  return (
    <>
      <PageHeader title={data?.name} backButton loading={isLoading} />
      <UploadEstablishmentLogo estId={estId} />
      <div>
        <Button variant="destructive" onClick={() => mutate(estId)} disabled={isExecuting}>Delete logo</Button>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        {data?.logo && (
          <Image
            src={`/storage/${data.logo}?height=120`}
            alt={data?.name}
            width={100}
            height={100}
          />
        )}
      </div>
    </>
  );
}
