"use client"

import { Button } from "@/components/ui/button"
import { Mic, MicOff, Video, VideoOff } from "lucide-react"

interface MeetingControlsProps {
  isJoined: boolean
  isMuted: boolean
  isVideoOff: boolean
  onToggleMute: () => void
  onToggleVideo: () => void
  onToggleJoin: () => void
  selectedCount: number
}

export function MeetingControls({
  isJoined,
  isMuted,
  isVideoOff,
  onToggleMute,
  onToggleVideo,
  onToggleJoin,
  selectedCount
}: MeetingControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleMute}
        disabled={!isJoined}
        className={isMuted ? "bg-destructive/10 hover:bg-destructive/20" : ""}
      >
        {isMuted ? (
          <MicOff className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleVideo}
        disabled={!isJoined}
        className={isVideoOff ? "bg-destructive/10 hover:bg-destructive/20" : ""}
      >
        {isVideoOff ? (
          <VideoOff className="h-4 w-4" />
        ) : (
          <Video className="h-4 w-4" />
        )}
      </Button>

      <Button
        variant={isJoined ? "destructive" : "default"}
        onClick={onToggleJoin}
        disabled={selectedCount === 0}
      >
        {isJoined ? "Leave Meeting" : "Join Meeting"}
      </Button>
    </div>
  )
}