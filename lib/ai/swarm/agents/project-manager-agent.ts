"use client"

import { BaseAgent, AgentContext } from './base-agent'
import { ChatMessage } from '@/lib/types/chat'
import { ContextManager } from '../context/context-manager'

export class ProjectManagerAgent extends BaseAgent {
  private subordinateAgents: BaseAgent[] = []

  constructor(context: AgentContext, contextManager: ContextManager) {
    super(context, contextManager)
    this.addTool('delegateTask', this.delegateTask.bind(this))
    this.addTool('gatherReports', this.gatherReports.bind(this))
  }

  public registerAgent(agent: BaseAgent) {
    this.subordinateAgents.push(agent)
  }

  private async delegateTask(task: string, targetDepartment?: string): Promise<string> {
    const relevantAgents = targetDepartment 
      ? this.subordinateAgents.filter(agent => 
          agent.getContext().department.type === targetDepartment
        )
      : this.subordinateAgents

    const responses = await Promise.all(
      relevantAgents.map(agent => agent.process(task))
    )

    return responses.join('\n\n')
  }

  private async gatherReports(): Promise<Record<string, string>> {
    const reports: Record<string, string> = {}
    
    for (const agent of this.subordinateAgents) {
      const context = agent.getContext()
      reports[context.department.type] = await agent.process('Generate status report')
    }

    return reports
  }

  public async process(message: string): Promise<string> {
    // Analyze message to determine if it needs delegation
    if (message.toLowerCase().includes('report')) {
      const reports = await this.gatherReports()
      return `Team Reports:\n\n${Object.entries(reports)
        .map(([dept, report]) => `${dept}:\n${report}`)
        .join('\n\n')}`
    }

    // Delegate to appropriate department(s)
    return this.delegateTask(message)
  }
}