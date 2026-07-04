import { Router } from "express";
import { PublicKey } from "@solana/web3.js";
import { createRentJob, getRentJob, publicRentJob } from "../store.js";
import { rentJobResponse, runRentPipeline } from "../services/rentPipeline.js";
import { getAgentBalanceSol, getAgentPublicKey } from "../solana.js";

export const rentRouter = Router();

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

rentRouter.get("/health", async (_req, res) => {
  try {
    const balance = await getAgentBalanceSol();
    res.json({
      ok: true,
      agentWallet: getAgentPublicKey(),
      balanceSol: balance,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: (err as Error).message });
  }
});

rentRouter.post("/list", async (req, res) => {
  try {
    const providerWallet = parseWallet(req.body.providerWallet, "providerWallet");
    const gpu = String(req.body.gpu ?? "RTX 4090");
    const hours = Number(req.body.hours ?? 5);
    const minPriceSol = Number(req.body.minPriceSol ?? 0.001);
    const maxPriceSol = Number(req.body.maxPriceSol ?? 0.01);

    if (!Number.isFinite(hours) || hours <= 0) {
      throw new Error("hours must be positive");
    }

    const job = createRentJob({
      providerWallet,
      gpu,
      hours,
      minPriceSol,
      maxPriceSol,
    });

    void runRentPipeline(job.id);

    res.status(201).json({ job: rentJobResponse(publicRentJob(job)) });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

rentRouter.get("/jobs/:id", (req, res) => {
  const job = getRentJob(req.params.id);
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json({ job: rentJobResponse(publicRentJob(job)) });
});
