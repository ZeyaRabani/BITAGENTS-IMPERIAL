"use client";

import type { DemoState } from "@/hooks/use-demo-engine";
import { cn } from "@/lib/utils";
import { Cpu, Zap } from "lucide-react";

export function ComputePanel({ state }: { state: DemoState }) {
  return (
    <div className="rounded-md border-2 border-border bg-surface">
      <div className="flex items-center gap-2 border-b-2 border-border px-4 py-2.5">
        <Cpu className="size-3.5 text-signal" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Compute Spot Market
        </span>
      </div>
      <div className="p-3">
        {!state.computeRequest ? (
          <p className="p-2 font-mono text-[11px] text-muted-foreground">
            No compute requests yet…
          </p>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="rounded-md border border-warn/40 bg-warn/5 p-3">
              <p className="font-mono text-[9px] uppercase tracking-widest text-warn">
                WANT · {state.computeRequest.buyer}
              </p>
              <p className="mt-1 text-xs text-foreground/90">{state.computeRequest.spec}</p>
            </div>
            <div className="mt-2 space-y-1.5">
              {state.computeBids.map((bid) => (
                <div
                  key={bid.provider}
                  className={cn(
                    "flex items-center justify-between rounded-sm border px-3 py-2 font-mono text-[10px] transition-colors duration-500 animate-in fade-in slide-in-from-right-2",
                    bid.awarded
                      ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-400"
                      : state.computeAwarded
                        ? "border-border text-muted-foreground opacity-50"
                        : "border-signal/40 text-foreground"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {bid.awarded && <Zap className="size-3" />}
                    {bid.provider}
                  </span>
                  <span>
                    {bid.amount} · {bid.latency}
                  </span>
                </div>
              ))}
            </div>
            {state.computeAwarded && (
              <p className="mt-2 animate-in fade-in font-mono text-[10px] uppercase tracking-widest text-emerald-400 duration-500">
                ✓ Compute purchased · {state.computeAwarded.provider} ·{" "}
                {state.computeAwarded.amount}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
