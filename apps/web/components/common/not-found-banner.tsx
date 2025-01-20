import { messages } from "@/lib/messages";
import { FileX2Icon } from "lucide-react";

interface NotFoundBannerProps {
  title?: string;
}

export default function NotFoundBanner({
  title = messages.errors.common.notFound,
}: NotFoundBannerProps) {
  return (
    <div className="flex-1 flex items-center justify-center py-10">
      <div className="flex flex-col items-center gap-4">
        <FileX2Icon className="size-12 text-muted-foreground" />
        <h2 className="text-2xl font-semibold text-muted-foreground">{title}</h2>
      </div>
    </div>
  );
}
