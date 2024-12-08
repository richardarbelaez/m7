"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Headphones, Calculator, Users, Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useDepartmentStore } from "@/lib/stores/department-store"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { defaultAgents } from "@/lib/types/agent"

const iconMap = {
  'BarChart3': BarChart3,
  'Headphones': Headphones,
  'Calculator': Calculator,
  'Users': Users,
}

interface DepartmentCardProps {
  id: string
  title: string
  description: string
  icon: keyof typeof iconMap
  taskCount?: number
  onClick: () => void
  type: 'sales' | 'customer-service' | 'finance' | 'operations'
}

export function DepartmentCard({ 
  id,
  title,
  description,
  icon,
  taskCount = 0,
  onClick,
  type
}: DepartmentCardProps) {
  const Icon = iconMap[icon]
  const { removeDepartment } = useDepartmentStore()
  const { toast } = useToast()
  const agent = defaultAgents[type]

  const handleRemove = async () => {
    try {
      await removeDepartment(id)
      toast({
        title: "Department Removed",
        description: "The department has been removed successfully."
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove department",
        variant: "destructive"
      })
    }
  }

  return (
    <Card 
      className="group relative transition-all hover:border-primary/50"
    >
      <CardContent className="p-6" onClick={onClick}>
        <div className="flex items-start space-x-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <Avatar className="w-12 h-12 border-2 border-background">
              <AvatarImage src={agent.avatarUrl} alt={agent.name} />
              <AvatarFallback>{agent.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
            {taskCount > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                {taskCount} active tasks
              </p>
            )}
          </div>
        </div>
      </CardContent>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Department</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this department? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}