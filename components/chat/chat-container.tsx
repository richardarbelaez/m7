"use client"

import { useState } from "react"
import { nanoid } from "nanoid"
import { ChatMessage } from "@/lib/types/chat"
import { ChatMessageList } from "./chat-message-list"
import { ChatInput } from "./chat-input"

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const addMessage = (content: string, type: ChatMessage['type'] = 'text', fileDetails?: { name: string; size: number; url: string }) => {
    const newMessage: ChatMessage = {
      id: nanoid(),
      type,
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
      ...(fileDetails && {
        fileName: fileDetails.name,
        fileSize: fileDetails.size,
        fileUrl: fileDetails.url,
      })
    }

    setMessages(prev => [...prev, newMessage])

    // Simulate agent response
    setTimeout(() => {
      const response: ChatMessage = {
        id: nanoid(),
        type: 'text',
        content: 'I received your message and will process it accordingly.',
        sender: 'agent',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, response])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto border rounded-lg">
      <div className="p-4 border-b bg-muted">
        <h2 className="text-lg font-semibold">Chat with AI Agent</h2>
      </div>
      
      <ChatMessageList messages={messages} />
      <ChatInput onSend={addMessage} />
    </div>
  )
}