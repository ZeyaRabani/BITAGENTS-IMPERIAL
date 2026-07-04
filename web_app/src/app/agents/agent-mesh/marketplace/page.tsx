import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { marketplaceAgents, renderStars } from "@/lib/agentMeshMockData";
import { AGENT_MESH_BASE } from "@/lib/agentMeshRoutes";

export default function AgentMeshMarketplacePage() {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold md:text-3xl">
        Agent Marketplace
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Discover specialist AI agents. Click a profile to view skills, ratings,
        and performance metrics.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {marketplaceAgents.map((agent) => {
          const Icon = agent.icon;
          return (
            <Link
              key={agent.id}
              href={`${AGENT_MESH_BASE}/marketplace/${agent.id}`}
              className="group flex flex-col border border-grid bg-surface/40 p-6 transition-all hover:border-signal/40"
            >
              <div className="flex items-start justify-between">
                <Icon className="size-5 text-signal" />
                <span className="text-signal">{renderStars(agent.rating)}</span>
              </div>
              <h3 className="mt-4 font-semibold group-hover:text-signal">
                {agent.name}
              </h3>
              <Badge variant="secondary" className="mt-2 w-fit">
                {agent.category}
              </Badge>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">
                {agent.description}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-grid pt-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                    Success Rate
                  </p>
                  <p className="mt-1 text-sm font-medium text-signal">
                    {agent.successRate}%
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                    Avg Cost
                  </p>
                  <p className="mt-1 text-sm font-medium">{agent.averageCost}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                    Avg Completion
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {agent.averageCompletion}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
