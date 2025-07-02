import { getServerSession } from "next-auth"
import { type NextRequest, NextResponse } from "next/server"
import { authOptions } from "./auth"

export async function withAuth(
  handler: (request: NextRequest, context?: { params: string }) => Promise<NextResponse>,
  request: NextRequest,
  context?: { params: string },
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return handler(request, context)
}
