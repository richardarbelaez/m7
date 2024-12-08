"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Headphones, Calculator, Users, Check, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useDepartmentStore } from "@/lib/stores/department-store"

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

export function DepartmentWizard() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { 
    addDepartments, 
    selectedDepartments, 
    setSelectedDepartments,
    hasDuplicateDepartment,
    clearSelectedDepartments 
  } = useDepartmentStore()

  const toggleDepartment = (id: string) => {
    const department = departments.find(d => d.id === id)
    if (!department) return

    // Check if this type is already selected
    if (hasDuplicateDepartment(department.type)) {
      toast({
        title: "Department already exists",
        description: "You already have this type of department.",
        variant: "destructive"
      })
      return
    }

    setSelectedDepartments(
      selectedDepartments.includes(id)
        ? selectedDepartments.filter(dep => dep !== id)
        : [...selectedDepartments, id]
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
        .map(dept => ({
          ...dept,
          status: 'active' as const,
          userId: '2' // Using default user ID for development
        }))
      
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Choose Your AI Departments</h1>
        <p className="text-muted-foreground mb-4">
          Select the departments you want to power with AI
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {departments.map((department) => {
          const Icon = department.icon === 'BarChart3' ? BarChart3 :
                      department.icon === 'Headphones' ? Headphones :
                      department.icon === 'Calculator' ? Calculator : Users
          
          const isSelected = selectedDepartments.includes(department.id)
          const isDisabled = !isSelected && hasDuplicateDepartment(department.type)
          
          return (
            <Card
              key={department.id}
              className={`cursor-pointer transition-all hover:border-primary/50 ${
                isSelected ? "border-primary ring-2 ring-primary ring-offset-2" : ""
              } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => !isDisabled && toggleDepartment(department.id)}
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
                      <h3 className="font-semibold">{department.name}</h3>
                      {isSelected && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {department.description}
                    </p>
                    {isDisabled && (
                      <p className="text-sm text-red-500 mt-2">
                        Already added to your departments
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={selectedDepartments.length === 0 || isSubmitting}
          className="min-w-[200px]"
        >
          {isSubmitting ? "Creating..." : "Continue to Dashboard"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}