"use client";

import type { DemoAgentState } from "@/lib/demo-script";
import { demoAgents } from "@/lib/demo-script";
import type { DemoState } from "@/hooks/use-demo-engine";
import { cn } from "@/lib/utils";

const stateStyles: Record<DemoAgentState, { label: string; className: string; dot: string }> = {
  idle: { label: "Idle", className: "text-muted-foreground border-border", dot: "bg-muted-foreground" },
  thinking: { label: "Thinking", className: "text-warn border-warn/40", dot: "bg-warn animate-pulse-dot" },
  bidding: { label: "Bidding", className: "text-signal border-signal/40", dot: "bg-signal animate-pulse-dot" },
  working: { label: "Working", className: "text-signal border-signal/60", dot: "bg-signal animate-pulse-dot" },
  waiting: { label: "Waiting", className: "text-warn border-warn/40", dot: "bg-warn" },
  completed: { label: "Completed", className: "text-emerald-400 border-emerald-400/40", dot: "bg-emerald-400" },
  paid: { label: "Paid", className: "text-emerald-400 border-emerald-400/60", dot: "bg-emerald-400" },
};

export function AgentGrid({ state }: { state: DemoState }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {demoAgents.map((agent) => {
        const live = state.agents[agent.id];
        const style = stateStyles[live.state];
        const active = live.state !== "idle";
        return (
          <div
            key={agent.id}
            className={cn(
              "rounded-md border-2 bg-surface p-3 transition-all duration-500",
              active ? "border-border shadow-[0_0_20px_rgba(255,107,74,0.06)]" : "border-border/60 opacity-60",
              (live.state === "working" || live.state === "bidding") && "border-signal/40",
              live.state === "paid" && "border-emerald-400/40"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xl leading-none">{agent.avatar}</span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-sm border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest",
                  style.className
                )}
              >
                <span className={cn("size-1.5 rounded-full", style.dot)} />
                {style.label}
              </span>
            </div>
            <p className="mt-2 truncate text-sm font-semibold">{agent.name}</p>
            <p className="truncate font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              {agent.role}
            </p>
            <p className="mt-2 h-4 truncate text-xs text-signal/90">
              {live.task ?? "—"}
            </p>
            <div className="mt-2 flex justify-between border-t border-border pt-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              <span>{agent.price}</span>
              <span>Rep {agent.reputation}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
