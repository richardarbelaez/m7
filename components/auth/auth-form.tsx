"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/auth/auth-service"

export function AuthForm({ 
  mode = "signup",
  redirectPath
}: { 
  mode?: "login" | "signup"
  redirectPath?: string 
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const user = await authService.login(email, password)
      
      if (user) {
        toast({
          title: mode === "signup" ? "Account created!" : "Welcome back!",
          description: "You have been successfully authenticated.",
        })
        router.push(redirectPath || '/dashboard')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{mode === "signup" ? "Create an Account" : "Welcome Back"}</CardTitle>
        <CardDescription>
          {mode === "signup" 
            ? "Get started with your AI-powered business departments"
            : "Sign in to access your AI departments"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : mode === "signup" ? "Sign Up" : "Sign In"}
          </Button>
          
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button 
            variant="outline" 
            type="button"
            className="w-full"
            onClick={handleSubmit}
          >
            <Mail className="mr-2 h-4 w-4" />
            Continue as Demo User
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}