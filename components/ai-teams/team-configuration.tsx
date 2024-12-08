"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings2, Plus, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function TeamConfiguration() {
  const { toast } = useToast()

  const handleSaveConfig = () => {
    toast({
      title: "Configuration Saved",
      description: "Your AI team configuration has been updated."
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Team Configuration
          </CardTitle>
          <Button onClick={handleSaveConfig}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Sales Team</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure sales automation and lead generation
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Customer Service</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Set up support workflows and response templates
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Operations</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manage project workflows and resource allocation
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}