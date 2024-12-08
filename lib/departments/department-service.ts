"use client"

import { 
  Department, 
  CreateDepartmentDTO, 
  UpdateDepartmentDTO 
} from './types'
import { departmentStore } from './department-store'

export class DepartmentService {
  async createDepartment(dto: CreateDepartmentDTO): Promise<Department> {
    return await departmentStore.create(dto)
  }

  async getDepartments(): Promise<Department[]> {
    return await departmentStore.findActive()
  }

  async getDepartment(id: string): Promise<Department | null> {
    return await departmentStore.findById(id)
  }

  async updateDepartment(id: string, dto: UpdateDepartmentDTO): Promise<Department | null> {
    return await departmentStore.update(id, dto)
  }

  async archiveDepartment(id: string): Promise<boolean> {
    return await departmentStore.archive(id)
  }
}

// Export singleton instance
export const departmentService = new DepartmentService()