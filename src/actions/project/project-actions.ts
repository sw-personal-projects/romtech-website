'use server';

import { db } from '@/db';
import { ourProjects } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// to create new project
export async function addProject(formData: FormData) {
    console.log("formData", formData)
    const cookieStore = await cookies();
  
    const response = await fetch(`${API_URL}/api/projects`, {
      method: 'POST',
      body: formData,
      headers: {
        cookie: cookieStore.toString(),
      },
    });
  
    if (response.status !== 201) {
      throw new Error('Failed to add project');
    }
  
    revalidateTag('projects');
    return response.json();
  }

// to get all projects
export async function getProjects() {
    try {
        const response = await db.select().from(ourProjects).orderBy(desc(ourProjects.createdAt));
        return response; // It's already an array of project objects
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

// to delete a project
export async function deleteProject(id: number) {
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
            cookie: cookieStore.toString(),
        },
    });
    if (response.status !== 200) {
        throw new Error('Failed to delete project');
    }
    revalidateTag('projects');
    return response.json();
}

// to update a project
export async function updateProject(formData: FormData) {
    const id = formData.get("id") as string;
    const cookieStore = await cookies();
    const response = await fetch(`${API_URL}/api/projects/${id}`, {
        method: 'PATCH',
        body: formData,
        headers: {
            cookie: cookieStore.toString(),
        },
    });
    if (response.status !== 200) {
        throw new Error('Failed to update project');
    }
    revalidateTag('projects');
    return response.json();
}

// to get a project by id
export async function getProjectById(id: number) {
    try {
        const response = await fetch(`${API_URL}/api/projects/${id}`);
        if (response.status !== 200) {
            throw new Error('Failed to get project');
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching project:", error);
        throw new Error('Failed to get project');
    }
}