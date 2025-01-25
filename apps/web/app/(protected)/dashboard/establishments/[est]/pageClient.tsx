"use client";
import UploadEstablishmentLogo from "@/components/establishments/upload-establishment-logo";
import PageHeader from "@/components/layouts/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/provider";
import Image from "next/image";
import { toast } from "sonner";

export default function EstablishmentPageClient({ estId }: { estId: string }) {
  const { establishment } = trpc.useUtils();
  const { data, isLoading } = trpc.establishment.get.useQuery(estId);

  const { mutate, isLoading: isExecuting } =
    trpc.establishment.deleteLogo.useMutation({
      onSuccess: () => {
        establishment.invalidate();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return (
    <>
      <PageHeader title={data?.name} backButton loading={isLoading} />
      <UploadEstablishmentLogo estId={estId} />
      <div>
        <Button
          variant="destructive"
          onClick={() => mutate(estId)}
          disabled={isExecuting}
        >
          Delete logo
        </Button>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        {data?.logo && (
          <Image
            src={`/storage/${data.logo}?height=240`}
            alt={data.logo}
            className="w-auto h-28"
            width={120}
            height={120}
          />
        )}
      </div>
    </>
  );
}
