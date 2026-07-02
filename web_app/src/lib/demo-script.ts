export type DemoAgentId =
  | "planner"
  | "research"
  | "copy"
  | "design"
  | "frontend"
  | "qa"
  | "gpu-a"
  | "gpu-b"
  | "gpu-c";

export type DemoAgentState =
  | "idle"
  | "thinking"
  | "bidding"
  | "working"
  | "waiting"
  | "completed"
  | "paid";

export interface DemoAgent {
  id: DemoAgentId;
  name: string;
  role: string;
  avatar: string;
  price: string;
  reputation: number;
  isGpu?: boolean;
}

export const demoAgents: DemoAgent[] = [
  { id: "planner", name: "Planner Agent", role: "Coordination", avatar: "🧠", price: "5% fee", reputation: 98 },
  { id: "research", name: "Token Research Agent", role: "Research", avatar: "🔎", price: "0.4 SOL", reputation: 95 },
  { id: "copy", name: "Copy Agent", role: "Content", avatar: "✍️", price: "0.5 SOL", reputation: 94 },
  { id: "design", name: "Design Agent", role: "Design", avatar: "🎨", price: "0.8 SOL", reputation: 91 },
  { id: "frontend", name: "Frontend Agent", role: "Development", avatar: "⚛️", price: "0.9 SOL", reputation: 96 },
  { id: "qa", name: "QA Agent", role: "Verification", avatar: "🛡️", price: "0.3 SOL", reputation: 99 },
  { id: "gpu-a", name: "GPU Provider A", role: "Compute · RTX 4090", avatar: "🖥️", price: "0.050 SOL", reputation: 88, isGpu: true },
  { id: "gpu-b", name: "GPU Provider B", role: "Compute · A100 40GB", avatar: "⚡", price: "0.035 SOL", reputation: 92, isGpu: true },
  { id: "gpu-c", name: "GPU Provider C", role: "Compute · RTX 3090", avatar: "🔧", price: "0.045 SOL", reputation: 85, isGpu: true },
];

export type EscrowStep = "CREATE" | "FUND" | "AWARD" | "DELIVER" | "VERIFY" | "RELEASE";

export const escrowStepOrder: EscrowStep[] = [
  "CREATE",
  "FUND",
  "AWARD",
  "DELIVER",
  "VERIFY",
  "RELEASE",
];

export interface PaymentEdge {
  id: string;
  from: string;
  to: string;
  amount: string;
}

export interface Deliverable {
  id: string;
  agent: string;
  title: string;
  kind: "research" | "copy" | "image" | "code" | "strategy" | "qa";
  content: string;
}

export type DemoEvent =
  | { at: number; type: "log"; from: string; to: string; protocol: string; message: string }
  | { at: number; type: "agent"; agent: DemoAgentId; state: DemoAgentState; task?: string }
  | { at: number; type: "subtask"; id: string; name: string; agent: string; budget: string }
  | { at: number; type: "bid"; subtask: string; agent: string; amount: string; confidence: number }
  | { at: number; type: "award"; subtask: string; agent: string; amount: string }
  | { at: number; type: "escrow"; escrow: string; step: EscrowStep }
  | { at: number; type: "compute-request"; buyer: string; spec: string }
  | { at: number; type: "compute-bid"; provider: string; amount: string; latency: string }
  | { at: number; type: "compute-award"; provider: string; amount: string }
  | { at: number; type: "deliverable"; deliverable: Deliverable }
  | { at: number; type: "payment"; edge: PaymentEdge }
  | { at: number; type: "phase"; phase: string }
  | { at: number; type: "done" };

const heroImageSvg = "hero-gradient";

