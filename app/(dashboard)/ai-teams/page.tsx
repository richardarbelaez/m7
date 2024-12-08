import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AITeamConfig } from "@/components/ai-teams/ai-team-config"
import { AITeamCapabilities } from "@/components/ai-teams/ai-team-capabilities"
import { AITeamStrategy } from "@/components/ai-teams/ai-team-strategy"

export default function AITeamsPage() {
  return (
    <div>
      <DashboardHeader />
      <main className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Team Configuration</h1>
          <p className="text-muted-foreground">
            Configure and optimize your AI department teams
          </p>
        </div>
        <div className="grid gap-6">
          <AITeamConfig />
          <AITeamCapabilities />
          <AITeamStrategy />
        </div>
      </main>
    </div>
  )
}