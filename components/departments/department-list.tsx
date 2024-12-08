"use client"

import { useDepartmentStore } from "@/lib/stores/department-store"
import { DepartmentCard } from "./department-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function DepartmentList() {
  const { departments } = useDepartmentStore()
  const router = useRouter()

  const activeDepartments = departments.filter(dept => dept.status === 'active')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Departments</h2>
        <Button onClick={() => router.push('/setup')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Department
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeDepartments.map((department) => (
          <DepartmentCard
            key={department.id}
            id={department.id}
            title={department.name}
            description={department.description}
            icon={department.icon as any}
            taskCount={department.taskCount}
            type={department.type}
            onClick={() => router.push(`/dashboard/departments/${department.id}`)}
          />
        ))}
        
        {activeDepartments.length === 0 && (
          <div className="col-span-full text-center py-12 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">No departments found</h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first AI department
            </p>
            <Button onClick={() => router.push('/setup')}>
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}