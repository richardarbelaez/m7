import { Steps } from "@/components/ui/steps"

interface OnboardingHeaderProps {
  step: number
  totalSteps: number
}

export function OnboardingHeader({ step, totalSteps }: OnboardingHeaderProps) {
  return (
    <header className="border-b bg-background">
      <div className="container py-4">
        <Steps currentStep={step} totalSteps={totalSteps} />
      </div>
    </header>
  )
}