"use client"

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

class Logger {
  private level: LogLevel = 'debug' // Set to debug by default in development

  setLevel(level: LogLevel) {
    this.level = level
  }

  debug(...args: any[]) {
    if (this.shouldLog('debug')) {
      console.debug('[DEBUG]', ...args)
    }
  }

  info(...args: any[]) {
    if (this.shouldLog('info')) {
      console.info('[INFO]', ...args)
    }
  }

  warn(...args: any[]) {
    if (this.shouldLog('warn')) {
      console.warn('[WARN]', ...args)
    }
  }

  error(...args: any[]) {
    if (this.shouldLog('error')) {
      console.error('[ERROR]', ...args)
    }
  }

  private shouldLog(messageLevel: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error']
    return levels.indexOf(messageLevel) >= levels.indexOf(this.level)
  }
}

export const logger = new Logger()

// Set log level based on environment
if (process.env.NODE_ENV === 'development') {
  logger.setLevel('debug')
} else {
  logger.setLevel('warn')
}