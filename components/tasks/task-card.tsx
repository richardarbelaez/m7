"use client"

import { format } from "date-fns"
import { Task } from "@/lib/types/task"
import { useTaskStore } from "@/lib/stores/task-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

interface TaskCardProps {
  task: Task
}

const priorityColors = {
  low: "bg-green-500/10 text-green-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  high: "bg-red-500/10 text-red-500"
}

export function TaskCard({ task }: TaskCardProps) {
  const updateTask = useTaskStore((state) => state.updateTask)

  const handleStatusChange = () => {
    const nextStatus = task.status === 'pending' 
      ? 'in-progress' 
      : task.status === 'in-progress' 
        ? 'completed' 
        : 'pending'
    
    updateTask(task.id, { status: nextStatus })
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h4 className="font-semibold">{task.title}</h4>
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            {task.description}
          </p>

          {task.dueDate && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Due {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleStatusChange}
            >
              {task.status === 'pending' ? 'Start' : 
               task.status === 'in-progress' ? 'Complete' : 
               'Restart'}
            </Button>

            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {format(new Date(task.createdAt), 'MMM d')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}