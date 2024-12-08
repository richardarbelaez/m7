"use client"

import { useState } from "react"
import { Task } from "@/lib/types/task"
import { useTaskStore } from "@/lib/stores/task-store"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Link2, X } from "lucide-react"

interface TaskDependenciesProps {
  task: Task
  departmentId: string
}

export function TaskDependencies({ task, departmentId }: TaskDependenciesProps) {
  const [isAdding, setIsAdding] = useState(false)
  const tasks = useTaskStore((state) => 
    state.getTasksByDepartment(departmentId)
      .filter(t => t.id !== task.id && !task.dependencies.includes(t.id))
  )
  const updateTask = useTaskStore((state) => state.updateTask)

  const handleAddDependency = (dependencyId: string) => {
    updateTask(task.id, {
      dependencies: [...task.dependencies, dependencyId]
    })
    setIsAdding(false)
  }

  const handleRemoveDependency = (dependencyId: string) => {
    updateTask(task.id, {
      dependencies: task.dependencies.filter(id => id !== dependencyId)
    })
  }

  const dependencyTasks = useTaskStore((state) => 
    task.dependencies.map(id => state.tasks.find(t => t.id === id)).filter(Boolean) as Task[]
  )

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Dependencies</h4>
        {!isAdding && (
          <Button variant="ghost" size="sm" onClick={() => setIsAdding(true)}>
            <Link2 className="h-4 w-4 mr-2" />
            Add Dependency
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="flex gap-2">
          <Select onValueChange={handleAddDependency}>
            <SelectTrigger>
              <SelectValue placeholder="Select a task" />
            </SelectTrigger>
            <SelectContent>
              {tasks.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" onClick={() => setIsAdding(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {dependencyTasks.length > 0 ? (
        <div className="space-y-2">
          {dependencyTasks.map((dep) => (
            <div key={dep.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
              <span className="text-sm">{dep.title}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveDependency(dep.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No dependencies</p>
      )}
    </div>
  )
}