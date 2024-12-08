"use client"

import { useState } from "react"
import { Department } from "@/lib/departments/types"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDepartmentActions } from "@/lib/departments/actions/department-actions"

interface DepartmentSettingsProps {
  department: Department
}

export function DepartmentSettings({ department }: DepartmentSettingsProps) {
  const [loading, setLoading] = useState(false)
  const { updateDepartment } = useDepartmentActions()
  
  const handleSettingChange = async (key: keyof Department['settings'], value: boolean) => {
    try {
      setLoading(true)
      await updateDepartment(department.id, {
        settings: {
          ...department.settings,
          [key]: value
        }
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Settings</CardTitle>
        <CardDescription>
          Configure how this department operates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications">Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive updates about department activities
            </p>
          </div>
          <Switch
            id="notifications"
            checked={department.settings.notifications}
            onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
            disabled={loading}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="autoAssignment">Auto Assignment</Label>
            <p className="text-sm text-muted-foreground">
              Automatically assign tasks to team members
            </p>
          </div>
          <Switch
            id="autoAssignment"
            checked={department.settings.autoAssignment}
            onCheckedChange={(checked) => handleSettingChange('autoAssignment', checked)}
            disabled={loading}
          />
        </div>

        <div className="pt-4">
          <Button 
            variant="destructive"
            onClick={() => handleSettingChange('status', 'archived')}
            disabled={loading}
          >
            Archive Department
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}