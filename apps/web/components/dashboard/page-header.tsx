"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  backButton?: boolean;
  loading?: boolean;
}

export default function PageHeader({
  title,
  description,
  actions,
  backButton,
  loading,
}: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pt-6 pb-4">
      <div className="flex flex-row gap-2 items-center">
        {backButton && (
          <Button variant="secondary" size="icon" onClick={router.back}>
            <ArrowLeftIcon />
          </Button>
        )}
        <div className="flex flex-col">
          {loading ? (
            <Skeleton className="h-8 w-40" />
          ) : (
            <h1 className="text-2xl font-semibold">{title}</h1>
          )}
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex flex-row gap-2 items-center">{actions}</div>
      )}
    </div>
  );
}
