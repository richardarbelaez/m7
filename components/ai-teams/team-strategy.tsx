"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, ArrowRight } from "lucide-react"

const strategies = [
  {
    id: 1,
    name: "Sales Optimization",
    description: "AI-driven sales process optimization and lead scoring",
    status: "Active",
    progress: 75
  },
  {
    id: 2,
    name: "Customer Experience",
    description: "Automated support and satisfaction improvement",
    status: "In Progress",
    progress: 45
  },
  {
    id: 3,
    name: "Operational Efficiency",
    description: "Workflow automation and resource optimization",
    status: "Planned",
    progress: 0
  }
]

export function TeamStrategy() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Strategic Initiatives
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {strategies.map((strategy) => (
            <Card key={strategy.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{strategy.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {strategy.description}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{strategy.progress}%</span>
                </div>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${strategy.progress}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}