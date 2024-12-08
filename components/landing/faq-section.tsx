"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is mycompAIny?",
    answer: "mycompAIny is an AI-powered platform that creates virtual departments for your business. Each department is managed by specialized AI agents that help automate and optimize your business operations."
  },
  {
    question: "How do AI departments work?",
    answer: "Each AI department consists of intelligent agents trained in specific business functions. They can handle tasks, provide insights, and collaborate with other departments to streamline your operations."
  },
  {
    question: "Can I customize the AI departments?",
    answer: "Yes! You can customize each department's focus, workflows, and automation rules. The AI agents learn from your preferences and adapt to your business needs over time."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We implement enterprise-grade security measures, including end-to-end encryption, regular security audits, and strict data access controls to protect your business information."
  },
  {
    question: "Do I need technical expertise?",
    answer: "No technical expertise is required. Our platform is designed to be user-friendly and intuitive. We provide comprehensive onboarding and support to help you get started."
  },
  {
    question: "Can I integrate with other tools?",
    answer: "Yes, we offer integrations with popular business tools and can build custom integrations for Enterprise plans. Our API also allows for seamless connection with your existing systems."
  }
]

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-muted/50">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about mycompAIny
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}