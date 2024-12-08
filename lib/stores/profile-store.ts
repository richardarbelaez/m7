"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'

export interface BusinessProfile {
  id: string
  userId: string
  companyName: string
  industry: string
  size: string
  description: string
  goals: string
  onboardingCompleted: boolean
  createdAt: string
}

interface ProfileState {
  profile: BusinessProfile | null
  setProfile: (profile: BusinessProfile) => void
  updateProfile: (updates: Partial<BusinessProfile>) => void
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,

      setProfile: (profile) => {
        set({ profile })
      },

      updateProfile: (updates) => {
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, ...updates }
            : null
        }))
      },
    }),
    {
      name: 'profile-store',
    }
  )
)