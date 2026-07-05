"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { AgentGraph } from "@/components/agent-mesh/agent-graph";
import { SettlementScreen } from "@/components/agent-mesh/settlement-screen";
import { LiveSteps } from "@/components/agent-mesh/live-steps";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  createHireTask,
  fundHireTask,
  getHireJob,
  type HireJobResponse,
} from "@/lib/agentMeshApi";
import { sendDevnetSol, fundHireTaskWithRetry, waitForSignature } from "@/lib/agentMeshSolanaClient";
import { coralSessionFromJob } from "@/lib/coralOs";
import { CoralSessionPanel } from "@/components/agent-mesh/coral-session-panel";
import { AGENT_MESH_BASE } from "@/lib/agentMeshRoutes";
import { cn } from "@/lib/utils";

type Phase = "form" | "funding" | "executing" | "settlement";

function graphPhaseFromStep(
  index: number
): "idle" | "planning" | "specialists" | "compute" | "done" {
  if (index < 5) return "planning";
  if (index < 8) return "specialists";
  if (index === 8) return "compute";
  return "done";
}

export default function AgentMeshHirePage() {
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [phase, setPhase] = useState<Phase>("form");
  const [task, setTask] = useState(
    "Buy EasyA token - it shows strong long-term potential.\n" +
      "Hire agents to run market research and token analysis, then place a buy order if conviction holds."
  );
  const [budget, setBudget] = useState("0.01");
  const [deadline, setDeadline] = useState("24");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [job, setJob] = useState<HireJobResponse | null>(null);

  const pollJob = useCallback(async (jobId: string) => {
    const { job: next } = await getHireJob(jobId);
    setJob(next);
    return next;
  }, []);

  useEffect(() => {
    if (
      phase !== "executing" ||
      !job?.id ||
      job.status === "completed" ||
      job.status === "failed"
    ) {
      return;
    }

    const interval = setInterval(async () => {
      try {
        const next = await pollJob(job.id);
        if (next.status === "completed") {
          clearInterval(interval);
          setPhase("settlement");
        }
        if (next.status === "failed") {
          clearInterval(interval);
          setError(next.error ?? "Hire job failed");
        }
      } catch (err) {
        setError((err as Error).message);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, job?.id, job?.status, pollJob]);

  const handleLaunch = async () => {
    if (!publicKey || !sendTransaction) return;
    setLoading(true);
    setError(null);

    try {
      const budgetSol = Number(budget);
      const { job: created, treasuryAddress } = await createHireTask({
        customerWallet: publicKey.toBase58(),
        task,
        budgetSol,
        deadlineHours: Number(deadline),
      });

      setJob(created);
      setPhase("funding");

      const fundingSignature = await sendDevnetSol({
        connection,
        from: publicKey,
        to: new PublicKey(treasuryAddress),
        amountSol: budgetSol,
        sendTransaction,
      });

      await waitForSignature(connection, fundingSignature);

      await fundHireTaskWithRetry(async (signature) => {
        const { job: funded } = await fundHireTask({
          id: created.id,
          fundingSignature: signature,
          customerWallet: publicKey.toBase58(),
        });
        setJob(funded);
      }, fundingSignature);

      setPhase("executing");
    } catch (err) {
      setError((err as Error).message);
      setPhase("form");
      setJob(null);
    } finally {
      setLoading(false);
    }
  };

  const stepIndex =
    job?.status === "running" || job?.status === "completed"
      ? Math.max(0, job.currentStepIndex)
      : -1;

  const graphPhase = useMemo(() => {
    if (phase === "form") return "idle";
    if (phase === "settlement") return "done";
    if (!job) return "planning";
    if (job.status === "completed") return "done";
    return graphPhaseFromStep(job.currentStepIndex);
  }, [phase, job]);

  const spent = job?.spentSol ?? (job?.logs.length ?? 0) * 0.001;
  const remaining = Math.max(0, parseFloat(budget) - spent);
  const executionDone = job?.status === "completed";

  const reset = () => {
    setPhase("form");
    setJob(null);
    setError(null);
  };

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
              <p className="mt-2 text-sm text-muted-foreground">
                CoralOS orchestrates the agent graph; OpenRouter powers specialist
                reasoning. Fund the treasury on devnet to start the session.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {connected ? (
                  <Badge variant="success">Wallet Connected</Badge>
                ) : (
                  <Badge variant="warn">Connect wallet to launch</Badge>
                )}
                <Badge variant="outline">Devnet</Badge>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </>
      )}

      {phase === "form" && (
        <div className="mx-auto mt-8 max-w-2xl">
          <div className="border border-grid bg-surface/40 p-6">
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Describe your investment task
            </label>
            <Textarea
              className="mt-2 min-h-[140px]"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Budget (min 0.001 SOL)
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.001"
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
              disabled={!connected || loading}
              onClick={handleLaunch}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Funding & launching...
                </>
              ) : (
                "Launch Autonomous Team"
              )}
            </Button>
          </div>
        </div>
      )}

      {phase === "funding" && (
        <div className="mx-auto mt-8 max-w-lg border border-signal/30 bg-signal/5 p-8 text-center">
          <Loader2 className="mx-auto size-8 animate-spin text-signal" />
          <p className="mt-4 font-display text-xl font-bold">Confirming payment</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Approve the devnet transfer in your wallet. This can take up to a
            minute on devnet.
          </p>
        </div>
      )}

      {phase === "executing" && job && (
        <div className="mt-8">
          <CoralSessionPanel
            session={coralSessionFromJob(job, "hire")}
            status={job.status === "completed" ? "completed" : "active"}
          />

          <h3 className="mt-8 font-mono text-[11px] uppercase tracking-widest text-signal">
            Live Execution
          </h3>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="border border-grid bg-surface/40 p-5">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Execution Timeline
              </h4>
              <div className="mt-4">
                {stepIndex < 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Starting agent pipeline...
                  </p>
                ) : (
                  <LiveSteps
                    steps={[...job.steps]}
                    externalIndex={stepIndex}
                  />
                )}
              </div>
            </div>
            <div className="border border-grid bg-surface/40 p-5">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                CoralOS Agent Graph
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
                    {spent.toFixed(4)} SOL
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Remaining
                  </p>
                  <p className="font-display text-2xl font-bold">
                    {remaining.toFixed(4)} SOL
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
              {job.logs.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Waiting for specialist bids from OpenRouter...
                </p>
              )}
              {job.logs.map((log, i) => (
                <div
                  key={`${log.agent}-${i}`}
                  className={cn(
                    "border border-grid bg-background/40 p-4 animate-step-reveal",
                    i === job.logs.length - 1 && "border-signal/30"
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
                Executing EasyA buy on Jupiter...
              </p>
            )}
          </div>
        </div>
      )}

      {phase === "settlement" && job && (
        <div className="mt-8">
          <SettlementScreen
            onReset={reset}
            subtitle="EasyA Purchase Settled via CoralOS"
            payments={job.settlementPayments}
            explorerUrl={
              job.settlementExplorerUrl ?? job.fundingExplorerUrl
            }
          />
        </div>
      )}
    </div>
  );
}
