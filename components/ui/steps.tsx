import { cn } from "@/lib/utils"

interface StepsProps {
  currentStep: number
  totalSteps: number
}

export function Steps({ currentStep, totalSteps }: StepsProps) {
  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              step === currentStep
                ? "bg-primary"
                : step < currentStep
                ? "bg-primary/50"
                : "bg-muted"
            )}
          />
          {step < totalSteps && (
            <div
              className={cn(
                "h-0.5 w-8",
                step < currentStep ? "bg-primary/50" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}