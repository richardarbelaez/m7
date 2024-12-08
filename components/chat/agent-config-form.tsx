"use client"

import { useState } from "react"
import { AgentPersonality } from "@/lib/types/agent"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AgentConfigFormProps {
  agent: AgentPersonality
  onSubmit: (updatedAgent: AgentPersonality) => void
}

export function AgentConfigForm({ agent, onSubmit }: AgentConfigFormProps) {
  const [formData, setFormData] = useState(agent)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof AgentPersonality, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Agent Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Input
          id="role"
          value={formData.role}
          onChange={(e) => handleChange('role', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="traits">Personality Traits (comma-separated)</Label>
        <Input
          id="traits"
          value={formData.traits.join(", ")}
          onChange={(e) => handleChange('traits', e.target.value.split(",").map(s => s.trim()))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="expertise">Areas of Expertise (comma-separated)</Label>
        <Input
          id="expertise"
          value={formData.expertise.join(", ")}
          onChange={(e) => handleChange('expertise', e.target.value.split(",").map(s => s.trim()))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="style">Communication Style</Label>
        <Textarea
          id="style"
          value={formData.communicationStyle}
          onChange={(e) => handleChange('communicationStyle', e.target.value)}
        />
      </div>

      <Button type="submit">Update Agent Configuration</Button>
    </form>
  )
}