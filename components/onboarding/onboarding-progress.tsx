"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useProfileStore } from "@/lib/stores/profile-store"
import { useDepartmentStore } from "@/lib/stores/department-store"
import { useAuth } from "@/contexts/auth-context"

export function useOnboardingProgress() {
  const router = useRouter()
  const { user } = useAuth()
  const { profile, loadProfile } = useProfileStore()
  const { departments, loadDepartments } = useDepartmentStore()

  useEffect(() => {
    if (user) {
      loadProfile(user.id)
      loadDepartments()
    }
  }, [user, loadProfile, loadDepartments])

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else if (!profile) {
      router.push('/onboarding/business-profile')
    } else if (!profile.onboardingCompleted) {
      if (departments.length === 0) {
        router.push('/onboarding/departments')
      } else {
        router.push('/dashboard')
      }
    }
  }, [user, profile, departments.length, router])

  return { profile, isComplete: profile?.onboardingCompleted }
}