import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export async function sendDevnetSol({
  connection,
  from,
  to,
  amountSol,
  sendTransaction,
}: {
  connection: Connection;
  from: PublicKey;
  to: PublicKey;
  amountSol: number;
  sendTransaction: (
    transaction: Transaction,
    connection: Connection
  ) => Promise<string>;
}) {
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash("confirmed");

  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from,
      toPubkey: to,
      lamports: Math.round(amountSol * 1_000_000_000),
    })
  );
  tx.recentBlockhash = blockhash;
  tx.feePayer = from;

  const signature = await sendTransaction(tx, connection);

  try {
    await connection.confirmTransaction(
      { signature, blockhash, lastValidBlockHeight },
      "confirmed"
    );
  } catch {
    // Tx may still land — fund API verifies on-chain with retries.
  }

  return signature;
}

/** Poll signature status without relying on blockhash (avoids expiry errors). */
export async function waitForSignature(
  connection: Connection,
  signature: string,
  timeoutMs = 60_000
): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const { value } = await connection.getSignatureStatuses([signature]);
    const status = value[0];
    if (status?.err) {
      throw new Error(`Transaction failed: ${JSON.stringify(status.err)}`);
    }
    if (
      status?.confirmationStatus === "confirmed" ||
      status?.confirmationStatus === "finalized"
    ) {
      return;
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  throw new Error(
    "Payment submitted but not confirmed yet. Try again in a moment."
  );
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fundHireTaskWithRetry(
  fund: (signature: string) => Promise<void>,
  signature: string,
  attempts = 8
): Promise<void> {
  let lastError: Error | null = null;
  for (let i = 0; i < attempts; i++) {
    try {
      await fund(signature);
      return;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (i < attempts - 1) {
        await sleep(2000);
      }
    }
  }
  throw lastError ?? new Error("Could not verify payment");
}
