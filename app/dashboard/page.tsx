"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUp, Plus, MessageSquare, Bot } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { AgentSelector } from "@/components/agent-selector"
import { DocumentProcessor } from "@/components/document-processor"

interface ClientData {
  firstName?: string
  middleName?: string
  lastName?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  idNumber?: string
  dateOfBirth?: string
  sex?: string
  documentType?: string
}

export default function Dashboard() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [showAIChat, setShowAIChat] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("form")

  // Client form state
  const [clientData, setClientData] = useState<ClientData>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    idNumber: "",
    dateOfBirth: "",
    sex: "",
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => file.name)
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }

  const handleClientDataChange = (field: keyof ClientData, value: string) => {
    setClientData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleDocumentProcessed = (data: ClientData) => {
    setClientData((prev) => ({
      ...prev,
      firstName: data.firstName || prev.firstName,
      middleName: data.middleName || prev.middleName,
      lastName: data.lastName || prev.lastName,
      dateOfBirth: data.dateOfBirth || prev.dateOfBirth,
      sex: data.sex || prev.sex,
      idNumber: data.idNumber || prev.idNumber,
      documentType: data.documentType || prev.documentType,
      address: data.address || prev.address,
    }))

    // Switch to form tab to show the extracted data
    setActiveTab("form")
  }

  return (
    <DashboardShell>
      <div className="flex flex-1 overflow-hidden">
        {/* Main content area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Client Onboarding</h1>
              <p className="text-gray-500">Add new clients through conversation or document upload</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAIChat(true)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with AI
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                <Plus className="mr-2 h-4 w-4" />
                New Client
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="form">Manual Entry</TabsTrigger>
                <TabsTrigger value="document">Document Upload</TabsTrigger>
                <TabsTrigger value="ai">AI Conversation</TabsTrigger>
              </TabsList>

              <TabsContent value="form">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Information</CardTitle>
                    <CardDescription>Enter the client's personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input
                          id="first-name"
                          placeholder="John"
                          value={clientData.firstName}
                          onChange={(e) => handleClientDataChange("firstName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="middle-name">Middle Name</Label>
                        <Input
                          id="middle-name"
                          placeholder="Robert"
                          value={clientData.middleName}
                          onChange={(e) => handleClientDataChange("middleName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input
                          id="last-name"
                          placeholder="Smith"
                          value={clientData.lastName}
                          onChange={(e) => handleClientDataChange("lastName", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="id-number">ID Number</Label>
                        <Input
                          id="id-number"
                          placeholder="A123456789"
                          value={clientData.idNumber}
                          onChange={(e) => handleClientDataChange("idNumber", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={clientData.dateOfBirth}
                          onChange={(e) => handleClientDataChange("dateOfBirth", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sex">Sex</Label>
                        <Select value={clientData.sex} onValueChange={(value) => handleClientDataChange("sex", value)}>
                          <SelectTrigger id="sex">
                            <SelectValue placeholder="Select sex" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.smith@example.com"
                          value={clientData.email}
                          onChange={(e) => handleClientDataChange("email", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="(123) 456-7890"
                          value={clientData.phone}
                          onChange={(e) => handleClientDataChange("phone", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main St"
                        value={clientData.address}
                        onChange={(e) => handleClientDataChange("address", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          value={clientData.city}
                          onChange={(e) => handleClientDataChange("city", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select
                          value={clientData.state}
                          onValueChange={(value) => handleClientDataChange("state", value)}
                        >
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="tx">Texas</SelectItem>
                            <SelectItem value="fl">Florida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                          id="zip"
                          placeholder="10001"
                          value={clientData.zip}
                          onChange={(e) => handleClientDataChange("zip", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="document">
                <DocumentProcessor onProcessComplete={handleDocumentProcessed} />
              </TabsContent>

              <TabsContent value="ai">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bot className="mr-2 h-5 w-5 text-orange-500" />
                      AI-Assisted Onboarding
                    </CardTitle>
                    <CardDescription>
                      Our AI assistant will guide you through the client onboarding process
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <Bot className="h-12 w-12 mx-auto text-orange-500 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Let AI do the work for you</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Our AI assistant can extract client information from your conversation or from uploaded
                        documents.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowAIChat(true)}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Chat with AI
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab("document")}>
                          <FileUp className="mr-2 h-4 w-4" />
                          Upload Documents
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-orange-500 hover:bg-orange-600">Submit Onboarding</Button>
            </div>
          </div>
        </div>

        {/* Right sidebar for agent selection */}
        <div className="hidden lg:block w-80 border-l overflow-y-auto p-4">
          <AgentSelector onAgentSelect={setSelectedAgent} selectedAgent={selectedAgent} />
        </div>
      </div>

      {/* AI Chat Interface - Simplified to a button that shows when clicked */}
      {showAIChat && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-80 md:w-96 border overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b bg-orange-500 text-white">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <span className="font-medium">Covera AI Assistant</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-orange-600"
                onClick={() => setShowAIChat(false)}
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
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </div>
            <div className="p-4 h-80 overflow-y-auto">
              <div className="flex items-start gap-2 mb-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <Bot className="h-5 w-5 text-orange-500" />
                </div>
                <div className="rounded-lg px-3 py-2 bg-gray-100">
                  <p className="text-sm">
                    Hello! I'm your Covera AI assistant. I can help you capture client information. You can either tell
                    me about the client, or upload their documents and I'll extract the information for you.
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t p-3">
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button size="icon" className="bg-orange-500 hover:bg-orange-600">
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
                    className="h-4 w-4"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}

