"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for solopreneurs just getting started",
    features: [
      "2 AI Departments",
      "Basic automation workflows",
      "Email support",
      "5 team members",
      "1,000 AI interactions/month"
    ]
  },
  {
    name: "Professional",
    price: "$99",
    description: "Ideal for growing businesses",
    features: [
      "4 AI Departments",
      "Advanced automation workflows",
      "Priority support",
      "15 team members",
      "5,000 AI interactions/month",
      "Custom integrations",
      "Analytics dashboard"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with custom needs",
    features: [
      "Unlimited AI Departments",
      "Custom workflow development",
      "24/7 dedicated support",
      "Unlimited team members",
      "Unlimited AI interactions",
      "Custom AI model training",
      "Advanced analytics & reporting",
      "SLA guarantees"
    ]
  }
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the perfect plan for your business needs
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative ${
                plan.popular ? "border-primary shadow-lg scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="space-y-2">
                <div className="text-2xl font-bold">{plan.name}</div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  asChild
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link href="/signup">
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}