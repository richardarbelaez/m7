"use client"

import { AgentPersonality } from "@/lib/types/agent"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface AgentAvatarProps {
  agent: AgentPersonality
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AgentAvatar({ agent, size = "md", className }: AgentAvatarProps) {
  const sizeClass = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  }[size]

  return (
    <Avatar className={cn(sizeClass, "ring-2 ring-primary/10", className)}>
      <AvatarImage 
        src={agent.avatarUrl} 
        alt={agent.name}
        className="object-cover"
      />
      <AvatarFallback className="bg-primary/10 text-primary">
        {agent.name[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}