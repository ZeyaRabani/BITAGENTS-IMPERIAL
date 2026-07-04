"use client";

import { cn } from "@/lib/utils";

interface AgentGraphProps {
  phase: "idle" | "planning" | "specialists" | "compute" | "done";
}

const nodes = {
  planner: { label: "Planner" },
  research: { label: "Research" },
  analysis: { label: "Token Analysis" },
  trade: { label: "Trade Agent" },
  router: { label: "Swap Router" },
  jupiter: { label: "Jupiter" },
  raydium: { label: "Raydium" },
  orca: { label: "Orca" },
};

function GraphNode({
  label,
  active,
  done,
}: {
  label: string;
  active?: boolean;
  done?: boolean;
}) {
  return (
    <div
      className={cn(
        "border px-4 py-2 text-center font-mono text-[10px] uppercase tracking-widest transition-all duration-500",
        done && "border-signal/30 bg-signal/10 text-signal",
        active && "animate-node-glow border-signal bg-signal/20 text-foreground",
        !active && !done && "border-grid bg-background/40 text-muted-foreground"
      )}
    >
      {label}
    </div>
  );
}

export function AgentGraph({ phase }: AgentGraphProps) {
  const plannerActive = phase === "planning";
  const plannerDone = ["specialists", "compute", "done"].includes(phase);
  const specialistsActive = phase === "specialists";
  const specialistsDone = ["compute", "done"].includes(phase);
  const executionActive = phase === "compute";
  const executionDone = phase === "done";

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <GraphNode
        label={nodes.planner.label}
        active={plannerActive}
        done={plannerDone}
      />

      <div className="h-6 w-px bg-border" />

      <div className="grid w-full grid-cols-3 gap-3">
        <GraphNode
          label={nodes.research.label}
          active={specialistsActive}
          done={specialistsDone}
        />
        <GraphNode
          label={nodes.analysis.label}
          active={specialistsActive}
          done={specialistsDone}
        />
        <GraphNode
          label={nodes.trade.label}
          active={specialistsActive}
          done={specialistsDone}
        />
      </div>

      <div className="h-6 w-px bg-border" />

      <GraphNode
        label={nodes.router.label}
        active={executionActive}
        done={executionDone}
      />

      <div className="h-6 w-px bg-border" />

      <div className="grid w-full grid-cols-3 gap-3">
        <GraphNode
          label={nodes.jupiter.label}
          active={executionActive}
          done={executionDone}
        />
        <GraphNode
          label={nodes.raydium.label}
          active={executionActive}
          done={executionDone}
        />
        <GraphNode
          label={nodes.orca.label}
          active={executionActive}
          done={executionDone}
        />
      </div>
    </div>
  );
}
