import { supabase } from './client'
import { BusinessProfile } from '@/lib/stores/profile-store'
import { Department } from '@/lib/stores/department-store'

export async function createProfile(profile: Omit<BusinessProfile, 'createdAt'>) {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: profile.id,
      company_name: profile.companyName,
      industry: profile.industry,
      size: parseInt(profile.size as string),
      description: profile.description,
      goals: profile.goals,
      onboarding_completed: profile.onboardingCompleted
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createDepartment(department: Omit<Department, 'id' | 'createdAt'>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No user found')

  const { data, error } = await supabase
    .from('departments')
    .insert({
      user_id: user.id,
      name: department.name,
      type: department.type,
      description: department.description,
      icon: department.icon,
      task_count: department.taskCount,
      status: department.status
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Rest of the database functions remain the same