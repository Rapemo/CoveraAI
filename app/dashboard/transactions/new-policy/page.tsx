"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Check, ChevronRight, DollarSign, FileText, Shield, User, CreditCard } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function NewPolicyPage() {
  const [activeTab, setActiveTab] = useState("client")

  const nextTab = () => {
    if (activeTab === "client") setActiveTab("policy")
    else if (activeTab === "policy") setActiveTab("coverage")
    else if (activeTab === "coverage") setActiveTab("payment")
    else if (activeTab === "payment") setActiveTab("review")
  }

  const prevTab = () => {
    if (activeTab === "policy") setActiveTab("client")
    else if (activeTab === "coverage") setActiveTab("policy")
    else if (activeTab === "payment") setActiveTab("coverage")
    else if (activeTab === "review") setActiveTab("payment")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <Link href="/dashboard/transactions" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create New Policy</h1>
          <p className="text-gray-500">Set up a new insurance policy for a client</p>
        </div>
      </div>

      <div className="p-4 md:p-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("client")}
                    className={`w-full flex items-center space-x-3 rounded-md px-3 py-2 text-left text-sm ${
                      activeTab === "client" ? "bg-orange-50 text-orange-500" : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span>Client Information</span>
                    {activeTab === "client" && <ChevronRight className="ml-auto h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setActiveTab("policy")}
                    className={`w-full flex items-center space-x-3 rounded-md px-3 py-2 text-left text-sm ${
                      activeTab === "policy" ? "bg-orange-50 text-orange-500" : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Policy Details</span>
                    {activeTab === "policy" && <ChevronRight className="ml-auto h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setActiveTab("coverage")}
                    className={`w-full flex items-center space-x-3 rounded-md px-3 py-2 text-left text-sm ${
                      activeTab === "coverage" ? "bg-orange-50 text-orange-500" : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    <span>Coverage Options</span>
                    {activeTab === "coverage" && <ChevronRight className="ml-auto h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setActiveTab("payment")}
                    className={`w-full flex items-center space-x-3 rounded-md px-3 py-2 text-left text-sm ${
                      activeTab === "payment" ? "bg-orange-50 text-orange-500" : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <DollarSign className="h-4 w-4" />
                    <span>Payment Setup</span>
                    {activeTab === "payment" && <ChevronRight className="ml-auto h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setActiveTab("review")}
                    className={`w-full flex items-center space-x-3 rounded-md px-3 py-2 text-left text-sm ${
                      activeTab === "review" ? "bg-orange-50 text-orange-500" : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <Check className="h-4 w-4" />
                    <span>Review & Submit</span>
                    {activeTab === "review" && <ChevronRight className="ml-auto h-4 w-4" />}
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "client" && "Client Information"}
                  {activeTab === "policy" && "Policy Details"}
                  {activeTab === "coverage" && "Coverage Options"}
                  {activeTab === "payment" && "Payment Setup"}
                  {activeTab === "review" && "Review & Submit"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "client" && "Enter client details or select an existing client"}
                  {activeTab === "policy" && "Configure the policy type and basic details"}
                  {activeTab === "coverage" && "Select coverage options and limits"}
                  {activeTab === "payment" && "Set up payment schedule and method"}
                  {activeTab === "review" && "Review all information before submission"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeTab === "client" && (
                  <div className="space-y-4">
                    <div className="flex space-x-4 mb-6">
                      <Button variant="outline" className="flex-1">
                        Select Existing Client
                      </Button>
                      <Button className="flex-1 bg-orange-500 hover:bg-orange-600">Add New Client</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Smith" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.smith@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="(123) 456-7890" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Main St" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select>
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
                        <Input id="zip" placeholder="10001" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "policy" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="policy-type">Policy Type</Label>
                      <Select>
                        <SelectTrigger id="policy-type">
                          <SelectValue placeholder="Select policy type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto Insurance</SelectItem>
                          <SelectItem value="home">Home Insurance</SelectItem>
                          <SelectItem value="life">Life Insurance</SelectItem>
                          <SelectItem value="health">Health Insurance</SelectItem>
                          <SelectItem value="business">Business Insurance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input id="start-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <Input id="end-date" type="date" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="policy-number">Policy Number</Label>
                      <Input id="policy-number" placeholder="Auto-generated" disabled />
                    </div>

                    <div className="space-y-2">
                      <Label>Policy Term</Label>
                      <RadioGroup defaultValue="12">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="6" id="6-months" />
                          <Label htmlFor="6-months">6 Months</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="12" id="12-months" />
                          <Label htmlFor="12-months">12 Months</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="24" id="24-months" />
                          <Label htmlFor="24-months">24 Months</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea id="notes" placeholder="Enter any additional policy details" />
                    </div>
                  </div>
                )}

                {activeTab === "coverage" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Coverage Limits</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="liability">Liability Coverage</Label>
                          <Select defaultValue="100000">
                            <SelectTrigger id="liability">
                              <SelectValue placeholder="Select limit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="50000">$50,000</SelectItem>
                              <SelectItem value="100000">$100,000</SelectItem>
                              <SelectItem value="300000">$300,000</SelectItem>
                              <SelectItem value="500000">$500,000</SelectItem>
                              <SelectItem value="1000000">$1,000,000</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="deductible">Deductible</Label>
                          <Select defaultValue="500">
                            <SelectTrigger id="deductible">
                              <SelectValue placeholder="Select deductible" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="250">$250</SelectItem>
                              <SelectItem value="500">$500</SelectItem>
                              <SelectItem value="1000">$1,000</SelectItem>
                              <SelectItem value="2500">$2,500</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Additional Coverage Options</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="comprehensive" />
                          <Label htmlFor="comprehensive">Comprehensive Coverage</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="collision" defaultChecked />
                          <Label htmlFor="collision">Collision Coverage</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="uninsured" defaultChecked />
                          <Label htmlFor="uninsured">Uninsured Motorist Protection</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="medical" />
                          <Label htmlFor="medical">Medical Payments</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="rental" />
                          <Label htmlFor="rental">Rental Car Reimbursement</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="roadside" />
                          <Label htmlFor="roadside">Roadside Assistance</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Special Endorsements</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="gap" />
                          <Label htmlFor="gap">GAP Insurance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="new-car" />
                          <Label htmlFor="new-car">New Car Replacement</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="accident-forgiveness" />
                          <Label htmlFor="accident-forgiveness">Accident Forgiveness</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "payment" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Premium Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="premium">Annual Premium</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input id="premium" type="text" placeholder="1,200.00" className="pl-8" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="discount">Discount</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input id="discount" type="text" placeholder="0.00" className="pl-8" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Payment Schedule</h3>
                      <RadioGroup defaultValue="monthly">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly">Monthly</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="quarterly" id="quarterly" />
                          <Label htmlFor="quarterly">Quarterly</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="semi-annual" id="semi-annual" />
                          <Label htmlFor="semi-annual">Semi-Annual</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="annual" id="annual" />
                          <Label htmlFor="annual">Annual</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Payment Method</h3>
                      <RadioGroup defaultValue="credit-card">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credit-card" id="payment-credit-card" />
                          <Label htmlFor="payment-credit-card" className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Credit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bank-transfer" id="payment-bank-transfer" />
                          <Label htmlFor="payment-bank-transfer" className="flex items-center">
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
                              className="mr-2 h-4 w-4"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <line x1="2" x2="22" y1="10" y2="10" />
                            </svg>
                            Bank Transfer
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="auto-pay" id="auto-pay" />
                          <Label htmlFor="auto-pay" className="flex items-center">
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
                              className="mr-2 h-4 w-4"
                            >
                              <path d="M12 2v20" />
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                            Auto-Pay
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {activeTab === "review" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Client Information</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-500">Name:</div>
                          <div>John Smith</div>
                          <div className="text-gray-500">Email:</div>
                          <div>john.smith@example.com</div>
                          <div className="text-gray-500">Phone:</div>
                          <div>(123) 456-7890</div>
                          <div className="text-gray-500">Address:</div>
                          <div>123 Main St, New York, NY 10001</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Policy Details</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-500">Policy Type:</div>
                          <div>Auto Insurance</div>
                          <div className="text-gray-500">Policy Term:</div>
                          <div>12 Months</div>
                          <div className="text-gray-500">Start Date:</div>
                          <div>April 15, 2025</div>
                          <div className="text-gray-500">End Date:</div>
                          <div>April 14, 2026</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Coverage Details</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-500">Liability Coverage:</div>
                          <div>$100,000</div>
                          <div className="text-gray-500">Deductible:</div>
                          <div>$500</div>
                          <div className="text-gray-500">Additional Coverage:</div>
                          <div>Collision, Uninsured Motorist Protection</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Payment Information</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-500">Annual Premium:</div>
                          <div>$1,200.00</div>
                          <div className="text-gray-500">Payment Schedule:</div>
                          <div>Monthly ($100.00/month)</div>
                          <div className="text-gray-500">Payment Method:</div>
                          <div>Credit Card</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm">
                        I confirm that all information provided is accurate and complete. I understand that providing
                        false information may result in denial of claims or cancellation of the policy.
                      </Label>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {activeTab !== "client" && (
                  <Button variant="outline" onClick={prevTab}>
                    Back
                  </Button>
                )}
                {activeTab !== "client" && activeTab === "client" && <div></div>}
                {activeTab !== "review" ? (
                  <Button className="bg-orange-500 hover:bg-orange-600" onClick={nextTab}>
                    Continue
                  </Button>
                ) : (
                  <Button className="bg-orange-500 hover:bg-orange-600">Submit Policy</Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

