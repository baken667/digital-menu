"use client";
import { Button } from "@/components/ui/button";
import UploadEstablishmentLogo from "@/modules/establishments/components/upload-establishment-logo";
import PageHeader from "@/components/dashboard/page-header";
import Image from "next/image";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc/provider";

export default function EstablishmentPageClient({ estId }: { estId: string }) {
  const { establishments } = trpc.useUtils();
  const { data, isLoading } = trpc.establishments.get.useQuery(estId);

  const { mutate, isLoading: isExecuting } =
    trpc.establishments.deleteLogo.useMutation({
      onSuccess: () => {
        establishments.invalidate();
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
