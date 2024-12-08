"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { TaskFilter, TaskPriority, TaskStatus } from "@/lib/types/task"
import { Calendar as CalendarIcon, X, Filter } from "lucide-react"
import { format } from "date-fns"

interface TaskSearchProps {
  onFilterChange: (filter: TaskFilter) => void
}

export function TaskSearch({ onFilterChange }: TaskSearchProps) {
  const [search, setSearch] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus[]>([])
  const [selectedPriorities, setSelectedPriorities] = useState<TaskPriority[]>([])
  const [dateRange, setDateRange] = useState<{ start: string; end: string } | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    updateFilters({ search: value })
  }

  const handleStatusChange = (status: TaskStatus) => {
    const updated = selectedStatus.includes(status)
      ? selectedStatus.filter(s => s !== status)
      : [...selectedStatus, status]
    setSelectedStatus(updated)
    updateFilters({ status: updated })
  }

  const handlePriorityChange = (priority: TaskPriority) => {
    const updated = selectedPriorities.includes(priority)
      ? selectedPriorities.filter(p => p !== priority)
      : [...selectedPriorities, priority]
    setSelectedPriorities(updated)
    updateFilters({ priority: updated })
  }

  const handleDateSelect = (date: Date | null) => {
    if (!date) return
    setDateRange(prev => {
      if (!prev || !prev.start) {
        return { start: date.toISOString(), end: date.toISOString() }
      }
      const newRange = { 
        start: prev.start,
        end: date.toISOString()
      }
      updateFilters({ dateRange: newRange })
      return newRange
    })
  }

  const updateFilters = (updates: Partial<TaskFilter>) => {
    onFilterChange({
      search,
      status: selectedStatus,
      priority: selectedPriorities,
      dateRange: dateRange || undefined,
      ...updates
    })
  }

  const clearFilters = () => {
    setSearch("")
    setSelectedStatus([])
    setSelectedPriorities([])
    setDateRange(null)
    onFilterChange({})
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {(selectedStatus.length > 0 || selectedPriorities.length > 0 || dateRange) && (
            <Badge variant="secondary" className="ml-2">
              {selectedStatus.length + selectedPriorities.length + (dateRange ? 1 : 0)}
            </Badge>
          )}
        </Button>
        {(selectedStatus.length > 0 || selectedPriorities.length > 0 || dateRange) && (
          <Button variant="ghost" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="grid gap-4 p-4 border rounded-lg">
          <div className="space-y-2">
            <h4 className="font-medium">Status</h4>
            <div className="flex gap-2">
              {(['pending', 'in-progress', 'completed'] as TaskStatus[]).map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus.includes(status) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusChange(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Priority</h4>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as TaskPriority[]).map((priority) => (
                <Button
                  key={priority}
                  variant={selectedPriorities.includes(priority) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePriorityChange(priority)}
                >
                  {priority}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Date Range</h4>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange ? (
                      <>
                        {format(new Date(dateRange.start), "PPP")} -{" "}
                        {format(new Date(dateRange.end), "PPP")}
                      </>
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={{
                      from: dateRange ? new Date(dateRange.start) : undefined,
                      to: dateRange ? new Date(dateRange.end) : undefined,
                    }}
                    onSelect={(range) => {
                      if (range?.from) handleDateSelect(range.from)
                      if (range?.to) handleDateSelect(range.to)
                    }}
                  />
                </PopoverContent>
              </Popover>
              {dateRange && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setDateRange(null)
                    updateFilters({ dateRange: undefined })
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}