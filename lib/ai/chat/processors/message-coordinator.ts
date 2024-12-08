"use client"

import { Department } from "@/lib/stores/department-store"
import { ChatMessage } from "@/lib/types/chat"
import { DepartmentProcessor } from "./department-processor"
import { MessageAnalyzer } from "../analysis/message-analyzer"
import { logger } from "@/lib/utils/logger"
import { nanoid } from "nanoid"

export class MessageCoordinator {
  private processors: Map<string, DepartmentProcessor> = new Map()
  private analyzer: MessageAnalyzer

  constructor(departments: Department[]) {
    this.analyzer = new MessageAnalyzer(departments)
    
    departments.forEach(dept => {
      this.processors.set(dept.id, new DepartmentProcessor(dept))
    })

    logger.debug('[MessageCoordinator] Initialized with departments:', 
      departments.map(d => d.type))
  }

  async processMessage(content: string): Promise<ChatMessage[]> {
    const timestamp = new Date().toISOString()
    const messages: ChatMessage[] = []

    // Add user message
    messages.push({
      id: nanoid(),
      type: 'text',
      content,
      sender: 'user',
      timestamp
    })

    try {
      // Analyze message to determine relevant departments
      const analysis = this.analyzer.analyze(content)
      logger.debug('[MessageCoordinator] Message analysis:', analysis)

      // Process message with each department
      const processingPromises = Array.from(this.processors.values()).map(processor => 
        processor.processMessage(content)
      )

      // Wait for all responses
      const responses = await Promise.all(processingPromises)

      // Filter out null responses and add valid ones
      const validResponses = responses.filter((r): r is ChatMessage => r !== null)
      messages.push(...validResponses)

      logger.debug('[MessageCoordinator] Generated responses:', validResponses.length)
    } catch (error) {
      logger.error('[MessageCoordinator] Error processing message:', error)
      
      // Add fallback response if all departments fail
      messages.push({
        id: nanoid(),
        type: 'text',
        content: "I apologize, but I'm having trouble processing your request at the moment. Please try again.",
        sender: 'agent',
        timestamp: new Date().toISOString()
      })
    }

    return messages
  }
}