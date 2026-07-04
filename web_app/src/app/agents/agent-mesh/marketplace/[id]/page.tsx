import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { marketplaceAgents, renderStars } from "@/lib/agentMeshMockData";
import { AGENT_MESH_BASE } from "@/lib/agentMeshRoutes";

export function generateStaticParams() {
  return marketplaceAgents.map((agent) => ({ id: agent.id }));
}

export default async function AgentMeshAgentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = marketplaceAgents.find((a) => a.id === id);
  if (!agent) notFound();

  const Icon = agent.icon;

  return (
    <div>
      <Link
        href={`${AGENT_MESH_BASE}/marketplace`}
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-signal"
      >
        <ArrowLeft className="size-3.5" />
        Back to Marketplace
      </Link>

      <div className="mt-6 border border-grid bg-surface/40 p-8">
        <div className="flex items-start gap-4">
          <Icon className="size-8 text-signal" />
          <div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              {agent.name}
            </h2>
            <Badge variant="secondary" className="mt-2">
              {agent.category}
            </Badge>
            <p className="mt-1 text-signal">{renderStars(agent.rating)}</p>
          </div>
        </div>

        <p className="mt-6 leading-relaxed text-muted-foreground">
          {agent.description}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Success Rate", value: `${agent.successRate}%`, accent: true },
            { label: "Average Cost", value: agent.averageCost },
            { label: "Avg Completion", value: agent.averageCompletion },
            { label: "Total Jobs", value: String(agent.totalJobs) },
          ].map((stat) => (
            <div key={stat.label} className="border border-grid bg-background/40 p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
              <p
                className={`mt-2 font-display text-3xl font-bold ${stat.accent ? "text-signal" : ""}`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Skills
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {agent.skills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <Button asChild className="mt-8 w-full font-mono uppercase tracking-widest">
          <Link href={`${AGENT_MESH_BASE}/hire`}>Hire This Agent</Link>
        </Button>
      </div>
    </div>
  );
}
