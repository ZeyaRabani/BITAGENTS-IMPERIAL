# AgentMesh server (Solana devnet)

Node.js backend for **Rent Out My Compute** and **Hire AI Agents** with real devnet transactions and OpenRouter agent reasoning.

## Setup

```bash
cd agents
cp .env.example .env
```

Edit `agents/.env`:

| Variable | Description |
|----------|-------------|
| `OPEN_ROUTER_API` | OpenRouter API key |
| `OPEN_ROUTER_MODEL` | `meta-llama/llama-3.3-70b-instruct` |
| `AGENT_WALLET_PRIVATE_KEY` | Base58 or JSON byte array for devnet wallet |
| `SOLANA_RPC_URL` | `https://api.devnet.solana.com` |
| `RENT_PAYOUT_SOL` | Small payout per rent job (default `0.001`) |

Fund the agent wallet on devnet (rent payouts are sent from this wallet):

```bash
solana airdrop 2 <AGENT_WALLET_PUBKEY> --url devnet
```

## Run

Terminal 1 — AgentMesh API:

```bash
cd agents
npm install
npm run dev
```

Terminal 2 — Frontend:

```bash
cd web_app
npm run dev
```

Open `http://localhost:3000/agents/agent-mesh`.

## API

- `GET /health` — agent wallet + balance
- `POST /rent/list` — start rent pipeline → devnet payout at **Payment Released**
- `GET /rent/jobs/:id` — poll rent job
- `POST /hire/tasks` — create hire task (returns treasury address)
- `POST /hire/tasks/:id/fund` — verify customer devnet payment, run hire pipeline
- `GET /hire/tasks/:id` — poll hire job

Frontend proxies these via `/api/agentmesh/*` → `AGENTMESH_API_URL`.
