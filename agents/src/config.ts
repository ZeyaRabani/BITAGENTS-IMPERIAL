import "dotenv/config";

function num(name: string, fallback: number): number {
  const v = process.env[name];
  if (!v) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export const config = {
  port: num("PORT", 8787),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  openRouterApiKey: process.env.OPEN_ROUTER_API ?? "",
  openRouterModel:
    process.env.OPEN_ROUTER_MODEL ?? "meta-llama/llama-3.3-70b-instruct",
  agentWalletPrivateKey: process.env.AGENT_WALLET_PRIVATE_KEY ?? "",
  solanaRpcUrl: process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
  solanaCluster: process.env.SOLANA_CLUSTER ?? "devnet",
  rentPayoutSol: num("RENT_PAYOUT_SOL", 0.001),
  hireMinBudgetSol: num("HIRE_MIN_BUDGET_SOL", 0.001),
  hireMaxBudgetSol: num("HIRE_MAX_BUDGET_SOL", 0.05),
  coralServerUrl: process.env.CORAL_SERVER_URL ?? "http://localhost:5555",
  coralSessionTtlMinutes: num("CORAL_SESSION_TTL_MINUTES", 60),
};

export const RENT_STEPS = [
  "Compute Listed",
  "CoralOS session created",
  "Planner Agent searching...",
  "Offer received (BID)...",
  "Negotiating...",
  "Accepted (AWARD)",
  "Escrow Created",
  "Running inference...",
  "Job Completed",
  "Payment Released",
] as const;

export const HIRE_STEPS = [
  "CoralOS session created",
  "Planner Agent started",
  "Scoping EasyA buy thesis...",
  "3 Agents discovered",
  "Negotiating (WANT → BID)...",
  "Research Agent accepted",
  "Token Analysis accepted",
  "Trade Agent accepted",
  "Buy order placed",
] as const;
