"use client"

import { useState, useRef, KeyboardEvent, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, FileIcon, Send } from "lucide-react"
import { ChatMessage } from "@/lib/types/chat"

interface ChatInputProps {
  onSend: (content: string, type: ChatMessage['type'], fileDetails?: { name: string; size: number; url: string }) => void
  disabled?: boolean
  autoFocus?: boolean
  placeholder?: string
}

export function ChatInput({ 
  onSend, 
  disabled, 
  autoFocus = true,
  placeholder = "Type your message..."
}: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [autoFocus])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (message.trim() && !disabled) {
      onSend(message.trim(), 'text')
      setMessage("")
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // In a real app, you would upload the file to your server/storage here
      // For this example, we'll create a local URL
      const url = URL.createObjectURL(file)
      
      onSend(
        `Uploaded ${type}: ${file.name}`,
        type,
        {
          name: file.name,
          size: file.size,
          url
        }
      )
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t p-4">
      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            className="min-h-[80px] resize-none"
            disabled={disabled}
          />
        </div>
        
        <div className="flex flex-col space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e, 'file')}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
          <input
            type="file"
            ref={imageInputRef}
            onChange={(e) => handleFileUpload(e, 'image')}
            className="hidden"
            accept="image/*"
          />
          
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isUploading || disabled}
            onClick={() => fileInputRef.current?.click()}
          >
            <FileIcon className="h-4 w-4" />
          </Button>
          
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isUploading || disabled}
            onClick={() => imageInputRef.current?.click()}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          
          <Button 
            type="submit" 
            size="icon" 
            disabled={!message.trim() || isUploading || disabled}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  )
}