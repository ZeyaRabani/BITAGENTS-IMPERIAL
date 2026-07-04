"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface LiveStepsProps {
  steps: string[];
  intervalMs?: number;
  onComplete?: () => void;
  autoStart?: boolean;
  /** Server-driven step index (overrides internal timer when set). */
  externalIndex?: number;
}

export function LiveSteps({
  steps,
  intervalMs = 1200,
  onComplete,
  autoStart = true,
  externalIndex,
}: LiveStepsProps) {
  const [activeIndex, setActiveIndex] = useState(
    externalIndex ?? (autoStart ? 0 : -1)
  );

  const isServerDriven = externalIndex !== undefined;
  const currentIndex = isServerDriven ? externalIndex : activeIndex;

  useEffect(() => {
    if (isServerDriven) return;
    if (!autoStart || activeIndex < 0) return;

    if (activeIndex >= steps.length - 1) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setActiveIndex((prev) => prev + 1);
    }, intervalMs);

    return () => clearTimeout(timer);
  }, [
    activeIndex,
    steps.length,
    intervalMs,
    onComplete,
    autoStart,
    isServerDriven,
  ]);

  useEffect(() => {
    if (!isServerDriven) return;
    if (externalIndex >= steps.length - 1) {
      onComplete?.();
    }
  }, [externalIndex, steps.length, onComplete, isServerDriven]);

  if (currentIndex < 0) return null;

  return (
    <div className="space-y-2">
      {steps.map((step, i) => {
        const isComplete = i < currentIndex;
        const isActive = i === currentIndex;
        const isPending = i > currentIndex;

        return (
          <div
            key={`${step}-${i}`}
            className={cn(
              "flex items-center gap-3 border px-4 py-3 transition-all duration-500",
              isPending && "opacity-30 border-grid bg-background/40",
              isComplete && "border-signal/30 bg-signal/5",
              isActive && "animate-step-reveal border-signal bg-signal/10"
            )}
          >
            <div
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                (isComplete || isActive) &&
                  "border-signal bg-signal text-primary-foreground",
                isPending && "border-grid bg-background/40"
              )}
            >
              {isComplete ? (
                <Check className="size-3" />
              ) : isActive ? (
                <span className="size-2 rounded-full bg-primary-foreground animate-pulse-dot" />
              ) : null}
            </div>
            <span
              className={cn(
                "font-mono text-[11px] uppercase tracking-widest",
                isPending ? "text-muted-foreground" : "text-foreground"
              )}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
