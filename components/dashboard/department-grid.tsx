"use client"

import { useRouter } from "next/navigation"
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Headphones, Calculator, Users, Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const departmentIcons = {
  sales: BarChart3,
  "customer-service": Headphones,
  finance: Calculator,
  operations: Users,
}

export function DepartmentGrid() {
  const router = useRouter()
  const { user } = useAuth()

  // Mock departments data
  const departments = [
    {
      id: "1",
      type: "sales",
      name: "Sales & Marketing",
      description: "Manage campaigns and track leads",
      taskCount: 5,
    },
    {
      id: "2",
      type: "customer-service",
      name: "Customer Support",
      description: "Handle customer inquiries and tickets",
      taskCount: 3,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {departments.map((dept) => {
        const Icon = departmentIcons[dept.type as keyof typeof departmentIcons]
        
        return (
          <Card key={dept.id} className="hover:border-primary transition-colors cursor-pointer"
                onClick={() => router.push(`/dashboard/departments/${dept.id}`)}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{dept.name}</h3>
                  <CardDescription>{dept.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {dept.taskCount} active tasks
                </span>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
      
      <Card className="border-dashed hover:border-primary transition-colors cursor-pointer"
            onClick={() => router.push('/setup')}>
        <CardHeader className="flex flex-col items-center justify-center h-full">
          <Plus className="h-8 w-8 text-muted-foreground mb-2" />
          <h3 className="font-semibold text-muted-foreground">Add Department</h3>
        </CardHeader>
      </Card>
    </div>
  )
}