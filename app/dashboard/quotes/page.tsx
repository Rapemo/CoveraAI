"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardShell } from "@/components/dashboard-shell"
import { AgentSelector } from "@/components/agent-selector"
import { Calculator, Plus, ArrowRight } from "lucide-react"

export default function QuotesPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  return (
    <DashboardShell>
      <div className="flex flex-1 overflow-hidden">
        {/* Main content area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Quote Generator</h1>
              <p className="text-gray-500">Create and manage insurance quotes</p>
            </div>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" />
              New Quote
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Quote</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="auto">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="auto">Auto</TabsTrigger>
                      <TabsTrigger value="home">Home</TabsTrigger>
                      <TabsTrigger value="life">Life</TabsTrigger>
                      <TabsTrigger value="business">Business</TabsTrigger>
                    </TabsList>
                    <TabsContent value="auto" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="client">Select Client</Label>
                        <Select>
                          <SelectTrigger id="client">
                            <SelectValue placeholder="Select a client" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="robert">Robert Wilson</SelectItem>
                            <SelectItem value="jennifer">Jennifer Adams</SelectItem>
                            <SelectItem value="david">David Thompson</SelectItem>
                            <SelectItem value="sarah">Sarah Wilson</SelectItem>
                            <SelectItem value="michael">Michael Brown</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="vehicle-year">Vehicle Year</Label>
                          <Input id="vehicle-year" placeholder="2023" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vehicle-make">Vehicle Make</Label>
                          <Input id="vehicle-make" placeholder="Toyota" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="vehicle-model">Vehicle Model</Label>
                          <Input id="vehicle-model" placeholder="Camry" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vehicle-trim">Vehicle Trim</Label>
                          <Input id="vehicle-trim" placeholder="SE" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="coverage-type">Coverage Type</Label>
                        <Select defaultValue="full">
                          <SelectTrigger id="coverage-type">
                            <SelectValue placeholder="Select coverage type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="liability">Liability Only</SelectItem>
                            <SelectItem value="collision">Collision</SelectItem>
                            <SelectItem value="full">Full Coverage</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="pt-2">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600">
                          <Calculator className="mr-2 h-4 w-4" />
                          Generate Quote
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="home" className="pt-4">
                      <div className="flex items-center justify-center h-40 bg-gray-50 rounded-md">
                        <p className="text-gray-500">Home insurance quote form will be displayed here</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="life" className="pt-4">
                      <div className="flex items-center justify-center h-40 bg-gray-50 rounded-md">
                        <p className="text-gray-500">Life insurance quote form will be displayed here</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="business" className="pt-4">
                      <div className="flex items-center justify-center h-40 bg-gray-50 rounded-md">
                        <p className="text-gray-500">Business insurance quote form will be displayed here</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Quotes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">Auto Insurance - Robert Wilson</h3>
                        <p className="text-sm text-gray-500">2023 Toyota Camry SE</p>
                        <p className="text-sm text-gray-500">Created: Apr 10, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">$1,245.00</p>
                        <p className="text-sm text-gray-500">Annual Premium</p>
                        <Button variant="ghost" size="sm" className="mt-1">
                          View <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">Home Insurance - Jennifer Adams</h3>
                        <p className="text-sm text-gray-500">456 Oak Ave, Los Angeles, CA</p>
                        <p className="text-sm text-gray-500">Created: Apr 8, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">$2,450.00</p>
                        <p className="text-sm text-gray-500">Annual Premium</p>
                        <Button variant="ghost" size="sm" className="mt-1">
                          View <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">Life Insurance - David Thompson</h3>
                        <p className="text-sm text-gray-500">Term Life - 20 Years</p>
                        <p className="text-sm text-gray-500">Created: Apr 5, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">$3,800.00</p>
                        <p className="text-sm text-gray-500">Annual Premium</p>
                        <Button variant="ghost" size="sm" className="mt-1">
                          View <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quote Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Base Premium</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Discounts</span>
                    <span>-$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fees</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold">
                    <span>Total Annual Premium</span>
                    <span>$0.00</span>
                  </div>
                  <div className="text-sm text-gray-500 text-center">Generate a quote to see the premium details</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Discounts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Multi-Policy Discount</span>
                    <span className="text-sm font-medium">Up to 15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Safe Driver Discount</span>
                    <span className="text-sm font-medium">Up to 20%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Good Student Discount</span>
                    <span className="text-sm font-medium">Up to 10%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vehicle Safety Features</span>
                    <span className="text-sm font-medium">Up to 5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Paperless Billing</span>
                    <span className="text-sm font-medium">Up to 3%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Right sidebar for agent selection */}
        <div className="hidden lg:block w-80 border-l overflow-y-auto p-4">
          <AgentSelector onAgentSelect={setSelectedAgent} selectedAgent={selectedAgent} />
        </div>
      </div>
    </DashboardShell>
  )
}

