"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { SOLANA_NETWORK, SOLANA_RPC_ENDPOINT } from "@/lib/solana";

interface PhantomProvider {
  isPhantom?: boolean;
  publicKey: PublicKey | null;
  isConnected: boolean;
  connect: () => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  off: (event: string, callback: (...args: unknown[]) => void) => void;
}

declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

interface WalletContextValue {
  connected: boolean;
  connecting: boolean;
  publicKey: PublicKey | null;
  connection: Connection;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [connecting, setConnecting] = useState(false);

  const connection = useMemo(
    () => new Connection(SOLANA_RPC_ENDPOINT || clusterApiUrl(SOLANA_NETWORK)),
    []
  );

  const syncWallet = useCallback(() => {
    const wallet = window.solana;
    if (wallet?.isConnected && wallet.publicKey) {
      setPublicKey(wallet.publicKey);
    } else {
      setPublicKey(null);
    }
  }, []);

  useEffect(() => {
    syncWallet();
    const wallet = window.solana;
    if (!wallet) return;

    wallet.on("connect", syncWallet);
    wallet.on("disconnect", syncWallet);

    return () => {
      wallet.off("connect", syncWallet);
      wallet.off("disconnect", syncWallet);
    };
  }, [syncWallet]);

  const connect = useCallback(async () => {
    const wallet = window.solana;
    if (!wallet?.isPhantom) {
      window.open("https://phantom.app/", "_blank");
      return;
    }
    setConnecting(true);
    try {
      await wallet.connect();
      setPublicKey(wallet.publicKey);
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    const wallet = window.solana;
    if (wallet?.isConnected) {
      await wallet.disconnect();
    }
    setPublicKey(null);
  }, []);

  const value = useMemo(
    () => ({
      connected: !!publicKey,
      connecting,
      publicKey,
      connection,
      connect,
      disconnect,
    }),
    [publicKey, connecting, connection, connect, disconnect]
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
