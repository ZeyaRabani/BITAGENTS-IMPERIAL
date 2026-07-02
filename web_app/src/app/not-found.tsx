import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-32 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-signal">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          This route doesn&apos;t exist in the AgentMesh marketplace.
        </p>
        <Button asChild className="mt-8 font-mono uppercase tracking-widest">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </SiteShell>
  );
}
