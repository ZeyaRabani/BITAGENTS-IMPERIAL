import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Agent } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const Icon = agent.icon;
  const isActive = agent.status === "active";

  return (
    <div className="flex flex-col border-2 border-border bg-surface p-6 transition-colors hover:border-signal/30">
      <Icon className="size-5 text-signal" />
      <h3 className="mt-4 font-semibold">{agent.name}</h3>
      <Badge variant="secondary" className="mt-2 w-fit">
        {agent.category}
      </Badge>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {agent.description}
      </p>

      {isActive && agent.perTask && (
        <div className="mt-4 grid grid-cols-3 gap-2 border-t-2 border-border pt-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Per Task
            </p>
            <p className="mt-1 text-xs font-medium text-signal">{agent.perTask}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Total Tx
            </p>
            <p className="mt-1 text-xs font-medium">{agent.totalTx}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Volume
            </p>
            <p className="mt-1 text-xs font-medium">{agent.volume}</p>
          </div>
        </div>
      )}

      <div className="mt-4">
        {isActive ? (
          <Button
            asChild
            variant="outline"
            className="w-full border-signal/50 font-mono text-[10px] uppercase tracking-widest text-signal hover:bg-signal/10 hover:text-signal"
          >
            <Link href="/dashboard">
              Configure Agent
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        ) : (
          <Button
            disabled
            variant="outline"
            className="w-full font-mono text-[10px] uppercase tracking-widest"
          >
            Coming Soon
          </Button>
        )}
      </div>
    </div>
  );
}
