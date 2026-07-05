/** CoralOS presentation layer — demo metadata aligned with https://docs.coralos.ai/guides/quickstart */

export const CORAL_DOCS_URL = "https://docs.coralos.ai/guides/quickstart";
export const CORAL_CONSOLE_PATH = "/ui/console";

export const CORAL_ESCROW_PHASES = [
  "WANT",
  "BID",
  "AWARD",
  "DEPOSITED",
  "DELIVERED",
  "RELEASED",
] as const;

export type CoralEscrowPhase = (typeof CORAL_ESCROW_PHASES)[number];

export interface CoralSessionInfo {
  sessionId: string;
  template: string;
  serverUrl: string;
  consoleUrl: string;
  mcpUrl: string;
  ttlMinutes: number;
  escrowPhase: CoralEscrowPhase;
  agents: string[];
}

export const CORAL_HIRE_TEMPLATE = "easya-buy-swarm";
export const CORAL_RENT_TEMPLATE = "gpu-spot-listing";

export function coralConsoleUrl(serverUrl: string): string {
  return `${serverUrl.replace(/\/$/, "")}${CORAL_CONSOLE_PATH}`;
}

export function coralMcpUrl(serverUrl: string, sessionId: string): string {
  return `${serverUrl.replace(/\/$/, "")}/mcp/sessions/${sessionId}`;
}

export function coralSessionId(prefix = "coral"): string {
  const slug = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  return `${prefix}-${slug}`;
}

export function hireEscrowPhase(stepIndex: number, status: string): CoralEscrowPhase {
  if (status === "completed") return "RELEASED";
  if (stepIndex >= 8) return "DELIVERED";
  if (stepIndex >= 5) return "AWARD";
  if (stepIndex >= 2) return "BID";
  return "WANT";
}

export function rentEscrowPhase(stepIndex: number, status: string): CoralEscrowPhase {
  if (status === "completed") return "RELEASED";
  if (stepIndex >= 8) return "DELIVERED";
  if (stepIndex >= 6) return "DEPOSITED";
  if (stepIndex >= 5) return "AWARD";
  if (stepIndex >= 3) return "BID";
  return "WANT";
}

export function coralSessionFromJob(
  job: Partial<CoralSessionFields> & { status: string; currentStepIndex: number },
  workflow: "hire" | "rent"
): CoralSessionInfo {
  const sessionId = job.coralSessionId ?? "coral-demo-session";
  const template =
    job.coralTemplate ??
    (workflow === "hire" ? CORAL_HIRE_TEMPLATE : CORAL_RENT_TEMPLATE);
  const serverUrl = job.coralServerUrl ?? "http://localhost:5555";
  const agents =
    job.coralAgents ??
    (workflow === "hire"
      ? ["Planner Agent", "Research Agent", "Token Analysis Agent", "Trade Agent"]
      : ["Planner Agent", "Compute Matcher", "Escrow Agent"]);

  const escrowPhase =
    job.coralEscrowPhase &&
    CORAL_ESCROW_PHASES.includes(job.coralEscrowPhase as CoralEscrowPhase)
      ? (job.coralEscrowPhase as CoralEscrowPhase)
      : workflow === "hire"
        ? hireEscrowPhase(job.currentStepIndex, job.status)
        : rentEscrowPhase(job.currentStepIndex, job.status);

  return buildCoralSession({
    sessionId,
    template,
    serverUrl,
    escrowPhase,
    agents,
    ttlMinutes: job.coralTtlMinutes ?? 60,
  });
}

export function buildCoralSession(
  partial: Pick<CoralSessionInfo, "sessionId" | "template" | "serverUrl"> & {
    escrowPhase: CoralEscrowPhase;
    agents: string[];
    ttlMinutes?: number;
  }
): CoralSessionInfo {
  const serverUrl = partial.serverUrl.replace(/\/$/, "");
  return {
    sessionId: partial.sessionId,
    template: partial.template,
    serverUrl,
    consoleUrl: coralConsoleUrl(serverUrl),
    mcpUrl: coralMcpUrl(serverUrl, partial.sessionId),
    ttlMinutes: partial.ttlMinutes ?? 60,
    escrowPhase: partial.escrowPhase,
    agents: partial.agents,
  };
}
