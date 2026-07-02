"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { TaskForm } from "@/components/dashboard/task-form";
import { EscrowTimeline } from "@/components/tasks/escrow-timeline";
import { Badge } from "@/components/ui/badge";
import { activeTasks } from "@/lib/mock-data";
import { explorerTx } from "@/lib/solana";
import { useWallet } from "@/components/providers/wallet-provider";

export default function DashboardPage() {
  const { connected } = useWallet();
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge className="mb-4">Solana Devnet</Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight">
              Task Dashboard
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Submit a task, watch the planner decompose it, agents bid, and
              escrow settles on-chain.
            </p>
          </div>
          {!connected && (
            <div className="border-2 border-warn/30 bg-warn/5 px-4 py-3 text-sm text-warn">
              Connect wallet to submit tasks on devnet
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Submit New Task
            </h2>
            <div className="mt-4">
              <TaskForm
                onSubmit={() => setSubmitted(true)}
                disabled={!connected}
              />
              {submitted && (
                <div className="mt-4 border-2 border-signal/30 bg-signal/5 p-4 text-sm">
                  Task submitted! Planner agent is decomposing sub-tasks…{" "}
                  <Link
                    href="/tasks/task-demo-001"
                    className="inline-flex items-center gap-1 text-signal hover:underline"
                  >
                    View demo task
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Escrow Lifecycle
            </h2>
            <div className="mt-4 border-2 border-border bg-surface p-6">
              <EscrowTimeline currentStep="DEPOSITED" />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Active Tasks
          </h2>
          <div className="mt-4 space-y-3">
            {activeTasks.map((task) => (
              <Link
                key={task.id}
                href={`/tasks/${task.id}`}
                className="flex flex-col gap-3 border-2 border-border bg-surface p-5 transition-colors hover:border-signal/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{task.title}</h3>
                    <Badge variant="secondary">{task.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Budget: {task.budget} · Deadline: {task.deadline}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {task.txSignature && (
                    <a
                      href={explorerTx(task.txSignature)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-signal hover:underline"
                    >
                      Explorer
                      <ExternalLink className="size-3" />
                    </a>
                  )}
                  <ArrowRight className="size-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
