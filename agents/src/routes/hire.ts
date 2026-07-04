import { Router } from "express";
import { PublicKey } from "@solana/web3.js";
import {
  createHireJob,
  getHireJob,
  publicHireJob,
} from "../store.js";
import {
  hireJobResponse,
  validateHireBudget,
  verifyHireFunding,
} from "../services/hirePipeline.js";
import { getAgentPublicKey } from "../solana.js";

export const hireRouter = Router();

function parseWallet(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${field} is required`);
  }
  try {
    return new PublicKey(value.trim()).toBase58();
  } catch {
    throw new Error(`${field} must be a valid Solana address`);
  }
}

hireRouter.post("/tasks", (req, res) => {
  try {
    const customerWallet = parseWallet(req.body.customerWallet, "customerWallet");
    const task = String(req.body.task ?? "").trim();
    const budgetSol = Number(req.body.budgetSol ?? 0.01);
    const deadlineHours = Number(req.body.deadlineHours ?? 24);

    if (!task) throw new Error("task description is required");
    validateHireBudget(budgetSol);

    const job = createHireJob({
      customerWallet,
      task,
      budgetSol,
      deadlineHours,
    });

    res.status(201).json({
      job: hireJobResponse(publicHireJob(job)),
      treasuryAddress: getAgentPublicKey(),
      budgetSol,
    });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

hireRouter.post("/tasks/:id/fund", async (req, res) => {
  try {
    const fundingSignature = String(req.body.fundingSignature ?? "").trim();
    const customerWallet = parseWallet(req.body.customerWallet, "customerWallet");

    if (!fundingSignature) throw new Error("fundingSignature is required");

    const job = await verifyHireFunding(
      req.params.id,
      fundingSignature,
      customerWallet
    );

    res.json({ job: hireJobResponse(publicHireJob(job)) });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

hireRouter.get("/tasks/:id", (req, res) => {
  const job = getHireJob(req.params.id);
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json({ job: hireJobResponse(publicHireJob(job)) });
});
