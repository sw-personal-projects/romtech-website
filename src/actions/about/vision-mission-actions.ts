'use server';

import { revalidateTag } from 'next/cache';
import { db } from '@/db';
import { visionMissions } from '@/db/schema';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';

export async function createVisionMission(data: { vision: string; mission: string; }) {
  try {
    // check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { message: 'Unauthorized', data: null };
    }

    const result = await db.insert(visionMissions).values({
      vision: data.vision,
      mission: data.mission,
    }).returning();

    revalidateTag('vision-mission');

    return { message: 'Created successfully', data: result, status: 201 };
  } catch (error) {
    console.error('Error creating vision mission:', error);
    return { message: 'Error creating vision mission', data: null, status: 500 };
  }
}


// get all vision missions
export async function getAllVisionMissions() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { message: 'Unauthorized', data: null };
    }
    const data = await db.select().from(visionMissions);
    return {
      message: 'Fetched successfully',
      data: data,
      status: 200
    };
  } catch (error) {
    console.error('Error fetching vision missions:', error);
    return { message: 'Error fetching vision missions', data: null, status: 500 };
  }
}

export async function updateVisionMission(
  id: number,
  data: { 
    vision: string; 
    mission: string; 
  }) {

  console.log(id, data);
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { message: 'Unauthorized', data: null, status: 401 };
    }

    const result = await db.update(visionMissions)
      .set({
        vision: data.vision,
        mission: data.mission,
      })
      .where(eq(visionMissions.id, id));

    revalidateTag('vision-mission');

    return {
      message: 'Updated successfully',
      rowCount: result.rowCount ?? 1, 
      status: 200
    };
  } catch (error) {
    console.error('Error updating vision mission:', error);
    return { message: 'Error updating vision mission', data: null, status: 500 };
  }
}


// delete vision mission
export async function deleteVisionMission(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { message: 'Unauthorized', data: null };
    }

    const result = await db.delete(visionMissions).where(eq(visionMissions.id, parseInt(id)));

    revalidateTag('vision-mission');

    return {
      message: 'Deleted successfully',
      data: result,
      status: 200
    };
  } catch (error) {
    console.error('Error deleting vision mission:', error);
    return { message: 'Error deleting vision mission', data: null, status: 500 };
  }
}