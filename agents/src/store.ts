import { randomUUID } from "node:crypto";
import { HIRE_STEPS, RENT_STEPS } from "./config.js";
import {
  createCoralSession,
  type CoralSessionMeta,
} from "./coral.js";

export type JobStatus = "pending" | "running" | "completed" | "failed";

export interface RentJob extends CoralSessionMeta {
  id: string;
  providerWallet: string;
  gpu: string;
  hours: number;
  minPriceSol: number;
  maxPriceSol: number;
  status: JobStatus;
  steps: readonly string[];
  currentStepIndex: number;
  payoutSol?: number;
  paymentSignature?: string;
  negotiationNote?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HireAgentLog {
  agent: string;
  bid: string;
  reasoning: string;
}

export interface HireJob extends CoralSessionMeta {
  id: string;
  customerWallet: string;
  task: string;
  budgetSol: number;
  deadlineHours: number;
  status: "awaiting_funding" | JobStatus;
  steps: readonly string[];
  currentStepIndex: number;
  logs: HireAgentLog[];
  spentSol?: number;
  fundingSignature?: string;
  settlementSignature?: string;
  settlementPayments?: Array<{ label: string; amount: string | null }>;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

const rentJobs = new Map<string, RentJob>();
const hireJobs = new Map<string, HireJob>();

function now() {
  return new Date().toISOString();
}

export function createRentJob(input: {
  providerWallet: string;
  gpu: string;
  hours: number;
  minPriceSol: number;
  maxPriceSol: number;
}): RentJob {
  const job: RentJob = {
    id: randomUUID(),
    ...input,
    ...createCoralSession("gpu-spot-listing", [
      "Planner Agent",
      "Compute Matcher",
      "Escrow Agent",
    ]),
    status: "pending",
    steps: RENT_STEPS,
    currentStepIndex: 0,
    createdAt: now(),
    updatedAt: now(),
  };
  rentJobs.set(job.id, job);
  return job;
}

export function getRentJob(id: string) {
  return rentJobs.get(id);
}

export function updateRentJob(id: string, patch: Partial<RentJob>) {
  const job = rentJobs.get(id);
  if (!job) return undefined;
  Object.assign(job, patch, { updatedAt: now() });
  return job;
}

export function createHireJob(input: {
  customerWallet: string;
  task: string;
  budgetSol: number;
  deadlineHours: number;
}): HireJob {
  const job: HireJob = {
    id: randomUUID(),
    ...input,
    ...createCoralSession("easya-buy-swarm", [
      "Planner Agent",
      "Research Agent",
      "Token Analysis Agent",
      "Trade Agent",
    ]),
    status: "awaiting_funding",
    steps: HIRE_STEPS,
    currentStepIndex: -1,
    logs: [],
    createdAt: now(),
    updatedAt: now(),
  };
  hireJobs.set(job.id, job);
  return job;
}

export function getHireJob(id: string) {
  return hireJobs.get(id);
}

export function updateHireJob(id: string, patch: Partial<HireJob>) {
  const job = hireJobs.get(id);
  if (!job) return undefined;
  Object.assign(job, patch, { updatedAt: now() });
  return job;
}

export function publicRentJob(job: RentJob) {
  return { ...job };
}

export function publicHireJob(job: HireJob) {
  return { ...job };
}
