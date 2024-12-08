export interface TaskSuggestion {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  estimatedDuration: string
  dependencies: string[]
  automationPotential: {
    score: number
    suggestions: string[]
  }
}

export interface WorkflowStep {
  id: string
  title: string
  description: string
  automationType: 'manual' | 'semi-automated' | 'fully-automated'
  requiredTools: string[]
  estimatedEffort: string
}

export interface AIWorkflowSuggestion {
  name: string
  description: string
  steps: WorkflowStep[]
  benefits: string[]
  implementationComplexity: 'low' | 'medium' | 'high'
  roi: {
    timeToValue: string
    potentialSavings: string
  }
}

export interface TaskAnalysis {
  suggestedTasks: TaskSuggestion[]
  workflows: AIWorkflowSuggestion[]
  optimizationTips: string[]
  automationScore: number
}