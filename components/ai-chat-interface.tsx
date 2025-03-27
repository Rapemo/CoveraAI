"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, User, Minimize2, X } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ClientData {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
}

interface AIChatInterfaceProps {
  onClientDataExtracted: (data: ClientData) => void
  onDocumentDataExtracted: (data: ClientData) => void
  minimized: boolean
  onToggleMinimize: () => void
  onClose: () => void
}

export function AIChatInterface({
  onClientDataExtracted,
  onDocumentDataExtracted,
  minimized,
  onToggleMinimize,
  onClose,
}: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your Covera AI assistant. I can help you capture client information. You can either tell me about the client, or upload their documents and I'll extract the information for you. How would you like to proceed?",
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
      const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || "http://localhost:5000/chat"

      const response = await fetch(pythonServiceUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
      }

      setMessages((prev) => [...prev, assistantMessage])
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true)

    try {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("document", file);

        const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || "http://localhost:5000/extract";

        const response = await fetch(pythonServiceUrl, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const assistantMessage: Message = {
          role: "assistant",
          content: data.response,
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Pass the extracted data to the parent component
        onDocumentDataExtracted(data.extractedData);
      }
    } catch (error) {
      console.error("Error processing document:", error);

      const errorMessage: Message = {
        role: "assistant",
        content:
          "I'm sorry, I encountered an error processing your document. Please try again or enter the information manually.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  // Simple function to extract client data from message text
  // In a real app, this would use more sophisticated NLP
  const extractClientDataFromMessage = (message: string): ClientData => {
    const data: ClientData = {}

    // Very basic extraction logic for demonstration
    const nameMatch = message.match(/name(?:\s+is)?\s+([A-Za-z]+)(?:\s+([A-Za-z]+))?/i)
    if (nameMatch) {
      data.firstName = nameMatch[1]
      if (nameMatch[2]) data.lastName = nameMatch[2]
    }

    const emailMatch = message.match(/email(?:\s+is)?\s+([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i)
    if (emailMatch) {
      data.email = emailMatch[1]
    }

    const phoneMatch = message.match(/phone(?:\s+is)?\s+($$?\d{3}$$?[-.\s]?\d{3}[-.\s]?\d{4})/i)
    if (phoneMatch) {
      data.phone = phoneMatch[1]
    }

    const addressMatch = message.match(/address(?:\s+is)?\s+(.+?)(?:,|\sin|$)/i)
    if (addressMatch) {
      data.address = addressMatch[1].trim()
    }

    const cityMatch = message.match(/(?:in|city|from)\s+([A-Za-z\s]+)(?:,|\s+[A-Z]{2}|\s+\d{5}|$)/i)
    if (cityMatch) {
      data.city = cityMatch[1].trim()
    }

    const stateMatch = message.match(/(?:state|in)\s+([A-Z]{2})/i) || message.match(/([A-Z]{2})\s+\d{5}/)
    if (stateMatch) {
      data.state = stateMatch[1].toUpperCase()
    }

    const zipMatch =
      message.match(/(?:zip|zipcode|postal code)(?:\s+is)?\s+(\d{5}(?:-\d{4})?)/i) ||
      message.match(/\b(\d{5}(?:-\d{4})?)\b/)
    if (zipMatch) {
      data.zip = zipMatch[1]
    }

    return data
  }

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggleMinimize}
          className="rounded-full h-14 w-14 bg-orange-500 hover:bg-orange-600 shadow-lg"
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 md:w-96 shadow-xl rounded-lg overflow-hidden flex flex-col bg-white border">
      <div className="flex items-center justify-between p-3 border-b bg-orange-500 text-white">
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          <span className="font-medium">Covera AI Assistant</span>
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-orange-600"
            onClick={onToggleMinimize}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-orange-600" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
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
          <div className="relative flex-1">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pr-10"
              disabled={isLoading}
            />
            <label
              htmlFor="file-upload"
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              disabled={isLoading}
            />
          </div>
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
