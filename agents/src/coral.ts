import { randomUUID } from "node:crypto";
import { config } from "./config.js";

export const CORAL_ESCROW_PHASES = [
  "WANT",
  "BID",
  "AWARD",
  "DEPOSITED",
  "DELIVERED",
  "RELEASED",
] as const;

export type CoralEscrowPhase = (typeof CORAL_ESCROW_PHASES)[number];

export interface CoralSessionMeta {
  coralSessionId: string;
  coralTemplate: string;
  coralServerUrl: string;
  coralConsoleUrl: string;
  coralMcpUrl: string;
  coralTtlMinutes: number;
  coralEscrowPhase: CoralEscrowPhase;
  coralAgents: string[];
}

export function createCoralSession(
  template: string,
  agents: string[]
): CoralSessionMeta {
  const sessionId = `coral-${randomUUID().replace(/-/g, "").slice(0, 12)}`;
  const base = config.coralServerUrl.replace(/\/$/, "");

  return {
    coralSessionId: sessionId,
    coralTemplate: template,
    coralServerUrl: base,
    coralConsoleUrl: `${base}/ui/console`,
    coralMcpUrl: `${base}/mcp/sessions/${sessionId}`,
    coralTtlMinutes: config.coralSessionTtlMinutes,
    coralEscrowPhase: "WANT",
    coralAgents: agents,
  };
}

export function hireEscrowPhase(
  stepIndex: number,
  status: string
): CoralEscrowPhase {
  if (status === "completed") return "RELEASED";
  if (stepIndex >= 8) return "DELIVERED";
  if (stepIndex >= 5) return "AWARD";
  if (stepIndex >= 2) return "BID";
  return "WANT";
}

export function rentEscrowPhase(
  stepIndex: number,
  status: string
): CoralEscrowPhase {
  if (status === "completed") return "RELEASED";
  if (stepIndex >= 8) return "DELIVERED";
  if (stepIndex >= 6) return "DEPOSITED";
  if (stepIndex >= 5) return "AWARD";
  if (stepIndex >= 3) return "BID";
  return "WANT";
}
