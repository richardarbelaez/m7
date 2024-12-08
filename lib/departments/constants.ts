export const DEPARTMENT_TYPES = {
  SALES: 'sales',
  CUSTOMER_SERVICE: 'customer-service',
  FINANCE: 'finance',
  OPERATIONS: 'operations'
} as const

export const DEPARTMENT_STATUS = {
  ACTIVE: 'active',
  ARCHIVED: 'archived'
} as const

export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const

export const DEPARTMENT_TYPE_LABELS = {
  [DEPARTMENT_TYPES.SALES]: 'Sales & Marketing',
  [DEPARTMENT_TYPES.CUSTOMER_SERVICE]: 'Customer Service',
  [DEPARTMENT_TYPES.FINANCE]: 'Finance & Admin',
  [DEPARTMENT_TYPES.OPERATIONS]: 'Operations'
} as const