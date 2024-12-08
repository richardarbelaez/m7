import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function DepartmentLoading() {
  return (
    <div>
      <DashboardHeader />
      <main className="container py-6">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {Array(4).fill(null).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        
        <div className="grid gap-4">
          {Array(3).fill(null).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </main>
    </div>
  )
}