import { cva, VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";
import React from "react";

const spinnerVariants = cva("[&_svg]:animate-spin", {
  variants: {
    size: {
      default: "size-6 [&_svg]:size-6",
      sm: "size-4 [&_svg]:size-4",
      lg: "size-8 [&_svg]:size-8",
    },
    variant: {
      default: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

type SpinnerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof spinnerVariants>;

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={spinnerVariants({ size, variant, className })}
      {...props}
    >
      <Loader2Icon />
    </div>
  )
);

Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
