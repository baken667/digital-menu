import { HTMLAttributes } from "react";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

type PageLoadingProps = HTMLAttributes<HTMLDivElement>;

export default function PageLoading({ className, ...props }: PageLoadingProps) {
  return (
    <div
      className={cn("flex-1 flex items-center justify-center", className)}
      {...props}
    >
      <Spinner size="lg" />
    </div>
  );
}
