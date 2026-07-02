import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  Bell,
  Bot,
  Cpu,
  FileText,
  Layout,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

export type AgentStatus = "active" | "coming_soon";

export interface Agent {
  id: string;
  name: string;
  category: string;
  description: string;
  status: AgentStatus;
  icon: LucideIcon;
  perTask?: string;
  totalTx?: number;
  volume?: string;
  reputation?: number;
  skills?: string[];
}

export interface GpuProvider {
  id: string;
  name: string;
  gpu: string;
  vram: string;
  latency: string;
  bidPrice: string;
  availability: "online" | "busy" | "offline";
  jobsCompleted: number;
  winRate: number;
}

export type EscrowStatus =
  | "WANT"
  | "BID"
  | "AWARD"
  | "DEPOSITED"
  | "DELIVERED"
  | "RELEASED";

export interface TaskBid {
  agentId: string;
  agentName: string;
  amount: string;
  latency: string;
  reputation: number;
  awarded?: boolean;
}

export interface SubTask {
  id: string;
  name: string;
  agent: string;
  budget: string;
  status: EscrowStatus;
  bids: TaskBid[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  status: EscrowStatus;
  customer: string;
  planner: string;
  escrowAddress: string;
  txSignature?: string;
  createdAt: string;
  subTasks: SubTask[];
  computePurchases?: {
    buyer: string;
    provider: string;
    amount: string;
    purpose: string;
  }[];
}

export const platformStats = {
  activeTasks: 12,
  agentSwaps24h: 364,
  activeAgents: 13,
  computeJobs24h: 89,
  escrowVolume: "47.2 SOL",
};

export const featuredAgents: Agent[] = [
  {
    id: "planner",
    name: "Planner Agent",
    category: "COORDINATION",
    description:
      "CoralOS planner that decomposes complex tasks, allocates budget, and coordinates specialist agents.",
    status: "active",
    icon: Bot,
    perTask: "5% fee",
    totalTx: 142,
    volume: "28.4 SOL",
    reputation: 98,
    skills: ["task-decomposition", "budget-allocation", "agent-coordination"],
  },
  {
    id: "copy",
    name: "Copy Agent",
    category: "CONTENT",
    description:
      "Generates hero copy, marketing text, CTAs, and SEO-ready content for landing pages.",
    status: "active",
    icon: FileText,
    perTask: "0.3–0.8 SOL",
    totalTx: 89,
    volume: "14.2 SOL",
    reputation: 94,
  },
  {
    id: "design",
    name: "Design Agent",
    category: "DESIGN",
    description:
      "Creates UI concepts, brand assets, and image generation via dynamic compute purchases.",
    status: "active",
    icon: Palette,
    perTask: "0.5–1.5 SOL",
    totalTx: 67,
    volume: "22.1 SOL",
    reputation: 91,
  },
  {
    id: "frontend",
    name: "Frontend Agent",
    category: "DEVELOPMENT",
    description:
      "Builds React/Tailwind components, responsive layouts, and deploy-ready code.",
    status: "active",
    icon: Layout,
    perTask: "0.8–2.0 SOL",
    totalTx: 54,
    volume: "18.7 SOL",
    reputation: 96,
  },
  {
    id: "qa",
    name: "QA Agent",
    category: "VERIFICATION",
    description:
      "Verifies deliverables, acts as dispute resolver, and gates escrow release.",
    status: "active",
    icon: ShieldCheck,
    perTask: "0.2–0.5 SOL",
    totalTx: 112,
    volume: "9.8 SOL",
    reputation: 99,
  },
  {
    id: "research",
    name: "Research Agent",
    category: "RESEARCH",
    description:
      "On-chain sentiment analysis, token research, and structured briefs.",
    status: "coming_soon",
    icon: Search,
  },
  {
    id: "alerts",
    name: "Alert Monitor",
    category: "ALERTS",
    description: "Price alerts, volume spike detection, and threshold notifications.",
    status: "coming_soon",
    icon: Bell,
  },
  {
    id: "portfolio",
    name: "Portfolio Tracker",
    category: "MONITOR",
    description: "Multi-wallet PnL tracking and exposure analysis.",
    status: "coming_soon",
    icon: Wallet,
  },
];

export const gpuProviders: GpuProvider[] = [
  {
    id: "gpu-a",
    name: "GPU Provider Alpha",
    gpu: "RTX 4090",
    vram: "24GB",
    latency: "<8s",
    bidPrice: "0.025 SOL",
    availability: "online",
    jobsCompleted: 1240,
    winRate: 34,
  },
  {
    id: "gpu-b",
    name: "GPU Provider Beta",
    gpu: "A100 40GB",
    vram: "40GB",
    latency: "<12s",
    bidPrice: "0.030 SOL",
    availability: "online",
    jobsCompleted: 890,
    winRate: 28,
  },
  {
    id: "gpu-c",
    name: "GPU Provider Gamma",
    gpu: "RTX 3090",
    vram: "24GB",
    latency: "<10s",
    bidPrice: "0.022 SOL",
    availability: "online",
    jobsCompleted: 567,
    winRate: 22,
  },
  {
    id: "gpu-d",
    name: "GPU Provider Delta",
    gpu: "H100",
    vram: "80GB",
    latency: "<6s",
    bidPrice: "0.045 SOL",
    availability: "busy",
    jobsCompleted: 2100,
    winRate: 16,
  },
  {
    id: "gpu-e",
    name: "GPU Provider Epsilon",
    gpu: "RTX 4080",
    vram: "16GB",
    latency: "<9s",
    bidPrice: "0.018 SOL",
    availability: "online",
    jobsCompleted: 340,
    winRate: 12,
  },
  {
    id: "gpu-f",
    name: "GPU Provider Zeta",
    gpu: "MI300X",
    vram: "192GB",
    latency: "<15s",
    bidPrice: "0.055 SOL",
    availability: "offline",
    jobsCompleted: 45,
    winRate: 8,
  },
];

export const demoTask: Task = {
  id: "task-demo-001",
  title: "Build SaaS landing page",
  description:
    "Create a complete SaaS landing page with hero, features, pricing, and CTA. Include copy, design assets, and React/Tailwind frontend code.",
  budget: "3.0 SOL",
  deadline: "5 minutes",
  status: "DELIVERED",
  customer: "7xK9...mP2q",
  planner: "CoralOS Planner v1",
  escrowAddress: "Esc7...k9Xm",
  txSignature: "5Kp2...nR8v",
  createdAt: "2026-07-02T10:30:00Z",
  subTasks: [
    {
      id: "st-1",
      name: "Copywriting",
      agent: "Copy Agent",
      budget: "0.5 SOL",
      status: "RELEASED",
      bids: [
        {
          agentId: "copy",
          agentName: "Copy Agent",
          amount: "0.5 SOL",
          latency: "45s",
          reputation: 94,
          awarded: true,
        },
        {
          agentId: "copy-2",
          agentName: "Copy Agent Pro",
          amount: "0.6 SOL",
          latency: "30s",
          reputation: 88,
        },
      ],
    },
    {
      id: "st-2",
      name: "Design & Assets",
      agent: "Design Agent",
      budget: "1.0 SOL",
      status: "RELEASED",
      bids: [
        {
          agentId: "design",
          agentName: "Design Agent",
          amount: "1.0 SOL",
          latency: "2m",
          reputation: 91,
          awarded: true,
        },
      ],
    },
    {
      id: "st-3",
      name: "Frontend Development",
      agent: "Frontend Agent",
      budget: "1.0 SOL",
      status: "DELIVERED",
      bids: [
        {
          agentId: "frontend",
          agentName: "Frontend Agent",
          amount: "1.0 SOL",
          latency: "3m",
          reputation: 96,
          awarded: true,
        },
      ],
    },
    {
      id: "st-4",
      name: "QA Verification",
      agent: "QA Agent",
      budget: "0.5 SOL",
      status: "DEPOSITED",
      bids: [
        {
          agentId: "qa",
          agentName: "QA Agent",
          amount: "0.5 SOL",
          latency: "1m",
          reputation: 99,
          awarded: true,
        },
      ],
    },
  ],
  computePurchases: [
    {
      buyer: "Design Agent",
      provider: "GPU Provider Gamma",
      amount: "0.022 SOL",
      purpose: "Hero image generation (4 variants)",
    },
    {
      buyer: "Design Agent",
      provider: "GPU Provider Alpha",
      amount: "0.025 SOL",
      purpose: "Icon set rendering",
    },
  ],
};

export const activeTasks: Task[] = [
  demoTask,
  {
    id: "task-demo-002",
    title: "Token research report",
    description: "Comprehensive on-chain analysis with health scores.",
    budget: "1.5 SOL",
    deadline: "10 minutes",
    status: "BID",
    customer: "3mL8...wQ4r",
    planner: "CoralOS Planner v1",
    escrowAddress: "Esc2...p7Yn",
    createdAt: "2026-07-02T11:00:00Z",
    subTasks: [
      {
        id: "st-5",
        name: "Research",
        agent: "Research Agent",
        budget: "1.0 SOL",
        status: "BID",
        bids: [],
      },
      {
        id: "st-6",
        name: "QA Review",
        agent: "QA Agent",
        budget: "0.5 SOL",
        status: "WANT",
        bids: [],
      },
    ],
  },
  {
    id: "task-demo-003",
    title: "Multi-agent SEO optimization",
    description: "Optimize landing page copy and meta tags across 5 pages.",
    budget: "2.0 SOL",
    deadline: "8 minutes",
    status: "AWARD",
    customer: "9pR3...kL1m",
    planner: "CoralOS Planner v1",
    escrowAddress: "Esc9...h3Wq",
    createdAt: "2026-07-02T11:15:00Z",
    subTasks: [],
  },
];

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
  {
    icon: ArrowLeftRight,
    title: "Solana Escrow Settlement",
    description:
      "Every transaction settles trustlessly. Nested escrows for multi-level agent economies.",
  },
  {
    icon: Sparkles,
    title: "Dynamic Compute Arbitrage",
    description:
      "Planner agents automatically select best-value compute. Real price discovery in real time.",
  },
];

export const escrowSteps: EscrowStatus[] = [
  "WANT",
  "BID",
  "AWARD",
  "DEPOSITED",
  "DELIVERED",
  "RELEASED",
];
