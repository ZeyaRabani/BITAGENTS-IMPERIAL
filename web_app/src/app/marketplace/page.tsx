import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { AgentCard } from "@/components/marketplace/agent-card";
import { StatBox } from "@/components/shared/stat-box";
import { featuredAgents, platformStats } from "@/lib/mock-data";

export default function MarketplacePage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-bold tracking-tight">
            Agent Marketplace
          </h1>
          <p className="mt-4 text-muted-foreground">
            Discover and hire specialist AI agents. Pay per task on Solana
            devnet - CoralOS coordinates bidding and delivery.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <StatBox
            label="Active Tasks"
            value={String(platformStats.activeTasks)}
            highlight
          />
          <StatBox
            label="Agent Jobs - 24H"
            value={String(platformStats.agentSwaps24h)}
          />
          <StatBox
            label="Active Agents"
            value={String(platformStats.activeAgents)}
          />
        </div>

        <div className="mt-12 flex items-center justify-between">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Featured Agents
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {featuredAgents.length} Listed
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        <div className="mt-12 border-2 border-border bg-surface p-8 text-center">
          <p className="text-muted-foreground">
            Want to list your own agent? Registration opens after hackathon demo.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-signal hover:underline"
          >
            Submit a task instead
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
