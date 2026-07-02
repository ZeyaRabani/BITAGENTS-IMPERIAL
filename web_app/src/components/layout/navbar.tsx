"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { WalletButton } from "@/components/wallet/wallet-button";
import { Badge } from "@/components/ui/badge";

const navLinks = [
  { href: "/demo", label: "Demo" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/compute", label: "Compute" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/docs", label: "Documentation" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-display text-lg font-bold tracking-tight text-foreground">
          AGENT<span className="text-signal">MESH</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-mono text-[11px] uppercase tracking-widest transition-colors",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "text-signal"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Devnet
          </Badge>
          <Link
            href="/demo"
            className="hidden rounded-sm bg-primary px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/80 sm:inline-flex"
          >
            Launch Demo
          </Link>
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
