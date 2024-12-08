"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { BarChart3, Headphones, Calculator, Users, Check } from "lucide-react"
import { useDepartmentStore } from "@/lib/stores/department-store"
import { defaultAgents } from "@/lib/types/agent"

const departments = [
  {
    id: "sales",
    name: "Sales & Marketing",
    description: "AI-driven campaign management and lead generation",
    icon: "BarChart3",
    type: "sales" as const,
    taskCount: 0
  },
  {
    id: "customer-service",
    name: "Customer Service",
    description: "24/7 customer support and ticket management",
    icon: "Headphones",
    type: "customer-service" as const,
    taskCount: 0
  },
  {
    id: "finance",
    name: "Finance & Admin",
    description: "Automated bookkeeping and financial reporting",
    icon: "Calculator",
    type: "finance" as const,
    taskCount: 0
  },
  {
    id: "operations",
    name: "Project Management",
    description: "Task automation and progress tracking",
    icon: "Users",
    type: "operations" as const,
    taskCount: 0
  }
]

const iconMap = {
  'BarChart3': BarChart3,
  'Headphones': Headphones,
  'Calculator': Calculator,
  'Users': Users,
}

interface DepartmentSelectionProps {
  mode?: 'setup' | 'add'
}

export function DepartmentSelection({ mode = 'setup' }: DepartmentSelectionProps) {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { addDepartments, departments: existingDepartments } = useDepartmentStore()

  const handleToggleDepartment = (id: string) => {
    setSelectedDepartments(prev =>
      prev.includes(id)
        ? prev.filter(dep => dep !== id)
        : [...prev, id]
    )
  }

  const handleContinue = async () => {
    if (selectedDepartments.length === 0) {
      toast({
        title: "Please select departments",
        description: "You need to select at least one department to continue.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    try {
      const selectedDepts = departments
        .filter(dept => selectedDepartments.includes(dept.id))
        .filter(dept => !existingDepartments.some(
          existing => existing.type === dept.type && existing.status === 'active'
        ))
        .map(dept => ({
          ...dept,
          status: 'active' as const,
          userId: '2'
        }))
      
      if (selectedDepts.length === 0) {
        toast({
          title: "Departments already exist",
          description: "The selected departments are already active.",
          variant: "destructive"
        })
        return
      }
      
      await addDepartments(selectedDepts)
      
      toast({
        title: "Departments Created",
        description: `${selectedDepts.length} department${selectedDepts.length > 1 ? 's' : ''} added successfully.`
      })
      
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create departments",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableDepartments = departments.filter(dept => 
    mode === 'setup' || !existingDepartments.some(
      existing => existing.type === dept.type && existing.status === 'active'
    )
  )

  if (availableDepartments.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">All Departments Active</h2>
        <p className="text-muted-foreground mb-4">
          You have already activated all available departments.
        </p>
        <Button onClick={() => router.push('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableDepartments.map((department) => {
          const Icon = iconMap[department.icon as keyof typeof iconMap]
          const isSelected = selectedDepartments.includes(department.id)
          const agent = defaultAgents[department.type]
          
          return (
            <Card
              key={department.id}
              className={`cursor-pointer transition-all hover:border-primary/50 ${
                isSelected ? "border-primary ring-2 ring-primary ring-offset-2" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? "bg-primary/10" : "bg-muted"
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      isSelected ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{department.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Managed by {agent.name}
                        </p>
                      </div>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleToggleDepartment(department.id)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {department.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => router.push('/dashboard')}>
          Cancel
        </Button>
        <Button 
          onClick={handleContinue}
          disabled={selectedDepartments.length === 0 || isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Add Selected Departments"}
        </Button>
      </div>
    </div>
  )
}