import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"
import { authOptions } from "./auth"
import { redirect } from 'next/navigation'

export async function withAuth(
  handler: (request: NextRequest, context?: { params: string }) => Promise<NextResponse>,
  request: NextRequest,
  context?: { params: string },
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return handler(request, context)
}