export const deliverables: Deliverable[] = [
  {
    id: "d-research",
    agent: "Token Research Agent",
    title: "Kickstart Token — Research Brief",
    kind: "research",
    content: `TOKEN: $KICK (Kickstart)
CHAIN: Solana · SPL

MARKET SNAPSHOT
• Holders: 4,218 (+12% 7d)
• Liquidity: 312 SOL across 2 pools (Raydium, Orca)
• 24h Volume: 89.4 SOL

POSITIONING
$KICK funds early-stage builders via milestone escrow.
Closest comps: $DEAN, $GRIND. Differentiator: refundable
milestones enforced on-chain.

CAMPAIGN ANGLE
Lead with trust: "Back builders. Get refunded if they ghost."
Target: crypto-native early adopters on X and Farcaster.

RISK FLAGS
• Top-10 wallets hold 31% supply — disclose in copy.
• Recommend DCA-based treasury diversification.`,
  },
  {
    id: "d-copy",
    agent: "Copy Agent",
    title: "Landing Page Copy",
    kind: "copy",
    content: `HERO
Back builders. Get refunded if they ghost.

SUBHEAD
Kickstart is the first launch platform where every raise is
milestone-escrowed on Solana. Builders unlock funds by
shipping. Backers get automatic refunds if they don't.

CTA
Launch with $KICK →

FEATURES
01 · Milestone escrow — funds release only on delivery
02 · On-chain reputation — every ship is provable
03 · Instant refunds — no committees, just code

SOCIAL PROOF
"The only launchpad my DAO treasurer approved." — @solbuilder`,
  },
  {
    id: "d-image",
    agent: "Design Agent",
    title: "Hero Image — 4 variants (A100)",
    kind: "image",
    content: heroImageSvg,
  },
  {
    id: "d-code",
    agent: "Frontend Agent",
    title: "Hero Section — React + Tailwind",
    kind: "code",
    content: `export function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-32">
      <GradientMesh className="absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Badge>Milestone-escrowed on Solana</Badge>
        <h1 className="mt-6 text-6xl font-bold tracking-tight
                       text-white">
          Back builders.{" "}
          <span className="text-orange-500">
            Get refunded if they ghost.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg
                      text-zinc-400">
          Every raise is milestone-escrowed. Builders unlock
          funds by shipping. Backers get automatic refunds.
        </p>
        <Button size="lg" className="mt-10">
          Launch with $KICK <ArrowRight />
        </Button>
      </div>
    </section>
  );
}`,
  },
  {
    id: "d-strategy",
    agent: "Token Research Agent",
    title: "Treasury DCA Strategy (via BITAGENTS)",
    kind: "strategy",
    content: `OBJECTIVE
Diversify $KICK treasury into SOL without moving the market.

PLAN — executed by BITAGENTS DCA Agent
• Swap 2% of treasury $KICK → SOL every 24h
• Max slippage: 100 bps · Route: Jupiter v2
• Pause trigger: 24h volume < 20 SOL
• Duration: 30 days, then rebalance review

PROJECTED OUTCOME
~14% treasury in SOL by day 30, ±3% depending on fills.
All executions logged on-chain with tx signatures.`,
  },
  {
    id: "d-qa",
    agent: "QA Agent",
    title: "QA Verification Report",
    kind: "qa",
    content: `VERIFICATION RUN · task-kick-001

[PASS] Research brief — sources present, risk flags disclosed
[PASS] Landing copy — hero, CTA, features complete
[PASS] Hero image — 4 variants, 1920×1080, brand palette
[PASS] React code — compiles, responsive, a11y labels
[PASS] DCA strategy — params within treasury policy
[PASS] Deadline — delivered 4m12s / 5m budget

QUALITY SCORE: 96 / 100
VERDICT: APPROVE — release escrow`,
  },
];

const d = (id: string) => deliverables.find((x) => x.id === id)!;

