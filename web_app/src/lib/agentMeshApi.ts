export interface CoralSessionFields {
  coralSessionId: string;
  coralTemplate: string;
  coralServerUrl: string;
  coralConsoleUrl: string;
  coralMcpUrl: string;
  coralTtlMinutes: number;
  coralEscrowPhase: string;
  coralAgents: string[];
}

export interface RentJobResponse extends CoralSessionFields {
  id: string;
  providerWallet: string;
  gpu: string;
  hours: number;
  minPriceSol: number;
  maxPriceSol: number;
  status: string;
  steps: readonly string[];
  currentStepIndex: number;
  payoutSol?: number;
  paymentSignature?: string;
  negotiationNote?: string;
  error?: string;
  explorerUrl?: string;
}

export interface HireAgentLog {
  agent: string;
  bid: string;
  reasoning: string;
}

export interface HireJobResponse extends CoralSessionFields {
  id: string;
  customerWallet: string;
  task: string;
  budgetSol: number;
  deadlineHours: number;
  status: string;
  steps: readonly string[];
  currentStepIndex: number;
  logs: HireAgentLog[];
  spentSol?: number;
  fundingSignature?: string;
  settlementSignature?: string;
  settlementPayments?: Array<{ label: string; amount: string | null }>;
  treasuryAddress?: string;
  fundingExplorerUrl?: string;
  settlementExplorerUrl?: string;
  error?: string;
}

async function agentMeshFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`/api/agentmesh${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ?? `AgentMesh API error ${res.status}`);
  }
  return data as T;
}

export async function listCompute(input: {
  providerWallet: string;
  gpu: string;
  hours: number;
  minPriceSol: number;
  maxPriceSol: number;
}) {
  return agentMeshFetch<{ job: RentJobResponse }>("/rent/list", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getRentJob(id: string) {
  return agentMeshFetch<{ job: RentJobResponse }>(`/rent/jobs/${id}`);
}

export async function createHireTask(input: {
  customerWallet: string;
  task: string;
  budgetSol: number;
  deadlineHours: number;
}) {
  return agentMeshFetch<{
    job: HireJobResponse;
    treasuryAddress: string;
    budgetSol: number;
  }>("/hire/tasks", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function fundHireTask(input: {
  id: string;
  fundingSignature: string;
  customerWallet: string;
}) {
  return agentMeshFetch<{ job: HireJobResponse }>(
    `/hire/tasks/${input.id}/fund`,
    {
      method: "POST",
      body: JSON.stringify({
        fundingSignature: input.fundingSignature,
        customerWallet: input.customerWallet,
      }),
    }
  );
}

export async function getHireJob(id: string) {
  return agentMeshFetch<{ job: HireJobResponse }>(`/hire/tasks/${id}`);
}

export async function getAgentMeshHealth() {
  return agentMeshFetch<{
    ok: boolean;
    agentWallet?: string;
    balanceSol?: number;
  }>("/health");
}
