export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string | null
          company_name: string | null
          onboarding_completed: boolean
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          full_name?: string | null
          company_name?: string | null
          onboarding_completed?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string | null
          company_name?: string | null
          onboarding_completed?: boolean
        }
      }
      departments: {
        Row: {
          id: string
          created_at: string
          user_id: string
          type: 'sales' | 'customer-service' | 'finance' | 'operations'
          name: string
          settings: Json
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          type: 'sales' | 'customer-service' | 'finance' | 'operations'
          name: string
          settings?: Json
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          type?: 'sales' | 'customer-service' | 'finance' | 'operations'
          name?: string
          settings?: Json
          is_active?: boolean
        }
      }
      tasks: {
        Row: {
          id: string
          created_at: string
          department_id: string
          title: string
          description: string | null
          status: 'pending' | 'in-progress' | 'completed'
          due_date: string | null
          priority: 'low' | 'medium' | 'high' | null
          assigned_to: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          department_id: string
          title: string
          description?: string | null
          status: 'pending' | 'in-progress' | 'completed'
          due_date?: string | null
          priority?: 'low' | 'medium' | 'high' | null
          assigned_to?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          department_id?: string
          title?: string
          description?: string | null
          status?: 'pending' | 'in-progress' | 'completed'
          due_date?: string | null
          priority?: 'low' | 'medium' | 'high' | null
          assigned_to?: string | null
        }
      }
      communications: {
        Row: {
          id: string
          created_at: string
          department_id: string
          message: string
          message_type: 'internal' | 'external'
          sender_id: string | null
          recipient_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          department_id: string
          message: string
          message_type: 'internal' | 'external'
          sender_id?: string | null
          recipient_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          department_id?: string
          message?: string
          message_type?: 'internal' | 'external'
          sender_id?: string | null
          recipient_id?: string | null
        }
      }
    }
  }
}