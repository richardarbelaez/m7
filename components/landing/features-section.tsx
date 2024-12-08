import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, Headphones, Calculator } from "lucide-react"

const features = [
  {
    title: "Sales & Marketing",
    description: "AI-driven campaign management, lead generation, and market analysis",
    icon: BarChart3
  },
  {
    title: "Customer Service",
    description: "24/7 customer support, ticket management, and satisfaction tracking",
    icon: Headphones
  },
  {
    title: "Admin & Finance",
    description: "Automated bookkeeping, invoice processing, and financial reporting",
    icon: Calculator
  },
  {
    title: "Project Management",
    description: "Task automation, resource allocation, and progress tracking",
    icon: Users
  }
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Virtual Departments at Your Fingertips
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the departments you need and let AI handle the rest
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <feature.icon className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Feature details will be added here */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}