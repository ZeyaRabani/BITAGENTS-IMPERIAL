import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Cpu,
  FileText,
  Layout,
  Megaphone,
  Palette,
  PenLine,
  Search,
  ShieldCheck,
} from "lucide-react";

export interface MarketplaceAgent {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: LucideIcon;
  rating: number;
  successRate: number;
  averageCost: string;
  averageCompletion: string;
  totalJobs: number;
  skills: string[];
}

export interface ComputeListing {
  id: string;
  name: string;
  gpu: string;
  pricePerMin: string;
  latency: string;
  available: boolean;
  jobsToday: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  gpu: string;
  earnings: string;
  jobs: number;
}

export const marketplaceAgents: MarketplaceAgent[] = [
  {
    id: "frontend",
    name: "Frontend Agent",
    category: "DEVELOPMENT",
    description:
      "Builds React/Tailwind components, responsive layouts, and deploy-ready code.",
    icon: Layout,
    rating: 5,
    successRate: 98,
    averageCost: "0.15 SOL",
    averageCompletion: "4 mins",
    totalJobs: 142,
    skills: ["React", "Tailwind", "Next.js", "Responsive UI"],
  },
  {
    id: "research",
    name: "Research Agent",
    category: "RESEARCH",
    description:
      "On-chain sentiment analysis, token research, and structured briefs.",
    icon: Search,
    rating: 4,
    successRate: 94,
    averageCost: "0.12 SOL",
    averageCompletion: "6 mins",
    totalJobs: 89,
    skills: ["Token analysis", "On-chain data", "Health scores"],
  },
  {
    id: "writer",
    name: "Technical Writer",
    category: "CONTENT",
    description:
      "Documentation, API guides, and technical copy with SEO optimization.",
    icon: PenLine,
    rating: 5,
    successRate: 96,
    averageCost: "0.08 SOL",
    averageCompletion: "3 mins",
    totalJobs: 67,
    skills: ["Docs", "API guides", "SEO copy"],
  },
  {
    id: "designer",
    name: "Designer",
    category: "DESIGN",
    description:
      "UI concepts, brand assets, and image generation via compute market.",
    icon: Palette,
    rating: 5,
    successRate: 91,
    averageCost: "0.12 SOL",
    averageCompletion: "5 mins",
    totalJobs: 112,
    skills: ["UI design", "Assets", "Brand systems"],
  },
  {
    id: "qa",
    name: "QA Agent",
    category: "VERIFICATION",
    description:
      "Verifies deliverables, acts as dispute resolver, gates escrow release.",
    icon: ShieldCheck,
    rating: 5,
    successRate: 99,
    averageCost: "0.06 SOL",
    averageCompletion: "2 mins",
    totalJobs: 203,
    skills: ["Verification", "Dispute resolution", "Quality gates"],
  },
  {
    id: "marketing",
    name: "Marketing Agent",
    category: "CONTENT",
    description:
      "Hero copy, CTAs, landing page content, and conversion-focused messaging.",
    icon: Megaphone,
    rating: 4,
    successRate: 93,
    averageCost: "0.08 SOL",
    averageCompletion: "3 mins",
    totalJobs: 78,
    skills: ["Copywriting", "CTAs", "Landing pages"],
  },
  {
    id: "copy",
    name: "Copy Agent",
    category: "CONTENT",
    description:
      "Generates hero copy, marketing text, and SEO-ready content.",
    icon: FileText,
    rating: 5,
    successRate: 94,
    averageCost: "0.08 SOL",
    averageCompletion: "4 mins",
    totalJobs: 156,
    skills: ["Hero copy", "Marketing", "SEO"],
  },
  {
    id: "planner",
    name: "Planner Agent",
    category: "COORDINATION",
    description:
      "CoralOS planner that decomposes tasks and coordinates specialist agents.",
    icon: Bot,
    rating: 5,
    successRate: 98,
    averageCost: "0.05 SOL",
    averageCompletion: "1 min",
    totalJobs: 310,
    skills: ["Task decomposition", "Budget allocation", "Coordination"],
  },
];

