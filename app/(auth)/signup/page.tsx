"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { AuthHeader } from "@/components/auth/auth-header"
import { useAuthRedirect } from "@/hooks/use-auth-redirect"

export default function SignUpPage() {
  useAuthRedirect()

  return (
    <div className="min-h-screen bg-muted/50">
      <AuthHeader mode="signup" />
      <div className="container flex items-center justify-center py-20">
        <AuthForm mode="signup" />
      </div>
    </div>
  )
}