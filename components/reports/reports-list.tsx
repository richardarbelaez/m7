"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const reports = [
  {
    id: 1,
    title: "Monthly Performance Report",
    description: "Comprehensive analysis of all departments",
    date: "March 2024",
    type: "Monthly"
  },
  {
    id: 2,
    title: "Sales Department Deep Dive",
    description: "Detailed sales metrics and predictions",
    date: "March 2024",
    type: "Department"
  },
  {
    id: 3,
    title: "Customer Service Analysis",
    description: "Support tickets and satisfaction metrics",
    date: "March 2024",
    type: "Department"
  }
]

export function ReportsList() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Available Reports</h2>
      <div className="grid gap-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{report.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {report.description}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{report.date}</span>
                <span>{report.type}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}</bortAction>

<boltAction type="start">
<command>npm run dev</command>