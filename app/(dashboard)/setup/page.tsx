"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AISetupWizard } from "@/components/departments/ai-setup-wizard"
import { DepartmentWizard } from "@/components/departments/department-wizard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { useDepartmentStore } from "@/lib/stores/department-store"

export default function SetupPage() {
  const router = useRouter()
  const { departments } = useDepartmentStore()
  const isInitialSetup = departments.length === 0

  useEffect(() => {
    // If departments exist and this isn't accessed via "Reset Setup",
    // redirect to the add department flow
    if (!isInitialSetup && !sessionStorage.getItem('resetting-departments')) {
      router.push('/setup/add-department')
    }
    // Clear the reset flag
    sessionStorage.removeItem('resetting-departments')
  }, [isInitialSetup, router])

  return (
    <div>
      <DashboardHeader />
      <main className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isInitialSetup ? "Set Up Your AI Department" : "Reset Department Setup"}
          </h1>
          <p className="text-muted-foreground">
            {isInitialSetup 
              ? "Let our AI analyze your needs and create an optimized department structure"
              : "Start fresh with a new department configuration"
            }
          </p>
        </div>
        <AISetupWizard />
      </main>
    </div>
  )
}