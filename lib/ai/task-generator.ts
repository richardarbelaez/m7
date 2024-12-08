import { Department } from "@/lib/stores/department-store"
import { TaskSuggestion } from "@/lib/types/ai-task"

export class TaskGenerator {
  private generateSalesTaskSuggestions(): TaskSuggestion[] {
    return [
      {
        title: "Set up lead scoring system",
        description: "Implement automated lead scoring based on prospect behavior and characteristics",
        priority: "high",
        estimatedDuration: "1 week",
        dependencies: ["CRM Integration"],
        automationPotential: {
          score: 0.9,
          suggestions: [
            "Use ML for behavior analysis",
            "Automate lead assignment",
            "Set up email triggers"
          ]
        }
      },
      {
        title: "Create sales funnel automation",
        description: "Automate key stages of the sales funnel with triggered actions",
        priority: "high",
        estimatedDuration: "2 weeks",
        dependencies: ["Lead Scoring System"],
        automationPotential: {
          score: 0.85,
          suggestions: [
            "Implement stage triggers",
            "Set up follow-up sequences",
            "Create conversion tracking"
          ]
        }
      }
    ]
  }

  private generateCustomerServiceTaskSuggestions(): TaskSuggestion[] {
    return [
      {
        title: "Implement AI chatbot",
        description: "Deploy an AI-powered chatbot for initial customer inquiries",
        priority: "high",
        estimatedDuration: "2 weeks",
        dependencies: ["Knowledge Base"],
        automationPotential: {
          score: 0.95,
          suggestions: [
            "Train NLP model",
            "Set up intent recognition",
            "Implement handoff logic"
          ]
        }
      },
      {
        title: "Create ticket categorization system",
        description: "Implement automated ticket categorization and routing",
        priority: "medium",
        estimatedDuration: "1 week",
        dependencies: ["Support System Integration"],
        automationPotential: {
          score: 0.8,
          suggestions: [
            "Implement ML categorization",
            "Set up priority scoring",
            "Create routing rules"
          ]
        }
      }
    ]
  }

  public generateTaskSuggestions(department: Department): TaskSuggestion[] {
    switch (department.type) {
      case 'sales':
        return this.generateSalesTaskSuggestions()
      case 'customer-service':
        return this.generateCustomerServiceTaskSuggestions()
      default:
        return []
    }
  }

  public async generateWorkflowSteps(task: TaskSuggestion) {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      steps: [
        {
          order: 1,
          title: "Initial Setup",
          description: "Configure basic system parameters",
          automationType: "manual" as const,
          estimatedDuration: "2 hours"
        },
        {
          order: 2,
          title: "Integration",
          description: "Connect with required systems",
          automationType: "semi-automated" as const,
          estimatedDuration: "4 hours"
        },
        {
          order: 3,
          title: "Testing",
          description: "Validate automation workflow",
          automationType: "semi-automated" as const,
          estimatedDuration: "3 hours"
        }
      ],
      estimatedCompletion: "2 days",
      requiredResources: ["API Access", "Development Environment"]
    }
  }
}

export const taskGenerator = new TaskGenerator()