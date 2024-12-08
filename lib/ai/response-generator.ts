"use client"

import { AgentPersonality } from "@/lib/types/agent"
import { Department } from "@/lib/stores/department-store"
import { ChatMessage } from "@/lib/types/chat"
import { contextAnalyzer } from "./context-analyzer"
import { departmentResponses } from "./department-responses"

interface ResponseContext {
  message: string
  agent: AgentPersonality
  department: Department
  conversationHistory: ChatMessage[]
}

export class ResponseGenerator {
  public async generateResponse(context: ResponseContext): Promise<string> {
    const { message, agent, department, conversationHistory } = context
    
    // Analyze conversation context
    const analyzedContext = contextAnalyzer.analyzeContext(conversationHistory)
    
    // Check if agent should respond
    const hasRecentInteraction = conversationHistory
      .slice(-3)
      .some(msg => msg.departmentId === department.id)
    
    const isDirectlyAddressed = message.toLowerCase().includes(department.type) ||
      message.toLowerCase().includes(department.name.toLowerCase()) ||
      message.toLowerCase().includes(agent.name.toLowerCase())

    // Always respond to direct mentions or if no recent interaction
    if (!isDirectlyAddressed && hasRecentInteraction) {
      return ''
    }

    try {
      // Generate response using local response generator
      const response = departmentResponses.generateResponse({
        message,
        agent,
        department,
        context: {
          ...analyzedContext,
          conversationHistory
        }
      })

      return response || this.getFallbackResponse(department.type, analyzedContext)
    } catch (error) {
      console.error('Error generating response:', error)
      return this.getFallbackResponse(department.type, analyzedContext)
    }
  }

  private getFallbackResponse(
    departmentType: Department['type'],
    context: ReturnType<typeof contextAnalyzer.analyzeContext>
  ): string {
    const responses = {
      sales: [
        "I can help optimize our sales strategy using data-driven insights.",
        "Let's analyze market trends and create targeted campaigns.",
        "I can help improve our lead generation and conversion rates."
      ],
      'customer-service': [
        "I'll help ensure we provide exceptional customer support.",
        "We can enhance customer satisfaction through personalized service.",
        "Let's improve our support processes and response times."
      ],
      finance: [
        "I can help optimize our financial planning and analysis.",
        "Let's review our budget allocation and cost optimization.",
        "I can provide insights on improving our financial efficiency."
      ],
      operations: [
        "I can help streamline our operational processes.",
        "Let's optimize our workflow and resource allocation.",
        "I can suggest improvements for operational efficiency."
      ]
    }

    const departmentResponses = responses[departmentType]
    return departmentResponses[Math.floor(Math.random() * departmentResponses.length)]
  }
}

export const responseGenerator = new ResponseGenerator()