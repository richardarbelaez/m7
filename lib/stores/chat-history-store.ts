"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChatMessage } from '@/lib/types/chat'

interface ChatHistoryState {
  meetingHistories: Record<string, ChatMessage[]>
  getMeetingHistory: (meetingId: string) => ChatMessage[]
  addToMeetingHistory: (meetingId: string, message: ChatMessage) => void
  clearMeetingHistory: (meetingId: string) => void
  clearAllHistories: () => void
}

export const useChatHistoryStore = create<ChatHistoryState>()(
  persist(
    (set, get) => ({
      meetingHistories: {},

      getMeetingHistory: (meetingId) => {
        return get().meetingHistories[meetingId] || []
      },

      addToMeetingHistory: (meetingId, message) => {
        set((state) => ({
          meetingHistories: {
            ...state.meetingHistories,
            [meetingId]: [
              ...(state.meetingHistories[meetingId] || []),
              message
            ]
          }
        }))
      },

      clearMeetingHistory: (meetingId) => {
        set((state) => {
          const { [meetingId]: _, ...rest } = state.meetingHistories
          return { meetingHistories: rest }
        })
      },

      clearAllHistories: () => {
        set({ meetingHistories: {} })
      }
    }),
    {
      name: 'meeting-chat-histories'
    }
  )
)