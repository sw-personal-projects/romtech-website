"use server"

import { readFile } from "fs/promises"
import { join } from "path"

export async function fetchProjectData() {
  try {
    // Read directly from the file system - this works during build time and runtime
    const filePath = join(process.cwd(), "public", "data", "project-data.json")
    const fileContents = await readFile(filePath, "utf8")
    const data = JSON.parse(fileContents)

    return data
  } catch (error) {
    console.error("Error reading project data:", error)

    // Fallback: try to fetch from public URL as last resort
    try {
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

      const res = await fetch(`${baseUrl}/data/project-data.json`, {
        next: { revalidate: 3600 }, 
      })

      if (res.ok) {
        return res.json()
      }
    } catch (fetchError) {
      console.error("Fetch fallback also failed:", fetchError)
    }

    // Final fallback - return empty array
    return []
  }
}
