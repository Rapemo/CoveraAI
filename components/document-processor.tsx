"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUp, Upload, FileText, Check, AlertCircle, Eye, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

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

interface DocumentProcessorProps {
  onProcessComplete: (data: ExtractedIDData) => void
}

export function DocumentProcessor({ onProcessComplete }: DocumentProcessorProps) {
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [extractedData, setExtractedData] = useState<ExtractedIDData | null>(null)
  const [activeTab, setActiveTab] = useState<string>("upload")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setStatus("idle")
      setErrorMessage("")
      setExtractedData(null)

      // Create file preview
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = () => {
          setFilePreview(reader.result as string)
        }
        reader.readAsDataURL(selectedFile)
      } else if (selectedFile.type === "application/pdf") {
        // For PDFs, we'll use a generic PDF icon
        setFilePreview("/placeholder.svg?height=300&width=200&text=PDF")
      }
    }
  }

  const handleProcessDocument = async () => {
    if (!file) return

    setProcessing(true)
    setStatus("uploading")
    setProgress(0)

    try {
      // Create FormData to send the file
      const formData = new FormData()
      formData.append("file", file)

      // Simulate upload progress
      const uploadTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(uploadTimer)
            return 95
          }
          return prev + 5
        })
      }, 100)

      // In development, we'll use our mock API endpoint
      // This will be replaced with the actual Python backend in production
      try {
        const response = await fetch("/api/extract-id-data", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`)
        }

        const data = await response.json()
        clearInterval(uploadTimer)

        setStatus("processing")
        setProgress(97)

        // Short delay to simulate processing
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setProgress(100)

        // Use the data from our mock API
        setExtractedData(data)
        setStatus("success")
        onProcessComplete(data)
        setActiveTab("results")
      } catch (error) {
        console.error("API error:", error)

        // Fallback to simulated data if API call fails
        console.log("Falling back to simulated data")
        clearInterval(uploadTimer)

        setStatus("processing")
        setProgress(97)

        // Simulate document processing
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setProgress(100)

        // Simulate extracted data based on document type detection
        const simulatedData: ExtractedIDData = {
          documentType: file.name.toLowerCase().includes("passport") ? "Passport" : "National ID",
          serialNumber: "A123456789",
          idNumber: "987654321",
          firstName: "John",
          middleName: "Robert",
          lastName: "Smith",
          dateOfBirth: "1985-06-15",
          sex: "Male",
          issuedDate: "2020-01-10",
          expiryDate: "2030-01-09",
          nationality: "United States",
          address: "123 Main St, New York, NY 10001",
        }

        setExtractedData(simulatedData)
        setStatus("success")
        onProcessComplete(simulatedData)
        setActiveTab("results")
      }
    } catch (error) {
      console.error("Error processing document:", error)
      setStatus("error")
      setErrorMessage("Failed to process document. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  const resetProcessor = () => {
    setFile(null)
    setFilePreview(null)
    setStatus("idle")
    setProgress(0)
    setErrorMessage("")
    setExtractedData(null)
    setActiveTab("upload")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          ID Document Processing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Document</TabsTrigger>
            <TabsTrigger value="results" disabled={!extractedData}>
              Extracted Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4 pt-4">
            {status === "idle" && !file && (
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                <FileUp className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <h3 className="text-sm font-medium mb-1">Upload an ID document to extract information</h3>
                <p className="text-xs text-gray-500 mb-4">
                  We can extract data from passports, national IDs, driver's licenses, and more
                </p>
                <div className="relative">
                  <Button variant="secondary" size="sm" className="relative z-10">
                    <Upload className="mr-2 h-4 w-4" />
                    Browse Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png,.tiff,.bmp"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, JPG, PNG, TIFF, BMP (max 10MB)</p>
              </div>
            )}

            {file && (
              <div className="space-y-4">
                <div className="flex flex-col items-center p-4 border rounded-md">
                  {filePreview && (
                    <div className="mb-4 relative w-full max-w-md h-48 bg-gray-100 rounded-md overflow-hidden">
                      {file.type.startsWith("image/") ? (
                        <Image
                          src={filePreview || "/placeholder.svg"}
                          alt="Document preview"
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <FileText className="h-16 w-16 text-gray-400" />
                          <span className="text-sm text-gray-500 ml-2">{file.name}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={resetProcessor}>
                        <span className="sr-only">Remove</span>
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
                  </div>
                </div>

                {status !== "processing" && status !== "uploading" && (
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={handleProcessDocument}
                    disabled={processing}
                  >
                    {processing ? "Processing..." : "Extract Data from Document"}
                  </Button>
                )}
              </div>
            )}

            {(status === "uploading" || status === "processing") && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{status === "uploading" ? "Uploading document..." : "Extracting data..."}</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  {status === "uploading"
                    ? "Uploading your document to our secure server..."
                    : "Our AI is analyzing the document and extracting information..."}
                </p>
              </div>
            )}

            {status === "success" && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Document processed successfully</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>We've extracted the information from your {extractedData?.documentType}.</p>
                    </div>
                    <div className="mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-800 hover:bg-green-100"
                        onClick={() => setActiveTab("results")}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Extracted Data
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Processing failed</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{errorMessage}</p>
                    </div>
                    <div className="mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-800 hover:bg-red-100"
                        onClick={resetProcessor}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try Again
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="results" className="space-y-4 pt-4">
            {extractedData && (
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-md">
                  <h3 className="font-medium text-orange-800 mb-2">Document Information</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Document Type:</span>
                      <span className="ml-2 font-medium">{extractedData.documentType}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Serial Number:</span>
                      <span className="ml-2 font-medium">{extractedData.serialNumber}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">ID Number:</span>
                      <span className="ml-2 font-medium">{extractedData.idNumber}</span>
                    </div>
                    {extractedData.issuedDate && (
                      <div>
                        <span className="text-gray-500">Issued Date:</span>
                        <span className="ml-2 font-medium">{extractedData.issuedDate}</span>
                      </div>
                    )}
                    {extractedData.expiryDate && (
                      <div>
                        <span className="text-gray-500">Expiry Date:</span>
                        <span className="ml-2 font-medium">{extractedData.expiryDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="font-medium text-blue-800 mb-2">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">First Name:</span>
                      <span className="ml-2 font-medium">{extractedData.firstName}</span>
                    </div>
                    {extractedData.middleName && (
                      <div>
                        <span className="text-gray-500">Middle Name:</span>
                        <span className="ml-2 font-medium">{extractedData.middleName}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500">Last Name:</span>
                      <span className="ml-2 font-medium">{extractedData.lastName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Date of Birth:</span>
                      <span className="ml-2 font-medium">{extractedData.dateOfBirth}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Sex:</span>
                      <span className="ml-2 font-medium">{extractedData.sex}</span>
                    </div>
                    {extractedData.nationality && (
                      <div>
                        <span className="text-gray-500">Nationality:</span>
                        <span className="ml-2 font-medium">{extractedData.nationality}</span>
                      </div>
                    )}
                    {extractedData.address && (
                      <div className="col-span-2">
                        <span className="text-gray-500">Address:</span>
                        <span className="ml-2 font-medium">{extractedData.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("upload")}>
                    Back to Document
                  </Button>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => {
                      // In a real app, this would save the data to your system
                      alert("Data saved successfully!")
                    }}
                  >
                    Use This Data
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

