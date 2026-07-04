"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { AgentGraph } from "@/components/agent-mesh/agent-graph";
import { SettlementScreen } from "@/components/agent-mesh/settlement-screen";
import { LiveSteps } from "@/components/agent-mesh/live-steps";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { hireAgentLogs, hireTimelineSteps } from "@/lib/agentMeshMockData";
import { AGENT_MESH_BASE } from "@/lib/agentMeshRoutes";
import { cn } from "@/lib/utils";

type Phase = "form" | "executing" | "settlement";

export default function AgentMeshHirePage() {
  const { connected } = useWallet();
  const [phase, setPhase] = useState<Phase>("form");
  const [task, setTask] = useState(
    "Build me a SaaS landing page with React and Tailwind.\nNeed it in under 5 hours."
  );
  const [budget, setBudget] = useState("0.5");
  const [deadline, setDeadline] = useState("5");
  const [graphPhase, setGraphPhase] = useState<
    "idle" | "planning" | "specialists" | "compute" | "done"
  >("idle");
  const [spent, setSpent] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState(0);
  const [executionDone, setExecutionDone] = useState(false);

  const handleLaunch = () => {
    setPhase("executing");
    setGraphPhase("planning");
    setSpent(0);
    setVisibleLogs(0);
    setExecutionDone(false);
  };

  const handleExecutionComplete = useCallback(() => {
    setExecutionDone(true);
    setGraphPhase("done");
    setSpent(0.41);
    setTimeout(() => setPhase("settlement"), 2000);
  }, []);

  useEffect(() => {
    if (phase !== "executing") return;
    const timers = [
      setTimeout(() => setGraphPhase("specialists"), 3000),
      setTimeout(() => setGraphPhase("compute"), 7000),
      setTimeout(() => setSpent(0.18), 4000),
      setTimeout(() => setSpent(0.29), 6000),
      setTimeout(() => setSpent(0.41), 9000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== "executing") return;
    const interval = setInterval(() => {
      setVisibleLogs((prev) => {
        if (prev >= hireAgentLogs.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, [phase]);

  const remaining = Math.max(0, parseFloat(budget) - spent);

  return (
    <div>
      {phase !== "settlement" && (
        <>
          <Link
            href={AGENT_MESH_BASE}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-signal"
          >
            <ArrowLeft className="size-3.5" />
            Back
          </Link>

          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Hire AI Agents
              </h2>
              <div className="mt-3">
                {connected ? (
                  <Badge variant="success">Wallet Connected</Badge>
                ) : (
                  <Badge variant="warn">Connect wallet to launch</Badge>
                )}
              </div>
            </div>
            {/* <WalletMultiButton className="wallet-adapter-button-trigger" /> */}
          </div>
        </>
      )}

      {phase === "form" && (
        <div className="mx-auto mt-8 max-w-2xl">
          <div className="border border-grid bg-surface/40 p-6">
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Describe your task
            </label>
            <Textarea
              className="mt-2 min-h-[140px]"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Budget
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                  <span className="text-sm text-muted-foreground">SOL</span>
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Deadline
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <Input
                    type="number"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                  <span className="text-sm text-muted-foreground">Hours</span>
                </div>
              </div>
            </div>
            <Button
              className="mt-6 w-full font-mono uppercase tracking-widest"
              disabled={!connected}
              onClick={handleLaunch}
            >
              Launch Autonomous Team
            </Button>
          </div>
        </div>
      )}

      {phase === "executing" && (
        <div className="mt-8">
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-signal">
            Live Execution
          </h3>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="border border-grid bg-surface/40 p-5">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Execution Timeline
              </h4>
              <div className="mt-4">
                <LiveSteps
                  steps={hireTimelineSteps}
                  intervalMs={1100}
                  onComplete={handleExecutionComplete}
                />
              </div>
            </div>
            <div className="border border-grid bg-surface/40 p-5">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Live Agent Graph
              </h4>
              <AgentGraph phase={graphPhase} />
            </div>
            <div className="border border-grid bg-surface/40 p-5">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Budget Tracker
              </h4>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Budget
                  </p>
                  <p className="font-display text-2xl font-bold">{budget} SOL</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Spent
                  </p>
                  <p className="font-display text-2xl font-bold text-signal">
                    {spent.toFixed(2)} SOL
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Remaining
                  </p>
                  <p className="font-display text-2xl font-bold">
                    {remaining.toFixed(2)} SOL
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 border border-grid bg-surface/40 p-5">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Live Logs
            </h4>
            <div className="mt-4 space-y-4">
              {hireAgentLogs.slice(0, visibleLogs).map((log, i) => (
                <div
                  key={log.agent}
                  className={cn(
                    "border border-grid bg-background/40 p-4 animate-step-reveal",
                    i === visibleLogs - 1 && "border-signal/30"
                  )}
                >
                  <p className="font-semibold">{log.agent}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Bid: <span className="text-signal">{log.bid}</span>
                  </p>
                  <Separator className="my-3" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Reasoning:
                  </p>
                  <p className="mt-1 text-sm italic text-muted-foreground">
                    &ldquo;{log.reasoning}&rdquo;
                  </p>
                </div>
              ))}
            </div>
            {executionDone && (
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-signal">
                Finalizing settlement...
              </p>
            )}
          </div>
        </div>
      )}

      {phase === "settlement" && (
        <div className="mt-8">
          <SettlementScreen
            onReset={() => {
              setPhase("form");
              setGraphPhase("idle");
              setSpent(0);
              setVisibleLogs(0);
            }}
          />
        </div>
      )}
    </div>
  );
}
