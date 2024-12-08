"use client"

import { ChatMessage } from "@/lib/types/chat"
import { Department } from "@/lib/stores/department-store"
import { defaultAgents } from "@/lib/types/agent"
import { openAIService } from "../openai-service"
import { logger } from "@/lib/utils/logger"
import { nanoid } from "nanoid"

export class MessageProcessor {
  private departments: Department[]
  private conversationHistory: Map<string, ChatMessage[]>

  constructor(departments: Department[]) {
    this.departments = departments
    this.conversationHistory = new Map()
    logger.debug('[MessageProcessor] Initialized with departments:', departments.map(d => d.type))
  }

  async processMessage(content: string): Promise<ChatMessage[]> {
    logger.debug('[MessageProcessor] Processing message:', content)
    
    const timestamp = new Date().toISOString()
    const messages: ChatMessage[] = []

    // Add user message
    const userMessage: ChatMessage = {
      id: nanoid(),
      type: 'text',
      content,
      sender: 'user',
      timestamp
    }
    messages.push(userMessage)

    try {
      // Process message for each department
      const departmentResponses = await Promise.all(
        this.departments.map(async (dept) => {
          try {
            const agent = defaultAgents[dept.type]
            if (!agent) {
              logger.error(`[MessageProcessor] No agent found for department: ${dept.type}`)
              return null
            }

            // Get department conversation history
            const deptHistory = this.getConversationHistory(dept.id)
            
            // Generate response
            const response = await openAIService.generateResponse(
              content,
              agent,
              dept,
              this.formatHistoryForOpenAI(deptHistory)
            )

            if (!response) {
              logger.warn(`[MessageProcessor] No response from ${dept.type} department`)
              return null
            }

            const agentMessage: ChatMessage = {
              id: nanoid(),
              type: 'text',
              content: response,
              sender: 'agent',
              timestamp: new Date().toISOString(),
              departmentId: dept.id
            }

            // Update conversation history
            this.updateConversationHistory(dept.id, userMessage, agentMessage)

            return agentMessage
          } catch (error) {
            logger.error(`[MessageProcessor] Error processing message for ${dept.type}:`, error)
            return null
          }
        })
      )

      // Add valid responses
      const validResponses = departmentResponses.filter((msg): msg is ChatMessage => msg !== null)
      messages.push(...validResponses)

      logger.debug('[MessageProcessor] Generated responses:', validResponses.length)
      return messages
    } catch (error) {
      logger.error('[MessageProcessor] Error processing message:', error)
      
      // Add fallback error message
      const errorMessage: ChatMessage = {
        id: nanoid(),
        type: 'text',
        content: "I apologize, but I'm having trouble processing your request. Please try again.",
        sender: 'agent',
        timestamp: new Date().toISOString()
      }
      messages.push(errorMessage)
      return messages
    }
  }

  private getConversationHistory(departmentId: string): ChatMessage[] {
    return this.conversationHistory.get(departmentId) || []
  }

  private updateConversationHistory(
    departmentId: string, 
    userMessage: ChatMessage,
    agentMessage: ChatMessage
  ) {
    const history = this.getConversationHistory(departmentId)
    history.push(userMessage, agentMessage)
    
    // Keep history manageable (last 10 messages)
    if (history.length > 20) {
      history.splice(0, history.length - 20)
    }
    
    this.conversationHistory.set(departmentId, history)
  }

  private formatHistoryForOpenAI(history: ChatMessage[]) {
    return history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    }))
  }
}