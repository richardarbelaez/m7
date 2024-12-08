import { createClient } from './server'
import { Department } from '@/lib/stores/department-store'

export async function createDepartments(departments: Omit<Department, 'id' | 'createdAt'>[]) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('departments')
    .insert(
      departments.map(dept => ({
        name: dept.name,
        description: dept.description,
        type: dept.type,
        icon: dept.icon,
        task_count: dept.taskCount,
        status: dept.status,
      }))
    )
    .select()

  if (error) throw error
  return data
}

export async function getDepartments() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function updateDepartment(id: string, updates: Partial<Department>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('departments')
    .update({
      name: updates.name,
      description: updates.description,
      type: updates.type,
      icon: updates.icon,
      task_count: updates.taskCount,
      status: updates.status,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function archiveDepartment(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('departments')
    .update({ status: 'archived' })
    .eq('id', id)

  if (error) throw error
  return true
}