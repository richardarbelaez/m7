import { Department, CreateDepartmentDTO, UpdateDepartmentDTO } from './types'

// In-memory store for development
class DepartmentStore {
  private departments: Department[] = []

  async create(dto: CreateDepartmentDTO): Promise<Department> {
    const department: Department = {
      id: Math.random().toString(36).substr(2, 9),
      name: dto.name,
      type: dto.type,
      description: dto.description,
      taskCount: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      settings: {
        notifications: true,
        autoAssignment: false,
        priorityLevels: ['low', 'medium', 'high'],
        customFields: {},
        ...dto.settings
      }
    }
    
    this.departments.push(department)
    return department
  }

  async findAll(): Promise<Department[]> {
    return [...this.departments]
  }

  async findActive(): Promise<Department[]> {
    return this.departments.filter(dept => dept.status === 'active')
  }

  async findById(id: string): Promise<Department | null> {
    return this.departments.find(dept => dept.id === id) || null
  }

  async update(id: string, dto: UpdateDepartmentDTO): Promise<Department | null> {
    const index = this.departments.findIndex(dept => dept.id === id)
    if (index === -1) return null

    const updated = {
      ...this.departments[index],
      ...dto,
      settings: {
        ...this.departments[index].settings,
        ...dto.settings
      },
      updatedAt: new Date().toISOString()
    }
    
    this.departments[index] = updated
    return updated
  }

  async archive(id: string): Promise<boolean> {
    const department = await this.update(id, { status: 'archived' })
    return !!department
  }
}

// Export singleton instance
export const departmentStore = new DepartmentStore()