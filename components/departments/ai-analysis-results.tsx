"use client"

import { AIAnalysisResult } from "@/lib/types/ai-analysis"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"

interface AIAnalysisResultsProps {
  results: AIAnalysisResult
  onImplement: () => void
}

export function AIAnalysisResults({ results, onImplement }: AIAnalysisResultsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Department Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {results.recommendations.map((rec, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold capitalize">
                    {rec.type} Department
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(rec.confidence * 100)}% Confidence
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground">{rec.reasoning}</p>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Time to Value</p>
                    <p className="text-sm text-muted-foreground">
                      {rec.estimatedImpact.timeToValue}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Efficiency Gain</p>
                    <p className="text-sm text-muted-foreground">
                      {rec.estimatedImpact.efficiencyGain}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Cost Reduction</p>
                    <p className="text-sm text-muted-foreground">
                      {rec.estimatedImpact.costReduction}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Suggested Workflows</p>
                  <ul className="space-y-2">
                    {rec.suggestedWorkflows.map((workflow, i) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        {workflow}
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
          <CardTitle>Implementation Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {results.implementationPlan.map((phase, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-medium">Phase {index + 1}: {phase.phase}</h3>
                <p className="text-sm text-muted-foreground">
                  Duration: {phase.duration}
                </p>
                <ul className="space-y-2">
                  {phase.tasks.map((task: any, i) => (
                    <li key={i} className="flex items-center text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      {task.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button onClick={onImplement} className="w-full">
        Implement Recommendations
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}