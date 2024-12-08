"use client"

import { useAuth } from "@/contexts/auth-context"
import { redirect } from "next/navigation"

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}