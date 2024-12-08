"use client"

import { AgentPersonality } from "@/lib/types/agent"
import { Department } from "@/lib/stores/department-store"
import { ChatMessage } from "@/lib/types/chat"

interface ResponseContext {
  message: string
  agent: AgentPersonality
  department: Department
  context: {
    topics: string[]
    sentiment: 'positive' | 'neutral' | 'negative'
    userIntent: string
    recentTopics: string[]
    participatingDepartments: string[]
    messageCount: number
    conversationHistory: ChatMessage[]
  }
}

class DepartmentResponseGenerator {
  private addPersonality(response: string, agent: AgentPersonality, context: ResponseContext['context']): string {
    const traits = agent.traits || []
    let personalizedResponse = response

    // Add more natural variations based on context
    if (context.sentiment === 'positive') {
      personalizedResponse = `${personalizedResponse} I'm excited to help with this!`
    }

    if (context.userIntent === 'question') {
      personalizedResponse = `Based on my expertise as ${agent.role}, ${personalizedResponse}`
    }

    if (traits.includes('Enthusiastic')) {
      personalizedResponse = personalizedResponse.replace(/\.$/, '!')
    }

    if (traits.includes('Professional')) {
      personalizedResponse = `As your ${agent.role}, ${personalizedResponse}`
    }

    if (traits.includes('Empathetic')) {
      personalizedResponse = `I understand what you're looking for. ${personalizedResponse}`
    }

    return personalizedResponse
  }

  private generateSalesResponse(context: ResponseContext): string {
    const { message, agent, context: ctx } = context
    const lowercaseMessage = message.toLowerCase()
    const recentMessages = ctx.conversationHistory.slice(-3)
    const hasRecentInteraction = recentMessages.some(msg => msg.departmentId === context.department.id)

    // If recently participated, provide follow-up response
    if (hasRecentInteraction) {
      if (lowercaseMessage.includes('yes') || lowercaseMessage.includes('ok')) {
        return this.addPersonality(
          "Great! Let me outline a specific action plan for implementing these strategies.",
          agent,
          ctx
        )
      }
    }

    if (lowercaseMessage.includes('lead') || lowercaseMessage.includes('prospect')) {
      return this.addPersonality(
        "I can help optimize your lead generation strategy using AI-driven analytics and automation. Would you like me to create a detailed plan?",
        agent,
        ctx
      )
    }

    if (lowercaseMessage.includes('market') || lowercaseMessage.includes('campaign')) {
      return this.addPersonality(
        "Let's analyze market trends and create targeted campaigns to maximize ROI. I can show you some successful campaign templates we've developed.",
        agent,
        ctx
      )
    }

    // Default response with context awareness
    const response = ctx.topics.includes('finance') 
      ? "I can help align our sales strategies with financial goals and ROI targets."
      : "I can help boost your sales performance through data-driven strategies and automation. What specific area would you like to focus on?"

    return this.addPersonality(response, agent, ctx)
  }

  private generateCustomerServiceResponse(context: ResponseContext): string {
    const { message, agent, context: ctx } = context
    const lowercaseMessage = message.toLowerCase()
    const hasRecentInteraction = ctx.conversationHistory
      .slice(-3)
      .some(msg => msg.departmentId === context.department.id)

    if (hasRecentInteraction) {
      if (lowercaseMessage.includes('how')) {
        return this.addPersonality(
          "Let me break down the process step by step and show you how we can implement these improvements.",
          agent,
          ctx
        )
      }
    }

    if (lowercaseMessage.includes('support') || lowercaseMessage.includes('help')) {
      return this.addPersonality(
        "I'll ensure we provide exceptional support through AI-powered assistance and proactive issue resolution. Would you like to see our customer satisfaction metrics?",
        agent,
        ctx
      )
    }

    if (lowercaseMessage.includes('satisfaction') || lowercaseMessage.includes('feedback')) {
      return this.addPersonality(
        "We can implement automated feedback collection and analysis to improve customer satisfaction. I can show you our latest customer insights.",
        agent,
        ctx
      )
    }

    const response = ctx.topics.includes('sales')
      ? "I can help ensure our customer service aligns with sales objectives while maintaining high satisfaction levels."
      : "I'll help enhance customer experience through personalized support and efficient issue resolution. What aspects would you like to improve?"

    return this.addPersonality(response, agent, ctx)
  }