export const computeListings: ComputeListing[] = [
  {
    id: "gpu-alpha",
    name: "GPU Alpha",
    gpu: "RTX 4090",
    pricePerMin: "0.007 SOL/min",
    latency: "2 sec",
    available: true,
    jobsToday: 47,
  },
  {
    id: "gpu-sigma",
    name: "GPU Sigma",
    gpu: "A100",
    pricePerMin: "0.009 SOL/min",
    latency: "3 sec",
    available: true,
    jobsToday: 38,
  },
  {
    id: "gpu-delta",
    name: "GPU Delta",
    gpu: "H100",
    pricePerMin: "0.012 SOL/min",
    latency: "1.5 sec",
    available: true,
    jobsToday: 29,
  },
  {
    id: "gpu-gamma",
    name: "GPU Gamma",
    gpu: "RTX 3090",
    pricePerMin: "0.006 SOL/min",
    latency: "2.5 sec",
    available: false,
    jobsToday: 22,
  },
  {
    id: "gpu-epsilon",
    name: "GPU Epsilon",
    gpu: "RTX 4080",
    pricePerMin: "0.005 SOL/min",
    latency: "3 sec",
    available: true,
    jobsToday: 15,
  },
  {
    id: "gpu-zeta",
    name: "GPU Zeta",
    gpu: "MI300X",
    pricePerMin: "0.011 SOL/min",
    latency: "4 sec",
    available: false,
    jobsToday: 8,
  },
];

export const computeLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "GPU Alpha", gpu: "RTX 4090", earnings: "2.14 SOL", jobs: 47 },
  { rank: 2, name: "GPU Sigma", gpu: "A100", earnings: "1.87 SOL", jobs: 38 },
  { rank: 3, name: "GPU Delta", gpu: "H100", earnings: "1.52 SOL", jobs: 29 },
];

export const dashboardStats = {
  totalTasks: 27,
  solSettled: "8.42",
  agentsHired: 102,
  computeJobs: 51,
  successRate: 99,
};

export const dashboardCharts = {
  agentSpending: [
    { label: "Research", value: 2.1 },
    { label: "Analysis", value: 1.8 },
    { label: "Trade", value: 1.5 },
    { label: "Planner", value: 0.9 },
    { label: "Swap", value: 0.7 },
  ],
  computeUsage: [
    { label: "Mon", value: 6 },
    { label: "Tue", value: 9 },
    { label: "Wed", value: 7 },
    { label: "Thu", value: 12 },
    { label: "Fri", value: 11 },
    { label: "Sat", value: 4 },
    { label: "Sun", value: 2 },
  ],
  averageBid: [
    { label: "Research", value: 0.10 },
    { label: "Analysis", value: 0.12 },
    { label: "Trade", value: 0.15 },
    { label: "Planner", value: 0.04 },
    { label: "Swap", value: 0.03 },
  ],
  revenue: [
    { label: "W1", value: 1.2 },
    { label: "W2", value: 1.8 },
    { label: "W3", value: 2.1 },
    { label: "W4", value: 3.3 },
  ],
};

export const rentActivitySteps = [
  "Compute Listed",
  "Planner Agent searching...",
  "Offer received...",
  "Negotiating...",
  "Accepted",
  "Escrow Created",
  "Running inference...",
  "Job Completed",
  "Payment Released",
];

export const hireTimelineSteps = [
  "Planner Agent started",
  "Scoping EasyA buy thesis...",
  "3 Agents discovered",
  "Negotiating...",
  "Research Agent accepted",
  "Token Analysis accepted",
  "Trade Agent accepted",
  "Buy order placed",
];

export const hireAgentLogs = [
  {
    agent: "Research Agent",
    bid: "0.10 SOL",
    reasoning: "EasyA shows rising holder growth and healthy liquidity depth.",
  },
  {
    agent: "Token Analysis Agent",
    bid: "0.12 SOL",
    reasoning: "On-chain health score 82/100 - long-term thesis intact.",
  },
  {
    agent: "Trade Agent",
    bid: "0.15 SOL",
    reasoning: "Best Jupiter route found; slippage under 0.5%.",
  },
];

export const settlementPayments = [
  { label: "Customer", amount: null },
  { label: "Planner", amount: null },
  { label: "Research Agent", amount: "0.10 SOL" },
  { label: "Token Analysis Agent", amount: "0.12 SOL" },
  { label: "Trade Agent", amount: "0.15 SOL" },
  { label: "Jupiter Swap Fee", amount: "0.04 SOL" },
];

export const DEMO_TX_SIGNATURE =
  "5Kp2nR8vXm3qL7wY9tF2hJ4kN6pR1sT8uV0xZ3aB5cD7eF9gH2iJ4kL6mN8oP0q";

export const gpuOptions = ["RTX 4090", "A100", "H100", "CPU", "Other"];

export const landingFeatures = [
  {
    icon: Bot,
    title: "Agent Swarm Marketplace",
    description:
      "Specialist agents bid on sub-tasks. CoralOS manages WANT → BID → AWARD workflows.",
  },
  {
    icon: Cpu,
    title: "Compute Spot Market",
    description:
      "Agents buy GPU compute dynamically. Providers compete on price, latency, and availability.",
  },
];

export const escrowSteps = [
  "WANT",
  "BID",
  "AWARD",
  "DEPOSITED",
  "DELIVERED",
  "RELEASED",
] as const;

export type EscrowStatus = (typeof escrowSteps)[number];

export function renderStars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}
