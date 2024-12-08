import { DEPARTMENT_TYPES, DEPARTMENT_STATUS, PRIORITY_LEVELS } from './constants'

export type DepartmentType = typeof DEPARTMENT_TYPES[keyof typeof DEPARTMENT_TYPES]
export type DepartmentStatus = typeof DEPARTMENT_STATUS[keyof typeof DEPARTMENT_STATUS]
export type PriorityLevel = typeof PRIORITY_LEVELS[keyof typeof PRIORITY_LEVELS]

export interface Department {
  id: string
  name: string
  type: DepartmentType
  description: string
  taskCount: number
  status: DepartmentStatus
  createdAt: string
  updatedAt: string
  settings: DepartmentSettings
}

export interface DepartmentSettings {
  notifications: boolean
  autoAssignment: boolean
  priorityLevels: PriorityLevel[]
  customFields: Record<string, string>
}

export interface CreateDepartmentDTO {
  name: string
  type: DepartmentType
  description: string
  settings?: Partial<DepartmentSettings>
}

export interface UpdateDepartmentDTO {
  name?: string
  description?: string
  settings?: Partial<DepartmentSettings>
  status?: DepartmentStatus
}