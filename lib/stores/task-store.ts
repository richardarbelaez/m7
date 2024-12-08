"use client"

import { create } from 'zustand'
import { Task, TaskStatus, TaskPriority } from '@/lib/types/task'
import { nanoid } from 'nanoid'

interface TaskStore {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTask: (id: string, updates: Partial<Omit<Task, 'id'>>) => void
  deleteTask: (id: string) => void
  getTasksByDepartment: (departmentId: string) => Task[]
  getTasksByStatus: (status: TaskStatus) => Task[]
  getTasksByPriority: (priority: TaskPriority) => Task[]
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  
  addTask: (task) => {
    const now = new Date().toISOString()
    const newTask: Task = {
      ...task,
      id: nanoid(),
      createdAt: now,
      updatedAt: now,
    }
    set((state) => ({ tasks: [...state.tasks, newTask] }))
  },
  
  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      ),
    }))
  },
  
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }))
  },
  
  getTasksByDepartment: (departmentId) => {
    return get().tasks.filter((task) => task.departmentId === departmentId)
  },
  
  getTasksByStatus: (status) => {
    return get().tasks.filter((task) => task.status === status)
  },
  
  getTasksByPriority: (priority) => {
    return get().tasks.filter((task) => task.priority === priority)
  },
}))