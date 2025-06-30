'use server';

import { db } from "@/db";
import { teamMembers } from "@/db/schema";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

// create team member
export async function createTeamMember(data: 
    { 
        name: string; 
        position: string; 
        image: string; 
    }) {
    try {
      // check if user is authenticated
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return { message: 'Unauthorized', data: null };
      }
  
      const result = await db.insert(teamMembers).values({
        name: data.name,
        position: data.position,
        image: data.image,
      }).returning();
  
      revalidateTag('team-members');
  
      return { message: 'Created successfully', data: result, status: 201 };
    } catch (error) {
      console.error('Error creating team member:', error);
      return { message: 'Error creating team member', data: null, status: 500 };
    }
  }