"use client"

import { useState } from "react"
import { TaskAnalysis } from "@/lib/types/ai-task"
import { Department } from "@/lib/stores/department-store"
import { taskAnalyzer } from "@/lib/ai/task-analyzer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTaskStore } from "@/lib/stores/task-store"
import { Loader2, Check, ArrowRight, Zap } from "lucide-react"

interface TaskSuggestionsProps {
  department: Department
}

export function TaskSuggestions({ department }: TaskSuggestionsProps) {
  const [analysis, setAnalysis] = useState<TaskAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const addTask = useTaskStore((state) => state.addTask)

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const result = await taskAnalyzer.analyzeDepartment(department)
      setAnalysis(result)
    } finally {
      setLoading(false)
    }
  }

  const handleImplementTask = (taskSuggestion: TaskAnalysis['suggestedTasks'][0]) => {
    addTask({
      title: taskSuggestion.title,
      description: taskSuggestion.description,
      priority: taskSuggestion.priority,
      status: 'pending',
      departmentId: department.id,
      dueDate: null,
      assignedTo: null
    })
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="flex flex-col items-center justify-center text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium">Analyzing Department Tasks</p>
            <p className="text-sm text-muted-foreground">
              Our AI is analyzing your department to suggest optimal tasks and workflows
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!analysis) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="flex flex-col items-center justify-center text-center">
            <Zap className="h-8 w-8 text-primary mb-4" />
            <p className="text-lg font-medium mb-2">Get AI Task Suggestions</p>
            <p className="text-sm text-muted-foreground mb-4">
              Let our AI analyze your department and suggest optimal tasks and workflows
            </p>
            <Button onClick={handleAnalyze}>
              Start Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Suggested Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {analysis.suggestedTasks.map((task, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{task.title}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleImplementTask(task)}
                  >
                    Implement Task
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{task.description}</p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-sm font-medium">Priority</p>
                    <p className="text-sm text-muted-foreground capitalize">{task.priority}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">{task.estimatedDuration}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Automation Score</p>
                    <p className="text-sm text-muted-foreground">
                      {Math.round(task.automationPotential.score * 100)}%
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Automation Suggestions</p>
                  <ul className="space-y-2">
                    {task.automationPotential.suggestions.map((suggestion, i) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {analysis.workflows.map((workflow, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <h3 className="font-semibold">{workflow.name}</h3>
                  <p className="text-sm text-muted-foreground">{workflow.description}</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Implementation Steps</p>
                  <div className="space-y-4">
                    {workflow.steps.map((step) => (
                      <div key={step.id} className="space-y-2">
                        <p className="text-sm font-medium">{step.title}</p>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Type: {step.automationType}</span>
                          <span>Effort: {step.estimatedEffort}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium mb-2">Benefits</p>
                    <ul className="space-y-2">
                      {workflow.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">ROI</p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Time to Value: {workflow.roi.timeToValue}</p>
                      <p>Potential Savings: {workflow.roi.potentialSavings}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}