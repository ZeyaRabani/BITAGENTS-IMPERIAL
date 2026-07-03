"use client";

import { useState } from "react";
import { ExternalLink, Play, RotateCcw, Check } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentGrid } from "@/components/demo/agent-grid";
import { MessageLog } from "@/components/demo/message-log";
import { SubtaskBoard } from "@/components/demo/subtask-board";
import { ComputePanel } from "@/components/demo/compute-panel";
import { PaymentGraph } from "@/components/demo/payment-graph";
import { DeliverablesPanel } from "@/components/demo/deliverables-panel";
import { useDemoEngine } from "@/hooks/use-demo-engine";
import { escrowStepOrder, demoDurationMs } from "@/lib/demo-script";
import { explorerAddress, explorerTx } from "@/lib/solana";
import { cn } from "@/lib/utils";

const MOCK_ESCROW = "EsKk7wZpQm3vN8xR2tYuJ4bHc9dLfGa5eSiPnM6oXxMp";
const MOCK_TX = "5Kp2vQ8xWnR4tYmJ7bHc3dLfGa9eSiPnM6oXzAqEuKj1TvB2cN8xR4tYmJ7bHc3dLfnR8v";

export default function DemoPage() {
  const { state, start, reset } = useDemoEngine();
  const [objective, setObjective] = useState("Launch a campaign for my Kickstart token");
  const [budget, setBudget] = useState("3");
  const [deadline, setDeadline] = useState("5");

  const started = state.running || state.finished;
  const progress = Math.min(100, (state.elapsedMs / demoDurationMs) * 100);
  const masterIdx = state.masterEscrow ? escrowStepOrder.indexOf(state.masterEscrow) : -1;

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header + objective form */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-signal">
              Live Demo · Deterministic · ~60s
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Watch an agent economy run itself
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Submit one objective. The Planner hires specialists, agents bid, compute is
              purchased on a spot market, work is verified, and payments settle on Solana.
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            start();
          }}
          className="mt-8 grid gap-3 rounded-md border-2 border-border bg-surface p-4 md:grid-cols-[1fr_140px_140px_auto]"
        >
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Objective
            </label>
            <Input
              className="mt-1.5"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              disabled={state.running}
            />
          </div>
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Budget (SOL)
            </label>
            <Input
              className="mt-1.5"
              type="number"
              step="0.5"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              disabled={state.running}
            />
          </div>
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Deadline (min)
            </label>
            <Input
              className="mt-1.5"
              type="number"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              disabled={state.running}
            />
          </div>
          <div className="flex items-end gap-2">
            <Button
              type="submit"
              disabled={state.running}
              className="font-mono uppercase tracking-widest"
            >
              {state.finished ? <RotateCcw className="size-4" /> : <Play className="size-4" />}
              {state.finished ? "Replay" : state.running ? "Running…" : "Submit"}
            </Button>
            {started && !state.running && (
              <Button
                type="button"
                variant="outline"
                onClick={reset}
                className="font-mono uppercase tracking-widest"
              >
                Reset
              </Button>
            )}
          </div>
        </form>

        {/* Phase banner + progress */}
        {started && (
          <div className="mt-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between rounded-md border-2 border-signal/30 bg-signal/5 px-4 py-3">
              <div className="flex items-center gap-3">
                {state.finished ? (
                  <Check className="size-4 text-emerald-400" />
                ) : (
                  <span className="size-2 rounded-full bg-signal animate-pulse-dot" />
                )}
                <span className="font-mono text-[11px] uppercase tracking-widest text-signal">
                  {state.phase || "Initializing mesh…"}
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">
                T+{Math.floor(state.elapsedMs / 1000)}s
              </span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full bg-signal transition-all duration-500"
                style={{ width: `${state.finished ? 100 : progress}%` }}
              />
            </div>

            {/* Master escrow timeline */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md border-2 border-border bg-surface px-4 py-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  Master Escrow
                </span>
                {escrowStepOrder.map((step, i) => (
                  <span
                    key={step}
                    className={cn(
                      "rounded-sm border px-2 py-1 font-mono text-[9px] uppercase tracking-widest transition-colors duration-500",
                      i < masterIdx && "border-signal/30 bg-signal/10 text-signal",
                      i === masterIdx && "border-signal bg-signal/20 text-signal",
                      i > masterIdx && "border-border text-muted-foreground"
                    )}
                  >
                    {step}
                  </span>
                ))}
              </div>
              {masterIdx >= 0 && (
                <div className="flex gap-4 font-mono text-[10px]">
                  <a
                    href={explorerAddress(MOCK_ESCROW)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-signal hover:underline"
                  >
                    Escrow EsKk…9xMp <ExternalLink className="size-3" />
                  </a>
                  {masterIdx >= 1 && (
                    <a
                      href={explorerTx(MOCK_TX)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-signal hover:underline"
                    >
                      Tx 5Kp2…nR8v <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main grid */}
        {started && (
          <div className="mt-6 grid gap-4 lg:grid-cols-5">
            <div className="space-y-4 lg:col-span-3">
              <AgentGrid state={state} />
              <PaymentGraph state={state} />
            </div>
            <div className="space-y-4 lg:col-span-2">
              <div className="h-64">
                <MessageLog state={state} />
              </div>
              <SubtaskBoard state={state} />
              <ComputePanel state={state} />
            </div>
            <div className="lg:col-span-5">
              <DeliverablesPanel state={state} />
            </div>
          </div>
        )}

        {/* Finished summary */}
        {state.finished && (
          <div className="mt-6 grid gap-px overflow-hidden rounded-md border-2 border-emerald-400/30 bg-border sm:grid-cols-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {[
              { label: "Objective delivered", value: "4m 12s" },
              { label: "Agents paid", value: "7" },
              { label: "SOL settled", value: "2.885" },
              { label: "QA score", value: "96 / 100" },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface px-5 py-4">
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-emerald-400">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {!started && (
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "One objective in",
                desc: "You give the mesh a goal, a budget, and a deadline. That's the only human input.",
              },
              {
                step: "02",
                title: "Agents hire agents",
                desc: "The Planner decomposes work, specialists bid via CoralOS, and the Design Agent buys GPU compute on a spot market.",
              },
              {
                step: "03",
                title: "Money flows on Solana",
                desc: "Escrow funds on submit, QA gates release, and every agent — including the GPU provider — gets paid automatically.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-md border-2 border-border bg-surface p-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-signal">
                  Step {item.step}
                </span>
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
