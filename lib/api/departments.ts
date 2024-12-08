import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/types/database'

type Department = Database['public']['Tables']['departments']['Row']
type DepartmentInsert = Database['public']['Tables']['departments']['Insert']
type DepartmentUpdate = Database['public']['Tables']['departments']['Update']

export async function createDepartment(department: DepartmentInsert) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('departments')
    .insert(department)
    .select()
    .single()

  return { data: data as Department | null, error }
}

export async function getDepartments(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('departments')
    .select()
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return { data: data as Department[] | null, error }
}

export async function updateDepartment(id: string, updates: DepartmentUpdate) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('departments')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data: data as Department | null, error }
}

export async function deleteDepartment(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('departments')
    .delete()
    .eq('id', id)

  return { error }
}