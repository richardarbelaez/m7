"use client"

export interface AIResponse {
  content: string
  tone: 'professional' | 'friendly' | 'technical' | 'empathetic'
  nextActions: string[]
  requiresEscalation: boolean
  relatedDepartments: string[]
}