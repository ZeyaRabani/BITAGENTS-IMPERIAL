"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AGENT_MESH_BASE, AGENT_MESH_NAV } from "@/lib/agentMeshRoutes";

export function AgentMeshShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 border-b border-grid pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href="/agents"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition hover:text-signal"
          >
            ← BIT Agents Marketplace
          </Link>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">
            Agent<span className="text-signal">Mesh</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Autonomous AI compute &amp; workforce market · CoralOS orchestration ·
            Solana escrow
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <BadgeDevnet />
          <CoralBadge />
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-52">
          <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-1">
            {AGENT_MESH_NAV.map(({ href, label, match }) => {
              const active = match(pathname);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "whitespace-nowrap border px-3 py-2 font-mono text-[10px] uppercase tracking-widest transition",
                    active
                      ? "border-signal bg-signal/10 text-signal"
                      : "border-grid bg-surface/40 text-muted-foreground hover:border-signal/40 hover:text-foreground"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

function BadgeDevnet() {
  return (
    <span className="inline-flex border border-grid bg-surface/40 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
      Devnet
    </span>
  );
}

function CoralBadge() {
  return (
    <a
      href="https://docs.coralos.ai/guides/quickstart"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex border border-signal/40 bg-signal/10 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-signal transition hover:bg-signal/20"
    >
      Powered by CoralOS
    </a>
  );
}

export { AGENT_MESH_BASE };
