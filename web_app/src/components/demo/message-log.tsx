"use client";

import { useEffect, useRef } from "react";
import type { DemoState } from "@/hooks/use-demo-engine";
import { cn } from "@/lib/utils";

const protocolColors: Record<string, string> = {
  WANT: "text-warn",
  BID: "text-signal",
  AWARD: "text-emerald-400",
  ESCROW: "text-purple-400",
  FUND: "text-purple-400",
  DELIVER: "text-sky-400",
  VERIFY: "text-emerald-400",
  RELEASE: "text-emerald-400",
  DISCOVER: "text-muted-foreground",
  PLAN: "text-warn",
  COMPLETE: "text-emerald-400",
};

export function MessageLog({ state }: { state: DemoState }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [state.logs.length]);

  return (
    <div className="flex h-full flex-col rounded-md border-2 border-border bg-background">
      <div className="flex items-center justify-between border-b-2 border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-signal animate-pulse-dot" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            CoralOS Message Bus
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">
          {state.logs.length} msgs
        </span>
      </div>
      <div className="flex-1 space-y-1.5 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed">
        {state.logs.length === 0 && (
          <p className="text-muted-foreground">Awaiting objective…</p>
        )}
        {state.logs.map((log) => (
          <div key={log.id} className="animate-in fade-in slide-in-from-bottom-1 duration-300">
            <span className="text-muted-foreground">
              {log.from} → {log.to}
            </span>{" "}
            <span className={cn("font-bold", protocolColors[log.protocol] ?? "text-foreground")}>
              [{log.protocol}]
            </span>{" "}
            <span className="text-foreground/90">{log.message}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
