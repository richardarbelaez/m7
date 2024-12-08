import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AuthHeader({ mode }: { mode: "login" | "signup" }) {
  return (
    <div className="flex justify-end p-4">
      <Button variant="ghost" asChild>
        <Link href={mode === "login" ? "/signup" : "/login"}>
          {mode === "login" ? "Create account" : "Sign in"}
        </Link>
      </Button>
    </div>
  )
}