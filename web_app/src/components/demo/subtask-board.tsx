"use client";

import type { DemoState } from "@/hooks/use-demo-engine";
import type { EscrowStep } from "@/lib/demo-script";
import { escrowStepOrder } from "@/lib/demo-script";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

function EscrowDots({ current }: { current?: EscrowStep }) {
  const idx = current ? escrowStepOrder.indexOf(current) : -1;
  return (
    <div className="flex items-center gap-1">
      {escrowStepOrder.map((step, i) => (
        <span
          key={step}
          title={step}
          className={cn(
            "h-1 w-4 rounded-full transition-colors duration-500",
            i <= idx ? "bg-signal" : "bg-border"
          )}
        />
      ))}
    </div>
  );
}

export function SubtaskBoard({ state }: { state: DemoState }) {
  return (
    <div className="rounded-md border-2 border-border bg-surface">
      <div className="border-b-2 border-border px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Subtasks · Bids · Escrow
        </span>
      </div>
      <div className="space-y-2 p-3">
        {state.subtasks.length === 0 && (
          <p className="p-2 font-mono text-[11px] text-muted-foreground">
            Planner has not decomposed the objective yet…
          </p>
        )}
        {state.subtasks.map((st) => (
          <div
            key={st.id}
            className="animate-in fade-in slide-in-from-left-2 rounded-md border border-border bg-background p-3 duration-500"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold">{st.name}</span>
              <span className="font-mono text-[10px] text-muted-foreground">{st.budget}</span>
            </div>
            {st.bids.length > 0 && (
              <div className="mt-2 space-y-1">
                {st.bids.map((bid) => (
                  <div
                    key={bid.agent}
                    className={cn(
                      "flex items-center justify-between rounded-sm border px-2 py-1 font-mono text-[10px] animate-in fade-in duration-300",
                      st.awardedTo === bid.agent
                        ? "border-signal/50 bg-signal/10 text-signal"
                        : "border-border text-muted-foreground"
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      {st.awardedTo === bid.agent && <Check className="size-3" />}
                      {bid.agent}
                    </span>
                    <span>
                      {bid.amount} · {bid.confidence}%
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-2 flex items-center justify-between">
              <EscrowDots current={st.escrowStep} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                {st.escrowStep ?? "PENDING"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
