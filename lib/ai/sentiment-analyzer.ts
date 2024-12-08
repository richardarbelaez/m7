"use client"

import Sentiment from 'sentiment'

class SentimentAnalyzer {
  private analyzer: Sentiment

  constructor() {
    this.analyzer = new Sentiment()
  }

  analyzeText(text: string) {
    const result = this.analyzer.analyze(text)
    return {
      score: result.score,
      comparative: result.comparative,
      sentiment: this.getSentimentLabel(result.score),
      tokens: result.tokens,
      positive: result.positive,
      negative: result.negative
    }
  }

  private getSentimentLabel(score: number): 'positive' | 'neutral' | 'negative' {
    if (score > 0) return 'positive'
    if (score < 0) return 'negative'
    return 'neutral'
  }
}

export const sentimentAnalyzer = new SentimentAnalyzer()