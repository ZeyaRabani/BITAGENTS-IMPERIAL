import { getSolanaCluster } from "@/lib/solana/config";

function clusterQuery(): string {
  const cluster = getSolanaCluster().toLowerCase();
  if (cluster === "mainnet" || cluster === "mainnet-beta") return "";
  if (cluster === "testnet") return "?cluster=testnet";
  return "?cluster=devnet";
}

export function explorerAddress(address: string) {
  return `https://explorer.solana.com/address/${address}${clusterQuery()}`;
}

export function explorerTx(signature: string) {
  return `https://explorer.solana.com/tx/${signature}${clusterQuery()}`;
}

export function truncateAddress(address: string, chars = 4) {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
