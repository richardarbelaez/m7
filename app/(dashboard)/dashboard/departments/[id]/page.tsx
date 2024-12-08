"use client"

import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { TaskList } from "@/components/tasks/task-list"
import { TaskMetrics } from "@/components/tasks/task-metrics"
import { TaskSuggestions } from "@/components/tasks/task-suggestions"
import { DepartmentChat } from "@/components/chat/department-chat"
import { useDepartmentStore } from "@/lib/stores/department-store"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DepartmentPage() {
  const params = useParams()
  const router = useRouter()
  const department = useDepartmentStore((state) => state.getDepartment(params.id as string))

  if (!department) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container py-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {/* Chat section at the top */}
          <div className="w-full max-w-3xl mx-auto">
            <DepartmentChat department={department} />
          </div>

          {/* Main content below */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TaskMetrics departmentId={department.id} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TaskSuggestions department={department} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TaskList departmentId={department.id} />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}