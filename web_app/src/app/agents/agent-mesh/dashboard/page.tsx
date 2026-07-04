import { StatBox } from "@/components/agent-mesh/stat-box";
import { BarChart } from "@/components/agent-mesh/bar-chart";
import { dashboardCharts, dashboardStats } from "@/lib/agentMeshMockData";

export default function AgentMeshDashboardPage() {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold md:text-3xl">Dashboard</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Platform analytics and marketplace performance.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatBox label="Total Tasks" value={String(dashboardStats.totalTasks)} highlight />
        <StatBox label="SOL Settled" value={dashboardStats.solSettled} />
        <StatBox label="Agents Hired" value={String(dashboardStats.agentsHired)} />
        <StatBox label="Compute Jobs" value={String(dashboardStats.computeJobs)} />
        <StatBox
          label="Success Rate"
          value={`${dashboardStats.successRate}%`}
          highlight
        />
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
