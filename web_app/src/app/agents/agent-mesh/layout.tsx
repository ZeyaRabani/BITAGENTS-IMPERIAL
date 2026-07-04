import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AgentMeshShell } from "@/components/agent-mesh/AgentMeshShell";

export const metadata: Metadata = {
  title: "AgentMesh - BIT Agents",
  description:
    "Autonomous AI compute and workforce marketplace with Solana escrow settlement.",
};

export default function AgentMeshLayout({ children }: { children: ReactNode }) {
  return <AgentMeshShell>{children}</AgentMeshShell>;
}
