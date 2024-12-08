import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export async function getSession() {
  headers() // Required for dynamic rendering
  const supabase = createClient()
  return await supabase.auth.getSession()
}

export async function getUser() {
  const { data: { session } } = await getSession()
  return session?.user ?? null
}