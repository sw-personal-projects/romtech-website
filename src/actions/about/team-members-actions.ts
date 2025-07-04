'use server';

import { db } from '@/db';
import { teamMembers } from '@/db/schema';
import { authOptions } from '@/lib/auth';
import { uploadImage } from '@/lib/cloudinary';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// to create new team member
export async function addTeamMember(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { message: "Unauthorized", data: null };
  }
  const name = formData.get("name") as string
  const position = formData.get("position") as string
  const image = formData.get("image") as File

  if (!name || !position || !image) {
    return NextResponse.json({ error: 
      "Name, position, and image are required" }, 
      { status: 400 })
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

  revalidateTag("teamMembers")

  return { message: "Success", data: newMember };
}



// to get all team members
export async function getTeamMembers() {
  try {
    const response = await db.select().from(teamMembers)

    return response;
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw new Error('Failed to get team members');
  }
}



// to delete a team member
export async function deleteTeamMember(id: number) {
  const cookieStore = await cookies();
  console.log("cookieStore", cookieStore.toString())

  const response = await fetch(`${API_URL}/api/team-members/${id}`, {
    method: 'DELETE',
    headers: {
      cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete team member');
  }

  revalidateTag('teamMembers');
  return response.json();
}


// to update a team member
export async function updateTeamMember(id: number, formData: FormData) {
  const cookieStore = await cookies();

  const response = await fetch(`${API_URL}/api/team-members/${id}`, {
    method: 'PATCH',
    body: formData,
    headers: {
      cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to update team member');
  }

  revalidateTag('teamMembers');
  return response.json();
}

