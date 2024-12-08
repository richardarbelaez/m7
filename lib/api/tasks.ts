import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/types/database'

type Task = Database['public']['Tables']['tasks']['Row']
type TaskInsert = Database['public']['Tables']['tasks']['Insert']
type TaskUpdate = Database['public']['Tables']['tasks']['Update']

export async function createTask(task: TaskInsert) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select()
    .single()

  return { data: data as Task | null, error }
}

export async function getTasks(departmentId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      departments (
        name,
        type
      )
    `)
    .eq('department_id', departmentId)
    .order('due_date', { ascending: true })

  return { data: data as (Task & { departments: { name: string; type: string } })[] | null, error }
}

export async function updateTask(id: string, updates: TaskUpdate) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data: data as Task | null, error }
}

export async function deleteTask(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  return { error }
}