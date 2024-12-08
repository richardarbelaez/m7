"use client"

import { ChatMessage } from '@/lib/types/chat'
import { Department } from '@/lib/stores/department-store'

export interface ProjectContext {
  currentProject?: string
  priorities: string[]
  deadlines: Record<string, Date>
  teamMetrics: Record<string, number>
  lastUpdate: Date
}

export interface DepartmentContext {
  activeProjects: string[]
  metrics: Record<string, number>
  priorities: string[]
  lastInteraction: Date
}

export class ContextManager {
  private globalContext: ProjectContext
  private departmentContexts: Map<string, DepartmentContext>
  private conversationHistory: ChatMessage[]
  private maxHistoryLength: number

  constructor() {
    this.globalContext = {
      priorities: [],
      deadlines: {},
      teamMetrics: {},
      lastUpdate: new Date()
    }
    this.departmentContexts = new Map()
    this.conversationHistory = []
    this.maxHistoryLength = 100
  }

  public initializeDepartment(department: Department) {
    this.departmentContexts.set(department.id, {
      activeProjects: [],
      metrics: {},
      priorities: [],
      lastInteraction: new Date()
    })
  }

  public updateGlobalContext(updates: Partial<ProjectContext>) {
    this.globalContext = {
      ...this.globalContext,
      ...updates,
      lastUpdate: new Date()
    }
  }

  public updateDepartmentContext(
    departmentId: string,
    updates: Partial<DepartmentContext>
  ) {
    const current = this.departmentContexts.get(departmentId)
    if (current) {
      this.departmentContexts.set(departmentId, {
        ...current,
        ...updates,
        lastInteraction: new Date()
      })
    }
  }

  public addToHistory(message: ChatMessage) {
    this.conversationHistory.push(message)
    if (this.conversationHistory.length > this.maxHistoryLength) {
      this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength)
    }
  }

  public getRecentHistory(limit: number = 10): ChatMessage[] {
    return this.conversationHistory.slice(-limit)
  }

  public getDepartmentHistory(departmentId: string, limit: number = 10): ChatMessage[] {
    return this.conversationHistory
      .filter(msg => msg.departmentId === departmentId)
      .slice(-limit)
  }

  public getGlobalContext(): ProjectContext {
    return this.globalContext
  }

  public getDepartmentContext(departmentId: string): DepartmentContext | undefined {
    return this.departmentContexts.get(departmentId)
  }

  public getSharedContext(departmentId: string) {
    return {
      global: this.globalContext,
      department: this.getDepartmentContext(departmentId),
      recentHistory: this.getRecentHistory(5)
    }
  }
}