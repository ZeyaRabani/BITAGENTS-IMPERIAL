"use client";

import { cn } from "@/lib/utils";

interface AgentGraphProps {
  phase: "idle" | "planning" | "specialists" | "compute" | "done";
}

const nodes = {
  planner: { label: "Planner", row: 0 },
  copy: { label: "Copy", row: 1, col: 0 },
  design: { label: "Design", row: 1, col: 1 },
  frontend: { label: "Frontend", row: 1, col: 2 },
  broker: { label: "Compute Broker", row: 2 },
  gpu1: { label: "GPU1", row: 3, col: 0 },
  gpu2: { label: "GPU2", row: 3, col: 1 },
  gpu3: { label: "GPU3", row: 3, col: 2 },
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
  const computeActive = phase === "compute";
  const computeDone = phase === "done";

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
          label={nodes.copy.label}
          active={specialistsActive}
          done={specialistsDone}
        />
        <GraphNode
          label={nodes.design.label}
          active={specialistsActive}
          done={specialistsDone}
        />
        <GraphNode
          label={nodes.frontend.label}
          active={specialistsActive}
          done={specialistsDone}
        />
      </div>

      <div className="h-6 w-px bg-border" />

      <GraphNode
        label={nodes.broker.label}
        active={computeActive}
        done={computeDone}
      />

      <div className="h-6 w-px bg-border" />

      <div className="grid w-full grid-cols-3 gap-3">
        <GraphNode
          label={nodes.gpu1.label}
          active={computeActive}
          done={computeDone}
        />
        <GraphNode
          label={nodes.gpu2.label}
          active={computeActive}
          done={computeDone}
        />
        <GraphNode
          label={nodes.gpu3.label}
          active={computeActive}
          done={computeDone}
        />
      </div>
    </div>
  );
}
