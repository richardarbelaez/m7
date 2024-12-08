"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'

export interface Department {
  id: string
  name: string
  type: 'sales' | 'customer-service' | 'finance' | 'operations'
  description: string
  icon: string
  taskCount: number
  status: 'active' | 'archived'
  createdAt: string
}

interface DepartmentState {
  departments: Department[]
  selectedDepartments: string[]
  loading: boolean
  addDepartments: (departments: Omit<Department, 'id' | 'createdAt'>[]) => void
  removeDepartment: (id: string) => void
  getDepartment: (id: string) => Department | undefined
  updateDepartment: (id: string, updates: Partial<Department>) => void
  setSelectedDepartments: (ids: string[]) => void
  clearSelectedDepartments: () => void
  isDepartmentTypeSelected: (type: Department['type']) => boolean
  hasDuplicateDepartment: (type: Department['type']) => boolean
}

export const useDepartmentStore = create<DepartmentState>()(
  persist(
    (set, get) => ({
      departments: [],
      selectedDepartments: [],
      loading: false,

      isDepartmentTypeSelected: (type) => {
        return get().departments.some(dept => dept.type === type && dept.status === 'active')
      },

      hasDuplicateDepartment: (type) => {
        const activeDepartments = get().departments.filter(dept => dept.status === 'active')
        return activeDepartments.filter(dept => dept.type === type).length > 0
      },

      setSelectedDepartments: (ids) => {
        // Filter out any IDs that would create duplicates
        const validIds = ids.filter(id => {
          const department = get().departments.find(d => d.id === id)
          if (!department) return false
          return !get().hasDuplicateDepartment(department.type)
        })
        set({ selectedDepartments: validIds })
      },

      clearSelectedDepartments: () => {
        set({ selectedDepartments: [] })
      },

      addDepartments: (departments) => {
        // Filter out any departments that would create duplicates
        const validDepartments = departments.filter(
          dept => !get().hasDuplicateDepartment(dept.type)
        )

        const newDepartments = validDepartments.map(dept => ({
          ...dept,
          id: nanoid(),
          createdAt: new Date().toISOString()
        }))
        
        set(state => ({
          departments: [...state.departments, ...newDepartments],
          selectedDepartments: []
        }))
      },

      removeDepartment: (id) => {
        set(state => ({
          departments: state.departments.filter(dept => dept.id !== id)
        }))
      },

      updateDepartment: (id, updates) => {
        set(state => ({
          departments: state.departments.map(dept =>
            dept.id === id ? { ...dept, ...updates } : dept
          )
        }))
      },

      getDepartment: (id) => get().departments.find((dept) => dept.id === id),
    }),
    {
      name: 'department-store',
    }
  )
)