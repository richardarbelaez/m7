"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatMessageList } from "@/components/chat/chat-message-list"
import { ChatMessage } from "@/lib/types/chat"
import { Department } from "@/lib/stores/department-store"
import { MessageProcessor } from "@/lib/ai/chat/message-processor"
import { nanoid } from "nanoid"
import { defaultAgents } from "@/lib/types/agent"

interface MeetingChatRoomProps {
  selectedDepartments: Department[]
}

export function MeetingChatRoom({ selectedDepartments }: MeetingChatRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [respondingDepartments, setRespondingDepartments] = useState<Department[]>([])
  const messageProcessor = useRef<MessageProcessor | null>(null)

  useEffect(() => {
    messageProcessor.current = new MessageProcessor(selectedDepartments)

    const initializeChat = async () => {
      const welcomeMessages = selectedDepartments.map(dept => {
        const agent = defaultAgents[dept.type]
        return {
          id: nanoid(),
          type: 'text' as const,
          content: `Hello! I'm ${agent.name}, your ${agent.role}. I'm here to help with ${dept.name} tasks.`,
          sender: 'agent' as const,
          timestamp: new Date().toISOString(),
          departmentId: dept.id
        }
      })

      setMessages(welcomeMessages)
    }

    initializeChat()
  }, [selectedDepartments])

  const handleSendMessage = async (content: string) => {
    if (isProcessing || !content.trim() || !messageProcessor.current) return

    setIsProcessing(true)
    setRespondingDepartments(selectedDepartments)

    try {
      // Add user message immediately
      const userMessage: ChatMessage = {
        id: nanoid(),
        type: 'text',
        content,
        sender: 'user',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, userMessage])

      // Process message and get responses
      const responses = await messageProcessor.current.processMessage(content)
      
      // Add responses with delays
      for (const response of responses.filter(msg => msg.sender === 'agent')) {
        await new Promise(resolve => setTimeout(resolve, 500))
        setMessages(prev => [...prev, response])
      }
    } catch (error) {
      console.error('Error processing message:', error)
      setMessages(prev => [...prev, {
        id: nanoid(),
        type: 'text',
        content: "I apologize, but I'm having trouble processing your request.",
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