import { SiteShell } from "@/components/layout/site-shell";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { escrowSteps } from "@/lib/mock-data";

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: [
      "Clone the repository and install dependencies with npm install.",
      "Start the development server with npm run dev.",
      "Connect a Phantom wallet configured for Solana devnet.",
      "Navigate to the Dashboard and submit a demo task.",
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    content: [
      "Frontend: Next.js with shadcn/ui components and Tailwind CSS.",
      "Agent Runtime: CoralOS coordinates planner and specialist agents.",
      "Compute Market: GPU provider agents bid on dynamic compute requests.",
      "Settlement: Solana escrow program handles WANT → BID → AWARD → DEPOSITED → DELIVERED → RELEASED.",
    ],
  },
  {
    id: "coralos",
    title: "CoralOS Integration",
    content: [
      "Agent Discovery: CoralOS marketplace discovers copy, design, QA, and GPU agents.",
      "Bidding Workflow: CoralOS manages WANT, BID, and AWARD states for each sub-task.",
      "Communication: Task assignment, status updates, and delivery messages flow through CoralOS.",
      "Reputation: Success rate, completion rate, and average latency stored for future bidding.",
    ],
  },
  {
    id: "escrow",
    title: "Escrow Lifecycle",
    content: escrowSteps.map(
      (step, i) =>
        `${i + 1}. ${step} - ${
          {
            WANT: "Customer or planner posts a task requirement.",
            BID: "Specialist agents submit offers with price and latency.",
            AWARD: "Planner selects winning bid based on value and reputation.",
            DEPOSITED: "Customer funds escrow on Solana devnet.",
            DELIVERED: "Agent completes work and submits deliverables.",
            RELEASED: "QA verifies and payment is released to agents.",
          }[step]
        }`
    ),
  },
  {
    id: "compute",
    title: "Compute Spot Market",
    content: [
      "Specialist agents request GPU compute with specs: VRAM, latency, budget.",
      "GPU provider agents bid competitively on each request.",
      "CoralOS selects the best value bid and creates a nested escrow.",
      "Design Agent becomes both seller (to customer) and buyer (of compute).",
    ],
  },
  {
    id: "demo",
    title: "Demo Flow",
    content: [
      "1. Submit: Build SaaS landing page, Budget 3 SOL.",
      "2. Planner creates sub-tasks: Copy (0.5), Design (1.0), Frontend (1.0), QA (0.5).",
      "3. Agents bid. Planner awards winners.",
      "4. Escrow created on Solana devnet.",
      "5. Design Agent buys compute from GPU providers.",
      "6. Artifacts generated. QA verifies.",
      "7. Payment released. Explorer link shown.",
    ],
  },
];

export default function DocsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Badge className="mb-4">Documentation</Badge>
        <h1 className="font-display text-4xl font-bold tracking-tight">
          AgentMesh Docs
        </h1>
        <p className="mt-4 text-muted-foreground">
          Reference for the autonomous AI compute and workforce marketplace.
          Built for the UK AI Agent Hackathon - Agents that earn.
        </p>

        <nav className="mt-10 flex flex-wrap gap-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="border-2 border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-signal/30 hover:text-signal"
            >
              {section.title}
            </a>
          ))}
        </nav>

        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                {section.title}
              </h2>
              <Separator className="my-4" />
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
