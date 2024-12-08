"use client"

import { DepartmentSelection } from "@/components/onboarding/department-selection"
import { OnboardingHeader } from "@/components/onboarding/onboarding-header"

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-muted/50">
      <OnboardingHeader step={2} totalSteps={2} />
      <div className="container max-w-4xl py-10">
        <h1 className="text-3xl font-bold mb-2">Select Your AI Departments</h1>
        <p className="text-muted-foreground mb-8">
          Choose the departments you want to power with AI
        </p>
        <DepartmentSelection />
      </div>
    </div>
  )
}