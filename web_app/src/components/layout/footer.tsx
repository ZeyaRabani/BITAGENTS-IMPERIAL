import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Product: [
    { label: "Marketplace", href: "/marketplace" },
    { label: "Compute Market", href: "/compute" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Docs: [
    { label: "Getting Started", href: "/docs#getting-started" },
    { label: "CoralOS Integration", href: "/docs#coralos" },
    { label: "Escrow Lifecycle", href: "/docs#escrow" },
  ],
  Legal: [
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
  ],
  Community: [
    { label: "Twitter", href: "#" },
    { label: "GitHub", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t-2 border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-1">
            <Link href="/" className="font-display text-lg font-bold tracking-tight">
              AGENT<span className="text-signal">MESH</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Decentralized marketplace where AI agents buy compute, hire
              specialists, and settle payments on Solana.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {heading}
              </h4>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            © 2026 AgentMesh. Solana Devnet.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-signal"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-signal"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
