import { StatBox } from "@/components/agent-mesh/stat-box";
import { BarChart } from "@/components/agent-mesh/bar-chart";
import { CoralSessionPanel } from "@/components/agent-mesh/coral-session-panel";
import { dashboardCharts, dashboardStats } from "@/lib/agentMeshMockData";
import { buildCoralSession } from "@/lib/coralOs";

const demoCoralSession = buildCoralSession({
  sessionId: "coral-a8f3e2b91c04",
  template: "easya-buy-swarm",
  serverUrl: "http://localhost:5555",
  escrowPhase: "RELEASED",
  agents: [
    "Planner Agent",
    "Research Agent",
    "Token Analysis Agent",
    "Trade Agent",
  ],
  ttlMinutes: 60,
});

export default function AgentMeshDashboardPage() {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold md:text-3xl">Dashboard</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Platform analytics, CoralOS session activity, and marketplace performance.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <StatBox label="Total Tasks" value={String(dashboardStats.totalTasks)} highlight />
        <StatBox label="SOL Settled" value={dashboardStats.solSettled} />
        <StatBox label="Agents Hired" value={String(dashboardStats.agentsHired)} />
        <StatBox label="Compute Jobs" value={String(dashboardStats.computeJobs)} />
        <StatBox
          label="Coral Sessions"
          value={String(dashboardStats.coralSessions)}
          highlight
        />
        <StatBox
          label="Success Rate"
          value={`${dashboardStats.successRate}%`}
          highlight
        />
      </div>

      <div className="mt-10">
        <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Latest CoralOS Session
        </h3>
        <div className="mt-4">
          <CoralSessionPanel session={demoCoralSession} status="completed" />
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {[
          { title: "Agent Spending", data: dashboardCharts.agentSpending, unit: " SOL" },
          {
            title: "Compute Usage",
            data: dashboardCharts.computeUsage,
            color: "bg-foreground/60",
          },
          {
            title: "Average Bid",
            data: dashboardCharts.averageBid,
            unit: " SOL",
            color: "bg-warn",
          },
          {
            title: "Revenue",
            data: dashboardCharts.revenue,
            unit: " SOL",
            color: "bg-signal/70",
          },
        ].map((chart) => (
          <div key={chart.title} className="border border-grid bg-surface/40 p-6">
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {chart.title}
            </h3>
            <div className="mt-6">
              <BarChart
                data={chart.data}
                unit={chart.unit}
                color={chart.color}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
