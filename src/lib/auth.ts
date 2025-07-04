import { db } from "@/db";
import { users } from "@/db/schema";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { User } from "next-auth";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { 
        email: { label: "Email", type: "email" }, 
        password: { label: "Password", type: "password" } 
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<User | null> {
        try {
          // Validate credentials
          if (!credentials?.email || !credentials.password) {
            console.warn("Missing credentials");
            return null;
          }

          // Query user
          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email.trim().toLowerCase()))
            .limit(1)
            .then((res) => res[0])
            .catch((err) => {
              console.error("Database error:", err);
              throw new Error("Failed to query user");
            });

          if (!user || !user.password) {
            // Don't reveal if user exists or not
            console.warn("Invalid credentials attempt");
            return null;
          }

          // Verify password
          const isValid = await bcrypt.compare(credentials.password, user.password)
            .catch((err) => {
              console.error("Bcrypt error:", err);
              throw new Error("Failed to verify password");
            });

          if (!isValid) {
            console.warn("Invalid password");
            return null;
          }

          return { 
            id: user.id.toString(), 
            email: user.email, 
            name: user.name 
          };

        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  session: { 
    strategy: "jwt",
    maxAge: 2*10, // 2 hours in seconds
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          name: token.name as string,
          email: token.email as string,
        }
      }
      return session
    },
  },
};

