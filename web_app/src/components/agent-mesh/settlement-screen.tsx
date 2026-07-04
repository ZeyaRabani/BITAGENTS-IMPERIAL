"use client";

import { ExternalLink, Check } from "lucide-react";
import { explorerTx } from "@/lib/agentMeshSolana";
import { settlementPayments, DEMO_TX_SIGNATURE } from "@/lib/agentMeshMockData";
import { AGENT_MESH_BASE } from "@/lib/agentMeshRoutes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SettlementScreenProps {
  onReset: () => void;
}

export function SettlementScreen({ onReset }: SettlementScreenProps) {
  return (
    <div className="mx-auto max-w-lg">
      <div className="border-2 border-signal/40 bg-signal/5 p-8 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full border-2 border-signal bg-signal/20">
          <Check className="size-8 text-signal" />
        </div>
        <h2 className="mt-6 font-display text-3xl font-bold">Task Completed</h2>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-signal">
          Payment Released
        </p>
      </div>

      <div className="mt-8 space-y-0">
        {settlementPayments.map((item, i) => (
          <div key={item.label}>
            <div className="flex items-center justify-between border border-grid bg-surface/40 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-6 items-center justify-center rounded-full border-2 border-signal bg-signal/10">
                  <Check className="size-3.5 text-signal" />
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
              {item.amount && (
                <span className="font-mono text-sm text-signal">{item.amount}</span>
              )}
            </div>
            {i < settlementPayments.length - 1 && (
              <div className="flex justify-center py-1">
                <div className="h-4 w-px bg-signal/50" />
              </div>
            )}
          </div>
        ))}
      </div>

      <a
        href={explorerTx(DEMO_TX_SIGNATURE)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex items-center justify-center gap-2 border-2 border-signal/50 bg-surface py-4 font-mono text-[11px] uppercase tracking-widest text-signal transition-colors hover:bg-signal/10"
      >
        View on Solana Explorer
        <ExternalLink className="size-4" />
      </a>

      <div className="mt-4 flex gap-3">
        <Button
          variant="outline"
          className="flex-1 font-mono uppercase tracking-widest"
          onClick={onReset}
        >
          New Task
        </Button>
        <Button asChild className="flex-1 font-mono uppercase tracking-widest">
          <Link href={`${AGENT_MESH_BASE}/dashboard`}>View Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
