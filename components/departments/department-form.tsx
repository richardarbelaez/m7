"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createDepartmentSchema, type CreateDepartmentSchema } from "@/lib/departments/validations/department-schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DEPARTMENT_TYPES, DEPARTMENT_TYPE_LABELS } from "@/lib/departments/constants"
import { useDepartmentActions } from "@/lib/departments/actions/department-actions"
import { useRouter } from "next/navigation"

export function DepartmentForm() {
  const [loading, setLoading] = useState(false)
  const { createDepartment } = useDepartmentActions()
  const router = useRouter()
  
  const form = useForm<CreateDepartmentSchema>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      name: "",
      type: DEPARTMENT_TYPES.SALES,
      description: "",
    }
  })

  const onSubmit = async (data: CreateDepartmentSchema) => {
    try {
      setLoading(true)
      await createDepartment(data)
      router.push("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Sales & Marketing" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(DEPARTMENT_TYPES).map(([key, value]) => (
                    <SelectItem key={value} value={value}>
                      {DEPARTMENT_TYPE_LABELS[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the department's purpose and goals..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Department"}
        </Button>
      </form>
    </Form>
  )
}