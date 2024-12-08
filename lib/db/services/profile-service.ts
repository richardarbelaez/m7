"use client"

import { nanoid } from 'nanoid'
import { getDB } from '../indexed-db'

export interface BusinessProfile {
  id: string
  userId: string
  companyName: string
  industry: string
  size: number
  description: string
  goals: string
  onboardingCompleted: boolean
  createdAt: string
}

export const profileService = {
  async createProfile(profile: Omit<BusinessProfile, 'id' | 'createdAt'>) {
    const db = await getDB()
    const id = nanoid()
    const newProfile = {
      ...profile,
      id,
      createdAt: new Date().toISOString()
    }
    
    await db.add('profiles', newProfile)
    return newProfile
  },

  async getProfile(userId: string) {
    const db = await getDB()
    return await db.get('profiles', userId)
  },

  async updateProfile(id: string, updates: Partial<BusinessProfile>) {
    const db = await getDB()
    const profile = await db.get('profiles', id)
    if (!profile) return null

    const updatedProfile = {
      ...profile,
      ...updates
    }
    
    await db.put('profiles', updatedProfile)
    return updatedProfile
  }
}