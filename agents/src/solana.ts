import bs58 from "bs58";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { config } from "./config.js";

let keypair: Keypair | null = null;
let connection: Connection | null = null;

export function getConnection(): Connection {
  if (!connection) {
    connection = new Connection(config.solanaRpcUrl, "confirmed");
  }
  return connection;
}

export function getAgentKeypair(): Keypair {
  if (keypair) return keypair;
  const raw = config.agentWalletPrivateKey.trim();
  if (!raw) {
    throw new Error("AGENT_WALLET_PRIVATE_KEY is not set in agents/.env");
  }
  try {
    if (raw.startsWith("[")) {
      keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(raw)));
    } else {
      keypair = Keypair.fromSecretKey(bs58.decode(raw));
    }
  } catch {
    throw new Error("AGENT_WALLET_PRIVATE_KEY must be base58 or JSON byte array");
  }
  return keypair;
}

export function getAgentPublicKey(): string {
  return getAgentKeypair().publicKey.toBase58();
}

export function solToLamports(sol: number): number {
  return Math.round(sol * LAMPORTS_PER_SOL);
}

export async function getAgentBalanceSol(): Promise<number> {
  const lamports = await getConnection().getBalance(getAgentKeypair().publicKey);
  return lamports / LAMPORTS_PER_SOL;
}

export async function sendSolFromAgent(
  toAddress: string,
  amountSol: number
): Promise<string> {
  const conn = getConnection();
  const from = getAgentKeypair();
  const to = new PublicKey(toAddress);

  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: solToLamports(amountSol),
    })
  );

  const { blockhash, lastValidBlockHeight } = await conn.getLatestBlockhash(
    "confirmed"
  );
  tx.recentBlockhash = blockhash;
  tx.feePayer = from.publicKey;
  tx.sign(from);

  const signature = await conn.sendRawTransaction(tx.serialize(), {
    skipPreflight: false,
  });

  await conn.confirmTransaction(
    { signature, blockhash, lastValidBlockHeight },
    "confirmed"
  );

  return signature;
}

export async function verifySolTransfer(params: {
  signature: string;
  expectedFrom: string;
  expectedTo: string;
  minAmountSol: number;
}): Promise<boolean> {
  const conn = getConnection();
  const tx = await conn.getParsedTransaction(params.signature, {
    maxSupportedTransactionVersion: 0,
  });

  if (!tx?.meta || tx.meta.err) return false;

  const pre = tx.meta.preBalances;
  const post = tx.meta.postBalances;
  const keys = tx.transaction.message.accountKeys.map((k) => k.pubkey.toBase58());

  const fromIdx = keys.indexOf(params.expectedFrom);
  const toIdx = keys.indexOf(params.expectedTo);
  if (fromIdx < 0 || toIdx < 0) return false;

  const sentLamports = pre[fromIdx] - post[fromIdx];
  const receivedLamports = post[toIdx] - pre[toIdx];
  const minLamports = solToLamports(params.minAmountSol);

  return sentLamports >= minLamports && receivedLamports >= minLamports * 0.99;
}

export function explorerTxUrl(signature: string): string {
  const cluster = config.solanaCluster.toLowerCase();
  if (cluster === "mainnet" || cluster === "mainnet-beta") {
    return `https://explorer.solana.com/tx/${signature}`;
  }
  if (cluster === "testnet") {
    return `https://explorer.solana.com/tx/${signature}?cluster=testnet`;
  }
  return `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
}
