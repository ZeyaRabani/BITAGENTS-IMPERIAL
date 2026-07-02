import type { EscrowStatus } from "@/lib/mock-data";
import { escrowSteps } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface EscrowTimelineProps {
  currentStep: EscrowStatus;
  compact?: boolean;
}

export function EscrowTimeline({ currentStep, compact }: EscrowTimelineProps) {
  const currentIndex = escrowSteps.indexOf(currentStep);

  return (
    <div className={cn("flex flex-wrap gap-2", compact && "gap-1")}>
      {escrowSteps.map((step, i) => {
        const isComplete = i < currentIndex;
        const isCurrent = i === currentIndex;

        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-2 border-2 px-3 py-2",
                isComplete && "border-signal/30 bg-signal/10",
                isCurrent && "border-signal bg-signal/20",
                !isComplete && !isCurrent && "border-border bg-background"
              )}
            >
              {isComplete && <Check className="size-3 text-signal" />}
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-widest",
                  isComplete || isCurrent ? "text-signal" : "text-muted-foreground"
                )}
              >
                {step}
              </span>
            </div>
            {i < escrowSteps.length - 1 && (
              <div
                className={cn(
                  "h-px w-4",
                  i < currentIndex ? "bg-signal" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
