"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatInput } from "./chat-input"
import { ChatMessageList } from "./chat-message-list"
import { ChatMessage } from "@/lib/types/chat"
import { Department } from "@/lib/stores/department-store"
import { MessageProcessor } from "@/lib/ai/chat/message-processor"
import { defaultAgents } from "@/lib/types/agent"
import { logger } from "@/lib/utils/logger"

interface MeetingChatRoomProps {
  selectedDepartments: Department[]
}

export function MeetingChatRoom({ selectedDepartments }: MeetingChatRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [respondingDepartments, setRespondingDepartments] = useState<Department[]>([])
  const processorRef = useRef<MessageProcessor | null>(null)

  useEffect(() => {
    // Initialize message processor
    processorRef.current = new MessageProcessor(selectedDepartments)
    logger.debug('[MeetingChatRoom] Initialized with departments:', 
      selectedDepartments.map(d => d.type))

    // Generate welcome messages
    const welcomeMessages = selectedDepartments.map(dept => {
      const agent = defaultAgents[dept.type]
      return {
        id: `welcome-${dept.id}`,
        type: 'text' as const,
        content: `Hello! I'm ${agent.name}, your ${agent.role}. I'm here to help with ${dept.name} tasks.`,
        sender: 'agent' as const,
        timestamp: new Date().toISOString(),
        departmentId: dept.id
      }
    })

    setMessages(welcomeMessages)
  }, [selectedDepartments])

  const handleSendMessage = async (content: string) => {
    if (!processorRef.current || isProcessing || !content.trim()) {
      logger.warn('[MeetingChatRoom] Cannot process message:', {
        hasProcessor: !!processorRef.current,
        isProcessing,
        hasContent: !!content.trim()
      })
      return
    }

    setIsProcessing(true)
    setRespondingDepartments(selectedDepartments)

    try {
      logger.debug('[MeetingChatRoom] Processing message:', content)
      const responses = await processorRef.current.processMessage(content)
      
      setMessages(prev => [...prev, ...responses])
      logger.debug('[MeetingChatRoom] Received responses:', responses.length)
    } catch (error) {
      logger.error('[MeetingChatRoom] Error handling message:', error)
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        type: 'text',
        content: "I apologize, but I'm having trouble processing your request. Please try again.",
        sender: 'agent',
        timestamp: new Date().toISOString()
      }])
    } finally {
      setIsProcessing(false)
      setRespondingDepartments([])
    }
  }

  return (
    <Card className="col-span-full h-[600px] flex flex-col">
      <CardHeader className="flex-none">
        <div className="flex items-center justify-between">
          <CardTitle>Team Chat</CardTitle>
          <div className="flex items-center gap-2">
            {selectedDepartments.map(dept => {
              const agent = defaultAgents[dept.type]
              return (
                <div key={dept.id} className="flex items-center gap-1 text-sm text-muted-foreground">
                  <img 
                    src={agent.avatarUrl} 
                    alt={agent.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{agent.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col h-[calc(100%-5rem)] overflow-hidden">
        <div className="flex-1 overflow-y-auto mb-4">
          <ChatMessageList
            messages={messages}
            isTyping={isProcessing}
            typingDepartments={respondingDepartments}
          />
        </div>
        <div className="flex-none">
          <ChatInput 
            onSend={handleSendMessage} 
            disabled={isProcessing}
            placeholder="Type your message to the team..."
            autoFocus={true}
          />
        </div>
      </CardContent>
    </Card>
  )
}