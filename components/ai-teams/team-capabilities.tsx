"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Check } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const capabilities = [
  {
    id: "auto-response",
    label: "Automated Responses",
    description: "AI handles routine customer inquiries"
  },
  {
    id: "lead-gen",
    label: "Lead Generation",
    description: "Automated lead scoring and qualification"
  },
  {
    id: "analytics",
    label: "Advanced Analytics",
    description: "Real-time performance tracking and insights"
  },
  {
    id: "scheduling",
    label: "Smart Scheduling",
    description: "Automated task prioritization and scheduling"
  }
]

export function TeamCapabilities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Team Capabilities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {capabilities.map((capability) => (
            <div
              key={capability.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <Label htmlFor={capability.id} className="font-medium">
                    {capability.label}
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  {capability.description}
                </p>
              </div>
              <Switch id={capability.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}