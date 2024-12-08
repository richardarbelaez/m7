"use client"

import { useState } from "react"
import { Task } from "@/lib/types/task"
import { useTaskStore } from "@/lib/stores/task-store"
import { TaskCard } from "./task-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TaskForm } from "./task-form"

interface TaskListProps {
  departmentId: string
}

export function TaskList({ departmentId }: TaskListProps) {
  const [open, setOpen] = useState(false)
  const tasks = useTaskStore((state) => state.getTasksByDepartment(departmentId))

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = []
    }
    acc[task.status].push(task)
    return acc
  }, {} as Record<Task['status'], Task[]>)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <TaskForm 
              departmentId={departmentId} 
              onSuccess={() => setOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['pending', 'in-progress', 'completed'] as const).map((status) => (
          <div key={status} className="space-y-4">
            <h3 className="font-semibold capitalize flex items-center justify-between">
              <span>{status.replace('-', ' ')}</span>
              <span className="text-sm text-muted-foreground">
                {(groupedTasks[status] || []).length}
              </span>
            </h3>
            <div className="space-y-4">
              {(groupedTasks[status] || []).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {(!groupedTasks[status] || groupedTasks[status].length === 0) && (
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">No tasks</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}