"use client"

import { ChatMessage } from "@/lib/types/chat"
import { sentimentAnalyzer } from "./sentiment-analyzer"

interface ConversationContext {
  topics: string[]
  sentiment: 'positive' | 'neutral' | 'negative'
  userIntent: string
  recentTopics: string[]
  participatingDepartments: string[]
  messageCount: number
}

class ContextAnalyzer {
  private extractTopics(messages: ChatMessage[]): string[] {
    const topics = new Set<string>()
    const keywords = {
      sales: ['sales', 'marketing', 'leads', 'revenue', 'customers'],
      finance: ['budget', 'costs', 'expenses', 'financial', 'pricing'],
      operations: ['process', 'workflow', 'efficiency', 'timeline', 'resources'],
      'customer-service': ['support', 'satisfaction', 'feedback', 'issues', 'help']
    }

    messages.forEach(msg => {
      const content = msg.content.toLowerCase()
      Object.entries(keywords).forEach(([topic, words]) => {
        if (words.some(word => content.includes(word))) {
          topics.add(topic)
        }
      })
    })

    return Array.from(topics)
  }

  private determineUserIntent(messages: ChatMessage[]): string {
    const userMessages = messages.filter(m => m.sender === 'user')
    if (userMessages.length === 0) return 'initial-contact'

    const lastMessage = userMessages[userMessages.length - 1].content.toLowerCase()
    
    if (lastMessage.includes('?')) return 'question'
    if (lastMessage.includes('help') || lastMessage.includes('assist')) return 'seeking-help'
    if (lastMessage.includes('thank')) return 'appreciation'
    return 'statement'
  }

  private getRecentTopics(messages: ChatMessage[], limit: number = 3): string[] {
    return messages
      .slice(-limit)
      .map(msg => this.extractTopics([msg]))
      .flat()
  }

  public analyzeContext(messages: ChatMessage[]): ConversationContext {
    const topics = this.extractTopics(messages)
    const userIntent = this.determineUserIntent(messages)
    const recentTopics = this.getRecentTopics(messages)
    
    // Analyze sentiment of last 3 messages
    const recentMessages = messages.slice(-3)
    const sentiments = recentMessages.map(msg => 
      sentimentAnalyzer.analyzeText(msg.content)
    )
    
    const averageSentiment = sentiments.reduce(
      (acc, curr) => acc + curr.score, 0
    ) / sentiments.length

    const sentiment = averageSentiment > 0 ? 'positive' 
      : averageSentiment < 0 ? 'negative' 
      : 'neutral'

    const participatingDepartments = Array.from(
      new Set(messages
        .filter(m => m.departmentId)
        .map(m => m.departmentId as string)
      )
    )

    return {
      topics,
      sentiment,
      userIntent,
      recentTopics,
      participatingDepartments,
      messageCount: messages.length
    }
  }
}

export const contextAnalyzer = new ContextAnalyzer()