import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/types/database'

type Communication = Database['public']['Tables']['communications']['Row']
type CommunicationInsert = Database['public']['Tables']['communications']['Insert']

export async function createCommunication(communication: CommunicationInsert) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('communications')
    .insert(communication)
    .select()
    .single()

  return { data: data as Communication | null, error }
}

export async function getCommunications(departmentId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('communications')
    .select(`
      *,
      sender:sender_id(email),
      recipient:recipient_id(email)
    `)
    .eq('department_id', departmentId)
    .order('created_at', { ascending: false })

  return { 
    data: data as (Communication & { 
      sender: { email: string } | null
      recipient: { email: string } | null 
    })[] | null, 
    error 
  }
}