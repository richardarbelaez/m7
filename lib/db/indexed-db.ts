"use client"

import { openDB, DBSchema, IDBPDatabase } from 'idb'

interface MyCompanyDB extends DBSchema {
  users: {
    key: string
    value: {
      id: string
      email: string
      role: string
    }
  }
  departments: {
    key: string
    value: {
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
    indexes: { 'by-user': string }
  }
  profiles: {
    key: string
    value: {
      id: string
      userId: string
      companyName: string
      industry: string
      size: number
      description: string
      goals: string
      onboardingCompleted: boolean
      createdAt: string
    }
  }
  tasks: {
    key: string
    value: {
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
    indexes: { 'by-department': string }
  }
}

let dbPromise: Promise<IDBPDatabase<MyCompanyDB>>

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<MyCompanyDB>('mycompany-db', 1, {
      upgrade(db) {
        // Users store
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'id' })
        }

        // Departments store
        if (!db.objectStoreNames.contains('departments')) {
          const departmentStore = db.createObjectStore('departments', { keyPath: 'id' })
          departmentStore.createIndex('by-user', 'userId')
        }

        // Profiles store
        if (!db.objectStoreNames.contains('profiles')) {
          db.createObjectStore('profiles', { keyPath: 'id' })
        }

        // Tasks store
        if (!db.objectStoreNames.contains('tasks')) {
          const taskStore = db.createObjectStore('tasks', { keyPath: 'id' })
          taskStore.createIndex('by-department', 'departmentId')
        }
      },
    })
  }
  return dbPromise
}

// Initialize with default user
export async function initializeDB() {
  const db = await getDB()
  
  // Add default user if not exists
  const defaultUser = {
    id: '2',
    email: 'user@mycompany.com',
    role: 'user'
  }

  const existingUser = await db.get('users', defaultUser.id)
  if (!existingUser) {
    await db.put('users', defaultUser)
  }
}

// Initialize DB when this module is imported
if (typeof window !== 'undefined') {
  initializeDB()
}