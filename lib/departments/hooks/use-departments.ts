"use client"

import { useState, useEffect } from 'react'
import { Department } from '../types'
import { departmentService } from '../department-service'

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    loadDepartments()
  }, [])

  async function loadDepartments() {
    try {
      setLoading(true)
      const data = await departmentService.getDepartments()
      setDepartments(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load departments'))
    } finally {
      setLoading(false)
    }
  }

  async function createDepartment(name: string, type: Department['type'], description: string) {
    try {
      const department = await departmentService.createDepartment({
        name,
        type,
        description
      })
      setDepartments(prev => [...prev, department])
      return department
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create department')
    }
  }

  async function updateDepartment(id: string, updates: Parameters<typeof departmentService.updateDepartment>[1]) {
    try {
      const updated = await departmentService.updateDepartment(id, updates)
      if (updated) {
        setDepartments(prev => 
          prev.map(dept => dept.id === id ? updated : dept)
        )
      }
      return updated
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update department')
    }
  }

  async function archiveDepartment(id: string) {
    try {
      const success = await departmentService.archiveDepartment(id)
      if (success) {
        setDepartments(prev => prev.filter(dept => dept.id !== id))
      }
      return success
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to archive department')
    }
  }

  return {
    departments,
    loading,
    error,
    createDepartment,
    updateDepartment,
    archiveDepartment,
    refresh: loadDepartments
  }
}