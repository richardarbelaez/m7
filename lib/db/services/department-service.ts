"use client"

import { nanoid } from 'nanoid'
import { getDB } from '../indexed-db'

export interface Department {
  id: string
  userId: string
  name: string
  type: 'sales' | 'customer-service' | 'finance' | 'operations'
  description: string
  icon: string
  taskCount: number
  status: 'active' | 'archived'
  createdAt: string
}

export const departmentService = {
  async createDepartment(department: Omit<Department, 'id' | 'createdAt'>) {
    const db = await getDB()
    const id = nanoid()
    const newDepartment = {
      ...department,
      id,
      createdAt: new Date().toISOString()
    }
    
    await db.add('departments', newDepartment)
    return newDepartment
  },

  async getDepartments(userId: string) {
    const db = await getDB()
    const departments = await db.getAllFromIndex('departments', 'by-user', userId)
    return departments.filter(dept => dept.status === 'active')
  },

  async updateDepartment(id: string, updates: Partial<Department>) {
    const db = await getDB()
    const department = await db.get('departments', id)
    if (!department) return null

    const updatedDepartment = {
      ...department,
      ...updates
    }
    
    await db.put('departments', updatedDepartment)
    return updatedDepartment
  },

  async archiveDepartment(id: string) {
    const db = await getDB()
    const department = await db.get('departments', id)
    if (!department) return false

    await db.put('departments', {
      ...department,
      status: 'archived'
    })
    
    return true
  }
}