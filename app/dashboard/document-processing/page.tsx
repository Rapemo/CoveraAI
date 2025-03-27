"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Info, Check } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DocumentProcessor } from "@/components/document-processor"

interface ExtractedIDData {
  documentType?: string
  serialNumber?: string
  idNumber?: string
  firstName?: string
  middleName?: string
  lastName?: string
  dateOfBirth?: string
  sex?: string
  issuedDate?: string
  expiryDate?: string
  nationality?: string
  address?: string
}

export default function DocumentProcessingPage() {
  const [clientData, setClientData] = useState<ExtractedIDData>({})
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "failed">("pending")

  const handleDocumentProcessed = (data: ExtractedIDData) => {
    setClientData(data)

    // Simulate verification after a delay
    setTimeout(() => {
      setVerificationStatus("verified")
    }, 1500)
  }

  return (
    <DashboardShell>
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">ID Document Processing</h1>
            <p className="text-gray-500">Extract and verify client information from ID documents</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <FileText className="mr-2 h-4 w-4" />
            Document History
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <DocumentProcessor onProcessComplete={handleDocumentProcessed} />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
                <CardDescription>Data extracted from the document</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.keys(clientData).length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input
                          id="full-name"
                          value={`${clientData.firstName || ""} ${clientData.middleName || ""} ${clientData.lastName || ""}`.trim()}
                          readOnly
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="id-number">ID Number</Label>
                          <Input id="id-number" value={clientData.idNumber || ""} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input id="dob" value={clientData.dateOfBirth || ""} readOnly />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="verification">Verification Status</Label>
                        <div
                          className={`flex items-center p-2 rounded-md ${
                            verificationStatus === "verified"
                              ? "bg-green-50 text-green-700"
                              : verificationStatus === "failed"
                                ? "bg-red-50 text-red-700"
                                : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {verificationStatus === "verified" ? (
                            <>
                              <Check className="h-5 w-5 mr-2" />
                              <span>Document Verified</span>
                            </>
                          ) : verificationStatus === "failed" ? (
                            <>
                              <Info className="h-5 w-5 mr-2" />
                              <span>Verification Failed</span>
                            </>
                          ) : (
                            <>
                              <Info className="h-5 w-5 mr-2" />
                              <span>Pending Verification</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">Create Client Profile</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Upload and process a document to see extracted client information</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Types</CardTitle>
                <CardDescription>Supported identification documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center p-2 rounded-md bg-gray-50">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-700 text-sm font-medium">P</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Passport</h4>
                      <p className="text-xs text-gray-500">International travel document</p>
                    </div>
                  </div>

                  <div className="flex items-center p-2 rounded-md bg-gray-50">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-700 text-sm font-medium">ID</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">National ID Card</h4>
                      <p className="text-xs text-gray-500">Government-issued identification</p>
                    </div>
                  </div>

                  <div className="flex items-center p-2 rounded-md bg-gray-50">
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                      <span className="text-orange-700 text-sm font-medium">DL</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Driver's License</h4>
                      <p className="text-xs text-gray-500">Driving permit with photo ID</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

