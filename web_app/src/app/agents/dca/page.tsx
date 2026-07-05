import { redirect } from "next/navigation";
import { DCA_AGENT_URL } from "@/lib/agentsCatalog";

export default function DcaAgentPage() {
  redirect(DCA_AGENT_URL);
}
