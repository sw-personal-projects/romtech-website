import { type NextRequest, NextResponse } from "next/server"
import { uploadImage } from "@/lib/cloudinary"
import { db } from "@/db"
import { teamMembers } from "@/db/schema"
import { withAuth } from "@/lib/auth-middleware"

export async function GET() {
  try {
    const members = await db.select().from(teamMembers)
    return NextResponse.json(members)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
    return withAuth(async (req: NextRequest) => {
      try {
        const formData = await req.formData()
        const name = formData.get("name") as string
        const position = formData.get("position") as string
        const image = formData.get("image") as File
  
        if (!name || !position || !image) {
          return NextResponse.json({ error: "Name, position, and image are required" }, { status: 400 })
        }
  
        // Convert image to base64 for Cloudinary upload
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64Image = `data:${image.type};base64,${buffer.toString("base64")}`
  
        // Upload image to Cloudinary
        const uploadResult = await uploadImage(base64Image, {
          folder: "team-members",
          public_id: `${name}-${Date.now()}`,
          transformation: [{ width: 400, height: 400, crop: "fill", gravity: "face" }],
        })
  
        // Save team member to database
        const [newMember] = await db
          .insert(teamMembers)
          .values({
            name,
            position,
            image: uploadResult.secure_url,
          })
          .returning()
  
        return NextResponse.json(newMember, { status: 201 })
      } catch (error) {
        console.error("Error creating team member:", error)
        return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
      }
    }, request)
  }


//   export async function GET() {
//     return withAuth(async () => {
//       try {
//         const members = await db.select().from(teamMembers)
//         return NextResponse.json(members)
//       } catch (error) {
//         console.error("Error fetching team members:", error)
//         return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
//       }
//     }, {} as NextRequest)
//   }