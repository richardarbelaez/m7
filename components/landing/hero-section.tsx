import { Button } from "@/components/ui/button"
import { Brain, Rocket, Shield } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Your AI-Powered Business Departments
          </h1>
          <p className="text-lg leading-8 text-muted-foreground mb-8">
            Transform your solo business with virtual AI departments. Get the power of a full company while maintaining the agility of a solopreneur.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#demo">Watch Demo</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pb-24">
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
          <Brain className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Intelligent Automation</h3>
          <p className="text-muted-foreground">AI-powered departments that learn and adapt to your business needs</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
          <Shield className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
          <p className="text-muted-foreground">Enterprise-grade security with 24/7 monitoring and backup</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
          <Rocket className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Scale Fast</h3>
          <p className="text-muted-foreground">Grow your business without the overhead of traditional hiring</p>
        </div>
      </div>
    </div>
  )
}