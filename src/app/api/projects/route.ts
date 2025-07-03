import { ourProjects } from "@/db/schema";
import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { withAuth } from "@/lib/auth-middleware";
import { uploadImage } from "@/lib/cloudinary";


export async function GET() {
    try {
        const projects = await db.select().from(ourProjects).orderBy(desc(ourProjects.createdAt));
        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

// POST /api/projects
export const POST = (req: NextRequest) =>
    withAuth(async () => {
      try {
        const form = await req.formData()
        const { title, category, desc } = Object.fromEntries(form) as Record<string, string>
        const detailDescription = form.getAll("detailDescription") as string[]

        console.log("detailDescription", detailDescription)
        const file = form.get("imageUrl") as File

        // validate the form data
        if (!title || !category || !desc || !detailDescription || !file) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // validate the detailDescription
        if (!detailDescription.every((item) => typeof item === "string")) {
            return NextResponse.json({ error: "Detail description must be an array of strings" }, { status: 400 })
        }
  
        const base64 = `data:${file.type};base64,${Buffer.from(await file.arrayBuffer()).toString("base64")}`
  
        const { secure_url } = await uploadImage(base64, {
          folder: "projects",
          public_id: `${title}-${Date.now()}`
        })
  
        const [project] = await db.insert(ourProjects).values({
          title, category, desc, detailDescription, imageUrl: secure_url,
        }).returning()
  
        return NextResponse.json(project, { status: 201 })
      } catch (err) {
        console.error("Error creating project:", err)
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
      }
    }, req)
