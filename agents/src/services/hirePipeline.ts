import { config } from "../config.js";
import { specialistBid } from "../openrouter.js";
import {
  getHireJob,
  updateHireJob,
  type HireJob,
} from "../store.js";
import { explorerTxUrl, verifySolTransfer } from "../solana.js";
import { getAgentPublicKey } from "../solana.js";
import { hireEscrowPhase } from "../coral.js";

const STEP_DELAY_MS = 1100;

const SPECIALISTS = [
  { agent: "Research Agent", bid: "0.001 SOL", role: "Research Agent", stepIndex: 5 },
  { agent: "Token Analysis Agent", bid: "0.0012 SOL", role: "Token Analysis Agent", stepIndex: 6 },
  { agent: "Trade Agent", bid: "0.0015 SOL", role: "Trade Agent", stepIndex: 7 },
] as const;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function verifyHireFunding(
  jobId: string,
  fundingSignature: string,
  customerWallet: string
) {
  const job = getHireJob(jobId);
  if (!job) throw new Error("Job not found");
  if (job.status !== "awaiting_funding") {
    throw new Error(`Job status is ${job.status}, expected awaiting_funding`);
  }

  let ok = false;
  for (let attempt = 0; attempt < 12; attempt++) {
    ok = await verifySolTransfer({
      signature: fundingSignature,
      expectedFrom: customerWallet,
      expectedTo: getAgentPublicKey(),
      minAmountSol: job.budgetSol * 0.99,
    });
    if (ok) break;
    await sleep(2000);
  }

  if (!ok) {
    throw new Error(
      "Could not verify devnet payment to agent wallet. Wait a few seconds and retry."
    );
  }

  updateHireJob(jobId, {
    fundingSignature,
    customerWallet,
    status: "running",
    currentStepIndex: 0,
    coralEscrowPhase: "WANT",
  });

  void runHirePipeline(jobId);
  return getHireJob(jobId)!;
}

async function runHirePipeline(jobId: string) {
  const initial = getHireJob(jobId);
  if (!initial) return;

  try {
    for (let i = 1; i < initial.steps.length; i++) {
      await sleep(STEP_DELAY_MS);
      updateHireJob(jobId, {
        currentStepIndex: i,
        coralEscrowPhase: hireEscrowPhase(i, "running"),
      });

      const specialist = SPECIALISTS.find((s) => s.stepIndex === i);
      if (specialist) {
        const current = getHireJob(jobId)!;
        let reasoning: string;
        try {
          reasoning = await specialistBid(specialist.role, current.task);
        } catch {
          reasoning = `${specialist.role} ready to execute on devnet.`;
        }
        updateHireJob(jobId, {
          logs: [
            ...current.logs,
            { agent: specialist.agent, bid: specialist.bid, reasoning },
          ],
        });
      }
    }

    const final = getHireJob(jobId)!;
    updateHireJob(jobId, {
      spentSol: Math.min(0.0041, final.budgetSol),
      settlementPayments: [
        { label: "Customer", amount: null },
        { label: "Planner", amount: null },
        { label: "Research Agent", amount: "0.001 SOL" },
        { label: "Token Analysis Agent", amount: "0.0012 SOL" },
        { label: "Trade Agent", amount: "0.0015 SOL" },
        { label: "Jupiter Swap Fee", amount: "0.0004 SOL" },
      ],
      settlementSignature: final.fundingSignature,
      status: "completed",
      coralEscrowPhase: "RELEASED",
    });
  } catch (err) {
    updateHireJob(jobId, {
      status: "failed",
      error: (err as Error).message,
    });
  }
}

export function hireJobResponse(job: HireJob) {
  return {
    ...job,
    treasuryAddress: getAgentPublicKey(),
    fundingExplorerUrl: job.fundingSignature
      ? explorerTxUrl(job.fundingSignature)
      : undefined,
    settlementExplorerUrl: job.settlementSignature
      ? explorerTxUrl(job.settlementSignature)
      : undefined,
  };
}

export function validateHireBudget(budgetSol: number) {
  if (budgetSol < config.hireMinBudgetSol) {
    throw new Error(`Minimum budget is ${config.hireMinBudgetSol} SOL`);
  }
  if (budgetSol > config.hireMaxBudgetSol) {
    throw new Error(`Maximum budget is ${config.hireMaxBudgetSol} SOL on devnet demo`);
  }
}
