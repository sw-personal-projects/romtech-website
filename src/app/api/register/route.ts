import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    if (req.method !== "POST") return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  
    const { name, email, password } = await req.json();
    if (!name || !email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then(res => res[0]);
  
    if (existing) return NextResponse.json({ error: "User already exists" }, { status: 409 });
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });
  
    return NextResponse.json({ success: true }, { status: 201 });
  }
  