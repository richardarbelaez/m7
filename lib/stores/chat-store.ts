"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChatMessage } from '@/lib/types/chat'

interface ChatState {
  histories: Record<string, ChatMessage[]>
  addMessage: (departmentId: string, message: ChatMessage) => void
  getHistory: (departmentId: string) => ChatMessage[]
  clearHistory: (departmentId: string) => void
  clearAllHistories: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      histories: {},

      addMessage: (departmentId, message) => {
        set((state) => ({
          histories: {
            ...state.histories,
            [departmentId]: [
              ...(state.histories[departmentId] || []),
              message
            ]
          }
        }))
      },

      getHistory: (departmentId) => {
        return get().histories[departmentId] || []
      },

      clearHistory: (departmentId) => {
        set((state) => {
          const { [departmentId]: _, ...rest } = state.histories
          return { histories: rest }
        })
      },

      clearAllHistories: () => {
        set({ histories: {} })
      }
    }),
    {
      name: 'chat-histories'
    }
  )
)