"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CreditCard, DollarSign } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function NewPaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <Link href="/dashboard/transactions" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Process New Payment</h1>
          <p className="text-gray-500">Record a new payment from a client</p>
        </div>
      </div>

      <div className="p-4 md:p-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Enter the payment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Select>
                      <SelectTrigger id="client">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="robert-wilson">Robert Wilson</SelectItem>
                        <SelectItem value="jennifer-adams">Jennifer Adams</SelectItem>
                        <SelectItem value="david-thompson">David Thompson</SelectItem>
                        <SelectItem value="sarah-wilson">Sarah Wilson</SelectItem>
                        <SelectItem value="michael-brown">Michael Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="policy">Policy</Label>
                    <Select>
                      <SelectTrigger id="policy">
                        <SelectValue placeholder="Select policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a-78945">Auto Insurance (A-78945)</SelectItem>
                        <SelectItem value="h-12378">Home Insurance (H-12378)</SelectItem>
                        <SelectItem value="l-45612">Life Insurance (L-45612)</SelectItem>
                        <SelectItem value="h-34567">Health Insurance (H-34567)</SelectItem>
                        <SelectItem value="b-23456">Business Insurance (B-23456)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input id="amount" type="text" placeholder="0.00" className="pl-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Payment Date</Label>
                    <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <RadioGroup
                    defaultValue="credit-card"
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    onValueChange={setPaymentMethod}
                  >
                    <div
                      className={`flex items-center space-x-2 border rounded-md p-3 ${paymentMethod === "credit-card" ? "border-orange-500 bg-orange-50" : ""}`}
                    >
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit Card
                      </Label>
                    </div>
                    <div
                      className={`flex items-center space-x-2 border rounded-md p-3 ${paymentMethod === "bank-transfer" ? "border-orange-500 bg-orange-50" : ""}`}
                    >
                      <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                      <Label htmlFor="bank-transfer" className="flex items-center cursor-pointer">
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
                    <div
                      className={`flex items-center space-x-2 border rounded-md p-3 ${paymentMethod === "cash" ? "border-orange-500 bg-orange-50" : ""}`}
                    >
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex items-center cursor-pointer">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Cash
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === "credit-card" && (
                  <div className="space-y-4 border rounded-md p-4 bg-gray-50">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name-on-card">Name on Card</Label>
                      <Input id="name-on-card" placeholder="John Smith" />
                    </div>
                  </div>
                )}

                {paymentMethod === "bank-transfer" && (
                  <div className="space-y-4 border rounded-md p-4 bg-gray-50">
                    <div className="space-y-2">
                      <Label htmlFor="bank-name">Bank Name</Label>
                      <Input id="bank-name" placeholder="Bank of America" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-number">Account Number</Label>
                      <Input id="account-number" placeholder="123456789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="routing-number">Routing Number</Label>
                      <Input id="routing-number" placeholder="987654321" />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Add any additional information about this payment" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-orange-500 hover:bg-orange-600">Process Payment</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Processing Fee</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>$0.00</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-500 text-sm">Select a client to view their information</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

