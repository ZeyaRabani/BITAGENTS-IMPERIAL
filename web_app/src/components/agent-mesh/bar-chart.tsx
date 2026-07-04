"use client";

import { cn } from "@/lib/utils";

interface BarChartProps {
  data: { label: string; value: number }[];
  unit?: string;
  color?: string;
}

export function BarChart({ data, unit = "", color = "bg-signal" }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex h-40 items-end gap-2">
      {data.map((item) => (
        <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
          <span className="font-mono text-[9px] text-muted-foreground">
            {item.value}
            {unit}
          </span>
          <div
            className={cn("w-full rounded-sm transition-all", color)}
            style={{ height: `${(item.value / max) * 100}%`, minHeight: 4 }}
          />
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
