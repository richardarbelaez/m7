"use client"

import { format } from "date-fns"
import { ChatMessage } from "@/lib/types/chat"
import { FileIcon, ImageIcon, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AgentAvatar } from "./agent-avatar"
import { defaultAgents } from "@/lib/types/agent"
import { useDepartmentStore } from "@/lib/stores/department-store"

interface ChatMessageItemProps {
  message: ChatMessage
  departmentType?: string
}

export function ChatMessageItem({ message, departmentType }: ChatMessageItemProps) {
  const isUser = message.sender === 'user'
  const { departments } = useDepartmentStore()
  
  // Get the department type based on the message's departmentId
  const messageDepartment = message.departmentId ? 
    departments.find(d => d.id === message.departmentId) : 
    null
  
  // Use the message's department type if available, fallback to prop
  const agent = defaultAgents[messageDepartment?.type || departmentType || 'sales']

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && <AgentAvatar agent={agent} size="sm" />}
      
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`max-w-[80%] ${
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
        } rounded-lg p-3`}>
          {message.type === 'text' && (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}

          {message.type === 'file' && (
            <div className="flex items-center space-x-2">
              <FileIcon className="h-4 w-4" />
              <span className="text-sm">{message.fileName}</span>
              <Button variant="ghost" size="sm" asChild className="ml-2">
                <a href={message.fileUrl} download target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}

          {message.type === 'image' && (
            <div className="space-y-2">
              <div className="relative aspect-video">
                <img
                  src={message.imageUrl}
                  alt="Uploaded image"
                  className="rounded object-cover"
                />
              </div>
              {message.content && (
                <p className="text-sm">{message.content}</p>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">
            {format(new Date(message.timestamp), 'HH:mm')}
          </span>
          {!isUser && messageDepartment && (
            <span className="text-xs text-muted-foreground">
              {messageDepartment.name}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}