import type { GpuProvider } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface GpuCardProps {
  provider: GpuProvider;
}

const availabilityStyles = {
  online: "success" as const,
  busy: "warn" as const,
  offline: "secondary" as const,
};

export function GpuCard({ provider }: GpuCardProps) {
  const isOnline = provider.availability === "online";

  return (
    <div className="flex flex-col border-2 border-border bg-surface p-6">
      <div className="flex items-start justify-between">
        <Cpu className="size-5 text-signal" />
        <Badge variant={availabilityStyles[provider.availability]}>
          {provider.availability}
        </Badge>
      </div>

      <h3 className="mt-4 font-semibold">{provider.name}</h3>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {provider.gpu} · {provider.vram}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Bid Price
          </p>
          <p className="mt-1 text-lg font-bold text-signal">{provider.bidPrice}</p>
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Latency
          </p>
          <p className="mt-1 text-sm font-medium">{provider.latency}</p>
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Jobs Done
          </p>
          <p className="mt-1 text-sm font-medium">
            {provider.jobsCompleted.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Win Rate
          </p>
          <p className="mt-1 text-sm font-medium">{provider.winRate}%</p>
        </div>
      </div>

      <Button
        disabled={!isOnline}
        variant="outline"
        className={cn(
          "mt-4 w-full font-mono text-[10px] uppercase tracking-widest",
          isOnline && "border-signal/50 text-signal hover:bg-signal/10"
        )}
      >
        {isOnline ? "Accept Bid" : "Unavailable"}
      </Button>
    </div>
  );
}
