"use client"

import { AgentPersonality } from "@/lib/types/agent"
import { Department } from "@/lib/stores/department-store"
import { ChatMessage } from "@/lib/types/chat"
import { ContextManager } from "../context/context-manager"

export interface AgentContext {
  department: Department
  personality: AgentPersonality
  conversationHistory: ChatMessage[]
  sharedContext: Record<string, any>
}

export class BaseAgent {
  protected context: AgentContext
  protected tools: Record<string, Function>
  protected contextManager: ContextManager

  constructor(context: AgentContext, contextManager: ContextManager) {
    this.context = context
    this.tools = {}
    this.contextManager = contextManager
  }

  public async process(message: string): Promise<string> {
    throw new Error("Process method must be implemented by derived agents")
  }

  protected async handoff(targetAgent: BaseAgent, reason: string): Promise<void> {
    // Update context before handoff
    const sharedContext = this.contextManager.getSharedContext(
      this.context.department.id
    )
    
    targetAgent.updateContext({
      sharedContext: {
        ...sharedContext,
        handoffReason: reason,
        previousAgent: this.context.department.id
      }
    })
  }

  protected canHandle(message: string): boolean {
    // Check department expertise and message content
    const departmentKeywords = {
      sales: ['sales', 'revenue', 'leads', 'marketing'],
      'customer-service': ['support', 'help', 'issue', 'complaint'],
      finance: ['budget', 'cost', 'expense', 'payment'],
      operations: ['process', 'workflow', 'efficiency']
    }

    const keywords = departmentKeywords[this.context.department.type]
    if (!keywords) return false

    return keywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    )
  }

  protected addTool(name: string, fn: Function) {
    this.tools[name] = fn.bind(this)
  }

  public getContext(): AgentContext {
    return this.context
  }

  public updateContext(updates: Partial<AgentContext>) {
    this.context = {
      ...this.context,
      ...updates
    }
  }
}