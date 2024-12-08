import { AuthForm } from "@/components/auth/auth-form"
import { AuthHeader } from "@/components/auth/auth-header"

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirect?: string }
}) {
  return (
    <div className="min-h-screen bg-muted/50">
      <AuthHeader mode="login" />
      <div className="container flex items-center justify-center py-20">
        <AuthForm mode="login" redirectPath={searchParams.redirect} />
      </div>
    </div>
  )
}