export const demoScript: DemoEvent[] = [
  // ── Phase 1: Intake (0–6s)
  { at: 0, type: "phase", phase: "Objective received" },
  { at: 0, type: "log", from: "Customer", to: "Mesh", protocol: "WANT", message: "Launch a campaign for my Kickstart token · budget 3 SOL · deadline 5 min" },
  { at: 400, type: "agent", agent: "planner", state: "thinking", task: "Analyzing objective" },
  { at: 1200, type: "log", from: "CoralOS", to: "Planner", protocol: "DISCOVER", message: "Routing objective to Planner Agent (rep 98)" },
  { at: 2200, type: "log", from: "Planner", to: "CoralOS", protocol: "PLAN", message: "Decomposing into 5 subtasks, allocating 3.00 SOL budget" },
  { at: 3000, type: "escrow", escrow: "master", step: "CREATE" },
  { at: 3000, type: "log", from: "Planner", to: "Solana", protocol: "ESCROW", message: "Master escrow created · EsKk…9xMp" },
  { at: 4200, type: "escrow", escrow: "master", step: "FUND" },
  { at: 4200, type: "log", from: "Customer", to: "Solana", protocol: "FUND", message: "3.00 SOL deposited to escrow · tx 5Kp2…nR8v" },
  { at: 4200, type: "payment", edge: { id: "p0", from: "Customer", to: "Escrow", amount: "3.00 SOL" } },

  // ── Phase 2: Subtasks + discovery (5–10s)
  { at: 5200, type: "phase", phase: "Planner decomposes the objective" },
  { at: 5200, type: "subtask", id: "st-research", name: "Token research brief", agent: "—", budget: "0.45 SOL" },
  { at: 5700, type: "subtask", id: "st-copy", name: "Landing page copy", agent: "—", budget: "0.55 SOL" },
  { at: 6200, type: "subtask", id: "st-design", name: "Hero image & brand assets", agent: "—", budget: "0.90 SOL" },
  { at: 6700, type: "subtask", id: "st-frontend", name: "Landing page frontend", agent: "—", budget: "0.75 SOL" },
  { at: 7200, type: "subtask", id: "st-qa", name: "QA verification", agent: "—", budget: "0.35 SOL" },
  { at: 7800, type: "log", from: "CoralOS", to: "Mesh", protocol: "DISCOVER", message: "Broadcasting WANT to 5 specialist agents" },
  { at: 8200, type: "agent", agent: "research", state: "thinking", task: "Evaluating WANT: research brief" },
  { at: 8400, type: "agent", agent: "copy", state: "thinking", task: "Evaluating WANT: landing copy" },
  { at: 8600, type: "agent", agent: "design", state: "thinking", task: "Evaluating WANT: hero image" },
  { at: 8800, type: "agent", agent: "frontend", state: "thinking", task: "Evaluating WANT: frontend build" },
  { at: 9000, type: "agent", agent: "qa", state: "thinking", task: "Evaluating WANT: verification" },

  // ── Phase 3: Bidding (10–17s)
  { at: 10000, type: "phase", phase: "Specialists bid on subtasks" },
  { at: 10000, type: "agent", agent: "research", state: "bidding", task: "Bid 0.40 SOL · conf 95%" },
  { at: 10000, type: "bid", subtask: "st-research", agent: "Token Research Agent", amount: "0.40 SOL", confidence: 95 },
  { at: 10000, type: "log", from: "Research", to: "Planner", protocol: "BID", message: "0.40 SOL · latency 40s · confidence 95%" },
  { at: 10900, type: "agent", agent: "copy", state: "bidding", task: "Bid 0.50 SOL · conf 94%" },
  { at: 10900, type: "bid", subtask: "st-copy", agent: "Copy Agent", amount: "0.50 SOL", confidence: 94 },
  { at: 10900, type: "log", from: "Copy", to: "Planner", protocol: "BID", message: "0.50 SOL · latency 35s · confidence 94%" },
  { at: 11800, type: "agent", agent: "design", state: "bidding", task: "Bid 0.80 SOL · conf 91%" },
  { at: 11800, type: "bid", subtask: "st-design", agent: "Design Agent", amount: "0.80 SOL", confidence: 91 },
  { at: 11800, type: "log", from: "Design", to: "Planner", protocol: "BID", message: "0.80 SOL · latency 60s · confidence 91% · requires GPU" },
  { at: 12700, type: "agent", agent: "frontend", state: "bidding", task: "Bid 0.70 SOL · conf 96%" },
  { at: 12700, type: "bid", subtask: "st-frontend", agent: "Frontend Agent", amount: "0.70 SOL", confidence: 96 },
  { at: 12700, type: "log", from: "Frontend", to: "Planner", protocol: "BID", message: "0.70 SOL · latency 55s · confidence 96%" },
  { at: 13600, type: "agent", agent: "qa", state: "bidding", task: "Bid 0.30 SOL · conf 99%" },
  { at: 13600, type: "bid", subtask: "st-qa", agent: "QA Agent", amount: "0.30 SOL", confidence: 99 },
  { at: 13600, type: "log", from: "QA", to: "Planner", protocol: "BID", message: "0.30 SOL · latency 25s · confidence 99%" },

  // ── Phase 4: Awards (15–20s)
  { at: 15000, type: "phase", phase: "Planner awards contracts" },
  { at: 15000, type: "log", from: "Planner", to: "Mesh", protocol: "AWARD", message: "Evaluating bids on value score (price × confidence × latency)" },
  { at: 15800, type: "award", subtask: "st-research", agent: "Token Research Agent", amount: "0.40 SOL" },
  { at: 15800, type: "agent", agent: "research", state: "working", task: "Researching $KICK on-chain data" },
  { at: 15800, type: "escrow", escrow: "st-research", step: "AWARD" },
  { at: 16400, type: "award", subtask: "st-copy", agent: "Copy Agent", amount: "0.50 SOL" },
  { at: 16400, type: "agent", agent: "copy", state: "working", task: "Writing hero copy & CTAs" },
  { at: 16400, type: "escrow", escrow: "st-copy", step: "AWARD" },
  { at: 17000, type: "award", subtask: "st-design", agent: "Design Agent", amount: "0.80 SOL" },
  { at: 17000, type: "agent", agent: "design", state: "working", task: "Preparing image generation job" },
  { at: 17000, type: "escrow", escrow: "st-design", step: "AWARD" },
  { at: 17600, type: "award", subtask: "st-frontend", agent: "Frontend Agent", amount: "0.70 SOL" },
  { at: 17600, type: "agent", agent: "frontend", state: "waiting", task: "Waiting on copy + design" },
  { at: 17600, type: "escrow", escrow: "st-frontend", step: "AWARD" },
  { at: 18200, type: "award", subtask: "st-qa", agent: "QA Agent", amount: "0.30 SOL" },
  { at: 18200, type: "agent", agent: "qa", state: "waiting", task: "Waiting for deliverables" },
  { at: 18200, type: "escrow", escrow: "st-qa", step: "AWARD" },
  { at: 18800, type: "log", from: "Planner", to: "Mesh", protocol: "AWARD", message: "5/5 contracts awarded · 2.70 SOL committed · 0.30 SOL reserve" },

  // ── Phase 5: Compute market (20–30s)
  { at: 20000, type: "phase", phase: "Design Agent buys GPU compute" },
  { at: 20000, type: "log", from: "Design", to: "Compute Market", protocol: "WANT", message: "Need image generation · GPU 16GB+ · budget 0.05 SOL · <10s latency" },
  { at: 20000, type: "compute-request", buyer: "Design Agent", spec: "Image generation · 16GB+ VRAM · <10s" },
  { at: 21000, type: "agent", agent: "gpu-a", state: "bidding", task: "Bid 0.050 SOL" },
  { at: 21000, type: "compute-bid", provider: "GPU Provider A", amount: "0.050 SOL", latency: "<8s" },
  { at: 21000, type: "log", from: "GPU-A", to: "Design", protocol: "BID", message: "0.050 SOL · RTX 4090 · <8s" },
  { at: 22000, type: "agent", agent: "gpu-b", state: "bidding", task: "Bid 0.035 SOL" },
  { at: 22000, type: "compute-bid", provider: "GPU Provider B", amount: "0.035 SOL", latency: "<9s" },
  { at: 22000, type: "log", from: "GPU-B", to: "Design", protocol: "BID", message: "0.035 SOL · A100 40GB · <9s" },
  { at: 23000, type: "agent", agent: "gpu-c", state: "bidding", task: "Bid 0.045 SOL" },
  { at: 23000, type: "compute-bid", provider: "GPU Provider C", amount: "0.045 SOL", latency: "<10s" },
  { at: 23000, type: "log", from: "GPU-C", to: "Design", protocol: "BID", message: "0.045 SOL · RTX 3090 · <10s" },
  { at: 24500, type: "compute-award", provider: "GPU Provider B", amount: "0.035 SOL" },
  { at: 24500, type: "log", from: "Planner", to: "GPU-B", protocol: "AWARD", message: "Cheapest qualified bid wins · compute purchased for 0.035 SOL" },
  { at: 24500, type: "agent", agent: "gpu-b", state: "working", task: "Rendering 4 hero variants" },
  { at: 24500, type: "agent", agent: "gpu-a", state: "idle" },
  { at: 24500, type: "agent", agent: "gpu-c", state: "idle" },
  { at: 25200, type: "payment", edge: { id: "p-gpu", from: "Design Agent", to: "GPU Provider B", amount: "0.035 SOL" } },

  // ── Phase 6: Work + deliverables (26–48s)
  { at: 26500, type: "phase", phase: "Agents deliver work" },
  { at: 27000, type: "agent", agent: "research", state: "completed", task: "Research brief delivered" },
  { at: 27000, type: "deliverable", deliverable: d("d-research") },
  { at: 27000, type: "escrow", escrow: "st-research", step: "DELIVER" },
  { at: 27000, type: "log", from: "Research", to: "Planner", protocol: "DELIVER", message: "Research brief · 6 sections · risk flags included" },
  { at: 30000, type: "agent", agent: "copy", state: "completed", task: "Landing copy delivered" },
  { at: 30000, type: "deliverable", deliverable: d("d-copy") },
  { at: 30000, type: "escrow", escrow: "st-copy", step: "DELIVER" },
  { at: 30000, type: "log", from: "Copy", to: "Planner", protocol: "DELIVER", message: "Hero, subhead, CTA, 3 features, social proof" },
  { at: 33000, type: "agent", agent: "gpu-b", state: "completed", task: "Inference complete · 6.2s" },
  { at: 33000, type: "log", from: "GPU-B", to: "Design", protocol: "DELIVER", message: "4 hero variants rendered in 6.2s on A100" },
  { at: 34500, type: "agent", agent: "design", state: "completed", task: "Hero image delivered" },
  { at: 34500, type: "deliverable", deliverable: d("d-image") },
  { at: 34500, type: "escrow", escrow: "st-design", step: "DELIVER" },
  { at: 34500, type: "log", from: "Design", to: "Planner", protocol: "DELIVER", message: "Hero image variants · 1920×1080 · brand palette" },
  { at: 35500, type: "agent", agent: "frontend", state: "working", task: "Building hero section" },
  { at: 39000, type: "agent", agent: "frontend", state: "completed", task: "React code delivered" },
  { at: 39000, type: "deliverable", deliverable: d("d-code") },
  { at: 39000, type: "escrow", escrow: "st-frontend", step: "DELIVER" },
  { at: 39000, type: "log", from: "Frontend", to: "Planner", protocol: "DELIVER", message: "Hero component · React + Tailwind · responsive" },
  { at: 41000, type: "deliverable", deliverable: d("d-strategy") },
  { at: 41000, type: "log", from: "Research", to: "Planner", protocol: "DELIVER", message: "Bonus: treasury DCA strategy via BITAGENTS DCA Agent" },

  // ── Phase 7: QA (43–52s)
  { at: 43000, type: "phase", phase: "QA verifies all deliverables" },
  { at: 43000, type: "agent", agent: "qa", state: "working", task: "Running verification suite" },
  { at: 43000, type: "log", from: "Planner", to: "QA", protocol: "VERIFY", message: "Requesting verification of 5 deliverables" },
  { at: 45000, type: "log", from: "QA", to: "Mesh", protocol: "VERIFY", message: "research ✓ copy ✓ image ✓ code ✓ strategy ✓" },
  { at: 47000, type: "agent", agent: "qa", state: "completed", task: "Verdict: APPROVE · score 96/100" },
  { at: 47000, type: "deliverable", deliverable: d("d-qa") },
  { at: 47000, type: "escrow", escrow: "st-qa", step: "DELIVER" },
  { at: 47500, type: "escrow", escrow: "master", step: "VERIFY" },
  { at: 47500, type: "log", from: "QA", to: "Solana", protocol: "VERIFY", message: "Quality score 96/100 · releasing escrow" },

  // ── Phase 8: Settlement (50–62s)
  { at: 50000, type: "phase", phase: "Escrow releases · payments flow" },
  { at: 50000, type: "escrow", escrow: "master", step: "RELEASE" },
  { at: 50000, type: "log", from: "Solana", to: "Mesh", protocol: "RELEASE", message: "Escrow released · splitting payments · tx 3xW9…kLm2" },
  { at: 50800, type: "payment", edge: { id: "p1", from: "Escrow", to: "Planner Agent", amount: "0.15 SOL" } },
  { at: 50800, type: "agent", agent: "planner", state: "paid", task: "Earned 0.15 SOL fee" },
  { at: 52000, type: "payment", edge: { id: "p2", from: "Escrow", to: "Token Research Agent", amount: "0.40 SOL" } },
  { at: 52000, type: "agent", agent: "research", state: "paid", task: "Earned 0.40 SOL" },
  { at: 52000, type: "escrow", escrow: "st-research", step: "RELEASE" },
  { at: 53200, type: "payment", edge: { id: "p3", from: "Escrow", to: "Copy Agent", amount: "0.50 SOL" } },
  { at: 53200, type: "agent", agent: "copy", state: "paid", task: "Earned 0.50 SOL" },
  { at: 53200, type: "escrow", escrow: "st-copy", step: "RELEASE" },
  { at: 54400, type: "payment", edge: { id: "p4", from: "Escrow", to: "Design Agent", amount: "0.80 SOL" } },
  { at: 54400, type: "agent", agent: "design", state: "paid", task: "Earned 0.80 SOL · spent 0.035" },
  { at: 54400, type: "escrow", escrow: "st-design", step: "RELEASE" },
  { at: 55600, type: "payment", edge: { id: "p5", from: "Escrow", to: "Frontend Agent", amount: "0.70 SOL" } },
  { at: 55600, type: "agent", agent: "frontend", state: "paid", task: "Earned 0.70 SOL" },
  { at: 55600, type: "escrow", escrow: "st-frontend", step: "RELEASE" },
  { at: 56800, type: "payment", edge: { id: "p6", from: "Escrow", to: "QA Agent", amount: "0.30 SOL" } },
  { at: 56800, type: "agent", agent: "qa", state: "paid", task: "Earned 0.30 SOL" },
  { at: 56800, type: "escrow", escrow: "st-qa", step: "RELEASE" },
  { at: 58000, type: "agent", agent: "gpu-b", state: "paid", task: "Earned 0.035 SOL" },
  { at: 58000, type: "log", from: "Solana", to: "GPU-B", protocol: "RELEASE", message: "Nested escrow released · Design Agent → GPU Provider B · 0.035 SOL" },
  { at: 59500, type: "log", from: "Mesh", to: "Customer", protocol: "COMPLETE", message: "Campaign delivered · 2.85 SOL spent · 0.15 SOL refunded · 4m12s" },
  { at: 60500, type: "payment", edge: { id: "p7", from: "Escrow", to: "Customer", amount: "0.15 SOL refund" } },
  { at: 62000, type: "done" },
];

export const demoDurationMs = 63000;
