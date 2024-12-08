"use client"

import { useState } from 'react'
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { TaskCard } from './task-card'
import { Task } from '@/lib/types/task'
import { useTaskStore } from '@/lib/stores/task-store'

interface DraggableTaskListProps {
  tasks: Task[]
  status: Task['status']
}

export function DraggableTaskList({ tasks, status }: DraggableTaskListProps) {
  const [items, setItems] = useState(tasks)
  const updateTask = useTaskStore((state) => state.updateTask)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const newItems = arrayMove(items, oldIndex, newIndex)
        
        // Update task priorities based on new order
        newItems.forEach((task, index) => {
          updateTask(task.id, {
            priority: index === 0 ? 'high' : index === items.length - 1 ? 'low' : 'medium'
          })
        })

        return newItems
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map(item => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {items.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}