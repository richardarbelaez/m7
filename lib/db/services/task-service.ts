"use client"

import { nanoid } from 'nanoid'
import { getDB } from '../indexed-db'

export interface Task {
  id: string
  departmentId: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  dueDate: string | null
  assignedTo: string | null
  createdAt: string
}

export const taskService = {
  async createTask(task: Omit<Task, 'id' | 'createdAt'>) {
    const db = await getDB()
    const id = nanoid()
    const newTask = {
      ...task,
      id,
      createdAt: new Date().toISOString()
    }
    
    await db.add('tasks', newTask)
    return newTask
  },

  async getTasksByDepartment(departmentId: string) {
    const db = await getDB()
    return await db.getAllFromIndex('tasks', 'by-department', departmentId)
  },

  async updateTask(id: string, updates: Partial<Task>) {
    const db = await getDB()
    const task = await db.get('tasks', id)
    if (!task) return null

    const updatedTask = {
      ...task,
      ...updates
    }
    
    await db.put('tasks', updatedTask)
    return updatedTask
  },

  async deleteTask(id: string) {
    const db = await getDB()
    await db.delete('tasks', id)
    return true
  }
}