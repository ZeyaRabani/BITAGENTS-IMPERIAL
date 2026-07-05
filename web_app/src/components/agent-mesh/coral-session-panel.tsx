"use client";

import { ExternalLink, Network, Server } from "lucide-react";
import { CoralEscrowTracker } from "@/components/agent-mesh/coral-escrow-tracker";
import { Badge } from "@/components/ui/badge";
import {
  CORAL_DOCS_URL,
  type CoralSessionInfo,
} from "@/lib/coralOs";
import { truncateAddress } from "@/lib/agentMeshSolana";

interface CoralSessionPanelProps {
  session: CoralSessionInfo;
  status?: "active" | "completed" | "awaiting";
}

export function CoralSessionPanel({
  session,
  status = "active",
}: CoralSessionPanelProps) {
  return (
    <div className="border border-grid bg-surface/40 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Server className="size-4 text-signal" />
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-signal">
              CoralOS Session
            </h4>
            <Badge variant="outline" className="font-mono text-[9px]">
              {status === "completed"
                ? "Terminated"
                : status === "awaiting"
                  ? "Provisioning"
                  : "Running"}
            </Badge>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Multi-agent graph orchestrated via Coral Server ·{" "}
            <a
              href={CORAL_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal hover:underline"
            >
              CoralOS docs
            </a>
          </p>
        </div>
        <a
          href={session.consoleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground hover:text-signal"
        >
          Coral Console
          <ExternalLink className="size-3" />
        </a>
      </div>

      <dl className="mt-5 grid gap-3 text-xs sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Session ID
          </dt>
          <dd className="mt-1 font-mono text-foreground">
            {truncateAddress(session.sessionId, 8)}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Template
          </dt>
          <dd className="mt-1 font-mono text-foreground">{session.template}</dd>
        </div>
        <div>
          <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Coral Server
          </dt>
          <dd className="mt-1 font-mono text-foreground">{session.serverUrl}</dd>
        </div>
        <div>
          <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Session TTL
          </dt>
          <dd className="mt-1 font-mono text-foreground">
            {session.ttlMinutes} min
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            MCP endpoint
          </dt>
          <dd className="mt-1 break-all font-mono text-[11px] text-muted-foreground">
            {session.mcpUrl}
          </dd>
        </div>
      </dl>

      <div className="mt-5">
        <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
          Market protocol (WANT → BID → AWARD)
        </p>
        <div className="mt-3">
          <CoralEscrowTracker phase={session.escrowPhase} />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Network className="size-4 shrink-0 text-muted-foreground" />
        {session.agents.map((agent) => (
          <span
            key={agent}
            className="border border-grid bg-background/40 px-2 py-1 font-mono text-[9px] uppercase tracking-widest"
          >
            {agent}
          </span>
        ))}
      </div>
    </div>
  );
}
