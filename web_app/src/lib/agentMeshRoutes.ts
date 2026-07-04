export const AGENT_MESH_BASE = "/agents/agent-mesh";

export const AGENT_MESH_NAV = [
  { href: AGENT_MESH_BASE, label: "Launch", match: (path: string) => path === AGENT_MESH_BASE },
  {
    href: `${AGENT_MESH_BASE}/marketplace`,
    label: "Marketplace",
    match: (path: string) => path.startsWith(`${AGENT_MESH_BASE}/marketplace`),
  },
  {
    href: `${AGENT_MESH_BASE}/compute`,
    label: "Compute",
    match: (path: string) => path === `${AGENT_MESH_BASE}/compute`,
  },
  {
    href: `${AGENT_MESH_BASE}/dashboard`,
    label: "Dashboard",
    match: (path: string) => path === `${AGENT_MESH_BASE}/dashboard`,
  },
] as const;
