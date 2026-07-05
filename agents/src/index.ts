import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { rentRouter } from "./routes/rent.js";
import { hireRouter } from "./routes/hire.js";
import { getAgentBalanceSol, getAgentPublicKey } from "./solana.js";

const app = express();

app.use(
  cors({
    origin: config.corsOrigin,
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    const balance = await getAgentBalanceSol();
    res.json({
      ok: true,
      service: "agentmesh",
      cluster: config.solanaCluster,
      agentWallet: getAgentPublicKey(),
      balanceSol: balance,
      model: config.openRouterModel,
      coral: {
        serverUrl: config.coralServerUrl,
        consoleUrl: `${config.coralServerUrl.replace(/\/$/, "")}/ui/console`,
        sessionTtlMinutes: config.coralSessionTtlMinutes,
        orchestration: "CoralOS multi-agent sessions",
      },
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: (err as Error).message });
  }
});

app.use("/rent", rentRouter);
app.use("/hire", hireRouter);

app.listen(config.port, () => {
  console.log(`AgentMesh server listening on http://127.0.0.1:${config.port}`);
  try {
    console.log(`Agent wallet: ${getAgentPublicKey()}`);
    console.log(`Cluster: ${config.solanaCluster}`);
  } catch (err) {
    console.warn((err as Error).message);
  }
});
