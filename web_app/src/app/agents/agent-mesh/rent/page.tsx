"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { LiveSteps } from "@/components/agent-mesh/live-steps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { gpuOptions, rentActivitySteps } from "@/lib/agentMeshMockData";
import { explorerTx } from "@/lib/agentMeshSolana";
import { AGENT_MESH_BASE } from "@/lib/agentMeshRoutes";

export default function AgentMeshRentPage() {
  const { connected } = useWallet();
  const [gpu, setGpu] = useState("RTX 4090");
  const [hours, setHours] = useState("5");
  const [minPrice, setMinPrice] = useState("0.5");
  const [maxPrice, setMaxPrice] = useState("0.8");
  const [listed, setListed] = useState(false);
  const [completed, setCompleted] = useState(false);

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
          <div className="mt-3">
            {connected ? (
              <Badge variant="success">Wallet Connected</Badge>
            ) : (
              <Badge variant="warn">Wallet Not Connected</Badge>
            )}
          </div>
        </div>
        {/* <WalletMultiButton className="wallet-adapter-button-trigger" /> */}
      </div>

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
                    step="0.1"
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
                    step="0.1"
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
              disabled={!connected || listed}
              onClick={() => setListed(true)}
            >
              List Compute
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Live Activity
          </h3>
          <div className="mt-4 border border-grid bg-surface/40 p-6">
            {!listed ? (
              <p className="text-sm text-muted-foreground">
                List your compute to see live agent activity.
              </p>
            ) : (
              <LiveSteps
                steps={rentActivitySteps}
                intervalMs={1400}
                onComplete={() => setCompleted(true)}
              />
            )}
          </div>

          {completed && (
            <div className="mt-6 border border-signal/30 bg-signal/5 p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Earnings
              </p>
              <p className="mt-2 font-display text-4xl font-bold text-signal">
                0.62 SOL
              </p>
              <a
                href={explorerTx(
                  "5Kp2nR8vXm3qL7wY9tF2hJ4kN6pR1sT8uV0xZ3aB5cD7eF9gH2iJ4kL6mN8oP0q"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-signal hover:underline"
              >
                View on Solana Explorer
                <ExternalLink className="size-3" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
