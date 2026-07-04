import Link from "next/link";
import { Cpu, Users } from "lucide-react";
import { AGENT_MESH_BASE } from "@/lib/agentMeshRoutes";

export default function AgentMeshHomePage() {
  return (
    <div className="flex flex-col items-center py-8">
      <p className="font-mono text-[11px] uppercase tracking-widest text-signal">
        Launch
      </p>
      <h2 className="mt-4 text-center font-display text-2xl font-bold md:text-3xl">
        What would you like to do?
      </h2>

      <div className="mt-10 flex w-full max-w-3xl flex-col items-stretch gap-6 md:flex-row md:items-center">
        <Link
          href={`${AGENT_MESH_BASE}/rent`}
          className="group flex flex-1 flex-col border border-grid bg-surface/40 p-8 transition-all hover:border-signal/50 hover:bg-surface/70"
        >
          <Cpu className="size-8 text-signal transition-transform group-hover:scale-110" />
          <h3 className="mt-6 font-display text-xl font-bold">Rent Out My Compute</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            Earn SOL by allowing AI agents to use your GPU.
          </p>
          <span className="mt-6 font-mono text-[10px] uppercase tracking-widest text-signal">
            List GPU →
          </span>
        </Link>

        <span className="text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          OR
        </span>

        <Link
          href={`${AGENT_MESH_BASE}/hire`}
          className="group flex flex-1 flex-col border border-grid bg-surface/40 p-8 transition-all hover:border-signal/50 hover:bg-surface/70"
        >
          <Users className="size-8 text-signal transition-transform group-hover:scale-110" />
          <h3 className="mt-6 font-display text-xl font-bold">Hire AI Agents</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            Set a budget and goal. Agents research, analyze, and execute the buy for you.
          </p>
          <span className="mt-6 font-mono text-[10px] uppercase tracking-widest text-signal">
            Launch Team →
          </span>
        </Link>
      </div>
    </div>
  );
}
