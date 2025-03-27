"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bot, FileUp, MessageSquare } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { SimpleChatInterface } from "@/components/simple-chat-interface"

export default function ChatIntegrationPage() {
  const [showChat, setShowChat] = useState(false)
  const [clientData, setClientData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  const handleClientDataExtracted = (data: any) => {
    setClientData((prev) => ({
      ...prev,
      ...data,
    }))
  }

  return (
    <DashboardShell>
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI-Assisted Client Onboarding</h1>
            <p className="text-gray-500">Use our AI assistant to help capture client information</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowChat(true)}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat with AI
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
              <CardDescription>Client details captured through AI conversation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    value={clientData.firstName}
                    onChange={(e) => setClientData({ ...clientData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    value={clientData.lastName}
                    onChange={(e) => setClientData({ ...clientData, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={clientData.email}
                    onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={clientData.phone}
                    onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional client information..." className="min-h-[100px]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
              <CardDescription>Upload client documents for AI processing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="id">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="id">Identification</TabsTrigger>
                  <TabsTrigger value="insurance">Insurance</TabsTrigger>
                  <TabsTrigger value="financial">Financial</TabsTrigger>
                </TabsList>
                <TabsContent value="id" className="space-y-4 pt-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <FileUp className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <h3 className="text-sm font-medium mb-1">Upload identification documents</h3>
                    <div className="relative">
                      <Button variant="secondary" size="sm" className="relative z-10">
                        Browse Files
                      </Button>
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Our AI will extract client information from the documents
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="insurance" className="pt-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <FileUp className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <h3 className="text-sm font-medium mb-1">Upload insurance documents</h3>
                    <div className="relative">
                      <Button variant="secondary" size="sm" className="relative z-10">
                        Browse Files
                      </Button>
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="financial" className="pt-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <FileUp className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <h3 className="text-sm font-medium mb-1">Upload financial documents</h3>
                    <div className="relative">
                      <Button variant="secondary" size="sm" className="relative z-10">
                        Browse Files
                      </Button>
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="mr-2 h-5 w-5 text-orange-500" />
                How AI Assists with Client Onboarding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Conversational Data Capture</h3>
                    <p className="text-sm text-gray-500">
                      Our AI assistant can extract client information from natural conversations, making the onboarding
                      process more human and efficient.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Document Processing</h3>
                    <p className="text-sm text-gray-500">
                      Upload client documents and our AI will automatically extract relevant information to populate the
                      client profile.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Seamless Integration</h3>
                    <p className="text-sm text-gray-500">
                      Information captured through AI is seamlessly integrated into your workflow, reducing manual data
                      entry and errors.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showChat && (
        <SimpleChatInterface onClose={() => setShowChat(false)} onClientDataExtracted={handleClientDataExtracted} />
      )}
    </DashboardShell>
  )
}

