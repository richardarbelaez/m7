"use client"

import { Department } from '@/lib/stores/department-store'
import stringSimilarity from 'string-similarity'

interface AnalysisResult {
  intent: string
  relevantDepartments: string[]
  priority: 'low' | 'medium' | 'high'
  urgency: boolean
  keywords: string[]
}

export class MessageAnalyzer {
  private departments: Department[]
  private departmentKeywords: Record<string, string[]>

  constructor(departments: Department[]) {
    this.departments = departments
    this.departmentKeywords = {
      sales: ['sales', 'revenue', 'leads', 'marketing', 'customers'],
      'customer-service': ['support', 'help', 'issue', 'complaint', 'feedback'],
      finance: ['budget', 'cost', 'expense', 'payment', 'financial'],
      operations: ['process', 'workflow', 'efficiency', 'resource', 'timeline']
    }
    console.log('[MessageAnalyzer] Initialized with departments:', departments.map(d => d.type))
  }

  public analyze(message: string): AnalysisResult {
    console.log('[MessageAnalyzer] Analyzing message:', message)
    const tokens = message.toLowerCase().split(/\s+/)
    
    const analysis = {
      intent: this.determineIntent(tokens),
      relevantDepartments: this.findRelevantDepartments(tokens),
      priority: this.determinePriority(tokens),
      urgency: this.determineUrgency(tokens),
      keywords: this.extractKeywords(tokens)
    }

    console.log('[MessageAnalyzer] Analysis result:', analysis)
    return analysis
  }

  private determineIntent(tokens: string[]): string {
    console.log('[MessageAnalyzer] Determining intent from tokens:', tokens)
    
    const intentPatterns = {
      question: ['what', 'how', 'why', 'when', 'where', '?'],
      request: ['please', 'can', 'could', 'would'],
      inform: ['fyi', 'update', 'notice', 'inform'],
      urgent: ['urgent', 'asap', 'emergency', 'critical']
    }

    for (const [intent, patterns] of Object.entries(intentPatterns)) {
      if (tokens.some(token => patterns.includes(token))) {
        console.log('[MessageAnalyzer] Detected intent:', intent)
        return intent
      }
    }

    console.log('[MessageAnalyzer] No specific intent detected, defaulting to statement')
    return 'statement'
  }

  private findRelevantDepartments(tokens: string[]): string[] {
    console.log('[MessageAnalyzer] Finding relevant departments for tokens:', tokens)
    const relevantDepts = new Set<string>()
    const message = tokens.join(' ')

    for (const [dept, keywords] of Object.entries(this.departmentKeywords)) {
      const keywordMatches = keywords.some(keyword => {
        const similarity = stringSimilarity.compareTwoStrings(message, keyword)
        console.log(`[MessageAnalyzer] Similarity between "${message}" and "${keyword}":`, similarity)
        return similarity > 0.4 || message.includes(keyword)
      })

      if (keywordMatches) {
        console.log(`[MessageAnalyzer] Found relevant department:`, dept)
        relevantDepts.add(dept)
      }
    }

    const result = Array.from(relevantDepts)
    console.log('[MessageAnalyzer] Relevant departments:', result)
    return result
  }

  private determinePriority(tokens: string[]): 'low' | 'medium' | 'high' {
    console.log('[MessageAnalyzer] Determining priority from tokens:', tokens)
    
    const priorityKeywords = {
      high: ['urgent', 'critical', 'asap', 'emergency', 'immediate'],
      medium: ['important', 'priority', 'needed', 'required'],
      low: ['whenever', 'eventually', 'later', 'sometime']
    }

    if (tokens.some(token => priorityKeywords.high.includes(token))) {
      console.log('[MessageAnalyzer] Detected high priority')
      return 'high'
    }
    if (tokens.some(token => priorityKeywords.medium.includes(token))) {
      console.log('[MessageAnalyzer] Detected medium priority')
      return 'medium'
    }
    
    console.log('[MessageAnalyzer] Defaulting to low priority')
    return 'low'
  }

  private determineUrgency(tokens: string[]): boolean {
    console.log('[MessageAnalyzer] Checking urgency in tokens:', tokens)
    
    const urgentWords = [
      'urgent', 'asap', 'emergency', 'immediately', 'critical',
      'urgent', 'rush', 'deadline', 'today', 'now'
    ]
    
    const isUrgent = tokens.some(token => urgentWords.includes(token))
    console.log('[MessageAnalyzer] Urgency detected:', isUrgent)
    return isUrgent
  }

  private extractKeywords(tokens: string[]): string[] {
    console.log('[MessageAnalyzer] Extracting keywords from tokens:', tokens)
    
    const stopWords = new Set([
      'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but',
      'in', 'with', 'to', 'for', 'of', 'that', 'this', 'i', 'you', 'it'
    ])

    const keywords = tokens
      .filter(token => !stopWords.has(token))
      .slice(0, 5)

    console.log('[MessageAnalyzer] Extracted keywords:', keywords)
    return keywords
  }
}