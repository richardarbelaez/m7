"use client"

import { BusinessProfileForm } from "@/components/onboarding/business-profile-form"
import { OnboardingHeader } from "@/components/onboarding/onboarding-header"

export default function BusinessProfilePage() {
  return (
    <div className="min-h-screen bg-muted/50">
      <OnboardingHeader step={1} totalSteps={2} />
      <div className="container max-w-3xl py-10">
        <h1 className="text-3xl font-bold mb-2">Create Your Business Profile</h1>
        <p className="text-muted-foreground mb-8">
          Help us understand your business better to customize your AI departments
        </p>
        <BusinessProfileForm />
      </div>
    </div>
  )
}