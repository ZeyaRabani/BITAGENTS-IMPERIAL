"use client";

import { useState } from "react";
import type { DemoState } from "@/hooks/use-demo-engine";
import type { Deliverable } from "@/lib/demo-script";
import { cn } from "@/lib/utils";
import { FileText, Image as ImageIcon, Code2, Search, TrendingUp, ShieldCheck } from "lucide-react";

const kindIcons = {
  research: Search,
  copy: FileText,
  image: ImageIcon,
  code: Code2,
  strategy: TrendingUp,
  qa: ShieldCheck,
};

function HeroImagePreview() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {["#ff6b4a", "#f4a261", "#e76f51", "#ff8c69"].map((color, i) => (
        <div
          key={color}
          className="relative flex aspect-video items-center justify-center overflow-hidden rounded-md border border-border"
          style={{
            background: `radial-gradient(circle at ${i % 2 === 0 ? "30%" : "70%"} ${i < 2 ? "30%" : "70%"}, ${color}33, #0c0a09 70%)`,
          }}
        >
          <div className="text-center">
            <p className="font-display text-sm font-bold" style={{ color }}>
              $KICK
            </p>
            <p className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
              Variant {String.fromCharCode(65 + i)} · 1920×1080
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DeliverablesPanel({ state }: { state: DemoState }) {
  const [manual, setManual] = useState<{ id: string; count: number } | null>(null);
  const items = state.deliverables;

  // Follow the newest deliverable unless the user picked one since it arrived.
  const active: Deliverable | undefined =
    manual && manual.count === items.length
      ? items.find((x) => x.id === manual.id)
      : items[items.length - 1];

  return (
    <div className="rounded-md border-2 border-border bg-surface">
      <div className="flex items-center justify-between border-b-2 border-border px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Deliverables
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">{items.length} / 6</span>
      </div>
      {items.length === 0 ? (
        <p className="p-5 font-mono text-[11px] text-muted-foreground">
          Deliverables will appear as agents complete work…
        </p>
      ) : (
        <div className="p-3">
          <div className="flex flex-wrap gap-1.5">
            {items.map((item) => {
              const Icon = kindIcons[item.kind];
              return (
                <button
                  key={item.id}
                  onClick={() => setManual({ id: item.id, count: items.length })}
                  className={cn(
                    "flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-widest transition-colors animate-in fade-in zoom-in-95 duration-300",
                    active?.id === item.id
                      ? "border-signal bg-signal/10 text-signal"
                      : "border-border text-muted-foreground hover:border-signal/40 hover:text-foreground"
                  )}
                >
                  <Icon className="size-3" />
                  {item.kind}
                </button>
              );
            })}
          </div>
          {active && (
            <div className="mt-3 rounded-md border border-border bg-background">
              <div className="flex items-center justify-between border-b border-border px-4 py-2">
                <span className="text-xs font-semibold">{active.title}</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  {active.agent}
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto p-4">
                {active.kind === "image" ? (
                  <HeroImagePreview />
                ) : (
                  <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-foreground/90">
                    {active.content}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
