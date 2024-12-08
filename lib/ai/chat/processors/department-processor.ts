"use client"

import { Department } from "@/lib/stores/department-store"
import { ChatMessage } from "@/lib/types/chat"
import { defaultAgents } from "@/lib/types/agent"
import { openAIService } from "@/lib/ai/openai-service"
import { nanoid } from "nanoid"
import { logger } from "@/lib/utils/logger"

export class DepartmentProcessor {
  private conversationHistory: { role: 'user' | 'assistant'; content: string; name?: string }[] = []

  constructor(private department: Department) {
    logger.debug(`[DepartmentProcessor] Initialized for department: ${department.type}`)
  }

  async processMessage(content: string): Promise<ChatMessage | null> {
    try {
      const agent = defaultAgents[this.department.type]
      if (!agent) {
        logger.error(`[DepartmentProcessor] No agent found for department type: ${this.department.type}`)
        return null
      }

      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content,
        name: 'user'
      })

      // Get OpenAI response
      const response = await openAIService.generateResponse(
        content,
        agent,
        this.department,
        this.conversationHistory
      )

      if (!response) {
        logger.error('[DepartmentProcessor] No response from OpenAI')
        return null
      }

      // Add assistant response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: response,
        name: `${this.department.type}_agent`
      })

      // Keep history manageable
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-10)
      }
      
      return {
        id: nanoid(),
        type: 'text',
        content: response,
        sender: 'agent',
        timestamp: new Date().toISOString(),
        departmentId: this.department.id
      }
    } catch (error) {
      logger.error('[DepartmentProcessor] Error processing message:', error)
      return null
    }
  }
}