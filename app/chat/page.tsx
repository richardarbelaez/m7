import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ChatContainer } from "@/components/chat/chat-container"

export default function ChatPage() {
  return (
    <div>
      <DashboardHeader />
      <main className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Assistant</h1>
          <p className="text-muted-foreground">
            Chat with your AI assistant to get help and guidance
          </p>
        </div>
        <ChatContainer />
      </main>
    </div>
  )
}