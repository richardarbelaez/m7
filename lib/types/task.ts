"use client"

export type TaskPriority = 'low' | 'medium' | 'high'
export type TaskStatus = 'pending' | 'in-progress' | 'completed'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string | null
  departmentId: string
  assignedTo: string | null
  createdAt: string
  updatedAt: string
  dependencies: string[]
  subtasks: SubTask[]
  tags: string[]
}

export interface SubTask {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export interface TaskFilter {
  status?: TaskStatus[]
  priority?: TaskPriority[]
  tags?: string[]
  search?: string
  hasDependencies?: boolean
  hasSubtasks?: boolean
  dateRange?: {
    start: string
    end: string
  }
}