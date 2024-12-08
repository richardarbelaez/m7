export interface Profile {
  id: string
  created_at: string
  email: string
  full_name: string | null
  company_name: string | null
}

export interface Department {
  id: string
  created_at: string
  user_id: string
  type: 'sales' | 'customer-service' | 'finance' | 'operations'
  name: string
  settings: Record<string, any>
}

export interface Task {
  id: string
  created_at: string
  department_id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  due_date: string | null
}