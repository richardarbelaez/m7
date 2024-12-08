"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DepartmentSelection } from "@/components/onboarding/department-selection"

export default function AddDepartmentPage() {
  return (
    <div>
      <DashboardHeader />
      <main className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Add New Departments</h1>
          <p className="text-muted-foreground">
            Select additional departments to enhance your AI-powered workspace
          </p>
        </div>
        <DepartmentSelection mode="add" />
      </main>
    </div>
  )
}