import { type NextRequest, NextResponse } from "next/server"

// This is a mock API route that simulates calling a Python backend
// In a real implementation, this would call your Python service

export async function POST(request: NextRequest) {
  try {
    // In a real implementation, you would:
    // 1. Get the form data with the file
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // 2. Call your Python backend with a temporary URL for development
    // Use environment variable with fallback for development
    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || "http://localhost:5000/extract"

    console.log(`[DEV] Would call Python service at: ${pythonServiceUrl}`)

    // For development, we'll simulate a response instead of making the actual call
    // In production, you would uncomment and use this code:
    /*
    const pythonResponse = await fetch(pythonServiceUrl, {
      method: 'POST',
      body: formData,
    });
    const data = await pythonResponse.json();
    return NextResponse.json(data);
    */

    // For this mock, we'll simulate a response after a delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate document type detection based on filename
    const fileName = file.name.toLowerCase()
    const isPassport = fileName.includes("passport")

    // Mock response data
    const responseData = {
      documentType: isPassport ? "Passport" : "National ID",
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
      confidence: 0.95,
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Error processing document:", error)
    return NextResponse.json({ error: "Failed to process document" }, { status: 500 })
  }
}

