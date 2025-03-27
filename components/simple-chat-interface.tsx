"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, User, X } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface SimpleChatInterfaceProps {
  onClose: () => void
  onClientDataExtracted?: (data: any) => void
}

export function SimpleChatInterface({ onClose, onClientDataExtracted }: SimpleChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your Covera AI assistant. I can help you capture client information. How would you like to proceed?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simple response for demo
      const responseContent =
        "I've received your message. In a real implementation, I would extract client information and help you fill out the form."

      const assistantMessage: Message = {
        role: "assistant",
        content: responseContent,
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Simulate extracting client data
      if (onClientDataExtracted) {
        onClientDataExtracted({
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@example.com",
          phone: "(123) 456-7890",
        })
      }
    } catch (error) {
      console.error("Error processing message:", error)

      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 md:w-96 shadow-xl rounded-lg overflow-hidden flex flex-col bg-white border">
      <div className="flex items-center justify-between p-3 border-b bg-orange-500 text-white">
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          <span className="font-medium">Covera AI Assistant</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-orange-600" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-3 max-h-[400px] min-h-[300px]">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-3`}>
            <div
              className={`flex max-w-[80%] ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              } items-start gap-2`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full ${
                  message.role === "user" ? "bg-orange-500 text-white" : "bg-gray-100"
                }`}
              >
                {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5 text-orange-500" />}
              </div>
              <div
                className={`rounded-lg px-3 py-2 ${
                  message.role === "user" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-3">
            <div className="flex items-start gap-2">
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gray-100">
                <Bot className="h-5 w-5 text-orange-500" />
              </div>
              <div className="rounded-lg px-3 py-2 bg-gray-100">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-3">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

