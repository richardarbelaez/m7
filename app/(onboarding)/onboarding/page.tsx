"use client"

import { useOnboardingProgress } from "@/components/onboarding/onboarding-progress"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const { profile } = useOnboardingProgress()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-muted/50 flex items-center justify-center">
      <Card className="max-w-md w-full mx-4">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to mycompAIny</h1>
          <p className="text-muted-foreground mb-6">
            Let's set up your AI-powered business departments in just a few steps.
          </p>
          
          <div className="space-y-4">
            <Button 
              className="w-full"
              onClick={() => router.push('/onboarding/business-profile')}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}