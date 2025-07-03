import { db } from "@/db";
import { ourProjects} from "@/db/schema";
import { withAuth } from "@/lib/auth-middleware";
import { uploadImage } from "@/lib/cloudinary";
import {  eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

//get by id
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params
        const idNumber = Number.parseInt(id)

        if (isNaN(idNumber)) {
            return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
        }
        const project = await db.select().from(ourProjects).where(eq(ourProjects.id, idNumber))
        return NextResponse.json(project[0], { status: 200 });
    } catch (error) {
        console.error("Error fetching project:", error);
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
}

// Update Project
export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
  return withAuth(async () => {
      try {
          const { id } = context.params
          const idNumber = Number(id)

          if (isNaN(idNumber)) {
              return NextResponse.json(
                  { error: "Invalid project ID" },
                  { status: 400 }
              )
          }

          const formData = await request.formData()
          const title = formData.get("title") as string
          const category = formData.get("category") as string
          const desc = formData.get("desc") as string
          const detailDescription = formData.getAll("detailDescription") as string[]
          const imageFile = formData.get("imageUrl") as File | null

          let imageUrl: string | undefined = undefined

          // Only process image if a new one was uploaded
          if (imageFile && imageFile.size > 0) {
              const bytes = await imageFile.arrayBuffer()
              const buffer = Buffer.from(bytes)
              const base64Image = `data:${imageFile.type};base64,${buffer.toString("base64")}`

              const uploadResult = await uploadImage(base64Image, {
                  folder: "projects",
                  public_id: `${title}-${Date.now()}`,
              })

              imageUrl = uploadResult.secure_url
          }

          await db
              .update(ourProjects)
              .set({ 
                  title,
                  category,
                  desc,
                  detailDescription,
                  ...(imageUrl ? { imageUrl } : {})
              })
              .where(eq(ourProjects.id, idNumber))

          return NextResponse.json(
              { message: "Project updated successfully" },
              { status: 200 }
          )
      } catch (error) {
          console.error("Error updating project:", error)
          return NextResponse.json(
              { error: "Failed to update project" },
              { status: 500 }
          )
      }
  }, request)
}

// Delete Project
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    return withAuth(async () => {
        const { id } = await context.params
        const idNumber = Number.parseInt(id)

        if (isNaN(idNumber)) {
            return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
        }
        // check if project exists
        const project = await db.select().from(ourProjects).where(eq(ourProjects.id, idNumber))
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 })
        }
        // delete project
        try {
            await db.delete(ourProjects).where(eq(ourProjects.id, idNumber))
            return NextResponse.json({ message: "Project deleted successfully", status: 200 })
        } catch (error) {
            console.error("Error deleting project:", error)
            return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
        }
    }, request)
}