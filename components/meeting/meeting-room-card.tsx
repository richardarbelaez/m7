"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import { useState } from "react"
import { useDepartmentStore } from "@/lib/stores/department-store"
import { MeetingMemberCard } from "./meeting-member-card"
import { MeetingControls } from "./meeting-controls"
import { MeetingChatRoom } from "./meeting-chat-room"

export function MeetingRoomCard() {
  const [isJoined, setIsJoined] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  
  const { departments } = useDepartmentStore()
  const activeDepartments = departments.filter(dept => dept.status === 'active')
  const selectedDepartments = activeDepartments.filter(dept => selectedMembers.includes(dept.id))

  const toggleMember = (id: string) => {
    setSelectedMembers(prev =>
      prev.includes(id)
        ? prev.filter(memberId => memberId !== id)
        : [...prev, id]
    )
  }

  const handleJoinToggle = () => {
    if (isJoined) {
      setIsJoined(false)
      setIsMuted(false)
      setIsVideoOff(false)
    } else {
      setIsJoined(true)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Meeting Room
            </div>
            {selectedMembers.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {activeDepartments.map((dept) => (
                <MeetingMemberCard
                  key={dept.id}
                  department={dept}
                  isSelected={selectedMembers.includes(dept.id)}
                  onToggle={toggleMember}
                />
              ))}
            </div>

            <MeetingControls
              isJoined={isJoined}
              isMuted={isMuted}
              isVideoOff={isVideoOff}
              onToggleMute={() => setIsMuted(!isMuted)}
              onToggleVideo={() => setIsVideoOff(!isVideoOff)}
              onToggleJoin={handleJoinToggle}
              selectedCount={selectedMembers.length}
            />
          </div>
        </CardContent>
      </Card>

      {isJoined && selectedDepartments.length > 0 && (
        <MeetingChatRoom selectedDepartments={selectedDepartments} />
      )}
    </div>
  )
}