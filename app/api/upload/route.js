import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"
import { existsSync } from "fs"

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create a unique filename
    const filename = `${uuidv4()}-${file.name.replace(/\s/g, "-")}`

    // Define the upload directory and ensure it exists
    const uploadDir = join(process.cwd(), "public", "uploads")
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Write the file to the uploads directory
    const filePath = join(uploadDir, filename)
    await writeFile(filePath, buffer)

    // Return the path that can be used with Next.js Image component
    return NextResponse.json({
      success: true,
      filePath: `/uploads/${filename}`,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to upload file: " + error.message 
    }, { status: 500 })
  }
}
