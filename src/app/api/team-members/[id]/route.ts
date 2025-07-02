import { db } from "@/db"
import { teamMembers } from "@/db/schema"
import { withAuth } from "@/lib/auth-middleware"
import { uploadImage } from "@/lib/cloudinary"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  return withAuth(async () => {
    try {
      const { id } = await context.params
      const idNumber = Number.parseInt(id)

      if (isNaN(idNumber)) {
        return NextResponse.json({ error: "Invalid team member ID" }, { status: 400 })
      }

      await db.delete(teamMembers).where(eq(teamMembers.id, idNumber))

      return NextResponse.json({ message: "Team member deleted successfully" })
    } catch (error) {
      console.error("Error deleting team member:", error)
      return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 })
    }
  }, request)
}


export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  return withAuth(async () => {
    try {
      const { id } = await context.params
      const idNumber = Number.parseInt(id)

      if (isNaN(idNumber)) {
        return NextResponse.json({ error: "Invalid team member ID" }, { status: 400 })
      }

      const formData = await request.formData()
      const name = formData.get("name") as string
      const position = formData.get("position") as string
      const imageFile = formData.get("image") as File | null

      let imageUrl: string | undefined = undefined

      if (imageFile && typeof imageFile === "object") {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64Image = `data:${imageFile.type};base64,${buffer.toString("base64")}`

        const uploadResult = await uploadImage(base64Image, {
          folder: "team-members",
          public_id: `${name}-${Date.now()}`,
        })

        imageUrl = uploadResult.secure_url
      }

      await db
        .update(teamMembers)
        .set({ name, position, ...(imageUrl && { image: imageUrl }) })
        .where(eq(teamMembers.id, idNumber))

      return NextResponse.json({ message: "Team member updated successfully" })
    } catch (error) {
      console.error("Error updating team member:", error)
      return NextResponse.json({ error: "Failed to update team member" }, { status: 500 })
    }
  }, request)
}

