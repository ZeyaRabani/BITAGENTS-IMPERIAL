import Link from "next/link";
import { Cpu, Users } from "lucide-react";
import { AGENT_MESH_BASE } from "@/lib/agentMeshRoutes";
import { landingFeatures } from "@/lib/agentMeshMockData";

export default function AgentMeshHomePage() {
  return (
    <div className="flex flex-col items-center py-8">
      <p className="font-mono text-[11px] uppercase tracking-widest text-signal">
        Launch
      </p>
      <h2 className="mt-4 text-center font-display text-2xl font-bold md:text-3xl">
        What would you like to do?
      </h2>
      <p className="mt-3 max-w-xl text-center text-sm text-muted-foreground">
        AgentMesh uses{" "}
        <a
          href="https://docs.coralos.ai/guides/quickstart"
          target="_blank"
          rel="noopener noreferrer"
          className="text-signal hover:underline"
        >
          CoralOS
        </a>{" "}
        to spin up multi-agent sessions with WANT → BID → AWARD market flows,
        settled on Solana devnet.
      </p>

      <div className="mt-10 flex w-full max-w-3xl flex-col items-stretch gap-6 md:flex-row md:items-center">
        <Link
          href={`${AGENT_MESH_BASE}/rent`}
          className="group flex flex-1 flex-col border border-grid bg-surface/40 p-8 transition-all hover:border-signal/50 hover:bg-surface/70"
        >
          <Cpu className="size-8 text-signal transition-transform group-hover:scale-110" />
          <h3 className="mt-6 font-display text-xl font-bold">Rent Out My Compute</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            Earn SOL when CoralOS agents match your GPU to inference jobs.
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
            Launch a CoralOS session — planner + specialists bid, execute, and
            settle your task.
          </p>
          <span className="mt-6 font-mono text-[10px] uppercase tracking-widest text-signal">
            Launch Team →
          </span>
        </Link>
      </div>

      <div className="mt-14 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        {landingFeatures.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="border border-grid bg-surface/30 p-5 text-left"
          >
            <Icon className="size-5 text-signal" />
            <h3 className="mt-3 font-display text-sm font-bold">{title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
