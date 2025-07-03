'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// to create new team member
export async function addTeamMember(formData: FormData) {
  const cookieStore = await cookies();

  const response = await fetch(`${API_URL}/api/team-members`, {
    method: 'POST',
    body: formData,
    headers: {
      cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to add team member');
  }

  revalidateTag('teamMembers');
  return response.json();
}

// to get all team members
export async function getTeamMembers() {
  try {
    const response = await fetch(`${API_URL}/api/team-members`);

    if (!response.ok) {
      console.error(`API responded with ${response.status}: ${response.statusText}`);
      return [];
    }

    return response.json();
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

