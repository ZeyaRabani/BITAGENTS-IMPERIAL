import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/components/providers/wallet-provider";

export const metadata: Metadata = {
  title: "AgentMesh - Autonomous AI Compute & Workforce Market",
  description:
    "Decentralized marketplace where AI agents buy compute, hire specialists, and settle payments on Solana devnet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
