"use client";

import { useWallet } from "@/components/providers/wallet-provider";
import { truncateAddress } from "@/lib/solana";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function WalletButton() {
  const { connected, connecting, publicKey, connect, disconnect } = useWallet();

  if (connected && publicKey) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => disconnect()}
        className="wallet-adapter-button-trigger font-mono text-[11px] uppercase tracking-widest"
      >
        {truncateAddress(publicKey.toBase58(), 4)}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => connect()}
      disabled={connecting}
      className="wallet-adapter-button-trigger font-mono text-[11px] uppercase tracking-widest"
    >
      {connecting ? (
        <>
          <Loader2 className="size-3.5 animate-spin" />
          Connecting
        </>
      ) : (
        "Select Wallet"
      )}
    </Button>
  );
}
