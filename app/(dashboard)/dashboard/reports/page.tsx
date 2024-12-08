import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ReportsList } from "@/components/reports/reports-list"
import { ReportsOverview } from "@/components/reports/reports-overview"

export default function ReportsPage() {
  return (
    <div>
      <DashboardHeader />
      <main className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Monitor your AI departments performance and insights
          </p>
        </div>
        <ReportsOverview />
        <ReportsList />
      </main>
    </div>
  )
}