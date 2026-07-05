"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { LiveSteps } from "@/components/agent-mesh/live-steps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { gpuOptions } from "@/lib/agentMeshMockData";
import { getRentJob, listCompute, type RentJobResponse } from "@/lib/agentMeshApi";
import { coralSessionFromJob } from "@/lib/coralOs";
import { CoralSessionPanel } from "@/components/agent-mesh/coral-session-panel";
import { AGENT_MESH_BASE } from "@/lib/agentMeshRoutes";

export default function AgentMeshRentPage() {
  const { connected, publicKey } = useWallet();
  const [gpu, setGpu] = useState("RTX 4090");
  const [hours, setHours] = useState("5");
  const [minPrice, setMinPrice] = useState("0.001");
  const [maxPrice, setMaxPrice] = useState("0.01");
  const [listed, setListed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [job, setJob] = useState<RentJobResponse | null>(null);

  const pollJob = useCallback(async (jobId: string) => {
    const { job: next } = await getRentJob(jobId);
    setJob(next);
    return next;
  }, []);

  useEffect(() => {
    if (!job?.id || job.status === "completed" || job.status === "failed") {
      return;
    }

    const interval = setInterval(async () => {
      try {
        await pollJob(job.id);
      } catch (err) {
        setError((err as Error).message);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [job?.id, job?.status, pollJob]);

  const handleList = async () => {
    if (!publicKey) return;
    setLoading(true);
    setError(null);

    try {
      const { job: created } = await listCompute({
        providerWallet: publicKey.toBase58(),
        gpu,
        hours: Number(hours),
        minPriceSol: Number(minPrice),
        maxPriceSol: Number(maxPrice),
      });
      setJob(created);
      setListed(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const completed = job?.status === "completed";
  const failed = job?.status === "failed";

  return (
    <div>
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
            Rent Out My Compute
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Solana devnet — CoralOS matches agents to your GPU, then sends a real payout.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {connected ? (
              <Badge variant="success">Wallet Connected</Badge>
            ) : (
              <Badge variant="warn">Wallet Not Connected</Badge>
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

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="border border-grid bg-surface/40 p-6">
          <div className="space-y-5">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                GPU
              </label>
              <Select
                className="mt-2"
                value={gpu}
                onChange={(e) => setGpu(e.target.value)}
                disabled={listed}
              >
                {gpuOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Available for
              </label>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  disabled={listed}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">Hours</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Minimum Price
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.001"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    disabled={listed}
                  />
                  <span className="text-sm text-muted-foreground">SOL</span>
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Maximum Price
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.001"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    disabled={listed}
                  />
                  <span className="text-sm text-muted-foreground">SOL</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full font-mono uppercase tracking-widest"
              disabled={!connected || listed || loading}
              onClick={handleList}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Listing...
                </>
              ) : (
                "List Compute"
              )}
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Live Activity
          </h3>
          <div className="mt-4 border border-grid bg-surface/40 p-6">
            {!listed || !job ? (
              <p className="text-sm text-muted-foreground">
                List your compute to see live agent activity and a devnet payout.
              </p>
            ) : (
              <>
                <LiveSteps
                  steps={[...job.steps]}
                  externalIndex={job.currentStepIndex}
                />
                {job.negotiationNote && (
                  <p className="mt-4 text-sm italic text-muted-foreground">
                    &ldquo;{job.negotiationNote}&rdquo;
                  </p>
                )}
              </>
            )}
          </div>

          {job && listed && (
            <div className="mt-6">
              <CoralSessionPanel
                session={coralSessionFromJob(job, "rent")}
                status={
                  job.status === "completed"
                    ? "completed"
                    : job.status === "pending"
                      ? "awaiting"
                      : "active"
                }
              />
            </div>
          )}

          {failed && job?.error && (
            <div className="mt-6 border border-destructive/50 bg-destructive/10 p-6 text-sm">
              Job failed: {job.error}
            </div>
          )}

          {completed && job && (
            <div className="mt-6 border border-signal/30 bg-signal/5 p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Earnings (devnet)
              </p>
              <p className="mt-2 font-display text-4xl font-bold text-signal">
                {job.payoutSol?.toFixed(4) ?? "0.001"} SOL
              </p>
              {job.explorerUrl && (
                <a
                  href={job.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-signal hover:underline"
                >
                  View payout on Solana Explorer
                  <ExternalLink className="size-3" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
