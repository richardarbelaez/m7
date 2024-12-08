"use client"

import { useRouter } from "next/navigation"
import { DepartmentList } from "@/components/departments/department-list"
import { MeetingRoomCard } from "@/components/meeting/meeting-room-card"
import { Button } from "@/components/ui/button"
import { Plus, RefreshCw } from "lucide-react"

export default function MainRoomPage() {
  const router = useRouter()

  return (
    <div className="container py-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Main Room</h1>
          <p className="text-muted-foreground">
            Your central hub for managing AI departments
          </p>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={() => router.push('/setup/add-department')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Department
          </Button>

          <Button 
            variant="outline"
            onClick={() => router.push('/setup')}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Department Setup
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <MeetingRoomCard />
        <DepartmentList />
      </div>
    </div>
  )
}