"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings2, Plus, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useDepartmentStore } from "@/lib/stores/department-store"

export function AITeamConfig() {
  const { departments } = useDepartmentStore()
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)

  const handleSaveConfig = async () => {
    setSaving(true)
    try {
      // Simulate saving configuration
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Configuration Saved",
        description: "Your AI team configuration has been updated."
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Team Configuration
          </CardTitle>
          <Button onClick={handleSaveConfig} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <Card key={dept.id} className="p-4">
                <h3 className="font-semibold mb-2">{dept.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {dept.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Configure AI
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}