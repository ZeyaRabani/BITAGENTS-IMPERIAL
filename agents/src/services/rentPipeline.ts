import { config } from "../config.js";
import { plannerNegotiation } from "../openrouter.js";
import {
  getRentJob,
  updateRentJob,
  type RentJob,
} from "../store.js";
import { rentEscrowPhase } from "../coral.js";
import {
  explorerTxUrl,
  getAgentBalanceSol,
  sendSolFromAgent,
} from "../solana.js";

const STEP_DELAY_MS = 1200;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function payoutAmount(job: RentJob): number {
  const capped = Math.min(job.maxPriceSol, config.rentPayoutSol);
  return Math.max(config.rentPayoutSol, Math.min(capped, job.maxPriceSol));
}

export async function runRentPipeline(jobId: string) {
  const job = getRentJob(jobId);
  if (!job || job.status === "running") return;

  updateRentJob(jobId, { status: "running", currentStepIndex: 0, error: undefined });

  try {
    for (let i = 1; i < job.steps.length; i++) {
      await sleep(STEP_DELAY_MS);
      updateRentJob(jobId, {
        currentStepIndex: i,
        coralEscrowPhase: rentEscrowPhase(i, "running"),
      });

      if (job.steps[i] === "Negotiating...") {
        try {
          const note = await plannerNegotiation(job.gpu, job.maxPriceSol);
          updateRentJob(jobId, { negotiationNote: note });
        } catch {
          updateRentJob(jobId, {
            negotiationNote: "Offer accepted at fair market rate for GPU inference slot.",
          });
        }
      }

      if (job.steps[i] === "Payment Released") {
        const amount = payoutAmount(job);
        const balance = await getAgentBalanceSol();
        if (balance < amount + 0.0001) {
          throw new Error(
            `Agent wallet needs devnet SOL for payout (have ${balance.toFixed(4)}, need ${amount})`
          );
        }
        const signature = await sendSolFromAgent(job.providerWallet, amount);
        updateRentJob(jobId, {
          payoutSol: amount,
          paymentSignature: signature,
          status: "completed",
          coralEscrowPhase: "RELEASED",
        });
        return;
      }
    }

    updateRentJob(jobId, { status: "completed" });
  } catch (err) {
    updateRentJob(jobId, {
      status: "failed",
      error: (err as Error).message,
    });
  }
}

export function rentJobResponse(job: RentJob) {
  return {
    ...job,
    explorerUrl: job.paymentSignature
      ? explorerTxUrl(job.paymentSignature)
      : undefined,
    agentWallet: undefined,
  };
}
