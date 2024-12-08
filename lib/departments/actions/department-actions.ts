"use client"

import { Department, CreateDepartmentDTO, UpdateDepartmentDTO } from '../types'
import { departmentService } from '../department-service'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export function useDepartmentActions() {
  const { toast } = useToast()
  const router = useRouter()

  const createDepartment = async (data: CreateDepartmentDTO) => {
    try {
      const department = await departmentService.createDepartment(data)
      toast({
        title: "Department Created",
        description: `${department.name} has been created successfully.`
      })
      return department
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create department",
        variant: "destructive"
      })
      throw error
    }
  }

  const updateDepartment = async (id: string, data: UpdateDepartmentDTO) => {
    try {
      const department = await departmentService.updateDepartment(id, data)
      if (department) {
        toast({
          title: "Department Updated",
          description: `${department.name} has been updated successfully.`
        })
      }
      return department
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update department",
        variant: "destructive"
      })
      throw error
    }
  }

  const archiveDepartment = async (id: string) => {
    try {
      const success = await departmentService.archiveDepartment(id)
      if (success) {
        toast({
          title: "Department Archived",
          description: "The department has been archived successfully."
        })
        router.refresh()
      }
      return success
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to archive department",
        variant: "destructive"
      })
      throw error
    }
  }

  return {
    createDepartment,
    updateDepartment,
    archiveDepartment
  }
}