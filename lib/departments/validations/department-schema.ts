import * as z from "zod"
import { DEPARTMENT_TYPES } from "../constants"

export const createDepartmentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  type: z.enum([
    DEPARTMENT_TYPES.SALES,
    DEPARTMENT_TYPES.CUSTOMER_SERVICE,
    DEPARTMENT_TYPES.FINANCE,
    DEPARTMENT_TYPES.OPERATIONS
  ]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  settings: z.object({
    notifications: z.boolean().default(true),
    autoAssignment: z.boolean().default(false),
    priorityLevels: z.array(z.string()).default(['low', 'medium', 'high']),
    customFields: z.record(z.string()).default({})
  }).optional()
})

export type CreateDepartmentSchema = z.infer<typeof createDepartmentSchema>