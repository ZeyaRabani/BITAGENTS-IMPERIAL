import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest",
  {
    variants: {
      variant: {
        default: "border-signal/30 bg-signal/10 text-signal",
        secondary: "border-grid bg-surface/40 text-muted-foreground",
        outline: "border-grid text-muted-foreground",
        success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        warn: "border-warn/30 bg-warn/10 text-warn",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
