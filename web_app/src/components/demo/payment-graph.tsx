"use client";

import type { DemoState } from "@/hooks/use-demo-engine";
import { cn } from "@/lib/utils";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
}

const nodes: Node[] = [
  { id: "Customer", label: "Customer", x: 400, y: 36 },
  { id: "Escrow", label: "Solana Escrow", x: 400, y: 130 },
  { id: "Planner Agent", label: "Planner", x: 400, y: 224 },
  { id: "Token Research Agent", label: "Research", x: 90, y: 330 },
  { id: "Copy Agent", label: "Copy", x: 245, y: 330 },
  { id: "Design Agent", label: "Design", x: 400, y: 330 },
  { id: "Frontend Agent", label: "Frontend", x: 555, y: 330 },
  { id: "QA Agent", label: "QA", x: 710, y: 330 },
  { id: "GPU Provider B", label: "GPU B", x: 400, y: 430 },
];

const edges: [string, string][] = [
  ["Customer", "Escrow"],
  ["Escrow", "Planner Agent"],
  ["Escrow", "Token Research Agent"],
  ["Escrow", "Copy Agent"],
  ["Escrow", "Design Agent"],
  ["Escrow", "Frontend Agent"],
  ["Escrow", "QA Agent"],
  ["Design Agent", "GPU Provider B"],
];

const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

function edgePath(from: string, to: string) {
  const a = nodeMap[from];
  const b = nodeMap[to];
  return `M ${a.x} ${a.y + 18} L ${b.x} ${b.y - 18}`;
}

export function PaymentGraph({ state }: { state: DemoState }) {
  const paidEdges = new Set(
    state.payments.map((p) =>
      p.from === "Escrow" && p.to === "Customer"
        ? "Customer->Escrow"
        : `${p.from}->${p.to}`
    )
  );
  const lastPayment = state.payments[state.payments.length - 1];

  return (
    <div className="rounded-md border-2 border-border bg-surface">
      <div className="flex items-center justify-between border-b-2 border-border px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Payment Graph · Solana Devnet
        </span>
        <span className="font-mono text-[10px] text-signal">
          {lastPayment ? `${lastPayment.from} → ${lastPayment.to} · ${lastPayment.amount}` : "—"}
        </span>
      </div>
      <svg viewBox="0 0 800 480" className="w-full">
        {edges.map(([from, to]) => {
          const key = `${from}->${to}`;
          const active = paidEdges.has(key);
          return (
            <path
              key={key}
              d={edgePath(from, to)}
              fill="none"
              stroke={active ? "var(--signal)" : "var(--border)"}
              strokeWidth={active ? 2 : 1.5}
              strokeDasharray={active ? "none" : "4 4"}
              className="transition-all duration-700"
            />
          );
        })}
        {state.payments.map((p) => {
          const reverse = p.from === "Escrow" && p.to === "Customer";
          const path = reverse
            ? `M ${nodeMap["Escrow"].x} ${nodeMap["Escrow"].y - 18} L ${nodeMap["Customer"].x} ${nodeMap["Customer"].y + 18}`
            : edgePath(p.from, p.to);
          return (
            <g key={p.id}>
              <circle r="5" fill="var(--signal)">
                <animateMotion dur="1.4s" repeatCount="3" path={path} />
              </circle>
              <circle r="9" fill="var(--signal)" opacity="0.25">
                <animateMotion dur="1.4s" repeatCount="3" path={path} />
              </circle>
            </g>
          );
        })}
        {nodes.map((node) => {
          const received = state.payments.some((p) => p.to === node.id);
          const isEscrow = node.id === "Escrow";
          return (
            <g key={node.id}>
              <rect
                x={node.x - 62}
                y={node.y - 17}
                width={124}
                height={34}
                rx={4}
                fill={isEscrow ? "rgba(255,107,74,0.08)" : "var(--background)"}
                stroke={received || (isEscrow && state.masterEscrow) ? "var(--signal)" : "var(--border)"}
                strokeWidth={2}
                className="transition-all duration-700"
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                className={cn(
                  "fill-foreground font-mono uppercase",
                  received ? "fill-[var(--signal)]" : ""
                )}
                style={{ fontSize: 11, letterSpacing: "0.08em" }}
                fill={received ? "var(--signal)" : "var(--foreground)"}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="grid grid-cols-3 gap-px border-t-2 border-border bg-border">
        {[
          { label: "Escrow Volume", value: state.masterEscrow ? "3.00 SOL" : "—" },
          {
            label: "Payments Settled",
            value: String(state.payments.length),
          },
          {
            label: "Refunded",
            value: state.payments.some((p) => p.to === "Customer") ? "0.15 SOL" : "—",
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface px-4 py-3">
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-1 font-display text-lg font-bold text-signal">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
