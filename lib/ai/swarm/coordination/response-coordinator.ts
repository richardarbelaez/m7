"use client"

import { ChatMessage } from '@/lib/types/chat'
import { Department } from '@/lib/stores/department-store'
import { MessageAnalyzer } from '../analysis/message-analyzer'
import { ContextManager } from '../context/context-manager'

interface CoordinatedResponse {
  messages: ChatMessage[]
  handoff?: {
    targetDepartment: string
    reason: string
  }
}

export class ResponseCoordinator {
  private messageAnalyzer: MessageAnalyzer
  private contextManager: ContextManager
  private departments: Department[]

  constructor(
    departments: Department[],
    contextManager: ContextManager
  ) {
    this.departments = departments
    this.messageAnalyzer = new MessageAnalyzer(departments)
    this.contextManager = contextManager
  }

  public async coordinateResponses(
    message: string,
    responses: ChatMessage[]
  ): Promise<CoordinatedResponse> {
    const analysis = this.messageAnalyzer.analyze(message)
    const timestamp = new Date().toISOString()

    // Filter out redundant responses
    const uniqueResponses = this.deduplicateResponses(responses)

    // Sort responses by relevance and priority
    const sortedResponses = this.sortResponses(uniqueResponses, analysis)

    // Determine if handoff is needed
    const handoff = this.determineHandoff(analysis, responses)

    // Update context with new information
    this.updateContext(message, analysis, responses)

    return {
      messages: sortedResponses,
      handoff
    }
  }

  private deduplicateResponses(responses: ChatMessage[]): ChatMessage[] {
    const seen = new Set<string>()
    return responses.filter(response => {
      const key = `${response.departmentId}-${response.content}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }

  private sortResponses(
    responses: ChatMessage[],
    analysis: ReturnType<MessageAnalyzer['analyze']>
  ): ChatMessage[] {
    return responses.sort((a, b) => {
      // Prioritize responses from relevant departments
      const aRelevance = analysis.relevantDepartments.includes(
        this.getDepartmentType(a.departmentId)
      ) ? 1 : 0
      const bRelevance = analysis.relevantDepartments.includes(
        this.getDepartmentType(b.departmentId)
      ) ? 1 : 0

      return bRelevance - aRelevance
    })
  }

  private determineHandoff(
    analysis: ReturnType<MessageAnalyzer['analyze']>,
    responses: ChatMessage[]
  ) {
    // Check if the most relevant department hasn't responded
    const mostRelevantDept = analysis.relevantDepartments[0]
    if (
      mostRelevantDept &&
      !responses.some(r => this.getDepartmentType(r.departmentId) === mostRelevantDept)
    ) {
      return {
        targetDepartment: mostRelevantDept,
        reason: `Message requires ${mostRelevantDept} department expertise`
      }
    }
    return undefined
  }

  private updateContext(
    message: string,
    analysis: ReturnType<MessageAnalyzer['analyze']>,
    responses: ChatMessage[]
  ) {
    // Update global context with new priorities if urgent
    if (analysis.urgency) {
      this.contextManager.updateGlobalContext({
        priorities: [
          ...this.contextManager.getGlobalContext().priorities,
          ...analysis.keywords
        ]
      })
    }

    // Update department contexts
    analysis.relevantDepartments.forEach(deptType => {
      const dept = this.departments.find(d => d.type === deptType)
      if (dept) {
        const context = this.contextManager.getDepartmentContext(dept.id)
        if (context) {
          this.contextManager.updateDepartmentContext(dept.id, {
            priorities: [...context.priorities, ...analysis.keywords]
          })
        }
      }
    })
  }

  private getDepartmentType(departmentId?: string): string {
    if (!departmentId) return 'unknown'
    const department = this.departments.find(d => d.id === departmentId)
    return department?.type || 'unknown'
  }
}