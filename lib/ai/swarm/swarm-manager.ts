"use client"

import { BaseAgent } from './agents/base-agent'
import { ProjectManagerAgent } from './agents/project-manager-agent'
import { DepartmentAgent } from './agents/department-agent'
import { Department } from '@/lib/stores/department-store'
import { AgentPersonality, defaultAgents } from '@/lib/types/agent'
import { ChatMessage } from '@/lib/types/chat'
import { ContextManager } from './context/context-manager'

export class SwarmManager {
  private projectManager: ProjectManagerAgent
  private departmentAgents: Map<string, DepartmentAgent> = new Map()
  private contextManager: ContextManager

  constructor(departments: Department[]) {
    this.contextManager = new ContextManager()

    // Initialize project manager
    this.projectManager = new ProjectManagerAgent({
      department: {
        id: 'manager',
        name: 'Project Management',
        type: 'operations',
        description: 'Oversee and coordinate all departments',
        icon: 'Users',
        taskCount: 0,
        status: 'active',
        createdAt: new Date().toISOString()
      },
      personality: {
        name: "Project Manager",
        role: "Project Management Lead",
        traits: ["Organized", "Strategic", "Leadership"],
        expertise: ["Project Management", "Team Coordination", "Resource Allocation"],
        communicationStyle: "Clear and professional",
        avatarUrl: "/avatars/operations-robot.png"
      },
      conversationHistory: [],
      sharedContext: {}
    }, this.contextManager)

    // Initialize department agents
    departments.forEach(dept => {
      const agent = new DepartmentAgent({
        department: dept,
        personality: defaultAgents[dept.type],
        conversationHistory: [],
        sharedContext: {}
      }, this.contextManager)
      
      this.departmentAgents.set(dept.id, agent)
      this.projectManager.registerAgent(agent)
      this.contextManager.initializeDepartment(dept)
    })
  }

  public async processMessage(
    message: string,
    departmentId?: string
  ): Promise<ChatMessage[]> {
    const responses: ChatMessage[] = []
    const timestamp = new Date().toISOString()

    // If department specified, get direct response
    if (departmentId) {
      const agent = this.departmentAgents.get(departmentId)
      if (agent) {
        const response = await agent.process(message)
        responses.push({
          id: `${departmentId}-${Date.now()}`,
          type: 'text',
          content: response,
          sender: 'agent',
          timestamp,
          departmentId
        })
      }
    }

    // Get project manager's coordinated response
    const managerResponse = await this.projectManager.process(message)
    responses.push({
      id: `manager-${Date.now()}`,
      type: 'text',
      content: managerResponse,
      sender: 'agent',
      timestamp,
      departmentId: 'manager'
    })

    return responses
  }

  public updateAgentContext(
    departmentId: string,
    updates: Partial<Parameters<BaseAgent['updateContext']>[0]>
  ) {
    const agent = this.departmentAgents.get(departmentId)
    if (agent) {
      agent.updateContext(updates)
    }
  }

  public getContextManager(): ContextManager {
    return this.contextManager
  }
}