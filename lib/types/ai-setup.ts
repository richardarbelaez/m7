export interface DepartmentObjective {
  goal: string
  metrics: string[]
  timeline: string
  expectedOutcome: string
}

export interface WorkflowSuggestion {
  type: string
  description: string
  automationLevel: 'low' | 'medium' | 'high'
  tasks: string[]
}

export interface AISetupResponse {
  objectives: DepartmentObjective[]
  workflows: WorkflowSuggestion[]
  recommendedTasks: {
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
    timeline: string
  }[]
}