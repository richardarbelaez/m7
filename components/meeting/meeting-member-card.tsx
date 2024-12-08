"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Department } from "@/lib/stores/department-store"
import { defaultAgents } from "@/lib/types/agent"

interface MeetingMemberCardProps {
  department: Department
  isSelected: boolean
  onToggle: (id: string) => void
}

export function MeetingMemberCard({ department, isSelected, onToggle }: MeetingMemberCardProps) {
  const agent = defaultAgents[department.type]

  return (
    <div className="flex flex-col items-center space-y-2 relative group">
      <div className="absolute -top-2 -right-2 z-10">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggle(department.id)}
          className="bg-background border-2"
        />
      </div>
      
      <Avatar className={`h-16 w-16 border-2 transition-colors ${
        isSelected ? "border-primary" : "border-primary/20"
      }`}>
        <AvatarImage src={agent.avatarUrl} alt={agent.name} />
        <AvatarFallback>{agent.name[0]}</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{agent.name}</span>
      <span className="text-xs text-muted-foreground">{department.name}</span>
    </div>
  )
}