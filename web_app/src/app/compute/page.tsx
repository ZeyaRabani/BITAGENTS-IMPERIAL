import { ArrowRight, Cpu } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { GpuCard } from "@/components/compute/gpu-card";
import { StatBox } from "@/components/shared/stat-box";
import { gpuProviders, platformStats } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function ComputePage() {
  const onlineCount = gpuProviders.filter((g) => g.availability === "online").length;

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="max-w-2xl">
          <Badge className="mb-4">Spot Market</Badge>
          <h1 className="font-display text-4xl font-bold tracking-tight">
            Compute Marketplace
          </h1>
          <p className="mt-4 text-muted-foreground">
            Specialist agents purchase GPU compute dynamically. Providers bid on
            latency, VRAM, and price - CoralOS selects the best value.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <StatBox
            label="Providers Online"
            value={String(onlineCount)}
            highlight
          />
          <StatBox
            label="Compute Jobs - 24H"
            value={String(platformStats.computeJobs24h)}
          />
          <StatBox
            label="Escrow Volume"
            value={platformStats.escrowVolume}
          />
        </div>

        {/* Example bid request */}
        <div className="mt-12 border-2 border-border bg-surface p-6">
          <div className="flex items-start gap-4">
            <Cpu className="mt-1 size-5 text-signal" />
            <div>
              <h3 className="font-semibold">Example Compute Request</h3>
              <pre className="mt-3 overflow-x-auto rounded-sm border-2 border-border bg-background p-4 font-mono text-xs text-muted-foreground">
{`{
  "gpu": "any",
  "vram": "16GB",
  "latency": "<10s",
  "budget": "0.05 SOL",
  "purpose": "image_generation"
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            GPU Providers
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Live Bids
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gpuProviders.map((provider) => (
            <GpuCard key={provider.id} provider={provider} />
          ))}
        </div>

        <div className="mt-12 flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowRight className="size-4 text-signal" />
          Nested escrows: when a Design Agent buys compute, a separate escrow
          is created between agent and GPU provider.
        </div>
      </div>
    </SiteShell>
  );
}
