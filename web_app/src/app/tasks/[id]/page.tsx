import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { EscrowTimeline } from "@/components/tasks/escrow-timeline";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { activeTasks, demoTask } from "@/lib/mock-data";
import { explorerAddress, explorerTx } from "@/lib/solana";

const allTasks = [demoTask, ...activeTasks.filter((t) => t.id !== demoTask.id)];

export function generateStaticParams() {
  return allTasks.map((task) => ({ id: task.id }));
}

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = allTasks.find((t) => t.id === id);

  if (!task) notFound();

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-signal"
        >
          <ArrowLeft className="size-3.5" />
          Back to Dashboard
        </Link>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl font-bold tracking-tight">
                {task.title}
              </h1>
              <Badge>{task.status}</Badge>
            </div>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {task.description}
            </p>
          </div>
          <div className="border-2 border-border bg-surface p-4 text-sm">
            <div className="grid gap-2">
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">Budget</span>
                <span className="font-medium text-signal">{task.budget}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">Deadline</span>
                <span>{task.deadline}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">Planner</span>
                <span>{task.planner}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Escrow Lifecycle
          </h2>
          <div className="mt-4 border-2 border-border bg-surface p-6">
            <EscrowTimeline currentStep={task.status} />
          </div>
        </div>

        {/* On-chain info */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="border-2 border-border bg-surface p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Escrow Address
            </p>
            <a
              href={explorerAddress(task.escrowAddress.replace("...", "11111111111111111111111111111111"))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 font-mono text-sm text-signal hover:underline"
            >
              {task.escrowAddress}
              <ExternalLink className="size-3" />
            </a>
          </div>
          {task.txSignature && (
            <div className="border-2 border-border bg-surface p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Transaction
              </p>
              <a
                href={explorerTx(task.txSignature.replace("...", "1111111111111111111111111111111111111111111111111111111111111111"))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-mono text-sm text-signal hover:underline"
              >
                {task.txSignature}
                <ExternalLink className="size-3" />
              </a>
            </div>
          )}
        </div>

        {/* Sub-tasks & bids */}
        {task.subTasks.length > 0 && (
          <div className="mt-10">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Sub-Tasks &amp; Bids
            </h2>
            <div className="mt-4 space-y-4">
              {task.subTasks.map((sub) => (
                <div key={sub.id} className="border-2 border-border bg-surface p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{sub.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Assigned: {sub.agent} · Budget: {sub.budget}
                      </p>
                    </div>
                    <Badge variant="secondary">{sub.status}</Badge>
                  </div>

                  {sub.bids.length > 0 && (
                    <>
                      <Separator className="my-4" />
                      <div className="space-y-2">
                        {sub.bids.map((bid) => (
                          <div
                            key={bid.agentId}
                            className={`flex flex-wrap items-center justify-between gap-3 rounded-sm border-2 p-3 ${
                              bid.awarded
                                ? "border-signal/30 bg-signal/5"
                                : "border-border bg-background"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-medium">{bid.agentName}</span>
                              {bid.awarded && (
                                <Badge variant="default">Awarded</Badge>
                              )}
                            </div>
                            <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                              <span>
                                Bid:{" "}
                                <span className="text-signal">{bid.amount}</span>
                              </span>
                              <span>Latency: {bid.latency}</span>
                              <span>Rep: {bid.reputation}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compute purchases */}
        {task.computePurchases && task.computePurchases.length > 0 && (
          <div className="mt-10">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Nested Compute Purchases
            </h2>
            <div className="mt-4 space-y-3">
              {task.computePurchases.map((purchase, i) => (
                <div
                  key={i}
                  className="flex flex-wrap items-center justify-between gap-3 border-2 border-border bg-surface p-4"
                >
                  <div>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Buyer:</span>{" "}
                      {purchase.buyer}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Provider:</span>{" "}
                      {purchase.provider}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {purchase.purpose}
                    </p>
                  </div>
                  <span className="font-display text-lg font-bold text-signal">
                    {purchase.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  );
}
