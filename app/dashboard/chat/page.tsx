"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bot, Send, User } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Covera AI assistant. How can I help you with your insurance business today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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
      const prompt = `You are an AI assistant for an insurance company called Covera AI. You help insurance agents with their questions about policies, claims, and insurance-related matters. Be professional, helpful, and concise.
      
      Previous conversation:
      ${messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n")}
      
      User: ${input}
      
      Assistant:`

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt,
      })

      const assistantMessage: Message = {
        role: "assistant",
        content: text,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)

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
    <div className="flex flex-col h-screen max-h-screen">
      <div className="border-b p-4">
        <h1 className="text-xl font-bold">AI Assistant</h1>
        <p className="text-sm text-gray-500">Get instant help with insurance-related questions</p>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex max-w-[80%] md:max-w-[70%] ${
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
              <Card className={`${message.role === "user" ? "bg-orange-500 text-white" : "bg-white"}`}>
                <CardContent className="p-3">
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2">
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gray-100">
                <Bot className="h-5 w-5 text-orange-500" />
              </div>
              <Card>
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-300"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()} className="bg-orange-500 hover:bg-orange-600">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

