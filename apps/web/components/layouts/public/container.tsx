import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto px-4 max-w-screen-xl", className)}>
      {children}
    </div>
  );
}
