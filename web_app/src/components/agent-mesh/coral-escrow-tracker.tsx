"use client";

import { cn } from "@/lib/utils";
import {
  CORAL_ESCROW_PHASES,
  type CoralEscrowPhase,
} from "@/lib/coralOs";

export function CoralEscrowTracker({ phase }: { phase: CoralEscrowPhase }) {
  const activeIndex = CORAL_ESCROW_PHASES.indexOf(phase);

  return (
    <div className="flex flex-wrap items-center gap-1">
      {CORAL_ESCROW_PHASES.map((step, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        return (
          <div key={step} className="flex items-center gap-1">
            <span
              className={cn(
                "border px-2 py-1 font-mono text-[9px] uppercase tracking-widest transition",
                done && "border-signal/40 bg-signal/10 text-signal",
                active && "animate-node-glow border-signal bg-signal/20 text-foreground",
                !done && !active && "border-grid text-muted-foreground"
              )}
            >
              {step}
            </span>
            {i < CORAL_ESCROW_PHASES.length - 1 && (
              <span className="text-muted-foreground">→</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
