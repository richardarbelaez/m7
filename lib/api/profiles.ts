import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']
type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export async function getProfile(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', userId)
    .single()

  return { data: data as Profile | null, error }
}

export async function updateProfile(userId: string, updates: ProfileUpdate) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  return { data: data as Profile | null, error }
}