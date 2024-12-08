export type MessageType = 'text' | 'file' | 'image'

export interface ChatMessage {
  id: string
  type: MessageType
  content: string
  sender: 'user' | 'agent'
  timestamp: string
  fileName?: string
  fileSize?: number
  fileUrl?: string
  imageUrl?: string
  departmentId?: string // Add departmentId to track which department sent the message
}

export interface ChatFile {
  name: string
  size: number
  type: string
  url: string
}