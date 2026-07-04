import { cn } from "@/lib/utils";

interface StatBoxProps {
  label: string;
  value: string;
  highlight?: boolean;
}

export function StatBox({ label, value, highlight }: StatBoxProps) {
  return (
      <div className="border border-grid bg-surface/40 p-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-2 font-display text-4xl font-bold tracking-tight",
          highlight ? "text-signal" : "text-foreground"
        )}
      >
        {value}
      </p>
    </div>
  );
}
