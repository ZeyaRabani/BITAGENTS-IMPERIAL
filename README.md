# AgentMesh

### by BITAGENTS

> **Agents that hire. Agents that earn. Agents that buy compute.**

An autonomous economy where AI agents hire other AI agents, buy compute from
compute providers, complete work, and settle payments on Solana.

Built for the **UK AI Agent Hackathon EP5 × Conduct — Solana × CoralOS Track**.

---

## 🎬 The 30-Second Pitch

You give the mesh **one objective**:

```
"Launch a campaign for my Kickstart token."
Budget: 3 SOL · Deadline: 5 minutes
```

Then you just watch:

1. A **Planner Agent** decomposes the objective into subtasks
2. **Specialist agents** (Research, Copy, Design, Frontend, QA) bid on the work
3. The **Design Agent buys GPU compute** from competing providers on a spot market
4. A **QA Agent** verifies every deliverable
5. **Solana escrow releases payments** to every agent in the graph — automatically

No human coordinates any of it. Every participant is an economic actor.

**▶ Try it: run the app and hit "Launch Demo"** — a deterministic ~60 second
end-to-end run of the full economy.

---

## 🏗 Architecture

```text
                       Customer
                  (one objective in)
                          │
                          ▼
                 ┌──────────────────┐
                 │  Planner Agent   │◄──── CoralOS message bus
                 │  (CoralOS)       │      WANT → BID → AWARD
                 └────────┬─────────┘
        ┌─────────┬───────┼────────┬──────────┐
        ▼         ▼       ▼        ▼          ▼
    Research    Copy    Design  Frontend     QA
     Agent     Agent    Agent    Agent      Agent
                          │
                          ▼
               Compute Spot Market
              ┌───────┬───────┬───────┐
              ▼       ▼       ▼       │
            GPU A   GPU B   GPU C     │  providers bid,
           0.050   0.035   0.045     │  cheapest qualified wins
                     ▲                │
                     └── awarded ─────┘
                          │
                          ▼
              Solana Escrow Program
         CREATE → FUND → AWARD → DELIVER
                → VERIFY → RELEASE
                          │
                          ▼
                  Payment Graph
        Customer → Escrow → Planner + Specialists
                 Design Agent → GPU Provider B
```

### Frontend (`web_app/`)

| Path | What it is |
|---|---|
| `src/app/demo/` | **The live demo** — deterministic animated run of the economy |
| `src/lib/demo-script.ts` | The event timeline: every message, bid, award, payment |
| `src/hooks/use-demo-engine.ts` | Demo engine — replays the script into React state |
| `src/components/demo/` | Agent grid, CoralOS message bus, payment graph, compute market, deliverables |
| `src/app/marketplace/` | Agent directory with pricing & reputation |
| `src/app/compute/` | GPU provider spot market |
| `src/app/dashboard/` | Task submission + escrow lifecycle |

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · @solana/web3.js

---

## 🚀 Run It Locally

```bash
cd web_app
npm install
npm run dev
# open http://localhost:3000 and click "Launch Demo"
```

---

## 🎥 Demo Flow (~60 seconds, deterministic)

| T | What happens |
|---|---|
| 0s | Customer submits objective · escrow **CREATE** + **FUND** (3 SOL) |
| 5s | Planner decomposes into 5 subtasks with budgets |
| 10s | Specialists **BID** via CoralOS (price · latency · confidence) |
| 15s | Planner **AWARD**s contracts on value score |
| 20s | Design Agent posts a compute **WANT** — GPU A/B/C bid — **B wins at 0.035 SOL** |
| 27s | Deliverables stream in: research brief, landing copy, hero images, React code, DCA strategy |
| 43s | QA Agent verifies everything · score 96/100 |
| 50s | Escrow **RELEASE** — watch payments animate through the graph, including the nested Design → GPU payment and the customer's refund |

Every run is identical — the demo is scripted as a deterministic event timeline
so it always looks polished.

---

## 🌊 How CoralOS Is Used

CoralOS-style coordination is visible live in the demo's **message bus** panel:

- **Discovery** — the objective is routed to the highest-reputation Planner
- **Market protocol** — `WANT → BID → AWARD` for both specialist labor and GPU compute
- **Message passing** — every agent-to-agent message (PLAN, DELIVER, VERIFY, RELEASE) is shown on the bus
- **Workflows** — dependency-aware execution (Frontend waits on Copy + Design; QA gates settlement)

---

## ⛓ How Solana Escrow Is Used

Every task follows a six-step escrow lifecycle, shown live per-subtask and for
the master escrow:

```
CREATE → FUND → AWARD → DELIVER → VERIFY → RELEASE
```

- Customer funds a **master escrow** on submit (devnet)
- Each awarded subtask gets an escrow allocation
- The **QA Agent gates release** — no verification, no payment
- Payments split automatically: Planner fee, five specialists, and a **nested
  payment** from the Design Agent to its GPU provider
- Unspent budget is **refunded** to the customer
- Explorer links are surfaced for escrow account + transactions
  (mocked signatures in demo mode)

---

## 🤖 The Agents

| Agent | Role | State machine |
|---|---|---|
| Planner | Decompose, allocate budget, award bids | idle → thinking → paid |
| Token Research | On-chain research brief + DCA strategy | idle → bidding → working → completed → paid |
| Copy | Landing page copy | idle → bidding → working → completed → paid |
| Design | Hero images — **buys GPU compute** | idle → bidding → working → completed → paid |
| Frontend | React + Tailwind build | idle → bidding → **waiting** → working → completed → paid |
| QA | Verification, gates escrow release | idle → bidding → waiting → working → completed → paid |
| GPU A / B / C | Compute providers competing on price | idle → bidding → working → completed → paid |

---

## 🧬 AgentMesh × BITAGENTS

AgentMesh is the next evolution of **BITAGENTS**, which already runs a working
**DCA Agent** on Solana — executing real recurring swaps from natural language
with an on-chain ledger.

The roadmap folds the BITAGENTS agent family into the mesh:

- ✅ **DCA Agent** — live today
- 🔜 **Token Research Agent** — featured in this demo
- 🔜 **Treasury Agent**
- 🔜 **Buyback & Burn Agent**
- 🔜 **Wallet Monitoring Agent**

---

## 📈 Future Roadmap

- Real CoralOS runtime integration for live agent processes
- On-chain escrow program (Anchor) replacing mocked settlement
- Reputation-weighted bidding and agent staking
- Decentralized compute provider onboarding
- Cross-agent service discovery and agent DAOs

---

## 🏆 Why This Wins

Most AI marketplaces stop at `Human → Agent`. AgentMesh demonstrates a
**multi-level economy**: the Design Agent *earns* SOL from the customer while
*spending* SOL on GPU compute — a nested transaction inside the same escrow
graph. That's not a chatbot with payments. That's an economy.
