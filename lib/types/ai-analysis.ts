export interface BusinessContext {
  industry: string
  size: string
  goals: string[]
  challenges: string[]
}

export interface DepartmentRecommendation {
  type: 'sales' | 'customer-service' | 'finance' | 'operations'
  confidence: number
  reasoning: string
  suggestedWorkflows: string[]
  estimatedImpact: {
    timeToValue: string
    efficiencyGain: string
    costReduction: string
  }
}

export interface AIAnalysisResult {
  recommendations: DepartmentRecommendation[]
  priorityOrder: string[]
  implementationPlan: {
    phase: string
    duration: string
    tasks: string[]
  }[]
}