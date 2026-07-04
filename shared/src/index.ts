export const LAMPORTS_PER_SOL = 1_000_000_000;

export const DEFAULT_TASK_PRICE_SOL = 0.01;

export const AGENT_TYPES = ["wallet_watcher", "research", "benchmark"] as const;
export type AgentType = (typeof AGENT_TYPES)[number];

export const AGENT_LABELS: Record<AgentType, string> = {
  wallet_watcher: "Wallet Watcher",
  research: "Research",
  benchmark: "Benchmark",
};

export type WalletWatcherInput = { walletAddress: string };
export type ResearchInput = { keyword: string };
export type BenchmarkInput = { size: number };
export type AgentInput = WalletWatcherInput | ResearchInput | BenchmarkInput;

export type ComputeType = "CPU" | "GPU_SIMULATED" | "GENERAL";
export type ProviderStatus = "online" | "offline";

export type TaskStatus =
  | "created"
  | "paid_pending"
  | "assigned"
  | "computing"
  | "completed"
  | "paid_out"
  | "failed";

export const STATUS_ORDER: TaskStatus[] = [
  "created",
  "paid_pending",
  "assigned",
  "computing",
  "completed",
  "paid_out",
];

export const STATUS_LABELS: Record<TaskStatus, string> = {
  created: "Created",
  paid_pending: "Paid",
  assigned: "Assigned",
  computing: "Computing",
  completed: "Completed",
  paid_out: "Paid out",
  failed: "Failed",
};

export type TaskHistoryEntry = {
  status: TaskStatus;
  at: string;
  note?: string;
};

export type WalletWatcherResult = {
  type: "wallet_watcher";
  solBalance: number;
  tokenAccountsCount: number;
  summary: string;
  latestSignatures: Array<{ signature: string }>;
};

export type ResearchResult = {
  type: "research";
  wordCount: number;
  uniqueTermCount: number;
  sentimentScore: number;
  structuredSummary: {
    headline: string;
    marketContext: string;
    technicalAngle: string;
    risks: string[];
  };
};

export type BenchmarkResult = {
  type: "benchmark";
  size: number;
  runtimeMs: number;
  checksum: number;
  resultHash: string;
};

export type AgentResult = WalletWatcherResult | ResearchResult | BenchmarkResult;

export type ComputeProvider = {
  id: string;
  name: string;
  walletAddress: string;
  computeType: ComputeType;
  pricePerTaskSol: number;
  status: ProviderStatus;
  createdAt: string;
  updatedAt: string;
};

export type AgentTask = {
  id: string;
  type: AgentType;
  input: AgentInput;
  requesterWallet: string;
  status: TaskStatus;
  priceSol: number;
  createdAt: string;
  updatedAt: string;
  history: TaskHistoryEntry[];
  assignedProviderId?: string;
  assignedProviderWallet?: string;
  paymentSignature?: string;
  payoutSignature?: string;
  result?: AgentResult;
  error?: string;
};

export type BitagentsDb = {
  providers: ComputeProvider[];
  tasks: AgentTask[];
};

export function nowIso(): string {
  return new Date().toISOString();
}

export function solToLamports(amountSol: number): number {
  return Math.round(amountSol * LAMPORTS_PER_SOL);
}

export function shortAddress(address: string, chars = 4): string {
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

function explorerClusterQuery(): string {
  const cluster = (
    process.env.NEXT_PUBLIC_SOLANA_CLUSTER ??
    process.env.SOLANA_CLUSTER ??
    "devnet"
  )
    .trim()
    .toLowerCase();

  if (cluster === "mainnet" || cluster === "mainnet-beta") return "";
  if (cluster === "testnet") return "?cluster=testnet";
  return "?cluster=devnet";
}

export function makeExplorerTxUrl(signature: string): string {
  return `https://explorer.solana.com/tx/${signature}${explorerClusterQuery()}`;
}

export function taskInputLabel(task: AgentTask): string {
  if (task.type === "wallet_watcher") {
    return shortAddress((task.input as WalletWatcherInput).walletAddress, 6);
  }
  if (task.type === "research") {
    return (task.input as ResearchInput).keyword;
  }
  return `Matrix ${(task.input as BenchmarkInput).size}×${(task.input as BenchmarkInput).size}`;
}
