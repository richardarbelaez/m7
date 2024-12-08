"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Brain } from "lucide-react"

interface NavigationProps {
  mode: "public" | "dashboard"
}

export function Navigation({ mode }: NavigationProps) {
  const pathname = usePathname()

  const publicLinks = [
    { href: "/#features", label: "Features" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#faq", label: "FAQ" }
  ]

  const dashboardLinks = [
    { href: "/dashboard", label: "Main Room" },
    { href: "/ai-teams", label: "AI Teams" },
    { href: "/dashboard/reports", label: "Reports" }
  ]

  const links = mode === "public" ? publicLinks : dashboardLinks

  return (
    <div className="flex items-center space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <Brain className="h-6 w-6" />
        <span className="text-xl font-bold">mycompAIny</span>
      </Link>

      <nav className="hidden md:flex items-center space-x-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "text-muted-foreground hover:text-foreground transition-colors",
              pathname === href && "text-foreground"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  )
}