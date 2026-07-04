import Link from "next/link";
import { Cpu, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { computeLeaderboard, computeListings } from "@/lib/agentMeshMockData";
import { AGENT_MESH_BASE } from "@/lib/agentMeshRoutes";

export default function AgentMeshComputePage() {
  return (
    <div>
      <Badge className="mb-4">Spot Market</Badge>
      <h2 className="font-display text-2xl font-bold md:text-3xl">
        Compute Marketplace
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        GPU providers compete on price and latency. Agents purchase compute
        dynamically through nested escrows.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {computeListings.map((provider) => (
          <div
            key={provider.id}
            className="flex flex-col border border-grid bg-surface/40 p-6"
          >
            <div className="flex items-start justify-between">
              <Cpu className="size-5 text-signal" />
              <Badge variant={provider.available ? "success" : "secondary"}>
                {provider.available ? "Available" : "Busy"}
              </Badge>
            </div>
            <h3 className="mt-4 font-semibold">{provider.name}</h3>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {provider.gpu}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  Price
                </p>
                <p className="mt-1 text-sm font-bold text-signal">
                  {provider.pricePerMin}
                </p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  Latency
                </p>
                <p className="mt-1 text-sm font-medium">{provider.latency}</p>
              </div>
            </div>
            {provider.available ? (
              <Button
                asChild
                variant="outline"
                className="mt-4 w-full border-signal/50 font-mono text-[10px] uppercase tracking-widest text-signal hover:bg-signal/10"
              >
                <Link href={`${AGENT_MESH_BASE}/rent`}>Rent Similar</Link>
              </Button>
            ) : (
              <Button
                disabled
                variant="outline"
                className="mt-4 w-full font-mono text-[10px] uppercase tracking-widest"
              >
                Unavailable
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 border border-grid bg-surface/40 p-6">
        <div className="flex items-center gap-3">
          <Trophy className="size-5 text-signal" />
          <h3 className="font-display text-xl font-bold">Top Providers Today</h3>
        </div>
        <div className="mt-6 space-y-3">
          {computeLeaderboard.map((entry) => (
            <div
              key={entry.name}
              className="flex items-center justify-between border border-grid bg-background/40 px-5 py-4"
            >
              <div className="flex items-center gap-4">
                <span className="font-display text-2xl font-bold text-signal">
                  #{entry.rank}
                </span>
                <div>
                  <p className="font-semibold">{entry.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {entry.gpu} · {entry.jobs} jobs
                  </p>
                </div>
              </div>
              <span className="font-mono text-sm font-bold text-signal">
                {entry.earnings}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
