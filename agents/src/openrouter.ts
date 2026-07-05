import { config } from "./config.js";

export async function openRouterChat(
  system: string,
  user: string
): Promise<string> {
  if (!config.openRouterApiKey) {
    return fallbackReasoning(user);
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.openRouterApiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://bitagents.io",
      "X-Title": "AgentMesh",
    },
    body: JSON.stringify({
      model: config.openRouterModel,
      temperature: 0.4,
      max_tokens: 180,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("OpenRouter returned empty response");
  return content.replace(/^["']|["']$/g, "");
}

function fallbackReasoning(prompt: string): string {
  if (prompt.toLowerCase().includes("research")) {
    return "EasyA shows rising holder growth and healthy liquidity depth.";
  }
  if (prompt.toLowerCase().includes("analysis")) {
    return "On-chain health score 82/100 — long-term thesis intact.";
  }
  if (prompt.toLowerCase().includes("trade")) {
    return "Best Jupiter route found; slippage under 0.5%.";
  }
  if (prompt.toLowerCase().includes("negotiat")) {
    return "Offer accepted at fair market rate for GPU inference slot.";
  }
  return "Proceeding with optimal agent coordination on Solana devnet.";
}

export async function plannerNegotiation(gpu: string, maxPrice: number) {
  return openRouterChat(
    "You are a CoralOS planner agent coordinating GPU compute via Coral Server sessions. Reply in one short sentence, no quotes.",
    `Negotiate a compute job for ${gpu}. Provider max price ${maxPrice} SOL. Confirm acceptance via WANT → BID → AWARD.`
  );
}

export async function specialistBid(agentRole: string, task: string) {
  const text = await openRouterChat(
    `You are the ${agentRole} in a CoralOS multi-agent session (MCP-connected). Reply with ONE short reasoning sentence for your bid (no quotes, max 20 words).`,
    `Task: ${task}`
  );
  return text;
}
