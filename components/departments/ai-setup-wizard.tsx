"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AISetupForm } from "./ai-setup-form"
import { AIAnalysisResults } from "./ai-analysis-results"
import { departmentAnalyzer } from "@/lib/ai/department-analyzer"
import { AIAnalysisResult } from "@/lib/types/ai-analysis"
import { useDepartmentStore } from "@/lib/stores/department-store"
import { useTaskStore } from "@/lib/stores/task-store"

export function AISetupWizard() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<AIAnalysisResult | null>(null)
  const router = useRouter()
  const { addDepartments } = useDepartmentStore()
  const addTask = useTaskStore((state) => state.addTask)

  const handleAnalysis = async (data: any) => {
    setLoading(true)
    try {
      const analysisResults = await departmentAnalyzer.analyzeBusinessNeeds({
        industry: data.industry,
        size: data.size,
        goals: data.goals.split('\n').filter(Boolean),
        challenges: data.challenges.split('\n').filter(Boolean)
      })
      setResults(analysisResults)
    } finally {
      setLoading(false)
    }
  }

  const handleImplementation = async () => {
    if (!results) return

    // Create departments
    const departments = results.recommendations.map(rec => ({
      name: `${rec.type.charAt(0).toUpperCase() + rec.type.slice(1)} Department`,
      type: rec.type,
      description: rec.reasoning,
      icon: "BarChart3",
      taskCount: rec.suggestedWorkflows.length,
      status: "active" as const
    }))

    await addDepartments(departments)

    // Create initial tasks for each department
    departments.forEach((dept, deptIndex) => {
      const implementation = results.implementationPlan[deptIndex]
      if (!implementation) return

      implementation.tasks.forEach((task: any) => {
        addTask({
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: "pending",
          departmentId: dept.id,
          dueDate: null,
          assignedTo: null
        })
      })
    })

    router.push("/dashboard")
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {!results ? (
        <AISetupForm onSubmit={handleAnalysis} loading={loading} />
      ) : (
        <AIAnalysisResults 
          results={results}
          onImplement={handleImplementation}
        />
      )}
    </div>
  )
}