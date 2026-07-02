import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-sm border-2 border-border bg-surface px-3 py-1 font-sans text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-signal focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-sm border-2 border-border bg-surface px-3 py-2 font-sans text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-signal focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input, Textarea };
