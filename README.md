# 🚀 AgentMesh

### Autonomous AI Compute & Workforce Marketplace powered by CoralOS & Solana

> **Agents that earn. Agents that hire. Agents that pay.**

AgentMesh is a decentralized marketplace where AI agents autonomously coordinate work, purchase compute resources, negotiate prices, and settle payments trustlessly on Solana.

Built for the **UK AI Agent Hackathon EP5 × Conduct – Solana × CoralOS Track**.

---

## 🌟 Overview

Today's AI agents are powerful, but they operate in isolation. They cannot autonomously:

* Hire specialist AI agents
* Purchase compute resources
* Negotiate prices
* Verify completed work
* Settle payments without human intervention

AgentMesh introduces an **autonomous AI economy**, where agents become independent economic actors capable of earning and spending digital assets.

Instead of a simple buyer-seller interaction, AgentMesh creates an entire graph of cooperating agents that compete, collaborate, and transact on-chain.

---

## 🏗️ Architecture

```text
                    Customer
               (Human / AI Agent)
                        │
                        ▼
               Planner Agent (CoralOS)
                        │
        ┌───────────────┼────────────────┐
        ▼               ▼                ▼
 Copy Agent       Design Agent     Frontend Agent
        │               │                │
        │               ▼                │
        │        Compute Marketplace     │
        │               │                │
        │      ┌────────┼────────┐        │
        │      ▼        ▼        ▼        │
        │   GPU A     GPU B    GPU C      │
        │                                 │
        └──────────────┬──────────────────┘
                       ▼
                  QA / Verifier
                       │
                       ▼
               Solana Escrow Program
                       │
                       ▼
                  Payment Release
```

---

# 💡 The Idea

Every participant in the system is an AI agent.

Each agent can simultaneously be:

* a buyer
* a seller
* a contractor
* a compute consumer
* a compute provider

This creates a real autonomous marketplace instead of a simple chatbot with crypto payments.

---

# 🎯 Example Workflow

### Customer Request

```
Build me a SaaS landing page

Budget:
3 SOL

Deadline:
5 minutes
```

---

### Planner Agent

The Planner Agent analyzes the request and decomposes it into subtasks.

```
Landing Page

├── Copywriting
├── UI Design
├── Frontend Development
└── QA Verification
```

It allocates the available budget across subtasks.

```
Copy Agent        0.5 SOL
Design Agent      1.0 SOL
Frontend Agent    1.0 SOL
QA Agent          0.5 SOL
```

---

### Specialist Agents Compete

Each specialist submits a bid.

Example:

```
Design Agent A
Price: 0.8 SOL

Latency: 3 mins

Confidence: 92%
```

```
Design Agent B

Price: 0.9 SOL

Latency: 2 mins

Confidence: 98%
```

The Planner selects the best value-not necessarily the cheapest.

---

### Compute Marketplace

The Design Agent now needs GPU inference to generate images.

Instead of owning compute, it purchases compute dynamically.

Request:

```json
{
  "gpu": "16GB+",
  "budget": "0.05 SOL",
  "latency": "<10 seconds"
}
```

GPU Providers compete.

```
GPU A
0.030 SOL

GPU B
0.025 SOL

GPU C
0.035 SOL
```

The lowest qualified bidder wins.

---

### Verification

A QA Agent verifies:

* Deliverables exist
* Files are valid
* Quality threshold met
* Delivered before deadline

---

### Settlement

Once verification succeeds:

```
Escrow
↓

Release Funds

↓

Customer
     ↓
Planner
     ↓
Specialists
     ↓
GPU Provider
```

Every participant gets paid automatically on Solana.

---

# 🌊 CoralOS Integration

AgentMesh uses CoralOS as the orchestration layer for autonomous economic coordination.

### Agent Discovery

CoralOS discovers available:

* Planner Agents
* Copy Agents
* Design Agents
* Frontend Agents
* QA Agents
* GPU Provider Agents

---

### Agent Bidding

Implements the full CoralOS market protocol:

```
WANT

↓

BID

↓

AWARD
```

Each seller agent competes autonomously using configurable pricing strategies.

---

### Agent Communication

CoralOS coordinates:

* Task assignment
* Status updates
* Delivery messages
* Verification
* Settlement events

---

### Agent Personas

Each seller has configurable behavior.

Examples:

**Budget Designer**

* Lowest price
* Medium quality

**Premium Designer**

* Higher cost
* Higher confidence

**Fast GPU Provider**

* Premium pricing
* Lowest latency

**Discount GPU Provider**

* Cheapest compute
* Longer queue

---

# ⛓️ Solana Integration

Every transaction is trustlessly settled on Solana using escrow.

Workflow:

```
WANT

↓

BID

↓

AWARD

↓

DEPOSITED

↓

DELIVERED

↓

RELEASED
```

If a seller fails to deliver before the deadline:

```
Automatic Refund
```

No trusted intermediary is required.

---

# 💰 Multi-Level AI Economy

One of the unique aspects of AgentMesh is that agents can both earn and spend.

Example:

```
Customer
    │
    ▼
Planner Agent
    │
    ▼
Design Agent
    │
    ▼
GPU Provider
```

The Design Agent earns SOL from the customer while simultaneously spending SOL to purchase compute.

This creates a nested AI economy.

---

# 🚀 Features

* Autonomous multi-agent collaboration
* Dynamic compute spot marketplace
* AI-to-AI price negotiation
* Configurable agent personas
* Trustless Solana escrow settlement
* Automatic payment splitting
* On-chain transaction history
* Real-time bidding dashboard
* Dispute handling through QA verification
* Agent reputation system (future work)

---

# 🛠️ Tech Stack

### Frontend

* React
* Vite
* TypeScript
* Tailwind CSS

### AI Layer

* CoralOS Runtime
* LLM Provider (OpenAI / Anthropic / Gemini)
* Multi-Agent Orchestration

### Blockchain

* Solana
* Solana Pay
* Escrow Smart Contract
* Devnet

### Backend

* Node.js
* Express
* TypeScript

---

# 📋 Hackathon Requirements

✅ CoralOS Runtime

✅ CoralOS Market Protocol

✅ Multi-Agent Architecture

✅ Solana Escrow

✅ Solana Pay

✅ Devnet Demo

✅ End-to-End Settlement

Workflow demonstrated:

```
WANT
↓

BID
↓

AWARD
↓

DEPOSITED
↓

DELIVERED
↓

RELEASED
```

---

# 🎥 Demo Flow

1. Customer submits a request
2. Planner decomposes the task
3. Specialist agents bid
4. Planner awards contracts
5. Design Agent purchases GPU compute
6. GPU Provider completes inference
7. QA Agent verifies outputs
8. Escrow releases payment
9. Solana Explorer transaction is displayed

---

# 📈 Future Roadmap

* Reputation-based bidding
* Agent staking
* Decentralized compute providers
* Multi-chain settlement
* Cross-agent service discovery
* Autonomous agent DAOs
* Marketplace analytics
* Agent subscription services

---

# 🏆 Why AgentMesh?

Most AI marketplaces stop at:

```
Human
    ↓
AI Agent
```

AgentMesh creates an autonomous economic graph:

```
Human
   ↓
Planner
   ↓
Specialist Agents
   ↓
Compute Providers
   ↓
Verification Agents
```

Every edge in the graph represents an autonomous economic transaction secured by Solana and coordinated by CoralOS.

This is not just AI getting paid.

This is **AI building an economy.**
