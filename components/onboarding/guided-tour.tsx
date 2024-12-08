"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'

interface TourStep {
  target: string
  title: string
  description: string
  position: 'top' | 'bottom' | 'left' | 'right'
}

const tourSteps: TourStep[] = [
  {
    target: '[data-tour="departments"]',
    title: 'Your AI Departments',
    description: 'Here you can see all your virtual departments and their current status.',
    position: 'bottom'
  },
  {
    target: '[data-tour="chat"]',
    title: 'Department Chat',
    description: 'Communicate with your AI department assistant here.',
    position: 'left'
  },
  {
    target: '[data-tour="tasks"]',
    title: 'Task Management',
    description: 'Create, organize, and track tasks for each department.',
    position: 'top'
  }
]

export function GuidedTour() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour')
    if (hasSeenTour) {
      setIsVisible(false)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    localStorage.setItem('hasSeenTour', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  const step = tourSteps[currentStep]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Card className="w-80 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleComplete}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleComplete}>
                Skip Tour
              </Button>
              <Button onClick={handleNext}>
                {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>

            <div className="flex justify-center gap-1">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${
                    index === currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}