  private generateFinanceResponse(context: ResponseContext): string {
    const { message, agent, context: ctx } = context
    const lowercaseMessage = message.toLowerCase()
    const hasRecentInteraction = ctx.conversationHistory
      .slice(-3)
      .some(msg => msg.departmentId === context.department.id)

    if (hasRecentInteraction) {
      if (lowercaseMessage.includes('cost') || lowercaseMessage.includes('budget')) {
        return this.addPersonality(
          "I'll prepare a detailed cost analysis and budget optimization plan for your review.",
          agent,
          ctx
        )
      }
    }

    if (lowercaseMessage.includes('budget') || lowercaseMessage.includes('cost')) {
      return this.addPersonality(
        "I can help optimize budget allocation and cost management through AI-driven analysis. Would you like to see our current financial metrics?",
        agent,
        ctx
      )
    }

    if (lowercaseMessage.includes('report') || lowercaseMessage.includes('analysis')) {
      return this.addPersonality(
        "Let's generate comprehensive financial reports and insights using automated data analysis. I can show you some key performance indicators.",
        agent,
        ctx
      )
    }

    const response = ctx.topics.includes('operations')
      ? "I can help analyze the financial implications of our operational improvements and optimize resource allocation."
      : "I can provide financial insights and optimization strategies based on AI analysis. What financial aspects would you like to focus on?"

    return this.addPersonality(response, agent, ctx)
  }

  private generateOperationsResponse(context: ResponseContext): string {
    const { message, agent, context: ctx } = context
    const lowercaseMessage = message.toLowerCase()
    const hasRecentInteraction = ctx.conversationHistory
      .slice(-3)
      .some(msg => msg.departmentId === context.department.id)

    if (hasRecentInteraction) {
      if (lowercaseMessage.includes('workflow') || lowercaseMessage.includes('process')) {
        return this.addPersonality(
          "I'll create a detailed workflow optimization plan that incorporates our latest AI automation capabilities.",
          agent,
          ctx
        )
      }
    }

    if (lowercaseMessage.includes('process') || lowercaseMessage.includes('workflow')) {
      return this.addPersonality(
        "I can help streamline processes and implement efficient workflows using AI automation. Would you like to see our process optimization framework?",
        agent,
        ctx
      )
    }

    if (lowercaseMessage.includes('team') || lowercaseMessage.includes('resource')) {
      return this.addPersonality(
        "Let's optimize resource allocation and team coordination through AI-powered management. I can show you our resource utilization metrics.",
        agent,
        ctx
      )
    }

    const response = ctx.topics.includes('finance')
      ? "I can help implement operational improvements that align with our financial objectives and efficiency targets."
      : "I can help improve operational efficiency through AI-driven process optimization. Which areas need the most attention?"

    return this.addPersonality(response, agent, ctx)
  }

  public generateResponse(context: ResponseContext): string {
    const { department, context: ctx } = context

    // Don't respond if the agent has recently participated unless directly addressed
    const hasRecentInteraction = ctx.conversationHistory
      .slice(-3)
      .some(msg => msg.departmentId === department.id)
    
    const isDirectlyAddressed = context.message.toLowerCase().includes(department.type) ||
      context.message.toLowerCase().includes(department.name.toLowerCase())

    if (hasRecentInteraction && !isDirectlyAddressed) {
      return ''
    }

    switch (department.type) {
      case 'sales':
        return this.generateSalesResponse(context)
      case 'customer-service':
        return this.generateCustomerServiceResponse(context)
      case 'finance':
        return this.generateFinanceResponse(context)
      case 'operations':
        return this.generateOperationsResponse(context)
      default:
        return "I'll help with that request."
    }
  }
}

export const departmentResponses = new DepartmentResponseGenerator()