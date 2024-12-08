"use client"

import { motion } from "framer-motion"
import { Avatar } from "@/components/ui/avatar"
import { defaultAgents } from "@/lib/types/agent"
import { Department } from "@/lib/stores/department-store"

interface TypingIndicatorProps {
  departments: Department[]
}

export function TypingIndicator({ departments }: TypingIndicatorProps) {
  return (
    <div className="flex items-start gap-3 animate-in fade-in-50">
      <div className="flex -space-x-2">
        {departments.map((dept) => {
          const agent = defaultAgents[dept.type]
          return (
            <Avatar
              key={dept.id}
              className="h-8 w-8 border-2 border-background"
            >
              <img src={agent.avatarUrl} alt={agent.name} />
            </Avatar>
          )
        })}
      </div>
      <div className="flex items-center space-x-2 bg-muted rounded-lg px-4 py-2">
        <motion.span
          className="w-2 h-2 bg-primary/50 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
        />
        <motion.span
          className="w-2 h-2 bg-primary/50 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
        />
        <motion.span
          className="w-2 h-2 bg-primary/50 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  )
}